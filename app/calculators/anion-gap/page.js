"use client";

import { useMemo, useState } from "react";

export default function Page() {
  const [na,setNa]=useState("");
  const [cl,setCl]=useState("");
  const [hco3,setHco3]=useState("");
  const [albumin,setAlbumin]=useState("");

  const result = useMemo(()=>{
    const sodium=Number(na), chloride=Number(cl), bicarbonate=Number(hco3), alb=Number(albumin);
    if(!sodium||!chloride||!bicarbonate) return null;

    const ag = sodium - (chloride + bicarbonate);
    const corrected = alb ? ag + (2.5 * (4 - alb)) : null;

    return { ag, corrected };
  },[na,cl,hco3,albumin]);

  const interpretation = !result ? "" :
    (result.corrected ?? result.ag) > 12 ? "High anion gap" :
    (result.corrected ?? result.ag) < 8 ? "Low anion gap" :
    "Normal anion gap";

  return(
    <main style={styles.main}>
      <a href="/" style={styles.back}>← Back to Meddoq</a>

      <section style={styles.hero}>
        <p style={styles.kicker}>Renal / Acid-Base Calculator</p>
        <h1>Anion Gap Calculator</h1>
        <p>Calculate serum anion gap and albumin-corrected anion gap.</p>
      </section>

      <section style={styles.card}>
        <div style={styles.grid}>
          <label style={styles.label}>Sodium Na⁺ (mEq/L)
            <input style={styles.input} value={na} onChange={e=>setNa(e.target.value)} inputMode="decimal" placeholder="140"/>
          </label>

          <label style={styles.label}>Chloride Cl⁻ (mEq/L)
            <input style={styles.input} value={cl} onChange={e=>setCl(e.target.value)} inputMode="decimal" placeholder="104"/>
          </label>

          <label style={styles.label}>Bicarbonate HCO₃⁻ (mEq/L)
            <input style={styles.input} value={hco3} onChange={e=>setHco3(e.target.value)} inputMode="decimal" placeholder="24"/>
          </label>

          <label style={styles.label}>Albumin (g/dL) optional
            <input style={styles.input} value={albumin} onChange={e=>setAlbumin(e.target.value)} inputMode="decimal" placeholder="4.0"/>
          </label>
        </div>

        <div style={styles.result}>
          <span>Anion Gap</span>
          <strong>{result ? result.ag.toFixed(1) : "—"} mEq/L</strong>
          <p><b>{interpretation}</b></p>
          {result && result.corrected !== null && (
            <p>Albumin-corrected anion gap: <b>{result.corrected.toFixed(1)} mEq/L</b></p>
          )}
          <p>Albumin correction is useful because hypoalbuminemia may lower the measured anion gap.</p>
        </div>
      </section>

      <section style={styles.content}>
        <h2>Formula</h2>
        <p><strong>Anion gap = Na⁺ − (Cl⁻ + HCO₃⁻)</strong></p>
        <p><strong>Corrected AG = AG + 2.5 × (4 − albumin)</strong></p>

        <h2>Clinical use</h2>
        <p>
          Anion gap helps classify metabolic acidosis and should be interpreted with pH, lactate,
          ketones, renal function, toxic exposure history and clinical context.
        </p>

        <h2>References</h2>
        <p>Emmett M, Narins RG. Medicine. 1977.</p>
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
