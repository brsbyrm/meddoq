"use client";

import { useMemo, useState } from "react";
import NumericInput, { toNumber } from "../components/NumericInput";







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
      <NumericInput
        style={styles.input}
        value={value}
        onChange={setValue}
        placeholder={placeholder || ""}
      />
    </label>
  );
}

function Result({ title, value, unit }) {
  return (
    <div style={styles.result}>
      <span>{title}</span>
      <strong>{value} <small style={{fontSize: 14, fontWeight: 800, color: "#64748b"}}>{unit}</small></strong>
    </div>
  );
}

function ASI() {
  const [diameter, setDiameter] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");

  const bsa = useMemo(() => height && weight ? Math.sqrt((toNumber(height) * toNumber(weight)) / 3600).toFixed(2) : "", [height, weight]);
  const asi = useMemo(() => diameter && bsa ? (toNumber(diameter) / toNumber(bsa)).toFixed(2) : "", [diameter, bsa]);

  return (
    <>
      <div style={styles.grid}>
        <Input label="Aortic diameter (cm)" value={diameter} setValue={setDiameter} placeholder="4.5" />
        <Input label="Height (cm)" value={height} setValue={setHeight} placeholder="183" />
        <Input label="Weight (kg)" value={weight} setValue={setWeight} placeholder="80" />
      </div>
      {bsa && <p style={styles.inline}>Calculated BSA: <strong>{bsa} m²</strong></p>}
      {asi && <Result title="Aortic Size Index" value={asi} unit="cm/m²" />}
    </>
  );
}

function EGFR() {
  const [age, setAge] = useState("");
  const [creat, setCreat] = useState("");
  const [female, setFemale] = useState(false);

  const egfr = useMemo(() => {
    if (!age || !creat) return "";
    const scr = toNumber(creat);
    const k = female ? 0.7 : 0.9;
    const alpha = female ? -0.241 : -0.302;
    let value = 142 * Math.pow(Math.min(scr / k, 1), alpha) * Math.pow(Math.max(scr / k, 1), -1.2) * Math.pow(0.9938, toNumber(age));
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
      {egfr && <Result title="eGFR" value={egfr} unit="mL/min/1.73 m²" />}
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
    let value = ((140 - toNumber(age)) * toNumber(weight)) / (72 * toNumber(creat));
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
  const bsa = useMemo(() => height && weight ? Math.sqrt((toNumber(height) * toNumber(weight)) / 3600).toFixed(2) : "", [height, weight]);

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
  const bmi = useMemo(() => height && weight ? (toNumber(weight) / Math.pow(toNumber(height) / 100, 2)).toFixed(1) : "", [height, weight]);

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
    gridTemplateColumns: "repeat(auto-fit, minmax(mitoNumber(100%, 220px), 1fr))",
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
