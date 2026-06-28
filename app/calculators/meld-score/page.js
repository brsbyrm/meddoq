"use client";

import { useMemo, useState } from "react";


function n(value) {
  if (value === null || value === undefined) return 0;
  const normalized = String(value).replace(/,/g, ".");
  const parsed = parseFloat(normalized);
  return Number.isFinite(parsed) ? parsed : 0;
}


function clampMin(value, min) {
  const n = n(value);
  if (!n || n < min) return min;
  return n;
}

export default function Page() {
  const [bilirubin,setBilirubin]=useState("");
  const [inr,setInr]=useState("");
  const [creatinine,setCreatinine]=useState("");
  const [dialysis,setDialysis]=useState(false);

  const score = useMemo(()=>{
    const bili = clampMin(bilirubin,1);
    const inrValue = clampMin(inr,1);
    const cr = dialysis ? 4 : Math.min(clampMin(creatinine,1),4);

    const meld = 3.78*Math.log(bili) + 11.2*Math.log(inrValue) + 9.57*Math.log(cr) + 6.43;
    return Math.round(meld);
  },[bilirubin,inr,creatinine,dialysis]);

  const risk = score < 10 ? "Lower severity" : score < 20 ? "Moderate severity" : score < 30 ? "High severity" : "Very high severity";

  return (
    <main style={styles.main}>
      <a href="/" style={styles.back}>← Back to Meddoq</a>

      <section style={styles.hero}>
        <p style={styles.kicker}>Hepatology Calculator</p>
        <h1>MELD Score Calculator</h1>
        <p>Estimate liver disease severity using bilirubin, INR and creatinine.</p>
      </section>

      <section style={styles.card}>
        <div style={styles.grid}>
          <label style={styles.label}>Bilirubin (mg/dL)
            <input type="text" style={styles.input} value={bilirubin} onChange={e=>setBilirubin(e.target.value.replace(/,/g, "."))} inputMode="decimal" pattern="[0-9]*[.,]?[0-9]*" placeholder="2.0"/>
          </label>

          <label style={styles.label}>INR
            <input type="text" style={styles.input} value={inr} onChange={e=>setInr(e.target.value.replace(/,/g, "."))} inputMode="decimal" pattern="[0-9]*[.,]?[0-9]*" placeholder="1.5"/>
          </label>

          <label style={styles.label}>Creatinine (mg/dL)
            <input type="text" style={styles.input} value={creatinine} onChange={e=>setCreatinine(e.target.value.replace(/,/g, "."))} inputMode="decimal" pattern="[0-9]*[.,]?[0-9]*" placeholder="1.2"/>
          </label>
        </div>

        <label style={styles.check}>
          <input type="checkbox" checked={dialysis} onChange={e=>setDialysis(e.target.checked)}/>
          Dialysis at least twice in the past week
        </label>

        <div style={styles.result}>
          <span>MELD Score</span>
          <strong>{score}</strong>
          <p><b>{risk}</b></p>
          <p>Higher MELD scores indicate more severe liver dysfunction and higher short-term mortality risk.</p>
        </div>
      </section>

      <section style={styles.content}>
        <h2>Clinical use</h2>
        <p>MELD estimates severity of chronic liver disease and supports transplant prioritization and perioperative risk assessment.</p>

        <h2>Formula note</h2>
        <p>Values below 1 are rounded to 1. Creatinine is capped at 4 mg/dL; dialysis is treated as creatinine 4 mg/dL.</p>

        <h2>References</h2>
        <p>Malinchoc M et al. Hepatology. 2000. Kamath PS et al. Hepatology. 2001.</p>
      </section>
    </main>
  );
}

const styles={
main:{maxWidth:980,margin:"0 auto",padding:24,fontFamily:"Inter,system-ui,sans-serif",color:"#0f172a"},
back:{color:"#2563eb",fontWeight:800,textDecoration:"none"},
hero:{marginTop:32,background:"linear-gradient(135deg,#fff,#eff6ff)",border:"1px solid #dbeafe",borderRadius:28,padding:40},
kicker:{color:"#2563eb",fontWeight:900,fontSize:12,textTransform:"uppercase"},
card:{marginTop:24,background:"#fff",border:"1px solid #e2e8f0",borderRadius:24,padding:24},
grid:{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(min(100%,220px),1fr))",gap:16},
label:{display:"grid",gap:8,fontWeight:700},
input:{padding:14,borderRadius:12,border:"1px solid #cbd5e1"},
check:{display:"flex",gap:10,marginTop:18,fontWeight:700},
result:{marginTop:24,background:"#eff6ff",padding:20,borderRadius:18,border:"1px solid #bfdbfe"},
content:{marginTop:32,lineHeight:1.7,fontSize:17}
}
