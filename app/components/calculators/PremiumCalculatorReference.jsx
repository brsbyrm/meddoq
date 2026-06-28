"use client";

import { usePathname } from "next/navigation";

const calculatorContent = {
  "rutherford-classification": {
    title: "Rutherford Classification",
    clinicalMeaning:
      "The Rutherford classification grades chronic limb ischemia from asymptomatic disease to major tissue loss. It is primarily used to describe PAD severity, communicate urgency, and guide vascular decision-making.",
    severity:
      "Mild disease generally refers to asymptomatic PAD or mild claudication. Moderate disease reflects lifestyle-limiting claudication. Severe disease includes ischemic rest pain, ulceration, gangrene, or threatened limb viability.",
    nextStep:
      "Confirm symptoms, pulse examination, ABI or toe pressure, duplex ultrasound, and anatomical imaging when revascularization is being considered.",
    pearls: [
      "Rest pain and tissue loss should not be treated as simple claudication.",
      "Always correlate Rutherford class with objective perfusion testing.",
      "Tissue loss requires wound, ischemia, infection and revascularization planning."
    ],
    pitfalls: [
      "Using Rutherford class without ABI, toe pressure, or imaging.",
      "Underestimating diabetic patients with neuropathy and silent ischemia.",
      "Calling a wound venous or traumatic without assessing arterial perfusion."
    ],
    related: ["Fontaine Classification", "WIfI Classification", "ABI Calculator", "Aortic Size Index"]
  },

  "fontaine-classification": {
    title: "Fontaine Classification",
    clinicalMeaning:
      "Fontaine classification is a symptom-based staging system for peripheral artery disease, ranging from asymptomatic disease to claudication, rest pain, and gangrene.",
    severity:
      "Stage I is asymptomatic. Stage II is claudication. Stage III is ischemic rest pain. Stage IV indicates ulceration or gangrene.",
    nextStep:
      "Use Fontaine stage together with ABI, toe pressure, duplex ultrasound, CTA, MRA, or angiography depending on clinical severity.",
    pearls: [
      "Fontaine III and IV suggest chronic limb-threatening ischemia.",
      "Claudication distance should be documented because it affects functional severity.",
      "Diabetes and renal failure may mask classic pain symptoms."
    ],
    pitfalls: [
      "Equating Fontaine II with benign disease in every patient.",
      "Ignoring tissue loss because pain is absent.",
      "Using symptom stage alone to decide revascularization."
    ],
    related: ["Rutherford Classification", "WIfI Classification", "Wells DVT", "VCSS"]
  },

  "wifi-classification": {
    title: "WIfI Classification",
    clinicalMeaning:
      "The WIfI system grades wound extent, ischemia severity, and foot infection to estimate limb threat and potential benefit from revascularization in chronic limb-threatening ischemia.",
    severity:
      "Higher wound, ischemia, and infection grades indicate higher amputation risk and more urgent need for coordinated limb-salvage care.",
    nextStep:
      "Document wound grade, obtain toe pressure or ABI when reliable, assess infection severity, and consider vascular imaging when revascularization may improve limb salvage.",
    pearls: [
      "Toe pressure is often more reliable than ABI in diabetes and calcified vessels.",
      "WIfI is most useful for threatened limbs, not routine claudication.",
      "Infection control and revascularization planning should proceed together."
    ],
    pitfalls: [
      "Using ABI alone in heavily calcified arteries.",
      "Ignoring infection grade when ischemia seems mild.",
      "Treating wound size without assessing perfusion."
    ],
    related: ["Rutherford Classification", "Fontaine Classification", "Padua Score", "Wells DVT"]
  },

  "villalta-score": {
    title: "Villalta Score",
    clinicalMeaning:
      "The Villalta score is used to assess post-thrombotic syndrome after deep vein thrombosis by combining patient symptoms and clinical signs.",
    severity:
      "Low scores suggest absent or mild post-thrombotic syndrome. Higher scores indicate moderate to severe chronic venous morbidity, especially when pain, edema, skin changes, or ulceration are present.",
    nextStep:
      "Assess venous duplex findings, compression tolerance, ulcer status, recurrence risk, and the need for specialist venous evaluation.",
    pearls: [
      "The score should be interpreted in the chronic phase after DVT.",
      "Ulceration strongly increases clinical severity.",
      "Symptoms and signs both matter; do not rely on edema alone."
    ],
    pitfalls: [
      "Scoring acute DVT symptoms as chronic post-thrombotic syndrome.",
      "Ignoring recurrent DVT or iliocaval obstruction.",
      "Not differentiating venous disease from lymphedema or heart failure."
    ],
    related: ["VCSS", "CEAP Classification", "Wells DVT", "Padua Score"]
  },

  "venous-clinical-severity-score": {
    title: "Venous Clinical Severity Score",
    clinicalMeaning:
      "VCSS quantifies chronic venous disease severity using pain, varicosities, edema, pigmentation, inflammation, induration, ulcer characteristics, and compression use.",
    severity:
      "Higher VCSS values reflect greater clinical burden, more advanced chronic venous disease, and greater need for structured venous management.",
    nextStep:
      "Combine VCSS with CEAP class, duplex ultrasound, ulcer assessment, compression strategy, and intervention planning when indicated.",
    pearls: [
      "VCSS is useful for follow-up after venous intervention.",
      "Ulcer duration and ulcer size are important severity markers.",
      "Compression use is part of the score and should be documented."
    ],
    pitfalls: [
      "Using VCSS instead of duplex ultrasound.",
      "Ignoring iliac or deep venous obstruction.",
      "Scoring skin changes without considering arterial disease."
    ],
    related: ["CEAP Classification", "Villalta Score", "Wells DVT", "Padua Score"]
  },

  "ceap-classification": {
    title: "CEAP Classification",
    clinicalMeaning:
      "CEAP describes chronic venous disease using Clinical class, Etiology, Anatomy, and Pathophysiology. It standardizes communication and documentation.",
    severity:
      "Clinical severity ranges from no visible disease to telangiectasia, varicose veins, edema, skin changes, healed ulcer, and active venous ulcer.",
    nextStep:
      "Use CEAP with venous duplex ultrasound to identify reflux, obstruction, superficial disease, deep disease, or perforator involvement.",
    pearls: [
      "CEAP is descriptive; it is not a treatment algorithm by itself.",
      "C5 and C6 disease indicate healed or active venous ulceration.",
      "Anatomic and pathophysiologic components require duplex confirmation."
    ],
    pitfalls: [
      "Writing only C class and ignoring etiology, anatomy, and pathophysiology.",
      "Assuming all ulcers are venous without arterial assessment.",
      "Failing to update CEAP after disease progression or treatment."
    ],
    related: ["VCSS", "Villalta Score", "Wells DVT", "Padua Score"]
  }
};

