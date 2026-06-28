"use client";

import { usePathname } from "next/navigation";

const calculatorContent = {
  "albi-score": clinical("ALBI Score", "Hepatology", "Assesses liver functional reserve using albumin and bilirubin, especially in hepatocellular carcinoma and chronic liver disease.", "Higher ALBI grades indicate worse hepatic reserve and higher clinical risk.", "Use with Child-Pugh, MELD, tumor burden, performance status, renal function, and treatment intent."),
  "apri-score": clinical("APRI Score", "Hepatology", "Estimates the probability of significant hepatic fibrosis using AST and platelet count.", "Low values make advanced fibrosis less likely; high values increase suspicion for significant fibrosis or cirrhosis.", "Confirm with elastography, imaging, etiology work-up, and hepatology follow-up when abnormal."),
  "fib-4-index": clinical("FIB-4 Index", "Hepatology", "Non-invasive fibrosis risk score using age, AST, ALT, and platelet count.", "Low risk suggests advanced fibrosis is unlikely; indeterminate or high risk requires additional fibrosis assessment.", "Use elastography or specialist referral for indeterminate/high-risk results."),
  "meld-score": clinical("MELD Score", "Hepatology", "Estimates short-term mortality risk in advanced liver disease using bilirubin, INR, and creatinine.", "Higher MELD means higher short-term mortality and greater transplant urgency.", "Review renal function, anticoagulation/INR context, sodium, infection, bleeding, encephalopathy, and transplant criteria."),
  "meld-na-score": clinical("MELD-Na Score", "Hepatology", "Adds serum sodium to MELD to improve mortality prediction in cirrhosis.", "Hyponatremia increases risk and may raise priority compared with MELD alone.", "Assess volume status, renal function, infection, diuretics, bleeding, and transplant referral need."),
  "child-pugh-score": clinical("Child-Pugh Score", "Hepatology", "Classifies cirrhosis severity using bilirubin, albumin, INR, ascites, and encephalopathy.", "Class A indicates compensated disease; B and C indicate progressively worse hepatic reserve.", "Use with MELD/MELD-Na, variceal status, ascites control, encephalopathy, renal function, and procedural risk."),
  "nafld-fibrosis-score": clinical("NAFLD Fibrosis Score", "Hepatology", "Estimates advanced fibrosis risk in metabolic dysfunction-associated steatotic liver disease.", "Low risk helps exclude advanced fibrosis; high risk suggests need for further fibrosis assessment.", "Use with FIB-4, elastography, metabolic risk optimization, and hepatology referral when high-risk."),

  "rutherford-classification": clinical("Rutherford Classification", "Vascular", "Grades chronic limb ischemia from asymptomatic PAD to major tissue loss.", "Mild disease includes asymptomatic PAD or mild claudication; severe disease includes rest pain, ulceration, gangrene, or threatened limb viability.", "Confirm symptoms, pulse exam, ABI/toe pressure, duplex ultrasound, and anatomical imaging when revascularization is considered."),
  "fontaine-classification": clinical("Fontaine Classification", "Vascular", "Symptom-based PAD staging from asymptomatic disease to claudication, rest pain, and gangrene.", "Fontaine I is asymptomatic; II is claudication; III is rest pain; IV is ulceration or gangrene.", "Use with ABI, toe pressure, duplex ultrasound, CTA/MRA, or angiography depending on severity."),
  "wifi-classification": clinical("WIfI Classification", "Vascular", "Grades wound, ischemia, and foot infection to estimate limb threat in CLTI.", "Higher wound, ischemia, and infection grades mean higher amputation risk and stronger need for limb-salvage planning.", "Document wound grade, toe pressure/ABI, infection severity, and consider vascular imaging."),
  "ceap-classification": clinical("CEAP Classification", "Vascular", "Describes chronic venous disease using clinical class, etiology, anatomy, and pathophysiology.", "Severity ranges from no visible disease to varicose veins, edema, skin changes, healed ulcer, and active ulcer.", "Combine with duplex ultrasound to define reflux, obstruction, superficial, deep, or perforator disease."),
  "venous-clinical-severity-score": clinical("Venous Clinical Severity Score", "Vascular", "Quantifies chronic venous disease burden and treatment response.", "Higher values reflect greater pain, edema, skin damage, ulcer burden, and clinical severity.", "Use with CEAP, duplex ultrasound, compression assessment, ulcer care, and intervention planning."),
  "villalta-score": clinical("Villalta Score", "Vascular", "Assesses post-thrombotic syndrome after DVT using symptoms and clinical signs.", "Higher scores indicate more severe chronic venous morbidity; ulceration indicates severe disease.", "Assess duplex findings, recurrence risk, compression, iliocaval obstruction, and venous specialist referral."),

  "revised-cardiac-risk-index": clinical("Revised Cardiac Risk Index", "Perioperative", "Estimates risk of major cardiac complications before non-cardiac surgery.", "More risk factors indicate higher perioperative cardiac risk.", "Use with surgical urgency, functional capacity, ECG, biomarkers, echo, and guideline-directed perioperative planning."),
  "gupta-mica": clinical("Gupta MICA", "Perioperative", "Predicts perioperative myocardial infarction or cardiac arrest using patient and surgery variables.", "Higher predicted percentage indicates greater perioperative cardiac event risk.", "Use with RCRI, functional capacity, procedure risk, frailty, and anesthesia/surgical planning."),
  "apfel-score": clinical("Apfel Score", "Perioperative", "Estimates postoperative nausea and vomiting risk.", "Risk increases as female sex, non-smoking status, PONV/motion sickness history, and postoperative opioid use accumulate.", "Match antiemetic prophylaxis intensity to risk and reduce modifiable triggers."),
  "caprini-score": clinical("Caprini Score", "Perioperative", "Stratifies venous thromboembolism risk in surgical patients.", "Higher scores indicate greater VTE risk and stronger need for pharmacologic/mechanical prophylaxis.", "Balance VTE risk against bleeding risk, procedure type, mobility, and institutional protocol."),
  "duke-activity-status-index": clinical("Duke Activity Status Index", "Perioperative", "Estimates functional capacity in metabolic equivalents using daily activity questions.", "Lower functional capacity may increase perioperative risk and need for additional assessment.", "Use with surgical risk, symptoms, ECG, echo findings, biomarkers, and cardiology input when indicated."),

  "wells-dvt": clinical("Wells DVT Score", "Vascular", "Estimates pretest probability of deep vein thrombosis.", "Higher scores increase DVT probability and influence ultrasound and D-dimer strategy.", "Use with compression ultrasound, D-dimer when appropriate, bleeding risk, and anticoagulation decision-making."),
  "wells-pe": clinical("Wells PE Score", "Emergency / Vascular", "Estimates pretest probability of pulmonary embolism.", "Higher scores increase PE probability and guide D-dimer versus imaging strategy.", "Use with hemodynamic status, oxygenation, ECG, biomarkers, CTPA/VQ imaging, and anticoagulation risk."),
  "padua-score": clinical("Padua Prediction Score", "Internal Medicine", "Estimates VTE risk in hospitalized medical patients.", "High-risk patients may benefit from thromboprophylaxis if bleeding risk is acceptable.", "Assess bleeding risk, mobility, cancer, prior VTE, thrombophilia, infection, heart failure, and renal function."),

  "anion-gap": clinical("Anion Gap", "Acid–Base", "Helps classify metabolic acidosis and identify unmeasured anions.", "High anion gap suggests lactate, ketoacids, renal failure, toxins, or other unmeasured acids.", "Correct for albumin and interpret with pH, bicarbonate, lactate, renal function, glucose/ketones, and toxicology context."),
  "delta-ratio": clinical("Delta Ratio", "Acid–Base", "Helps detect mixed metabolic disorders in high anion gap metabolic acidosis.", "Low or high ratios suggest additional normal-gap acidosis or metabolic alkalosis.", "Use only after confirming high anion gap metabolic acidosis and corrected anion gap."),
  "base-excess": clinical("Base Excess", "Acid–Base", "Quantifies the metabolic component of acid–base disturbance.", "Negative values suggest metabolic acidosis; positive values suggest metabolic alkalosis.", "Interpret with pH, PaCO₂, bicarbonate, lactate, chloride, renal function, and clinical status."),
  "winters-formula": clinical("Winter’s Formula", "Acid–Base", "Estimates expected respiratory compensation in metabolic acidosis.", "Measured PaCO₂ above expected suggests respiratory acidosis; below expected suggests respiratory alkalosis.", "Use after confirming metabolic acidosis and compare expected versus measured PaCO₂."),
  "corrected-sodium": clinical("Corrected Sodium", "Electrolytes", "Estimates sodium adjusted for hyperglycemia-related water shift.", "Corrected sodium may reveal true hypernatremia or less severe hyponatremia.", "Use with osmolality, volume status, glucose correction, renal function, and neurologic symptoms."),
  "serum-osmolality": clinical("Serum Osmolality", "Electrolytes", "Estimates serum osmolality from sodium, glucose, and BUN.", "Osmolar gap may suggest toxins, alcohols, or unmeasured osmoles.", "Compare calculated and measured osmolality when toxic ingestion or unexplained acidosis is suspected."),

  "egfr": clinical("eGFR", "Nephrology", "Estimates glomerular filtration rate for CKD staging and medication dosing context.", "Lower eGFR indicates worse kidney function and higher renal/cardiovascular risk.", "Confirm chronicity, albuminuria, urine findings, medication dosing, and nephrology referral thresholds."),
  "creatinine-clearance": clinical("Creatinine Clearance", "Nephrology", "Estimates creatinine clearance using Cockcroft–Gault, often relevant for drug dosing.", "Lower clearance suggests impaired renal elimination and higher drug accumulation risk.", "Use actual/ideal/adjusted weight appropriately and verify dosing guidance for the specific drug."),
  "ckd-epi-2021-cystatin-c": clinical("CKD-EPI 2021 Cystatin C", "Nephrology", "Estimates GFR using cystatin C, useful when creatinine may be misleading.", "Lower eGFR indicates worse kidney function and increased clinical risk.", "Interpret with creatinine eGFR, albuminuria, body composition, inflammation, thyroid disease, and steroid use."),

  "glasgow-blatchford-score": clinical("Glasgow-Blatchford Score", "Gastroenterology", "Risk stratifies upper GI bleeding before endoscopy.", "Higher scores indicate higher risk of intervention, transfusion, or adverse outcome.", "Use with hemodynamics, hemoglobin trend, melena/syncope, anticoagulants, liver disease, and urgent endoscopy planning."),
  "rockall-score": clinical("Rockall Score", "Gastroenterology", "Estimates risk after upper GI bleeding using clinical and endoscopic variables.", "Higher scores indicate greater rebleeding and mortality risk.", "Use after endoscopy when complete Rockall scoring is available."),

  "body-mass-index": clinical("BMI", "General", "Indexes weight to height for broad weight category screening.", "Higher categories correlate with cardiometabolic risk but do not directly measure adiposity distribution.", "Use with waist circumference, metabolic markers, comorbidities, and patient-specific context."),
  "body-surface-area": clinical("Body Surface Area", "General", "Estimates body surface area for indexed cardiovascular measurements and dosing contexts.", "BSA indexing helps adjust selected measurements for body size.", "Confirm formula choice and avoid using BSA alone for clinical decisions."),
  "aortic-size-index": clinical("Aortic Size Index", "Vascular", "Indexes aortic diameter to body surface area to refine aortic risk assessment.", "Higher ASI suggests greater relative aortic dilation and may alter surveillance or intervention discussion.", "Interpret with absolute diameter, growth rate, valve morphology, family history, syndrome status, and guideline thresholds."),
  "cha2ds2-vasc": clinical("CHA₂DS₂-VASc", "Cardiovascular", "Estimates thromboembolic risk in atrial fibrillation.", "Higher score indicates higher annual stroke/systemic embolism risk.", "Use with bleeding risk, anticoagulation eligibility, AF pattern, renal function, and shared decision-making."),
  "has-bled": clinical("HAS-BLED", "Cardiovascular", "Estimates major bleeding risk in anticoagulated atrial fibrillation patients.", "Higher score identifies modifiable bleeding risk and need for closer follow-up.", "Do not use bleeding risk alone to deny anticoagulation; correct modifiable risks."),
  "oxygenation-index": clinical("Oxygenation Index", "Critical Care", "Assesses oxygenation impairment using FiO₂, mean airway pressure, and PaO₂.", "Higher values suggest more severe oxygenation failure.", "Use with ventilator settings, ARDS severity, hemodynamics, and escalation planning.")
};

