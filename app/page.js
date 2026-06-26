"use client";

import { useMemo, useState } from "react";

const calculators = [
  {
    id: "asi",
    name: "Aortic Size Index",
    shortName: "ASI",
    category: "Vascular",
    description: "Index aortic diameter to body surface area for individualized aortic risk assessment.",
  },
  {
    id: "egfr",
    name: "eGFR",
    shortName: "eGFR",
    category: "Renal",
    description: "Estimate glomerular filtration rate using the CKD-EPI 2021 creatinine equation.",
  },
  {
    id: "crcl",
    name: "Creatinine Clearance",
    shortName: "CrCl",
    category: "Renal",
    description: "Estimate creatinine clearance using the Cockcroft-Gault equation for drug dosing.",
  },
  {
    id: "cha",
    name: "CHA₂DS₂-VASc",
    shortName: "CHA₂DS₂-VASc",
    category: "Cardiovascular",
    description: "Estimate thromboembolic risk in patients with atrial fibrillation.",
  },
  {
    id: "hasbled",
    name: "HAS-BLED",
    shortName: "HAS-BLED",
    category: "Cardiovascular",
    description: "Assess bleeding risk in patients receiving anticoagulation for atrial fibrillation.",
  },
  {
    id: "wells",
    name: "Wells DVT",
    shortName: "Wells DVT",
    category: "Vascular",
    description: "Estimate pretest probability of deep vein thrombosis.",
  },
  {
    id: "bsa",
    name: "Body Surface Area",
    shortName: "BSA",
    category: "General",
    description: "Calculate body surface area using the Mosteller formula.",
  },
  {
    id: "bmi",
    name: "Body Mass Index",
    shortName: "BMI",
    category: "General",
    description: "Calculate body mass index and standard weight category.",
  },
];

const categories = [
  {
    title: "Vascular",
    text: "Aortic indexing, DVT probability, peripheral vascular workflow tools.",
  },
  {
    title: "Cardiovascular",
    text: "Stroke risk, bleeding risk and perioperative cardiovascular decision support.",
  },
  {
    title: "Renal",
    text: "Renal function estimation for clinical assessment and medication dosing.",
  },
  {
    title: "Perioperative",
    text: "Planned expansion for anticoagulation, bleeding and procedural risk tools.",
  },
];

