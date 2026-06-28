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
