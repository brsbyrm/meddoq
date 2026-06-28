"use client";

import { useMemo, useState } from "react";

const ageOptions = [
  { label: "<60 years", points: 0 },
  { label: "60–79 years", points: 1 },
  { label: "≥80 years", points: 2 },
];

const shockOptions = [
  { label: "No shock", points: 0 },
  { label: "Tachycardia only", points: 1 },
  { label: "Hypotension", points: 2 },
];

const comorbidityOptions = [
  { label: "No major comorbidity", points: 0 },
  { label: "Cardiac failure / ischemic heart disease / major comorbidity", points: 2 },
  { label: "Renal failure / liver failure / disseminated malignancy", points: 3 },
];

const diagnosisOptions = [
  { label: "Mallory-Weiss tear / no lesion / no stigmata", points: 0 },
  { label: "All other diagnoses", points: 1 },
  { label: "Upper GI malignancy", points: 2 },
];

const stigmataOptions = [
  { label: "None or dark spot only", points: 0 },
  { label: "Blood in upper GI tract / adherent clot / visible or spurting vessel", points: 2 },
];

function risk(score) {
  if (score <= 2) return "Low risk";
  if (score <= 4) return "Intermediate risk";
  return "High risk";
}

export default function Page() {
  const [age,setAge]=useState(0);
  const [shock,setShock]=useState(0);
  const [comorbidity,setComorbidity]=useState(0);
  const [diagnosis,setDiagnosis]=useState(0);
  const [stigmata,setStigmata]=useState(0);

  const score = useMemo(
    () => Number(age)+Number(shock)+Number(comorbidity)+Number(diagnosis)+Number(stigmata),
    [age,shock,comorbidity,diagnosis,stigmata]
  );

  return (
    <main style={styles.main}>
      <a href="/" style={styles.back}>← Back to Meddoq</a>

      <section style={styles.hero}>
        <p style={styles.kicker}>Gastrointestinal Calculator</p>
        <h1>Rockall Score Calculator</h1>
        <p>Estimate risk after upper gastrointestinal bleeding using clinical and endoscopic criteria.</p>
      </section>

      <section style={styles.card}>
        <label style={styles.label}>Age
          <select style={styles.input} value={age} onChange={e=>setAge(e.target.value)}>
            {ageOptions.map(o=><option key={o.label} value={o.points}>{o.points} — {o.label}</option>)}
          </select>
        </label>

        <label style={styles.label}>Shock
          <select style={styles.input} value={shock} onChange={e=>setShock(e.target.value)}>
            {shockOptions.map(o=><option key={o.label} value={o.points}>{o.points} — {o.label}</option>)}
          </select>
        </label>

        <label style={styles.label}>Comorbidity
          <select style={styles.input} value={comorbidity} onChange={e=>setComorbidity(e.target.value)}>
            {comorbidityOptions.map(o=><option key={o.label} value={o.points}>{o.points} — {o.label}</option>)}
          </select>
        </label>

        <label style={styles.label}>Diagnosis
          <select style={styles.input} value={diagnosis} onChange={e=>setDiagnosis(e.target.value)}>
            {diagnosisOptions.map(o=><option key={o.label} value={o.points}>{o.points} — {o.label}</option>)}
          </select>
        </label>

        <label style={styles.label}>Major stigmata of recent hemorrhage
          <select style={styles.input} value={stigmata} onChange={e=>setStigmata(e.target.value)}>
            {stigmataOptions.map(o=><option key={o.label} value={o.points}>{o.points} — {o.label}</option>)}
          </select>
        </label>

        <div style={styles.result}>
          <span>Rockall Score</span>
          <strong>{score}</strong>
          <p><b>{risk(score)}</b></p>
          <p>Higher scores indicate higher risk of rebleeding and mortality after upper GI bleeding.</p>
        </div>
      </section>

      <section style={styles.content}>
        <h2>Clinical use</h2>
        <p>The Rockall Score supports risk stratification after upper gastrointestinal bleeding.</p>

        <h2>Limitations</h2>
        <p>Interpret with hemodynamic status, endoscopic findings, comorbidities and local protocols.</p>

        <h2>References</h2>
        <p>Rockall TA et al. Gut. 1996.</p>
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
