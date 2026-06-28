"use client";

import { useMemo, useState } from "react";
import CalculatorShell from "../../components/calculators/CalculatorShell";
import CalculatorPanel from "../../components/calculators/CalculatorPanel";
import CalculatorResult from "../../components/calculators/CalculatorResult";
import CalculatorReferencePage from "../../components/calculators/CalculatorReferencePage";

const items = [
  { id: "confusion", label: "New confusion", points: 1 },
  { id: "urea", label: "Urea >7 mmol/L or BUN >19 mg/dL", points: 1 },
  { id: "respiratoryRate", label: "Respiratory rate ≥30/min", points: 1 },
  { id: "bloodPressure", label: "Systolic BP <90 mmHg or diastolic BP ≤60 mmHg", points: 1 },
  { id: "age65", label: "Age ≥65 years", points: 1 },
];

const content = {
  interpretation: {
    clinicalMeaning:
      "CURB-65 estimates mortality risk in adults with community-acquired pneumonia using confusion, urea, respiratory rate, blood pressure, and age.",
    severity:
      "Scores 0–1 are generally low risk, 2 is intermediate risk, and 3–5 indicates high risk.",
    nextStep:
      "Use with oxygen requirement, sepsis criteria, comorbidities, frailty, radiographic extent, oral intake, social support, and local pneumonia pathways.",
  },
  notes: {
    pearls: [
      "CURB-65 is simple and useful for initial pneumonia severity assessment.",
      "Hypoxemia, septic shock, multilobar disease, or inability to take oral therapy may override a low score.",
      "Clinical trajectory and response to initial treatment should guide reassessment.",
    ],
    pitfalls: [
      "Using CURB-65 as the only admission criterion.",
      "Ignoring oxygen saturation or need for ventilatory support.",
      "Applying it without considering immunosuppression, frailty, or major comorbidity.",
    ],
  },
  faq: [
    {
      question: "What CURB-65 score suggests admission?",
      answer:
        "A score of 2 often supports hospital assessment or admission, while 3 or more indicates high risk and may require urgent inpatient or higher-level care assessment.",
    },
    {
      question: "Does CURB-65 include oxygen saturation?",
      answer:
        "No. Oxygenation must be assessed separately and can change management even when the CURB-65 score is low.",
    },
  ],
  references: [
    "Lim WS et al. Thorax. 2003.",
    "Metlay JP et al. ATS/IDSA Community-Acquired Pneumonia Guideline.",
  ],
  related: ["NEWS2", "qSOFA Score", "SOFA Score", "MEWS"],
};

export default function Curb65ScorePage() {
  const [checked, setChecked] = useState({});

  const score = useMemo(() => {
    return items.reduce((sum, item) => sum + (checked[item.id] ? item.points : 0), 0);
  }, [checked]);

  const risk = useMemo(() => {
    if (score >= 3) {
      return {
        tone: "red",
        label: "High pneumonia severity",
        interpretation:
          "CURB-65 score 3–5 suggests high mortality risk in community-acquired pneumonia.",
        recommendation:
          "Urgent inpatient management is generally appropriate. Assess oxygenation, sepsis, ICU criteria, antimicrobial timing, organ dysfunction, and goals of care.",
      };
    }

    if (score === 2) {
      return {
        tone: "amber",
        label: "Intermediate pneumonia severity",
        interpretation:
          "CURB-65 score 2 suggests intermediate risk and usually warrants hospital assessment.",
        recommendation:
          "Consider admission or close observation depending on oxygenation, comorbidity, frailty, oral intake, radiographic findings, and social support.",
      };
    }

    return {
      tone: "green",
      label: "Low pneumonia severity",
      interpretation:
        "CURB-65 score 0–1 suggests lower mortality risk if no other concerning features are present.",
      recommendation:
        "Outpatient treatment may be considered only if oxygenation, hemodynamics, comorbidity burden, oral intake, and follow-up are favorable.",
    };
  }, [score]);

  function toggle(id) {
    setChecked((previous) => ({ ...previous, [id]: !previous[id] }));
  }

  return (
    <CalculatorShell
      category="Pulmonology"
      title="CURB-65 Score Calculator"
      description="Community-acquired pneumonia severity score for mortality risk and site-of-care assessment."
    >
      <CalculatorPanel>
        <div style={styles.grid}>
          {items.map((item) => (
            <label key={item.id} style={styles.option}>
              <input
                type="checkbox"
                checked={Boolean(checked[item.id])}
                onChange={() => toggle(item.id)}
              />
              <span>{item.label}</span>
              <strong>+{item.points}</strong>
            </label>
          ))}
        </div>

        <CalculatorResult
          title="CURB-65 Score"
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
  grid: { display: "grid", gap: 12 },
  option: {
    display: "grid",
    gridTemplateColumns: "24px 1fr auto",
    gap: 12,
    alignItems: "center",
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
    borderRadius: 16,
    padding: 14,
    cursor: "pointer",
    color: "#0f172a",
    fontWeight: 750,
  },
};