export default function Home() {
  const [active, setActive] = useState("asi");
  const [menuOpen, setMenuOpen] = useState(false);

  const activeCalculator = calculators.find((item) => item.id === active);

  return (
    <main style={styles.main}>
      <div style={styles.backgroundGlowOne} />
      <div style={styles.backgroundGlowTwo} />
      <header style={styles.header}>
        <div style={styles.brand}>
          <div style={styles.logoMark}>M</div>
          <div>
            <div style={styles.logoText}>Meddoq</div>
            <div style={styles.logoSubtext}>Clinical Decision Support</div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          style={styles.menuButton}
        >
          ☰ Menu
        </button>

        {menuOpen && (
          <div style={styles.mobileMenu}>
            <a href="#calculators" style={styles.mobileMenuLink}>Calculators</a>
            <a href="#categories" style={styles.mobileMenuLink}>Categories</a>
            <a href="#disclaimer" style={styles.mobileMenuLink}>Disclaimer</a>
            <div style={styles.mobileMenuEmail}>✉ contact@meddoq.com</div>
          </div>
        )}
      </header>

      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <div style={styles.badge}>For healthcare professionals</div>
          <h1 style={styles.heroTitle}>
            Clinical calculators for vascular and cardiovascular care.
          </h1>
          <p style={styles.heroText}>
            Meddoq brings fast, evidence-oriented medical calculators into a clean
            physician-focused interface for vascular, cardiovascular, renal and
            perioperative decision support.
          </p>

          <div style={styles.heroActions}>
            <a href="#calculators" style={styles.primaryButton}>Open calculators</a>
            <a href="#categories" style={styles.secondaryButton}>View modules</a>
            <a href="mailto:contact@meddoq.com" style={styles.secondaryButton}>Contact</a>
          </div>

          <div style={styles.heroStats}>
            <div style={styles.statCard}>
              <strong>8+</strong>
              <span>Clinical tools</span>
            </div>
            <div style={styles.statCard}>
              <strong>4</strong>
              <span>Core modules</span>
            </div>
            <div style={styles.statCard}>
              <strong>24/7</strong>
              <span>Web access</span>
            </div>
          </div>
        </div>

        <div style={styles.heroPanel}>
          <div style={styles.platformCard}>
            <div style={styles.platformTopline}>Physician workflow</div>
            <h2 style={styles.platformTitle}>Fast calculations. Clear interpretation.</h2>
            <p style={styles.platformText}>
              Meddoq focuses on practical, clinically interpretable outputs rather than isolated numbers.
            </p>

            <div style={styles.platformChecklist}>
              <div>✓ Vascular-focused calculators</div>
              <div>✓ Renal and cardiovascular tools</div>
              <div>✓ Clinical interpretation notes</div>
              <div>✓ Built for mobile and desktop use</div>
            </div>

            <div style={styles.platformMetric}>
              <span>Featured now</span>
              <strong>{calculators.length} calculators</strong>
            </div>
          </div>
        </div>
      </section>

      <section id="categories" style={styles.section}>
        <div style={styles.sectionHeader}>
          <p style={styles.kicker}>Clinical modules</p>
          <h2 style={styles.sectionTitle}>Built around real clinical workflows</h2>
          <p style={styles.sectionText}>
            The first version focuses on commonly used physician calculators. Later versions
            can expand into vascular-specific algorithms, guideline pathways and procedural planning.
          </p>
        </div>

        <div style={styles.categoryGrid}>
          {categories.map((category) => (
            <div key={category.title} style={styles.categoryCard}>
              <h3 style={styles.categoryTitle}>{category.title}</h3>
              <p style={styles.categoryText}>{category.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="calculators" style={styles.calculatorSection}>
        <div style={styles.calculatorLayout}>
          <aside style={styles.sidebar}>
            <p style={styles.kicker}>Calculators</p>
            <h2 style={styles.sidebarTitle}>Select a tool</h2>

            <div style={styles.calculatorList}>
              {calculators.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActive(item.id)}
                  style={active === item.id ? styles.calculatorButtonActive : styles.calculatorButton}
                >
                  <span style={styles.calculatorName}>{item.name}</span>
                  <span style={styles.calculatorDescription}>{item.description}</span>
                  <span style={styles.categoryPill}>{item.category}</span>
                </button>
              ))}
            </div>
          </aside>

          <section style={styles.calculatorCard}>
            <div style={styles.toolHeader}>
              <div>
                <div style={styles.toolCategory}>{activeCalculator?.category}</div>
                <h2 style={styles.toolTitle}>{activeCalculator?.name}</h2>
                <p style={styles.toolDescription}>{activeCalculator?.description}</p>
              </div>
            </div>

            <div style={styles.toolBody}>
              {active === "bsa" && <BSA />}
              {active === "asi" && <ASI />}
              {active === "bmi" && <BMI />}
              {active === "crcl" && <CrCl />}
              {active === "egfr" && <EGFR />}
              {active === "cha" && <CHA />}
              {active === "hasbled" && <HASBLED />}
              {active === "wells" && <WellsDVT />}
            </div>
          </section>
        </div>
      </section>

      <section id="disclaimer" style={styles.disclaimerBox}>
        <h2 style={styles.disclaimerTitle}>Medical disclaimer</h2>
        <p style={styles.disclaimerText}>
          Meddoq is intended for use by healthcare professionals. It does not replace clinical
          judgment, local protocols, multidisciplinary evaluation or guideline-based individualized
          decision-making. Results should always be interpreted in the full clinical context.
        </p>
      </section>

      <footer style={styles.footer}>
        <div>
          <strong>Meddoq</strong>
          <p style={styles.footerText}>Clinical decision support for physicians.</p>
        </div>
        <div style={styles.footerText}>
          Contact:{" "}
          <a href="mailto:contact@meddoq.com" style={styles.navEmail}>
  ✉ contact@meddoq.com
</a>
        </div>

        <div style={styles.footerText}>
          © {new Date().getFullYear()} Meddoq. Medical tools for professional use.
        </div>
      </footer>
    </main>
  );
}

function Input({ label, value, setValue, placeholder }) {
  return (
    <label style={styles.label}>
      <span>{label}</span>
      <input
        value={value}
        onChange={(event) => setValue(event.target.value)}
        style={styles.input}
        inputMode="decimal"
        placeholder={placeholder || ""}
      />
    </label>
  );
}

function Checkbox({ label, checked, setChecked }) {
  return (
    <label style={styles.checkboxLabel}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => setChecked(event.target.checked)}
      />
      <span>{label}</span>
    </label>
  );
}

function ResultBox({ title, value, unit, interpretation, tone = "neutral" }) {
  const toneStyle =
    tone === "high"
      ? styles.resultHigh
      : tone === "moderate"
      ? styles.resultModerate
      : tone === "low"
      ? styles.resultLow
      : styles.resultNeutral;

  return (
    <div style={{ ...styles.resultBox, ...toneStyle }}>
      <div style={styles.resultLabel}>{title}</div>
      <div style={styles.resultValue}>
        {value} <span style={styles.resultUnit}>{unit}</span>
      </div>
      {interpretation && <p style={styles.resultInterpretation}>{interpretation}</p>}
    </div>
  );
}

function ClinicalNote({ formula, interpretation, reference, guideline }) {
  return (
    <div style={styles.clinicalNote}>
      <div style={styles.noteRow}>
        <strong>Formula / method:</strong>
        <span>{formula}</span>
      </div>
      <div style={styles.noteRow}>
        <strong>Clinical interpretation:</strong>
        <span>{interpretation}</span>
      </div>
      {guideline && (
        <div style={styles.noteRow}>
          <strong>Guideline note:</strong>
          <span>{guideline}</span>
        </div>
      )}
      <div style={styles.noteRow}>
        <strong>Reference:</strong>
        <span>{reference}</span>
      </div>
      <p style={styles.smallDisclaimer}>
        Clinical use note: This tool supports clinical judgment and does not replace physician assessment.
      </p>
    </div>
  );
}

function BSA() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");

  const bsa = useMemo(() => {
    if (!height || !weight) return "";
    return Math.sqrt((Number(height) * Number(weight)) / 3600).toFixed(2);
  }, [height, weight]);

  return (
    <>
      <div style={styles.formGrid}>
        <Input label="Height / Boy (cm)" value={height} setValue={setHeight} placeholder="183" />
        <Input label="Weight / Kilo (kg)" value={weight} setValue={setWeight} placeholder="101" />
      </div>

      {bsa && (
        <ResultBox
          title="Body Surface Area"
          value={bsa}
          unit="m²"
          interpretation="Used to index cardiovascular and vascular measurements such as aortic diameter."
        />
      )}

      <ClinicalNote
        formula="Mosteller formula: √((height × weight) / 3600)"
        interpretation="Commonly used for indexing cardiac output, aortic diameter and drug dosing calculations."
        reference="Mosteller RD. N Engl J Med. 1987."
      />
    </>
  );
}

