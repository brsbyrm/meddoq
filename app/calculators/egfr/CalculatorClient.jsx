"use client";

import { useMemo, useState } from "react";

const calculators = {
  "aortic-size-index": {
    title: "Aortic Size Index Calculator",
    category: "Vascular",
    description: "Calculate ASI using aortic diameter indexed to body surface area.",
  },
  egfr: {
    title: "eGFR Calculator",
    category: "Renal",
    description: "Estimate eGFR using the CKD-EPI 2021 creatinine equation.",
  },
  "creatinine-clearance": {
    title: "Creatinine Clearance Calculator",
    category: "Renal",
    description: "Estimate creatinine clearance using the Cockcroft-Gault equation.",
  },
  "body-surface-area": {
    title: "Body Surface Area Calculator",
    category: "General",
    description: "Calculate BSA using the Mosteller formula.",
  },
  "body-mass-index": {
    title: "BMI Calculator",
    category: "General",
    description: "Calculate body mass index and weight category.",
  },
  "cha2ds2-vasc": {
    title: "CHA₂DS₂-VASc Calculator",
    category: "Cardiovascular",
    description: "Estimate thromboembolic risk in atrial fibrillation.",
  },
  "has-bled": {
    title: "HAS-BLED Calculator",
    category: "Cardiovascular",
    description: "Assess bleeding risk in atrial fibrillation.",
  },
  "wells-dvt": {
    title: "Wells DVT Calculator",
    category: "Vascular",
    description: "Estimate pretest probability of deep vein thrombosis.",
  },
};

export default function CalculatorClient({ slug }) {
  const item = calculators[slug];

  if (!item) return <div>Calculator not found.</div>;

  return (
    <main style={styles.main}>
      <a href="/" style={styles.back}>← Back to Meddoq</a>

      <section style={styles.hero}>
        <p style={styles.kicker}>{item.category} Calculator</p>
        <h1>{item.title}</h1>
        <p>{item.description}</p>
      </section>

      <section style={styles.card}>
        {slug === "aortic-size-index" && <ASI />}
        {slug === "egfr" && <EGFR />}
        {slug === "creatinine-clearance" && <CrCl />}
        {slug === "body-surface-area" && <BSA />}
        {slug === "body-mass-index" && <BMI />}
        {slug === "cha2ds2-vasc" && <Score title="CHA₂DS₂-VASc" />}
        {slug === "has-bled" && <Score title="HAS-BLED" />}
        {slug === "wells-dvt" && <Score title="Wells DVT Score" />}
      </section>

      <section style={styles.content}>
        <h2>Clinical use</h2>
        <p>
          This calculator is intended for healthcare professionals and should be interpreted
          together with clinical judgment, local protocols and current guideline recommendations.
        </p>

        <h2>Limitations</h2>
        <p>
          Calculator results should not be used as standalone treatment decisions. Always consider
          patient-specific factors, comorbidities, medication history and clinical context.
        </p>

        <h2>References</h2>
        <p>
          Relevant clinical score publications and guideline frameworks should be reviewed when
          applying this result in practice.
        </p>
      </section>
    </main>
  );
}

function Input({ label, value, setValue, placeholder }) {
  return (
    <label style={styles.label}>
      {label}
      <input style={styles.input} value={value} onChange={(e) => setValue(e.target.value)} placeholder={placeholder || ""} inputMode="decimal" />
    </label>
  );
}

function Result({ title, value, unit }) {
  return (
    <div style={styles.result}>
      <span>{title}</span>
      <strong>{value} {unit}</strong>
    </div>
  );
}

