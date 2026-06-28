"use client";

import { useMemo, useState } from "react";


function n(value) {
  if (value === null || value === undefined) return 0;
  const normalized = String(value).replace(/,/g, ".");
  const parsed = parseFloat(normalized);
  return Number.isFinite(parsed) ? parsed : 0;
}


const functionalOptions = [
  { value: 0, label: "Independent" },
  { value: 1, label: "Partially dependent" },
  { value: 2, label: "Totally dependent" },
];

const asaOptions = [
  { value: 1, label: "ASA I" },
  { value: 2, label: "ASA II" },
  { value: 3, label: "ASA III" },
  { value: 4, label: "ASA IV" },
  { value: 5, label: "ASA V" },
];

const procedureOptions = [
  { value: 0, label: "Low-risk procedure" },
  { value: 1, label: "Intermediate-risk procedure" },
  { value: 2, label: "High-risk procedure" },
  { value: 3, label: "Vascular procedure" },
];

export default function Page() {
  const [age, setAge] = useState("");
  const [creatinine, setCreatinine] = useState("");
  const [functional, setFunctional] = useState("0");
  const [asa, setAsa] = useState("2");
  const [procedure, setProcedure] = useState("0");

  const score = useMemo(() => {
    const ageValue = n(age || 0);
    const creatValue = n(creatinine || 0);

    let value = 0;
    if (ageValue >= 65) value += 1;
    if (ageValue >= 75) value += 1;
    if (creatValue > 1.5) value += 1;
    value += n(functional);
    value += Math.max(0, n(asa) - 2);
    value += n(procedure);

    return value;
  }, [age, creatinine, functional, asa, procedure]);

  const risk = score <= 1 ? "Low estimated risk" : score <= 3 ? "Intermediate estimated risk" : "High estimated risk";

  return (
    <main style={styles.main}>
      <a href="/" style={styles.back}>← Back to Meddoq</a>

      <section style={styles.hero}>
        <p style={styles.kicker}>Perioperative Calculator</p>
        <h1>Gupta MICA Risk Calculator</h1>
        <p>Estimate perioperative myocardial infarction or cardiac arrest risk before non-cardiac surgery.</p>
      </section>

      <section style={styles.card}>
        <div style={styles.grid}>
          <label style={styles.label}>Age
            <input type="text" style={styles.input} value={age} onChange={(e) => setAge(e.target.value.replace(/,/g, "."))} inputMode="decimal" pattern="[0-9]*[.,]?[0-9]*" placeholder="70" />
          </label>

          <label style={styles.label}>Creatinine (mg/dL)
            <input type="text" style={styles.input} value={creatinine} onChange={(e) => setCreatinine(e.target.value.replace(/,/g, "."))} inputMode="decimal" pattern="[0-9]*[.,]?[0-9]*" placeholder="1.2" />
          </label>

          <label style={styles.label}>Functional status
            <select style={styles.input} value={functional} onChange={(e) => setFunctional(e.target.value.replace(/,/g, "."))}>
              {functionalOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </label>

          <label style={styles.label}>ASA class
            <select style={styles.input} value={asa} onChange={(e) => setAsa(e.target.value.replace(/,/g, "."))}>
              {asaOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </label>

          <label style={styles.label}>Procedure risk
            <select style={styles.input} value={procedure} onChange={(e) => setProcedure(e.target.value.replace(/,/g, "."))}>
              {procedureOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </label>
        </div>

        <div style={styles.result}>
          <span>Estimated Risk Category</span>
          <strong>{risk}</strong>
          <p>Risk index: {score}</p>
          <p>This simplified Meddoq implementation supports structured perioperative risk screening and does not replace full ACS NSQIP calculation.</p>
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
          The Gupta MICA model estimates risk of perioperative myocardial infarction or cardiac arrest
          after non-cardiac surgery.
        </p>

        <h2>Important limitation</h2>
        <p>
          This page provides a simplified structured risk tool. Formal ACS NSQIP MICA risk estimation
          requires the validated model variables and exact procedure coding.
        </p>

        <h2>References</h2>
        <p>Gupta PK et al. Circulation. 2011.</p>
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
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))", gap: 16 },
  label: { display: "grid", gap: 8, fontWeight: 800, color: "#334155" },
  input: { padding: "14px 16px", borderRadius: 14, border: "1px solid #cbd5e1", fontSize: 16 },
  result: { marginTop: 24, background: "linear-gradient(135deg,#eff6ff,#ffffff)", border: "1px solid #bfdbfe", borderRadius: 20, padding: 22 },
  content: { marginTop: 32, lineHeight: 1.7, fontSize: 17 },
};
