"use client";

import { useMemo, useState } from "react";

export default function Page() {
  const [ast,setAst]=useState("");
  const [uln,setUln]=useState("");
  const [platelets,setPlatelets]=useState("");

  const apri = useMemo(()=>{
    const a=Number(ast), u=Number(uln), p=Number(platelets);
    if(!a||!u||!p) return null;
    return ((a/u)/p)*100;
  },[ast,uln,platelets]);

  const interpretation = apri===null ? "" :
    apri < 0.5 ? "Low probability of significant fibrosis" :
    apri <= 1.5 ? "Indeterminate range" :
    "Higher probability of significant fibrosis";

  return(
    <main style={styles.main}>
      <a href="/" style={styles.back}>← Back to Meddoq</a>

      <section style={styles.hero}>
        <p style={styles.kicker}>Hepatology Calculator</p>
        <h1>APRI Score Calculator</h1>
        <p>Estimate liver fibrosis risk using AST, AST upper limit of normal and platelet count.</p>
      </section>

      <section style={styles.card}>
        <div style={styles.grid}>
          <label style={styles.label}>AST (U/L)
            <input style={styles.input} value={ast} onChange={e=>setAst(e.target.value)} inputMode="decimal" placeholder="60"/>
          </label>

          <label style={styles.label}>AST upper limit of normal (U/L)
            <input style={styles.input} value={uln} onChange={e=>setUln(e.target.value)} inputMode="decimal" placeholder="40"/>
          </label>

          <label style={styles.label}>Platelets (10⁹/L)
            <input style={styles.input} value={platelets} onChange={e=>setPlatelets(e.target.value)} inputMode="decimal" placeholder="150"/>
          </label>
        </div>

        <div style={styles.result}>
          <span>APRI Score</span>
          <strong>{apri===null ? "—" : apri.toFixed(2)}</strong>
          <p><b>{interpretation}</b></p>
          <p>APRI is a non-invasive liver fibrosis index and should be interpreted with clinical context.</p>
        </div>
      </section>

      <section style={styles.content}>
        <h2>Clinical use</h2>
        <p>APRI can support non-invasive assessment of liver fibrosis, especially in chronic viral hepatitis and chronic liver disease.</p>

        <h2>Formula</h2>
        <p><strong>APRI = [(AST / AST ULN) / Platelets] × 100</strong></p>

        <h2>References</h2>
        <p>Wai CT et al. Hepatology. 2003.</p>
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
result:{marginTop:24,background:"#eff6ff",padding:20,borderRadius:18,border:"1px solid #bfdbfe"},
content:{marginTop:32,lineHeight:1.7,fontSize:17}
}
