"use client";

import { useMemo, useState } from "react";

const calculators = [
  ["Aortic Size Index", "Vascular", "/calculators/aortic-size-index", "Calculate ASI using aortic diameter indexed to body surface area. aortic size index"],
  ["eGFR", "Renal", "/calculators/egfr", "Estimate eGFR using the CKD-EPI 2021 creatinine equation. egfr"],
  ["Creatinine Clearance", "Renal", "/calculators/creatinine-clearance", "Estimate creatinine clearance using the Cockcroft-Gault equation. creatinine clearance"],
  ["CHA₂DS₂-VASc", "Cardiovascular", "/calculators/cha2ds2-vasc", "Estimate thromboembolic risk in atrial fibrillation. cha2ds2 vasc"],
  ["HAS-BLED", "Cardiovascular", "/calculators/has-bled", "Assess bleeding risk in atrial fibrillation. has bled"],
  ["Wells DVT", "Vascular", "/calculators/wells-dvt", "Estimate pretest probability of deep vein thrombosis. wells dvt"],
  ["Body Surface Area", "General", "/calculators/body-surface-area", "Calculate BSA using the Mosteller formula. body surface area"],
  ["Body Mass Index", "General", "/calculators/body-mass-index", "Calculate body mass index and standard weight category. body mass index"],
  ["Caprini Score", "Perioperative", "/calculators/caprini-score", "Estimate venous thromboembolism risk in surgical patients. caprini score"],
  ["Revised Cardiac Risk Index", "Perioperative", "/calculators/revised-cardiac-risk-index", "Estimate perioperative cardiac risk before non-cardiac surgery. revised cardiac risk index"],
  ["Padua Prediction Score", "Perioperative", "/calculators/padua-score", "Estimate VTE risk in hospitalized medical patients. padua score"],
  ["IMPROVE VTE Risk Score", "Perioperative", "/calculators/improve-vte-risk-score", "Estimate VTE risk in hospitalized medical patients. improve vte risk score"],
  ["IMPROVE Bleeding Risk Score", "Perioperative", "/calculators/improve-bleeding-risk-score", "Estimate bleeding risk in hospitalized medical patients. improve bleeding risk score"],
  ["Wells PE Score", "Vascular", "/calculators/wells-pe", "Estimate clinical probability of pulmonary embolism. wells pe"],
  ["Duke Activity Status Index", "Perioperative", "/calculators/duke-activity-status-index", "Estimate functional capacity before non-cardiac surgery. duke activity status index"],
  ["Gupta MICA Risk Calculator", "Perioperative", "/calculators/gupta-mica", "Estimate perioperative myocardial infarction or cardiac arrest risk. gupta mica"],
  ["Apfel Score", "Perioperative", "/calculators/apfel-score", "Estimate postoperative nausea and vomiting risk. apfel score"],
  ["Venous Clinical Severity Score", "Vascular", "/calculators/venous-clinical-severity-score", "Calculate VCSS for chronic venous disease severity. venous clinical severity score"],
  ["Villalta Score", "Vascular", "/calculators/villalta-score", "Assess post-thrombotic syndrome severity after DVT. villalta score"],
  ["Rutherford Classification", "Vascular", "/calculators/rutherford-classification", "Classify chronic lower-extremity PAD severity. rutherford classification"],
  ["Fontaine Classification", "Vascular", "/calculators/fontaine-classification", "Classify peripheral arterial disease severity using Fontaine stages. fontaine classification"],
  ["WIfI Classification", "Vascular", "/calculators/wifi-classification", "Assess limb threat using Wound, Ischemia and foot Infection. wifi classification"],
  ["CEAP Classification", "Vascular", "/calculators/ceap-classification", "Classify chronic venous disease using CEAP. ceap classification"],
  ["Glasgow-Blatchford Score", "General", "/calculators/glasgow-blatchford-score", "Risk stratification for upper gastrointestinal bleeding. glasgow blatchford score"],
  ["Rockall Score", "General", "/calculators/rockall-score", "Risk stratification after upper gastrointestinal bleeding. rockall score"],
  ["Child-Pugh Score", "General", "/calculators/child-pugh-score", "Classify severity of chronic liver disease. child pugh score"],
  ["MELD Score", "General", "/calculators/meld-score", "Estimate liver disease severity using MELD. meld score"],
  ["MELD-Na Score", "General", "/calculators/meld-na-score", "Estimate liver disease severity using MELD-Na. meld na score"],
  ["FIB-4 Index", "General", "/calculators/fib-4-index", "Estimate risk of advanced liver fibrosis. fib 4 index"],
  ["APRI Score", "General", "/calculators/apri-score", "Estimate liver fibrosis risk using AST and platelets. apri score"],
  ["ALBI Score", "General", "/calculators/albi-score", "Assess liver function using albumin and bilirubin. albi score"],
  ["NAFLD Fibrosis Score", "General", "/calculators/nafld-fibrosis-score", "Estimate advanced fibrosis in fatty liver disease. nafld fibrosis score"],
  ["CKD-EPI 2021 Cystatin C eGFR", "Renal", "/calculators/ckd-epi-2021-cystatin-c", "Estimate eGFR using cystatin C. ckd epi 2021 cystatin c"],
  ["Anion Gap", "Renal", "/calculators/anion-gap", "Calculate serum and albumin-corrected anion gap. anion gap"],
  ["Serum Osmolality", "Renal", "/calculators/serum-osmolality", "Calculate serum osmolality and osmolar gap. serum osmolality"],
  ["Corrected Sodium", "Renal", "/calculators/corrected-sodium", "Correct serum sodium for hyperglycemia. corrected sodium"],
  ["Winter's Formula", "Renal", "/calculators/winters-formula", "Estimate expected PaCO₂ compensation in metabolic acidosis. winters formula"],
  ["Delta Ratio", "Renal", "/calculators/delta-ratio", "Evaluate mixed metabolic acid-base disorders. delta ratio"],
  ["Base Excess", "Renal", "/calculators/base-excess", "Estimate base excess from pH and bicarbonate. base excess"],
  ["Oxygenation Index", "General", "/calculators/oxygenation-index", "Calculate oxygenation index from FiO₂, MAP and PaO₂. oxygenation index"],
  ["Khorana Score", "Oncology", "/calculators/khorana-score", "Estimate cancer-associated venous thromboembolism risk. khorana score"],
  ["PESI Score", "Pulmonary", "/calculators/pesi-score", "Pulmonary Embolism Severity Index for 30-day mortality risk. pesi score"],
  ["sPESI Score", "Pulmonary", "/calculators/spesi-score", "Simplified Pulmonary Embolism Severity Index. spesi score"],
  ["qSOFA Score", "Critical Care", "/calculators/qsofa-score", "Quick Sequential Organ Failure Assessment. qsofa score"],
  ["SOFA Score", "Critical Care", "/calculators/sofa-score", "Sequential Organ Failure Assessment score. sofa score"],
  ["NEWS2 Score", "Critical Care", "/calculators/news2-score", "National Early Warning Score 2. news2 score"],
  ["MEWS Score", "Critical Care", "/calculators/mews-score", "Modified Early Warning Score. mews score"],
  ["HEART Score", "Cardiology", "/calculators/heart-score", "Chest pain and suspected ACS risk stratification. heart score"],
  ["TIMI NSTEMI/UA Score", "Cardiology", "/calculators/timi-nstemi-ua-score", "Unstable angina and NSTEMI short-term ischemic risk. timi nstemi ua score"],
  ["CURB-65 Score", "Pulmonology", "/calculators/curb-65-score", "Community-acquired pneumonia severity and mortality risk. curb 65 score"],
];

