"use client";

import { useMemo, useState } from "react";

const factors = [
  { id: "highRiskSurgery", label: "High-risk surgery", detail: "Intraperitoneal, intrathoracic or suprainguinal vascular surgery" },
  { id: "ischemicHeartDisease", label: "History of ischemic heart disease", detail: "MI, positive stress test, angina, nitrate use or pathological Q waves" },
  { id: "heartFailure", label: "History of congestive heart failure", detail: "Clinical heart failure, pulmonary edema or reduced cardiac function" },
  { id: "cerebrovascularDisease", label: "History of cerebrovascular disease", detail: "Stroke or transient ischemic attack" },
  { id: "insulinDiabetes", label: "Diabetes requiring insulin therapy", detail: "Preoperative insulin treatment" },
  { id: "creatinine", label: "Serum creatinine >2.0 mg/dL", detail: "Creatinine above 2.0 mg/dL or 177 µmol/L" },
];

function riskText(score) {
  if (score === 0) return { group: "Class I", risk: "Low risk", note: "Estimated major cardiac complication risk is low." };
  if (score === 1) return { group: "Class II", risk: "Intermediate risk", note: "Estimated cardiac risk is increased; optimize clinical factors." };
  if (score === 2) return { group: "Class III", risk: "Elevated risk", note: "Consider perioperative cardiac risk review and optimization." };
  return { group: "Class IV", risk: "High risk", note: "High perioperative cardiac risk; consider specialist assessment and optimization." };
}

export default function Page() {
  const [selected, setSelected] = useState({});

  const score = useMemo(
    () => factors.reduce((sum, f) => sum + (selected[f.id] ? 1 : 0), 0),
    [selected]
  );

  const result = riskText(score);

  return (
    <main style={styles.main}>
      <a href="/" style={styles.back}>← Back to Meddoq</a>

      <section style={styles.hero}>
        <p style={styles.kicker}>Perioperative Calculator</p>
        <h1>Revised Cardiac Risk Index Calculator</h1>
        <p>
          Estimate perioperative cardiac risk before non-cardiac surgery using the Lee Revised Cardiac Risk Index.
        </p>
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
              <div>
                <strong>{factor.label}</strong>
                <span>{factor.detail}</span>
              </div>
              <b>+1</b>
            </label>
          ))}
        </div>

        <div style={styles.result}>
          <span>RCRI Score</span>
          <strong>{score}</strong>
          <p><b>{result.group}</b> — {result.risk}</p>
          <p>{result.note}</p>
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
          The Revised Cardiac Risk Index is used to estimate the risk of major cardiac complications
          before non-cardiac surgery. It should be interpreted with functional capacity, urgency of
          surgery, ECG findings, symptoms and current guideline recommendations.
        </p>

        <h2>Risk factors</h2>
        <p>
          The score assigns one point each for high-risk surgery, ischemic heart disease, heart failure,
          cerebrovascular disease, insulin-treated diabetes and creatinine greater than 2.0 mg/dL.
        </p>

        <h2>Limitations</h2>
        <p>
          RCRI does not replace clinical judgment. It may underestimate risk in some vascular surgery
          patients and should be combined with patient-specific assessment.
        </p>

        <h2>References</h2>
        <p>
          Lee TH et al. Circulation. 1999. ACC/AHA guideline framework for perioperative cardiovascular evaluation.
        </p>
      </section>
    </main>
  );
}

const styles = {
  main: {
    maxWidth: 980,
    margin: "0 auto",
    padding: 24,
    fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    color: "#0f172a",
  },
  back: {
    color: "#2563eb",
    fontWeight: 800,
    textDecoration: "none",
  },
  hero: {
    marginTop: 32,
    background: "linear-gradient(135deg,#ffffff,#eff6ff)",
    border: "1px solid #dbeafe",
    borderRadius: 28,
    padding: "clamp(26px,5vw,46px)",
    boxShadow: "0 24px 70px rgba(15,23,42,0.08)",
  },
  kicker: {
    color: "#2563eb",
    fontWeight: 900,
    textTransform: "uppercase",
    letterSpacing: "0.12em",
    fontSize: 12,
  },
  card: {
    marginTop: 24,
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: 24,
    padding: 24,
    boxShadow: "0 20px 60px rgba(15,23,42,0.08)",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
    gap: 12,
  },
  factor: {
    display: "grid",
    gridTemplateColumns: "24px 1fr auto",
    gap: 12,
    alignItems: "center",
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
    borderRadius: 16,
    padding: 14,
    cursor: "pointer",
  },
  result:{marginTop:24,background:"linear-gradient(135deg,#f8fafc,#eff6ff)",border:"1px solid #bfdbfe",borderRadius:22,padding:24,display:"grid",gap:10,lineHeight:1.45,boxShadow:"0 18px 50px rgba(15,23,42,0.08)"},

  content: {
    marginTop: 32,
    lineHeight: 1.7,
    fontSize: 17,
  },
};

