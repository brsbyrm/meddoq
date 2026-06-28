export const rutherfordConfig = {
  slug: "rutherford-classification",
  category: "Vascular",
  title: "Rutherford Classification Calculator",
  description:
    "Classify chronic lower-extremity peripheral artery disease severity from asymptomatic PAD to claudication, rest pain, and tissue loss.",
  type: "single-choice",
  inputName: "rutherford",
  defaultValue: "0",
  options: [
    {
      value: "0",
      title: "Category 0",
      label: "Asymptomatic",
      description: "No clinically apparent limb ischemia symptoms.",
      tone: "green",
      interpretation:
        "Asymptomatic PAD may still carry systemic cardiovascular risk and should be interpreted with ABI, pulse findings, and risk-factor profile.",
      recommendation:
        "Optimize cardiovascular risk reduction and consider ABI or vascular follow-up when PAD is suspected or objectively documented.",
    },
    {
      value: "1",
      title: "Category 1",
      label: "Mild claudication",
      description: "Claudication with mild limitation of walking performance.",
      tone: "blue",
      interpretation:
        "Mild claudication usually indicates exertional ischemic symptoms with preserved daily function.",
      recommendation:
        "Use guideline-directed medical therapy, structured exercise therapy, smoking cessation, and objective perfusion assessment.",
    },
    {
      value: "2",
      title: "Category 2",
      label: "Moderate claudication",
      description: "Claudication with clear functional limitation.",
      tone: "amber",
      interpretation:
        "Moderate claudication affects routine activity and should prompt structured assessment of walking limitation and hemodynamic severity.",
      recommendation:
        "Assess ABI or toe pressure, optimize medical therapy, begin exercise therapy, and consider imaging if revascularization is being discussed.",
    },
    {
      value: "3",
      title: "Category 3",
      label: "Severe claudication",
      description: "Marked limitation from short-distance claudication.",
      tone: "amber",
      interpretation:
        "Severe claudication is lifestyle-limiting PAD and may justify anatomical imaging when symptoms remain unacceptable despite optimal therapy.",
      recommendation:
        "Confirm hemodynamic significance and evaluate revascularization feasibility when symptoms remain lifestyle-limiting.",
    },
    {
      value: "4",
      title: "Category 4",
      label: "Ischemic rest pain",
      description: "Chronic limb-threatening ischemia presenting with rest pain.",
      tone: "red",
      interpretation:
        "Rest pain suggests chronic limb-threatening ischemia and requires urgent vascular assessment.",
      recommendation:
        "Obtain objective perfusion testing and urgent vascular imaging to assess revascularization options.",
    },
    {
      value: "5",
      title: "Category 5",
      label: "Minor tissue loss",
      description: "Non-healing ulcer or focal gangrene with limb salvage potential.",
      tone: "red",
      interpretation:
        "Minor tissue loss indicates chronic limb-threatening ischemia until proven otherwise.",
      recommendation:
        "Assess WIfI stage, toe pressure, infection, wound depth, and revascularization feasibility urgently.",
    },
    {
      value: "6",
      title: "Category 6",
      label: "Major tissue loss",
      description: "Extensive gangrene or major tissue loss threatening limb viability.",
      tone: "red",
      interpretation:
        "Major tissue loss indicates advanced limb threat with high amputation risk.",
      recommendation:
        "Arrange urgent vascular evaluation, infection control, imaging, wound planning, and shared decision-making regarding limb salvage versus major amputation.",
    },
  ],
  reference: {
    clinicalMeaning:
      "The Rutherford classification grades chronic limb ischemia from asymptomatic disease to major tissue loss. It is widely used for PAD severity description and vascular decision-making.",
    severity:
      "Mild disease usually refers to asymptomatic PAD or mild claudication. Moderate disease reflects lifestyle-limiting claudication. Severe disease includes ischemic rest pain, ulceration, gangrene, or threatened limb viability.",
    nextStep:
      "Confirm symptoms, perform vascular examination, obtain objective perfusion testing, and proceed to duplex ultrasound or CTA/MRA/angiography when revascularization is being considered.",
    pearls: [
      "Rest pain and tissue loss should not be managed as simple claudication.",
      "Objective perfusion testing is essential, especially in diabetes and renal failure.",
      "Tissue loss requires combined wound, ischemia, infection, and revascularization planning.",
    ],
    pitfalls: [
      "Using Rutherford class without ABI, toe pressure, or imaging.",
      "Underestimating neuropathic diabetic patients with silent ischemia.",
      "Calling a wound venous or traumatic without assessing arterial perfusion.",
    ],
    faq: [
      {
        question: "What is the difference between Rutherford 3 and Rutherford 4?",
        answer:
          "Rutherford 3 is severe claudication with exertional symptoms. Rutherford 4 is ischemic rest pain and suggests chronic limb-threatening ischemia.",
      },
      {
        question: "Do Rutherford 5 and 6 require urgent assessment?",
        answer:
          "Yes. Tissue loss or gangrene should prompt urgent vascular assessment, infection evaluation, wound planning, and consideration of revascularization feasibility.",
      },
    ],
    references: ["Rutherford RB et al. J Vasc Surg. 1997."],
    related: ["Fontaine Classification", "WIfI Classification", "ABI", "Aortic Size Index"],
  },
};
