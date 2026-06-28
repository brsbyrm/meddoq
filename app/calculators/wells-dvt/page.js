"use client";

import { useMemo, useState } from "react";
import CalculatorShell from "../../components/calculators/CalculatorShell";
import CalculatorPanel from "../../components/calculators/CalculatorPanel";
import CalculatorResult from "../../components/calculators/CalculatorResult";
import CalculatorReferencePage from "../../components/calculators/CalculatorReferencePage";

const items = [
  { id: "cancer", label: "Active cancer", points: 1 },
  { id: "paralysis", label: "Paralysis, paresis, or recent plaster immobilization of lower extremity", points: 1 },
  { id: "bedridden", label: "Recently bedridden ≥3 days or major surgery within 12 weeks", points: 1 },
  { id: "tenderness", label: "Localized tenderness along the deep venous system", points: 1 },
  { id: "entireLeg", label: "Entire leg swollen", points: 1 },
  { id: "calfSwelling", label: "Calf swelling ≥3 cm compared with asymptomatic leg", points: 1 },
  { id: "pittingEdema", label: "Pitting edema confined to symptomatic leg", points: 1 },
  { id: "collateral", label: "Collateral superficial veins", points: 1 },
  { id: "previousDvt", label: "Previously documented DVT", points: 1 },
  { id: "alternative", label: "Alternative diagnosis at least as likely as DVT", points: -2 },
];

const content = {
  interpretation: {
    clinicalMeaning:
      "The Wells DVT score estimates pretest probability of deep vein thrombosis in symptomatic patients.",
    severity:
      "A score of 2 or more is commonly interpreted as DVT likely; less than 2 is commonly interpreted as DVT unlikely.",
    nextStep:
      "Use with clinical context, D-dimer strategy, compression ultrasonography availability, anticoagulation risk, and local diagnostic pathways.",
  },
  notes: {
    pearls: [
      "The score is intended for suspected lower-extremity DVT.",
      "A likely score generally supports compression ultrasonography rather than relying on D-dimer alone.",
      "Clinical instability, limb threat, or high-risk features should override low-score reassurance.",
    ],
    pitfalls: [
      "Applying the score to asymptomatic screening.",
      "Ignoring an alternative diagnosis that is at least as likely as DVT.",
      "Using the score as a stand-alone rule-out test without D-dimer or imaging strategy.",
    ],
  },
  faq: [
    {
      question: "What Wells DVT score is likely?",
      answer:
        "In the two-level Wells DVT model, a score of 2 or more is commonly classified as DVT likely.",
    },
    {
      question: "Can Wells DVT rule out DVT alone?",
      answer:
        "No. A low or unlikely Wells score should usually be combined with a validated D-dimer strategy or imaging pathway.",
    },
  ],
  references: [
    "Wells PS et al. Lancet. 1997.",
    "Wells PS et al. JAMA. 2006.",
    "National Institute for Health and Care Excellence. Venous thromboembolic diseases guideline.",
  ],
  related: ["Wells PE", "Caprini Score", "Padua Prediction Score", "IMPROVE VTE Risk Score"],
};

export default function WellsDvtPage() {
  const [checked, setChecked] = useState({});

  const score = useMemo(() => {
    return items.reduce((sum, item) => sum + (checked[item.id] ? item.points : 0), 0);
  }, [checked]);

  const risk = useMemo(() => {
    if (score >= 2) {
      return {
        tone: "red",
        label: "DVT likely",
        interpretation:
          "Wells DVT score ≥2 suggests that deep vein thrombosis is clinically likely.",
        recommendation:
          "Proceed according to local DVT diagnostic pathway, usually with compression ultrasonography and anticoagulation consideration if imaging is delayed and bleeding risk is acceptable.",
      };
    }

    return {
      tone: "green",
      label: "DVT unlikely",
      interpretation:
        "Wells DVT score <2 suggests that deep vein thrombosis is clinically less likely.",
      recommendation:
        "Use a validated D-dimer strategy and/or compression ultrasonography according to local protocol. Do not ignore strong clinical concern or limb-threatening features.",
    };
  }, [score]);

  function toggle(id) {
    setChecked((previous) => ({ ...previous, [id]: !previous[id] }));
  }

  return (
    <CalculatorShell
      category="Vascular"
      title="Wells DVT Score Calculator"
      description="Clinical pretest probability score for suspected lower-extremity deep vein thrombosis."
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
              <strong>{item.points > 0 ? `+${item.points}` : item.points}</strong>
            </label>
          ))}
        </div>

        <CalculatorResult
          title="Wells DVT Score"
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