function clinical(title, category, clinicalMeaning, severity, nextStep) {
  return {
    title,
    category,
    clinicalMeaning,
    severity,
    nextStep,
    pearls: [
      "Confirm the calculator applies to the patient population.",
      "Check all units and decimal format before interpreting the result.",
      "Use the result as structured decision support, not as an isolated treatment order."
    ],
    pitfalls: [
      "Incorrect units or incomplete clinical data can change risk classification.",
      "Scores may underestimate atypical or rapidly deteriorating patients.",
      "Guideline thresholds should not override urgent clinical findings."
    ],
    related: ["Clinical calculators", "Risk scores", "Medical reference"]
  };
}

const defaultContent = clinical(
  "Clinical Calculator",
  "Medical Reference",
  "This calculator supports structured clinical assessment and should be interpreted with patient-specific findings, current guidelines, and local protocols.",
  "Mild, moderate, and severe categories support risk communication but do not replace clinical judgment.",
  "Review the result, confirm input accuracy, assess clinical context, and choose the next diagnostic or therapeutic step according to current standards of care."
);

const references = [
  "Original score publications and current society guidelines should be reviewed when applying calculator outputs in patient care.",
  "Calculator outputs are intended for healthcare professionals and require clinical correlation.",
  "Meddoq calculators are educational clinical decision-support tools, not substitutes for clinician judgment."
];

