"use client";

import { useMemo, useState } from "react";


function n(value) {
  if (value === null || value === undefined) return 0;
  const normalized = String(value).replace(/,/g, ".");
  const parsed = parseFloat(normalized);
  return Number.isFinite(parsed) ? parsed : 0;
}


const wound = [
  "0 - No ulcer",
  "1 - Small shallow ulcer",
  "2 - Deeper ulcer with exposed tendon/joint",
  "3 - Extensive ulcer or gangrene",
];

const ischemia = [
  "0 - ABI ≥0.80 / TP ≥60",
  "1 - Mild ischemia",
  "2 - Moderate ischemia",
  "3 - Severe ischemia",
];

const infection = [
  "0 - None",
  "1 - Mild infection",
  "2 - Moderate infection",
  "3 - Severe systemic infection",
];

export default function Page() {
  const [w,setW]=useState(0);
  const [i,setI]=useState(0);
  const [f,setF]=useState(0);

  const score = useMemo(()=>n(w)+n(i)+n(f),[w,i,f]);

  const stage = useMemo(()=> {
    if (score <= 2) {
      return {
        title: "Stage 1 — Very low limb threat",
        meaning: "Low expected 1-year amputation risk if the patient is clinically stable.",
        action: "Optimize wound care, risk factors, infection control and surveillance. Revascularization benefit may be limited unless ischemia is clinically important.",
      };
    }
    if (score <= 4) {
      return {
        title: "Stage 2 — Low limb threat",
        meaning: "Mild to low limb threat. Risk is present but not usually limb-immediate.",
        action: "Assess perfusion, wound trajectory and infection. Revascularization may be considered when ischemia or wound healing concern is present.",
      };
    }
    if (score <= 6) {
      return {
        title: "Stage 3 — Moderate limb threat",
        meaning: "Clinically meaningful risk of limb loss or delayed wound healing.",
        action: "Vascular imaging and revascularization planning should be considered, especially with ischemia grade 2–3 or progressive tissue loss.",
      };
    }
    if (score <= 8) {
      return {
        title: "Stage 4 — High limb threat",
        meaning: "High risk of amputation without effective infection control, wound care and perfusion optimization.",
        action: "Urgent multidisciplinary limb salvage assessment is appropriate. Revascularization benefit is often substantial if technically feasible.",
      };
    }
    return {
      title: "Stage 5 — Very high limb threat",
      meaning: "Very severe combined wound, ischemia and infection burden.",
      action: "Urgent limb salvage pathway, infection source control and revascularization feasibility assessment are needed. Consider overall patient fitness and goals of care.",
    };
  },[score]);

  return(
    <main style={styles.main}>
      <a href="/" style={styles.back}>← Back to Meddoq</a>

      <section style={styles.hero}>
        <p style={styles.kicker}>CLTI Calculator</p>
        <h1>WIfI Classification</h1>
        <p>Wound • Ischemia • foot Infection classification for chronic limb-threatening ischemia.</p>
      </section>

      <section style={styles.card}>

        <label style={styles.label}>
          Wound
          <select style={styles.input} value={w} onChange={e=>setW(e.target.value.replace(/,/g, "."))}>
            {wound.map((x,n)=><option key={n} value={n}>{x}</option>)}
          </select>
        </label>

        <label style={styles.label}>
          Ischemia
          <select style={styles.input} value={i} onChange={e=>setI(e.target.value.replace(/,/g, "."))}>
            {ischemia.map((x,n)=><option key={n} value={n}>{x}</option>)}
          </select>
        </label>

        <label style={styles.label}>
          Foot infection
          <select style={styles.input} value={f} onChange={e=>setF(e.target.value.replace(/,/g, "."))}>
            {infection.map((x,n)=><option key={n} value={n}>{x}</option>)}
          </select>
        </label>

        <div style={styles.result}>
          <span>Total WIfI Score</span>
          <strong>{score}</strong>
          <p><b>{stage.title}</b></p>
          <p>{stage.meaning}</p>
          <p><b>Clinical next step:</b> {stage.action}</p>
          <p>
            WIfI should be interpreted together with arterial anatomy,
            patient comorbidity, wound trajectory, infection severity and feasibility of revascularization.
          </p>
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
          WIfI classification estimates amputation risk and expected
          benefit from revascularization in chronic limb-threatening ischemia.
        </p>

        <h2>How to interpret mild, moderate and severe grades</h2>
        <ul>
          <li><b>Wound grade 1:</b> Small superficial ulcer; usually limited tissue loss.</li>
          <li><b>Wound grade 2:</b> Deeper ulcer or exposed tendon/joint; limb threat is clinically significant.</li>
          <li><b>Wound grade 3:</b> Extensive ulcer or gangrene; high limb threat.</li>
          <li><b>Ischemia grade 1:</b> Mild perfusion deficit; healing may still occur depending on wound burden.</li>
          <li><b>Ischemia grade 2:</b> Moderate ischemia; revascularization benefit becomes more likely.</li>
          <li><b>Ischemia grade 3:</b> Severe ischemia; urgent vascular assessment is usually appropriate.</li>
          <li><b>Infection grade 1:</b> Mild local infection.</li>
          <li><b>Infection grade 2:</b> Deeper or more extensive infection without systemic toxicity.</li>
          <li><b>Infection grade 3:</b> Severe infection or systemic inflammatory response; urgent source control is needed.</li>
        </ul>

        <h2>Reference</h2>
        <p>Mills JL Jr. J Vasc Surg. 2014.</p>
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
