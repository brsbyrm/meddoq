"use client";

import { useMemo, useState } from "react";


function n(value) {
  if (value === null || value === undefined) return 0;
  const normalized = String(value).replace(/,/g, ".");
  const parsed = parseFloat(normalized);
  return Number.isFinite(parsed) ? parsed : 0;
}


export default function Page() {
  const [bun,setBun]=useState("");
  const [hb,setHb]=useState("");
  const [male,setMale]=useState(true);
  const [sbp,setSbp]=useState("");
  const [pulse,setPulse]=useState("");
  const [melena,setMelena]=useState(false);
  const [syncope,setSyncope]=useState(false);
  const [hepatic,setHepatic]=useState(false);
  const [failure,setFailure]=useState(false);

  const score=useMemo(()=>{
    let s=0,b=n(bun),h=n(hb),p=n(pulse),bp=n(sbp);

    if(b>=18.2&&b<22.4)s+=2; else if(b>=22.4&&b<28)s+=3; else if(b>=28&&b<70)s+=4; else if(b>=70)s+=6;

    if(male){ if(h>=12&&h<13)s+=1; else if(h>=10&&h<12)s+=3; else if(h<10&&h>0)s+=6; }
    else { if(h>=10&&h<12)s+=1; else if(h<10&&h>0)s+=6; }

    if(bp>=100&&bp<110)s+=1; else if(bp>=90&&bp<100)s+=2; else if(bp<90&&bp>0)s+=3;

    if(p>=100)s+=1;
    if(melena)s+=1;
    if(syncope)s+=2;
    if(hepatic)s+=2;
    if(failure)s+=2;

    return s;
  },[bun,hb,male,sbp,pulse,melena,syncope,hepatic,failure]);

  return(
    <main style={styles.main}>
      <a href="/" style={styles.back}>← Back to Meddoq</a>

      <section style={styles.hero}>
        <p style={styles.kicker}>Emergency / Gastrointestinal Calculator</p>
        <h1>Glasgow-Blatchford Score Calculator</h1>
        <p>Estimate risk and need for intervention in upper gastrointestinal bleeding.</p>
      </section>

      <section style={styles.card}>
        <div style={styles.grid}>
          <label style={styles.label}>Blood urea nitrogen / Urea (mg/dL)
            <input type="text" style={styles.input} value={bun} onChange={e=>setBun(e.target.value.replace(/,/g, "."))} inputMode="decimal" pattern="[0-9]*[.,]?[0-9]*" placeholder="30"/>
          </label>

          <label style={styles.label}>Hemoglobin (g/dL)
            <input type="text" style={styles.input} value={hb} onChange={e=>setHb(e.target.value.replace(/,/g, "."))} inputMode="decimal" pattern="[0-9]*[.,]?[0-9]*" placeholder="11.5"/>
          </label>

          <label style={styles.label}>Systolic blood pressure (mmHg)
            <input type="text" style={styles.input} value={sbp} onChange={e=>setSbp(e.target.value.replace(/,/g, "."))} inputMode="decimal" pattern="[0-9]*[.,]?[0-9]*" placeholder="110"/>
          </label>

          <label style={styles.label}>Pulse (bpm)
            <input type="text" style={styles.input} value={pulse} onChange={e=>setPulse(e.target.value.replace(/,/g, "."))} inputMode="decimal" pattern="[0-9]*[.,]?[0-9]*" placeholder="105"/>
          </label>
        </div>

        <label style={styles.check}><input type="checkbox" checked={male} onChange={e=>setMale(e.target.checked)}/> Male sex</label>
        <label style={styles.check}><input type="checkbox" checked={melena} onChange={e=>setMelena(e.target.checked)}/> Melena</label>
        <label style={styles.check}><input type="checkbox" checked={syncope} onChange={e=>setSyncope(e.target.checked)}/> Syncope</label>
        <label style={styles.check}><input type="checkbox" checked={hepatic} onChange={e=>setHepatic(e.target.checked)}/> Hepatic disease</label>
        <label style={styles.check}><input type="checkbox" checked={failure} onChange={e=>setFailure(e.target.checked)}/> Cardiac failure</label>

        <div style={styles.result}>
          <span>Glasgow-Blatchford Score</span>
          <strong>{score}</strong>
          <p><b>{score===0 ? "Very low risk" : score<=5 ? "Lower risk" : "High risk"}</b></p>
          <p>
            {score===0
              ? "Score 0 may identify very low-risk patients in appropriate clinical settings."
              : "Higher scores indicate increased likelihood of intervention, transfusion or adverse outcome."}
          </p>
        </div>
      </section>

      <section style={styles.content}>
        <h2>Clinical use</h2>
        <p>
          The Glasgow-Blatchford Score supports early risk stratification in suspected upper gastrointestinal bleeding.
        </p>

        <h2>Limitations</h2>
        <p>
          It should not replace clinical judgment, resuscitation assessment, hemodynamic evaluation or endoscopy planning.
        </p>

        <h2>References</h2>
        <p>Blatchford O et al. Lancet. 2000.</p>
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
check:{display:"flex",gap:10,marginTop:14,fontWeight:700},
result:{marginTop:24,background:"#eff6ff",padding:20,borderRadius:18,border:"1px solid #bfdbfe"},
content:{marginTop:32,lineHeight:1.7,fontSize:17}
}
