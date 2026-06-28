"use client";

import { useMemo, useState } from "react";

function minOne(value) {
  const n = Number(value);
  if (!n || n < 1) return 1;
  return n;
}

function clamp(value, low, high) {
  return Math.max(low, Math.min(high, value));
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
    const na = clamp(Number(sodium || 137),125,137);

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
            <input style={styles.input} value={bilirubin} onChange={e=>setBilirubin(e.target.value)} inputMode="decimal" placeholder="2.0"/>
          </label>

          <label style={styles.label}>INR
            <input style={styles.input} value={inr} onChange={e=>setInr(e.target.value)} inputMode="decimal" placeholder="1.5"/>
          </label>

          <label style={styles.label}>Creatinine (mg/dL)
            <input style={styles.input} value={creatinine} onChange={e=>setCreatinine(e.target.value)} inputMode="decimal" placeholder="1.2"/>
          </label>

          <label style={styles.label}>Sodium (mEq/L)
            <input style={styles.input} value={sodium} onChange={e=>setSodium(e.target.value)} inputMode="decimal" placeholder="135"/>
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
result:{marginTop:24,background:"#eff6ff",padding:20,borderRadius:18,border:"1px solid #bfdbfe"},
content:{marginTop:32,lineHeight:1.7,fontSize:17}
}
