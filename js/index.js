const sheet = $("sheet");
//sheet.viewBox = { x: -100, y: -100, w: 400, h: 400 }; // The current viewBox status
sheet.box = "-50 -91.5 200 183";
sheet.waitingForInput = false;
const geom = {};
sheet.speedmult = 1;

// Append a group for lines, then append a group for points (So points will always be rendered above lines)
const linesgroup = newSVG("g", { id: "linesgroup" });
const pointsgroup = newSVG("g", { id: "pointsgroup" });
const labelsgroup = newSVG("g", { id: "labelsgroup" });
sheet.appendChild(linesgroup);
sheet.appendChild(pointsgroup);
sheet.appendChild(labelsgroup);

// Set up nodes for the text portion
const textbreak = () => {
  return newHTML("div", { class: "break" });
};

const newNP = (id, text) => {
  return newHTML("div", {
    class: "NP",
    id,
    text,
  });
};

const newEN = (text) => {
  return newHTML("div", {
    class: "EN",
    text,
  });
};

const zoom = (newBox) => {
  let speedmult = sheet.speedmult;
  const anim = newSVG("animate", {
    attributeName: "viewBox",
    from: sheet.box,
    to: newBox,
    dur: 2 / speedmult,
    fill: "freeze",
    begin: "indefinite",
  });
  sheet.appendChild(anim);
  anim.beginElement();
  sheet.box = newBox;
};

const a1 = async () => {
  // Perform step calculations
  const A = new Point(0, 0, "A", "क");
  const B = new Point(100, 0, "B", "ख");
  const AB = new Line(A, B);

  // Store new geometry
  geom.A = A;
  geom.B = B;
  geom.AB = AB;

  // Animate
  $("parallel").appendChild(textbreak());
  let aNP = newNP("a", "<b>(क) किनाराभित्रको आकार बनाउने तरीका</b>");
  let aEN = newEN("<b>(a) Method of making the shape inside the border</b>");
  let a1NP = newNP(
    "a1",
    "(१) एउटा सिम्रिक रङ्गको रातो कपडामा तल्लो भागमा चहिएको जति लम्बाईको रेखा बायाँबाट दाहिनेतिर खिच्ने र यसलाई क ख नाम राख्ने ।"
  );
  let a1EN = newEN(
    "(1) On the lower portion of a crimson cloth draw a line AB of the required length from left to right."
  );

  $("parallel").append(aNP, aEN, a1NP, a1EN);
  aNP.scrollIntoView();

  $("titlescreen")?.remove();
  await A.fadeIn();
  await AB.draw(0.5);
  await B.fadeIn();
};

const a2 = async () => {
  // Retrieve existing geometry
  let { A, B, AB } = geom;

  // Perform step calculations
  let p0 = extend(AB, 2 / 3);
  let p1 = extend(AB, 1 / 3);
  let l0 = new Line(A, p0, true);
  let l1 = new Line(B, p1, true);
  let [p3, p2] = twoCircles(A, l0.norm, B, l1.norm);
  let a0 = new Arc(A, p2.rotate(A, -5), p2.rotate(A, 5), false, true, true);
  let a1 = new Arc(B, p2.rotate(B, 5), p2.rotate(B, -5), false, false, true);
  let a2 = new Arc(A, p3.rotate(A, 5), p3.rotate(A, -5), false, false, true);
  let a3 = new Arc(B, p3.rotate(B, -5), p3.rotate(B, 5), false, true, true);
  let magicAngle = angle(l0, new Line(A, p2));

  let l2 = new Line(p2, p3, true);
  let l3 = new Line(extend(l2, 0.45), extend(l2, 0.55), true);
  let p4 = intersect(l3, AB);
  let l4 = new Line(p4, B, true);
  let p5 = extend(l4, 2 / 3);
  let p6 = extend(l4, 1 / 3);
  let l5 = new Line(p4, p5, true);
  let l6 = new Line(B, p6, true);
  let [p8, p7] = twoCircles(p4, l5.norm, B, l6.norm);
  let a4 = new Arc(p4, p7.rotate(p4, -5), p7.rotate(p4, 5), false, true, true);
  let a5 = new Arc(B, p7.rotate(B, 5), p7.rotate(B, -5), false, false, true);
  let a6 = new Arc(p4, p8.rotate(p4, 5), p8.rotate(p4, -5), false, false, true);
  let a7 = new Arc(B, p8.rotate(B, -5), p8.rotate(B, 5), false, true, true);

  let l7 = new Line(p7, p8, true);
  let l8 = new Line(extend(l7, 0.4), extend(l7, 0.6), true);
  let p9 = intersect(l8, AB);

  let l9 = new Line(A, B, true);
  let D = B.rotate(A, 90);
  D = new Point(D.x, D.y, "D", "घ");
  let l10 = new Line(p9, D, true);
  let p11 = add(D, extend(AB, 1 / 4));
  let l11 = new Line(B, p11, true);
  let AD = new Line(A, D, true);
  let C = intersect(l11, AD);
  C = new Point(C.x, C.y, "C", "ग");
  let AC = new Line(A, C);
  let BC = new Line(B, C, true);
  let BD = new Line(B, D);

  // Store new geometry
  geom.C = C;
  geom.D = D;
  geom.AC = AC;
  geom.BD = BD;

  // Animate
  let a2NP = newNP(
    "a2",
    "(२) क बाट सीधा माथि ग सम्म क ख को लम्बाई जतिमा क ख कै तृतीयांश थप्दा जति हुन्छ त्यति लामो हुने गरी क ग रेखा खिच्ने । क ग मा क ख को लम्बाई जति लिई घ चिन्हो लगाउने । ख र घ जोड्ने ।"
  );
  let a2EN = newEN(
    "(2) From A draw a line AC perpendicular to AB making AC equal to AB plus one third AB. From AC mark off D making line AD equal to line AB. Join B and D."
  );
  $("parallel").append(a2NP, a2EN);
  a2NP.scrollIntoView();

  zoom("-50 -91.5 200 183");
  l0.show();
  l1.show();
  l0.swing(A, magicAngle - 5);
  await l1.swing(B, -magicAngle + 5);
  a0.draw();
  a1.draw();
  l0.swing(A, 10, 1, true);
  await l1.swing(B, -10, 1, true);
  l0.swing(A, -2 * magicAngle, 1, true);
  await l1.swing(B, 2 * magicAngle, 1, true);
  a2.draw();
  a3.draw();
  l0.swing(A, -10, 1, true);
  await l1.swing(B, 10, 1, true);
  l0.fadeOut();
  l1.fadeOut();
  await l2.draw();
  a0.fadeOut();
  a1.fadeOut();
  a2.fadeOut();
  a3.fadeOut();
  l2.fadeOut();
  await l3.fadeIn();

  l5.show();
  l6.show();
  l5.swing(p4, magicAngle - 5);
  await l6.swing(B, -magicAngle + 5);
  a4.draw();
  a5.draw();
  l5.swing(p4, 10, 1, true);
  await l6.swing(B, -10, 1, true);
  l5.swing(p4, -2 * magicAngle, 1, true);
  await l6.swing(B, 2 * magicAngle, 1, true);
  a6.draw();
  a7.draw();
  l5.swing(p4, -10, 1, true);
  await l6.swing(B, 10, 1, true);
  l5.fadeOut();
  l6.fadeOut();
  await l7.draw();
  l3.fadeOut();
  a4.fadeOut();
  a5.fadeOut();
  a6.fadeOut();
  a7.fadeOut();
  l7.fadeOut();
  await l8.fadeIn();
  zoom("-50 -25 200 183");
  await l9.swing(A, 90);
  await D.fadeIn();
  l10.draw();
  await BC.draw();
  await AC.draw();
  C.fadeIn();
  l7.fadeOut();
  l8.fadeOut();
  l9.fadeOut();
  l10.fadeOut();
  BC.fadeOut();
  await BD.draw();
};

