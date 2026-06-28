"use client";

import { useMemo, useState } from "react";
import CalculatorShell from "../../components/calculators/CalculatorShell";
import CalculatorPanel from "../../components/calculators/CalculatorPanel";
import CalculatorResult from "../../components/calculators/CalculatorResult";
import CalculatorReferencePage from "../../components/calculators/CalculatorReferencePage";

const items = [
  { id: "hypertension", label: "Hypertension: systolic BP >160 mmHg", points: 1 },
  { id: "renal", label: "Abnormal renal function", points: 1 },
  { id: "liver", label: "Abnormal liver function", points: 1 },
  { id: "stroke", label: "Prior stroke", points: 1 },
  { id: "bleeding", label: "Bleeding history or predisposition", points: 1 },
  { id: "labileInr", label: "Labile INR", points: 1 },
  { id: "elderly", label: "Age >65 years", points: 1 },
  { id: "drugs", label: "Drugs predisposing to bleeding", points: 1 },
  { id: "alcohol", label: "Alcohol use", points: 1 },
];

const content = {
  interpretation: {
    clinicalMeaning:
      "HAS-BLED estimates major bleeding risk in patients with atrial fibrillation receiving or being considered for anticoagulation.",
    severity:
      "Higher scores indicate higher bleeding risk. A score of 3 or more is commonly considered high bleeding risk and should prompt closer review.",
    nextStep:
      "Use to identify modifiable bleeding risk factors, not to automatically withhold anticoagulation when stroke risk is high.",
  },
  notes: {
    pearls: [
      "HAS-BLED is most useful for identifying correctable bleeding risk factors.",
      "High bleeding risk should prompt closer monitoring and risk-factor modification.",
      "Stroke risk and bleeding risk should be assessed together.",
    ],
    pitfalls: [
      "Using HAS-BLED as a reason to automatically deny anticoagulation.",
      "Ignoring modifiable factors such as uncontrolled blood pressure, NSAID use, alcohol, or labile INR.",
      "Applying the score without considering renal function, liver disease, anemia, frailty, or drug interactions.",
    ],
  },
  faq: [
    {
      question: "What HAS-BLED score is high risk?",
      answer:
        "A score of 3 or more is commonly considered high bleeding risk and should prompt closer review and monitoring.",
    },
    {
      question: "Should anticoagulation be stopped because HAS-BLED is high?",
      answer:
        "Not automatically. The score should trigger risk-factor modification and closer follow-up while balancing stroke-prevention benefit.",
    },
  ],
  references: [
    "Pisters R et al. Chest. 2010.",
    "Hindricks G et al. ESC Guidelines for atrial fibrillation.",
    "January CT et al. AHA/ACC/HRS Guideline for atrial fibrillation.",
  ],
  related: ["CHA₂DS₂-VASc", "ATRIA Bleeding", "HEMORR₂HAGES"],
};

