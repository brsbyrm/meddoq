export const wifiConfig = {
  slug: "wifi-classification",
  category: "Vascular",
  title: "WIfI Classification Calculator",
  description:
    "Grade wound, ischemia, and foot infection to estimate limb threat and guide chronic limb-threatening ischemia care.",
  type: "select-score",
  defaultValues: {
    wound: 0,
    ischemia: 0,
    infection: 0,
  },
  inputs: [
    {
      key: "wound",
      label: "Wound",
      options: [
        "0 - No ulcer",
        "1 - Small shallow ulcer",
        "2 - Deeper ulcer with exposed tendon/joint",
        "3 - Extensive ulcer or gangrene",
      ],
    },
    {
      key: "ischemia",
      label: "Ischemia",
      options: [
        "0 - ABI ≥0.80 / TP ≥60",
        "1 - Mild ischemia",
        "2 - Moderate ischemia",
        "3 - Severe ischemia",
      ],
    },
    {
      key: "infection",
      label: "Foot infection",
      options: [
        "0 - None",
        "1 - Mild infection",
        "2 - Moderate infection",
        "3 - Severe systemic infection",
      ],
    },
  ],
  calculate(values) {
    const score =
      Number(values.wound || 0) +
      Number(values.ischemia || 0) +
      Number(values.infection || 0);

    if (score <= 2) {
      return stage(score, "Stage 1", "Very low limb threat", "Low expected limb threat if clinically stable.", "Optimize wound care, risk factors, infection control, perfusion surveillance, and clinical follow-up.", "green");
    }

    if (score <= 4) {
      return stage(score, "Stage 2", "Low limb threat", "Limb threat is present but not usually limb-immediate.", "Assess perfusion, wound trajectory, and infection. Consider revascularization when ischemia or wound healing concern is present.", "blue");
    }

    if (score <= 6) {
      return stage(score, "Stage 3", "Moderate limb threat", "Clinically meaningful risk of limb loss or delayed wound healing.", "Consider vascular imaging and revascularization planning, especially with ischemia grade 2–3 or progressive tissue loss.", "amber");
    }

    if (score <= 8) {
      return stage(score, "Stage 4", "High limb threat", "High risk of amputation without effective infection control, wound care, and perfusion optimization.", "Urgent multidisciplinary limb-salvage assessment is appropriate. Revascularization benefit may be substantial if technically feasible.", "red");
    }

    return stage(score, "Stage 5", "Very high limb threat", "Very severe combined wound, ischemia, and infection burden.", "Urgent limb-salvage pathway, infection source control, and revascularization feasibility assessment are needed.", "red");
  },
  reference: {
    clinicalMeaning:
      "The WIfI system grades wound extent, ischemia severity, and foot infection to estimate amputation risk and potential benefit from revascularization in chronic limb-threatening ischemia.",
    severity:
      "Higher wound, ischemia, and infection grades indicate higher amputation risk and greater need for coordinated limb-salvage care.",
    nextStep:
      "Document wound grade, obtain toe pressure when possible, assess infection severity, and plan multidisciplinary wound care and revascularization evaluation.",
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
    faq: [
      {
        question: "What does WIfI assess?",
        answer:
          "WIfI assesses wound burden, ischemia severity, and foot infection to estimate limb threat in chronic limb-threatening ischemia.",
      },
      {
        question: "Why is toe pressure important in WIfI?",
        answer:
          "Toe pressure is often more reliable than ABI in patients with diabetes, renal disease, or calcified tibial vessels.",
      },
    ],
    references: ["Mills JL Jr et al. J Vasc Surg. 2014."],
    related: ["Rutherford Classification", "Fontaine Classification", "CEAP Classification", "VCSS"],
  },
};

function stage(score, title, label, interpretation, recommendation, tone) {
  return {
    title,
    value: String(score),
    label,
    unit: "total WIfI score",
    interpretation,
    recommendation,
    tone,
  };
}