const a3 = async () => {
  // Retrieve existing geometry
  let { A, B, BD } = geom;

  // Perform step calculations
  let l0 = new Line(B, A);
  let E = A.rotate(B, angle(l0, BD));
  E = new Point(E.x, E.y, "E", "ङ");
  const BE = new Line(B, E);

  // Store new geometry
  geom.E = E;
  geom.BE = BE;

  // Animate
  let a3NP = newNP("a3", "(३) ख घ रेखामा ख बाट क ख जति लिई ङ चिन्हो लाउने ।");
  let a3EN = newEN("(3) From BD mark off E making BE equal to AB.");
  $("parallel").append(a3NP, a3EN);
  a3NP.scrollIntoView();

  await l0.swing(B, angle(l0, BD), 0.5);
  l0.fadeOut();
  E.fadeIn();
  BE.fadeIn();
  await BD.fadeOut(0.1);
};

const a4 = async () => {
  // Retrieve existing geometry
  let { B, E, AC } = geom;

  // Perform step calculations
  let p0 = subtract(E, B);
  let p1 = add(E, B);
  let l0 = new Line(p0, p1, true);
  let F = intersect(l0, AC);
  F = new Point(F.x, F.y, "F", "च");
  let G = add(F, B);
  G = new Point(G.x, G.y, "G", "छ");
  let l1 = new Line(p0, F, true);
  let FG = new Line(F, G, true);
  let l2 = new Line(E, G, true);
  const EG = new Line(E, G);
  let l3 = new Line(G, p1);
  let l4 = new Line(B, add(B, AC.q), true);

  // Store new geometry
  geom.F = F;
  geom.G = G;
  geom.FG = FG;
  geom.EG = EG;

  // Animate
  let a4NP = newNP(
    "a4",
    "(४) ङ हुँदै क ख को समानान्तर पारेर क ग मा पर्ने विन्दु च बाट शुरु गरी दाहिनेतिर छ सम्म क ख को लम्बाई जति रेखा खिच्ने ।"
  );
  let a4EN = newEN(
    "(4) Touching E draw a line FG, starting from the point F on line AC, and parallel to AB to the right hand-side. Mark off FG equal to AB."
  );
  $("parallel").append(a4NP, a4EN);
  a4NP.scrollIntoView();

  l4.draw();
  await l0.draw();
  l0.hide();
  l1.show();
  FG.show();
  l2.show();
  l3.show();
  F.fadeIn();
  G.fadeIn();
  l1.fadeOut();
  FG.fadeOut(0.1);
  l2.fadeOut();
  EG.fadeIn();
  l4.fadeOut();
  await l3.fadeOut();
};

const a5 = async () => {
  // Retrieve existing geometry
  const { C, G } = geom;

  // Perform step calculations
  const CG = new Line(C, G);

  // Store new geometry
  geom.CG = CG;

  // Animate
  let NP = newNP("a5", "(५) ग र छ लाई जोड्ने ।");
  let EN = newEN("(5) Join C and G.");
  $("parallel").append(NP, EN);
  NP.scrollIntoView();

  await CG.draw();
};

const b6 = async () => {
  // Retrieve existing geometry
  const { A, B, C, D, E, F, G, CG } = geom;

  // Perform step calculations
  let H = scale(B, 1 / 4);
  H = new Point(H.x, H.y, "H", "ज");
  let I = add(H, C);
  let HI = new Line(H, I);
  I = intersect(HI, CG);
  I = new Point(I.x, I.y, "I", "झ");
  HI = new Line(H, I, true);

  // Store new geometry
  geom.H = H;
  geom.I = I;
  geom.HI = HI;

  // Animate
  let bNP = newNP("b", "<b>(ख) चन्द्र बनाउने तरिका</b>");
  let bEN = newEN("<b>(b) Method of making the moon</b>");
  let NP = newNP(
    "b6",
    "(६) क ख को चतुर्थांश जति क बाट दाहिनेमा ज चिन्हो लाउने र त्यहाँबाट माथि क ग को समानान्तर पारेर ग छ लाई झ मा छुने रेखा खिच्ने ।"
  );
  let EN = newEN(
    "(6) From AB mark off AH making AH equal to one-fourth of line AB and starting from H draw a line HI parallel to line AC touching line CG at point I."
  );
  $("parallel").append(textbreak(), bNP, bEN, NP, EN);
  NP.scrollIntoView();

  A.fadeOut(0.3);
  B.fadeOut(0.3);
  C.fadeOut(0.3);
  D.fadeOut(0.3);
  E.fadeOut(0.3);
  F.fadeOut(0.3);
  G.fadeOut(0.3);
  await H.fadeIn();
  await HI.draw(0.5);
  await I.fadeIn();
};

