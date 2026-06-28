"use client";

import { useMemo, useState } from "react";
import CalculatorShell from "../../components/calculators/CalculatorShell";
import CalculatorPanel from "../../components/calculators/CalculatorPanel";
import CalculatorResult from "../../components/calculators/CalculatorResult";
import CalculatorReferencePage from "../../components/calculators/CalculatorReferencePage";

const items = [
  { id: "activeUlcer", label: "Active gastroduodenal ulcer", points: 4.5 },
  { id: "bleeding3m", label: "Bleeding within 3 months before admission", points: 4 },
  { id: "platelets50", label: "Platelet count <50 × 10⁹/L", points: 4 },
  { id: "age85", label: "Age ≥85 years", points: 3.5 },
  { id: "hepaticFailure", label: "Hepatic failure", points: 2.5 },
  { id: "severeRenalFailure", label: "Severe renal failure", points: 2.5 },
  { id: "icuCcu", label: "ICU/CCU stay", points: 2.5 },
  { id: "centralVenousCatheter", label: "Central venous catheter", points: 2 },
  { id: "rheumaticDisease", label: "Rheumatic disease", points: 2 },
  { id: "currentCancer", label: "Current cancer", points: 2 },
  { id: "male", label: "Male sex", points: 1 },
  { id: "moderateRenalFailure", label: "Moderate renal failure", points: 1 },
  { id: "age40to84", label: "Age 40–84 years", points: 1.5 },
];

const content = {
  interpretation: {
    clinicalMeaning:
      "The IMPROVE Bleeding Risk Score estimates major bleeding risk in hospitalized medical patients being considered for thromboprophylaxis.",
    severity:
      "A score of 7 or more is commonly used to identify high bleeding risk.",
    nextStep:
      "Balance bleeding risk against VTE risk, assess modifiable bleeding factors, renal function, platelet count, active bleeding, procedures, and local prophylaxis protocols.",
  },
  notes: {
    pearls: [
      "Active ulcer, recent bleeding, and thrombocytopenia carry high weight.",
      "Bleeding risk should be reassessed as labs and clinical status change.",
      "Mechanical prophylaxis may be preferred when bleeding risk is high.",
    ],
    pitfalls: [
      "Starting pharmacologic prophylaxis without platelet and bleeding review.",
      "Ignoring renal failure when choosing anticoagulant dose.",
      "Treating bleeding risk as static during hospitalization.",
    ],
  },
  faq: [
    {
      question: "What score suggests high bleeding risk?",
      answer:
        "An IMPROVE Bleeding Risk Score of 7 or more is commonly used as a high bleeding risk threshold.",
    },
    {
      question: "How should this be used with VTE risk scores?",
      answer:
        "It should be interpreted alongside IMPROVE VTE or Padua risk assessment to balance thrombosis prevention against bleeding harm.",
    },
  ],
  references: [
    "Decousus H et al. Chest. 2011.",
    "Spyropoulos AC et al. Chest. 2011.",
  ],
  related: ["IMPROVE VTE Score", "Padua Score", "Caprini Score", "Wells DVT"],
};

export default function ImproveBleedingRiskScorePage() {
  const [checked, setChecked] = useState({});

  const score = useMemo(
    () => items.reduce((sum, item) => sum + (checked[item.id] ? item.points : 0), 0),
    [checked]
  );

  const highRisk = score >= 7;

  function toggle(id) {
    setChecked((previous) => ({ ...previous, [id]: !previous[id] }));
  }

  return (
    <CalculatorShell
      category="Bleeding Risk"
      title="IMPROVE Bleeding Risk Score Calculator"
      description="Estimate major bleeding risk in hospitalized medical patients considered for thromboprophylaxis."
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
          title="IMPROVE Bleeding Risk Score"
          value={score.toFixed(score % 1 === 0 ? 0 : 1)}
          unit={highRisk ? "High bleeding risk" : "Lower bleeding risk"}
          tone={highRisk ? "red" : "green"}
          interpretation={
            highRisk
              ? "This score suggests high predicted major bleeding risk in a hospitalized medical patient."
              : "This score suggests lower predicted bleeding risk, but clinical bleeding factors still require review."
          }
          recommendation={
            highRisk
              ? "Avoid automatic pharmacologic prophylaxis. Review active bleeding, platelet count, renal/hepatic failure, recent bleeding, procedures, and consider mechanical prophylaxis when appropriate."
              : "Balance against VTE risk and reassess if bleeding risk factors, renal function, procedures, or platelet count change."
          }
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
