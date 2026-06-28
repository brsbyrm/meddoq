import CapriniCalculator from "./CapriniCalculator";

export const metadata = {
  title: "Caprini Score Calculator | VTE Risk Assessment | Meddoq",
  description:
    "Free Caprini Score calculator for venous thromboembolism risk assessment in surgical patients.",
  alternates: {
    canonical: "https://meddoq.com/calculators/caprini-score",
  },
};

export default function Page() {
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
        <p style={styles.kicker}>Perioperative Calculator</p>
        <h1>Caprini Score Calculator</h1>
        <p>
          Estimate venous thromboembolism risk in surgical patients using the Caprini Risk Assessment Model.
        </p>
      </section>

      <CapriniCalculator />


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


      <section style={styles.safetyNotice}>
        <strong>Medical disclaimer</strong>
        <p>
          Meddoq calculators are intended for healthcare professionals. Results are educational
          and decision-support aids only. They do not replace clinical judgment, patient-specific
          assessment, emergency evaluation or institutional protocols.
        </p>
      </section>

      <section style={styles.content}>
        <h2>What is the Caprini Score?</h2>
        <p>
          The Caprini Score is a venous thromboembolism risk assessment model used in surgical patients.
          It combines patient-specific and procedure-related risk factors.
        </p>

        <h2>Clinical interpretation</h2>
        <p>
          Higher scores indicate higher postoperative VTE risk. Prophylaxis decisions should also consider
          bleeding risk, procedure type, mobility, renal function and local protocols.
        </p>

        <h2>Important limitation</h2>
        <p>
          This calculator is intended for clinical support only and should not replace guideline-based
          judgment or institutional VTE prophylaxis protocols.
        </p>

        <h2>References</h2>
        <p>
          Caprini JA. Risk assessment as a guide for the prevention of venous thromboembolism.
          Dis Mon. 2005. Cronin M et al. Completion of the Updated Caprini Risk Assessment Model.
          Clin Appl Thromb Hemost. 2019.
        </p>
      </section>
    </main>
    </>
  );
}

const styles = {

pearlBox:{marginTop:32,background:"linear-gradient(135deg,#f8fafc,#ffffff)",border:"1px solid #e2e8f0",borderRadius:24,padding:24,lineHeight:1.7},

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
