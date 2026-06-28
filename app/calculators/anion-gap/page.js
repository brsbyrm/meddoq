"use client";

import { useMemo, useState } from "react";


function n(value) {
  if (value === null || value === undefined) return 0;
  const normalized = String(value).replace(/,/g, ".");
  const parsed = parseFloat(normalized);
  return Number.isFinite(parsed) ? parsed : 0;
}


export default function Page() {
  const [na,setNa]=useState("");
  const [cl,setCl]=useState("");
  const [hco3,setHco3]=useState("");
  const [albumin,setAlbumin]=useState("");

  const result = useMemo(()=>{
    const sodium=n(na), chloride=n(cl), bicarbonate=n(hco3), alb=n(albumin);
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
            <input type="text" style={styles.input} value={na} onChange={e=>setNa(e.target.value.replace(/,/g, "."))} inputMode="decimal" pattern="[0-9]*[.,]?[0-9]*" placeholder="140"/>
          </label>

          <label style={styles.label}>Chloride Cl⁻ (mEq/L)
            <input type="text" style={styles.input} value={cl} onChange={e=>setCl(e.target.value.replace(/,/g, "."))} inputMode="decimal" pattern="[0-9]*[.,]?[0-9]*" placeholder="104"/>
          </label>

          <label style={styles.label}>Bicarbonate HCO₃⁻ (mEq/L)
            <input type="text" style={styles.input} value={hco3} onChange={e=>setHco3(e.target.value.replace(/,/g, "."))} inputMode="decimal" pattern="[0-9]*[.,]?[0-9]*" placeholder="24"/>
          </label>

          <label style={styles.label}>Albumin (g/dL) optional
            <input type="text" style={styles.input} value={albumin} onChange={e=>setAlbumin(e.target.value.replace(/,/g, "."))} inputMode="decimal" pattern="[0-9]*[.,]?[0-9]*" placeholder="4.0"/>
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


      <section style={styles.related}>
        <h2>Related calculators</h2>
        <div style={styles.relatedGrid}>
          <a href="/calculators/egfr" style={styles.relatedLink}>eGFR</a>
          <a href="/calculators/creatinine-clearance" style={styles.relatedLink}>Creatinine Clearance</a>
          <a href="/calculators/body-surface-area" style={styles.relatedLink}>Body Surface Area</a>
          <a href="/calculators/body-mass-index" style={styles.relatedLink}>BMI</a>
        </div>
      </section>


      <section style={styles.faq}>
        <h2>Frequently asked questions</h2>

        <details style={styles.faqItem}>
          <summary>Can this calculator replace clinical judgment?</summary>
          <p>No. The result should be interpreted with patient-specific findings, current guidelines and local protocols.</p>
        </details>

        <details style={styles.faqItem}>
          <summary>When should the result be used cautiously?</summary>
          <p>Use caution in unstable patients, acute illness, unusual physiology, missing data or when the score was not validated for the clinical setting.</p>
        </details>

        <details style={styles.faqItem}>
          <summary>What should be checked after calculating the score?</summary>
          <p>Review the clinical context, contraindications, trend over time, relevant imaging or laboratory data and whether specialist input is needed.</p>
        </details>
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
result:{marginTop:24,background:"linear-gradient(135deg,#f8fafc,#eff6ff)",border:"1px solid #bfdbfe",borderRadius:22,padding:24,display:"grid",gap:10,lineHeight:1.45,boxShadow:"0 18px 50px rgba(15,23,42,0.08)"},
content:{marginTop:32,lineHeight:1.7,fontSize:17}
}