export default function PremiumCalculatorReference() {
  const pathname = usePathname();
  const slug = pathname?.split("/").filter(Boolean).pop();
  const data = calculatorContent[slug] || defaultContent;

  return (
    <section style={styles.wrapper} aria-label="Calculator medical reference">
      <div style={styles.container}>
        <div style={styles.header}>
          <p style={styles.kicker}>{data.category} Calculator + Medical Reference</p>
          <h2 style={styles.title}>{data.title} Clinical Guide</h2>
          <p style={styles.lead}>
            Evidence-informed interpretation, severity explanation, clinical pearls,
            common pitfalls, next-step guidance, FAQ, related calculators, and references.
          </p>
        </div>

        <div style={styles.grid}>
          <Card title="Clinical Meaning" text={data.clinicalMeaning} />
          <Card title="What do mild, moderate, and severe mean?" text={data.severity} />
          <Card title="Recommended Next Step" text={data.nextStep} />

          <article style={styles.card}>
            <h3 style={styles.cardTitle}>Clinical Pearls</h3>
            <ul style={styles.list}>{data.pearls.map((x) => <li key={x}>{x}</li>)}</ul>
          </article>

          <article style={styles.card}>
            <h3 style={styles.cardTitle}>Common Pitfalls</h3>
            <ul style={styles.list}>{data.pitfalls.map((x) => <li key={x}>{x}</li>)}</ul>
          </article>

          <article style={styles.card}>
            <h3 style={styles.cardTitle}>Related Calculators</h3>
            <div style={styles.relatedWrap}>{data.related.map((x) => <span style={styles.badge} key={x}>{x}</span>)}</div>
          </article>
        </div>

        <div style={styles.faq}>
          <h3 style={styles.cardTitle}>FAQ</h3>
          <details style={styles.detail}>
            <summary style={styles.summary}>Can this calculator be used alone to make treatment decisions?</summary>
            <p style={styles.text}>No. Calculator results should be interpreted with clinical examination, imaging, laboratory data, comorbidities, medication history, and current guidelines.</p>
          </details>
          <details style={styles.detail}>
            <summary style={styles.summary}>Why does clinical context matter?</summary>
            <p style={styles.text}>The same numerical result may have different implications depending on symptoms, frailty, renal function, bleeding risk, infection, tissue loss, or procedural urgency.</p>
          </details>
          <details style={styles.detail}>
            <summary style={styles.summary}>What should be checked before using the result?</summary>
            <p style={styles.text}>Confirm indication, input values, units, decimal format, exclusion criteria, and whether the calculator has been validated for the patient population.</p>
          </details>
        </div>

        <div style={styles.references}>
          <h3 style={styles.cardTitle}>References</h3>
          <ol style={styles.referenceList}>{references.map((x) => <li key={x}>{x}</li>)}</ol>
        </div>
      </div>
    </section>
  );
}