const b7 = async () => {
  // Retrieve existing geometry
  const { B, C, F, CG } = geom;

  // Perform step calculations
  let CF = new Line(C, F);
  let J = new Point(C.x, C.y - CF.norm / 2);
  J = new Point(J.x, J.y, "J", "ञ");
  let JK = new Line(J, add(J, B));
  let K = intersect(JK, CG);
  K = new Point(K.x, K.y, "K", "ट");
  JK = new Line(J, K, true);

  // Store new geometry
  geom.J = J;
  geom.K = K;
  geom.JK = JK;

  // Animate
  let NP = newNP(
    "b7",
    "(७) ग च को आधा ञ बाट क ख को समानान्तर पारेर रेखा दायाँतिर खिची ग छ लाई ट मा छुने ।"
  );
  let EN = newEN(
    "(7) Bisect CF at J and draw a line JK parallel to AB touching CG at point K."
  );
  $("parallel").append(NP, EN);
  NP.scrollIntoView();

  await J.fadeIn();
  await JK.draw(0.5);
  await K.fadeIn();
};

const b8 = async () => {
  // Retrieve existing geometry
  let { H, I, J, K, HI, JK } = geom;

  // Perform step calculations
  let L = intersect(HI, JK);
  L = new Point(L.x, L.y, "L", "ठ");

  // Store new geometry
  geom.L = L;

  // Animate
  let NP = newNP("b8", "(८) ञ ट र ज झ रेखा काटिएको ठाउँमा ठ चिन्हो राख्ने ।");
  let EN = newEN(
    "(8) Let L be the point where lines JK and HI cut one another."
  );
  $("parallel").append(NP, EN);
  NP.scrollIntoView();

  await L.fadeIn();
  H.fadeOut(0.3);
  I.fadeOut(0.3);
  J.fadeOut(0.3);
  K.fadeOut(0.3);
  HI.fadeOut(0.1);
  await JK.fadeOut(0.1);
};

const b9 = async () => {
  // Retrieve existing geometry
  const { J, G, L } = geom;

  // Perform step calculations
  const JG = new Line(J, G, true);

  // Store new geometry
  geom.JG = JG;

  // Animate
  let NP = newNP("b8", "(९) ञ र छ जोड्ने ।");
  let EN = newEN("(9) Join J and G.");
  $("parallel").append(NP, EN);
  NP.scrollIntoView();

  L.fadeOut(0.3);
  J.fadeIn();
  await G.fadeIn();
  await JG.draw();
};

const b10 = async () => {
  // Retrieve existing geometry
  const { G, J, HI, JG } = geom;

  // Perform step calculations
  let M = intersect(HI, JG);
  M = new Point(M.x, M.y, "M", "ड");

  // Store new geometry
  geom.M = M;

  // Animate
  let NP = newNP("b8", "(१०) ञ छ र ज झ काटिएको विन्दुमा ड चिन्हो लाउने ।");
  let EN = newEN(
    "(10) Let M be the point where line JG and HI cut one another."
  );
  $("parallel").append(NP, EN);
  NP.scrollIntoView();

  await HI.fadeIn();
  await M.fadeIn();
  J.fadeOut(0.3);
  G.fadeOut(0.3);
  JG.fadeOut(0.1);
  await HI.fadeOut(0.1);
};

const b11 = async () => {
  // Retrieve existing geometry
  const { D, E, M, HI } = geom;

  // Perform step calculations
  let DE = new Line(E, D, true);
  let Nprime = project(M, DE);
  let MNprime = new Line(M, Nprime, true);
  let N = Nprime.rotate(M, angle(HI, MNprime) - 90);
  N = new Point(N.x, N.y, "N", "ढ");
  const MN = new Line(M, N, true);

  // Store new geometry
  geom.N = N;
  geom.MN = MN;

  // Animate
  let NP = newNP(
    "b11",
    "(११) ड लाई केन्द्र मानी ख घ रेखालाई न्यूनतम अन्तर पर्ने गरी स्पर्श गर्दा हुने जति दूरी पर्ने गरी ज झ रेखाको तल्लो भागमा ढ चिन्हो लगाउने ।"
  );
  let EN = newEN(
    "(11) With centre M and with a distance shortest from M to BD mark off N on the lower portion of line HI."
  );
  $("parallel").append(NP, EN);
  NP.scrollIntoView();

  DE.fadeIn(0.5);
  await HI.fadeIn();
  await MNprime.draw();
  await MNprime.swing(M, angle(HI, MNprime) - 90);
  await N.fadeIn();
  DE.fadeOut();
  MNprime.fadeOut();
  await HI.fadeOut(0.1);

  // await MN1.draw();
  // await MN1.swing(M, 45);
  // MN1.fadeOut();
  // await N.fadeIn();
};