function ASI() {
  const [diameter, setDiameter] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");

  const bsa = useMemo(() => {
    if (!height || !weight) return "";
    return Math.sqrt((Number(height) * Number(weight)) / 3600).toFixed(2);
  }, [height, weight]);

  const asi = useMemo(() => {
    if (!diameter || !bsa) return "";
    return (Number(diameter) / Number(bsa)).toFixed(2);
  }, [diameter, bsa]);

  function interpretASI(value) {
    const number = Number(value);

    if (number >= 2.75) {
      return {
        text: "High indexed aortic size. This range has been associated with increased aortic risk in indexed-diameter models. Consider specialist assessment, absolute diameter, growth rate and patient-specific risk factors.",
        tone: "high",
        category: "High indexed risk",
      };
    }

    if (number >= 2.0) {
      return {
        text: "Moderately increased indexed aortic size. Interpret together with absolute aortic diameter, valve morphology, family history, connective tissue disease and growth rate.",
        tone: "moderate",
        category: "Moderately increased indexed size",
      };
    }

    return {
      text: "Lower indexed aortic size. Continue interpretation according to absolute aortic diameter, symptoms, growth rate and guideline-based thresholds.",
      tone: "low",
      category: "Lower indexed size",
    };
  }

  const asiInfo = asi ? interpretASI(asi) : null;

  return (
    <>
      <div style={styles.formGrid}>
        <Input
          label="Aortic diameter / Aort çapı (cm)"
          value={diameter}
          setValue={setDiameter}
          placeholder="4.5"
        />

        <Input
          label="Height / Boy (cm)"
          value={height}
          setValue={setHeight}
          placeholder="183"
        />

        <Input
          label="Weight / Kilo (kg)"
          value={weight}
          setValue={setWeight}
          placeholder="101"
        />
      </div>

      {bsa && (
        <div style={styles.inlineResult}>
          Calculated BSA: <strong>{bsa} m²</strong>
        </div>
      )}

      {asi && (
        <ResultBox
          title="Aortic Size Index"
          value={asi}
          unit="cm/m²"
          interpretation={`${asiInfo.category}: ${asiInfo.text}`}
          tone={asiInfo.tone}
        />
      )}

      <ClinicalNote
        formula="BSA by Mosteller formula: √((height × weight) / 3600). ASI: aortic diameter / BSA."
        interpretation="Aortic Size Index helps contextualize aortic diameter according to body size. It is particularly useful when absolute aortic diameter may underestimate relative risk in smaller patients."
        guideline="Do not use ASI alone for intervention decisions. Interpret with absolute diameter, symptoms, aortic growth rate, valve morphology, connective tissue disease, bicuspid valve status, family history and current guideline thresholds."
        reference="Davies RR et al. Ann Thorac Surg. 2006; Mosteller RD. N Engl J Med. 1987."
      />
    </>
  );
}
    
function BMI() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");

  const bmi = useMemo(() => {
    if (!height || !weight) return "";
    return (Number(weight) / Math.pow(Number(height) / 100, 2)).toFixed(1);
  }, [height, weight]);

  function interpretBMI(value) {
    const number = Number(value);
    if (number >= 30) return { text: "Obesity range by standard BMI classification.", tone: "high" };
    if (number >= 25) return { text: "Overweight range by standard BMI classification.", tone: "moderate" };
    if (number >= 18.5) return { text: "Normal BMI range by standard classification.", tone: "low" };
    return { text: "Underweight range by standard BMI classification.", tone: "moderate" };
  }

  const bmiInfo = bmi ? interpretBMI(bmi) : null;

  return (
    <>
      <div style={styles.formGrid}>
        <Input label="Height / Boy (cm)" value={height} setValue={setHeight} placeholder="183" />
        <Input label="Weight / Kilo (kg)" value={weight} setValue={setWeight} placeholder="101" />
      </div>

      {bmi && (
        <ResultBox
          title="Body Mass Index"
          value={bmi}
          unit="kg/m²"
          interpretation={bmiInfo.text}
          tone={bmiInfo.tone}
        />
      )}

      <ClinicalNote
        formula="Weight / height²"
        interpretation="<18.5 underweight, 18.5–24.9 normal, 25–29.9 overweight, ≥30 obesity."
        reference="World Health Organization BMI classification."
      />
    </>
  );
}

