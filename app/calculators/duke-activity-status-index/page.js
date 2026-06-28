"use client";

import { useMemo, useState } from "react";

const activities = [
  { id: "selfCare", label: "Take care of yourself: eating, dressing, bathing or using the toilet", points: 2.75 },
  { id: "indoorWalk", label: "Walk indoors around the house", points: 1.75 },
  { id: "blockWalk", label: "Walk 1–2 blocks on level ground", points: 2.75 },
  { id: "stairs", label: "Climb a flight of stairs or walk up a hill", points: 5.50 },
  { id: "runShort", label: "Run a short distance", points: 8.00 },
  { id: "lightHousework", label: "Do light housework such as dusting or washing dishes", points: 2.70 },
  { id: "moderateHousework", label: "Do moderate housework such as vacuuming or carrying groceries", points: 3.50 },
  { id: "heavyHousework", label: "Do heavy housework such as scrubbing floors or moving furniture", points: 8.00 },
  { id: "yardwork", label: "Do yardwork such as raking leaves or weeding", points: 4.50 },
  { id: "sexual", label: "Have sexual relations", points: 5.25 },
  { id: "moderateRecreation", label: "Participate in moderate recreation such as golf, bowling or dancing", points: 6.00 },
  { id: "strenuousSports", label: "Participate in strenuous sports such as swimming, tennis, football or skiing", points: 7.50 },
];

export default function Page() {
  const [selected, setSelected] = useState({});

  const score = useMemo(
    () => activities.reduce((sum, a) => sum + (selected[a.id] ? a.points : 0), 0),
    [selected]
  );

  const mets = useMemo(() => ((0.43 * score) + 9.6) / 3.5, [score]);
  const lowCapacity = mets < 4;

  return (
    <main style={styles.main}>
      <a href="/" style={styles.back}>← Back to Meddoq</a>

      <section style={styles.hero}>
        <p style={styles.kicker}>Perioperative Calculator</p>
        <h1>Duke Activity Status Index Calculator</h1>
        <p>Estimate functional capacity using the Duke Activity Status Index.</p>
      </section>

      <section style={styles.card}>
        <div style={styles.grid}>
          {activities.map((item) => (
            <label key={item.id} style={styles.factor}>
              <input
                type="checkbox"
                checked={!!selected[item.id]}
                onChange={(e) =>
                  setSelected((prev) => ({ ...prev, [item.id]: e.target.checked }))
                }
              />
              <span>{item.label}</span>
              <b>+{item.points}</b>
            </label>
          ))}
        </div>

        <div style={styles.result}>
          <span>DASI Score</span>
          <strong>{score.toFixed(2)}</strong>
          <p><b>Estimated METs: {mets.toFixed(1)}</b></p>
          <p>
            {lowCapacity
              ? "Estimated functional capacity is below 4 METs. Consider this in perioperative cardiac risk assessment."
              : "Estimated functional capacity is at least 4 METs. Interpret with symptoms and surgical risk."}
          </p>
        </div>
      </section>


      <section style={styles.related}>
        <h2>Related calculators</h2>
        <div style={styles.relatedGrid}>
          <a href="/calculators/egfr" style={styles.relatedLink}>eGFR</a>
          <a href="/calculators/creatinine-clearance" style={styles.relatedLink}>Creatinine Clearance</a>
          <a href="/calculators/body-surface-area" style={styles.relatedLink}>Body Surface Area</a>
          <a href="/calculators/body-mass-index" style={styles.relatedLink}>BMI</a>
        </div>
      </section>


      <section style={styles.faq}>
        <h2>Frequently asked questions</h2>

        <details style={styles.faqItem}>
          <summary>Can this calculator replace clinical judgment?</summary>
          <p>No. The result should be interpreted with patient-specific findings, current guidelines and local protocols.</p>
        </details>

        <details style={styles.faqItem}>
          <summary>When should the result be used cautiously?</summary>
          <p>Use caution in unstable patients, acute illness, unusual physiology, missing data or when the score was not validated for the clinical setting.</p>
        </details>

        <details style={styles.faqItem}>
          <summary>What should be checked after calculating the score?</summary>
          <p>Review the clinical context, contraindications, trend over time, relevant imaging or laboratory data and whether specialist input is needed.</p>
        </details>
      </section>


      <section style={styles.pearlBox}>
        <h2>Clinical interpretation</h2>
        <p>
          Use the calculated result as a structured clinical aid. Confirm that the input values are accurate,
          apply the result only to the intended patient population, and combine it with examination findings,
          imaging, laboratory trends and guideline-based decision-making.
        </p>
      </section>

      <section style={styles.content}>
        <h2>Clinical use</h2>
        <p>
          DASI estimates functional capacity from daily activities and can support perioperative
          cardiovascular assessment before non-cardiac surgery.
        </p>

        <h2>Interpretation</h2>
        <p>
          Lower estimated METs may indicate limited functional capacity. Results should be interpreted
          with symptoms, ECG, comorbidities and surgical urgency.
        </p>

        <h2>References</h2>
        <p>Hlatky MA et al. Am J Cardiol. 1989.</p>
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
