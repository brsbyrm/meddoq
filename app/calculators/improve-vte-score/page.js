"use client";

import { useMemo, useState } from "react";
import CalculatorShell from "../../components/calculators/CalculatorShell";
import CalculatorPanel from "../../components/calculators/CalculatorPanel";
import CalculatorResult from "../../components/calculators/CalculatorResult";
import CalculatorReferencePage from "../../components/calculators/CalculatorReferencePage";

const items = [
  { id: "previousVte", label: "Previous VTE", points: 3 },
  { id: "knownThrombophilia", label: "Known thrombophilia", points: 2 },
  { id: "currentCancer", label: "Current cancer", points: 2 },
  { id: "lowerLimbParalysis", label: "Lower limb paralysis", points: 2 },
  { id: "immobilization", label: "Immobilization ≥7 days", points: 1 },
  { id: "icuCcu", label: "ICU/CCU stay", points: 1 },
  { id: "age60", label: "Age >60 years", points: 1 },
];

const content = {
  interpretation: {
    clinicalMeaning:
      "The IMPROVE VTE score estimates venous thromboembolism risk in acutely ill hospitalized medical patients.",
    severity:
      "A score of 0–1 is generally lower risk, 2–3 intermediate risk, and ≥4 high risk for hospital-associated VTE.",
    nextStep:
      "Use with bleeding risk, renal function, mobility, contraindications, and institutional thromboprophylaxis protocols.",
  },
  notes: {
    pearls: [
      "Previous VTE is the strongest individual variable in this score.",
      "Cancer, thrombophilia, paralysis, and prolonged immobility substantially increase risk.",
      "VTE prophylaxis decisions must always be balanced against bleeding risk.",
    ],
    pitfalls: [
      "Using VTE risk alone without checking bleeding risk.",
      "Ignoring renal function when selecting anticoagulant prophylaxis.",
      "Forgetting reassessment when mobility or clinical status changes.",
    ],
  },
  faq: [
    {
      question: "What score suggests high VTE risk?",
      answer:
        "An IMPROVE VTE score of 4 or more is commonly used to identify high VTE risk in hospitalized medical patients.",
    },
    {
      question: "Does this score mandate anticoagulation?",
      answer:
        "No. It supports risk stratification. Prophylaxis decisions should also consider bleeding risk, contraindications, renal function, and local protocols.",
    },
  ],
  references: [
    "Spyropoulos AC et al. Chest. 2011.",
    "Goldhaber SZ et al. Chest. 2016.",
  ],
  related: ["IMPROVE Bleeding Risk", "Padua Score", "Caprini Score", "Wells DVT"],
};

export default function ImproveVteScorePage() {
  const [checked, setChecked] = useState({});

  const score = useMemo(
    () => items.reduce((sum, item) => sum + (checked[item.id] ? item.points : 0), 0),
    [checked]
  );

  const risk = useMemo(() => {
    if (score >= 4) {
      return {
        label: "High VTE risk",
        tone: "red",
        interpretation:
          "This score suggests increased hospital-associated VTE risk in an acutely ill medical inpatient.",
        recommendation:
          "Consider pharmacologic thromboprophylaxis if bleeding risk is acceptable and no contraindication exists. Reassess renal function, platelet count, procedures, and mobility.",
      };
    }

    if (score >= 2) {
      return {
        label: "Intermediate VTE risk",
        tone: "amber",
        interpretation:
          "This score suggests clinically relevant VTE risk, but the final decision depends on bleeding risk and clinical context.",
        recommendation:
          "Review mobility, expected hospital course, bleeding risk, and institutional prophylaxis protocol.",
      };
    }

    return {
      label: "Lower VTE risk",
      tone: "green",
      interpretation:
        "This score suggests lower predicted VTE risk compared with high-risk hospitalized medical patients.",
      recommendation:
        "Encourage early mobilization and reassess if clinical status, immobility, cancer status, or ICU need changes.",
    };
  }, [score]);

  function toggle(id) {
    setChecked((previous) => ({ ...previous, [id]: !previous[id] }));
  }

  return (
    <CalculatorShell
      category="VTE Risk"
      title="IMPROVE VTE Score Calculator"
      description="Estimate venous thromboembolism risk in acutely ill hospitalized medical patients."
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
          title="IMPROVE VTE Score"
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