function ASI() {
  const [diameter, setDiameter] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");

  const bsa = useMemo(() => height && weight ? Math.sqrt((Number(height) * Number(weight)) / 3600).toFixed(2) : "", [height, weight]);
  const asi = useMemo(() => diameter && bsa ? (Number(diameter) / Number(bsa)).toFixed(2) : "", [diameter, bsa]);

  return (
    <>
      <div style={styles.grid}>
        <Input label="Aortic diameter (cm)" value={diameter} setValue={setDiameter} placeholder="4.5" />
        <Input label="Height (cm)" value={height} setValue={setHeight} placeholder="183" />
        <Input label="Weight (kg)" value={weight} setValue={setWeight} placeholder="80" />
      </div>
      {bsa && <p style={styles.inline}>Calculated BSA: <strong>{bsa} m²</strong></p>}
      {asi && <Result title="Aortic Size Index" value={asi} unit="cm/m²" />}
    <section style={styles.reference}>
          <div style={styles.referenceHeader}>
            <p style={styles.referenceKicker}>Clinical Reference</p>
            <h2 style={styles.referenceTitle}>eGFR Clinical Reference</h2>
            <p style={styles.referenceIntro}>
              Estimated glomerular filtration rate supports chronic kidney disease staging, renal medication dosing decisions, and longitudinal kidney function monitoring.
            </p>
          </div>

          <div style={styles.referenceGrid}>
            <article style={styles.referenceCard}>
              <h3>When to use</h3>
              <p>
                Use eGFR to estimate kidney function in adults when serum creatinine-based renal assessment is clinically appropriate.
              </p>
            </article>

            <article style={styles.referenceCard}>
              <h3>How to interpret</h3>
              <p>
                Lower eGFR values indicate reduced kidney filtration. CKD interpretation requires persistence over time and assessment of albuminuria or other kidney damage markers.
              </p>
            </article>

            <article style={styles.referenceCard}>
              <h3>Clinical limitations</h3>
              <p>
                Creatinine-based eGFR may be less reliable in extremes of muscle mass, amputation, pregnancy, acute kidney injury, malnutrition, edema, or rapidly changing renal function.
              </p>
            </article>

            <article style={styles.referenceCard}>
              <h3>Next clinical step</h3>
              <p>
                Interpret with creatinine trend, urine albumin-creatinine ratio, medications, volume status, imaging, comorbidities, and nephrology referral thresholds when appropriate.
              </p>
            </article>
          </div>

          <div style={styles.faqBox}>
            <h3>FAQ</h3>
            <details style={styles.detail}>
              <summary>Does one low eGFR diagnose CKD?</summary>
              <p>No. CKD generally requires decreased kidney function or kidney damage markers persisting for at least 3 months.</p>
            </details>
            <details style={styles.detail}>
              <summary>Is eGFR accurate during acute kidney injury?</summary>
              <p>No. eGFR equations assume relatively steady-state creatinine and can be misleading when creatinine is changing rapidly.</p>
            </details>
            <details style={styles.detail}>
              <summary>Should albuminuria be assessed?</summary>
              <p>Yes. Albuminuria improves risk stratification and is central to CKD staging and prognosis.</p>
            </details>
          </div>

          <div style={styles.referencesBox}>
            <h3>References</h3>
            <ol>
              <li>Inker LA et al. New creatinine- and cystatin C-based equations to estimate GFR without race. N Engl J Med. 2021.</li>
              <li>KDIGO Clinical Practice Guideline for the Evaluation and Management of Chronic Kidney Disease.</li>
              <li>Levey AS et al. A new equation to estimate glomerular filtration rate. Ann Intern Med. 2009.</li>
            </ol>
          </div>
        </section>
      </>
  );
}

function EGFR() {
  const [age, setAge] = useState("");
  const [creat, setCreat] = useState("");
  const [female, setFemale] = useState(false);

  const egfr = useMemo(() => {
    if (!age || !creat) return "";
    const scr = Number(creat);
    const k = female ? 0.7 : 0.9;
    const alpha = female ? -0.241 : -0.302;
    let value = 142 * Math.pow(Math.min(scr / k, 1), alpha) * Math.pow(Math.max(scr / k, 1), -1.2) * Math.pow(0.9938, Number(age));
    if (female) value *= 1.012;
    return value.toFixed(1);
  }, [age, creat, female]);

  return (
    <>
      <div style={styles.grid}>
        <Input label="Age" value={age} setValue={setAge} placeholder="65" />
        <Input label="Creatinine (mg/dL)" value={creat} setValue={setCreat} placeholder="1.2" />
      </div>
      <label style={styles.check}><input type="checkbox" checked={female} onChange={(e) => setFemale(e.target.checked)} /> Female sex</label>
      {egfr && <Result title="eGFR CKD-EPI 2021" value={egfr} unit="mL/min/1.73 m²" />}
    </>
  );
}

