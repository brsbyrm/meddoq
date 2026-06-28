"use client";

import { useMemo, useState } from "react";
import CalculatorShell from "../../components/calculators/CalculatorShell";
import CalculatorPanel from "../../components/calculators/CalculatorPanel";
import CalculatorResult from "../../components/calculators/CalculatorResult";
import CalculatorReferencePage from "../../components/calculators/CalculatorReferencePage";

const items = [
  { id: "age65", label: "Age ≥65 years", points: 1 },
  { id: "riskFactors", label: "At least 3 CAD risk factors", points: 1 },
  { id: "knownCad", label: "Known coronary stenosis ≥50%", points: 1 },
  { id: "aspirin", label: "Aspirin use in the past 7 days", points: 1 },
  { id: "angina", label: "At least 2 anginal episodes in the past 24 hours", points: 1 },
  { id: "stChange", label: "ST-segment deviation ≥0.5 mm", points: 1 },
  { id: "biomarker", label: "Elevated cardiac biomarkers", points: 1 },
];

const content = {
  interpretation: {
    clinicalMeaning:
      "The TIMI risk score for unstable angina and NSTEMI estimates short-term risk of death, myocardial infarction, or urgent revascularization.",
    severity:
      "Higher scores indicate progressively higher ischemic risk. Scores 0–2 are lower risk, 3–4 intermediate risk, and 5–7 high risk.",
    nextStep:
      "Use with ECG dynamics, troponin pattern, hemodynamic status, bleeding risk, renal function, frailty, and local ACS invasive strategy pathways.",
  },
  notes: {
    pearls: [
      "TIMI is simple and useful at the bedside for UA/NSTEMI risk communication.",
      "Positive troponin, dynamic ST changes, recurrent pain, or instability may justify escalation regardless of total score.",
      "Bleeding risk and renal function should be assessed before antithrombotic intensification or angiography.",
    ],
    pitfalls: [
      "Using TIMI NSTEMI/UA for STEMI decisions.",
      "Ignoring ongoing chest pain or dynamic ECG changes.",
      "Treating the score as a substitute for cardiology assessment in high-risk presentations.",
    ],
  },
  faq: [
    {
      question: "What is a high TIMI NSTEMI/UA score?",
      answer:
        "A score of 5–7 is generally high risk and should prompt careful ACS management and consideration of early invasive evaluation depending on clinical context.",
    },
    {
      question: "Can TIMI decide discharge?",
      answer:
        "No. TIMI supports risk stratification but discharge decisions require serial ECGs, serial troponins, symptom assessment, differential diagnosis, and follow-up planning.",
    },
  ],
  references: [
    "Antman EM et al. JAMA. 2000.",
    "Amsterdam EA et al. AHA/ACC Guideline for NSTE-ACS.",
  ],
  related: ["HEART Score", "GRACE ACS", "DAPT Score", "PRECISE-DAPT"],
};

export default function TimiNstemiUaScorePage() {
  const [checked, setChecked] = useState({});

  const score = useMemo(() => {
    return items.reduce((sum, item) => sum + (checked[item.id] ? item.points : 0), 0);
  }, [checked]);

  const risk = useMemo(() => {
    if (score >= 5) {
      return {
        tone: "red",
        label: "High ischemic risk",
        interpretation:
          "TIMI score 5–7 suggests high short-term risk in UA/NSTEMI.",
        recommendation:
          "Manage as high-risk ACS. Consider early invasive evaluation, intensive monitoring, antithrombotic strategy, and cardiology involvement according to local protocol.",
      };
    }

    if (score >= 3) {
      return {
        tone: "amber",
        label: "Intermediate ischemic risk",
        interpretation:
          "TIMI score 3–4 suggests intermediate short-term ischemic risk.",
        recommendation:
          "Continue ACS evaluation with serial ECGs and troponins, optimize anti-ischemic treatment, assess bleeding risk, and consider invasive testing based on trajectory.",
      };
    }

    return {
      tone: "green",
      label: "Lower ischemic risk",
      interpretation:
        "TIMI score 0–2 suggests lower measured ischemic risk, if clinical features are otherwise reassuring.",
      recommendation:
        "Use an observation or low-risk ACS pathway only when symptoms, ECGs, serial biomarkers, and follow-up conditions are favorable.",
    };
  }, [score]);

  function toggle(id) {
    setChecked((previous) => ({ ...previous, [id]: !previous[id] }));
  }

  return (
    <CalculatorShell
      category="Cardiology"
      title="TIMI NSTEMI/UA Score Calculator"
      description="TIMI risk score for unstable angina and non-ST elevation myocardial infarction."
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
          title="TIMI NSTEMI/UA Score"
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
