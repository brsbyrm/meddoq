"use client";

import { useMemo, useState } from "react";

export default function Page() {
  const [age,setAge]=useState("");
  const [bmi,setBmi]=useState("");
  const [diabetes,setDiabetes]=useState(false);
  const [ast,setAst]=useState("");
  const [alt,setAlt]=useState("");
  const [platelets,setPlatelets]=useState("");
  const [albumin,setAlbumin]=useState("");

  const result = useMemo(()=>{
    const a=Number(age),b=Number(bmi),as=Number(ast),al=Number(alt),p=Number(platelets),alb=Number(albumin);

    if(!a||!b||!as||!al||!p||!alb) return null;

    const ratio=as/al;

    const score=
      -1.675 +
      (0.037*a) +
      (0.094*b) +
      (diabetes?1.13:0) +
      (0.99*ratio) -
      (0.013*p) -
      (0.66*alb);

    let risk="Indeterminate";
    if(score<-1.455) risk="Low probability of advanced fibrosis";
    if(score>0.676) risk="High probability of advanced fibrosis";

    return {score,risk};
  },[age,bmi,diabetes,ast,alt,platelets,albumin]);

  return(
    <main style={styles.main}>
      <a href="/" style={styles.back}>← Back to Meddoq</a>

      <section style={styles.hero}>
        <p style={styles.kicker}>Hepatology Calculator</p>
        <h1>NAFLD Fibrosis Score</h1>
        <p>Estimate advanced fibrosis risk in non-alcoholic fatty liver disease.</p>
      </section>

      <section style={styles.card}>
        <div style={styles.grid}>

          <label style={styles.label}>Age
            <input style={styles.input} value={age} onChange={e=>setAge(e.target.value)} inputMode="decimal"/>
          </label>

          <label style={styles.label}>BMI (kg/m²)
            <input style={styles.input} value={bmi} onChange={e=>setBmi(e.target.value)} inputMode="decimal"/>
          </label>

          <label style={styles.label}>AST (U/L)
            <input style={styles.input} value={ast} onChange={e=>setAst(e.target.value)} inputMode="decimal"/>
          </label>

          <label style={styles.label}>ALT (U/L)
            <input style={styles.input} value={alt} onChange={e=>setAlt(e.target.value)} inputMode="decimal"/>
          </label>

          <label style={styles.label}>Platelets (10⁹/L)
            <input style={styles.input} value={platelets} onChange={e=>setPlatelets(e.target.value)} inputMode="decimal"/>
          </label>

          <label style={styles.label}>Albumin (g/dL)
            <input style={styles.input} value={albumin} onChange={e=>setAlbumin(e.target.value)} inputMode="decimal"/>
          </label>

        </div>

        <label style={styles.check}>
          <input
            type="checkbox"
            checked={diabetes}
            onChange={e=>setDiabetes(e.target.checked)}
          />
          Diabetes / impaired fasting glucose
        </label>

        <div style={styles.result}>
          <span>NAFLD Fibrosis Score</span>
          <strong>{result?result.score.toFixed(2):"—"}</strong>
          <p><b>{result?result.risk:""}</b></p>
          <p>
            Suggested cutoffs:
            &lt; −1.455 = Low risk,
            −1.455 to 0.676 = Indeterminate,
            &gt; 0.676 = High risk.
          </p>
        </div>

      </section>

      <section style={styles.content}>
        <h2>Clinical use</h2>
        <p>
          NAFLD Fibrosis Score is a validated non-invasive tool for estimating
          advanced fibrosis in metabolic dysfunction-associated fatty liver disease.
        </p>

        <h2>References</h2>
        <p>Angulo P et al. Hepatology. 2007.</p>
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
