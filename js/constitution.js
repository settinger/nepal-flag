// Works cited:
// https://www.lawcommission.gov.np/en/wp-content/uploads/2021/01/Constitution-of-Nepal.pdf
// https://www.lawcommission.gov.np/np/wp-content/uploads/2021/01/%E0%A4%A8%E0%A5%87%E0%A4%AA%E0%A4%BE%E0%A4%B2%E0%A4%95%E0%A5%8B-%E0%A4%B8%E2%80%8C%E0%A4%82%E0%A4%B5%E0%A4%BF%E0%A4%A7%E0%A4%BE%E0%A4%A8.pdf
// https://www.lawcommission.gov.np/np/archives/1962

const sectionsEN = [
  "(a) Method of making the shape inside the border",
  "(b) Method of making the moon",
  "(c) Method of making the sun",
  "(d) Method of making the border",
];

const subsectionsEN = [
  [
    "(1) On the lower portion of a crimson cloth draw a line AB of the required length from left to right.",
    "(2) From A draw a line AC perpendicular to AB making AC equal to AB plus one third AB. From AC mark off D making line AD equal to line AB. Join B and D.",
    "(3) From BD mark off E making BE equal to AB.",
    "(4) Touching E draw a line FG, starting from the point F on line AC, and parallel to AB to the right hand-side. Mark off FG equal to AB.",
    "(5) Join C and G.",
  ],
  [
    "(6) From AB mark off AH making AH equal to one-fourth of line AB and starting from H draw a line HI parallel to line AC touching line CG at point I.",
    "(7) Bisect CF at J and draw a line JK parallel to AB touching CG at point K.",
    "(8) Let L be the point where lines JK and HI cut one another.",
    "(9) Join J and G.",
    "(10) Let M be the point where line JG and HI cut one another.",
    "(11) With centre M and with a distance shortest from M to BD mark off N on the lower portion of line HI.",
    "(12) Touching M and starting from O, a point on AC, draw a line from left to right parallel to AB.",
    "(13) With centre L and radius LN draw a semi-circle on the lower portion and let P and Q be the points where it touches the line OM respectively.",
    "(14) With centre M and radius MQ draw a semi-circle on the lower portion touching P and Q.",
    "(15) With centre N and radius NM draw an arc touching PNQ at R and S. Join RS. Let T be the point where RS and HI cut one another.",
    "(16) With centre T and radius TS draw a semi-circle on the upper portion of PNQ touching it at two points.",
    "(17) With centre T and radius TM draw an arc on the upper portion of PNQ touching at two points.",
    "(18) Eight equal and similar triangles of the moon are to be made in the space lying inside the semi-circle of No. (16) and outside the arc of No. (17) of this Schedule.",
  ],
  [
    "(19) Bisect line AF at U, and draw a line UV parallel to AB line touching line BE at V.",
    "(20) With centre W, the point where HI and UV cut one another and radius MN draw a circle.",
    "(21) With centre W and radius LN draw a circle.",
    "(22) Twelve equal and similar triangles of the sun are to be made in the space enclosed by the circles of No. (20) and of No. (21) with the two apexes of two triangles touching line HI.",
  ],
  [
    "(23) The width of the border will be equal to the width TN. This will be of deep blue colour and will be provided on all the side of the flag. However, on the five angles of the flag the external angles will be equal to the internal angles.",
    "(24) The above-mentioned border will be provided in case the flag is to be used with a rope. On the other hand, in case it is to be hoisted on a pole, the hole on the border on the side AC can be extended in accordance with requirements.",
  ],
];

const sectionsNP = [
  "(क) किनाराभित्रको आकार बनाउने तरीका",
  "(ख) चन्द्र बनाउने तरिका",
  "(ग) सूर्य बनाउने तरीका",
  "(घ) किनारा बनाउने तरीका",
];