const b12 = async () => {
  // Retrieve existing geometry
  const { B, M, N, AC, CG } = geom;

  // Perform step calculations
  let p0 = subtract(M, B);
  let p1 = add(M, B);
  let l0 = new Line(p0, p1, true);
  let O = intersect(l0, AC);
  O = new Point(O.x, O.y, "O", "ण");
  let Oprime = intersect(l0, CG);
  let l1 = new Line(p0, O, true);
  let OOprime = new Line(O, Oprime, true);
  let l2 = new Line(Oprime, p1, true);

  // Store new geometry
  geom.O = O;
  geom.Oprime = Oprime;
  geom.OOprime = OOprime;

  // Animate
  let NP = newNP(
    "b12",
    "(१२) ड मा छोई क ख को समानान्तर रेखा बायाँबाट दायाँतिर खिच्ने र यसले क ग लाई छोएको विन्दुको नाम ण राख्ने ।"
  );
  let EN = newEN(
    "(12) Touching M and starting from O, a point on AC, draw a line from left to right parallel to AB."
  );
  $("parallel").append(NP, EN);
  NP.scrollIntoView();

  N.fadeOut(0.3);
  await l0.draw();
  l0.hide();
  l1.show();
  OOprime.show();
  l2.show();
  l1.fadeOut();
  l2.fadeOut();
  await O.fadeIn();
};

const b13 = async () => {
  // Retrieve existing geometry
  const { L, M, N, O, OOprime } = geom;

  // Perform step calculations
  let LN = new Line(L, N, true);
  let [Q, P] = chord(L, LN.norm, OOprime);
  P = new Point(P.x, P.y, "P", "त");
  Q = new Point(Q.x, Q.y, "Q", "थ");
  const LP = new Line(L, P, true);
  const PNQ = new Arc(L, P, Q, false, true, false);

  // Store new geometry
  geom.P = P;
  geom.Q = Q;
  geom.LN = LN;
  geom.LP = LP;
  geom.PNQ = PNQ;

  // Animate
  let NP = newNP(
    "b13",
    "(१३) ठ केन्द्र लिएर ठ ढ व्यासाद्र्धले तल्लो भागमा वृत्त खण्ड खिच्ने र ण ड बाट गएको रेखालाई यसले छोएको दुवै ठाँउमा क्रमशः त र थ नाम राख्ने ।"
  );
  let EN = newEN(
    "(13) With centre L and radius LN draw a semi-circle on the lower portion and let P and Q be the points where it touches the line OM respectively."
  );
  $("parallel").append(NP, EN);
  NP.scrollIntoView();

  L.fadeIn();
  N.fadeIn();
  O.fadeOut(0.3);
  await M.fadeOut(0.3);
  await LN.draw();
  await LN.swing(L, -PNQ.angle / 2);
  LN.hide();
  LP.show();
  LP.swing(L, PNQ.angle);
  await PNQ.draw();
  OOprime.fadeOut(0.1);
  LP.fadeOut();
  L.fadeOut(0.3);
  P.fadeIn();
  Q.fadeIn();
  await N.fadeOut(0.3);
};

const b14 = async () => {
  // Retrieve existing geometry
  const { M, P, Q } = geom;

  // Perform step calculations
  const MQ = new Line(M, Q, true);
  const PMQ = new Arc(M, Q, P, false, false, false);
  PMQ.angle = 180;

  // Store new geometry
  geom.MQ = MQ;
  geom.PMQ = PMQ;

  // Animate
  let NP = newNP(
    "b14",
    "(१४) ड लाई केन्द्र मानी ड थ व्यासाद्र्धले तल्लो भागमा अर्ध वृत्ताकार त थ लाई छुने गरी खिच्ने ।"
  );
  let EN = newEN(
    "(14) With centre M and radius MQ draw a semi-circle on the lower portion touching P and Q."
  );
  $("parallel").append(NP, EN);
  NP.scrollIntoView();

  M.fadeIn();
  await MQ.draw();
  MQ.swing(M, -PMQ.angle);
  await PMQ.draw();
  await MQ.fadeOut();
};

const b15 = async () => {
  // Retrieve existing geometry
  const { L, M, N, P, Q, HI, LP } = geom;

  // Perform step calculations
  const NM = new Line(N, M, true);
  let [S, R] = twoCircles(N, NM.norm, L, LP.norm);
  R = new Point(R.x, R.y, "R", "द");
  S = new Point(S.x, S.y, "S", "ध");
  const RNS = new Arc(N, R, S, false, false, true);
  const NR = new Line(N, R, true);
  const RS = new Line(R, S, true);
  let T = intersect(RS, HI);
  T = new Point(T.x, T.y, "T", "न");

  // Store new geometry
  geom.R = R;
  geom.S = S;
  geom.NM = NM;
  geom.RNS = RNS;
  geom.NR = NR;
  geom.RS = RS;
  geom.T = T;

  // Animate
  let NP = newNP(
    "b15",
    "(१५) ढ केन्द्र मानी ढ ड को व्यासाद्र्धले त ढ थ वृत्त खण्डको दुवैतर्फ छुने गरी वृत्त खण्ड खिच्ने र यसले तढ थ लाई छोएको विन्दुहरुको नाम क्रमशः द र ढ राख्ने । द ध लाई जोड्ने । द ढ र ज झ काटिएकोविन्दुको नाम न राख्ने ।"
  );
  let EN = newEN(
    "(15) With centre N and radius NM draw an arc touching PNQ at R and S. Join RS. Let T be the point where RS and HI cut one another."
  );
  $("parallel").append(NP, EN);
  NP.scrollIntoView();

  N.fadeIn();
  P.fadeOut(0.3);
  await Q.fadeOut(0.3);
  await NM.draw();
  await NM.swing(N, -RNS.angle / 2);
  NR.show();
  NM.hide();
  NR.swing(N, RNS.angle);
  await RNS.draw();

  R.fadeIn();
  S.fadeIn();
  M.fadeOut(0.3);
  N.fadeOut(0.3);
  RNS.fadeOut(0.1);
  await NR.fadeOut();
  await RS.draw();
  RS.fadeOut(0.1);
  await T.fadeIn();
};

