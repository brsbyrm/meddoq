"use client";

import { useMemo, useState } from "react";
import CalculatorShell from "../../components/calculators/CalculatorShell";
import CalculatorPanel from "../../components/calculators/CalculatorPanel";
import CalculatorResult from "../../components/calculators/CalculatorResult";
import CalculatorReferencePage from "../../components/calculators/CalculatorReferencePage";

const inputs = [
  {
    key: "history",
    label: "History",
    options: ["0 - Slightly suspicious", "1 - Moderately suspicious", "2 - Highly suspicious"],
  },
  {
    key: "ecg",
    label: "ECG",
    options: ["0 - Normal", "1 - Non-specific repolarization disturbance", "2 - Significant ST depression"],
  },
  {
    key: "age",
    label: "Age",
    options: ["0 - <45 years", "1 - 45–64 years", "2 - ≥65 years"],
  },
  {
    key: "riskFactors",
    label: "Risk factors",
    options: ["0 - No known risk factors", "1 - 1–2 risk factors", "2 - ≥3 risk factors or known atherosclerotic disease"],
  },
  {
    key: "troponin",
    label: "Troponin",
    options: ["0 - ≤ normal limit", "1 - 1–3× normal limit", "2 - >3× normal limit"],
  },
];

const content = {
  interpretation: {
    clinicalMeaning:
      "The HEART score supports risk stratification for patients presenting with chest pain or suspected acute coronary syndrome.",
    severity:
      "Scores 0–3 are generally low risk, 4–6 intermediate risk, and 7–10 high risk for short-term major adverse cardiac events.",
    nextStep:
      "Use with serial ECGs, serial troponins, clinical trajectory, differential diagnosis, local ACS pathways, and cardiology input when appropriate.",
  },
  notes: {
    pearls: [
      "HEART is intended for undifferentiated chest pain evaluation, not for confirmed STEMI.",
      "Dynamic ECG changes, ongoing ischemic symptoms, shock, or malignant arrhythmia override a low score.",
      "Serial troponin strategy and local chest pain protocol remain essential.",
    ],
    pitfalls: [
      "Using HEART as a stand-alone discharge decision.",
      "Ignoring atypical symptoms in women, older adults, or diabetic patients.",
      "Applying the score to patients with clear STEMI or unstable hemodynamics.",
    ],
  },
  faq: [
    {
      question: "What HEART score is low risk?",
      answer:
        "A HEART score of 0–3 is commonly considered low risk, but disposition should also account for serial troponin testing, ECG evolution, symptoms, and follow-up reliability.",
    },
    {
      question: "Does HEART diagnose ACS?",
      answer:
        "No. HEART estimates risk in suspected ACS. Diagnosis still requires clinical assessment, ECG interpretation, biomarkers, and appropriate imaging or angiography when indicated.",
    },
  ],
  references: [
    "Six AJ et al. Neth Heart J. 2008.",
    "Backus BE et al. Int J Cardiol. 2013.",
  ],
  related: ["TIMI NSTEMI/UA Score", "GRACE ACS", "DAPT Score"],
};

export default function HeartScorePage() {
  const [values, setValues] = useState({
    history: 0,
    ecg: 0,
    age: 0,
    riskFactors: 0,
    troponin: 0,
  });

  const score = useMemo(
    () => Object.values(values).reduce((sum, value) => sum + Number(value || 0), 0),
    [values]
  );

  const risk = useMemo(() => {
    if (score >= 7) {
      return {
        tone: "red",
        label: "High risk",
        interpretation:
          "HEART score 7–10 suggests high short-term risk of major adverse cardiac events.",
        recommendation:
          "Urgent ACS management, cardiology assessment, serial ECG/troponin monitoring, and invasive evaluation should be considered according to local pathways.",
      };
    }

    if (score >= 4) {
      return {
        tone: "amber",
        label: "Intermediate risk",
        interpretation:
          "HEART score 4–6 suggests intermediate risk and usually requires further observation or testing.",
        recommendation:
          "Continue serial ECG and troponin assessment, evaluate ischemic features, and consider noninvasive or invasive testing based on clinical context.",
      };
    }

    return {
      tone: "green",
      label: "Low risk",
      interpretation:
        "HEART score 0–3 suggests lower short-term risk when serial testing and clinical assessment are reassuring.",
      recommendation:
        "Consider low-risk chest pain pathway only if symptoms, ECGs, serial troponins, and follow-up conditions are favorable.",
    };
  }, [score]);

  function update(key, value) {
    setValues((previous) => ({ ...previous, [key]: Number(value) }));
  }

  return (
    <CalculatorShell
      category="Cardiology"
      title="HEART Score Calculator"
      description="Risk stratification tool for chest pain and suspected acute coronary syndrome."
    >
      <CalculatorPanel>
        <div style={styles.grid}>
          {inputs.map((input) => (
            <label key={input.key} style={styles.label}>
              {input.label}
              <select
                style={styles.select}
                value={values[input.key]}
                onChange={(event) => update(input.key, event.target.value)}
              >
                {input.options.map((option, index) => (
                  <option key={option} value={index}>{option}</option>
                ))}
              </select>
            </label>
          ))}
        </div>

        <CalculatorResult
          title="HEART Score"
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
  grid: { display: "grid", gap: 16 },
  label: {
    display: "grid",
    gap: 8,
    color: "#0f172a",
    fontSize: 14,
    fontWeight: 850,
  },
  select: {
    width: "100%",
    padding: 14,
    borderRadius: 14,
    border: "1px solid #cbd5e1",
    background: "#ffffff",
    color: "#0f172a",
    fontSize: 15,
  },
};