function CrCl() {
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [creat, setCreat] = useState("");
  const [female, setFemale] = useState(false);

  const result = useMemo(() => {
    if (!age || !weight || !creat) return "";
    let crcl = ((140 - Number(age)) * Number(weight)) / (72 * Number(creat));
    if (female) crcl *= 0.85;
    return crcl.toFixed(1);
  }, [age, weight, creat, female]);

  function name(params) {
    
  }function interpretCrCl(value) {
    const number = Number(value);
    if (number < 30) return { text: "Markedly reduced creatinine clearance. Review renal dosing and contrast risk carefully.", tone: "high" };
    if (number < 60) return { text: "Reduced creatinine clearance. Consider renal dose adjustment where relevant.", tone: "moderate" };
    return { text: "Creatinine clearance is not severely reduced by this estimate.", tone: "low" };
  }

  const crclInfo = result ? interpretCrCl(result) : null;

  return (
    <>
      <div style={styles.formGrid}>
        <Input label="Age / Yaş" value={age} setValue={setAge} placeholder="65" />
        <Input label="Weight / Kilo (kg)" value={weight} setValue={setWeight} placeholder="80" />
        <Input label="Creatinine / Kreatinin (mg/dL)" value={creat} setValue={setCreat} placeholder="1.2" />
      </div>

      <Checkbox label="Female sex" checked={female} setChecked={setFemale} />

      {result && (
        <ResultBox
          title="Creatinine Clearance"
          value={result}
          unit="mL/min"
          interpretation={crclInfo.text}
          tone={crclInfo.tone}
        />
      )}

      <ClinicalNote
        formula="Cockcroft-Gault equation"
        interpretation="Frequently used for medication dosing. Use caution in extremes of body weight, pregnancy, amputation and unstable renal function."
        guideline="For drug dosing, Cockcroft-Gault may still be requested in many prescribing references, while eGFR is commonly used for CKD staging."
        reference="Cockcroft DW, Gault MH. Nephron. 1976."
      />
    </>
  );
}
function EGFR() {
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [creat, setCreat] = useState("");
  const [female, setFemale] = useState(false);

  const egfr = useMemo(() => {
    if (!age || !creat) return "";

    const scr = Number(creat);
    const k = female ? 0.7 : 0.9;
    const alpha = female ? -0.241 : -0.302;

    let value =
      142 *
      Math.pow(Math.min(scr / k, 1), alpha) *
      Math.pow(Math.max(scr / k, 1), -1.2) *
      Math.pow(0.9938, Number(age));

    if (female) value *= 1.012;

    return value.toFixed(1);
  }, [age, creat, female]);

  const crcl = useMemo(() => {
    if (!age || !weight || !creat) return "";

    let value = ((140 - Number(age)) * Number(weight)) / (72 * Number(creat));

    if (female) value *= 0.85;

    return value.toFixed(1);
  }, [age, weight, creat, female]);

  function interpretRenal(value) {
    const number = Number(value);

    if (number < 15) {
      return {
        category: "Kidney failure range",
        text: "eGFR is in the G5 range if persistent. Requires urgent clinical correlation, medication review and nephrology-directed management.",
        tone: "high",
      };
    }

    if (number < 30) {
      return {
        category: "Severely decreased",
        text: "eGFR is in the G4 range if persistent. Review nephrotoxic exposure, medication dosing and contrast-related risk carefully.",
        tone: "high",
      };
    }

    if (number < 45) {
      return {
        category: "Moderately to severely decreased",
        text: "eGFR is in the G3b range if persistent. Increased perioperative and contrast-related renal risk should be considered.",
        tone: "moderate",
      };
    }

    if (number < 60) {
      return {
        category: "Mildly to moderately decreased",
        text: "eGFR is in the G3a range if persistent. Interpret with albuminuria, trend and clinical context.",
        tone: "moderate",
      };
    }

    if (number < 90) {
      return {
        category: "Mildly decreased or age-related range",
        text: "eGFR is 60–89. CKD diagnosis requires additional evidence of kidney damage or persistent abnormality.",
        tone: "low",
      };
    }

    return {
      category: "Normal or high",
      text: "eGFR is ≥90. Interpret with age, muscle mass, albuminuria and clinical context.",
      tone: "low",
    };
  }

  function interpretCrCl(value) {
    const number = Number(value);

    if (number < 30) {
      return "CrCl is <30 mL/min. Many renally cleared medications require dose adjustment or avoidance. Review contrast exposure and hydration strategy.";
    }

    if (number < 60) {
      return "CrCl is 30–59 mL/min. Consider renal dose adjustment for relevant drugs and review peri-procedural renal risk.";
    }

    return "CrCl is ≥60 mL/min by Cockcroft-Gault. Continue to interpret with body habitus, renal trend and drug-specific recommendations.";
  }

  const renalInfo = egfr ? interpretRenal(egfr) : null;

  return (
    <>
      <div style={styles.formGrid}>
        <Input label="Age / Yaş" value={age} setValue={setAge} placeholder="65" />
        <Input label="Weight / Kilo (kg)" value={weight} setValue={setWeight} placeholder="80" />
        <Input label="Creatinine / Kreatinin (mg/dL)" value={creat} setValue={setCreat} placeholder="1.2" />
      </div>

      <Checkbox label="Female sex" checked={female} setChecked={setFemale} />

      {egfr && (
        <ResultBox
          title="eGFR CKD-EPI 2021"
          value={egfr}
          unit="mL/min/1.73 m²"
          interpretation={`${renalInfo.category}: ${renalInfo.text}`}
          tone={renalInfo.tone}
        />
      )}

      {crcl && (
        <ResultBox
          title="Creatinine Clearance"
          value={crcl}
          unit="mL/min"
          interpretation={interpretCrCl(crcl)}
          tone={Number(crcl) < 30 ? "high" : Number(crcl) < 60 ? "moderate" : "low"}
        />
      )}

      <ClinicalNote
        formula="eGFR: CKD-EPI 2021 creatinine equation. CrCl: Cockcroft-Gault equation."
        interpretation="eGFR is commonly used for CKD staging, while Cockcroft-Gault creatinine clearance is still frequently used for drug dosing decisions."
        guideline="Interpret renal estimates with albuminuria, renal trend, acute illness status, muscle mass, body habitus and medication-specific dosing recommendations."
        reference="Inker LA et al. N Engl J Med. 2021; Cockcroft DW, Gault MH. Nephron. 1976."
      />
    </>
  );
}
function CHA() {
  const items = [
    ["Congestive heart failure / LV dysfunction", 1],
    ["Hypertension", 1],
    ["Age ≥75 years", 2],
    ["Diabetes mellitus", 1],
    ["Stroke / TIA / systemic embolism", 2],
    ["Vascular disease: prior MI, PAD or aortic plaque", 1],
    ["Age 65–74 years", 1],
    ["Female sex", 1],
  ];

  return (
    <Score
      title="CHA₂DS₂-VASc"
      items={items}
      resultUnit="points"
      interpret={(score) => {
        if (score >= 3) {
          return {
            text: "Elevated thromboembolic risk. In most atrial fibrillation guidelines, oral anticoagulation is generally recommended unless contraindicated.",
            tone: "high",
          };
        }

        if (score === 2) {
          return {
            text: "Intermediate-to-elevated thromboembolic risk. Anticoagulation is commonly considered, especially when non-sex risk factors are present.",
            tone: "moderate",
          };
        }

        if (score === 1) {
          return {
            text: "Low-to-intermediate score. If the only point is female sex, this is usually considered low risk. Otherwise, individualize anticoagulation decision.",
            tone: "moderate",
          };
        }

        return {
          text: "Low thromboembolic risk by this score. Anticoagulation is usually not indicated solely by CHA₂DS₂-VASc, but clinical context matters.",
          tone: "low",
        };
      }}
      formula="Point-based clinical stroke-risk score in non-valvular atrial fibrillation."
      interpretation="Higher score indicates higher thromboembolic risk. Female sex is considered a risk modifier rather than a standalone indication for anticoagulation."
      guideline="Use in atrial fibrillation or atrial flutter context. Anticoagulation decisions should incorporate bleeding risk, renal function, patient preference, contraindications and current AF guidelines."
      reference="Lip GYH et al. Chest. 2010; ESC and ACC/AHA atrial fibrillation guideline frameworks."
    />
  );
}
function HASBLED() {
  const items = [
    ["Hypertension: uncontrolled systolic BP >160 mmHg", 1],
    ["Abnormal renal function", 1],
    ["Abnormal liver function", 1],
    ["Stroke history", 1],
    ["Major bleeding history or bleeding predisposition", 1],
    ["Labile INR if on warfarin", 1],
    ["Elderly age >65 years", 1],
    ["Drugs predisposing to bleeding: antiplatelet or NSAID", 1],
    ["Alcohol excess", 1],
  ];

  return (
    <Score
      title="HAS-BLED"
      items={items}
      resultUnit="points"
      interpret={(score) => {
        if (score >= 3) {
          return {
            text: "High bleeding risk. This should trigger closer follow-up and correction of modifiable bleeding risk factors, not automatic withholding of anticoagulation.",
            tone: "high",
          };
        }

        if (score >= 1) {
          return {
            text: "Bleeding risk factors are present. Review modifiable factors such as blood pressure, interacting drugs, alcohol use, renal/liver dysfunction and INR control.",
            tone: "moderate",
          };
        }

        return {
          text: "Low bleeding risk by HAS-BLED. Continue routine clinical assessment and reassess risk over time.",
          tone: "low",
        };
      }}
      formula="Point-based bleeding risk score for patients with atrial fibrillation receiving or being considered for anticoagulation."
      interpretation="HAS-BLED estimates bleeding risk and highlights modifiable risk factors. It should not be used as a simple reason to deny anticoagulation."
      guideline="Use together with CHA₂DS₂-VASc, renal function, medication review and patient-specific bleeding history. Reassess periodically because risk changes over time."
      reference="Pisters R et al. Chest. 2010; ESC and ACC/AHA atrial fibrillation guideline frameworks."
    />
  );
}
function WellsDVT() {
  const items = [
    ["Active cancer: treatment ongoing, within previous 6 months, or palliative", 1],
    ["Paralysis, paresis or recent plaster immobilization of lower extremity", 1],
    ["Recently bedridden >3 days or major surgery within 12 weeks", 1],
    ["Localized tenderness along the distribution of the deep venous system", 1],
    ["Entire leg swollen", 1],
    ["Calf swelling >3 cm compared with asymptomatic leg", 1],
    ["Pitting edema confined to the symptomatic leg", 1],
    ["Collateral superficial veins, non-varicose", 1],
    ["Previously documented DVT", 1],
    ["Alternative diagnosis at least as likely as DVT", -2],
  ];

  return (
    <Score
      title="Wells DVT Score"
      items={items}
      resultUnit="points"
      interpret={(score) => {
        if (score >= 3) {
          return {
            text: "High pretest probability. Compression ultrasonography is usually required. Do not rely on D-dimer alone in this category.",
            tone: "high",
          };
        }

        if (score >= 1) {
          return {
            text: "Moderate pretest probability. Follow local diagnostic pathway using D-dimer and/or venous ultrasonography according to availability and clinical context.",
            tone: "moderate",
          };
        }

        return {
          text: "Low pretest probability. If D-dimer is negative, DVT can often be excluded in appropriate outpatient settings. If positive, proceed to imaging according to local protocol.",
          tone: "low",
        };
      }}
      formula="Wells clinical prediction rule for suspected lower-extremity deep vein thrombosis."
      interpretation="The score estimates pretest probability before D-dimer testing or venous ultrasonography. It should be used only when DVT is clinically suspected."
      guideline="Use with caution in pregnancy, recurrent DVT, active anticoagulation, hospitalized patients and patients with strong clinical concern despite a low score. Follow local VTE diagnostic pathways."
      reference="Wells PS et al. Lancet. 1997; NICE VTE diagnostic pathway."
    />
  );
}
function Score({
  title,
  items,
  resultUnit,
  interpret,
  formula,
  interpretation,
  guideline,
  reference,
}) {
  const [checked, setChecked] = useState({});

  const score = items.reduce((sum, [name, points]) => {
    return checked[name] ? sum + points : sum;
  }, 0);

  const info = interpret(score);

  return (
    <>
      <div style={styles.scoreList}>
        {items.map(([name, points]) => (
          <label key={name} style={styles.scoreItem}>
            <input
              type="checkbox"
              checked={!!checked[name]}
              onChange={() => setChecked({ ...checked, [name]: !checked[name] })}
            />
            <span style={styles.scoreItemText}>{name}</span>
            <span style={styles.scorePoints}>{points > 0 ? "+" : ""}{points}</span>
          </label>
        ))}
      </div>

      <ResultBox
        title={title}
        value={score}
        unit={resultUnit}
        interpretation={info.text}
        tone={info.tone}
      />

      <ClinicalNote
        formula={formula}
        interpretation={interpretation}
        guideline={guideline}
        reference={reference}
      />
    </>
  );
}

