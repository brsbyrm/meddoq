"use client";

import { useMemo, useState } from "react";

const calculators = [
  ["Aortic Size Index", "Vascular", "/calculators/aortic-size-index", "aortic diameter body surface area ASI"],
  ["eGFR", "Renal", "/calculators/egfr", "kidney renal creatinine CKD-EPI glomerular filtration rate"],
  ["Creatinine Clearance", "Renal", "/calculators/creatinine-clearance", "Cockcroft Gault drug dosing creatinine clearance"],
  ["Body Surface Area", "General", "/calculators/body-surface-area", "BSA Mosteller height weight"],
  ["Body Mass Index", "General", "/calculators/body-mass-index", "BMI weight height obesity"],
  ["CHA₂DS₂-VASc", "Cardiovascular", "/calculators/cha2ds2-vasc", "atrial fibrillation stroke risk anticoagulation"],
  ["HAS-BLED", "Cardiovascular", "/calculators/has-bled", "bleeding risk anticoagulation atrial fibrillation"],
  ["Wells DVT", "Vascular", "/calculators/wells-dvt", "deep vein thrombosis DVT probability"],
  ["HEART Score", "Cardiology", "/calculators/heart-score", "chest pain ACS troponin ECG MACE"],
  ["TIMI NSTEMI/UA Score", "Cardiology", "/calculators/timi-nstemi-ua-score", "NSTEMI unstable angina ACS ischemic risk"],
  ["CURB-65 Score", "Pulmonology", "/calculators/curb-65-score", "pneumonia CAP confusion urea respiratory rate blood pressure age"],
];

export default function SearchPage() {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return calculators;
    return calculators.filter(([name, category, , keywords]) =>
      `${name} ${category} ${keywords}`.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <main style={styles.main}>
      <a href="/" style={styles.back}>← Back to Meddoq</a>

      <section style={styles.hero}>
        <p style={styles.kicker}>Search</p>
        <h1>Search clinical calculators</h1>
        <p>Find Meddoq calculators by name, category or clinical keyword.</p>

        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search eGFR, DVT, ASI, BMI..."
          style={styles.search}
        />
      </section>

      <section style={styles.grid}>
        {results.map(([name, category, href]) => (
          <a href={href} key={href} style={styles.card}>
            <span style={styles.badge}>{category}</span>
            <h2>{name}</h2>
            <strong>Open calculator →</strong>
          </a>
        ))}
      </section>
    </main>
  );
}

const styles = {
  main: {
    maxWidth: 1000,
    margin: "0 auto",
    padding: 24,
    fontFamily:
      'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    color: "#0f172a",
  },
  back: {
    color: "#2563eb",
    fontWeight: 800,
    textDecoration: "none",
  },
  hero: {
    marginTop: 32,
    background: "linear-gradient(135deg, #ffffff, #eff6ff)",
    border: "1px solid #dbeafe",
    borderRadius: 28,
    padding: "clamp(26px, 5vw, 46px)",
    boxShadow: "0 24px 70px rgba(15,23,42,0.08)",
  },
  kicker: {
    color: "#2563eb",
    fontWeight: 900,
    textTransform: "uppercase",
    letterSpacing: "0.12em",
    fontSize: 12,
  },
  search: {
    marginTop: 24,
    width: "100%",
    padding: "16px 18px",
    borderRadius: 16,
    border: "1px solid #bfdbfe",
    fontSize: 17,
    outline: "none",
  },
  grid: {
    marginTop: 28,
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))",
    gap: 16,
  },
  card: {
    background: "white",
    border: "1px solid #e2e8f0",
    borderRadius: 22,
    padding: 22,
    textDecoration: "none",
    color: "#0f172a",
    boxShadow: "0 14px 36px rgba(15,23,42,0.06)",
  },
  badge: {
    color: "#2563eb",
    background: "#eff6ff",
    border: "1px solid #bfdbfe",
    borderRadius: 999,
    padding: "5px 9px",
    fontSize: 11,
    fontWeight: 900,
  },
};
