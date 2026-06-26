const calculators = [
  ["Aortic Size Index", "Vascular", "/calculators/aortic-size-index", "Index aortic diameter to body surface area."],
  ["eGFR", "Renal", "/calculators/egfr", "Estimate glomerular filtration rate using CKD-EPI 2021."],
  ["Creatinine Clearance", "Renal", "/calculators/creatinine-clearance", "Estimate creatinine clearance using Cockcroft-Gault."],
  ["Body Surface Area", "General", "/calculators/body-surface-area", "Calculate body surface area using Mosteller formula."],
  ["Body Mass Index", "General", "/calculators/body-mass-index", "Calculate BMI and standard weight category."],
  ["CHA₂DS₂-VASc", "Cardiovascular", "/calculators/cha2ds2-vasc", "Estimate thromboembolic risk in atrial fibrillation."],
  ["HAS-BLED", "Cardiovascular", "/calculators/has-bled", "Assess bleeding risk in atrial fibrillation."],
  ["Wells DVT", "Vascular", "/calculators/wells-dvt", "Estimate pretest probability of deep vein thrombosis."],
];

export const metadata = {
  title: "Clinical Calculator Library | Meddoq",
  description:
    "Free clinical calculator library for healthcare professionals, including vascular, cardiovascular, renal and general medical calculators.",
  alternates: {
    canonical: "https://meddoq.com/calculators",
  },
};

export default function Page() {
  return (
    <main style={styles.main}>
      <a href="/" style={styles.back}>← Back to Meddoq</a>

      <section style={styles.hero}>
        <p style={styles.kicker}>Calculator Library</p>
        <h1>Clinical Calculator Library</h1>
        <p>
          Browse Meddoq clinical calculators for vascular, cardiovascular,
          renal and general medical workflows.
        </p>
      </section>

      <section style={styles.grid}>
        {calculators.map(([name, category, href, description]) => (
          <a key={href} href={href} style={styles.card}>
            <span style={styles.badge}>{category}</span>
            <h2>{name}</h2>
            <p>{description}</p>
            <strong>Open calculator →</strong>
          </a>
        ))}
      </section>
    </main>
  );
}

const styles = {
  main: {
    maxWidth: 1100,
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
  grid: {
    marginTop: 28,
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 250px), 1fr))",
    gap: 18,
  },
  card: {
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: 22,
    padding: 22,
    color: "#0f172a",
    textDecoration: "none",
    boxShadow: "0 14px 36px rgba(15,23,42,0.06)",
  },
  badge: {
    display: "inline-flex",
    color: "#2563eb",
    background: "#eff6ff",
    border: "1px solid #bfdbfe",
    borderRadius: 999,
    padding: "5px 9px",
    fontSize: 11,
    fontWeight: 900,
  },
};
