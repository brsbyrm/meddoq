export const defaultCalculatorContent = {
  category: "Clinical",
  title: "Clinical Calculator",
  description:
    "A professional clinical calculator with interpretation, next-step guidance, pitfalls, FAQ, and references.",
  result: {
    title: "Result",
    unit: "",
    interpretation:
      "Interpret this result together with the full clinical context, including symptoms, examination findings, comorbidities, medication history, and current guidelines.",
    recommendation:
      "Confirm all inputs and units, review patient-specific risk, and use the result as structured decision support rather than a standalone treatment decision.",
  },
  interpretation: {
    clinicalMeaning:
      "This calculator supports structured clinical assessment and should be interpreted with patient-specific findings, current standards of care, and local protocols.",
    severity:
      "Mild, moderate, and severe categories help communicate risk but do not replace clinical judgment.",
    nextStep:
      "Review input accuracy, assess clinical context, and select the next diagnostic or therapeutic step according to current standards of care.",
  },
  notes: {
    pearls: [
      "Confirm that the calculator applies to the patient population.",
      "Check units and decimal format before interpreting the result.",
      "Use calculator output as clinical decision support, not as an isolated treatment order.",
    ],
    pitfalls: [
      "Incorrect units or incomplete clinical data can change risk classification.",
      "Scores may underestimate atypical or rapidly deteriorating patients.",
      "Guideline thresholds should not override urgent clinical findings.",
    ],
  },
  faq: [
    {
      question: "Can this calculator be used alone to make treatment decisions?",
      answer:
        "No. Calculator results should be interpreted with clinical examination, laboratory data, imaging, comorbidities, medication history, and current guideline recommendations.",
    },
    {
      question: "Why does clinical context matter?",
      answer:
        "The same numerical result may carry different implications depending on symptoms, frailty, renal function, bleeding risk, infection, tissue loss, hemodynamic status, or procedural urgency.",
    },
    {
      question: "What should be checked before using the result?",
      answer:
        "Confirm the indication, input values, units, decimal format, exclusion criteria, and whether the calculator has been validated for the patient population.",
    },
  ],
  references: [
    "Use original score publications and current society guidelines when applying calculator outputs in patient care.",
    "Calculator outputs are intended for healthcare professionals and require clinical correlation.",
    "Meddoq calculators are educational clinical decision-support tools, not substitutes for clinician judgment.",
  ],
  related: ["Clinical calculators", "Risk scores", "Medical reference"],
};
