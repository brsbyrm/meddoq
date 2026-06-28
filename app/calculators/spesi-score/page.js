"use client";

import { useMemo, useState } from "react";
import CalculatorShell from "../../components/calculators/CalculatorShell";
import CalculatorPanel from "../../components/calculators/CalculatorPanel";
import CalculatorResult from "../../components/calculators/CalculatorResult";

const items = [
  "Age >80 years",
  "History of cancer",
  "History of chronic cardiopulmonary disease",
  "Heart rate ≥110/min",
  "Systolic blood pressure <100 mmHg",
  "Oxygen saturation <90%",
];

export default function SpesiScorePage() {
  const [checked, setChecked] = useState({});

  const score = useMemo(
    () => items.reduce((sum, item) => sum + (checked[item] ? 1 : 0), 0),
    [checked]
  );

  const high = score >= 1;

  return (
    <CalculatorShell
      category="Pulmonary Embolism"
      title="sPESI Score Calculator"
      description="Simplified Pulmonary Embolism Severity Index for 30-day mortality risk stratification."
    >
      <CalculatorPanel>
        <div style={styles.grid}>
          {items.map((item) => (
            <label key={item} style={styles.option}>
              <input
                type="checkbox"
                checked={Boolean(checked[item])}
                onChange={() => setChecked((p) => ({ ...p, [item]: !p[item] }))}
              />
              <span>{item}</span>
              <strong>+1</strong>
            </label>
          ))}
        </div>

        <CalculatorResult
          title="sPESI Score"
          value={score}
          unit={high ? "Higher risk" : "Low risk"}
          tone={high ? "red" : "green"}
          interpretation={
            high
              ? "sPESI ≥1 suggests increased 30-day mortality risk in acute pulmonary embolism."
              : "sPESI 0 identifies a lower-risk PE group when clinical stability is confirmed."
          }
          recommendation={
            high
              ? "Assess hemodynamics, RV dysfunction, biomarkers, bleeding risk, oxygenation, and need for inpatient monitoring."
              : "Consider outpatient or early discharge pathways only when no other clinical, social, or treatment contraindications exist."
          }
        />
      </CalculatorPanel>
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
