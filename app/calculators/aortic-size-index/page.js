import AorticSizeIndexCalculator from "./AorticSizeIndexCalculator";

export const metadata = {
  title: "Aortic Size Index Calculator | ASI Calculator | Meddoq",
  description:
    "Free Aortic Size Index calculator. Calculate ASI using aortic diameter and body surface area with clinical interpretation for physicians.",
  alternates: {
    canonical: "https://meddoq.com/calculators/aortic-size-index",
  },
};

export default function Page() {
  return (
    <main style={styles.main}>
      <a href="/" style={styles.back}>← Back to Meddoq</a>

      <section style={styles.hero}>
        <p style={styles.kicker}>Vascular Calculator</p>
        <h1>Aortic Size Index Calculator</h1>
        <p>
          Calculate Aortic Size Index using aortic diameter indexed to body surface area.
          ASI helps contextualize aortic diameter according to patient body size.
        </p>
      </section>

      <AorticSizeIndexCalculator />


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
        <h2>What is Aortic Size Index?</h2>
        <p>
          Aortic Size Index is calculated by dividing aortic diameter by body surface area.
          It may help clinicians interpret aortic dimensions in relation to patient size.
        </p>

        <h2>Formula</h2>
        <p><strong>ASI = Aortic diameter / Body surface area</strong></p>
        <p>Body surface area is calculated using the Mosteller formula.</p>

        <h2>Clinical interpretation</h2>
        <p>
          ASI should not be used alone for intervention decisions. It should be interpreted
          together with absolute aortic diameter, growth rate, symptoms, valve morphology,
          connective tissue disease, family history and current guideline thresholds.
        </p>

        <h2>References</h2>
        <p>Davies RR et al. Ann Thorac Surg. 2006. Mosteller RD. N Engl J Med. 1987.</p>
      </section>
    </main>
  );
}

const styles = {
  main: {
    maxWidth: 980,
    margin: "0 auto",
    padding: "24px",
    fontFamily:
      'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    color: "#0f172a",
  },
  back: {
    color: "#2563eb",
    fontWeight: 800,
    textDecoration: "none",
  },
  hero: {
    marginTop: 32,
    background: "linear-gradient(135deg, #ffffff, #eff6ff)",
    border: "1px solid #dbeafe",
    borderRadius: 28,
    padding: "clamp(26px, 5vw, 46px)",
    boxShadow: "0 24px 70px rgba(15,23,42,0.08)",
  },
  kicker: {
    color: "#2563eb",
    fontWeight: 900,
    textTransform: "uppercase",
    letterSpacing: "0.12em",
    fontSize: 12,
  },
  content: {
    marginTop: 32,
    lineHeight: 1.7,
    fontSize: 17,
  },
};
