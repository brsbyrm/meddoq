"use client";

import { useMemo, useState } from "react";
import CalculatorShell from "../../components/calculators/CalculatorShell";
import CalculatorPanel from "../../components/calculators/CalculatorPanel";
import CalculatorResult from "../../components/calculators/CalculatorResult";
import CalculatorReferencePage from "../../components/calculators/CalculatorReferencePage";

const items = [
  { id: "veryHighRiskCancer", label: "Very high-risk cancer site: stomach or pancreas", points: 2 },
  { id: "highRiskCancer", label: "High-risk cancer site: lung, lymphoma, gynecologic, bladder, or testicular", points: 1 },
  { id: "platelets", label: "Platelet count ≥350 × 10⁹/L", points: 1 },
  { id: "hemoglobin", label: "Hemoglobin <10 g/dL or use of erythropoiesis-stimulating agent", points: 1 },
  { id: "leukocytes", label: "Leukocyte count >11 × 10⁹/L", points: 1 },
  { id: "bmi", label: "BMI ≥35 kg/m²", points: 1 },
];

const content = {
  interpretation: {
    clinicalMeaning:
      "The Khorana score estimates venous thromboembolism risk in ambulatory cancer patients starting systemic chemotherapy.",
    severity:
      "A score of 0 is low risk, 1–2 is intermediate risk, and ≥3 is high risk for cancer-associated thrombosis.",
    nextStep:
      "Use the result with bleeding risk, cancer type, chemotherapy plan, renal function, platelet count, drug interactions, and oncology/hematology guidance.",
  },
  notes: {
    pearls: [
      "Cancer site is heavily weighted; stomach and pancreatic cancers score 2 points.",
      "The score is most relevant for ambulatory patients starting chemotherapy.",
      "High VTE risk does not automatically mean anticoagulation is appropriate.",
    ],
    pitfalls: [
      "Using the score in hospitalized or postoperative patients outside its intended setting.",
      "Ignoring bleeding risk, thrombocytopenia, renal failure, or drug interactions.",
      "Counting both very high-risk and high-risk cancer site categories at the same time.",
    ],
  },
  faq: [
    {
      question: "What Khorana score is considered high risk?",
      answer: "A Khorana score of 3 or more is generally considered high risk for cancer-associated VTE.",
    },
    {
      question: "Can the Khorana score decide anticoagulation by itself?",
      answer: "No. It supports risk stratification. Anticoagulation decisions require bleeding risk, cancer type, renal function, platelet count, medications, and shared decision-making.",
    },
  ],
  references: [
    "Khorana AA et al. Blood. 2008.",
    "Key NS et al. ASCO guideline update. J Clin Oncol. 2020.",
  ],
  related: ["IMPROVE VTE Score", "IMPROVE Bleeding Risk", "Padua Score", "Caprini Score"],
};

export default function KhoranaScorePage() {
  const [checked, setChecked] = useState({});

  const score = useMemo(() => {
    let total = 0;

    if (checked.veryHighRiskCancer) {
      total += 2;
    } else if (checked.highRiskCancer) {
      total += 1;
    }

    for (const item of items) {
      if (item.id === "veryHighRiskCancer" || item.id === "highRiskCancer") continue;
      if (checked[item.id]) total += item.points;
    }

    return total;
  }, [checked]);

  const risk = useMemo(() => {
    if (score >= 3) {
      return {
        label: "High VTE risk",
        tone: "red",
        interpretation:
          "This score suggests high risk of cancer-associated thrombosis in an ambulatory patient starting systemic therapy.",
        recommendation:
          "Consider thromboprophylaxis only after reviewing bleeding risk, platelet count, renal function, drug interactions, cancer type, and oncology/hematology guidance.",
      };
    }

    if (score >= 1) {
      return {
        label: "Intermediate VTE risk",
        tone: "amber",
        interpretation:
          "This score suggests intermediate risk of cancer-associated thrombosis.",
        recommendation:
          "Review clinical VTE risk factors, bleeding risk, treatment plan, and reassess if cancer status or laboratory values change.",
      };
    }

    return {
      label: "Low VTE risk",
      tone: "green",
      interpretation:
        "This score suggests lower predicted cancer-associated VTE risk.",
      recommendation:
        "Routine prophylaxis is usually not indicated solely by this score; continue clinical surveillance and reassessment.",
    };
  }, [score]);

  function toggle(id) {
    setChecked((previous) => {
      const next = { ...previous, [id]: !previous[id] };

      if (id === "veryHighRiskCancer" && next.veryHighRiskCancer) {
        next.highRiskCancer = false;
      }

      if (id === "highRiskCancer" && next.highRiskCancer) {
        next.veryHighRiskCancer = false;
      }

      return next;
    });
  }

  return (
    <CalculatorShell
      category="Oncology / VTE Risk"
      title="Khorana Score Calculator"
      description="Estimate venous thromboembolism risk in ambulatory cancer patients starting chemotherapy."
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
          title="Khorana Score"
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
