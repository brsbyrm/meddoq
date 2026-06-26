"use client";

import { useMemo, useState } from "react";

const factors = [
  { id: "dvtSigns", label: "Clinical signs of DVT", points: 3 },
  { id: "peLikely", label: "PE is the most likely diagnosis", points: 3 },
  { id: "heartRate", label: "Heart rate >100 bpm", points: 1.5 },
  { id: "immobilization", label: "Immobilization ≥3 days or surgery within 4 weeks", points: 1.5 },
  { id: "previousVTE", label: "Previous DVT or PE", points: 1.5 },
  { id: "hemoptysis", label: "Hemoptysis", points: 1 },
  { id: "malignancy", label: "Malignancy", points: 1 },
];

export default function Page() {
  const [selected, setSelected] = useState({});

  const score = useMemo(
    () => factors.reduce((sum, f) => sum + (selected[f.id] ? f.points : 0), 0),
    [selected]
  );

  const likely = score > 4;

  return (
    <main style={styles.main}>
      <a href="/" style={styles.back}>← Back to Meddoq</a>

      <section style={styles.hero}>
        <p style={styles.kicker}>Vascular Calculator</p>
        <h1>Wells PE Score Calculator</h1>
        <p>Estimate clinical probability of pulmonary embolism using the Wells criteria.</p>
      </section>

      <section style={styles.card}>
        <div style={styles.grid}>
          {factors.map((factor) => (
            <label key={factor.id} style={styles.factor}>
              <input
                type="checkbox"
                checked={!!selected[factor.id]}
                onChange={(e) =>
                  setSelected((prev) => ({ ...prev, [factor.id]: e.target.checked }))
                }
              />
              <span>{factor.label}</span>
              <b>+{factor.points}</b>
            </label>
          ))}
        </div>

        <div style={styles.result}>
          <span>Wells PE Score</span>
          <strong>{score.toFixed(1)}</strong>
          <p><b>{likely ? "PE likely" : "PE unlikely"}</b></p>
          <p>
            {likely
              ? "Score >4 suggests PE is likely. Further diagnostic evaluation is usually required."
              : "Score ≤4 suggests PE is unlikely. D-dimer strategy may be considered depending on clinical context."}
          </p>
        </div>
      </section>

      <section style={styles.content}>
        <h2>Clinical use</h2>
        <p>
          The Wells PE Score estimates pretest probability of pulmonary embolism and can support
          diagnostic pathway selection.
        </p>

        <h2>Limitations</h2>
        <p>
          This score should not replace clinical judgment, imaging decisions or emergency evaluation
          in unstable patients.
        </p>

        <h2>References</h2>
        <p>Wells PS et al. Ann Intern Med. 2001.</p>
      </section>
    </main>
  );
}

const styles = {
  main: { maxWidth: 980, margin: "0 auto", padding: 24, fontFamily: "Inter, system-ui, sans-serif", color: "#0f172a" },
  back: { color: "#2563eb", fontWeight: 800, textDecoration: "none" },
  hero: { marginTop: 32, background: "linear-gradient(135deg,#ffffff,#eff6ff)", border: "1px solid #dbeafe", borderRadius: 28, padding: "clamp(26px,5vw,46px)", boxShadow: "0 24px 70px rgba(15,23,42,0.08)" },
  kicker: { color: "#2563eb", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.12em", fontSize: 12 },
  card: { marginTop: 24, background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: 24, padding: 24, boxShadow: "0 20px 60px rgba(15,23,42,0.08)" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))", gap: 12 },
  factor: { display: "grid", gridTemplateColumns: "24px 1fr auto", gap: 12, alignItems: "center", background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 16, padding: 14, cursor: "pointer", fontWeight: 750 },
  result: { marginTop: 24, background: "linear-gradient(135deg,#eff6ff,#ffffff)", border: "1px solid #bfdbfe", borderRadius: 20, padding: 22 },
  content: { marginTop: 32, lineHeight: 1.7, fontSize: 17 },
};