const styles = {
  main: {
    minHeight: "100vh",
    position: "relative",
    overflow: "hidden",
    fontFamily:
      'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    background:
      "radial-gradient(circle at top left, rgba(37,99,235,0.16), transparent 34%), radial-gradient(circle at top right, rgba(14,165,233,0.13), transparent 30%), linear-gradient(180deg, #f8fafc 0%, #eef6ff 45%, #f8fafc 100%)",
    color: "#0f172a",
    padding: "clamp(12px, 3vw, 20px)",
  },
  backgroundGlowOne: {
    position: "fixed",
    width: 520,
    height: 520,
    borderRadius: "50%",
    background: "rgba(37,99,235,0.18)",
    filter: "blur(70px)",
    top: -160,
    right: -130,
    pointerEvents: "none",
    zIndex: 0,
  },
  backgroundGlowTwo: {
    position: "fixed",
    width: 420,
    height: 420,
    borderRadius: "50%",
    background: "rgba(14,165,233,0.16)",
    filter: "blur(80px)",
    bottom: 80,
    left: -160,
    pointerEvents: "none",
    zIndex: 0,
  },
  header: {
    position: "relative",
    zIndex: 20,
    maxWidth: 1180,
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    padding: "14px 16px",
    backdropFilter: "blur(16px)",
    background: "rgba(255,255,255,0.78)",
    border: "1px solid rgba(226,232,240,0.9)",
    borderRadius: 22,
    boxShadow: "0 18px 45px rgba(15,23,42,0.08)",
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  logoMark: {
    width: 44,
    height: 44,
    borderRadius: 14,
    background: "linear-gradient(135deg, #0f172a, #1d4ed8)",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 900,
    fontSize: 22,
    boxShadow: "0 12px 30px rgba(15, 23, 42, 0.18)",
  },
  logoText: {
    fontSize: 24,
    fontWeight: 900,
    letterSpacing: "-0.04em",
  },
  logoSubtext: {
    fontSize: 12,
    color: "#64748b",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
  },
  nav: {
    display: "flex",
    gap: 10,
    flexWrap: "wrap",
    maxWidth: "100%",
    justifyContent: "flex-end",
  },
  navLink: {
    color: "#334155",
    textDecoration: "none",
    fontSize: 14,
    fontWeight: 700,
  },
  navEmail: {
    color: "#475569",
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
    fontSize: 13,
    fontWeight: 700,
    padding: "8px 12px",
    borderRadius: 999,
    userSelect: "all",

  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",

  maxWidth: "100%",
  boxSizing: "border-box",
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",

  textDecoration: "none",
},
  menuButton: {
    border: "1px solid #cbd5e1",
    background: "#ffffff",
    color: "#0f172a",
    borderRadius: 999,
    padding: "10px 14px",
    fontWeight: 900,
    fontSize: 14,
    cursor: "pointer",
  },
  mobileMenu: {
    width: "100%",
    display: "grid",
    gap: 10,
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: 18,
    padding: 14,
    marginTop: 10,
  },
  mobileMenuLink: {
    color: "#0f172a",
    textDecoration: "none",
    fontWeight: 850,
    padding: "8px 4px",
  },
  mobileMenuEmail: {
    color: "#2563eb",
    background: "#eff6ff",
    border: "1px solid #bfdbfe",
    borderRadius: 14,
    padding: "10px 12px",
    fontWeight: 850,
    userSelect: "all",
    overflowWrap: "anywhere",
  },
  hero: {
    position: "relative",
    zIndex: 1,
    maxWidth: 1180,
    margin: "24px auto 0",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: 28,
    alignItems: "stretch",
  },
  heroContent: {
    background: "rgba(255,255,255,0.9)",
    backdropFilter: "blur(18px)",
    border: "1px solid #e2e8f0",
    borderRadius: 28,
    padding: 36,
    boxShadow: "0 30px 90px rgba(15,23,42,0.10)",
  },
  badge: {
    display: "inline-flex",
    alignItems: "center",
    border: "1px solid #bfdbfe",
    background: "linear-gradient(135deg, #eff6ff, #ecfeff)",
    color: "#1d4ed8",
    borderRadius: 999,
    padding: "8px 12px",
    fontSize: 13,
    fontWeight: 800,
    marginBottom: 18,
  },
  heroTitle: {
    fontSize: "clamp(38px, 6vw, 68px)",
    lineHeight: 0.98,
    letterSpacing: "-0.07em",
    margin: "0 0 18px",
    color: "#0f172a",
  },
  heroText: {
    fontSize: 18,
    lineHeight: 1.65,
    color: "#475569",
    maxWidth: 760,
    margin: 0,
  },
  heroActions: {
    display: "flex",
    gap: 12,
    flexWrap: "wrap",
    marginTop: 28,
  },
  heroStats: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
    gap: 12,
    marginTop: 28,
  },
  statCard: {
    background: "rgba(255,255,255,0.82)",
    border: "1px solid #dbeafe",
    borderRadius: 18,
    padding: 16,
    display: "grid",
    gap: 4,
    boxShadow: "0 16px 36px rgba(15,23,42,0.06)",
  },
  primaryButton: {
    background: "linear-gradient(135deg, #0f172a, #1e3a8a)",
    color: "white",
    padding: "14px 18px",
    borderRadius: 14,
    fontWeight: 800,
    textDecoration: "none",
    boxShadow: "0 14px 30px rgba(15,23,42,0.2)",
  },
  secondaryButton: {
    background: "white",
    color: "#0f172a",
    padding: "14px 18px",
    borderRadius: 14,
    fontWeight: 800,
    textDecoration: "none",
    border: "1px solid #cbd5e1",
  },
  heroPanel: {
    background: "#0f172a",
    color: "white",
    borderRadius: 28,
    padding: 24,
    boxShadow: "0 30px 90px rgba(15,23,42,0.24)",
  },
  platformCard: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: "100%",
  },
  platformTopline: {
    color: "#93c5fd",
    fontSize: 12,
    fontWeight: 900,
    textTransform: "uppercase",
    letterSpacing: "0.14em",
    marginBottom: 14,
  },
  platformTitle: {
    fontSize: "clamp(28px, 4vw, 44px)",
    lineHeight: 1.02,
    letterSpacing: "-0.06em",
    margin: "0 0 16px",
  },
  platformText: {
    color: "#dbeafe",
    lineHeight: 1.6,
    fontSize: 16,
    margin: "0 0 22px",
  },
  platformChecklist: {
    display: "grid",
    gap: 12,
    color: "#f8fafc",
    fontWeight: 750,
    lineHeight: 1.5,
    marginBottom: 26,
  },
  platformMetric: {
    background: "rgba(255,255,255,0.10)",
    border: "1px solid rgba(255,255,255,0.16)",
    borderRadius: 22,
    padding: 18,
    display: "grid",
    gap: 6,
  },
  panelEyebrow: {
    color: "#93c5fd",
    fontSize: 12,
    fontWeight: 900,
    textTransform: "uppercase",
    letterSpacing: "0.12em",
    marginBottom: 8,
  },
  panelTitle: {
    fontSize: 22,
    fontWeight: 950,
    marginBottom: 8,
  },
  panelSubtitle: {
    color: "#cbd5e1",
    lineHeight: 1.55,
    margin: "0 0 18px",
    fontSize: 14,
  },
  panelGrid: {
    display: "grid",
    gap: 10,
  },
  panelItem: {
    textAlign: "left",
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(255,255,255,0.06)",
    color: "white",
    borderRadius: 16,
    padding: 14,
    cursor: "pointer",
  },
  panelItemActive: {
    textAlign: "left",
    border: "1px solid #93c5fd",
    background: "#1d4ed8",
    color: "white",
    borderRadius: 16,
    padding: 14,
    cursor: "pointer",
  },
  panelItemTitle: {
    display: "block",
    fontSize: 15,
    fontWeight: 900,
  },
  panelItemCategory: {
    display: "block",
    fontSize: 12,
    color: "#cbd5e1",
    marginTop: 4,
  },
  section: {
    position: "relative",
    zIndex: 1,
    maxWidth: 1180,
    margin: "56px auto 0",
  },
  sectionHeader: {
    maxWidth: 760,
    marginBottom: 22,
  },
  kicker: {
    margin: "0 0 8px",
    color: "#1d4ed8",
    textTransform: "uppercase",
    letterSpacing: "0.12em",
    fontSize: 12,
    fontWeight: 900,
  },
  sectionTitle: {
    margin: 0,
    fontSize: 34,
    letterSpacing: "-0.04em",
  },
  sectionText: {
    color: "#475569",
    lineHeight: 1.65,
    fontSize: 16,
  },
  categoryGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
    gap: 16,
  },
  categoryCard: {
    background: "white",
    border: "1px solid #e2e8f0",
    borderRadius: 22,
    padding: 22,
    boxShadow: "0 16px 40px rgba(15,23,42,0.06)",
  },
  categoryTitle: {
    margin: "0 0 8px",
    fontSize: 20,
  },
  categoryText: {
    color: "#64748b",
    lineHeight: 1.55,
    margin: 0,
  },
  calculatorSection: {
    position: "relative",
    zIndex: 1,
    maxWidth: 1180,
    margin: "56px auto 0",
  },
  calculatorLayout: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: 22,
    alignItems: "start",
  },
  sidebar: {
    background: "white",
    border: "1px solid #e2e8f0",
    borderRadius: 24,
    padding: 20,
    boxShadow: "0 18px 45px rgba(15,23,42,0.07)",
  },
  sidebarTitle: {
    margin: "0 0 16px",
    fontSize: 26,
    letterSpacing: "-0.04em",
  },
  calculatorList: {
    display: "grid",
    gap: 10,
  },
  calculatorButton: {
    border: "1px solid #e2e8f0",
    background: "#f8fafc",
    borderRadius: 16,
    padding: 14,
    cursor: "pointer",
    textAlign: "left",
    color: "#0f172a",
  },
  calculatorButtonActive: {
    border: "1px solid #1d4ed8",
    background: "#eff6ff",
    borderRadius: 16,
    padding: 14,
    cursor: "pointer",
    textAlign: "left",
    color: "#0f172a",
    boxShadow: "0 10px 24px rgba(29,78,216,0.12)",
  },
  calculatorName: {
    display: "block",
    fontWeight: 900,
    marginBottom: 5,
  },
  calculatorDescription: {
    display: "block",
    color: "#64748b",
    lineHeight: 1.45,
    fontSize: 13,
    marginBottom: 10,
  },
  categoryPill: {
    display: "inline-flex",
    color: "#1d4ed8",
    background: "white",
    border: "1px solid #bfdbfe",
    borderRadius: 999,
    padding: "4px 8px",
    fontSize: 11,
    fontWeight: 900,
  },
  calculatorCard: {
    background: "white",
    border: "1px solid #e2e8f0",
    borderRadius: 24,
    boxShadow: "0 22px 60px rgba(15,23,42,0.08)",
    overflow: "hidden",
  },
  toolHeader: {
    padding: 26,
    borderBottom: "1px solid #e2e8f0",
    background: "linear-gradient(135deg, #ffffff, #f8fafc)",
  },
  toolCategory: {
    color: "#1d4ed8",
    fontWeight: 900,
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: "0.12em",
    marginBottom: 8,
  },
  toolTitle: {
    margin: "0 0 8px",
    fontSize: 32,
    letterSpacing: "-0.04em",
  },
  toolDescription: {
    margin: 0,
    color: "#64748b",
    lineHeight: 1.55,
  },
  toolBody: {
    padding: 26,
  },
  formGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 16,
    marginBottom: 16,
  },
  inlineResult: {
  background: "#eff6ff",
  border: "1px solid #bfdbfe",
  color: "#1e3a8a",
  borderRadius: 16,
  padding: 14,
  margin: "8px 0 18px",
  fontWeight: 800,
},
  label: {
    display: "grid",
    gap: 7,
    fontWeight: 800,
    color: "#334155",
    fontSize: 14,
  },
  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: "13px 14px",
    borderRadius: 14,
    border: "1px solid #cbd5e1",
    fontSize: 16,
    outline: "none",
    background: "#ffffff",
    color: "#0f172a",
  },
  checkboxLabel: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    margin: "8px 0 18px",
    fontWeight: 800,
    color: "#334155",
  },
  resultBox: {
    borderRadius: 20,
    padding: 20,
    margin: "22px 0",
    border: "1px solid #e2e8f0",
  },
  resultNeutral: {
    background: "#f8fafc",
  },
  resultLow: {
    background: "#f0fdf4",
    borderColor: "#bbf7d0",
  },
  resultModerate: {
    background: "#fffbeb",
    borderColor: "#fde68a",
  },
  resultHigh: {
    background: "#fef2f2",
    borderColor: "#fecaca",
  },
  resultLabel: {
    fontSize: 13,
    color: "#64748b",
    fontWeight: 900,
    textTransform: "uppercase",
    letterSpacing: "0.1em",
    marginBottom: 8,
  },
  resultValue: {
    fontSize: 34,
    fontWeight: 950,
    letterSpacing: "-0.04em",
    color: "#0f172a",
  },
  resultUnit: {
    fontSize: 17,
    color: "#475569",
    fontWeight: 800,
  },
  resultInterpretation: {
    margin: "10px 0 0",
    color: "#334155",
    lineHeight: 1.55,
  },
  clinicalNote: {
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
    borderRadius: 20,
    padding: 20,
    display: "grid",
    gap: 12,
  },
  noteRow: {
    display: "grid",
    gap: 4,
    color: "#334155",
    lineHeight: 1.5,
  },
  smallDisclaimer: {
    margin: "6px 0 0",
    color: "#64748b",
    fontSize: 13,
    lineHeight: 1.5,
  },
  scoreList: {
    display: "grid",
    gap: 10,
  },
  scoreItem: {
    display: "grid",
    gridTemplateColumns: "22px 1fr auto",
    gap: 10,
    alignItems: "center",
    border: "1px solid #e2e8f0",
    background: "#f8fafc",
    borderRadius: 14,
    padding: 12,
    cursor: "pointer",
  },
  scoreItemText: {
    color: "#334155",
    fontWeight: 750,
  },
  scorePoints: {
    color: "#0f172a",
    fontWeight: 950,
  },
  disclaimerBox: {
    position: "relative",
    zIndex: 1,
    maxWidth: 1180,
    margin: "56px auto 0",
    background: "#0f172a",
    color: "white",
    borderRadius: 24,
    padding: 26,
    boxShadow: "0 20px 50px rgba(15,23,42,0.18)",
  },
  disclaimerTitle: {
    margin: "0 0 10px",
    fontSize: 24,
  },
  disclaimerText: {
    margin: 0,
    color: "#cbd5e1",
    lineHeight: 1.65,
  },
  footer: {
    position: "relative",
    zIndex: 1,
    maxWidth: 1180,
    margin: "28px auto 0",
    padding: "24px 0 10px",
    display: "flex",
    justifyContent: "space-between",
    gap: 20,
    color: "#475569",
    flexWrap: "wrap",
  },
  footerText: {
    margin: "4px 0 0",
    color: "#64748b",
  },
  footerLink: {
    color: "#2563eb",
    fontWeight: 800,
    textDecoration: "none",
  },
};