export default function HasBledPage() {
  const [checked, setChecked] = useState({});

  const score = useMemo(() => {
    return items.reduce((sum, item) => sum + (checked[item.id] ? item.points : 0), 0);
  }, [checked]);

  const risk = useMemo(() => {
    if (score >= 3) {
      return {
        tone: "red",
        label: "High bleeding risk",
        interpretation:
          "HAS-BLED score ≥3 suggests increased major bleeding risk.",
        recommendation:
          "Review and correct modifiable bleeding risk factors, monitor more closely, reassess blood pressure, renal/liver function, interacting drugs, alcohol use, and anticoagulant choice.",
      };
    }

    if (score >= 1) {
      return {
        tone: "amber",
        label: "Bleeding risk factors present",
        interpretation:
          "This HAS-BLED score indicates one or more bleeding risk factors.",
        recommendation:
          "Address modifiable risk factors and monitor according to clinical context, especially when anticoagulation is used.",
      };
    }

    return {
      tone: "green",
      label: "Low measured bleeding risk",
      interpretation:
        "HAS-BLED score 0 suggests low measured bleeding risk by this tool.",
      recommendation:
        "Continue routine clinical monitoring and reassess if medications, renal function, liver function, blood pressure, or bleeding history changes.",
    };
  }, [score]);

  function toggle(id) {
    setChecked((previous) => ({ ...previous, [id]: !previous[id] }));
  }

  return (
    <CalculatorShell
      category="Cardiovascular"
      title="HAS-BLED Score Calculator"
      description="Bleeding risk assessment tool for anticoagulated patients with atrial fibrillation."
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
          title="HAS-BLED Score"
          value={score}
          unit={risk.label}
          tone={risk.tone}
          interpretation={risk.interpretation}
          recommendation={risk.recommendation}
        />
      </CalculatorPanel>

      <section style={styles.reference}>
        <div style={styles.referenceHeader}>
          <p style={styles.referenceKicker}>Clinical Reference</p>
          <h2 style={styles.referenceTitle}>HAS-BLED Clinical Reference</h2>
          <p style={styles.referenceIntro}>
            HAS-BLED estimates major bleeding risk in patients with atrial fibrillation and helps identify modifiable bleeding risk factors before or during anticoagulation.
          </p>
        </div>

        <div style={styles.referenceGrid}>
          <article style={styles.referenceCard}>
            <h3>When to use</h3>
            <p>
              Use HAS-BLED in patients with atrial fibrillation when evaluating bleeding risk during anticoagulation planning or follow-up.
            </p>
          </article>

          <article style={styles.referenceCard}>
            <h3>How to interpret</h3>
            <p>
              A score of 3 or more is commonly considered high bleeding risk and should prompt closer review, monitoring, and correction of modifiable risk factors.
            </p>
          </article>

          <article style={styles.referenceCard}>
            <h3>Clinical limitations</h3>
            <p>
              HAS-BLED does not replace individualized assessment of anemia, frailty, falls, renal function, liver disease, drug interactions, or procedural bleeding risk.
            </p>
          </article>

          <article style={styles.referenceCard}>
            <h3>Next clinical step</h3>
            <p>
              Do not use a high score alone to deny anticoagulation. Review blood pressure, renal and liver function, alcohol, NSAIDs, antiplatelets, INR control, and follow-up plan.
            </p>
          </article>
        </div>

        <div style={styles.faqBox}>
          <h3>FAQ</h3>
          <details style={styles.detail}>
            <summary>Does HAS-BLED estimate stroke risk?</summary>
            <p>No. HAS-BLED estimates bleeding risk. Stroke risk should be assessed separately with CHA₂DS₂-VASc or another appropriate tool.</p>
          </details>
          <details style={styles.detail}>
            <summary>Should anticoagulation be withheld if HAS-BLED is high?</summary>
            <p>Not automatically. A high score should trigger closer monitoring and modification of bleeding risk factors rather than automatic withholding of anticoagulation.</p>
          </details>
          <details style={styles.detail}>
            <summary>What risk factors are modifiable?</summary>
            <p>Examples include uncontrolled hypertension, interacting drugs, excess alcohol intake, and unstable INR control in patients receiving warfarin.</p>
          </details>
        </div>

        <div style={styles.referencesBox}>
          <h3>References</h3>
          <ol>
            <li>Pisters R et al. A novel user-friendly score to assess one-year risk of major bleeding in atrial fibrillation. Chest. 2010.</li>
            <li>2023 ACC/AHA/ACCP/HRS Guideline for the Diagnosis and Management of Atrial Fibrillation.</li>
            <li>2024 ESC Guidelines for the management of atrial fibrillation.</li>
          </ol>
        </div>
      </section>
    </CalculatorShell>
  );
}

const styles = {
  reference: {
    marginTop: 28,
    display: "grid",
    gap: 18,
  },
  referenceHeader: {
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: 24,
    padding: 24,
    boxShadow: "0 18px 44px rgba(15, 23, 42, 0.06)",
  },
  referenceKicker: {
    margin: 0,
    color: "#2563eb",
    fontWeight: 900,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    fontSize: 12,
  },
  referenceTitle: {
    margin: "8px 0",
    color: "#0f172a",
    fontSize: 30,
    letterSpacing: "-0.04em",
  },
  referenceIntro: {
    margin: 0,
    color: "#475569",
    fontSize: 16,
    lineHeight: 1.65,
  },
  referenceGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 14,
  },
  referenceCard: {
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: 20,
    padding: 18,
    boxShadow: "0 14px 34px rgba(15, 23, 42, 0.05)",
  },
  faqBox: {
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: 22,
    padding: 22,
  },
  referencesBox: {
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: 22,
    padding: 22,
    color: "#334155",
    lineHeight: 1.65,
  },
  detail: {
    borderTop: "1px solid #e2e8f0",
    padding: "12px 0",
    color: "#334155",
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
