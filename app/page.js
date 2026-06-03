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
    <main style={{ minHeight: "100vh", padding: 24, fontFamily: "Arial", background: "#f8fafc" }}>
      <section style={{ maxWidth: 1100, margin: "0 auto" }}>
        <h1 style={{ fontSize: 52, marginBottom: 8 }}>Meddoq</h1>
        <p style={{ fontSize: 22, color: "#475569" }}>
          Clinical calculators for modern physicians.
        </p>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", margin: "32px 0" }}>
          {calculators.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              style={{
                padding: "12px 16px",
                borderRadius: 12,
                border: active === c ? "2px solid #0f172a" : "1px solid #cbd5e1",
                background: active === c ? "#0f172a" : "white",
                color: active === c ? "white" : "#0f172a",
                fontWeight: 700,
              }}
            >
              {c}
            </button>
          ))}
        </div>

        <div style={{
          background: "white",
          border: "1px solid #e2e8f0",
          borderRadius: 20,
          padding: 28,
          boxShadow: "0 20px 50px rgba(15,23,42,0.08)"
        }}>
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
    <label style={{ display: "block", marginBottom: 14, fontWeight: 600 }}>
      {label}
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        style={{
          display: "block",
          width: "100%",
          maxWidth: 360,
          marginTop: 6,
          padding: 12,
          borderRadius: 10,
          border: "1px solid #cbd5e1",
          fontSize: 16,
        }}
      />
    </label>
  );
}

function Result({ children }) {
  return <div style={{ marginTop: 20, fontSize: 24, fontWeight: 800 }}>{children}</div>;
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
  </>;
}

function CHA() {
  const [score, setScore] = useState(0);
  const items = [
    ["CHF", 1], ["Hypertension", 1], ["Age ≥75", 2], ["Diabetes", 1],
    ["Stroke/TIA", 2], ["Vascular disease", 1], ["Age 65–74", 1], ["Female", 1]
  ];

  return <Score title="CHA₂DS₂-VASc" items={items} score={score} setScore={setScore} />;
}

function HASBLED() {
  const [score, setScore] = useState(0);
  const items = [
    ["Hypertension", 1], ["Abnormal renal/liver function", 1], ["Stroke", 1],
    ["Bleeding history", 1], ["Labile INR", 1], ["Elderly >65", 1], ["Drugs/alcohol", 1]
  ];

  return <Score title="HAS-BLED" items={items} score={score} setScore={setScore} />;
}

function WellsDVT() {
  const [score, setScore] = useState(0);
  const items = [
    ["Active cancer", 1], ["Paralysis or immobilization", 1], ["Recently bedridden/surgery", 1],
    ["Tenderness along deep veins", 1], ["Entire leg swollen", 1], ["Calf swelling >3 cm", 1],
    ["Pitting edema", 1], ["Collateral superficial veins", 1], ["Previous DVT", 1],
    ["Alternative diagnosis as likely", -2]
  ];

  return <Score title="Wells DVT Score" items={items} score={score} setScore={setScore} />;
}

function Score({ title, items, score, setScore }) {
  const [checked, setChecked] = useState({});

  function toggle(name, points) {
    const isChecked = !checked[name];
    setChecked({ ...checked, [name]: isChecked });
    setScore(score + (isChecked ? points : -points));
  }

  return <>
    <h2>{title}</h2>
    {items.map(([name, points]) => (
      <label key={name} style={{ display: "block", marginBottom: 10 }}>
        <input type="checkbox" checked={!!checked[name]} onChange={() => toggle(name, points)} />{" "}
        {name} ({points > 0 ? "+" : ""}{points})
      </label>
    ))}
    <Result>Score: {score}</Result>
  </>;
}
