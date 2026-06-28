"use client";

import { useMemo, useState } from "react";
import CalculatorShell from "../../components/calculators/CalculatorShell";
import CalculatorPanel from "../../components/calculators/CalculatorPanel";
import CalculatorResult from "../../components/calculators/CalculatorResult";

function calculateEgfr(creatinine, age, sex) {
  const scr = Number(creatinine);
  const patientAge = Number(age);

  if (!scr || !patientAge || scr <= 0 || patientAge <= 0) return null;

  const isFemale = sex === "female";
  const kappa = isFemale ? 0.7 : 0.9;
  const alpha = isFemale ? -0.241 : -0.302;
  const sexFactor = isFemale ? 1.012 : 1;

  const minPart = Math.min(scr / kappa, 1) ** alpha;
  const maxPart = Math.max(scr / kappa, 1) ** -1.2;
  const agePart = 0.9938 ** patientAge;

  return Math.round(142 * minPart * maxPart * agePart * sexFactor);
}

function interpretEgfr(value) {
  if (value === null) {
    return {
      tone: "neutral",
      label: "Enter values",
      interpretation: "Enter serum creatinine, age and sex to calculate eGFR.",
      recommendation: "Use a stable serum creatinine value when possible.",
    };
  }

  if (value >= 90) {
    return {
      tone: "green",
      label: "G1 / normal or high",
      interpretation: "eGFR is ≥90 mL/min/1.73 m². Kidney function may be normal if there is no other evidence of kidney disease.",
      recommendation: "Interpret with albuminuria, urinalysis, imaging, comorbidities and longitudinal trend.",
    };
  }

  if (value >= 60) {
    return {
      tone: "green",
      label: "G2 / mildly decreased",
      interpretation: "eGFR is 60–89 mL/min/1.73 m². This is mildly decreased and does not diagnose CKD by itself.",
      recommendation: "Assess persistence, albuminuria and other markers of kidney damage.",
    };
  }

  if (value >= 45) {
    return {
      tone: "amber",
      label: "G3a / mild-moderate decrease",
      interpretation: "eGFR is 45–59 mL/min/1.73 m², consistent with G3a if persistent.",
      recommendation: "Review albuminuria, cardiovascular risk, medications and renal trend.",
    };
  }

  if (value >= 30) {
    return {
      tone: "amber",
      label: "G3b / moderate-severe decrease",
      interpretation: "eGFR is 30–44 mL/min/1.73 m², consistent with G3b if persistent.",
      recommendation: "Review medication dosing, nephrotoxic exposure, albuminuria and consider nephrology referral depending on context.",
    };
  }

  if (value >= 15) {
    return {
      tone: "red",
      label: "G4 / severely decreased",
      interpretation: "eGFR is 15–29 mL/min/1.73 m², consistent with severe reduction in kidney function.",
      recommendation: "Assess complications, medication dosing, nephrology involvement and renal replacement planning when appropriate.",
    };
  }

  return {
    tone: "red",
    label: "G5 / kidney failure range",
    interpretation: "eGFR is <15 mL/min/1.73 m², within the kidney failure range.",
    recommendation: "Urgent clinical review is appropriate depending on symptoms, potassium, acid-base status, volume status and trajectory.",
  };
}

