"use client";

import { useMemo, useState } from "react";

const bilirubinOptions = [
  { label: "<2 mg/dL", points: 1 },
  { label: "2–3 mg/dL", points: 2 },
  { label: ">3 mg/dL", points: 3 },
];

const albuminOptions = [
  { label: ">3.5 g/dL", points: 1 },
  { label: "2.8–3.5 g/dL", points: 2 },
  { label: "<2.8 g/dL", points: 3 },
];

const inrOptions = [
  { label: "INR <1.7", points: 1 },
  { label: "INR 1.7–2.3", points: 2 },
  { label: "INR >2.3", points: 3 },
];

const ascitesOptions = [
  { label: "None", points: 1 },
  { label: "Mild / controlled", points: 2 },
  { label: "Moderate to severe / refractory", points: 3 },
];

const encephalopathyOptions = [
  { label: "None", points: 1 },
  { label: "Grade I–II", points: 2 },
  { label: "Grade III–IV", points: 3 },
];

function childClass(score) {
  if (score <= 6) return "Child-Pugh Class A";
  if (score <= 9) return "Child-Pugh Class B";
  return "Child-Pugh Class C";
}

export default function Page() {
  const [bilirubin,setBilirubin]=useState(1);
  const [albumin,setAlbumin]=useState(1);
  const [inr,setInr]=useState(1);
  const [ascites,setAscites]=useState(1);
  const [encephalopathy,setEncephalopathy]=useState(1);

  const score = useMemo(
    () => Number(bilirubin)+Number(albumin)+Number(inr)+Number(ascites)+Number(encephalopathy),
    [bilirubin,albumin,inr,ascites,encephalopathy]
  );

  return (
    <main style={styles.main}>
      <a href="/" style={styles.back}>← Back to Meddoq</a>

      <section style={styles.hero}>
        <p style={styles.kicker}>Hepatology Calculator</p>
        <h1>Child-Pugh Score Calculator</h1>
        <p>Estimate severity of chronic liver disease using Child-Pugh classification.</p>
      </section>

      <section style={styles.card}>
        <label style={styles.label}>Bilirubin
          <select style={styles.input} value={bilirubin} onChange={e=>setBilirubin(e.target.value)}>
            {bilirubinOptions.map(o=><option key={o.label} value={o.points}>{o.points} — {o.label}</option>)}
          </select>
        </label>

        <label style={styles.label}>Albumin
          <select style={styles.input} value={albumin} onChange={e=>setAlbumin(e.target.value)}>
            {albuminOptions.map(o=><option key={o.label} value={o.points}>{o.points} — {o.label}</option>)}
          </select>
        </label>

        <label style={styles.label}>INR
          <select style={styles.input} value={inr} onChange={e=>setInr(e.target.value)}>
            {inrOptions.map(o=><option key={o.label} value={o.points}>{o.points} — {o.label}</option>)}
          </select>
        </label>

        <label style={styles.label}>Ascites
          <select style={styles.input} value={ascites} onChange={e=>setAscites(e.target.value)}>
            {ascitesOptions.map(o=><option key={o.label} value={o.points}>{o.points} — {o.label}</option>)}
          </select>
        </label>

        <label style={styles.label}>Hepatic encephalopathy
          <select style={styles.input} value={encephalopathy} onChange={e=>setEncephalopathy(e.target.value)}>
            {encephalopathyOptions.map(o=><option key={o.label} value={o.points}>{o.points} — {o.label}</option>)}
          </select>
        </label>

        <div style={styles.result}>
          <span>Child-Pugh Score</span>
          <strong>{score}</strong>
          <p><b>{childClass(score)}</b></p>
          <p>Higher scores indicate more advanced liver dysfunction and higher perioperative risk.</p>
        </div>
      </section>

      <section style={styles.content}>
        <h2>Clinical use</h2>
        <p>Child-Pugh classification estimates severity of chronic liver disease and supports clinical risk stratification.</p>

        <h2>Interpretation</h2>
        <p>Class A is 5–6 points, Class B is 7–9 points, and Class C is 10–15 points.</p>

        <h2>References</h2>
        <p>Pugh RN et al. Br J Surg. 1973.</p>
      </section>
    </main>
  );
}

const styles={
main:{maxWidth:980,margin:"0 auto",padding:24,fontFamily:"Inter,system-ui,sans-serif",color:"#0f172a"},
back:{color:"#2563eb",fontWeight:800,textDecoration:"none"},
hero:{marginTop:32,background:"linear-gradient(135deg,#fff,#eff6ff)",border:"1px solid #dbeafe",borderRadius:28,padding:40},
kicker:{color:"#2563eb",fontWeight:900,fontSize:12,textTransform:"uppercase"},
card:{marginTop:24,background:"#fff",border:"1px solid #e2e8f0",borderRadius:24,padding:24,display:"grid",gap:16},
label:{display:"grid",gap:8,fontWeight:700},
input:{padding:14,borderRadius:12,border:"1px solid #cbd5e1"},
result:{marginTop:8,background:"#eff6ff",padding:20,borderRadius:18,border:"1px solid #bfdbfe"},
content:{marginTop:32,lineHeight:1.7,fontSize:17}
}
