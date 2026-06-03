"use client";

import { useState } from "react";

const calculators = [
  "BSA",
  "Aortic Size Index",
  "BMI",
  "Creatinine Clearance",
  "eGFR",
  "CHA₂DS₂-VASc",
  "HAS-BLED",
  "Wells DVT",
];

export default function Home() {
  const [active, setActive] = useState("BSA");

  return (
    <main style={styles.main}>
      <section style={styles.container}>
        <h1 style={styles.logo}>Meddoq</h1>
        <p style={styles.subtitle}>Clinical calculators for modern physicians.</p>

        <div style={styles.tabs}>
          {calculators.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              style={active === c ? styles.activeTab : styles.tab}
            >
              {c}
            </button>
          ))}
        </div>

        <div style={styles.card}>
          {active === "BSA" && <BSA />}
          {active === "Aortic Size Index" && <ASI />}
          {active === "BMI" && <BMI />}
          {active === "Creatinine Clearance" && <CrCl />}
          {active === "eGFR" && <EGFR />}
          {active === "CHA₂DS₂-VASc" && <CHA />}
          {active === "HAS-BLED" && <HASBLED />}
          {active === "Wells DVT" && <WellsDVT />}
        </div>
      </section>
    </main>
  );
}

function Input({ label, value, setValue }) {
  return (
    <label style={styles.label}>
      {label}
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        style={styles.input}
        inputMode="decimal"
      />
    </label>
  );
}

function Info({ formula, interpretation, reference }) {
  return (
    <div style={styles.info}>
      <p><strong>Formula / Method:</strong> {formula}</p>
      <p><strong>Interpretation:</strong> {interpretation}</p>
      <p><strong>Reference:</strong> {reference}</p>
      <p style={styles.disclaimer}>
        Clinical use note: This tool supports clinical judgment and does not replace physician assessment.
      </p>
    </div>
  );
}

function Result({ children }) {
  return <div style={styles.result}>{children}</div>;
}

function BSA() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const bsa = height && weight ? Math.sqrt((Number(height) * Number(weight)) / 3600).toFixed(2) : "";

  return <>
    <h2>Body Surface Area</h2>
    <Input label="Height / Boy (cm)" value={height} setValue={setHeight} />
    <Input label="Weight / Kilo (kg)" value={weight} setValue={setWeight} />
    {bsa && <Result>BSA: {bsa} m²</Result>}
    <Info
      formula="Mosteller formula: √((height × weight) / 3600)"
      interpretation="Used to index cardiovascular and vascular measurements such as aortic diameter."
      reference="Mosteller RD. N Engl J Med. 1987."
    />
  </>;
}

function ASI() {
  const [diameter, setDiameter] = useState("");
  const [bsa, setBsa] = useState("");
  const asi = diameter && bsa ? (Number(diameter) / Number(bsa)).toFixed(2) : "";

  return <>
    <h2>Aortic Size Index</h2>
    <Input label="Aortic diameter / Aort çapı (cm)" value={diameter} setValue={setDiameter} />
    <Input label="BSA (m²)" value={bsa} setValue={setBsa} />
    {asi && <Result>ASI: {asi} cm/m²</Result>}
    <Info
      formula="Aortic diameter / body surface area"
      interpretation="Higher indexed aortic diameter may indicate higher relative aortic risk, especially in smaller patients."
      reference="Davies RR et al. Ann Thorac Surg. 2006."
    />
  </>;
}

function BMI() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const bmi = height && weight ? (Number(weight) / Math.pow(Number(height) / 100, 2)).toFixed(1) : "";

  return <>
    <h2>Body Mass Index</h2>
    <Input label="Height / Boy (cm)" value={height} setValue={setHeight} />
    <Input label="Weight / Kilo (kg)" value={weight} setValue={setWeight} />
    {bmi && <Result>BMI: {bmi} kg/m²</Result>}
    <Info
      formula="Weight / height²"
      interpretation="General weight classification: <18.5 underweight, 18.5–24.9 normal, 25–29.9 overweight, ≥30 obese."
      reference="World Health Organization BMI classification."
    />
  </>;
}

function CrCl() {
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [creat, setCreat] = useState("");
  const [female, setFemale] = useState(false);

  let result = "";
  if (age && weight && creat) {
    let crcl = ((140 - Number(age)) * Number(weight)) / (72 * Number(creat));
    if (female) crcl *= 0.85;
    result = crcl.toFixed(1);
  }

  return <>
    <h2>Creatinine Clearance</h2>
    <Input label="Age / Yaş" value={age} setValue={setAge} />
    <Input label="Weight / Kilo (kg)" value={weight} setValue={setWeight} />
    <Input label="Creatinine / Kreatinin (mg/dL)" value={creat} setValue={setCreat} />
    <label><input type="checkbox" checked={female} onChange={(e) => setFemale(e.target.checked)} /> Female</label>
    {result && <Result>CrCl: {result} mL/min</Result>}
    <Info
      formula="Cockcroft-Gault equation"
      interpretation="Frequently used for drug dosing and renal function estimation. Use caution in extremes of body weight."
      reference="Cockcroft DW, Gault MH. Nephron. 1976."
    />
  </>;
}

