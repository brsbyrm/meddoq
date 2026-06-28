"use client";

import { useMemo, useState } from "react";
import CalculatorShell from "../../components/calculators/CalculatorShell";
import CalculatorPanel from "../../components/calculators/CalculatorPanel";
import CalculatorResult from "../../components/calculators/CalculatorResult";
import CalculatorReferencePage from "../../components/calculators/CalculatorReferencePage";

const items = [
  { id: "hypertension", label: "Hypertension: systolic BP >160 mmHg", points: 1 },
  { id: "renal", label: "Abnormal renal function", points: 1 },
  { id: "liver", label: "Abnormal liver function", points: 1 },
  { id: "stroke", label: "Prior stroke", points: 1 },
  { id: "bleeding", label: "Bleeding history or predisposition", points: 1 },
  { id: "labileInr", label: "Labile INR", points: 1 },
  { id: "elderly", label: "Age >65 years", points: 1 },
  { id: "drugs", label: "Drugs predisposing to bleeding", points: 1 },
  { id: "alcohol", label: "Alcohol use", points: 1 },
];

const content = {
  interpretation: {
    clinicalMeaning:
      "HAS-BLED estimates major bleeding risk in patients with atrial fibrillation receiving or being considered for anticoagulation.",
    severity:
      "Higher scores indicate higher bleeding risk. A score of 3 or more is commonly considered high bleeding risk and should prompt closer review.",
    nextStep:
      "Use to identify modifiable bleeding risk factors, not to automatically withhold anticoagulation when stroke risk is high.",
  },
  notes: {
    pearls: [
      "HAS-BLED is most useful for identifying correctable bleeding risk factors.",
      "High bleeding risk should prompt closer monitoring and risk-factor modification.",
      "Stroke risk and bleeding risk should be assessed together.",
    ],
    pitfalls: [
      "Using HAS-BLED as a reason to automatically deny anticoagulation.",
      "Ignoring modifiable factors such as uncontrolled blood pressure, NSAID use, alcohol, or labile INR.",
      "Applying the score without considering renal function, liver disease, anemia, frailty, or drug interactions.",
    ],
  },
  faq: [
    {
      question: "What HAS-BLED score is high risk?",
      answer:
        "A score of 3 or more is commonly considered high bleeding risk and should prompt closer review and monitoring.",
    },
    {
      question: "Should anticoagulation be stopped because HAS-BLED is high?",
      answer:
        "Not automatically. The score should trigger risk-factor modification and closer follow-up while balancing stroke-prevention benefit.",
    },
  ],
  references: [
    "Pisters R et al. Chest. 2010.",
    "Hindricks G et al. ESC Guidelines for atrial fibrillation.",
    "January CT et al. AHA/ACC/HRS Guideline for atrial fibrillation.",
  ],
  related: ["CHA₂DS₂-VASc", "ATRIA Bleeding", "HEMORR₂HAGES"],
};

export default function HasBledPage() {
  const [checked, setChecked] = useState({});

  const score = useMemo(() => {
    return items.reduce((sum, item) => sum + (checked[item.id] ? item.points : 0), 0);
  }, [checked]);

  const risk = useMemo(() => {
    if (score >= 3) {
      return {
        tone: "red",
        label: "High bleeding risk",
        interpretation:
          "HAS-BLED score ≥3 suggests increased major bleeding risk.",
        recommendation:
          "Review and correct modifiable bleeding risk factors, monitor more closely, reassess blood pressure, renal/liver function, interacting drugs, alcohol use, and anticoagulant choice.",
      };
    }

    if (score >= 1) {
      return {
        tone: "amber",
        label: "Bleeding risk factors present",
        interpretation:
          "This HAS-BLED score indicates one or more bleeding risk factors.",
        recommendation:
          "Address modifiable risk factors and monitor according to clinical context, especially when anticoagulation is used.",
      };
    }

    return {
      tone: "green",
      label: "Low measured bleeding risk",
      interpretation:
        "HAS-BLED score 0 suggests low measured bleeding risk by this tool.",
      recommendation:
        "Continue routine clinical monitoring and reassess if medications, renal function, liver function, blood pressure, or bleeding history changes.",
    };
  }, [score]);

  function toggle(id) {
    setChecked((previous) => ({ ...previous, [id]: !previous[id] }));
  }

  return (
    <CalculatorShell
      category="Cardiovascular"
      title="HAS-BLED Score Calculator"
      description="Bleeding risk assessment tool for anticoagulated patients with atrial fibrillation."
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
          title="HAS-BLED Score"
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
