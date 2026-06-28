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
  const [glucose, setGlucose] = useState("");
  const [bun, setBun] = useState("");
  const [ethanol, setEthanol] = useState("");
  const [measured, setMeasured] = useState("");

  const result = useMemo(() => {
    const sodium = n(na);
    const glu = n(glucose);
    const b = n(bun);
    const eth = n(ethanol || 0);
    const meas = n(measured || 0);

    if (!sodium || !glu || !b) return null;

    const calculated = 2 * sodium + glu / 18 + b / 2.8 + eth / 4.6;
    const gap = meas ? meas - calculated : null;

    return { calculated, gap };
  }, [na, glucose, bun, ethanol, measured]);

  const gapText =
    !result || result.gap === null
      ? ""
      : result.gap > 10
      ? "Elevated osmolar gap"
      : "Normal osmolar gap range";

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
        <h1>Serum Osmolality Calculator</h1>
        <p>Calculate estimated serum osmolality and optional osmolar gap.</p>
      </section>

      <section style={styles.card}>
        <div style={styles.grid}>
          <label style={styles.label}>Sodium Na⁺ (mEq/L)
            <input type="text" style={styles.input} value={na} onChange={(e) => setNa(e.target.value.replace(/,/g, "."))} inputMode="decimal" pattern="[0-9]*[.,]?[0-9]*" placeholder="140" />
          </label>

          <label style={styles.label}>Glucose (mg/dL)
            <input type="text" style={styles.input} value={glucose} onChange={(e) => setGlucose(e.target.value.replace(/,/g, "."))} inputMode="decimal" pattern="[0-9]*[.,]?[0-9]*" placeholder="100" />
          </label>

          <label style={styles.label}>BUN (mg/dL)
            <input type="text" style={styles.input} value={bun} onChange={(e) => setBun(e.target.value.replace(/,/g, "."))} inputMode="decimal" pattern="[0-9]*[.,]?[0-9]*" placeholder="14" />
          </label>

          <label style={styles.label}>Ethanol (mg/dL) optional
            <input type="text" style={styles.input} value={ethanol} onChange={(e) => setEthanol(e.target.value.replace(/,/g, "."))} inputMode="decimal" pattern="[0-9]*[.,]?[0-9]*" placeholder="0" />
          </label>

          <label style={styles.label}>Measured osmolality optional
            <input type="text" style={styles.input} value={measured} onChange={(e) => setMeasured(e.target.value.replace(/,/g, "."))} inputMode="decimal" pattern="[0-9]*[.,]?[0-9]*" placeholder="290" />
          </label>
        </div>

        <div style={styles.result}>
          <span>Calculated Serum Osmolality</span>
          <strong>{result ? result.calculated.toFixed(1) : "—"} mOsm/kg</strong>
          {result && result.gap !== null && <p>Osmolar gap: <b>{result.gap.toFixed(1)} mOsm/kg</b></p>}
          <p><b>{gapText}</b></p>
          <p>Interpret with sodium status, glucose, renal function, alcohols and toxic exposure history.</p>
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
        <p><strong>Calculated osmolality = 2 × Na + glucose/18 + BUN/2.8 + ethanol/4.6</strong></p>

        <h2>Clinical use</h2>
        <p>Calculated serum osmolality and osmolar gap support evaluation of dysnatremia, hyperglycemia and suspected toxic alcohol ingestion.</p>

        <h2>References</h2>
        <p>Smithline N, Gardner KD. N Engl J Med. 1976.</p>
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