function EGFR() {
  const [age, setAge] = useState("");
  const [creat, setCreat] = useState("");
  const [female, setFemale] = useState(false);

  let result = "";
  if (age && creat) {
    const k = female ? 0.7 : 0.9;
    const alpha = female ? -0.241 : -0.302;
    let egfr = 142 * Math.pow(Math.min(Number(creat) / k, 1), alpha) *
      Math.pow(Math.max(Number(creat) / k, 1), -1.2) *
      Math.pow(0.9938, Number(age));
    if (female) egfr *= 1.012;
    result = egfr.toFixed(1);
  }

  return <>
    <h2>eGFR CKD-EPI 2021</h2>
    <Input label="Age / Yaş" value={age} setValue={setAge} />
    <Input label="Creatinine / Kreatinin (mg/dL)" value={creat} setValue={setCreat} />
    <label><input type="checkbox" checked={female} onChange={(e) => setFemale(e.target.checked)} /> Female</label>
    {result && <Result>eGFR: {result} mL/min/1.73 m²</Result>}
    <Info
      formula="CKD-EPI 2021 creatinine equation"
      interpretation="Used for chronic kidney disease staging and renal function assessment."
      reference="Inker LA et al. N Engl J Med. 2021."
    />
  </>;
}

function CHA() {
  const items = [
    ["CHF", 1], ["Hypertension", 1], ["Age ≥75", 2], ["Diabetes", 1],
    ["Stroke/TIA", 2], ["Vascular disease", 1], ["Age 65–74", 1], ["Female sex", 1]
  ];
  return (
    <Score
      title="CHA₂DS₂-VASc"
      items={items}
      formula="Point-based clinical stroke-risk score in atrial fibrillation."
      interpretation="Higher score indicates higher thromboembolic risk. Anticoagulation decisions should follow current AF guidelines."
      reference="Lip GYH et al. Chest. 2010."
    />
  );
}

function HASBLED() {
  const items = [
    ["Hypertension", 1], ["Abnormal renal/liver function", 1], ["Stroke", 1],
    ["Bleeding history", 1], ["Labile INR", 1], ["Elderly >65", 1], ["Drugs/alcohol", 1]
  ];
  return (
    <Score
      title="HAS-BLED"
      items={items}
      formula="Point-based bleeding risk score in anticoagulated AF patients."
      interpretation="A score ≥3 suggests higher bleeding risk and need for closer review of modifiable risk factors."
      reference="Pisters R et al. Chest. 2010."
    />
  );
}

function WellsDVT() {
  const items = [
    ["Active cancer", 1], ["Paralysis or immobilization", 1], ["Recently bedridden/surgery", 1],
    ["Tenderness along deep veins", 1], ["Entire leg swollen", 1], ["Calf swelling >3 cm", 1],
    ["Pitting edema", 1], ["Collateral superficial veins", 1], ["Previous DVT", 1],
    ["Alternative diagnosis as likely", -2]
  ];
  return (
    <Score
      title="Wells DVT Score"
      items={items}
      formula="Clinical prediction rule for suspected deep vein thrombosis."
      interpretation="Commonly interpreted as low, moderate or high pretest probability depending on total score and local protocol."
      reference="Wells PS et al. Lancet. 1997."
    />
  );
}

function Score({ title, items, formula, interpretation, reference }) {
  const [checked, setChecked] = useState({});

  const score = items.reduce((sum, [name, points]) => checked[name] ? sum + points : sum, 0);

  return <>
    <h2>{title}</h2>
    {items.map(([name, points]) => (
      <label key={name} style={{ display: "block", marginBottom: 10 }}>
        <input
          type="checkbox"
          checked={!!checked[name]}
          onChange={() => setChecked({ ...checked, [name]: !checked[name] })}
        />{" "}
        {name} ({points > 0 ? "+" : ""}{points})
      </label>
    ))}
    <Result>Score: {score}</Result>
    <Info formula={formula} interpretation={interpretation} reference={reference} />
  </>;
}

const styles = {
  main: {
    minHeight: "100vh",
    padding: 24,
    fontFamily: "Arial, sans-serif",
    background: "linear-gradient(135deg, #f8fafc, #eef6ff)",
    color: "#0f172a"
  },
  container: {
    maxWidth: 1100,
    margin: "0 auto"
  },
  logo: {
    fontSize: 52,
    marginBottom: 8
  },
  subtitle: {
    fontSize: 22,
    color: "#475569"
  },
  tabs: {
    display: "flex",
    gap: 10,
    flexWrap: "wrap",
    margin: "32px 0"
  },
  tab: {
    padding: "12px 16px",
    borderRadius: 12,
    border: "1px solid #cbd5e1",
    background: "white",
    color: "#0f172a",
    fontWeight: 700
  },
  activeTab: {
    padding: "12px 16px",
    borderRadius: 12,
    border: "2px solid #0f172a",
    background: "#0f172a",
    color: "white",
    fontWeight: 700
  },
  card: {
    background: "white",
    border: "1px solid #e2e8f0",
    borderRadius: 20,
    padding: 28,
    boxShadow: "0 20px 50px rgba(15,23,42,0.08)"
  },
  label: {
    display: "block",
    marginBottom: 14,
    fontWeight: 600
  },
  input: {
    display: "block",
    width: "100%",
    maxWidth: 360,
    marginTop: 6,
    padding: 12,
    borderRadius: 10,
    border: "1px solid #cbd5e1",
    fontSize: 16
  },
  result: {
    marginTop: 20,
    marginBottom: 20,
    fontSize: 24,
    fontWeight: 800,
    color: "#0f172a"
  },
  info: {
    marginTop: 22,
    padding: 18,
    borderRadius: 14,
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
    color: "#334155",
    lineHeight: 1.5
  },
  disclaimer: {
    fontSize: 13,
    color: "#64748b"
  }
};