export default function EgfrPage() {
  const [creatinine, setCreatinine] = useState("");
  const [age, setAge] = useState("");
  const [sex, setSex] = useState("male");

  const egfr = useMemo(() => calculateEgfr(creatinine, age, sex), [creatinine, age, sex]);
  const result = useMemo(() => interpretEgfr(egfr), [egfr]);

  return (
    <CalculatorShell
      category="Renal"
      title="eGFR Calculator"
      description="Estimate glomerular filtration rate using the CKD-EPI 2021 creatinine equation."
    >
      <CalculatorPanel>
        <div style={styles.grid}>
          <label style={styles.label}>
            Serum creatinine
            <input
              style={styles.input}
              value={creatinine}
              onChange={(event) => setCreatinine(event.target.value)}
              placeholder="1.0"
              inputMode="decimal"
            />
            <span style={styles.unit}>mg/dL</span>
          </label>

          <label style={styles.label}>
            Age
            <input
              style={styles.input}
              value={age}
              onChange={(event) => setAge(event.target.value)}
              placeholder="60"
              inputMode="numeric"
            />
            <span style={styles.unit}>years</span>
          </label>

          <label style={styles.label}>
            Sex
            <select
              style={styles.input}
              value={sex}
              onChange={(event) => setSex(event.target.value)}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </label>
        </div>

        <CalculatorResult
          title="Estimated GFR"
          value={egfr !== null ? egfr : "—"}
          unit="mL/min/1.73 m²"
          tone={result.tone}
          interpretation={result.interpretation}
          recommendation={result.recommendation}
        />
      </CalculatorPanel>

      <section style={styles.reference}>
        <div style={styles.referenceHeader}>
          <p style={styles.referenceKicker}>Clinical Reference</p>
          <h2 style={styles.referenceTitle}>eGFR Clinical Reference</h2>
          <p style={styles.referenceIntro}>
            Estimated glomerular filtration rate supports chronic kidney disease staging,
            medication dosing review and longitudinal kidney function monitoring.
          </p>
        </div>

        <div style={styles.referenceGrid}>
          <article style={styles.referenceCard}>
            <h3>When to use</h3>
            <p>
              Use eGFR to estimate kidney function in adults when serum creatinine-based renal assessment is clinically appropriate.
            </p>
          </article>

          <article style={styles.referenceCard}>
            <h3>How to interpret</h3>
            <p>
              Lower eGFR values indicate reduced filtration. CKD interpretation requires persistence over time and assessment of albuminuria or kidney damage markers.
            </p>
          </article>

          <article style={styles.referenceCard}>
            <h3>Clinical limitations</h3>
            <p>
              Creatinine-based eGFR may be unreliable in acute kidney injury, pregnancy, extremes of muscle mass, amputation, malnutrition, edema or rapidly changing renal function.
            </p>
          </article>

          <article style={styles.referenceCard}>
            <h3>Next clinical step</h3>
            <p>
              Interpret with creatinine trend, urine albumin-creatinine ratio, medications, volume status, comorbidities and nephrology referral thresholds.
            </p>
          </article>
        </div>

        <div style={styles.faqBox}>
          <h3>FAQ</h3>
          <details style={styles.detail}>
            <summary>Does one low eGFR diagnose CKD?</summary>
            <p>No. CKD generally requires decreased kidney function or kidney damage markers persisting for at least 3 months.</p>
          </details>
          <details style={styles.detail}>
            <summary>Is eGFR accurate during acute kidney injury?</summary>
            <p>No. eGFR equations assume relatively steady-state creatinine and can be misleading when creatinine is changing rapidly.</p>
          </details>
          <details style={styles.detail}>
            <summary>Should albuminuria be assessed?</summary>
            <p>Yes. Albuminuria improves CKD risk stratification and prognosis.</p>
          </details>
        </div>

        <div style={styles.referencesBox}>
          <h3>References</h3>
          <ol>
            <li>Inker LA et al. New creatinine- and cystatin C-based equations to estimate GFR without race. N Engl J Med. 2021.</li>
            <li>KDIGO Clinical Practice Guideline for the Evaluation and Management of Chronic Kidney Disease.</li>
            <li>Levey AS et al. A new equation to estimate glomerular filtration rate. Ann Intern Med. 2009.</li>
          </ol>
        </div>
      </section>
    </CalculatorShell>
  );
}

const styles = {
  grid: {
    display: "grid",
    gap: 14,
  },
  label: {
    display: "grid",
    gap: 8,
    color: "#0f172a",
    fontSize: 14,
    fontWeight: 850,
  },
  input: {
    width: "100%",
    padding: 14,
    borderRadius: 14,
    border: "1px solid #cbd5e1",
    background: "#ffffff",
    color: "#0f172a",
    fontSize: 15,
  },
  unit: {
    color: "#64748b",
    fontSize: 13,
    fontWeight: 700,
  },
  reference: {
    marginTop: 28,
    display: "grid",
    gap: 18,
  },
  referenceHeader: {
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: 24,
    padding: 24,
    boxShadow: "0 18px 44px rgba(15, 23, 42, 0.06)",
  },
  referenceKicker: {
    margin: 0,
    color: "#2563eb",
    fontWeight: 900,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    fontSize: 12,
  },
  referenceTitle: {
    margin: "8px 0",
    color: "#0f172a",
    fontSize: 30,
    letterSpacing: "-0.04em",
  },
  referenceIntro: {
    margin: 0,
    color: "#475569",
    fontSize: 16,
    lineHeight: 1.65,
  },
  referenceGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 14,
  },
  referenceCard: {
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: 20,
    padding: 18,
    boxShadow: "0 14px 34px rgba(15, 23, 42, 0.05)",
  },
  faqBox: {
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: 22,
    padding: 22,
  },
  referencesBox: {
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: 22,
    padding: 22,
    color: "#334155",
    lineHeight: 1.65,
  },
  detail: {
    borderTop: "1px solid #e2e8f0",
    padding: "12px 0",
    color: "#334155",
  },
};