const b16 = async () => {
  // Retrieve existing geometry
  const { R, S, T } = geom;

  // Perform step calculations
  const TS = new Line(T, S, true);
  const RTS = new Arc(T, S, R, false, true, true);
  RTS.angle = 180;

  // Store new geometry
  geom.TS = TS;
  geom.RTS = RTS;

  // Animate
  let NP = newNP(
    "b16",
    "(१६) न लाई केन्द्र मानेर व्यासाद्र्ध न ध ले त ढ थ को माथिल्लो भागमा दुवै ठाँउमा छुने गरी अर्ध वृत्ताकारखिच्ने ।"
  );
  let EN = newEN(
    "(16) With centre T and radius TS draw a semi-circle on the upper portion of PNQ touching it at two points."
  );
  $("parallel").append(NP, EN);
  NP.scrollIntoView();

  await TS.draw();
  TS.swing(T, RTS.angle);
  await RTS.draw();
  TS.fadeOut();
  R.fadeOut(0.3);
  S.fadeOut(0.3);
};

const b17 = async () => {
  // Retrieve existing geometry
  const { L, M, T, LP } = geom;

  // Perform step calculations
  let TM = new Line(T, M, true);
  let [Sprime, Rprime] = twoCircles(T, TM.norm, L, LP.norm);
  const RTSprime = new Arc(T, Rprime, Sprime, true, false);
  RTSprime.angle = 360 - RTSprime.angle; // Dumb hack
  const TRprime = new Line(T, Rprime, true);

  // Store new geometry
  geom.TM = TM;
  geom.Rprime = Rprime;
  geom.Sprime = Sprime;
  geom.RTSprime = RTSprime;
  geom.TRprime = TRprime;

  // Animate
  let NP = newNP(
    "b17",
    "(१७) न लाई केन्द्र मानेर व्यासाद्र्ध न ड ले त ढ थ को माथिल्लो भागमा दुवै ठाँउमा छुने गरी वृत्त खण्डखिच्ने ।"
  );
  let EN = newEN(
    "(17) With centre T and radius TM draw an arc on the upper portion of PNQ touching at two points."
  );
  $("parallel").append(NP, EN);
  NP.scrollIntoView();

  M.fadeIn();
  await TM.draw();
  await TM.swing(T, RTSprime.angle / 2);
  TRprime.show();
  TM.hide();
  TRprime.swing(T, -RTSprime.angle);
  await RTSprime.draw();
  M.fadeOut(0.3);
  T.fadeOut(0.3);
  await TRprime.fadeOut();
};

const b18 = async () => {
  let NP = newNP(
    "b18",
    "(१८) यो अनुसूचीको नं (१६) को अर्ध वृत्ताकार भित्र र नं (१७) को वृत्त खण्ड बाहिर चन्द्रमाको आठवटाबराबरका कोण बनाउने ।"
  );
  let EN = newEN(
    "(18) Eight equal and similar triangles of the moon are to be made in the space lying inside the semi-circle of No. (16) and outside the arc of No. (17) of this Schedule."
  );
  $("parallel").append(NP, EN);
  NP.scrollIntoView();

  sheet.waitingForInput = true;
  let modal = newSVG("g", { transform: "scale(1 -1)" });
  let border = modal.appendSVG("rect", {
    x: 00,
    y: -100,
    width: 100,
    height: 80,
    rx: 15,
    fill: "#89cff0",
  });
  let line1 = modal.appendSVG("text", {
    fill: "black",
    stroke: "none",
    "font-size": 10,
    "text-anchor": "middle",
    x: 50,
    y: -85,
    text: "How do you wish",
  });
  let line2 = modal.appendSVG("text", {
    fill: "black",
    stroke: "none",
    "font-size": 10,
    "text-anchor": "middle",
    x: 50,
    y: -70,
    text: "to interpret step 18?",
  });
  let thumb1 = modal.appendSVG("image", {
    x: 5,
    y: -55,
    width: 28,
    height: 21,
    href: "thumb1.png",
  });
  let thumb2 = modal.appendSVG("image", {
    x: 36,
    y: -55,
    width: 28,
    height: 21,
    href: "thumb2.png",
  });
  let thumb3 = modal.appendSVG("image", {
    x: 67,
    y: -55,
    width: 28,
    height: 21,
    href: "thumb3.png",
  });
  sheet.append(modal);

  let clicked = false;

  thumb1.onclick = async () => {
    clicked = true;
    modal.remove();
    await b18_alt0();
    sheet.waitingForInput = false;
  };
  thumb2.onclick = async () => {
    clicked = true;
    modal.remove();
    await b18_alt1();
    sheet.waitingForInput = false;
  };
  thumb3.onclick = async () => {
    clicked = true;
    modal.remove();
    await b18_alt2();
    sheet.waitingForInput = false;
  };

  setTimeout(async () => {
    if (!clicked) {
      clicked = true;
      modal.remove();
      await b18_alt0();
      sheet.waitingForInput = false;
    }
  }, 30000);
};

const b18_alt0 = async () => {
  // Retrieve existing geometry
  const { R, Rprime, T, TS, TRprime, RTS, RTSprime } = geom;

  // Okay this is the one that has multiple interpretations
  // Perform step calculations
  let lines = [];

  // Option 1
  let q0 = -90 + RTSprime.angle / 2;
  let dq = -RTSprime.angle / 8;
  let p0 = R.rotate(T, q0);
  for (let i = 0; i <= 8; i++) {
    lines.push(new Line(T, p0.rotate(T, dq * i), true));
  }
  let moonrays = new Zigzag(
    T,
    TRprime.norm,
    TS.norm,
    Rprime,
    RTSprime.angle,
    8
  );

  // Store new geometry
  geom.moonrays = moonrays;

  // Animate
  lines.forEach((line) => {
    line.draw();
  });
  await idle(1000 / sheet.speedmult);
  await moonrays.draw();
  lines.forEach((line) => line.fadeOut());
  await RTS.fadeOut(0.1);
};

