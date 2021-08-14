// Geometric constructions and ways of animating them
// All geometries start with opacity zero; need to call .show() or .fadeIn() to display them
// Mathematically speaking there's no difference between a point and a line, they're both just 2d vectors. But for animation purposes I am treating them differently, which means some of the vector-math functions might be incompatible.

const add = (p, q) => {
  return new Point(p.x + q.x, p.y + q.y);
};

const subtract = (p, q) => {
  return new Point(p.x - q.x, p.y - q.y);
};

const scale = (p, n) => {
  return new Point(p.x * n, p.y * n);
};

const cross2d = (p, q) => {
  return p.x * q.y - p.y * q.x;
};

// Return the new endpoint when extending/contracting a line l by scalar n
const extend = (l, n) => {
  return new Point(l.p.x + n * (l.q.x - l.p.x), l.p.y + n * (l.q.y - l.p.y));
};

// Find the angle between two lines
const angle = (l0, l1) => {
  let u = subtract(l0.q, l0.p);
  let v = subtract(l1.q, l1.p);
  let cosq = (u.x * v.x + u.y * v.y) / (u.norm * v.norm);
  let sign = Math.sign(cross2d(u, v));
  return sign * Math.acos(cosq) * (180 / Math.PI);
};

// A function to find the intersection of two line segments
// Assume line segments lie on the xy plane and do intersect
const intersect = (u, v) => {
  let r = subtract(u.q, u.p);
  let s = subtract(v.q, v.p);
  let t = Math.abs(cross2d(subtract(v.p, u.p), s)) / Math.abs(cross2d(s, r));
  return add(u.p, scale(r, t));
};

// A function to project a point onto a line segment
const project = (p, v) => {
  let vprime = subtract(v.q, v.p);
  let orthog = new Point(v.p.y - v.q.y, v.q.x - v.p.x);
  let l1 = new Line(p, add(p, orthog));
  return intersect(l1, v);
};

// A function to find the two points where a line segment intersects a circle
// Assume line segment and circle lie on XY plane, and that line segment creates a chord on the circle
const chord = (p, r, v) => {
  let s = subtract(v.q, v.p);
  let a = s.x ** 2 + s.y ** 2;
  let b = 2 * v.p.x * s.x + 2 * v.p.y * s.y - 2 * p.x * s.x - 2 * p.y * s.y;
  let c =
    p.x ** 2 -
    2 * p.x * v.p.x +
    v.p.x ** 2 +
    p.y ** 2 -
    2 * p.y * v.p.y +
    v.p.y ** 2 -
    r ** 2;
  let t = (-b + Math.sqrt(b ** 2 - 4 * a * c)) / (2 * a);
  let u = (-b - Math.sqrt(b ** 2 - 4 * a * c)) / (2 * a);
  let chord1 = add(v.p, scale(s, t));
  let chord2 = add(v.p, scale(s, u));
  return [chord1, chord2];
};

// A function to find the intersection of two circles
// Assume circles lie on XY plane, have two intersections, and have a finite tangent slope
// If circles are horizontally aligned (infinite tangent slope), rotate the frame by 90 degrees
// Remember to un-rotate at the end
const twoCircles = (p0, r0, p1, r1) => {
  let horizontal = p0.y == p1.y;
  let q0, q1;
  if (horizontal) {
    q0 = p0.rotate(new Point(0, 0), 90);
    q1 = p1.rotate(new Point(0, 0), 90);
  } else {
    q0 = new Point(p0.x, p0.y);
    q1 = new Point(p1.x, p1.y);
  }

  let slope = -(q0.x - q1.x) / (q0.y - q1.y); // Note this is orthogonal to the line between p0 and p1

  let int =
    (-(r0 ** 2 - r1 ** 2) + (q0.x ** 2 - q1.x ** 2) + (q0.y ** 2 - q1.y ** 2)) /
    (2 * (q0.y - q1.y));
  let a = 1 + slope ** 2;
  let b = -2 * q0.x - 2 * slope * q0.y + 2 * slope * int;
  let c = q0.x ** 2 + q0.y ** 2 - 2 * int * q0.y + int ** 2 - r0 ** 2;
  let x0 = (-b + Math.sqrt(b ** 2 - 4 * a * c)) / (2 * a);
  let x1 = (-b - Math.sqrt(b ** 2 - 4 * a * c)) / (2 * a);
  let y0 = slope * x0 + int;
  let y1 = slope * x1 + int;
  let int0 = new Point(x0, y0);
  let int1 = new Point(x1, y1);
  if (horizontal) {
    int0 = int0.rotate(new Point(0, 0), -90);
    int1 = int1.rotate(new Point(0, 0), -90);
  }
  return [int0, int1];
};

