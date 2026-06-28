"use client";

import { useMemo, useState } from "react";
import CalculatorShell from "../../components/calculators/CalculatorShell";
import CalculatorPanel from "../../components/calculators/CalculatorPanel";
import CalculatorResult from "../../components/calculators/CalculatorResult";
import CalculatorReferencePage from "../../components/calculators/CalculatorReferencePage";

const inputs = [
  {
    key: "respiratoryRate",
    label: "Respiratory rate",
    options: [
      "3 - ≤8/min",
      "1 - 9–11/min",
      "0 - 12–20/min",
      "2 - 21–24/min",
      "3 - ≥25/min",
    ],
    values: [3, 1, 0, 2, 3],
  },
  {
    key: "oxygenSaturation",
    label: "Oxygen saturation scale 1",
    options: [
      "3 - ≤91%",
      "2 - 92–93%",
      "1 - 94–95%",
      "0 - ≥96%",
    ],
    values: [3, 2, 1, 0],
  },
  {
    key: "supplementalOxygen",
    label: "Supplemental oxygen",
    options: ["0 - No", "2 - Yes"],
    values: [0, 2],
  },
  {
    key: "temperature",
    label: "Temperature",
    options: [
      "3 - ≤35.0°C",
      "1 - 35.1–36.0°C",
      "0 - 36.1–38.0°C",
      "1 - 38.1–39.0°C",
      "2 - ≥39.1°C",
    ],
    values: [3, 1, 0, 1, 2],
  },
  {
    key: "systolicBp",
    label: "Systolic blood pressure",
    options: [
      "3 - ≤90 mmHg",
      "2 - 91–100",
      "1 - 101–110",
      "0 - 111–219",
      "3 - ≥220",
    ],
    values: [3, 2, 1, 0, 3],
  },
  {
    key: "heartRate",
    label: "Heart rate",
    options: [
      "3 - ≤40/min",
      "1 - 41–50",
      "0 - 51–90",
      "1 - 91–110",
      "2 - 111–130",
      "3 - ≥131",
    ],
    values: [3, 1, 0, 1, 2, 3],
  },
  {
    key: "consciousness",
    label: "Consciousness",
    options: ["0 - Alert", "3 - New confusion / V / P / U"],
    values: [0, 3],
  },
];

const content = {
  interpretation: {
    clinicalMeaning:
      "NEWS2 is an early warning score used to identify acute illness severity and risk of clinical deterioration.",
    severity:
      "Scores 0–4 are generally low risk, any single parameter scoring 3 requires prompt review, 5–6 is medium risk, and ≥7 is high risk.",
    nextStep:
      "Use the score with clinical trajectory, nursing concern, oxygen requirement, sepsis screening, and local escalation protocols.",
  },
  notes: {
    pearls: [
      "A single NEWS2 parameter scoring 3 can be clinically important even if the total score is modest.",
      "Trend over time is often more important than one isolated value.",
      "Escalation should follow local early warning and sepsis protocols.",
    ],
    pitfalls: [
      "Using NEWS2 to replace bedside clinical concern.",
      "Ignoring new oxygen requirement or new confusion.",
      "Failing to repeat observations after treatment or deterioration.",
    ],
  },
  faq: [
    {
      question: "What NEWS2 score is high risk?",
      answer:
        "A NEWS2 score of 7 or more is generally considered high risk and should prompt emergency clinical review according to local protocols.",
    },
    {
      question: "Does NEWS2 diagnose sepsis?",
      answer:
        "No. NEWS2 identifies deterioration risk. Sepsis requires clinical assessment, infection evaluation, organ dysfunction assessment, and treatment decisions.",
    },
  ],
  references: [
    "Royal College of Physicians. National Early Warning Score NEWS2.",
  ],
  related: ["MEWS", "qSOFA Score", "SOFA Score"],
};

export default function News2ScorePage() {
  const [values, setValues] = useState({
    respiratoryRate: 2,
    oxygenSaturation: 3,
    supplementalOxygen: 0,
    temperature: 2,
    systolicBp: 3,
    heartRate: 2,
    consciousness: 0,
  });

  const score = useMemo(() => {
    return inputs.reduce((sum, input) => {
      const selectedIndex = Number(values[input.key] || 0);
      return sum + input.values[selectedIndex];
    }, 0);
  }, [values]);

  const singleThree = useMemo(() => {
    return inputs.some((input) => input.values[Number(values[input.key] || 0)] === 3);
  }, [values]);

  const risk = useMemo(() => {
    if (score >= 7) {
      return {
        tone: "red",
        label: "High clinical risk",
        interpretation:
          "NEWS2 ≥7 suggests high risk of clinical deterioration and need for emergency assessment.",
        recommendation:
          "Urgent clinical review and escalation according to local protocol are appropriate. Assess airway, breathing, circulation, oxygenation, sepsis, and need for higher-level care.",
      };
    }

    if (score >= 5) {
      return {
        tone: "amber",
        label: "Medium clinical risk",
        interpretation:
          "NEWS2 5–6 suggests increased risk of deterioration and need for prompt clinical review.",
        recommendation:
          "Increase monitoring frequency, assess for sepsis or organ dysfunction, and escalate according to local early warning protocols.",
      };
    }

    if (singleThree) {
      return {
        tone: "amber",
        label: "Single parameter score of 3",
        interpretation:
          "Although the total score is below 5, one vital sign is markedly abnormal.",
        recommendation:
          "Prompt clinical review is appropriate, especially if abnormality is new, persistent, or clinically concerning.",
      };
    }

    return {
      tone: "green",
      label: "Low clinical risk",
      interpretation:
        "NEWS2 0–4 without a single parameter score of 3 is generally lower risk.",
      recommendation:
        "Continue routine monitoring and reassess if symptoms, vital signs, oxygen requirement, or clinical concern changes.",
    };
  }, [score, singleThree]);

  function update(key, value) {
    setValues((previous) => ({ ...previous, [key]: Number(value) }));
  }

  return (
    <CalculatorShell
      category="Critical Care"
      title="NEWS2 Score Calculator"
      description="National Early Warning Score 2 for acute illness severity and deterioration risk."
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
                  <option key={option} value={index}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          ))}
        </div>

        <CalculatorResult
          title="NEWS2 Score"
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
