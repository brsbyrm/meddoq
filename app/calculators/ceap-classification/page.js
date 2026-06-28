"use client";

import { useState } from "react";

const clinical = [
  "C0 - No visible or palpable signs",
  "C1 - Telangiectasias or reticular veins",
  "C2 - Varicose veins",
  "C3 - Edema",
  "C4a - Pigmentation or eczema",
  "C4b - Lipodermatosclerosis or atrophie blanche",
  "C5 - Healed venous ulcer",
  "C6 - Active venous ulcer",
];

const etiology = ["Ep - Primary", "Es - Secondary", "Ec - Congenital", "En - No venous etiology identified"];
const anatomy = ["As - Superficial veins", "Ap - Perforator veins", "Ad - Deep veins", "An - No venous location identified"];
const pathophysiology = ["Pr - Reflux", "Po - Obstruction", "Pr,o - Reflux and obstruction", "Pn - No venous pathophysiology identified"];

export default function Page() {
  const [c,setC]=useState("C0 - No visible or palpable signs");
  const [e,setE]=useState("Ep - Primary");
  const [a,setA]=useState("As - Superficial veins");
  const [p,setP]=useState("Pr - Reflux");

  const summary = `${c.split(" ")[0]} ${e.split(" ")[0]} ${a.split(" ")[0]} ${p.split(" ")[0]}`;

  return(
    <main style={styles.main}>
      <a href="/" style={styles.back}>← Back to Meddoq</a>

      <section style={styles.hero}>
        <p style={styles.kicker}>Venous Classification</p>
        <h1>CEAP Classification Calculator</h1>
        <p>Classify chronic venous disease using Clinical, Etiologic, Anatomic and Pathophysiologic components.</p>
      </section>

      <section style={styles.card}>
        <label style={styles.label}>Clinical class
          <select style={styles.input} value={c} onChange={e=>setC(e.target.value)}>
            {clinical.map(x=><option key={x}>{x}</option>)}
          </select>
        </label>

        <label style={styles.label}>Etiology
          <select style={styles.input} value={e} onChange={e=>setE(e.target.value)}>
            {etiology.map(x=><option key={x}>{x}</option>)}
          </select>
        </label>

        <label style={styles.label}>Anatomy
          <select style={styles.input} value={a} onChange={e=>setA(e.target.value)}>
            {anatomy.map(x=><option key={x}>{x}</option>)}
          </select>
        </label>

        <label style={styles.label}>Pathophysiology
          <select style={styles.input} value={p} onChange={e=>setP(e.target.value)}>
            {pathophysiology.map(x=><option key={x}>{x}</option>)}
          </select>
        </label>

        <div style={styles.result}>
          <span>CEAP Summary</span>
          <strong>{summary}</strong>
          <p>{c}</p>
          <p>{e} • {a} • {p}</p>
        </div>
      </section>

      <section style={styles.content}>
        <h2>Clinical use</h2>
        <p>
          CEAP classification standardizes description of chronic venous disease for clinical documentation,
          communication and follow-up.
        </p>

        <h2>Limitations</h2>
        <p>
          CEAP describes disease phenotype and mechanism but does not replace duplex ultrasound,
          symptom scoring or clinical judgment.
        </p>

        <h2>References</h2>
        <p>Eklof B et al. J Vasc Surg. 2004. Lurie F et al. J Vasc Surg Venous Lymphat Disord. 2020.</p>
      </section>
    </main>
  );
}

const styles={
main:{maxWidth:980,margin:"0 auto",padding:24,fontFamily:"Inter,system-ui,sans-serif",color:"#0f172a"},
back:{color:"#2563eb",fontWeight:800,textDecoration:"none"},
hero:{marginTop:32,background:"linear-gradient(135deg,#fff,#eff6ff)",border:"1px solid #dbeafe",borderRadius:28,padding:40},
kicker:{color:"#2563eb",fontWeight:900,fontSize:12,textTransform:"uppercase"},
card:{marginTop:24,background:"#fff",border:"1px solid #e2e8f0",borderRadius:24,padding:24,display:"grid",gap:18},
label:{display:"grid",gap:8,fontWeight:700},
input:{padding:14,borderRadius:12,border:"1px solid #cbd5e1"},
result:{background:"#eff6ff",padding:20,borderRadius:18,border:"1px solid #bfdbfe"},
content:{marginTop:32,lineHeight:1.7,fontSize:17}
}