function Card({ title, text }) {
  return (
    <article style={styles.card}>
      <h3 style={styles.cardTitle}>{title}</h3>
      <p style={styles.text}>{text}</p>
    </article>
  );
}

const styles = {
  wrapper: { background: "linear-gradient(180deg,#f8fafc 0%,#ffffff 100%)", padding: "28px 16px 48px" },
  container: { maxWidth: 980, margin: "0 auto", fontFamily: 'Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif', color: "#0f172a" },
  header: { border: "1px solid #e2e8f0", background: "#ffffff", borderRadius: 24, padding: 28, boxShadow: "0 18px 45px rgba(15,23,42,0.06)", marginBottom: 18 },
  kicker: { margin: 0, color: "#2563eb", fontSize: 13, fontWeight: 900, letterSpacing: "0.08em", textTransform: "uppercase" },
  title: { margin: "8px 0 10px", fontSize: 32, lineHeight: 1.1, letterSpacing: "-0.03em" },
  lead: { margin: 0, color: "#475569", fontSize: 17, lineHeight: 1.7 },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 16 },
  card: { border: "1px solid #e2e8f0", background: "#ffffff", borderRadius: 22, padding: 22, boxShadow: "0 12px 32px rgba(15,23,42,0.05)" },
  cardTitle: { margin: "0 0 10px", fontSize: 18, lineHeight: 1.25, letterSpacing: "-0.01em" },
  text: { margin: 0, color: "#475569", fontSize: 15, lineHeight: 1.75 },
  list: { margin: 0, paddingLeft: 18, color: "#475569", fontSize: 15, lineHeight: 1.75 },
  relatedWrap: { display: "flex", flexWrap: "wrap", gap: 8 },
  badge: { display: "inline-flex", alignItems: "center", borderRadius: 999, padding: "8px 11px", background: "#eff6ff", color: "#1d4ed8", fontSize: 13, fontWeight: 800 },
  faq: { marginTop: 16, border: "1px solid #e2e8f0", background: "#ffffff", borderRadius: 22, padding: 22, boxShadow: "0 12px 32px rgba(15,23,42,0.05)" },
  detail: { borderTop: "1px solid #e2e8f0", padding: "14px 0" },
  summary: { cursor: "pointer", fontWeight: 900, color: "#0f172a" },
  references: { marginTop: 16, border: "1px solid #e2e8f0", background: "#ffffff", borderRadius: 22, padding: 22, boxShadow: "0 12px 32px rgba(15,23,42,0.05)" },
  referenceList: { margin: 0, paddingLeft: 18, color: "#475569", fontSize: 14, lineHeight: 1.7 }
};
