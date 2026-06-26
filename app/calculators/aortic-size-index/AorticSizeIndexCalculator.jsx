"use client";

import { useMemo, useState } from "react";

export default function AorticSizeIndexCalculator() {
  const [diameter, setDiameter] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");

  const bsa = useMemo(() => {
    if (!height || !weight) return "";
    return Math.sqrt((Number(height) * Number(weight)) / 3600).toFixed(2);
  }, [height, weight]);

  const asi = useMemo(() => {
    if (!diameter || !bsa) return "";
    return (Number(diameter) / Number(bsa)).toFixed(2);
  }, [diameter, bsa]);

  return (
    <div style={styles.card}>
      <h2>Aortic Size Index Calculator</h2>

      <div style={styles.grid}>
        <label style={styles.label}>
          Aortic diameter (cm)
          <input style={styles.input} value={diameter} onChange={(e) => setDiameter(e.target.value)} placeholder="4.5" inputMode="decimal" />
        </label>

        <label style={styles.label}>
          Height (cm)
          <input style={styles.input} value={height} onChange={(e) => setHeight(e.target.value)} placeholder="183" inputMode="decimal" />
        </label>

        <label style={styles.label}>
          Weight (kg)
          <input style={styles.input} value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="80" inputMode="decimal" />
        </label>
      </div>

      {bsa && <p style={styles.inline}>Calculated BSA: <strong>{bsa} m²</strong></p>}

      {asi && (
        <div style={styles.result}>
          <span>Aortic Size Index</span>
          <strong>{asi} cm/m²</strong>
          <p>Interpret together with absolute aortic diameter, growth rate, symptoms, valve morphology, family history and guideline thresholds.</p>
        </div>
      )}
    </div>
  );
}

const styles = {
  card: {
    background: "white",
    border: "1px solid #e2e8f0",
    borderRadius: 24,
    padding: 24,
    boxShadow: "0 20px 60px rgba(15,23,42,0.08)",
    marginTop: 24,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))",
    gap: 16,
  },
  label: {
    display: "grid",
    gap: 8,
    fontWeight: 800,
    color: "#334155",
  },
  input: {
    padding: "14px 16px",
    borderRadius: 14,
    border: "1px solid #cbd5e1",
    fontSize: 16,
  },
  inline: {
    background: "#eff6ff",
    border: "1px solid #bfdbfe",
    borderRadius: 14,
    padding: 14,
    color: "#1e3a8a",
    fontWeight: 700,
  },
  result: {
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
    borderRadius: 18,
    padding: 20,
    marginTop: 20,
  },
};
