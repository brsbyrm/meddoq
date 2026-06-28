import { calculatorMetadata } from "../../lib/calculatorSeo";

export const metadata = calculatorMetadata({
  name: "Rutherford Classification",
  category: "Vascular",
  path: "/calculators/rutherford-classification",
});

"use client";

import { useMemo, useState } from "react";

const categories = [
  {
    value: "0",
    title: "Category 0",
    label: "Asymptomatic",
    description: "No hemodynamically significant peripheral arterial disease symptoms.",
  },
  {
    value: "1",
    title: "Category 1",
    label: "Mild claudication",
    description: "Claudication with mild limitation.",
  },
  {
    value: "2",
    title: "Category 2",
    label: "Moderate claudication",
    description: "Claudication with moderate functional limitation.",
  },
  {
    value: "3",
    title: "Category 3",
    label: "Severe claudication",
    description: "Marked limitation from claudication symptoms.",
  },
  {
    value: "4",
    title: "Category 4",
    label: "Ischemic rest pain",
    description: "Chronic limb-threatening ischemia with rest pain.",
  },
  {
    value: "5",
    title: "Category 5",
    label: "Minor tissue loss",
    description: "Non-healing ulcer or focal gangrene with limb salvage potential.",
  },
  {
    value: "6",
    title: "Category 6",
    label: "Major tissue loss",
    description: "Extensive gangrene or major tissue loss threatening limb viability.",
  },
];

export default function Page() {
  const [selected, setSelected] = useState("0");

  const result = useMemo(
    () => categories.find((item) => item.value === selected),
    [selected]
  );

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
        <p style={styles.kicker}>Vascular Classification</p>
        <h1>Rutherford Classification Calculator</h1>
        <p>
          Classify chronic lower-extremity peripheral arterial disease severity using Rutherford categories.
        </p>
      </section>

      <section style={styles.card}>
        <div style={styles.grid}>
          {categories.map((item) => (
            <label key={item.value} style={styles.option}>
              <input
                type="radio"
                name="rutherford"
                value={item.value}
                checked={selected === item.value}
                onChange={(e) => setSelected(e.target.value.replace(/,/g, "."))}
              />
              <div>
                <strong>{item.title} — {item.label}</strong>
                <span>{item.description}</span>
              </div>
            </label>
          ))}
        </div>

        <div style={styles.result}>
          <span>Selected Rutherford Category</span>
          <strong>{result.title}</strong>
          <p><b>{result.label}</b></p>
          <p>{result.description}</p>
          <div style={styles.interpretationBox}>
            <h3>Clinical meaning</h3>
            <ul>
              <li><b>Category 1 — Mild claudication:</b> Symptoms occur with exertion, but usual daily walking is mostly preserved.</li>
              <li><b>Category 2 — Moderate claudication:</b> Walking distance is clearly reduced; routine activity is affected.</li>
              <li><b>Category 3 — Severe claudication:</b> Short-distance walking causes symptoms; lifestyle limitation is marked.</li>
              <li><b>Category 4 — Rest pain:</b> Suggests chronic limb-threatening ischemia and requires vascular assessment.</li>
              <li><b>Category 5–6 — Tissue loss:</b> Ulceration or gangrene; limb salvage planning is usually urgent.</li>
            </ul>
            <p><b>Next step:</b> Combine with ABI/toe pressure, duplex or CTA findings, wound status and revascularization feasibility.</p>
          </div>
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
          Rutherford classification is used to describe the clinical severity of chronic limb ischemia
          and peripheral arterial disease.
        </p>

        <h2>Interpretation</h2>
        <p>
          Categories 1–3 represent claudication severity. Categories 4–6 represent chronic
          limb-threatening ischemia with rest pain or tissue loss.
        </p>

        <h2>References</h2>
        <p>Rutherford RB et al. J Vasc Surg. 1997.</p>
      </section>
    </main>
    </>
  );
}

const styles = {
  main: { maxWidth: 980, margin: "0 auto", padding: 24, fontFamily: "Inter, system-ui, sans-serif", color: "#0f172a" },
  back: { color: "#2563eb", fontWeight: 800, textDecoration: "none" },
  hero: { marginTop: 32, background: "linear-gradient(135deg,#ffffff,#eff6ff)", border: "1px solid #dbeafe", borderRadius: 28, padding: "clamp(26px,5vw,46px)", boxShadow: "0 24px 70px rgba(15,23,42,0.08)" },
  kicker: { color: "#2563eb", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.12em", fontSize: 12 },
  card: { marginTop: 24, background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: 24, padding: 24, boxShadow: "0 20px 60px rgba(15,23,42,0.08)" },
  grid: { display: "grid", gap: 12 },
  option: { display: "grid", gridTemplateColumns: "24px 1fr", gap: 12, alignItems: "center", background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 16, padding: 14, cursor: "pointer" },
  result: { marginTop: 24, background: "linear-gradient(135deg,#eff6ff,#ffffff)", border: "1px solid #bfdbfe", borderRadius: 20, padding: 22 },
  content: { marginTop: 32, lineHeight: 1.7, fontSize: 17 },
};