class Point {
  constructor(x, y, en, np) {
    this.x = x;
    this.y = y;
    this.norm = Math.sqrt(x ** 2 + y ** 2);
    this.en = en;
    this.np = np;
    this.virtual = !this.en && !this.np;
    this.visible = false;
    this.node = newSVG("circle", {
      class: "point",
      cx: this.x,
      cy: this.y,
      r: 2.5,
      stroke: "#00000000",
      "stroke-width": 0,
      opacity: 0,
    });
    if (this.virtual) {
      this.node.setAttribute("style", "pointer-events: none");
      //$("pointsgroup").prepend(this.node);
    } else {
      this.node.setAttribute("id", this.en);
      $("pointsgroup").append(this.node);
    }

    if (!this.virtual) {
      this.labelDot = newSVG("circle", {
        class: "point",
        cx: this.x,
        cy: this.y,
        r: 2.5,
        stroke: "none",
        fill: "green",
        opacity: 0,
        style: "pointer-events: none",
      });
      this.labelEN = newSVG("text", {
        x: this.x + 5,
        y: -1 * (this.y + 5),
        textContent: this.en,
        fill: "white",
        stroke: "blue",
        "stroke-width": 0.5,
        transform: "scale(1 -1)",
        opacity: 0,
        "font-family": "sans-serif",
        "font-size": "0.6em",
        "font-weight": "bold",
        "text-anchor": "middle",
        "alignment-baseline": "central",
        style: "pointer-events: none",
      });
      this.labelNP = newSVG("text", {
        x: this.x - 5,
        y: -1 * (this.y + 5),
        textContent: this.np,
        fill: "white",
        stroke: "blue",
        "stroke-width": 0.5,
        transform: "scale(1 -1)",
        opacity: 0,
        "font-size": "0.6em",
        "font-weight": "bold",
        "text-anchor": "middle",
        "alignment-baseline": "central",
        style: "pointer-events: none",
      });
      this.node.addEventListener("mouseenter", () => {
        if (this.visible) {
          this.labelEN.setAttribute("opacity", 1);
          this.labelNP.setAttribute("opacity", 1);
          this.labelDot.setAttribute("opacity", 1);
        }
      });
      this.node.addEventListener("mouseleave", () => {
        this.labelEN.setAttribute("opacity", 0);
        this.labelNP.setAttribute("opacity", 0);
        this.labelDot.setAttribute("opacity", 0);
      });
      $("labelsgroup").appendChild(this.labelDot);
      $("labelsgroup").appendChild(this.labelEN);
      $("labelsgroup").appendChild(this.labelNP);
    }
  }

  rotate(origin, angle) {
    let rx = this.x - origin.x;
    let ry = this.y - origin.y;
    let q = (angle * Math.PI) / 180;
    let x = rx * Math.cos(q) - ry * Math.sin(q);
    let y = rx * Math.sin(q) + ry * Math.cos(q);
    return new Point(origin.x + x, origin.y + y);
  }

  async fadeIn(finalOpacity = 1) {
    // delete any current animations
    for (let child of this.node.getElementsByTagName("animate")) {
      this.node.removeChild(child);
    }

    let speedmult = $("sheet").speedmult;
    let currOpacity = this.node.getAttribute("opacity");
    const anim = newSVG("animate", {
      attributeName: "opacity",
      from: currOpacity,
      to: finalOpacity,
      dur: 1 / speedmult,
      fill: "freeze",
      begin: "indefinite",
    });
    this.node.appendChild(anim);
    anim.beginElement();
    this.visible = true;
    await idle(1000 / speedmult);
    this.node.setAttribute("opacity", finalOpacity);
  }

  async fadeOut(finalOpacity = 0) {
    if (!this.visible) return;

    // delete any current animations
    for (let child of this.node.getElementsByTagName("animate")) {
      this.node.removeChild(child);
    }

    let speedmult = $("sheet").speedmult;
    let currOpacity = this.node.getAttribute("opacity");
    const anim = newSVG("animate", {
      attributeName: "opacity",
      from: currOpacity,
      to: finalOpacity,
      dur: 1 / speedmult,
      fill: "freeze",
      begin: "indefinite",
    });
    this.node.appendChild(anim);
    anim.beginElement();
    this.visible = finalOpacity != 0;
    await idle(1000 / speedmult);
    this.node.setAttribute("opacity", finalOpacity);
  }

