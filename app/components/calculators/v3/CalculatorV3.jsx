"use client";

import { useMemo, useState } from "react";
import CalculatorShell from "../CalculatorShell";
import CalculatorPanel from "../CalculatorPanel";
import CalculatorResult from "../CalculatorResult";
import CalculatorReferencePage from "../CalculatorReferencePage";

export default function CalculatorV3({ config }) {
  if (!config) return null;

  if (config.type === "single-choice") {
    return <SingleChoiceCalculator config={config} />;
  }

  if (config.type === "select-score") {
    return <SelectScoreCalculator config={config} />;
  }

  return null;
}

function SingleChoiceCalculator({ config }) {
  const [selected, setSelected] = useState(config.defaultValue);

  const result = useMemo(
    () => config.options.find((item) => item.value === selected) || config.options[0],
    [config.options, selected]
  );

  const referenceContent = toReferenceContent(config);

  return (
    <CalculatorShell
      category={config.category}
      title={config.title}
      description={config.description}
    >
      <CalculatorPanel>
        <div style={styles.grid}>
          {config.options.map((item) => (
            <label
              key={item.value}
              style={{
                ...styles.option,
                ...(selected === item.value ? styles.optionActive : {}),
              }}
            >
              <input
                type="radio"
                name={config.inputName}
                value={item.value}
                checked={selected === item.value}
                onChange={(event) => setSelected(event.target.value)}
              />
              <div>
                <strong style={styles.optionTitle}>
                  {item.title} — {item.label}
                </strong>
                <span style={styles.optionText}>{item.description}</span>
              </div>
            </label>
          ))}
        </div>

        <CalculatorResult
          title={`Selected ${config.title.replace(" Calculator", "")}`}
          value={result.title}
          unit={result.label}
          interpretation={result.interpretation}
          recommendation={result.recommendation}
          tone={result.tone}
        />
      </CalculatorPanel>

      <CalculatorReferencePage content={referenceContent} />
    </CalculatorShell>
  );
}

function SelectScoreCalculator({ config }) {
  const [values, setValues] = useState(config.defaultValues || {});

  const result = useMemo(() => calculateSelectScoreResult(config, values), [config, values]);
  const referenceContent = toReferenceContent(config);

  function updateValue(key, value) {
    setValues((previous) => ({
      ...previous,
      [key]: Number(value),
    }));
  }

  return (
    <CalculatorShell
      category={config.category}
      title={config.title}
      description={config.description}
    >
      <CalculatorPanel>
        <div style={styles.inputGrid}>
          {config.inputs.map((input) => (
            <label key={input.key} style={styles.label}>
              {input.label}
              <select
                style={styles.select}
                value={values[input.key] ?? 0}
                onChange={(event) => updateValue(input.key, event.target.value)}
              >
                {input.options.map((label, index) => (
                  <option key={label} value={index}>
                    {label}
                  </option>
                ))}
              </select>
            </label>
          ))}
        </div>

        <CalculatorResult
          title={result.title}
          value={result.value}
          unit={result.unit}
          interpretation={result.interpretation}
          recommendation={result.recommendation}
          tone={result.tone}
        />
      </CalculatorPanel>

      <CalculatorReferencePage content={referenceContent} />
    </CalculatorShell>
  );
}


function calculateSelectScoreResult(config, values) {
  if (config.resultMode === "wifi-stage") {
    const score =
      Number(values.wound || 0) +
      Number(values.ischemia || 0) +
      Number(values.infection || 0);

    if (score <= 2) {
      return scoreStage(
        score,
        "Stage 1",
        "Very low limb threat",
        "Low expected limb threat if clinically stable.",
        "Optimize wound care, risk factors, infection control, perfusion surveillance, and clinical follow-up.",
        "green"
      );
    }

    if (score <= 4) {
      return scoreStage(
        score,
        "Stage 2",
        "Low limb threat",
        "Limb threat is present but not usually limb-immediate.",
        "Assess perfusion, wound trajectory, and infection. Consider revascularization when ischemia or wound healing concern is present.",
        "blue"
      );
    }

    if (score <= 6) {
      return scoreStage(
        score,
        "Stage 3",
        "Moderate limb threat",
        "Clinically meaningful risk of limb loss or delayed wound healing.",
        "Consider vascular imaging and revascularization planning, especially with ischemia grade 2–3 or progressive tissue loss.",
        "amber"
      );
    }

    if (score <= 8) {
      return scoreStage(
        score,
        "Stage 4",
        "High limb threat",
        "High risk of amputation without effective infection control, wound care, and perfusion optimization.",
        "Urgent multidisciplinary limb-salvage assessment is appropriate. Revascularization benefit may be substantial if technically feasible.",
        "red"
      );
    }

    return scoreStage(
      score,
      "Stage 5",
      "Very high limb threat",
      "Very severe combined wound, ischemia, and infection burden.",
      "Urgent limb-salvage pathway, infection source control, and revascularization feasibility assessment are needed.",
      "red"
    );
  }

  return scoreStage(
    0,
    "Result",
    "score",
    "Interpret the result together with the clinical context.",
    "Confirm inputs and follow current standards of care.",
    "blue"
  );
}

function scoreStage(score, title, label, interpretation, recommendation, tone) {
  return {
    title,
    value: String(score),
    label,
    unit: "total score",
    interpretation,
    recommendation,
    tone,
  };
}

function toReferenceContent(config) {
  return {
    category: config.category,
    title: config.title,
    description: config.description,
    interpretation: {
      clinicalMeaning: config.reference.clinicalMeaning,
      severity: config.reference.severity,
      nextStep: config.reference.nextStep,
    },
    notes: {
      pearls: config.reference.pearls,
      pitfalls: config.reference.pitfalls,
    },
    faq: config.reference.faq,
    references: config.reference.references,
    related: config.reference.related,
  };
}

const styles = {
  grid: {
    display: "grid",
    gap: 12,
  },
  option: {
    display: "grid",
    gridTemplateColumns: "24px 1fr",
    gap: 12,
    alignItems: "center",
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
    borderRadius: 18,
    padding: 15,
    cursor: "pointer",
  },
  optionActive: {
    background: "#eff6ff",
    borderColor: "#93c5fd",
    boxShadow: "0 12px 28px rgba(37,99,235,0.12)",
  },
  optionTitle: {
    display: "block",
    color: "#0f172a",
    fontSize: 15,
    marginBottom: 4,
  },
  optionText: {
    display: "block",
    color: "#475569",
    fontSize: 14,
    lineHeight: 1.55,
  },
  inputGrid: {
    display: "grid",
    gap: 16,
  },
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
