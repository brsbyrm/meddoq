"use client";

import { useMemo, useState } from "react";


function n(value) {
  if (value === null || value === undefined) return 0;
  const normalized = String(value).replace(/,/g, ".");
  const parsed = parseFloat(normalized);
  return Number.isFinite(parsed) ? parsed : 0;
}


const symptoms = [
  { id: "pain", label: "Pain" },
  { id: "cramps", label: "Cramps" },
  { id: "heaviness", label: "Heaviness" },
  { id: "paresthesia", label: "Paresthesia" },
  { id: "pruritus", label: "Pruritus" },
];

const signs = [
  { id: "pretibialEdema", label: "Pretibial edema" },
  { id: "skinInduration", label: "Skin induration" },
  { id: "hyperpigmentation", label: "Hyperpigmentation" },
  { id: "redness", label: "Redness" },
  { id: "venousEctasia", label: "Venous ectasia" },
  { id: "calfCompressionPain", label: "Pain on calf compression" },
];

function interpretation(score, ulcer) {
  if (ulcer) return "Severe post-thrombotic syndrome";
  if (score < 5) return "No post-thrombotic syndrome";
  if (score <= 9) return "Mild post-thrombotic syndrome";
  if (score <= 14) return "Moderate post-thrombotic syndrome";
  return "Severe post-thrombotic syndrome";
}

export default function Page() {
  const [values, setValues] = useState({});
  const [ulcer, setUlcer] = useState(false);

  const score = useMemo(() => {
    return [...symptoms, ...signs].reduce(
      (sum, item) => sum + n(values[item.id] || 0),
      0
    );
  }, [values]);

  return (
    <main style={styles.main}>
      <a href="/" style={styles.back}>← Back to Meddoq</a>

      <section style={styles.hero}>
        <p style={styles.kicker}>Vascular Calculator</p>
        <h1>Villalta Score Calculator</h1>
        <p>Assess post-thrombotic syndrome severity after deep vein thrombosis.</p>
      </section>

      <section style={styles.card}>
        <h2>Symptoms</h2>
        <div style={styles.grid}>
          {symptoms.map((item) => (
            <label key={item.id} style={styles.label}>
              {item.label}
              <select
                style={styles.input}
                value={values[item.id] || 0}
                onChange={(e) =>
                  setValues((prev) => ({ ...prev, [item.id]: e.target.value }))
                }
              >
                <option value="0">0 — Absent</option>
                <option value="1">1 — Mild</option>
                <option value="2">2 — Moderate</option>
                <option value="3">3 — Severe</option>
              </select>
            </label>
          ))}
        </div>

        <h2 style={{ marginTop: 28 }}>Clinical signs</h2>
        <div style={styles.grid}>
          {signs.map((item) => (
            <label key={item.id} style={styles.label}>
              {item.label}
              <select
                style={styles.input}
                value={values[item.id] || 0}
                onChange={(e) =>
                  setValues((prev) => ({ ...prev, [item.id]: e.target.value }))
                }
              >
                <option value="0">0 — Absent</option>
                <option value="1">1 — Mild</option>
                <option value="2">2 — Moderate</option>
                <option value="3">3 — Severe</option>
              </select>
            </label>
          ))}
        </div>

        <label style={styles.checkbox}>
          <input
            type="checkbox"
            checked={ulcer}
            onChange={(e) => setUlcer(e.target.checked)}
          />
          Venous ulcer present
        </label>

        <div style={styles.result}>
          <span>Villalta Score</span>
          <strong>{score}</strong>
          <p><b>{interpretation(score, ulcer)}</b></p>
          <p>
            Score ≥5 indicates post-thrombotic syndrome. Venous ulcer indicates severe disease.
          </p>
          <p><b>Clinical meaning:</b></p>
          <ul>
            <li><b>Mild PTS:</b> Symptoms are present but signs are limited; daily function may be only mildly affected.</li>
            <li><b>Moderate PTS:</b> Symptoms and signs are more persistent; chronic venous morbidity is clinically relevant.</li>
            <li><b>Severe PTS:</b> High symptom/sign burden or venous ulcer; specialist venous evaluation is usually appropriate.</li>
          </ul>
          <p><b>Next step:</b> Assess compression adherence, venous obstruction/reflux, ulcer care needs and follow-up trend over time.</p>
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

      <section style={styles.content}>
        <h2>Clinical use</h2>
        <p>
          The Villalta Score is used to diagnose and grade post-thrombotic syndrome after DVT.
        </p>

        <h2>Interpretation</h2>
        <p>
          Total score below 5 suggests no PTS; 5–9 mild, 10–14 moderate, and ≥15 or venous ulcer severe PTS.
        </p>

        <h2>References</h2>
        <p>Villalta S et al. Haemostasis. 1994. Kahn SR et al. J Thromb Haemost. 2009.</p>
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
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))", gap: 16 },
  label: { display: "grid", gap: 8, fontWeight: 800, color: "#334155" },
  input: { padding: "14px 16px", borderRadius: 14, border: "1px solid #cbd5e1", fontSize: 15, background: "#fff" },
  checkbox: { marginTop: 22, display: "flex", gap: 10, alignItems: "center", fontWeight: 800 },
  result: { marginTop: 24, background: "linear-gradient(135deg,#eff6ff,#ffffff)", border: "1px solid #bfdbfe", borderRadius: 20, padding: 22 },
  content: { marginTop: 32, lineHeight: 1.7, fontSize: 17 },
};
