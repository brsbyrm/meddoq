import { defaultCalculatorContent } from "./defaultCalculatorContent";

const content = {
  "rutherford-classification": {
    category: "Vascular",
    title: "Rutherford Classification",
    description:
      "Classify chronic limb ischemia severity from asymptomatic PAD to claudication, rest pain, tissue loss, and major tissue loss.",
    result: {
      title: "Rutherford Category",
      unit: "clinical category",
      interpretation:
        "Rutherford category describes symptomatic PAD severity and helps communicate urgency, limb threat, and revascularization planning.",
      recommendation:
        "Correlate the category with pulse examination, ABI or toe pressure, duplex ultrasound, wound status, infection, and anatomic imaging when revascularization is considered.",
    },
    interpretation: {
      clinicalMeaning:
        "The Rutherford classification grades chronic limb ischemia from asymptomatic disease to major tissue loss. It is widely used for PAD severity description and vascular decision-making.",
      severity:
        "Mild disease usually refers to asymptomatic PAD or mild claudication. Moderate disease reflects lifestyle-limiting claudication. Severe disease includes ischemic rest pain, ulceration, gangrene, or threatened limb viability.",
      nextStep:
        "Confirm symptoms, perform vascular examination, obtain objective perfusion testing, and proceed to duplex ultrasound or CTA/MRA/angiography when revascularization is being considered.",
    },
    notes: {
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
    },
    related: ["Fontaine Classification", "WIfI Classification", "Wells DVT", "Aortic Size Index"],
  },

  "wifi-classification": {
    category: "Vascular",
    title: "WIfI Classification",
    description:
      "Grade wound, ischemia, and foot infection to estimate limb threat and guide CLTI limb-salvage planning.",
    result: {
      title: "WIfI Stage",
      unit: "limb threat",
      interpretation:
        "WIfI stage estimates threatened limb severity by combining wound burden, ischemia, and infection.",
      recommendation:
        "Assess toe pressure or ABI, document wound and infection grade, optimize infection control, and consider vascular imaging when revascularization may improve limb salvage.",
    },
    interpretation: {
      clinicalMeaning:
        "The WIfI system grades wound extent, ischemia severity, and foot infection to estimate amputation risk and potential benefit from revascularization in chronic limb-threatening ischemia.",
      severity:
        "Higher wound, ischemia, and infection grades indicate higher amputation risk and greater need for coordinated limb-salvage care.",
      nextStep:
        "Document wound grade, obtain toe pressure when possible, assess infection severity, and plan multidisciplinary wound care and revascularization evaluation.",
    },
    notes: {
      pearls: [
        "Toe pressure is often more reliable than ABI in diabetes and calcified vessels.",
        "WIfI is most useful for threatened limbs, not routine claudication.",
        "Infection control and revascularization planning should proceed together.",
      ],
      pitfalls: [
        "Using ABI alone in heavily calcified arteries.",
        "Ignoring infection grade when ischemia appears mild.",
        "Treating wound size without assessing perfusion.",
      ],
    },
    related: ["Rutherford Classification", "Fontaine Classification", "CEAP Classification", "VCSS"],
  },

  "meld-score": {
    category: "Hepatology",
    title: "MELD Score",
    description:
      "Estimate short-term mortality risk in advanced liver disease using bilirubin, INR, and creatinine.",
    result: {
      title: "MELD Score",
      unit: "points",
      interpretation:
        "Higher MELD scores indicate greater short-term mortality risk in advanced liver disease.",
      recommendation:
        "Review renal function, anticoagulation or INR context, infection, bleeding, encephalopathy, sodium, and transplant referral criteria.",
    },
    interpretation: {
      clinicalMeaning:
        "MELD estimates mortality risk in advanced liver disease and is commonly used in transplant prioritization and cirrhosis severity assessment.",
      severity:
        "Low MELD suggests lower short-term mortality, while progressively higher scores indicate increasing risk and transplant urgency.",
      nextStep:
        "Assess for decompensation, renal dysfunction, infection, gastrointestinal bleeding, encephalopathy, and transplant center referral when appropriate.",
    },
    notes: {
      pearls: [
        "Creatinine heavily influences MELD and should be interpreted carefully in sarcopenia.",
        "INR may be affected by anticoagulation and laboratory variability.",
        "MELD-Na may better reflect risk when hyponatremia is present.",
      ],
      pitfalls: [
        "Ignoring acute kidney injury or infection when interpreting the score.",
        "Applying the result without considering transplant eligibility.",
        "Using MELD alone for procedural risk decisions.",
      ],
    },
    related: ["MELD-Na Score", "Child-Pugh Score", "ALBI Score", "APRI Score"],
  },
};

export function getCalculatorContent(slug) {
  const specific = content[slug] || {};

  return {
    ...defaultCalculatorContent,
    ...specific,
    result: {
      ...defaultCalculatorContent.result,
      ...(specific.result || {}),
    },
    interpretation: {
      ...defaultCalculatorContent.interpretation,
      ...(specific.interpretation || {}),
    },
    notes: {
      ...defaultCalculatorContent.notes,
      ...(specific.notes || {}),
    },
    faq: specific.faq || defaultCalculatorContent.faq,
    references: specific.references || defaultCalculatorContent.references,
    related: specific.related || defaultCalculatorContent.related,
  };
}
