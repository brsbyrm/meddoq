"use client";

import { useMemo, useState } from "react";

const factors = [
  { id: "age4160", label: "Age 41–60 years", points: 1 },
  { id: "age6174", label: "Age 61–74 years", points: 2 },
  { id: "age75", label: "Age ≥75 years", points: 3 },
  { id: "minorSurgery", label: "Minor surgery planned", points: 1 },
  { id: "majorSurgery", label: "Major surgery >45 minutes", points: 2 },
  { id: "bmi25", label: "BMI >25 kg/m²", points: 1 },
  { id: "swollenLegs", label: "Swollen legs", points: 1 },
  { id: "varicoseVeins", label: "Varicose veins", points: 1 },
  { id: "sepsis", label: "Sepsis within 1 month", points: 1 },
  { id: "lungDisease", label: "Serious lung disease / abnormal pulmonary function", points: 1 },
  { id: "mi", label: "Acute myocardial infarction", points: 1 },
  { id: "chf", label: "Congestive heart failure within 1 month", points: 1 },
  { id: "ibd", label: "Inflammatory bowel disease", points: 1 },
  { id: "bedrest", label: "Bed rest / restricted mobility", points: 1 },
  { id: "centralLine", label: "Central venous access", points: 2 },
  { id: "cancer", label: "Current or previous malignancy", points: 2 },
  { id: "laparoscopy", label: "Laparoscopic surgery >45 minutes", points: 2 },
  { id: "immobilizingCast", label: "Immobilizing plaster cast", points: 2 },
  { id: "priorVTE", label: "History of DVT/PE", points: 3 },
  { id: "familyVTE", label: "Family history of thrombosis", points: 3 },
  { id: "factorV", label: "Factor V Leiden", points: 3 },
  { id: "prothrombin", label: "Prothrombin 20210A mutation", points: 3 },
  { id: "lupus", label: "Lupus anticoagulant / antiphospholipid antibodies", points: 3 },
  { id: "stroke", label: "Stroke within 1 month", points: 5 },
  { id: "arthroplasty", label: "Elective major lower extremity arthroplasty", points: 5 },
  { id: "hipPelvisLegFracture", label: "Hip, pelvis or leg fracture", points: 5 },
  { id: "spinalCord", label: "Acute spinal cord injury", points: 5 },
];

function category(score) {
  if (score <= 1) return "Very low risk";
  if (score === 2) return "Low risk";
  if (score <= 4) return "Moderate risk";
  return "High risk";
}

function recommendation(score) {
  if (score <= 1) return "Early ambulation is usually sufficient when clinically appropriate.";
  if (score === 2) return "Mechanical prophylaxis may be considered according to local protocol.";
  if (score <= 4) return "Mechanical and/or pharmacologic prophylaxis should be considered if bleeding risk is acceptable.";
  return "High VTE risk: combined mechanical and pharmacologic prophylaxis is commonly considered unless contraindicated.";
}

export default function CapriniCalculator() {
  const [selected, setSelected] = useState({});

  const score = useMemo(
    () => factors.reduce((sum, f) => sum + (selected[f.id] ? f.points : 0), 0),
    [selected]
  );

  return (
    <section style={styles.card}>
      <div style={styles.grid}>
        {factors.map((f) => (
          <label key={f.id} style={styles.factor}>
            <input
              type="checkbox"
              checked={!!selected[f.id]}
              onChange={(e) =>
                setSelected((prev) => ({ ...prev, [f.id]: e.target.checked }))
              }
            />
            <span>{f.label}</span>
            <strong>+{f.points}</strong>
          </label>
        ))}
      </div>

      <div style={styles.result}>
        <span>Caprini Score</span>
        <strong>{score}</strong>
        <p>{category(score)}</p>
        <p>{recommendation(score)}</p>
      </div>
    </section>
  );
}

const styles = {
  card: {
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: 24,
    padding: 24,
    boxShadow: "0 20px 60px rgba(15,23,42,0.08)",
    marginTop: 24,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
    gap: 12,
  },
  factor: {
    display: "grid",
    gridTemplateColumns: "24px 1fr auto",
    alignItems: "center",
    gap: 10,
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
    borderRadius: 16,
    padding: 14,
    fontWeight: 700,
  },
  result: {
    marginTop: 24,
    background: "linear-gradient(135deg, #eff6ff, #ffffff)",
    border: "1px solid #bfdbfe",
    borderRadius: 20,
    padding: 22,
  },
};
