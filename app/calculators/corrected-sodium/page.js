"use client";

import { useMemo, useState } from "react";


function n(value) {
  if (value === null || value === undefined) return 0;
  const normalized = String(value).replace(/,/g, ".");
  const parsed = parseFloat(normalized);
  return Number.isFinite(parsed) ? parsed : 0;
}


export default function Page() {
  const [sodium, setSodium] = useState("");
  const [glucose, setGlucose] = useState("");

  const result = useMemo(() => {
    const na = n(sodium);
    const glu = n(glucose);
    if (!na || !glu) return null;

    const corrected16 = na + 1.6 * ((glu - 100) / 100);
    const corrected24 = na + 2.4 * ((glu - 100) / 100);

    return { corrected16, corrected24 };
  }, [sodium, glucose]);

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
        <p style={styles.kicker}>Renal / Electrolyte Calculator</p>
        <h1>Corrected Sodium Calculator</h1>
        <p>Correct serum sodium for hyperglycemia using 1.6 and 2.4 mEq/L correction factors.</p>
      </section>

      <section style={styles.card}>
        <div style={styles.grid}>
          <label style={styles.label}>Measured sodium (mEq/L)
            <input type="text" style={styles.input} value={sodium} onChange={(e) => setSodium(e.target.value.replace(/,/g, "."))} inputMode="decimal" pattern="[0-9]*[.,]?[0-9]*" placeholder="130" />
          </label>

          <label style={styles.label}>Glucose (mg/dL)
            <input type="text" style={styles.input} value={glucose} onChange={(e) => setGlucose(e.target.value.replace(/,/g, "."))} inputMode="decimal" pattern="[0-9]*[.,]?[0-9]*" placeholder="400" />
          </label>
        </div>

        <div style={styles.result}>
          <span>Corrected Sodium</span>
          <strong>{result ? result.corrected16.toFixed(1) : "—"} mEq/L</strong>
          {result && <p>Using 2.4 correction factor: <b>{result.corrected24.toFixed(1)} mEq/L</b></p>}
          <p>Corrected sodium helps interpret hyponatremia in hyperglycemia.</p>
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
        <p><strong>Corrected Na = measured Na + correction factor × [(glucose − 100) / 100]</strong></p>

        <h2>Clinical use</h2>
        <p>Use corrected sodium in hyperglycemic states such as diabetic ketoacidosis or hyperosmolar hyperglycemic state.</p>

        <h2>References</h2>
        <p>Katz MA. N Engl J Med. 1973. Hillier TA et al. Am J Med. 1999.</p>
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
