"use client";

import { useMemo, useState } from "react";
import CalculatorShell from "../../components/calculators/CalculatorShell";
import CalculatorPanel from "../../components/calculators/CalculatorPanel";
import CalculatorResult from "../../components/calculators/CalculatorResult";
import CalculatorReferencePage from "../../components/calculators/CalculatorReferencePage";
import NumericInput, { toNumber } from "../../components/NumericInput";

const items = [
  { id: "male", label: "Male sex", points: 10 },
  { id: "cancer", label: "History of cancer", points: 30 },
  { id: "heartFailure", label: "History of heart failure", points: 10 },
  { id: "chronicLungDisease", label: "History of chronic lung disease", points: 10 },
  { id: "pulse110", label: "Pulse ≥110/min", points: 20 },
  { id: "sbp100", label: "Systolic BP <100 mmHg", points: 30 },
  { id: "resp30", label: "Respiratory rate ≥30/min", points: 20 },
  { id: "temp36", label: "Temperature <36°C", points: 20 },
  { id: "alteredMentalStatus", label: "Altered mental status", points: 60 },
  { id: "oxygen90", label: "Oxygen saturation <90%", points: 20 },
];

const content = {
  interpretation: {
    clinicalMeaning:
      "The Pulmonary Embolism Severity Index estimates 30-day mortality risk in patients with acute pulmonary embolism.",
    severity:
      "Class I and II are lower risk; Class III is intermediate; Class IV and V indicate higher predicted mortality risk.",
    nextStep:
      "Use with hemodynamic status, RV dysfunction, biomarkers, oxygen requirement, bleeding risk, social factors, and local PE pathways.",
  },
  notes: {
    pearls: [
      "PESI is for prognostic risk stratification after PE diagnosis.",
      "Hemodynamic instability overrides low-score classification.",
      "Low PESI may support outpatient care only when clinical and social criteria are also favorable.",
    ],
    pitfalls: [
      "Using PESI before confirming acute PE.",
      "Ignoring RV dysfunction, troponin, BNP, or oxygen requirement.",
      "Discharging based on PESI alone without checking bleeding risk and follow-up feasibility.",
    ],
  },
  faq: [
    {
      question: "What PESI classes are low risk?",
      answer:
        "PESI class I and II are generally considered lower-risk categories, provided the patient is clinically stable.",
    },
    {
      question: "Can PESI decide outpatient treatment alone?",
      answer:
        "No. Outpatient PE management also requires clinical stability, low bleeding risk, adequate oxygenation, reliable follow-up, and no major comorbidity requiring admission.",
    },
  ],
  references: [
    "Aujesky D et al. Am J Respir Crit Care Med. 2005.",
    "Konstantinides SV et al. ESC Guidelines for pulmonary embolism.",
  ],
  related: ["sPESI Score", "Wells PE", "IMPROVE VTE Score", "IMPROVE Bleeding Risk"],
};

export default function PesiScorePage() {
  const [age, setAge] = useState("");
  const [checked, setChecked] = useState({});

  const score = useMemo(() => {
    const agePoints = toNumber(age);
    const itemPoints = items.reduce(
      (sum, item) => sum + (checked[item.id] ? item.points : 0),
      0
    );

    return agePoints + itemPoints;
  }, [age, checked]);

  const risk = useMemo(() => {
    if (score <= 65) {
      return {
        cls: "Class I",
        tone: "green",
        label: "Very low risk",
        interpretation:
          "PESI class I suggests very low predicted 30-day mortality risk if the patient is otherwise clinically stable.",
        recommendation:
          "Consider low-risk PE pathway only if hemodynamics, oxygenation, bleeding risk, RV assessment, and follow-up conditions are favorable.",
      };
    }

    if (score <= 85) {
      return {
        cls: "Class II",
        tone: "green",
        label: "Low risk",
        interpretation:
          "PESI class II suggests low predicted 30-day mortality risk when no other high-risk features are present.",
        recommendation:
          "Assess outpatient or early discharge eligibility only with stable vitals, acceptable oxygenation, low bleeding risk, and reliable follow-up.",
      };
    }

    if (score <= 105) {
      return {
        cls: "Class III",
        tone: "amber",
        label: "Intermediate risk",
        interpretation:
          "PESI class III suggests intermediate predicted mortality risk.",
        recommendation:
          "Consider inpatient observation and evaluate RV dysfunction, biomarkers, oxygen need, comorbidities, and bleeding risk.",
      };
    }

    if (score <= 125) {
      return {
        cls: "Class IV",
        tone: "red",
        label: "High risk",
        interpretation:
          "PESI class IV suggests high predicted mortality risk.",
        recommendation:
          "Inpatient management is generally appropriate. Assess RV strain, biomarkers, oxygenation, escalation need, and anticoagulation strategy.",
      };
    }

    return {
      cls: "Class V",
      tone: "red",
      label: "Very high risk",
      interpretation:
        "PESI class V suggests very high predicted mortality risk.",
      recommendation:
        "Urgent inpatient management is appropriate. Assess for hemodynamic compromise, RV failure, reperfusion indications, ICU need, and bleeding risk.",
    };
  }, [score]);

  function toggle(id) {
    setChecked((previous) => ({ ...previous, [id]: !previous[id] }));
  }

  return (
    <CalculatorShell
      category="Pulmonary Embolism"
      title="PESI Score Calculator"
      description="Pulmonary Embolism Severity Index for 30-day mortality risk stratification in acute PE."
    >
      <CalculatorPanel>
        <label style={styles.label}>
          Age in years
          <NumericInput
            value={age}
            onChange={setAge}
            placeholder="65"
            style={styles.input}
          />
        </label>

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
          title="PESI Score"
          value={score}
          unit={`${risk.cls} — ${risk.label}`}
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
  label: {
    display: "grid",
    gap: 8,
    marginBottom: 16,
    color: "#0f172a",
    fontWeight: 850,
  },
  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: 14,
    borderRadius: 14,
    border: "1px solid #cbd5e1",
    fontSize: 16,
  },
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