const b18_alt1 = async () => {
  // Retrieve existing geometry
  const { M, R, T, TS, TRprime, RTS } = geom;

  // Okay this is the one that has multiple interpretations
  // Perform step calculations
  let lines = [];

  // Option 2
  for (let i = 0; i <= 8; i++) {
    lines.push(new Line(T, R.rotate(T, -i * 22.5), true));
  }
  let moonrays = new Zigzag(T, TRprime.norm, TS.norm, M.rotate(T, 90), 180, 8);

  // Store new geometry
  geom.moonrays = moonrays;

  // Animate
  lines.forEach((line) => {
    line.draw();
  });
  await idle(1000 / sheet.speedmult);
  await moonrays.draw();
  lines.forEach((line) => line.fadeOut());
  await RTS.fadeOut(0.1);
};

const b18_alt2 = async () => {
  // Retrieve existing geometry
  const { M, R, T, TS, TRprime, RTS } = geom;

  // Okay this is the one that has multiple interpretations
  // Perform step calculations
  let lines = [];

  // Option 3 (Unconstitutional?)
  for (let i = -1; i <= 9; i++) {
    lines.push(new Line(T, R.rotate(T, -i * 22.5), true));
  }
  let moonrays = new Zigzag(
    T,
    TRprime.norm,
    TS.norm,
    M.rotate(T, 112.5),
    225,
    10
  );

  // Store new geometry
  geom.moonrays = moonrays;

  // Animate
  lines.forEach((line) => {
    line.draw();
  });
  await idle(1000 / sheet.speedmult);
  await moonrays.draw();
  lines.forEach((line) => line.fadeOut());
  await RTS.fadeOut(0.1);
};

const c19 = async () => {
  // Retrieve existing geometry
  const { A, B, F, BE } = geom;

  // Perform step calculations
  const AF = new Line(A, F);
  const U = new Point(A.x, A.y + AF.norm / 2, "U", "प");
  let UV = new Line(U, add(U, B), true);
  let V = intersect(UV, BE);
  V = new Point(V.x, V.y, "V", "फ");
  UV = new Line(U, V, true);

  // Store new geometry
  geom.U = U;
  geom.V = V;
  geom.UV = UV;

  // Animate
  let bNP = newNP("c", "<b>(ग) सूर्य बनाउने तरीका</b>");
  let bEN = newEN("<b>(c) Method of making the sun</b>");
  let NP = newNP(
    "c19",
    "(१९) क च को आधा प बाट क ख को समानान्तर पारेर ख ङ मा छुने गरी प फ रेखा खिच्ने ।"
  );
  let EN = newEN(
    "(19) Bisect line AF at U, and draw a line UV parallel to AB line touching line BE at V."
  );
  $("parallel").append(textbreak(), bNP, bEN, NP, EN);
  NP.scrollIntoView();

  await U.fadeIn();
  await UV.draw();
  await V.fadeIn();
};

const c20 = async () => {
  // Retrieve existing geometry
  const { U, V, HI, NM, UV } = geom;

  // Perform step calculations
  let W = intersect(HI, UV);
  W = new Point(W.x, W.y, "W", "ब");
  const W1 = new Point(W.x - NM.norm, W.y);
  const W2 = new Line(W, W1, true);
  const Wcircle1 = new Circle(W, NM.norm);

  // Store new geometry
  geom.W = W;
  geom.Wcircle1 = Wcircle1;

  // Animate
  let NP = newNP(
    "c20",
    "(२०) ज झ र प फ काटिएको विन्दु व केन्द्र मानेर ड ढ को व्यासाद्र्धले वृत्ताकार पूरा खिच्ने ।"
  );
  let EN = newEN(
    "(20) With centre W, the point where HI and UV cut one another and radius MN draw a circle."
  );
  $("parallel").append(NP, EN);
  NP.scrollIntoView();

  await W.fadeIn();
  U.fadeOut(0.3);
  V.fadeOut(0.3);
  await UV.fadeOut(0.1);
  await W2.draw();
  W2.swing(W, -360);
  await Wcircle1.draw();
  await W2.fadeOut();
};

const c21 = async () => {
  // Retrieve existing geometry
  const { W, LN } = geom;

  // Perform step calculations
  const W1 = new Point(W.x - LN.norm, W.y);
  const W2 = new Line(W, W1, true);
  const Wcircle2 = new Circle(W, LN.norm, true);

  // Store new geometry
  geom.Wcircle2 = Wcircle2;

  // Animate
  let NP = newNP(
    "c21",
    "(२१) ब लाई केन्द्र मानेर ठ ढ व्यासाद्र्धले वृत्ताकार पूरा खिच्ने ।"
  );
  let EN = newEN("(21) With centre W and radius LN draw a circle.");
  $("parallel").append(NP, EN);
  NP.scrollIntoView();

  await W2.draw();
  W2.swing(W, -360);
  await Wcircle2.draw();
  await W2.fadeOut();
};

const c22 = async () => {
  // Retrieve existing geometry
  const { W, LN, NM, Wcircle2 } = geom;

  // Perform step calculations
  let lines = [];
  let W1 = new Point(W.x - LN.norm, W.y);
  let W2 = new Point(W.x - NM.norm, W.y).rotate(W, -45);
  for (let i = 0; i < 12; i++) {
    lines.push(new Line(W, W1.rotate(W, i * 30), true));
  }

  const sunrays = new Zigzag(W, NM.norm, LN.norm, W2, 360, 12);

  // Store new geometry
  geom.sunrays = sunrays;

  // Animate
  let NP = newNP(
    "c22",
    "(२२) यो अनुसूचीको नं (२०) को वृत्ताकार बाहिर र यो अनुसूचीको नं.(२१) को वृत्ताकारभित्र परेको गोलघेराको बीच भागमा सूर्यको बाह्रवटा बराबरका कोणहरु दुई चुच्चाहरुले ज झ रेखामा छुने गरीबनाउने ।"
  );
  let EN = newEN(
    "(22) Twelve equal and similar triangles of the sun are to be made in the space enclosed by the circles of No. (20) and of No. (21) with the two apexes of two triangles touching line HI."
  );
  $("parallel").append(NP, EN);
  NP.scrollIntoView();

  lines.forEach((line) => line.draw());
  await idle(1000 / sheet.speedmult);
  await sunrays.draw(0.6);
  lines.forEach((line) => line.fadeOut());
  await Wcircle2.fadeOut(0.1);
};

