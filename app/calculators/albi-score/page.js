"use client";

import { useMemo, useState } from "react";


function n(value) {
  if (value === null || value === undefined) return 0;
  const normalized = String(value).replace(/,/g, ".");
  const parsed = parseFloat(normalized);
  return Number.isFinite(parsed) ? parsed : 0;
}


export default function Page() {
  const [bilirubin,setBilirubin]=useState("");
  const [albumin,setAlbumin]=useState("");

  const result = useMemo(()=>{
    const biliMg=n(bilirubin), albG=n(albumin);
    if(!biliMg||!albG) return null;

    const biliUmol = biliMg * 17.1;
    const albGL = albG * 10;
    const score = (Math.log10(biliUmol) * 0.66) + (albGL * -0.085);

    let grade = "ALBI Grade 1";
    if(score > -1.39) grade = "ALBI Grade 3";
    else if(score > -2.60) grade = "ALBI Grade 2";

    return { score, grade };
  },[bilirubin,albumin]);

  return(
    <main style={styles.main}>
      <a href="/" style={styles.back}>← Back to Meddoq</a>

      <section style={styles.hero}>
        <p style={styles.kicker}>Hepatology Calculator</p>
        <h1>ALBI Score Calculator</h1>
        <p>Assess liver function using albumin and bilirubin.</p>
      </section>

      <section style={styles.card}>
        <div style={styles.grid}>
          <label style={styles.label}>Bilirubin (mg/dL)
            <input type="text" style={styles.input} value={bilirubin} onChange={e=>setBilirubin(e.target.value.replace(/,/g, "."))} inputMode="decimal" pattern="[0-9]*[.,]?[0-9]*" placeholder="1.2"/>
          </label>

          <label style={styles.label}>Albumin (g/dL)
            <input type="text" style={styles.input} value={albumin} onChange={e=>setAlbumin(e.target.value.replace(/,/g, "."))} inputMode="decimal" pattern="[0-9]*[.,]?[0-9]*" placeholder="3.5"/>
          </label>
        </div>

        <div style={styles.result}>
          <span>ALBI Score</span>
          <strong>{result ? result.score.toFixed(2) : "—"}</strong>
          <p><b>{result ? result.grade : ""}</b></p>
          <p>ALBI grade estimates liver function using objective laboratory values.</p>
        </div>
      </section>

      <section style={styles.content}>
        <h2>Clinical use</h2>
        <p>ALBI score is used to assess liver function, particularly in hepatocellular carcinoma and chronic liver disease.</p>

        <h2>Formula</h2>
        <p><strong>ALBI = log10 bilirubin × 0.66 + albumin × -0.085</strong></p>

        <h2>References</h2>
        <p>Johnson PJ et al. J Clin Oncol. 2015.</p>
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