  show() {
    this.node.setAttribute("opacity", 1);
    this.visible = true;
  }

  hide() {
    this.node.setAttribute("opacity", 0);
    this.visible = false;
  }
}

class Line {
  constructor(p, q, virtual = false) {
    this.p = p;
    this.q = q;
    this.virtual = virtual;
    this.norm = Math.sqrt((q.x - p.x) ** 2 + (q.y - p.y) ** 2);
    this.visible = false;
    this.node = newSVG("line", {
      class: "line",
      x1: this.p.x,
      y1: this.p.y,
      x2: this.q.x,
      y2: this.q.y,
      stroke: "black",
      "stroke-dasharray": this.norm,
      opacity: 0,
    });
    if (!!this.p.en && !!this.q.en && !this.virtual) {
      this.node.setAttribute("id", this.p.en + this.q.en);
    }
    if (this.virtual) {
      $("linesgroup").prepend(this.node);
    } else {
      $("linesgroup").append(this.node);
    }
  }

  async fadeIn(finalOpacity = this.virtual ? 0.5 : 1) {
    // delete any current animations
    for (let child of this.node.getElementsByTagName("animate")) {
      this.node.removeChild(child);
    }

    let speedmult = $("sheet").speedmult;
    let currOpacity = this.node.getAttribute("opacity");
    const anim = newSVG("animate", {
      attributeName: "opacity",
      from: currOpacity,
      to: finalOpacity,
      dur: 1 / speedmult,
      fill: "freeze",
      begin: "indefinite",
    });
    this.node.appendChild(anim);
    anim.beginElement();
    this.visible = true;
    await idle(1000 / speedmult);
    this.node.setAttribute("opacity", finalOpacity);
  }

  async fadeOut(finalOpacity = 0) {
    // delete any current animations
    for (let child of this.node.getElementsByTagName("animate")) {
      this.node.removeChild(child);
    }

    let speedmult = $("sheet").speedmult;
    let currOpacity = this.node.getAttribute("opacity");
    const anim = newSVG("animate", {
      attributeName: "opacity",
      from: currOpacity,
      to: finalOpacity,
      dur: 1 / speedmult,
      fill: "freeze",
      begin: "indefinite",
    });
    this.node.appendChild(anim);
    anim.beginElement();
    this.visible = false;
    await idle(1000 / speedmult);
    this.node.setAttribute("opacity", finalOpacity);
  }

  async draw(startnext = 1) {
    // delete any current animations
    for (let child of this.node.getElementsByTagName("animate")) {
      this.node.removeChild(child);
    }

    let speedmult = $("sheet").speedmult;
    const anim = newSVG("animate", {
      attributeName: "stroke-dashoffset",
      from: this.norm,
      to: 0,
      dur: 1 / speedmult,
      fill: "freeze",
      begin: "indefinite",
    });
    this.show();
    this.node.appendChild(anim);
    anim.beginElement();
    //await new Promise((p) => setTimeout(p, 1000));
    await idle((1000 / speedmult) * startnext);
  }

  show() {
    this.node.setAttribute("opacity", this.virtual ? 0.5 : 1);
    this.visible = true;
  }

  hide() {
    this.node.setAttribute("opacity", 0);
    this.visible = false;
  }

  async swing(around, q, extraSpeedmult = 1, cumulative = false) {
    // delete any current animations
    if (!cumulative) {
      for (let child of this.node.getElementsByTagName("animateTransform")) {
        this.node.removeChild(child);
      }
    }

    let speedmult = $("sheet").speedmult * extraSpeedmult;
    const anim = newSVG("animateTransform", {
      attributeName: "transform",
      type: "rotate",
      from: `0 ${around.x} ${around.y}`,
      to: `${q} ${around.x} ${around.y}`,
      dur: Math.abs(q) / 180 / speedmult,
      fill: "freeze",
      begin: "indefinite",
      additive: cumulative ? "sum" : "replace",
    });
    this.show();
    this.node.appendChild(anim);
    anim.beginElement();
    await idle((Math.abs(q) * 1000) / 180 / speedmult);
  }
}

