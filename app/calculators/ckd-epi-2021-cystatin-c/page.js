"use client";

import { useMemo, useState } from "react";

export default function Page() {
  const [age,setAge]=useState("");
  const [cys,setCys]=useState("");
  const [female,setFemale]=useState(false);

  const egfr = useMemo(()=>{
    const a=Number(age), c=Number(cys);
    if(!a||!c) return null;

    const k = 0.8;
    const alpha = female ? -0.499 : -0.323;
    let value =
      133 *
      Math.pow(Math.min(c/k,1), alpha) *
      Math.pow(Math.max(c/k,1), -1.328) *
      Math.pow(0.996, a);

    if(female) value *= 0.932;

    return value;
  },[age,cys,female]);

  const stage = egfr===null ? "" :
    egfr>=90 ? "G1 — Normal or high" :
    egfr>=60 ? "G2 — Mildly decreased" :
    egfr>=45 ? "G3a — Mild to moderate decrease" :
    egfr>=30 ? "G3b — Moderate to severe decrease" :
    egfr>=15 ? "G4 — Severe decrease" :
    "G5 — Kidney failure range";

  return(
    <main style={styles.main}>
      <a href="/" style={styles.back}>← Back to Meddoq</a>

      <section style={styles.hero}>
        <p style={styles.kicker}>Renal Calculator</p>
        <h1>CKD-EPI 2021 Cystatin C eGFR Calculator</h1>
        <p>Estimate glomerular filtration rate using cystatin C, age and sex.</p>
      </section>

      <section style={styles.card}>
        <div style={styles.grid}>
          <label style={styles.label}>Age
            <input style={styles.input} value={age} onChange={e=>setAge(e.target.value)} inputMode="decimal" placeholder="65"/>
          </label>

          <label style={styles.label}>Cystatin C (mg/L)
            <input style={styles.input} value={cys} onChange={e=>setCys(e.target.value)} inputMode="decimal" placeholder="1.1"/>
          </label>
        </div>

        <label style={styles.check}>
          <input type="checkbox" checked={female} onChange={e=>setFemale(e.target.checked)}/>
          Female sex
        </label>

        <div style={styles.result}>
          <span>eGFR</span>
          <strong>{egfr===null ? "—" : egfr.toFixed(1)} mL/min/1.73 m²</strong>
          <p><b>{stage}</b></p>
          <p>Cystatin C-based eGFR may be useful when creatinine-based estimates are less reliable.</p>
        </div>
      </section>

      <section style={styles.content}>
        <h2>Clinical use</h2>
        <p>
          CKD-EPI cystatin C eGFR estimates kidney function using cystatin C and may improve assessment
          in selected patients where creatinine is affected by muscle mass or diet.
        </p>

        <h2>Limitations</h2>
        <p>
          Interpret with clinical context, albuminuria, trend over time, medications and current kidney disease guidelines.
        </p>

        <h2>References</h2>
        <p>Inker LA et al. N Engl J Med. 2021.</p>
      </section>
    </main>
  )
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
