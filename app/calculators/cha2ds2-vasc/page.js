"use client";

import { useMemo, useState } from "react";
import CalculatorShell from "../../components/calculators/CalculatorShell";
import CalculatorPanel from "../../components/calculators/CalculatorPanel";
import CalculatorResult from "../../components/calculators/CalculatorResult";
import CalculatorReferencePage from "../../components/calculators/CalculatorReferencePage";

const items = [
  { id: "heartFailure", label: "Congestive heart failure / LV dysfunction", points: 1 },
  { id: "hypertension", label: "Hypertension", points: 1 },
  { id: "age75", label: "Age ≥75 years", points: 2 },
  { id: "diabetes", label: "Diabetes mellitus", points: 1 },
  { id: "stroke", label: "Prior stroke / TIA / thromboembolism", points: 2 },
  { id: "vascular", label: "Vascular disease", points: 1 },
  { id: "age65", label: "Age 65–74 years", points: 1 },
  { id: "female", label: "Female sex", points: 1 },
];

const content = {
  interpretation: {
    clinicalMeaning:
      "CHA₂DS₂-VASc estimates thromboembolic risk in patients with non-valvular atrial fibrillation.",
    severity:
      "Higher scores indicate higher annual stroke risk. Age ≥75 and prior stroke/TIA each contribute 2 points.",
    nextStep:
      "Use with bleeding risk, patient preference, AF pattern, renal function, drug interactions, frailty, and current anticoagulation guidelines.",
  },
  notes: {
    pearls: [
      "Female sex is a risk modifier and should be interpreted with the overall clinical profile.",
      "Prior stroke, TIA, or systemic embolism is a major risk factor and adds 2 points.",
      "The score supports anticoagulation discussion but does not replace individualized decision-making.",
    ],
    pitfalls: [
      "Using the score outside atrial fibrillation risk assessment.",
      "Ignoring bleeding risk, renal function, adherence, drug interactions, or patient values.",
      "Treating female sex alone as a stand-alone indication for anticoagulation.",
    ],
  },
  faq: [
    {
      question: "What does CHA₂DS₂-VASc estimate?",
      answer:
        "It estimates thromboembolic risk in atrial fibrillation and supports anticoagulation decision-making.",
    },
    {
      question: "Does a low score always mean no anticoagulation?",
      answer:
        "No. Decisions should also consider clinical context, patient preference, rhythm burden, bleeding risk, and guideline recommendations.",
    },
  ],
  references: [
    "Lip GYH et al. Chest. 2010.",
    "Hindricks G et al. ESC Guidelines for atrial fibrillation.",
    "January CT et al. AHA/ACC/HRS Guideline for atrial fibrillation.",
  ],
  related: ["HAS-BLED", "ATRIA Bleeding", "HEMORR₂HAGES"],
};

export default function Cha2ds2VascPage() {
  const [checked, setChecked] = useState({});

  const score = useMemo(() => {
    return items.reduce((sum, item) => sum + (checked[item.id] ? item.points : 0), 0);
  }, [checked]);

  const risk = useMemo(() => {
    if (score >= 4) {
      return {
        tone: "red",
        label: "High thromboembolic risk",
        interpretation:
          "This CHA₂DS₂-VASc score suggests high thromboembolic risk in atrial fibrillation.",
        recommendation:
          "Anticoagulation is generally favored unless bleeding risk or contraindications outweigh benefit. Apply current AF guidelines and patient-specific assessment.",
      };
    }

    if (score >= 2) {
      return {
        tone: "amber",
        label: "Elevated thromboembolic risk",
        interpretation:
          "This CHA₂DS₂-VASc score suggests clinically meaningful thromboembolic risk.",
        recommendation:
          "Discuss anticoagulation using current AF guidelines, bleeding risk assessment, renal function, patient preference, and shared decision-making.",
      };
    }

    if (score === 1) {
      return {
        tone: "blue",
        label: "Low-intermediate risk",
        interpretation:
          "CHA₂DS₂-VASc score 1 suggests low-intermediate risk; interpretation depends on which risk factor is present.",
        recommendation:
          "Individualize anticoagulation decisions. Female sex alone should not usually be treated as equivalent to other non-sex risk factors.",
      };
    }

    return {
      tone: "green",
      label: "Low measured risk",
      interpretation:
        "CHA₂DS₂-VASc score 0 suggests low measured thromboembolic risk in atrial fibrillation.",
      recommendation:
        "Anticoagulation is usually not indicated solely by this score, but clinical context and guideline updates should be considered.",
    };
  }, [score]);

  function toggle(id) {
    setChecked((previous) => ({ ...previous, [id]: !previous[id] }));
  }

  function toggleAge(id) {
    setChecked((previous) => {
      const next = { ...previous, [id]: !previous[id] };
      if (id === "age75" && next.age75) next.age65 = false;
      if (id === "age65" && next.age65) next.age75 = false;
      return next;
    });
  }

  return (
    <CalculatorShell
      category="Cardiovascular"
      title="CHA₂DS₂-VASc Score Calculator"
      description="Stroke risk stratification tool for patients with atrial fibrillation."
    >
      <CalculatorPanel>
        <div style={styles.grid}>
          {items.map((item) => (
            <label key={item.id} style={styles.option}>
              <input
                type="checkbox"
                checked={Boolean(checked[item.id])}
                onChange={() =>
                  item.id === "age75" || item.id === "age65"
                    ? toggleAge(item.id)
                    : toggle(item.id)
                }
              />
              <span>{item.label}</span>
              <strong>+{item.points}</strong>
            </label>
          ))}
        </div>

        <CalculatorResult
          title="CHA₂DS₂-VASc Score"
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