function CrCl() {
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [creat, setCreat] = useState("");
  const [female, setFemale] = useState(false);

  const crcl = useMemo(() => {
    if (!age || !weight || !creat) return "";
    let value = ((140 - Number(age)) * Number(weight)) / (72 * Number(creat));
    if (female) value *= 0.85;
    return value.toFixed(1);
  }, [age, weight, creat, female]);

  return (
    <>
      <div style={styles.grid}>
        <Input label="Age" value={age} setValue={setAge} placeholder="65" />
        <Input label="Weight (kg)" value={weight} setValue={setWeight} placeholder="80" />
        <Input label="Creatinine (mg/dL)" value={creat} setValue={setCreat} placeholder="1.2" />
      </div>
      <label style={styles.check}><input type="checkbox" checked={female} onChange={(e) => setFemale(e.target.checked)} /> Female sex</label>
      {crcl && <Result title="Creatinine Clearance" value={crcl} unit="mL/min" />}
    </>
  );
}

function BSA() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const bsa = useMemo(() => height && weight ? Math.sqrt((Number(height) * Number(weight)) / 3600).toFixed(2) : "", [height, weight]);

  return (
    <>
      <div style={styles.grid}>
        <Input label="Height (cm)" value={height} setValue={setHeight} placeholder="183" />
        <Input label="Weight (kg)" value={weight} setValue={setWeight} placeholder="80" />
      </div>
      {bsa && <Result title="Body Surface Area" value={bsa} unit="m²" />}
    </>
  );
}

function BMI() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const bmi = useMemo(() => height && weight ? (Number(weight) / Math.pow(Number(height) / 100, 2)).toFixed(1) : "", [height, weight]);

  return (
    <>
      <div style={styles.grid}>
        <Input label="Height (cm)" value={height} setValue={setHeight} placeholder="183" />
        <Input label="Weight (kg)" value={weight} setValue={setWeight} placeholder="80" />
      </div>
      {bmi && <Result title="Body Mass Index" value={bmi} unit="kg/m²" />}
    </>
  );
}

function Score({ title }) {
  return (
    <div style={styles.result}>
      <span>{title}</span>
      <strong>Dedicated scoring interface coming next.</strong>
    </div>
  );
}

const styles = {
  reference: {
    marginTop: 28,
    display: "grid",
    gap: 18,
  },
  referenceHeader: {
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: 24,
    padding: 24,
    boxShadow: "0 18px 44px rgba(15, 23, 42, 0.06)",
  },
  referenceKicker: {
    margin: 0,
    color: "#2563eb",
    fontWeight: 900,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    fontSize: 12,
  },
  referenceTitle: {
    margin: "8px 0",
    color: "#0f172a",
    fontSize: 30,
    letterSpacing: "-0.04em",
  },
  referenceIntro: {
    margin: 0,
    color: "#475569",
    fontSize: 16,
    lineHeight: 1.65,
  },
  referenceGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 14,
  },
  referenceCard: {
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: 20,
    padding: 18,
    boxShadow: "0 14px 34px rgba(15, 23, 42, 0.05)",
  },
  faqBox: {
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: 22,
    padding: 22,
  },
  referencesBox: {
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: 22,
    padding: 22,
    color: "#334155",
    lineHeight: 1.65,
  },
  detail: {
    borderTop: "1px solid #e2e8f0",
    padding: "12px 0",
    color: "#334155",
  },
  main: {
    maxWidth: 980,
    margin: "0 auto",
    padding: "24px",
    fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
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
  card: {
    background: "white",
    border: "1px solid #e2e8f0",
    borderRadius: 24,
    padding: 24,
    boxShadow: "0 20px 60px rgba(15,23,42,0.08)",
    marginTop: 24,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))",
    gap: 16,
  },
  label: {
    display: "grid",
    gap: 8,
    fontWeight: 800,
    color: "#334155",
  },
  input: {
    padding: "14px 16px",
    borderRadius: 14,
    border: "1px solid #cbd5e1",
    fontSize: 16,
  },
  check: {
    display: "flex",
    gap: 10,
    margin: "16px 0",
    fontWeight: 800,
  },
  inline: {
    background: "#eff6ff",
    border: "1px solid #bfdbfe",
    borderRadius: 14,
    padding: 14,
    color: "#1e3a8a",
    fontWeight: 700,
  },
  result: {
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
    borderRadius: 18,
    padding: 20,
    marginTop: 20,
  },
  content: {
    marginTop: 32,
    lineHeight: 1.7,
    fontSize: 17,
  },
};