export default function SearchPage() {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return calculators;
    return calculators.filter(([name, category, , keywords]) =>
      `${name} ${category} ${keywords}`.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <main style={styles.main}>
      <a href="/" style={styles.back}>← Back to Meddoq</a>

      <section style={styles.hero}>
        <p style={styles.kicker}>Search</p>
        <h1>Search clinical calculators</h1>
        <p>Find Meddoq calculators by name, category or clinical keyword.</p>

        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search eGFR, DVT, ASI, BMI..."
          style={styles.search}
        />
      </section>

      <section style={styles.grid}>
        {results.map(([name, category, href]) => (
          <a href={href} key={href} style={styles.card}>
            <span style={styles.badge}>{category}</span>
            <h2>{name}</h2>
            <strong>Open calculator →</strong>
          </a>
        ))}
      </section>
    </main>
  );
}

const styles = {
  main: {
    maxWidth: 1000,
    margin: "0 auto",
    padding: 24,
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
  search: {
    marginTop: 24,
    width: "100%",
    padding: "16px 18px",
    borderRadius: 16,
    border: "1px solid #bfdbfe",
    fontSize: 17,
    outline: "none",
  },
  grid: {
    marginTop: 28,
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))",
    gap: 16,
  },
  card: {
    background: "white",
    border: "1px solid #e2e8f0",
    borderRadius: 22,
    padding: 22,
    textDecoration: "none",
    color: "#0f172a",
    boxShadow: "0 14px 36px rgba(15,23,42,0.06)",
  },
  badge: {
    color: "#2563eb",
    background: "#eff6ff",
    border: "1px solid #bfdbfe",
    borderRadius: 999,
    padding: "5px 9px",
    fontSize: 11,
    fontWeight: 900,
  },
};
