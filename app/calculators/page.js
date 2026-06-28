const calculators = [
  ["Aortic Size Index", "Vascular", "/calculators/aortic-size-index", "Index aortic diameter to body surface area."],
  ["Rutherford Classification", "Vascular", "/calculators/rutherford-classification", "Classify chronic limb ischemia severity."],
  ["Fontaine Classification", "Vascular", "/calculators/fontaine-classification", "Classify PAD severity using Fontaine stages."],
  ["WIfI Classification", "Vascular", "/calculators/wifi-classification", "Estimate limb threat using wound, ischemia and infection."],
  ["CEAP Classification", "Vascular", "/calculators/ceap-classification", "Classify chronic venous disease."],
  ["VCSS", "Vascular", "/calculators/venous-clinical-severity-score", "Quantify chronic venous disease severity."],
  ["Villalta Score", "Vascular", "/calculators/villalta-score", "Assess post-thrombotic syndrome severity."],
  ["Wells DVT", "Vascular", "/calculators/wells-dvt", "Estimate pretest probability of deep vein thrombosis."],
  ["Wells PE", "Pulmonary Embolism", "/calculators/wells-pe", "Estimate pretest probability of pulmonary embolism."],
  ["PESI Score", "Pulmonary Embolism", "/calculators/pesi-score", "Risk stratify acute pulmonary embolism."],
  ["sPESI Score", "Pulmonary Embolism", "/calculators/spesi-score", "Simplified PE mortality risk stratification."],
  ["IMPROVE VTE Score", "VTE Risk", "/calculators/improve-vte-risk-score", "Estimate VTE risk in hospitalized medical patients."],
  ["IMPROVE Bleeding Risk", "Bleeding Risk", "/calculators/improve-bleeding-risk-score", "Estimate bleeding risk during thromboprophylaxis assessment."],
  ["Khorana Score", "Oncology / VTE", "/calculators/khorana-score", "Estimate VTE risk in ambulatory cancer patients."],
  ["Padua Score", "VTE Risk", "/calculators/padua-score", "Estimate VTE risk in hospitalized medical patients."],
  ["Caprini Score", "VTE Risk", "/calculators/caprini-score", "Estimate perioperative VTE risk."],
  ["SOFA Score", "Critical Care", "/calculators/sofa-score", "Assess organ dysfunction severity."],
  ["qSOFA Score", "Critical Care", "/calculators/qsofa-score", "Screen for higher-risk suspected infection."],
  ["NEWS2 Score", "Critical Care", "/calculators/news2-score", "Early warning score for clinical deterioration."],
  ["MEWS Score", "Critical Care", "/calculators/mews-score", "Modified early warning score."],
  ["eGFR", "Renal", "/calculators/egfr", "Estimate glomerular filtration rate using CKD-EPI 2021."],
  ["Creatinine Clearance", "Renal", "/calculators/creatinine-clearance", "Estimate creatinine clearance using Cockcroft-Gault."],
  ["CKD-EPI 2021 Cystatin C", "Renal", "/calculators/ckd-epi-2021-cystatin-c", "Estimate GFR using cystatin C."],
  ["MELD Score", "Hepatology", "/calculators/meld-score", "Estimate mortality risk in advanced liver disease."],
  ["MELD-Na Score", "Hepatology", "/calculators/meld-na-score", "Estimate cirrhosis risk using MELD plus sodium."],
  ["Child-Pugh Score", "Hepatology", "/calculators/child-pugh-score", "Classify cirrhosis severity."],
  ["ALBI Score", "Hepatology", "/calculators/albi-score", "Assess liver functional reserve."],
  ["APRI Score", "Hepatology", "/calculators/apri-score", "Estimate liver fibrosis risk."],
  ["FIB-4 Index", "Hepatology", "/calculators/fib-4-index", "Estimate advanced liver fibrosis risk."],
  ["NAFLD Fibrosis Score", "Hepatology", "/calculators/nafld-fibrosis-score", "Estimate advanced fibrosis risk in NAFLD."],
  ["CHA₂DS₂-VASc", "Cardiovascular", "/calculators/cha2ds2-vasc", "Estimate thromboembolic risk in atrial fibrillation."],
  ["HAS-BLED", "Cardiovascular", "/calculators/has-bled", "Assess bleeding risk in atrial fibrillation."],
  ["RCRI", "Perioperative", "/calculators/revised-cardiac-risk-index", "Estimate perioperative cardiac risk."],
  ["Gupta MICA", "Perioperative", "/calculators/gupta-mica", "Estimate perioperative MI or cardiac arrest risk."],
  ["Apfel Score", "Perioperative", "/calculators/apfel-score", "Estimate postoperative nausea and vomiting risk."],
  ["Duke Activity Status Index", "Perioperative", "/calculators/duke-activity-status-index", "Estimate functional capacity."],
  ["Glasgow-Blatchford Score", "Gastroenterology", "/calculators/glasgow-blatchford-score", "Risk stratify upper GI bleeding."],
  ["Rockall Score", "Gastroenterology", "/calculators/rockall-score", "Estimate risk after upper GI bleeding."],
  ["Anion Gap", "Acid–Base", "/calculators/anion-gap", "Calculate serum anion gap."],
  ["Delta Ratio", "Acid–Base", "/calculators/delta-ratio", "Assess mixed metabolic acid-base disorders."],
  ["Base Excess", "Acid–Base", "/calculators/base-excess", "Assess metabolic acid-base component."],
  ["Winter's Formula", "Acid–Base", "/calculators/winters-formula", "Estimate respiratory compensation in metabolic acidosis."],
  ["Corrected Sodium", "Electrolytes", "/calculators/corrected-sodium", "Correct sodium for hyperglycemia."],
  ["Serum Osmolality", "Electrolytes", "/calculators/serum-osmolality", "Estimate calculated serum osmolality."],
  ["Oxygenation Index", "Critical Care", "/calculators/oxygenation-index", "Assess oxygenation impairment."],
  ["Body Surface Area", "General", "/calculators/body-surface-area", "Calculate body surface area using Mosteller formula."],
  ["Body Mass Index", "General", "/calculators/body-mass-index", "Calculate BMI and standard weight category."],
  ["HEART Score", "Cardiology", "/calculators/heart-score", "Chest pain and suspected ACS risk stratification."],
  ["TIMI NSTEMI/UA Score", "Cardiology", "/calculators/timi-nstemi-ua-score", "Unstable angina and NSTEMI short-term ischemic risk."],
  ["CURB-65 Score", "Pulmonology", "/calculators/curb-65-score", "Community-acquired pneumonia severity and mortality risk."],
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
