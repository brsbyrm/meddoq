"use client";

import { useMemo, useState } from "react";


function n(value) {
  if (value === null || value === undefined) return 0;
  const normalized = String(value).replace(/,/g, ".");
  const parsed = parseFloat(normalized);
  return Number.isFinite(parsed) ? parsed : 0;
}


export default function Page() {
  const [na, setNa] = useState("");
  const [cl, setCl] = useState("");
  const [hco3, setHco3] = useState("");

  const result = useMemo(() => {
    const sodium = n(na);
    const chloride = n(cl);
    const bicarbonate = n(hco3);

    if (!sodium || !chloride || !bicarbonate) return null;

    const ag = sodium - (chloride + bicarbonate);
    const deltaRatio = (ag - 12) / (24 - bicarbonate);

    let interpretation = "Indeterminate";
    if (deltaRatio < 0.4) interpretation = "High anion gap acidosis plus normal anion gap metabolic acidosis likely";
    else if (deltaRatio < 0.8) interpretation = "Mixed high anion gap and normal anion gap metabolic acidosis possible";
    else if (deltaRatio <= 2) interpretation = "Consistent with uncomplicated high anion gap metabolic acidosis";
    else interpretation = "Concurrent metabolic alkalosis or chronic respiratory acidosis possible";

    return { ag, deltaRatio, interpretation };
  }, [na, cl, hco3]);

  return (
    <>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalWebPage",
            "name": "Meddoq clinical calculator",
            "publisher": {
              "@type": "Organization",
              "name": "Meddoq",
              "url": "https://meddoq.com"
            },
            "medicalAudience": {
              "@type": "MedicalAudience",
              "audienceType": "Healthcare professionals"
            }
          })
        }}
      />

    <main style={styles.main}>
      <a href="/" style={styles.back}>← Back to Meddoq</a>

      <section style={styles.hero}>
        <p style={styles.kicker}>Acid-Base Calculator</p>
        <h1>Delta Ratio Calculator</h1>
        <p>Evaluate mixed metabolic acid-base disorders using anion gap and bicarbonate.</p>
      </section>

      <section style={styles.card}>
        <div style={styles.grid}>
          <label style={styles.label}>Sodium Na⁺ (mEq/L)
            <input type="text" style={styles.input} value={na} onChange={(e) => setNa(e.target.value.replace(/,/g, "."))} inputMode="decimal" pattern="[0-9]*[.,]?[0-9]*" placeholder="140" />
          </label>

          <label style={styles.label}>Chloride Cl⁻ (mEq/L)
            <input type="text" style={styles.input} value={cl} onChange={(e) => setCl(e.target.value.replace(/,/g, "."))} inputMode="decimal" pattern="[0-9]*[.,]?[0-9]*" placeholder="104" />
          </label>

          <label style={styles.label}>Bicarbonate HCO₃⁻ (mEq/L)
            <input type="text" style={styles.input} value={hco3} onChange={(e) => setHco3(e.target.value.replace(/,/g, "."))} inputMode="decimal" pattern="[0-9]*[.,]?[0-9]*" placeholder="12" />
          </label>
        </div>

        <div style={styles.result}>
          <span>Delta Ratio</span>
          <strong>{result ? result.deltaRatio.toFixed(2) : "—"}</strong>
          {result && <p>Anion gap: <b>{result.ag.toFixed(1)} mEq/L</b></p>}
          {result && <p><b>{result.interpretation}</b></p>}
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
        <h2>Formula</h2>
        <p><strong>Delta ratio = (Anion gap − 12) / (24 − HCO₃⁻)</strong></p>

        <h2>Clinical use</h2>
        <p>Delta ratio helps identify additional metabolic processes in high anion gap metabolic acidosis.</p>

        <h2>Limitations</h2>
        <p>Interpret with pH, PaCO₂, albumin-corrected anion gap, lactate, ketones and clinical context.</p>
      </section>
    </main>
    </>
  );
}

const styles = {
  main: { maxWidth: 980, margin: "0 auto", padding: 24, fontFamily: "Inter,system-ui,sans-serif", color: "#0f172a" },
  back: { color: "#2563eb", fontWeight: 800, textDecoration: "none" },
  hero: { marginTop: 32, background: "linear-gradient(135deg,#fff,#eff6ff)", border: "1px solid #dbeafe", borderRadius: 28, padding: 40 },
  kicker: { color: "#2563eb", fontWeight: 900, fontSize: 12, textTransform: "uppercase" },
  card: { marginTop: 24, background: "#fff", border: "1px solid #e2e8f0", borderRadius: 24, padding: 24 },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,220px),1fr))", gap: 16 },
  label: { display: "grid", gap: 8, fontWeight: 700 },
  input: { padding: 14, borderRadius: 12, border: "1px solid #cbd5e1" },
  result: { marginTop: 24, background: "#eff6ff", padding: 20, borderRadius: 18, border: "1px solid #bfdbfe" },
  content: { marginTop: 32, lineHeight: 1.7, fontSize: 17 },
};
