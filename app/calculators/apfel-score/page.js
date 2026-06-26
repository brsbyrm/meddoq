"use client";

import { useMemo, useState } from "react";

const factors = [
  { id: "female", label: "Female sex", points: 1 },
  { id: "nonSmoker", label: "Non-smoker", points: 1 },
  { id: "history", label: "History of PONV or motion sickness", points: 1 },
  { id: "opioids", label: "Postoperative opioid use expected", points: 1 },
];

function risk(score) {
  if (score === 0) return "Approximately 10% risk";
  if (score === 1) return "Approximately 20% risk";
  if (score === 2) return "Approximately 40% risk";
  if (score === 3) return "Approximately 60% risk";
  return "Approximately 80% risk";
}

export default function Page() {
  const [selected, setSelected] = useState({});

  const score = useMemo(
    () => factors.reduce((sum, f) => sum + (selected[f.id] ? f.points : 0), 0),
    [selected]
  );

  return (
    <main style={styles.main}>
      <a href="/" style={styles.back}>← Back to Meddoq</a>

      <section style={styles.hero}>
        <p style={styles.kicker}>Perioperative Calculator</p>
        <h1>Apfel Score Calculator</h1>
        <p>Estimate risk of postoperative nausea and vomiting using the simplified Apfel score.</p>
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
              <b>+1</b>
            </label>
          ))}
        </div>

        <div style={styles.result}>
          <span>Apfel Score</span>
          <strong>{score}</strong>
          <p><b>{risk(score)}</b></p>
          <p>Higher scores indicate higher PONV risk and may support multimodal antiemetic prophylaxis.</p>
        </div>
      </section>

      <section style={styles.content}>
        <h2>Clinical use</h2>
        <p>
          The simplified Apfel score estimates postoperative nausea and vomiting risk using four common clinical predictors.
        </p>

        <h2>Interpretation</h2>
        <p>
          The estimated risk increases with each additional risk factor. Prophylaxis should be individualized according to procedure, anaesthetic plan and patient risk.
        </p>

        <h2>References</h2>
        <p>Apfel CC et al. Anesthesiology. 1999.</p>
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
