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
          <select style={styles.input} value={c} onChange={e=>setC(e.target.value.replace(/,/g, "."))}>
            {clinical.map(x=><option key={x}>{x}</option>)}
          </select>
        </label>

        <label style={styles.label}>Etiology
          <select style={styles.input} value={e} onChange={e=>setE(e.target.value.replace(/,/g, "."))}>
            {etiology.map(x=><option key={x}>{x}</option>)}
          </select>
        </label>

        <label style={styles.label}>Anatomy
          <select style={styles.input} value={a} onChange={e=>setA(e.target.value.replace(/,/g, "."))}>
            {anatomy.map(x=><option key={x}>{x}</option>)}
          </select>
        </label>

        <label style={styles.label}>Pathophysiology
          <select style={styles.input} value={p} onChange={e=>setP(e.target.value.replace(/,/g, "."))}>
            {pathophysiology.map(x=><option key={x}>{x}</option>)}
          </select>
        </label>

        <div style={styles.result}>
          <span>CEAP Summary</span>
          <strong>{summary}</strong>
          <p>{c}</p>
          <p>{e} • {a} • {p}</p>
          <p><b>Clinical meaning:</b> CEAP is a descriptive classification, not a severity score. It standardizes phenotype, cause, anatomy and mechanism.</p>
          <p><b>Next step:</b> Add duplex findings, symptoms, VCSS and treatment history for complete venous documentation.</p>
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
result:{marginTop:24,background:"linear-gradient(135deg,#f8fafc,#eff6ff)",border:"1px solid #bfdbfe",borderRadius:22,padding:24,display:"grid",gap:10,lineHeight:1.45,boxShadow:"0 18px 50px rgba(15,23,42,0.08)"},
content:{marginTop:32,lineHeight:1.7,fontSize:17}
}
