"use client";

import { useMemo, useState } from "react";
import CalculatorShell from "../../components/calculators/CalculatorShell";
import CalculatorPanel from "../../components/calculators/CalculatorPanel";
import CalculatorResult from "../../components/calculators/CalculatorResult";
import CalculatorReferencePage from "../../components/calculators/CalculatorReferencePage";

const items = [
  { id: "heartFailure", label: "Congestive heart failure / LV dysfunction", points: 1 },
  { id: "hypertension", label: "Hypertension", points: 1 },
  { id: "age75", label: "Age ≥75 years", points: 2 },
  { id: "diabetes", label: "Diabetes mellitus", points: 1 },
  { id: "stroke", label: "Prior stroke / TIA / thromboembolism", points: 2 },
  { id: "vascular", label: "Vascular disease", points: 1 },
  { id: "age65", label: "Age 65–74 years", points: 1 },
  { id: "female", label: "Female sex", points: 1 },
];

const content = {
  interpretation: {
    clinicalMeaning:
      "CHA₂DS₂-VASc estimates thromboembolic risk in patients with non-valvular atrial fibrillation.",
    severity:
      "Higher scores indicate higher annual stroke risk. Age ≥75 and prior stroke/TIA each contribute 2 points.",
    nextStep:
      "Use with bleeding risk, patient preference, AF pattern, renal function, drug interactions, frailty, and current anticoagulation guidelines.",
  },
  notes: {
    pearls: [
      "Female sex is a risk modifier and should be interpreted with the overall clinical profile.",
      "Prior stroke, TIA, or systemic embolism is a major risk factor and adds 2 points.",
      "The score supports anticoagulation discussion but does not replace individualized decision-making.",
    ],
    pitfalls: [
      "Using the score outside atrial fibrillation risk assessment.",
      "Ignoring bleeding risk, renal function, adherence, drug interactions, or patient values.",
      "Treating female sex alone as a stand-alone indication for anticoagulation.",
    ],
  },
  faq: [
    {
      question: "What does CHA₂DS₂-VASc estimate?",
      answer:
        "It estimates thromboembolic risk in atrial fibrillation and supports anticoagulation decision-making.",
    },
    {
      question: "Does a low score always mean no anticoagulation?",
      answer:
        "No. Decisions should also consider clinical context, patient preference, rhythm burden, bleeding risk, and guideline recommendations.",
    },
  ],
  references: [
    "Lip GYH et al. Chest. 2010.",
    "Hindricks G et al. ESC Guidelines for atrial fibrillation.",
    "January CT et al. AHA/ACC/HRS Guideline for atrial fibrillation.",
  ],
  related: ["HAS-BLED", "ATRIA Bleeding", "HEMORR₂HAGES"],
};

