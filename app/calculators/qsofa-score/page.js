"use client";

import { useMemo, useState } from "react";
import CalculatorShell from "../../components/calculators/CalculatorShell";
import CalculatorPanel from "../../components/calculators/CalculatorPanel";
import CalculatorResult from "../../components/calculators/CalculatorResult";
import CalculatorReferencePage from "../../components/calculators/CalculatorReferencePage";

const items = [
  { id: "rr", label: "Respiratory rate ≥22/min" },
  { id: "sbp", label: "Systolic blood pressure ≤100 mmHg" },
  { id: "mental", label: "Altered mentation" },
];

const content = {
  interpretation: {
    clinicalMeaning:
      "qSOFA is a bedside screening tool used to identify infected patients at higher risk of poor outcome outside the ICU.",
    severity:
      "A score of 0–1 is lower risk, while ≥2 suggests increased risk and need for urgent clinical assessment.",
    nextStep:
      "Evaluate for sepsis, obtain lactate when appropriate, assess organ dysfunction, start timely antimicrobials when infection is suspected, and escalate care if unstable.",
  },
  notes: {
    pearls: [
      "qSOFA is a screening tool, not a diagnostic definition of sepsis.",
      "Clinical deterioration overrides a low qSOFA score.",
      "Use with full vital signs, lactate, organ dysfunction markers, and source assessment.",
    ],
    pitfalls: [
      "Using qSOFA to rule out sepsis.",
      "Delaying antibiotics or resuscitation while calculating scores.",
      "Ignoring immunosuppressed, elderly, or atypical presentations.",
    ],
  },
  faq: [
    {
      question: "Does qSOFA diagnose sepsis?",
      answer: "No. qSOFA is a risk-screening tool and should not replace clinical diagnosis or sepsis protocols.",
    },
    {
      question: "What qSOFA score is concerning?",
      answer: "A qSOFA score of 2 or more suggests increased risk of poor outcome and should prompt urgent assessment.",
    },
  ],
  references: ["Singer M et al. JAMA. 2016."],
  related: ["SOFA Score", "NEWS2", "MEWS"],
};

export default function QsofaScorePage() {
  const [checked, setChecked] = useState({});

  const score = useMemo(
    () => items.reduce((sum, item) => sum + (checked[item.id] ? 1 : 0), 0),
    [checked]
  );

  const high = score >= 2;

  return (
    <CalculatorShell
      category="Critical Care"
      title="qSOFA Score Calculator"
      description="Quick SOFA score for bedside risk screening in suspected infection."
    >
      <CalculatorPanel>
        <div style={styles.grid}>
          {items.map((item) => (
            <label key={item.id} style={styles.option}>
              <input
                type="checkbox"
                checked={Boolean(checked[item.id])}
                onChange={() => setChecked((p) => ({ ...p, [item.id]: !p[item.id] }))}
              />
              <span>{item.label}</span>
              <strong>+1</strong>
            </label>
          ))}
        </div>

        <CalculatorResult
          title="qSOFA Score"
          value={score}
          unit={high ? "Higher risk" : "Lower risk"}
          tone={high ? "red" : "green"}
          interpretation={
            high
              ? "qSOFA ≥2 suggests increased risk of poor outcome in suspected infection."
              : "qSOFA 0–1 suggests lower risk, but it does not rule out sepsis or clinical deterioration."
          }
          recommendation={
            high
              ? "Urgently assess for sepsis, organ dysfunction, lactate elevation, source control need, antibiotics, fluids, vasopressors, and escalation of care."
              : "Continue clinical assessment and reassess frequently if infection, hypotension, tachypnea, mental status change, or organ dysfunction evolves."
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
