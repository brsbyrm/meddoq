"use client";

import { useMemo, useState } from "react";


function n(value) {
  if (value === null || value === undefined) return 0;
  const normalized = String(value).replace(/,/g, ".");
  const parsed = parseFloat(normalized);
  return Number.isFinite(parsed) ? parsed : 0;
}


const ageOptions = [
  { label: "<60 years", points: 0 },
  { label: "60–79 years", points: 1 },
  { label: "≥80 years", points: 2 },
];

const shockOptions = [
  { label: "No shock", points: 0 },
  { label: "Tachycardia only", points: 1 },
  { label: "Hypotension", points: 2 },
];

const comorbidityOptions = [
  { label: "No major comorbidity", points: 0 },
  { label: "Cardiac failure / ischemic heart disease / major comorbidity", points: 2 },
  { label: "Renal failure / liver failure / disseminated malignancy", points: 3 },
];

const diagnosisOptions = [
  { label: "Mallory-Weiss tear / no lesion / no stigmata", points: 0 },
  { label: "All other diagnoses", points: 1 },
  { label: "Upper GI malignancy", points: 2 },
];

const stigmataOptions = [
  { label: "None or dark spot only", points: 0 },
  { label: "Blood in upper GI tract / adherent clot / visible or spurting vessel", points: 2 },
];

function risk(score) {
  if (score <= 2) return "Low risk";
  if (score <= 4) return "Intermediate risk";
  return "High risk";
}

export default function Page() {
  const [age,setAge]=useState(0);
  const [shock,setShock]=useState(0);
  const [comorbidity,setComorbidity]=useState(0);
  const [diagnosis,setDiagnosis]=useState(0);
  const [stigmata,setStigmata]=useState(0);

  const score = useMemo(
    () => n(age)+n(shock)+n(comorbidity)+n(diagnosis)+n(stigmata),
    [age,shock,comorbidity,diagnosis,stigmata]
  );

  return (
    <main style={styles.main}>
      <a href="/" style={styles.back}>← Back to Meddoq</a>

      <section style={styles.hero}>
        <p style={styles.kicker}>Gastrointestinal Calculator</p>
        <h1>Rockall Score Calculator</h1>
        <p>Estimate risk after upper gastrointestinal bleeding using clinical and endoscopic criteria.</p>
      </section>

      <section style={styles.card}>
        <label style={styles.label}>Age
          <select style={styles.input} value={age} onChange={e=>setAge(e.target.value.replace(/,/g, "."))}>
            {ageOptions.map(o=><option key={o.label} value={o.points}>{o.points} — {o.label}</option>)}
          </select>
        </label>

        <label style={styles.label}>Shock
          <select style={styles.input} value={shock} onChange={e=>setShock(e.target.value.replace(/,/g, "."))}>
            {shockOptions.map(o=><option key={o.label} value={o.points}>{o.points} — {o.label}</option>)}
          </select>
        </label>

        <label style={styles.label}>Comorbidity
          <select style={styles.input} value={comorbidity} onChange={e=>setComorbidity(e.target.value.replace(/,/g, "."))}>
            {comorbidityOptions.map(o=><option key={o.label} value={o.points}>{o.points} — {o.label}</option>)}
          </select>
        </label>

        <label style={styles.label}>Diagnosis
          <select style={styles.input} value={diagnosis} onChange={e=>setDiagnosis(e.target.value.replace(/,/g, "."))}>
            {diagnosisOptions.map(o=><option key={o.label} value={o.points}>{o.points} — {o.label}</option>)}
          </select>
        </label>

        <label style={styles.label}>Major stigmata of recent hemorrhage
          <select style={styles.input} value={stigmata} onChange={e=>setStigmata(e.target.value.replace(/,/g, "."))}>
            {stigmataOptions.map(o=><option key={o.label} value={o.points}>{o.points} — {o.label}</option>)}
          </select>
        </label>

        <div style={styles.result}>
          <span>Rockall Score</span>
          <strong>{score}</strong>
          <p><b>{risk(score)}</b></p>
          <p><b>Clinical meaning:</b></p>
          <ul>
            <li><b>Low risk:</b> Lower expected risk of rebleeding or death, but clinical stability is still required.</li>
            <li><b>Intermediate risk:</b> Meaningful risk; endoscopic findings, comorbidity and hemodynamics should guide disposition.</li>
            <li><b>High risk:</b> Increased risk of adverse outcome; urgent senior review and endoscopic management are usually needed.</li>
          </ul>
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


      <section style={styles.pearlBox}>
        <h2>Clinical interpretation</h2>
        <p>
          Use the calculated result as a structured clinical aid. Confirm that the input values are accurate,
          apply the result only to the intended patient population, and combine it with examination findings,
          imaging, laboratory trends and guideline-based decision-making.
        </p>
      </section>


      <section style={styles.safetyNotice}>
        <strong>Medical disclaimer</strong>
        <p>
          Meddoq calculators are intended for healthcare professionals. Results are educational
          and decision-support aids only. They do not replace clinical judgment, patient-specific
          assessment, emergency evaluation or institutional protocols.
        </p>
      </section>

      <section style={styles.content}>
        <h2>Clinical use</h2>
        <p>The Rockall Score supports risk stratification after upper gastrointestinal bleeding.</p>

        <h2>Limitations</h2>
        <p>Interpret with hemodynamic status, endoscopic findings, comorbidities and local protocols.</p>

        <h2>References</h2>
        <p>Rockall TA et al. Gut. 1996.</p>
      </section>
    </main>
  );
}

const styles={
main:{maxWidth:980,margin:"0 auto",padding:24,fontFamily:"Inter,system-ui,sans-serif",color:"#0f172a"},
back:{color:"#2563eb",fontWeight:800,textDecoration:"none"},
hero:{marginTop:32,background:"linear-gradient(135deg,#fff,#eff6ff)",border:"1px solid #dbeafe",borderRadius:28,padding:40},
kicker:{color:"#2563eb",fontWeight:900,fontSize:12,textTransform:"uppercase"},
card:{marginTop:24,background:"#fff",border:"1px solid #e2e8f0",borderRadius:24,padding:24,display:"grid",gap:16},
label:{display:"grid",gap:8,fontWeight:700},
input:{padding:14,borderRadius:12,border:"1px solid #cbd5e1"},
result:{marginTop:24,background:"linear-gradient(135deg,#f8fafc,#eff6ff)",border:"1px solid #bfdbfe",borderRadius:22,padding:24,display:"grid",gap:10,lineHeight:1.45,boxShadow:"0 18px 50px rgba(15,23,42,0.08)"},
content:{marginTop:32,lineHeight:1.7,fontSize:17}
}
