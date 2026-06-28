"use client";

import { useMemo, useState } from "react";

const factors = [
  { id: "activeCancer", label: "Active cancer", points: 3 },
  { id: "previousVTE", label: "Previous VTE", points: 3 },
  { id: "reducedMobility", label: "Reduced mobility", points: 3 },
  { id: "thrombophilia", label: "Known thrombophilic condition", points: 3 },
  { id: "recentTraumaSurgery", label: "Recent trauma and/or surgery ≤1 month", points: 2 },
  { id: "age70", label: "Age ≥70 years", points: 1 },
  { id: "heartRespFailure", label: "Heart and/or respiratory failure", points: 1 },
  { id: "miStroke", label: "Acute myocardial infarction or ischemic stroke", points: 1 },
  { id: "infectionRheum", label: "Acute infection and/or rheumatologic disorder", points: 1 },
  { id: "bmi30", label: "BMI ≥30 kg/m²", points: 1 },
  { id: "hormonal", label: "Ongoing hormonal treatment", points: 1 },
];

export default function Page() {
  const [selected, setSelected] = useState({});

  const score = useMemo(
    () => factors.reduce((sum, f) => sum + (selected[f.id] ? f.points : 0), 0),
    [selected]
  );

  const highRisk = score >= 4;

  return (
    <main style={styles.main}>
      <a href="/" style={styles.back}>← Back to Meddoq</a>

      <section style={styles.hero}>
        <p style={styles.kicker}>Perioperative Calculator</p>
        <h1>Padua Prediction Score</h1>
        <p>Estimate venous thromboembolism risk in hospitalized medical patients.</p>
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
          <span>Padua Score</span>
          <strong>{score}</strong>
          <p><b>{highRisk ? "High VTE risk" : "Low VTE risk"}</b></p>
          <p>
            {highRisk
              ? "Score ≥4 suggests high VTE risk. Pharmacologic prophylaxis should be considered if bleeding risk is acceptable."
              : "Score <4 suggests lower VTE risk. Early mobilization and clinical reassessment are appropriate."}
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


      <section style={styles.safetyNotice}>
        <strong>Medical disclaimer</strong>
        <p>
          Meddoq calculators are intended for healthcare professionals. Results are educational
          and decision-support aids only. They do not replace clinical judgment, patient-specific
          assessment, emergency evaluation or institutional protocols.
        </p>
      </section>

      <section style={styles.content}>
        <h2>Clinical use</h2>
        <p>
          The Padua Prediction Score is used for venous thromboembolism risk assessment in
          hospitalized medical patients.
        </p>

        <h2>Interpretation</h2>
        <p>
          A score of 4 or more identifies patients at increased risk of VTE. Prophylaxis decisions
          should also consider bleeding risk, renal function, mobility and local protocols.
        </p>

        <h2>References</h2>
        <p>Barbar S et al. J Thromb Haemost. 2010.</p>
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
