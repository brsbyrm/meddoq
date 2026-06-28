export const fontaineConfig = {
  slug: "fontaine-classification",
  category: "Vascular",
  title: "Fontaine Classification Calculator",
  description:
    "Classify peripheral artery disease severity using Fontaine clinical stages from asymptomatic disease to claudication, rest pain, and tissue loss.",
  type: "single-choice",
  inputName: "fontaine",
  defaultValue: "I",
  options: [
    {
      value: "I",
      title: "Stage I",
      label: "Asymptomatic",
      description: "Peripheral arterial disease without typical limb symptoms.",
      tone: "green",
      interpretation:
        "Fontaine stage I describes asymptomatic PAD, which may still carry cardiovascular risk.",
      recommendation:
        "Confirm objective PAD when suspected and optimize cardiovascular risk reduction.",
    },
    {
      value: "IIa",
      title: "Stage IIa",
      label: "Mild claudication",
      description: "Intermittent claudication with walking distance greater than 200 meters.",
      tone: "blue",
      interpretation:
        "Stage IIa indicates claudication with relatively preserved walking distance.",
      recommendation:
        "Use exercise therapy, risk-factor modification, antithrombotic/lipid management when appropriate, and objective perfusion assessment.",
    },
    {
      value: "IIb",
      title: "Stage IIb",
      label: "Moderate to severe claudication",
      description: "Intermittent claudication with walking distance less than 200 meters.",
      tone: "amber",
      interpretation:
        "Stage IIb indicates more functionally limiting claudication.",
      recommendation:
        "Assess ABI or toe pressure and consider anatomic imaging when symptoms remain lifestyle-limiting despite optimal therapy.",
    },
    {
      value: "III",
      title: "Stage III",
      label: "Ischemic rest pain",
      description: "Rest pain due to chronic limb ischemia.",
      tone: "red",
      interpretation:
        "Stage III suggests advanced ischemia and possible chronic limb-threatening ischemia.",
      recommendation:
        "Arrange urgent objective perfusion testing and vascular evaluation.",
    },
    {
      value: "IV",
      title: "Stage IV",
      label: "Ulceration or gangrene",
      description: "Tissue loss, ulceration, or gangrene related to severe ischemia.",
      tone: "red",
      interpretation:
        "Stage IV indicates tissue loss and high limb threat.",
      recommendation:
        "Assess wound, ischemia, infection, toe pressure, and revascularization feasibility urgently.",
    },
  ],
  reference: {
    clinicalMeaning:
      "Fontaine classification is a symptom-based PAD staging system ranging from asymptomatic disease to claudication, rest pain, and gangrene.",
    severity:
      "Stage I is asymptomatic. Stage II is claudication. Stage III is ischemic rest pain. Stage IV indicates ulceration or gangrene.",
    nextStep:
      "Use Fontaine stage together with ABI, toe pressure, duplex ultrasound, CTA, MRA, or angiography depending on clinical severity.",
    pearls: [
      "Fontaine III and IV suggest chronic limb-threatening ischemia.",
      "Claudication distance should be documented because it affects functional severity.",
      "Diabetes and renal failure may mask classic pain symptoms.",
    ],
    pitfalls: [
      "Equating Fontaine II with benign disease in every patient.",
      "Ignoring tissue loss because pain is absent.",
      "Using symptom stage alone to decide revascularization.",
    ],
    faq: [
      {
        question: "What does Fontaine IIb mean?",
        answer:
          "Fontaine IIb generally indicates claudication with walking distance less than 200 meters, suggesting more functionally significant PAD.",
      },
      {
        question: "Which Fontaine stages suggest limb threat?",
        answer:
          "Fontaine III and IV suggest advanced ischemia or chronic limb-threatening ischemia and require vascular assessment.",
      },
    ],
    references: ["Fontaine R et al. Classification of chronic arterial ischemia of the limbs."],
    related: ["Rutherford Classification", "WIfI Classification", "ABI", "Aortic Size Index"],
  },
};
