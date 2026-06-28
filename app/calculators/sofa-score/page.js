"use client";

import { useMemo, useState } from "react";
import CalculatorShell from "../../components/calculators/CalculatorShell";
import CalculatorPanel from "../../components/calculators/CalculatorPanel";
import CalculatorResult from "../../components/calculators/CalculatorResult";
import CalculatorReferencePage from "../../components/calculators/CalculatorReferencePage";

const inputs = [
  {
    key: "respiration",
    label: "Respiration: PaO₂/FiO₂",
    options: [
      "0 - ≥400",
      "1 - <400",
      "2 - <300",
      "3 - <200 with respiratory support",
      "4 - <100 with respiratory support",
    ],
  },
  {
    key: "platelets",
    label: "Coagulation: Platelets",
    options: [
      "0 - ≥150 × 10⁹/L",
      "1 - <150",
      "2 - <100",
      "3 - <50",
      "4 - <20",
    ],
  },
  {
    key: "bilirubin",
    label: "Liver: Bilirubin",
    options: [
      "0 - <1.2 mg/dL",
      "1 - 1.2–1.9",
      "2 - 2.0–5.9",
      "3 - 6.0–11.9",
      "4 - ≥12.0",
    ],
  },
  {
    key: "cardiovascular",
    label: "Cardiovascular",
    options: [
      "0 - MAP ≥70 mmHg",
      "1 - MAP <70 mmHg",
      "2 - Dopamine ≤5 or dobutamine any dose",
      "3 - Dopamine >5, epinephrine ≤0.1, or norepinephrine ≤0.1",
      "4 - Dopamine >15, epinephrine >0.1, or norepinephrine >0.1",
    ],
  },
  {
    key: "cns",
    label: "Central nervous system: GCS",
    options: [
      "0 - GCS 15",
      "1 - GCS 13–14",
      "2 - GCS 10–12",
      "3 - GCS 6–9",
      "4 - GCS <6",
    ],
  },
  {
    key: "renal",
    label: "Renal: Creatinine or urine output",
    options: [
      "0 - Creatinine <1.2 mg/dL",
      "1 - 1.2–1.9",
      "2 - 2.0–3.4",
      "3 - 3.5–4.9 or urine output <500 mL/day",
      "4 - ≥5.0 or urine output <200 mL/day",
    ],
  },
];

const content = {
  interpretation: {
    clinicalMeaning:
      "SOFA quantifies organ dysfunction across respiratory, coagulation, liver, cardiovascular, neurologic, and renal systems.",
    severity:
      "Higher SOFA scores indicate greater organ dysfunction and higher mortality risk. A rise of 2 or more points in infection supports sepsis-related organ dysfunction.",
    nextStep:
      "Use with full clinical assessment, infection source evaluation, lactate, hemodynamics, urine output, vasopressor need, ventilatory status, and ICU escalation planning.",
  },
  notes: {
    pearls: [
      "Trend matters: a rising SOFA score is often more informative than a single value.",
      "SOFA is useful for organ dysfunction monitoring in ICU and sepsis contexts.",
      "Drug sedation and intubation can affect neurologic scoring.",
    ],
    pitfalls: [
      "Using SOFA without considering baseline organ dysfunction.",
      "Ignoring vasopressor dose units and respiratory support requirements.",
      "Delaying urgent treatment while trying to complete the score.",
    ],
  },
  faq: [
    {
      question: "What does a SOFA increase of 2 mean?",
      answer:
        "In suspected infection, an acute SOFA increase of 2 or more points is associated with sepsis-related organ dysfunction.",
    },
    {
      question: "Is SOFA only for sepsis?",
      answer:
        "No. SOFA measures organ dysfunction and is widely used in critical care, although it is central to sepsis assessment.",
    },
  ],
  references: [
    "Vincent JL et al. Intensive Care Med. 1996.",
    "Singer M et al. JAMA. 2016.",
  ],
  related: ["qSOFA Score", "NEWS2", "MEWS", "Oxygenation Index"],
};

export default function SofaScorePage() {
  const [values, setValues] = useState({
    respiration: 0,
    platelets: 0,
    bilirubin: 0,
    cardiovascular: 0,
    cns: 0,
    renal: 0,
  });

  const score = useMemo(
    () => Object.values(values).reduce((sum, value) => sum + Number(value || 0), 0),
    [values]
  );

  const risk = useMemo(() => {
    if (score >= 12) {
      return {
        tone: "red",
        label: "Severe organ dysfunction",
        interpretation:
          "This SOFA score indicates severe multi-organ dysfunction and high clinical risk.",
        recommendation:
          "Urgently review hemodynamics, oxygenation, vasopressor need, renal output, infection source control, ICU support, and goals of care.",
      };
    }

    if (score >= 6) {
      return {
        tone: "amber",
        label: "Moderate organ dysfunction",
        interpretation:
          "This SOFA score suggests clinically significant organ dysfunction.",
        recommendation:
          "Trend SOFA, reassess organ support needs, identify reversible causes, and escalate monitoring or ICU care when appropriate.",
      };
    }

    if (score >= 2) {
      return {
        tone: "blue",
        label: "Organ dysfunction present",
        interpretation:
          "This SOFA score suggests organ dysfunction; in suspected infection, acute increase of 2 or more points supports sepsis-related organ dysfunction.",
        recommendation:
          "Assess infection source, lactate, perfusion, urine output, oxygenation, and need for early treatment or escalation.",
      };
    }

    return {
      tone: "green",
      label: "Low organ dysfunction score",
      interpretation:
        "This SOFA score suggests low measured organ dysfunction at this time.",
      recommendation:
        "Continue clinical monitoring and repeat assessment if infection, hypotension, hypoxemia, oliguria, or mental status change evolves.",
    };
  }, [score]);

  function update(key, value) {
    setValues((previous) => ({ ...previous, [key]: Number(value) }));
  }

  return (
    <CalculatorShell
      category="Critical Care"
      title="SOFA Score Calculator"
      description="Sequential Organ Failure Assessment score for organ dysfunction severity."
    >
      <CalculatorPanel>
        <div style={styles.grid}>
          {inputs.map((input) => (
            <label key={input.key} style={styles.label}>
              {input.label}
              <select
                style={styles.select}
                value={values[input.key]}
                onChange={(event) => update(input.key, event.target.value)}
              >
                {input.options.map((option, index) => (
                  <option key={option} value={index}>{option}</option>
                ))}
              </select>
            </label>
          ))}
        </div>

        <CalculatorResult
          title="SOFA Score"
          value={score}
          unit={risk.label}
          tone={risk.tone}
          interpretation={risk.interpretation}
          recommendation={risk.recommendation}
        />
      </CalculatorPanel>

      <CalculatorReferencePage content={content} />
    </CalculatorShell>
  );
}

const styles = {
  grid: { display: "grid", gap: 16 },
  label: {
    display: "grid",
    gap: 8,
    color: "#0f172a",
    fontSize: 14,
    fontWeight: 850,
  },
  select: {
    width: "100%",
    padding: 14,
    borderRadius: 14,
    border: "1px solid #cbd5e1",
    background: "#ffffff",
    color: "#0f172a",
    fontSize: 15,
  },
};