const defaultContent = {
  title: "Clinical Calculator",
  clinicalMeaning:
    "This calculator supports structured clinical assessment and should be interpreted together with patient-specific findings, current guidelines, and local protocols.",
  severity:
    "Mild, moderate, and severe categories are intended to support risk communication. They do not replace clinical judgment or specialist evaluation when red flags are present.",
  nextStep:
    "Review the calculated result, confirm input accuracy, assess clinical context, and choose the next diagnostic or therapeutic step according to current standards of care.",
  pearls: [
    "Always check whether the calculator applies to the patient population.",
    "Confirm units before interpreting the result.",
    "Use the result as decision support, not as a standalone treatment order."
  ],
  pitfalls: [
    "Incorrect units or decimal separators may change the result.",
    "Risk scores can underestimate unusual or high-risk presentations.",
    "Calculator thresholds should not override urgent clinical findings."
  ],
  related: ["Related calculators", "Risk scores", "Clinical references"]
};

const references = [
  "Use current society guidelines and original score publications when applying calculator outputs in patient care.",
  "Calculator outputs are intended for healthcare professionals and require clinical correlation.",
  "Meddoq calculators are educational clinical decision-support tools, not substitutes for clinician judgment."
];

export default function PremiumCalculatorReference() {
  const pathname = usePathname();
  const slug = pathname?.split("/").filter(Boolean).pop();
  const data = calculatorContent[slug] || defaultContent;

  return (
    <section style={styles.wrapper} aria-label="Premium calculator medical reference">
      <div style={styles.container}>
        <div style={styles.header}>
          <p style={styles.kicker}>Calculator + Medical Reference</p>
          <h2 style={styles.title}>{data.title} Clinical Guide</h2>
          <p style={styles.lead}>
            Evidence-informed interpretation, severity explanation, clinical pearls,
            common pitfalls, next-step guidance, related calculators, FAQ, and references.
          </p>
        </div>

        <div style={styles.grid}>
          <article style={styles.card}>
            <h3 style={styles.cardTitle}>Clinical Meaning</h3>
            <p style={styles.text}>{data.clinicalMeaning}</p>
          </article>

          <article style={styles.card}>
            <h3 style={styles.cardTitle}>What do mild, moderate, and severe mean?</h3>
            <p style={styles.text}>{data.severity}</p>
          </article>

          <article style={styles.card}>
            <h3 style={styles.cardTitle}>Recommended Next Step</h3>
            <p style={styles.text}>{data.nextStep}</p>
          </article>

          <article style={styles.card}>
            <h3 style={styles.cardTitle}>Clinical Pearls</h3>
            <ul style={styles.list}>
              {data.pearls.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article style={styles.card}>
            <h3 style={styles.cardTitle}>Common Pitfalls</h3>
            <ul style={styles.list}>
              {data.pitfalls.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article style={styles.card}>
            <h3 style={styles.cardTitle}>Related Calculators</h3>
            <div style={styles.relatedWrap}>
              {data.related.map((item) => (
                <span style={styles.badge} key={item}>{item}</span>
              ))}
            </div>
          </article>
        </div>

        <div style={styles.faq}>
          <h3 style={styles.cardTitle}>FAQ</h3>

          <details style={styles.detail}>
            <summary style={styles.summary}>Can this calculator be used alone to make treatment decisions?</summary>
            <p style={styles.text}>
              No. Calculator results should be interpreted with clinical examination,
              imaging, laboratory data, comorbidities, medication history, and current guidelines.
            </p>
          </details>

          <details style={styles.detail}>
            <summary style={styles.summary}>Why does clinical context matter?</summary>
            <p style={styles.text}>
              The same numerical result may carry different implications depending on symptoms,
              frailty, renal function, bleeding risk, limb threat, infection, or procedural urgency.
            </p>
          </details>

          <details style={styles.detail}>
            <summary style={styles.summary}>What should be checked before using the result?</summary>
            <p style={styles.text}>
              Confirm the indication, input values, units, decimal format, exclusion criteria,
              and whether the calculator has been validated for the patient population.
            </p>
          </details>
        </div>

        <div style={styles.references}>
          <h3 style={styles.cardTitle}>References</h3>
          <ol style={styles.referenceList}>
            {references.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

const styles = {
  wrapper: {
    background: "linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)",
    padding: "28px 16px 48px",
  },
  container: {
    maxWidth: 980,
    margin: "0 auto",
    fontFamily:
      'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    color: "#0f172a",
  },
  header: {
    border: "1px solid #e2e8f0",
    background: "#ffffff",
    borderRadius: 24,
    padding: 28,
    boxShadow: "0 18px 45px rgba(15, 23, 42, 0.06)",
    marginBottom: 18,
  },
  kicker: {
    margin: 0,
    color: "#2563eb",
    fontSize: 13,
    fontWeight: 800,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
  },
  title: {
    margin: "8px 0 10px",
    fontSize: 32,
    lineHeight: 1.1,
    letterSpacing: "-0.03em",
  },
  lead: {
    margin: 0,
    color: "#475569",
    fontSize: 17,
    lineHeight: 1.7,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: 16,
  },
  card: {
    border: "1px solid #e2e8f0",
    background: "#ffffff",
    borderRadius: 22,
    padding: 22,
    boxShadow: "0 12px 32px rgba(15, 23, 42, 0.05)",
  },
  cardTitle: {
    margin: "0 0 10px",
    fontSize: 18,
    lineHeight: 1.25,
    letterSpacing: "-0.01em",
  },
  text: {
    margin: 0,
    color: "#475569",
    fontSize: 15,
    lineHeight: 1.75,
  },
  list: {
    margin: 0,
    paddingLeft: 18,
    color: "#475569",
    fontSize: 15,
    lineHeight: 1.75,
  },
  relatedWrap: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
  },
  badge: {
    display: "inline-flex",
    alignItems: "center",
    borderRadius: 999,
    padding: "8px 11px",
    background: "#eff6ff",
    color: "#1d4ed8",
    fontSize: 13,
    fontWeight: 750,
  },
  faq: {
    marginTop: 16,
    border: "1px solid #e2e8f0",
    background: "#ffffff",
    borderRadius: 22,
    padding: 22,
    boxShadow: "0 12px 32px rgba(15, 23, 42, 0.05)",
  },
  detail: {
    borderTop: "1px solid #e2e8f0",
    padding: "14px 0",
  },
  summary: {
    cursor: "pointer",
    fontWeight: 800,
    color: "#0f172a",
  },
  references: {
    marginTop: 16,
    border: "1px solid #e2e8f0",
    background: "#ffffff",
    borderRadius: 22,
    padding: 22,
    boxShadow: "0 12px 32px rgba(15, 23, 42, 0.05)",
  },
  referenceList: {
    margin: 0,
    paddingLeft: 18,
    color: "#475569",
    fontSize: 14,
    lineHeight: 1.7,
  },
};