const d23 = async () => {
  // Retrieve existing geometry
  const { A, B, C, E, G, N, T, W, AB, AC, BE, CG, EG } = geom;

  // Perform step calculations
  let TN = new Line(T, N, true);
  let border = TN.norm;

  let A0 = new Point(A.x - border, A.y);
  let A1 = A0.rotate(A, 90);
  let A2 = new Line(A, A0);
  let A3 = new Line(A, A1);
  let E0 = new Point(E.x, E.y - border);
  let E1 = E0.rotate(E, -angle(BE, EG));
  let E2 = new Line(E, E0);
  let E3 = new Line(E, E1);
  let B0 = new Point(B.x, B.y - border);
  let B1 = B0.rotate(B, angle(AB, BE));
  let B2 = new Line(B, B0);
  let B3 = new Line(B, B1);
  let G0 = new Point(G.x, G.y - border);
  let G1 = G0.rotate(G, 180 + angle(EG, CG));
  let G2 = new Line(G, G0);
  let G3 = new Line(G, G1);
  let C0 = new Point(C.x - border, C.y);
  let C1 = C0.rotate(C, angle(AC, CG));
  let C2 = new Line(C, C0);
  let C3 = new Line(C, C1);

  let A4 = new Point(A1.x - B0.x, A1.y);
  let A5 = new Point(A0.x, A0.y - C0.y);
  let B4 = new Point(B0.x + B0.x, B0.y);
  let B5 = add(B1, subtract(B1, E1));
  let G4 = new Point(G0.x + G0.x, G0.y);
  let G5 = add(G1, subtract(G1, C1));
  let C4 = new Point(C0.x, C0.y + C0.y);
  let C5 = add(C1, subtract(C1, G1));

  let AB0 = new Line(A4, B4, true);
  let BE0 = new Line(B5, E1, true);
  let EG0 = new Line(G4, E0, true);
  let CG0 = new Line(C5, G5, true);
  let AC0 = new Line(A5, C4, true);

  let Aborder = intersect(AC0, AB0);
  let Bborder = intersect(AB0, BE0);
  let Cborder = intersect(AC0, CG0);
  let Eborder = intersect(BE0, EG0);
  let Gborder = intersect(CG0, EG0);

  let ABborder = new Line(Aborder, Bborder);
  let BEborder = new Line(Bborder, Eborder);
  let EGborder = new Line(Eborder, Gborder);
  let CGborder = new Line(Cborder, Gborder);
  let ACborder = new Line(Aborder, Cborder);

  // Store new geometry
  geom.Aborder = Aborder;
  geom.Bborder = Bborder;
  geom.Cborder = Cborder;
  geom.Eborder = Eborder;
  geom.Gborder = Gborder;
  geom.ABborder = ABborder;
  geom.BEborder = BEborder;
  geom.CGborder = CGborder;
  geom.EGborder = EGborder;
  geom.ACborder = ACborder;

  // Animate
  let bNP = newNP("d", "<b>(घ) किनारा बनाउने तरीका</b>");
  let bEN = newEN("<b>(d) Method of making the border</b>");
  let NP = newNP(
    "d23",
    "(२३) न ठ को चौडाइ जति गाढा नीलो रङ्गको किनारा झण्डाको आकारको बाहिरि सबैतिरको सीमामा थप्ने,तर झण्डाको पाँच कोणहरुमा चाहिँ बाहिरी कोणहरु पनि भित्रै सरहका बनाउने ।"
  );
  let EN = newEN(
    "(23) The width of the border will be equal to the width TN. This will be of deep blue colour and will be provided on all the side of the flag. However, on the five angles of the flag the external angles will be equal to the internal angles."
  );
  $("parallel").append(textbreak(), bNP, bEN, NP, EN);
  NP.scrollIntoView();

  W.fadeOut(0.3);
  T.fadeIn();
  await N.fadeIn();
  await TN.draw();
  AB0.draw();
  BE0.draw();
  EG0.draw();
  CG0.draw();
  await AC0.draw();
  T.fadeOut(0.3);
  N.fadeOut(0.3);
  TN.fadeOut();
  AB0.fadeOut();
  BE0.fadeOut();
  EG0.fadeOut();
  CG0.fadeOut();
  AC0.fadeOut();
  ABborder.fadeIn();
  BEborder.fadeIn();
  EGborder.fadeIn();
  CGborder.fadeIn();
  await ACborder.fadeIn();
};

