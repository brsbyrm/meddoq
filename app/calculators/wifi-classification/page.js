"use client";

import { useMemo, useState } from "react";

const wound = [
  "0 - No ulcer",
  "1 - Small shallow ulcer",
  "2 - Deeper ulcer with exposed tendon/joint",
  "3 - Extensive ulcer or gangrene",
];

const ischemia = [
  "0 - ABI ≥0.80 / TP ≥60",
  "1 - Mild ischemia",
  "2 - Moderate ischemia",
  "3 - Severe ischemia",
];

const infection = [
  "0 - None",
  "1 - Mild infection",
  "2 - Moderate infection",
  "3 - Severe systemic infection",
];

export default function Page() {
  const [w,setW]=useState(0);
  const [i,setI]=useState(0);
  const [f,setF]=useState(0);

  const score = useMemo(()=>Number(w)+Number(i)+Number(f),[w,i,f]);

  const stage = useMemo(()=>{
    if(score<=2) return "Stage 1 — Very low amputation risk";
    if(score<=4) return "Stage 2 — Low risk";
    if(score<=6) return "Stage 3 — Moderate risk";
    if(score<=8) return "Stage 4 — High risk";
    return "Stage 5 — Very high risk";
  },[score]);

  return(
    <main style={styles.main}>
      <a href="/" style={styles.back}>← Back to Meddoq</a>

      <section style={styles.hero}>
        <p style={styles.kicker}>CLTI Calculator</p>
        <h1>WIfI Classification</h1>
        <p>Wound • Ischemia • foot Infection classification for chronic limb-threatening ischemia.</p>
      </section>

      <section style={styles.card}>

        <label style={styles.label}>
          Wound
          <select style={styles.input} value={w} onChange={e=>setW(e.target.value)}>
            {wound.map((x,n)=><option key={n} value={n}>{x}</option>)}
          </select>
        </label>

        <label style={styles.label}>
          Ischemia
          <select style={styles.input} value={i} onChange={e=>setI(e.target.value)}>
            {ischemia.map((x,n)=><option key={n} value={n}>{x}</option>)}
          </select>
        </label>

        <label style={styles.label}>
          Foot infection
          <select style={styles.input} value={f} onChange={e=>setF(e.target.value)}>
            {infection.map((x,n)=><option key={n} value={n}>{x}</option>)}
          </select>
        </label>

        <div style={styles.result}>
          <span>Total WIfI Score</span>
          <strong>{score}</strong>
          <p><b>{stage}</b></p>
          <p>
            WIfI should be interpreted together with arterial anatomy,
            patient comorbidity and feasibility of revascularization.
          </p>
        </div>

      </section>

      <section style={styles.content}>
        <h2>Clinical use</h2>
        <p>
          WIfI classification estimates amputation risk and expected
          benefit from revascularization in chronic limb-threatening ischemia.
        </p>

        <h2>Reference</h2>
        <p>Mills JL Jr. J Vasc Surg. 2014.</p>
      </section>

    </main>
  );
}

const styles={
main:{maxWidth:980,margin:"0 auto",padding:24,fontFamily:"Inter,system-ui,sans-serif",color:"#0f172a"},
back:{color:"#2563eb",fontWeight:800,textDecoration:"none"},
hero:{marginTop:32,background:"linear-gradient(135deg,#fff,#eff6ff)",border:"1px solid #dbeafe",borderRadius:28,padding:40},
kicker:{color:"#2563eb",fontWeight:900,fontSize:12,textTransform:"uppercase"},
card:{marginTop:24,background:"#fff",border:"1px solid #e2e8f0",borderRadius:24,padding:24,display:"grid",gap:18},
label:{display:"grid",gap:8,fontWeight:700},
input:{padding:14,borderRadius:12,border:"1px solid #cbd5e1"},
result:{background:"#eff6ff",padding:20,borderRadius:18,border:"1px solid #bfdbfe"},
content:{marginTop:32,lineHeight:1.7,fontSize:17}
}