class Arc {
  constructor(
    origin,
    arc0,
    arc1,
    largeArc = true,
    clockwise = true,
    virtual = false
  ) {
    this.origin = origin;
    this.arc0 = arc0;
    this.arc1 = arc1;
    let l0 = new Line(origin, arc0, true);
    let l1 = new Line(origin, arc1, true);
    this.angle = angle(l0, l1);
    this.r = l0.norm;
    this.largeArc = largeArc;
    this.clockwise = clockwise;
    this.virtual = virtual;
    this.visible = false;
    this.node = newSVG("path", {
      class: "arc",
      stroke: "black",
      fill: "none",
      opacity: 0,
      d: `M ${arc0.x},${arc0.y} A ${this.r} ${this.r} ${this.angle} ${
        largeArc ? 1 : 0
      } ${clockwise ? 1 : 0} ${arc1.x} ${arc1.y}`,
    });
    this.length = this.node.getTotalLength();
    this.node.setAttribute("stroke-dasharray", this.length);
    if (this.virtual) {
      $("linesgroup").prepend(this.node);
    } else {
      $("linesgroup").append(this.node);
    }
  }

  async fadeIn(finalOpacity = this.virtual ? 0.5 : 1) {
    // delete any current animations
    for (let child of this.node.getElementsByTagName("animate")) {
      this.node.removeChild(child);
    }

    let speedmult = $("sheet").speedmult;
    let currOpacity = this.node.getAttribute("opacity");
    const anim = newSVG("animate", {
      attributeName: "opacity",
      from: currOpacity,
      to: finalOpacity,
      dur: 1 / speedmult,
      fill: "freeze",
      begin: "indefinite",
    });
    this.node.appendChild(anim);
    anim.beginElement();
    this.visible = true;
    await idle(1000 / speedmult);
    this.node.setAttribute("opacity", finalOpacity);
  }

  async fadeOut(finalOpacity = 0) {
    // delete any current animations
    for (let child of this.node.getElementsByTagName("animate")) {
      this.node.removeChild(child);
    }

    let speedmult = $("sheet").speedmult;
    let currOpacity = this.node.getAttribute("opacity");
    const anim = newSVG("animate", {
      attributeName: "opacity",
      from: currOpacity,
      to: finalOpacity,
      dur: 1 / speedmult,
      fill: "freeze",
      begin: "indefinite",
    });
    this.node.appendChild(anim);
    anim.beginElement();
    this.visible = false;
    await idle(1000 / speedmult);
    this.node.setAttribute("opacity", finalOpacity);
  }

  async draw(startnext = 1) {
    // delete any current animations
    for (let child of this.node.getElementsByTagName("animate")) {
      this.node.removeChild(child);
    }

    let speedmult = $("sheet").speedmult;
    const anim = newSVG("animate", {
      attributeName: "stroke-dashoffset",
      from: this.length,
      to: 0,
      dur: Math.abs(this.angle) / 180 / speedmult,
      fill: "freeze",
      begin: "indefinite",
    });
    this.show();
    this.node.appendChild(anim);
    anim.beginElement();
    await idle((Math.abs(this.angle) * 1000) / 180 / speedmult);
  }

  show() {
    this.node.setAttribute("opacity", this.virtual ? 0.5 : 1);
    this.visible = true;
  }

  hide() {
    this.node.setAttribute("opacity", 0);
    this.visible = false;
  }
}

class Zigzag {
  constructor(center, innerR, outerR, start, angle, rays) {
    this.center = center;
    this.innerR = innerR;
    this.outerR = outerR;
    this.start = start;
    this.rays = rays;
    this.angle = angle;
    let path = `M ${start.x},${start.y} L`;
    let dq = angle / rays;
    for (let i = 0; i < rays; i++) {
      // let temp0 = start.rotate(center, -i * dq);
      let temp1 = add(scale(subtract(start, center), outerR / innerR), center);
      temp1 = temp1.rotate(center, -i * dq - dq / 2);
      // let temp1 = add(center, { x: 0, y: outerR }).rotate(
      //   center,
      //   angle / 2 - i * dq - dq / 2
      // );
      let temp2 = start.rotate(center, -i * dq - dq);
      path += ` ${temp1.x},${temp1.y} ${temp2.x},${temp2.y}`;
    }
    this.node = newSVG("path", {
      class: "zigzag",
      stroke: "black",
      fill: "none",
      opacity: 0,
      d: path,
    });
    this.length = this.node.getTotalLength();
    this.node.setAttribute("stroke-dasharray", this.length);
    $("linesgroup").append(this.node);
  }

  async fadeIn(finalOpacity = this.virtual ? 0.5 : 1) {
    // delete any current animations
    for (let child of this.node.getElementsByTagName("animate")) {
      this.node.removeChild(child);
    }

    let speedmult = $("sheet").speedmult;
    let currOpacity = this.node.getAttribute("opacity");
    const anim = newSVG("animate", {
      attributeName: "opacity",
      from: currOpacity,
      to: finalOpacity,
      dur: 1 / speedmult,
      fill: "freeze",
      begin: "indefinite",
    });
    this.node.appendChild(anim);
    anim.beginElement();
    this.visible = true;
    await idle(1000 / speedmult);
    this.node.setAttribute("opacity", finalOpacity);
  }