const d24 = async () => {
  // Retrieve existing geometry
  const {
    A,
    B,
    C,
    E,
    G,
    P,
    Q,
    T,
    Aborder,
    Bborder,
    Cborder,
    Eborder,
    Gborder,
    PMQ,
    PNQ,
    RTSprime,
    sunrays,
    moonrays,
  } = geom;

  // Perform step calculations
  const border = newSVG("path", {
    class: "border",
    stroke: "none",
    fill: "url(#bordercolor)",
    d: `M ${Aborder.x} ${Aborder.y} L ${Bborder.x} ${Bborder.y} ${Eborder.x} ${Eborder.y} ${Gborder.x} ${Gborder.y} ${Cborder.x} ${Cborder.y} z`,
  });
  const field = newSVG("path", {
    class: "field",
    stroke: "none",
    fill: "url(#fieldcolor)",
    d: ["M", A.x, A.y, "L", B.x, B.y, E.x, E.y, G.x, G.y, C.x, C.y, "z"].join(
      " "
    ),
  });
  const moon0 = newSVG("path", {
    class: "moon",
    stroke: "none",
    fill: "url(#symbolcolor)",
    d: [
      "M",
      P.x,
      P.y,
      "A",
      PNQ.r,
      PNQ.r,
      PNQ.angle,
      0,
      1,
      Q.x,
      Q.y,
      PMQ.r,
      PMQ.r,
      PMQ.angle,
      0,
      0,
      P.x,
      P.y,
      "z",
    ].join(" "),
  });
  const moon1 = newSVG("circle", {
    class: "moon",
    stroke: "none",
    fill: "url(#symbolcolor)",
    cx: T.x,
    cy: T.y,
    r: RTSprime.r,
  });
  const moon2 = newSVG("path", {
    class: "moon",
    stroke: "none",
    fill: "url(#symbolcolor)",
    d: moonrays.node.getAttribute("d") + " z",
  });

  const sun = newSVG("path", {
    class: "sun",
    stroke: "none",
    fill: "url(#symbolcolor)",
    d: sunrays.node.getAttribute("d") + "z",
  });

  sheet.prepend(border, field, moon0, moon1, moon2, sun);
  const t1 = newSVG("animateTransform", {
    attributeName: "gradientTransform",
    type: "translate",
    from: `0 0`,
    to: `300 0`,
    additive: "sum",
    dur: 4 / sheet.speedmult,
    fill: "freeze",
    begin: "indefinite",
  });
  const t2 = t1.cloneNode();
  const t3 = t1.cloneNode();
  $("bordercolor").appendChild(t1);
  $("fieldcolor").appendChild(t2);
  $("symbolcolor").appendChild(t3);

  // Store new geometry

  // Animate
  let NP = newNP(
    "d24",
    "(२४) झण्डा डोरी लगाई प्रयोग गरेमा माथि बताइएकै पट्टि राख्ने । झण्डा लट्ठीमा घुसार्ने हो भने क ग पट्टिआवश्यक परे जति किनारा चौडयाउने । डोरी वा लट्ठीको प्रयोगमा क ग को पट्टिमा प्वाल राख्ने ।"
  );
  let EN = newEN(
    "(24) The above-mentioned border will be provided in case the flag is to be used with a rope. On the other hand, in case it is to be hoisted on a pole, the hole on the border on the side AC can be extended in accordance with requirements."
  );
  let NPex = newNP(
    "ex",
    "<i>स्पष्टीकरणः– झण्डा बनाउँदा खिचिएका ज झ द ध, च ङ, ङ घ, ञ छ, ण थ, ञ ट र प फरेखाहरु कल्पित हुन् । त्यस्तै सूर्यका बाहिरी र भित्री वृत्ताकारहरु तथा खुर्पे चन्द्र बाहेक अरु वृत्त खण्डपनि कल्पित हुन् । यिनलाई झण्डामा देखाइँदैन ।</i>"
  );
  let ENex = newEN(
    "<i>Explanation: The lines HI, RS, FE, ED, JG, OQ, JK and UV are imaginary. Similarly, the external and internal circles of the sun and the other arcs except the crescent moon are also imaginary. These are not shown on the flag.</i>"
  );
  $("parallel").append(NP, EN, textbreak(), NPex, ENex);
  NP.scrollIntoView();

  t1.beginElement();
  t2.beginElement();
  t3.beginElement();
  await idle(5000 / sheet.speedmult);

  for (let geometry of Object.values(geom)) {
    if (geometry instanceof Point) {
      geometry.fadeOut(0.001);
    } else {
      geometry.fadeOut();
    }
  }
  await idle(1000 / sheet.speedmult);

  const shimmer1 = newSVG("g", { transform: "rotate(-30)" });
  const shimmer2 = shimmer1.appendSVG("rect", {
    x: -300,
    y: 0,
    width: 50,
    height: 400,
    fill: "url(#shimmer)",
  });
  const shimmer3 = shimmer2.appendSVG("animate", {
    attributeName: "x",
    from: -300,
    to: 100,
    dur: 1 / sheet.speedmult,
    begin: "indefinite",
  });
  sheet.append(shimmer1);
  await idle(1000 / sheet.speedmult);
  shimmer3.beginElement();
};

let titlescreen = sheet.appendSVG("g", { id: "titlescreen" });
let line1 = titlescreen.appendSVG("text", {
  transform: "scale (1 -1)",
  fill: "black",
  stroke: "none",
  "font-size": 18,
  "text-anchor": "middle",
  x: 50,
  y: -20,
  text: "LET’S PLAY",
});
let line2 = titlescreen.appendSVG("text", {
  transform: "scale (1 -1)",
  fill: "black",
  stroke: "none",
  "font-size": 10,
  "text-anchor": "middle",
  x: 50,
  y: -7,
  text: "The flag of Nepal",
});
let line3 = titlescreen.appendSVG("text", {
  transform: "scale (1 -1)",
  fill: "black",
  stroke: "none",
  "font-size": 10,
  "text-anchor": "middle",
  x: 50,
  y: 15,
  text: "अग्रिम गर्न क्लिक गर्नुहोस्",
});
let line4 = titlescreen.appendSVG("text", {
  transform: "scale (1 -1)",
  fill: "black",
  stroke: "none",
  "font-size": 10,
  "text-anchor": "middle",
  x: 50,
  y: 30,
  text: "Click to proceed",
});

const steps = [
  a1,
  a2,
  a3,
  a4,
  a5,
  b6,
  b7,
  b8,
  b9,
  b10,
  b11,
  b12,
  b13,
  b14,
  b15,
  b16,
  b17,
  b18,
  c19,
  c20,
  c21,
  c22,
  d23,
  d24,
];
let step = 0;
let clicked = false;
let done = false;
sheet.onclick = async (e) => {
  if (!clicked && !sheet.waitingForInput && !done) {
    clicked = true;
    await steps[step]();
    step += 1;
    if (step >= 24) {
      done = true;
    }
    clicked = false;
  }
};
