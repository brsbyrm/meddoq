"use client";

import { useMemo, useState } from "react";

export default function Page() {
  const [age,setAge]=useState("");
  const [ast,setAst]=useState("");
  const [alt,setAlt]=useState("");
  const [platelets,setPlatelets]=useState("");

  const fib4 = useMemo(()=>{
    const a=Number(age), as=Number(ast), al=Number(alt), p=Number(platelets);
    if(!a||!as||!al||!p) return null;
    return (a*as)/(p*Math.sqrt(al));
  },[age,ast,alt,platelets]);

  const interpretation = fib4===null ? "" :
    fib4 < 1.3 ? "Low risk of advanced fibrosis" :
    fib4 <= 2.67 ? "Indeterminate risk" :
    "High risk of advanced fibrosis";

  return(
    <main style={styles.main}>
      <a href="/" style={styles.back}>← Back to Meddoq</a>

      <section style={styles.hero}>
        <p style={styles.kicker}>Hepatology Calculator</p>
        <h1>FIB-4 Index Calculator</h1>
        <p>Estimate risk of advanced liver fibrosis using age, AST, ALT and platelet count.</p>
      </section>

      <section style={styles.card}>
        <div style={styles.grid}>
          <label style={styles.label}>Age
            <input style={styles.input} value={age} onChange={e=>setAge(e.target.value)} inputMode="decimal" placeholder="55"/>
          </label>

          <label style={styles.label}>AST (U/L)
            <input style={styles.input} value={ast} onChange={e=>setAst(e.target.value)} inputMode="decimal" placeholder="45"/>
          </label>

          <label style={styles.label}>ALT (U/L)
            <input style={styles.input} value={alt} onChange={e=>setAlt(e.target.value)} inputMode="decimal" placeholder="40"/>
          </label>

          <label style={styles.label}>Platelets (10⁹/L)
            <input style={styles.input} value={platelets} onChange={e=>setPlatelets(e.target.value)} inputMode="decimal" placeholder="180"/>
          </label>
        </div>

        <div style={styles.result}>
          <span>FIB-4 Index</span>
          <strong>{fib4===null ? "—" : fib4.toFixed(2)}</strong>
          <p><b>{interpretation}</b></p>
          <p>FIB-4 is a non-invasive fibrosis risk index and should be interpreted with clinical context.</p>
        </div>
      </section>

      <section style={styles.content}>
        <h2>Clinical use</h2>
        <p>FIB-4 is used to estimate risk of advanced liver fibrosis in chronic liver disease.</p>

        <h2>Interpretation</h2>
        <p>Common adult cutoffs are &lt;1.3 for low risk and &gt;2.67 for high risk, with intermediate values requiring further assessment.</p>

        <h2>References</h2>
        <p>Sterling RK et al. Hepatology. 2006.</p>
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