  async fadeOut(finalOpacity = 0) {
    // delete any current animations
    for (let child of this.node.getElementsByTagName("animate")) {
      this.node.removeChild(child);
    }

    let speedmult = $("sheet").speedmult;
    let currOpacity = this.node.getAttribute("opacity");
    const anim = newSVG("animate", {
      attributeName: "opacity",
      from: currOpacity,
      to: finalOpacity,
      dur: 1 / speedmult,
      fill: "freeze",
      begin: "indefinite",
    });
    this.node.appendChild(anim);
    anim.beginElement();
    this.visible = false;
    await idle(1000 / speedmult);
    this.node.setAttribute("opacity", finalOpacity);
  }

  async draw(startnext = 1) {
    // delete any current animations
    for (let child of this.node.getElementsByTagName("animate")) {
      this.node.removeChild(child);
    }

    let speedmult = $("sheet").speedmult;
    const anim = newSVG("animate", {
      attributeName: "stroke-dashoffset",
      from: this.length,
      to: 0,
      dur: this.angle / 180 / speedmult,
      fill: "freeze",
      begin: "indefinite",
    });
    this.show();
    this.node.appendChild(anim);
    anim.beginElement();
    await idle((this.angle * 1000) / 180 / speedmult);
  }

  show() {
    this.node.setAttribute("opacity", this.virtual ? 0.5 : 1);
    this.visible = true;
  }

  hide() {
    this.node.setAttribute("opacity", 0);
    this.visible = false;
  }
}

class Circle {
  constructor(center, radius, virtual = false) {
    this.center = center;
    this.radius = radius;
    this.virtual = virtual;
    this.node = newSVG("circle", {
      class: "circle",
      stroke: "black",
      fill: "none",
      opacity: 0,
      cx: center.x,
      cy: -center.y,
      r: radius,
      transform: `scale(1 -1) rotate(180 ${center.x} ${-center.y})`,
    });
    this.length = this.node.getTotalLength();
    this.node.setAttribute("stroke-dasharray", this.length);
    $("linesgroup").append(this.node);
  }

  async fadeIn(finalOpacity = this.virtual ? 0.5 : 1) {
    // delete any current animations
    for (let child of this.node.getElementsByTagName("animate")) {
      this.node.removeChild(child);
    }

    let speedmult = $("sheet").speedmult;
    let currOpacity = this.node.getAttribute("opacity");
    const anim = newSVG("animate", {
      attributeName: "opacity",
      from: currOpacity,
      to: finalOpacity,
      dur: 1 / speedmult,
      fill: "freeze",
      begin: "indefinite",
    });
    this.node.appendChild(anim);
    anim.beginElement();
    this.visible = true;
    await idle(1000 / speedmult);
    this.node.setAttribute("opacity", finalOpacity);
  }

  async fadeOut(finalOpacity = 0) {
    // delete any current animations
    for (let child of this.node.getElementsByTagName("animate")) {
      this.node.removeChild(child);
    }

    let speedmult = $("sheet").speedmult;
    let currOpacity = this.node.getAttribute("opacity");
    const anim = newSVG("animate", {
      attributeName: "opacity",
      from: currOpacity,
      to: finalOpacity,
      dur: 1 / speedmult,
      fill: "freeze",
      begin: "indefinite",
    });
    this.node.appendChild(anim);
    anim.beginElement();
    this.visible = false;
    await idle(1000 / speedmult);
    this.node.setAttribute("opacity", finalOpacity);
  }

  async draw(startnext = 1) {
    // delete any current animations
    for (let child of this.node.getElementsByTagName("animate")) {
      this.node.removeChild(child);
    }

    let speedmult = $("sheet").speedmult;
    const anim = newSVG("animate", {
      attributeName: "stroke-dashoffset",
      from: this.length,
      to: 0,
      dur: 2 / speedmult,
      fill: "freeze",
      begin: "indefinite",
    });
    this.show();
    this.node.appendChild(anim);
    anim.beginElement();
    await idle(2000 / speedmult);
  }

  show() {
    this.node.setAttribute("opacity", this.virtual ? 0.5 : 1);
    this.visible = true;
  }

  hide() {
    this.node.setAttribute("opacity", 0);
    this.visible = false;
  }
}