export default function Cha2ds2VascPage() {
  const [checked, setChecked] = useState({});

  const score = useMemo(() => {
    return items.reduce((sum, item) => sum + (checked[item.id] ? item.points : 0), 0);
  }, [checked]);

  const risk = useMemo(() => {
    if (score >= 4) {
      return {
        tone: "red",
        label: "High thromboembolic risk",
        interpretation:
          "This CHA₂DS₂-VASc score suggests high thromboembolic risk in atrial fibrillation.",
        recommendation:
          "Anticoagulation is generally favored unless bleeding risk or contraindications outweigh benefit. Apply current AF guidelines and patient-specific assessment.",
      };
    }

    if (score >= 2) {
      return {
        tone: "amber",
        label: "Elevated thromboembolic risk",
        interpretation:
          "This CHA₂DS₂-VASc score suggests clinically meaningful thromboembolic risk.",
        recommendation:
          "Discuss anticoagulation using current AF guidelines, bleeding risk assessment, renal function, patient preference, and shared decision-making.",
      };
    }

    if (score === 1) {
      return {
        tone: "blue",
        label: "Low-intermediate risk",
        interpretation:
          "CHA₂DS₂-VASc score 1 suggests low-intermediate risk; interpretation depends on which risk factor is present.",
        recommendation:
          "Individualize anticoagulation decisions. Female sex alone should not usually be treated as equivalent to other non-sex risk factors.",
      };
    }

    return {
      tone: "green",
      label: "Low measured risk",
      interpretation:
        "CHA₂DS₂-VASc score 0 suggests low measured thromboembolic risk in atrial fibrillation.",
      recommendation:
        "Anticoagulation is usually not indicated solely by this score, but clinical context and guideline updates should be considered.",
    };
  }, [score]);

  function toggle(id) {
    setChecked((previous) => ({ ...previous, [id]: !previous[id] }));
  }

  function toggleAge(id) {
    setChecked((previous) => {
      const next = { ...previous, [id]: !previous[id] };
      if (id === "age75" && next.age75) next.age65 = false;
      if (id === "age65" && next.age65) next.age75 = false;
      return next;
    });
  }

  return (
    <CalculatorShell
      category="Cardiovascular"
      title="CHA₂DS₂-VASc Score Calculator"
      description="Stroke risk stratification tool for patients with atrial fibrillation."
    >
      <CalculatorPanel>
        <div style={styles.grid}>
          {items.map((item) => (
            <label key={item.id} style={styles.option}>
              <input
                type="checkbox"
                checked={Boolean(checked[item.id])}
                onChange={() =>
                  item.id === "age75" || item.id === "age65"
                    ? toggleAge(item.id)
                    : toggle(item.id)
                }
              />
              <span>{item.label}</span>
              <strong>+{item.points}</strong>
            </label>
          ))}
        </div>

        <CalculatorResult
          title="CHA₂DS₂-VASc Score"
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
          <h2 style={styles.referenceTitle}>CHA₂DS₂-VASc Clinical Reference</h2>
          <p style={styles.referenceIntro}>
            CHA₂DS₂-VASc is used to estimate thromboembolic risk in patients with atrial fibrillation and to support structured anticoagulation discussion.
          </p>
        </div>

        <div style={styles.referenceGrid}>
          <article style={styles.referenceCard}>
            <h3>When to use</h3>
            <p>
              Use this score in patients with atrial fibrillation or atrial flutter when estimating stroke or systemic embolism risk and discussing anticoagulation strategy.
            </p>
          </article>

          <article style={styles.referenceCard}>
            <h3>How to interpret</h3>
            <p>
              Higher scores indicate higher thromboembolic risk. Age ≥75 years and prior stroke, TIA, or systemic embolism carry the greatest point weights.
            </p>
          </article>

          <article style={styles.referenceCard}>
            <h3>Clinical limitations</h3>
            <p>
              The score does not fully capture frailty, AF burden, left atrial appendage anatomy, bleeding risk, renal function, adherence, or patient preference.
            </p>
          </article>

          <article style={styles.referenceCard}>
            <h3>Next clinical step</h3>
            <p>
              Interpret together with HAS-BLED or another bleeding risk assessment, renal function, drug interactions, anticoagulant contraindications, and shared decision-making.
            </p>
          </article>
        </div>

        <div style={styles.faqBox}>
          <h3>FAQ</h3>
          <details style={styles.detail}>
            <summary>Does CHA₂DS₂-VASc diagnose atrial fibrillation?</summary>
            <p>No. It estimates thromboembolic risk after atrial fibrillation has been identified clinically or by rhythm documentation.</p>
          </details>
          <details style={styles.detail}>
            <summary>Is female sex alone enough to define high stroke risk?</summary>
            <p>No. Female sex is best treated as a risk modifier and should be interpreted with the full clinical profile.</p>
          </details>
          <details style={styles.detail}>
            <summary>Should bleeding risk be assessed separately?</summary>
            <p>Yes. Bleeding risk should be reviewed separately because CHA₂DS₂-VASc estimates thromboembolic risk, not bleeding risk.</p>
          </details>
        </div>

        <div style={styles.referencesBox}>
          <h3>References</h3>
          <ol>
            <li>Lip GYH et al. Refining clinical risk stratification for predicting stroke and thromboembolism in atrial fibrillation. Chest. 2010.</li>
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
