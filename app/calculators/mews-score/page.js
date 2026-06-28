"use client";

import { useMemo, useState } from "react";
import CalculatorShell from "../../components/calculators/CalculatorShell";
import CalculatorPanel from "../../components/calculators/CalculatorPanel";
import CalculatorResult from "../../components/calculators/CalculatorResult";
import CalculatorReferencePage from "../../components/calculators/CalculatorReferencePage";

const inputs = [
  {
    key: "systolicBp",
    label: "Systolic blood pressure",
    options: ["3 - ≤70", "2 - 71–80", "1 - 81–100", "0 - 101–199", "2 - ≥200"],
    values: [3, 2, 1, 0, 2],
  },
  {
    key: "heartRate",
    label: "Heart rate",
    options: ["2 - ≤40", "1 - 41–50", "0 - 51–100", "1 - 101–110", "2 - 111–129", "3 - ≥130"],
    values: [2, 1, 0, 1, 2, 3],
  },
  {
    key: "respiratoryRate",
    label: "Respiratory rate",
    options: ["2 - ≤8", "0 - 9–14", "1 - 15–20", "2 - 21–29", "3 - ≥30"],
    values: [2, 0, 1, 2, 3],
  },
  {
    key: "temperature",
    label: "Temperature",
    options: ["2 - ≤35.0°C", "0 - 35.1–38.4°C", "2 - ≥38.5°C"],
    values: [2, 0, 2],
  },
  {
    key: "avpu",
    label: "AVPU",
    options: ["0 - Alert", "1 - Reacts to voice", "2 - Reacts to pain", "3 - Unresponsive"],
    values: [0, 1, 2, 3],
  },
];

const content = {
  interpretation: {
    clinicalMeaning:
      "MEWS is an early warning score used to identify hospitalized patients at risk of clinical deterioration.",
    severity:
      "Higher scores indicate greater risk. A score of 5 or more is commonly considered concerning and should prompt urgent review.",
    nextStep:
      "Use with clinical trajectory, nursing concern, oxygenation, urine output, sepsis screening, and local escalation pathways.",
  },
  notes: {
    pearls: [
      "MEWS is most useful when trended over time.",
      "Clinical concern should override a low score.",
      "Escalation thresholds vary by institution.",
    ],
    pitfalls: [
      "Using MEWS as a diagnosis rather than deterioration screening.",
      "Ignoring oxygen requirement and urine output if not included in the local version.",
      "Delaying review when vital signs are rapidly worsening.",
    ],
  },
  faq: [
    {
      question: "What MEWS score is concerning?",
      answer:
        "A MEWS score of 5 or more is commonly treated as concerning, but local escalation thresholds should be followed.",
    },
    {
      question: "Is MEWS the same as NEWS2?",
      answer:
        "No. Both are early warning systems, but NEWS2 is a standardized UK score with different parameters and escalation logic.",
    },
  ],
  references: [
    "Subbe CP et al. QJM. 2001.",
  ],
  related: ["NEWS2", "qSOFA Score", "SOFA Score"],
};

export default function MewsScorePage() {
  const [values, setValues] = useState({
    systolicBp: 3,
    heartRate: 2,
    respiratoryRate: 1,
    temperature: 1,
    avpu: 0,
  });

  const score = useMemo(() => {
    return inputs.reduce((sum, input) => {
      const selectedIndex = Number(values[input.key] || 0);
      return sum + input.values[selectedIndex];
    }, 0);
  }, [values]);

  const risk = useMemo(() => {
    if (score >= 5) {
      return {
        tone: "red",
        label: "High deterioration risk",
        interpretation:
          "MEWS ≥5 suggests clinically important risk of deterioration.",
        recommendation:
          "Urgent clinical review and escalation according to local protocol are appropriate. Assess sepsis, hypoperfusion, oxygenation, and need for higher-level care.",
      };
    }

    if (score >= 3) {
      return {
        tone: "amber",
        label: "Moderate deterioration risk",
        interpretation:
          "MEWS 3–4 suggests increased risk and need for prompt reassessment.",
        recommendation:
          "Increase monitoring frequency, review cause of abnormal vital signs, and escalate if deterioration persists.",
      };
    }

    return {
      tone: "green",
      label: "Lower deterioration risk",
      interpretation:
        "MEWS 0–2 suggests lower measured deterioration risk at this moment.",
      recommendation:
        "Continue observation and repeat scoring if symptoms, vital signs, nursing concern, or clinical status changes.",
    };
  }, [score]);

  function update(key, value) {
    setValues((previous) => ({ ...previous, [key]: Number(value) }));
  }

  return (
    <CalculatorShell
      category="Critical Care"
      title="MEWS Score Calculator"
      description="Modified Early Warning Score for hospital clinical deterioration screening."
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
          title="MEWS Score"
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