const subsectionsNP = [
  [
    "(१) एउटा सिम्रिक रङ्गको रातो कपडामा तल्लो भागमा चहिएको जति लम्बाईको रेखा बायाँबाट दाहिनेतिर खिच्ने र यसलाई क ख नाम राख्ने ।",
    "(२) क बाट सीधा माथि ग सम्म क ख को लम्बाई जतिमा क ख कै तृतीयांश थप्दा जति हुन्छ त्यति लामो हुने गरी क ग रेखा खिच्ने । क ग मा क ख को लम्बाई जति लिई घ चिन्हो लगाउने । ख र घ जोड्ने ।",
    "(३) ख घ रेखामा ख बाट क ख जति लिई ङ चिन्हो लाउने ।",
    "(४) ङ हुँदै क ख को समानान्तर पारेर क ग मा पर्ने विन्दु च बाट शुरु गरी दाहिनेतिर छ सम्म क ख को लम्बाई जति रेखा खिच्ने ।",
    "(५) ग र छ लाई जोड्ने ।",
  ],
  [
    "(६) क ख को चतुर्थांश जति क बाट दाहिनेमा ज चिन्हो लाउने र त्यहाँबाट माथि क ग को समानान्तर पारेर ग छ लाई झ मा छुने रेखा खिच्ने ।",
    "(७) ग च को आधा ञ बाट क ख को समानान्तर पारेर रेखा दायाँतिर खिची ग छ लाई ट मा छुने ।",
    "(८) ञ ट र ज झ रेखा काटिएको ठाउँमा ठ चिन्हो राख्ने ।",
    "(९) ञ र छ जोड्ने ।",
    "(१०) ञ छ र ज झ काटिएको विन्दुमा ड चिन्हो लाउने ।",
    "(११) ड लाई केन्द्र मानी ख घ रेखालाई न्यूनतम अन्तर पर्ने गरी स्पर्श गर्दा हुने जति दूरी पर्ने गरी ज झ रेखाको तल्लो भागमा ढ चिन्हो लगाउने ।",
    "(१२) ड मा छोई क ख को समानान्तर रेखा बायाँबाट दायाँतिर खिच्ने र यसले क ग लाई छोएको विन्दुको नाम ण राख्ने ।",
    "(१३) ठ केन्द्र लिएर ठ ढ व्यासाद्र्धले तल्लो भागमा वृत्त खण्ड खिच्ने र ण ड बाट गएको रेखालाई यसले छोएको दुवै ठाँउमा क्रमशः त र थ नाम राख्ने ।",
    "(१४) ड लाई केन्द्र मानी ड थ व्यासाद्र्धले तल्लो भागमा अर्ध वृत्ताकार त थ लाई छुने गरी खिच्ने ।",
    "(१५) ढ केन्द्र मानी ढ ड को व्यासाद्र्धले त ढ थ वृत्त खण्डको दुवैतर्फ छुने गरी वृत्त खण्ड खिच्ने र यसले तढ थ लाई छोएको विन्दुहरुको नाम क्रमशः द र ढ राख्ने । द ध लाई जोड्ने । द ढ र ज झ काटिएकोविन्दुको नाम न राख्ने ।",
    "(१६) न लाई केन्द्र मानेर व्यासाद्र्ध न ध ले त ढ थ को माथिल्लो भागमा दुवै ठाँउमा छुने गरी अर्ध वृत्ताकारखिच्ने ।",
    "(१७) न लाई केन्द्र मानेर व्यासाद्र्ध न ड ले त ढ थ को माथिल्लो भागमा दुवै ठाँउमा छुने गरी वृत्त खण्डखिच्ने ।",
    "(१८) यो अनुसूचीको नं (१६) को अर्ध वृत्ताकार भित्र र नं (१७) को वृत्त खण्ड बाहिर चन्द्रमाको आठवटाबराबरका कोण बनाउने ।",
  ],
  [
    "(१९) क च को आधा प बाट क ख को समानान्तर पारेर ख ङ मा छुने गरी प फ रेखा खिच्ने ।",
    "(२०) ज झ र प फ काटिएको विन्दु व केन्द्र मानेर ड ढ को व्यासाद्र्धले वृत्ताकार पूरा खिच्ने ।",
    "(२१) ब लाई केन्द्र मानेर ठ ढ व्यासाद्र्धले वृत्ताकार पूरा खिच्ने ।",
    "(२२) यो अनुसूचीको नं (२०) को वृत्ताकार बाहिर र यो अनुसूचीको नं.(२१) को वृत्ताकारभित्र परेको गोलघेराको बीच भागमा सूर्यको बाह्रवटा बराबरका कोणहरु दुई चुच्चाहरुले ज झ रेखामा छुने गरीबनाउने ।",
  ],
  [
    "(२३) न ठ को चौडाइ जति गाढा नीलो रङ्गको किनारा झण्डाको आकारको बाहिरि सबैतिरको सीमामा थप्ने,तर झण्डाको पाँच कोणहरुमा चाहिँ बाहिरी कोणहरु पनि भित्रै सरहका बनाउने ।",
    "(२४) झण्डा डोरी लगाई प्रयोग गरेमा माथि बताइएकै पट्टि राख्ने । झण्डा लट्ठीमा घुसार्ने हो भने क ग पट्टिआवश्यक परे जति किनारा चौडयाउने । डोरी वा लट्ठीको प्रयोगमा क ग को पट्टिमा प्वाल राख्ने ।",
  ],
];

// Explanation: The lines HI, RS, FE, ED, JG, OQ, JK and UV are imaginary. Similarly, the external and internal circles of the sun and the other arcs except the crescent moon are also imaginary. These are not shown on the flag.

// स्पष्टीकरणः– झण्डा बनाउँदा खिचिएका ज झ द ध, च ङ, ङ घ, ञ छ, ण थ, ञ ट र प फरेखाहरु कल्पित हुन् । त्यस्तै सूर्यका बाहिरी र भित्री वृत्ताकारहरु तथा खुर्पे चन्द्र बाहेक अरु वृत्त खण्डपनि कल्पित हुन् । यिनलाई झण्डामा देखाइँदैन ।
