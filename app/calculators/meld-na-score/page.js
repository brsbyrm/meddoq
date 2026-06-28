"use client";

import { useMemo, useState } from "react";


function n(value) {
  if (value === null || value === undefined) return 0;
  const normalized = String(value).replace(/,/g, ".");
  const parsed = parseFloat(normalized);
  return Number.isFinite(parsed) ? parsed : 0;
}


function minOne(value) {
  const parsed = parseFloat(String(value ?? "").replace(/,/g, "."));
  if (!Number.isFinite(parsed) || parsed < 1) return 1;
  return parsed;
}


function clamp(value, low, high) {
  const parsed = parseFloat(String(value ?? "").replace(/,/g, "."));
  if (!Number.isFinite(parsed)) return low;
  return Math.max(low, Math.min(high, parsed));
}


export default function Page() {
  const [bilirubin,setBilirubin]=useState("");
  const [inr,setInr]=useState("");
  const [creatinine,setCreatinine]=useState("");
  const [sodium,setSodium]=useState("");
  const [dialysis,setDialysis]=useState(false);

  const result = useMemo(()=>{
    const bili = minOne(bilirubin);
    const inrValue = minOne(inr);
    const cr = dialysis ? 4 : Math.min(minOne(creatinine),4);
    const na = clamp(n(sodium || 137),125,137);

    const meld = 3.78*Math.log(bili) + 11.2*Math.log(inrValue) + 9.57*Math.log(cr) + 6.43;
    const meldRounded = Math.round(meld);
    const meldNa = Math.round(meldRounded + 1.32*(137-na) - (0.033*meldRounded*(137-na)));

    return { meld: meldRounded, meldNa };
  },[bilirubin,inr,creatinine,sodium,dialysis]);

  const risk = result.meldNa < 10 ? "Lower severity" : result.meldNa < 20 ? "Moderate severity" : result.meldNa < 30 ? "High severity" : "Very high severity";

  return (
    <main style={styles.main}>
      <a href="/" style={styles.back}>← Back to Meddoq</a>

      <section style={styles.hero}>
        <p style={styles.kicker}>Hepatology Calculator</p>
        <h1>MELD-Na Score Calculator</h1>
        <p>Estimate liver disease severity using MELD with serum sodium adjustment.</p>
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

          <label style={styles.label}>Sodium (mEq/L)
            <input type="text" style={styles.input} value={sodium} onChange={e=>setSodium(e.target.value.replace(/,/g, "."))} inputMode="decimal" pattern="[0-9]*[.,]?[0-9]*" placeholder="135"/>
          </label>
        </div>

        <label style={styles.check}>
          <input type="checkbox" checked={dialysis} onChange={e=>setDialysis(e.target.checked)}/>
          Dialysis at least twice in the past week
        </label>

        <div style={styles.result}>
          <span>MELD-Na Score</span>
          <strong>{result.meldNa}</strong>
          <p><b>{risk}</b></p>
          <p>MELD: {result.meld}</p>
          <p>Higher MELD-Na scores indicate more severe liver dysfunction and higher short-term mortality risk.</p>
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
        <h2>Clinical use</h2>
        <p>MELD-Na incorporates serum sodium into MELD to improve short-term mortality risk estimation in cirrhosis.</p>

        <h2>Formula note</h2>
        <p>Sodium is bounded between 125 and 137 mEq/L. Values below 1 for bilirubin, INR and creatinine are rounded to 1.</p>

        <h2>References</h2>
        <p>Kim WR et al. N Engl J Med. 2008. Kamath PS et al. Hepatology. 2001.</p>
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
result:{marginTop:24,background:"linear-gradient(135deg,#f8fafc,#eff6ff)",border:"1px solid #bfdbfe",borderRadius:22,padding:24,display:"grid",gap:10,lineHeight:1.45,boxShadow:"0 18px 50px rgba(15,23,42,0.08)"},
content:{marginTop:32,lineHeight:1.7,fontSize:17}
}
