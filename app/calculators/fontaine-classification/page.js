"use client";

import { useMemo, useState } from "react";

const stages = [
  {
    value: "I",
    title: "Stage I",
    label: "Asymptomatic",
    description: "Peripheral arterial disease without typical limb symptoms.",
  },
  {
    value: "IIa",
    title: "Stage IIa",
    label: "Mild claudication",
    description: "Intermittent claudication with walking distance greater than 200 meters.",
  },
  {
    value: "IIb",
    title: "Stage IIb",
    label: "Moderate to severe claudication",
    description: "Intermittent claudication with walking distance less than 200 meters.",
  },
  {
    value: "III",
    title: "Stage III",
    label: "Ischemic rest pain",
    description: "Rest pain due to chronic limb ischemia.",
  },
  {
    value: "IV",
    title: "Stage IV",
    label: "Ulceration or gangrene",
    description: "Tissue loss, ulceration or gangrene related to severe ischemia.",
  },
];

export default function Page() {
  const [selected, setSelected] = useState("I");

  const result = useMemo(
    () => stages.find((item) => item.value === selected),
    [selected]
  );

  return (
    <main style={styles.main}>
      <a href="/" style={styles.back}>← Back to Meddoq</a>

      <section style={styles.hero}>
        <p style={styles.kicker}>Vascular Classification</p>
        <h1>Fontaine Classification Calculator</h1>
        <p>
          Classify peripheral arterial disease severity using Fontaine clinical stages.
        </p>
      </section>

      <section style={styles.card}>
        <div style={styles.grid}>
          {stages.map((item) => (
            <label key={item.value} style={styles.option}>
              <input
                type="radio"
                name="fontaine"
                value={item.value}
                checked={selected === item.value}
                onChange={(e) => setSelected(e.target.value.replace(/,/g, "."))}
              />
              <div>
                <strong>{item.title} — {item.label}</strong>
                <span>{item.description}</span>
              </div>
            </label>
          ))}
        </div>

        <div style={styles.result}>
          <span>Selected Fontaine Stage</span>
          <strong>{result.title}</strong>
          <p><b>{result.label}</b></p>
          <p>{result.description}</p>
          <p><b>Clinical meaning:</b></p>
          <ul>
            <li><b>Stage IIa:</b> Mild claudication; walking distance usually greater than 200 m.</li>
            <li><b>Stage IIb:</b> Moderate to severe claudication; walking distance less than 200 m.</li>
            <li><b>Stage III:</b> Ischemic rest pain; suggests advanced ischemia.</li>
            <li><b>Stage IV:</b> Ulceration or gangrene; chronic limb-threatening ischemia.</li>
          </ul>
          <p><b>Next step:</b> Combine with ABI/toe pressure and arterial imaging before treatment planning.</p>
        </div>
      </section>

      <section style={styles.content}>
        <h2>Clinical use</h2>
        <p>
          Fontaine classification is used to describe the clinical severity of peripheral arterial disease.
        </p>

        <h2>Interpretation</h2>
        <p>
          Stage II indicates claudication, stage III indicates rest pain, and stage IV indicates tissue loss.
        </p>

        <h2>References</h2>
        <p>Fontaine R et al. Classification of chronic arterial ischemia of the limbs.</p>
      </section>
    </main>
  );
}

const styles = {
  main: { maxWidth: 980, margin: "0 auto", padding: 24, fontFamily: "Inter, system-ui, sans-serif", color: "#0f172a" },
  back: { color: "#2563eb", fontWeight: 800, textDecoration: "none" },
  hero: { marginTop: 32, background: "linear-gradient(135deg,#ffffff,#eff6ff)", border: "1px solid #dbeafe", borderRadius: 28, padding: "clamp(26px,5vw,46px)", boxShadow: "0 24px 70px rgba(15,23,42,0.08)" },
  kicker: { color: "#2563eb", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.12em", fontSize: 12 },
  card: { marginTop: 24, background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: 24, padding: 24, boxShadow: "0 20px 60px rgba(15,23,42,0.08)" },
  grid: { display: "grid", gap: 12 },
  option: { display: "grid", gridTemplateColumns: "24px 1fr", gap: 12, alignItems: "center", background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 16, padding: 14, cursor: "pointer" },
  result: { marginTop: 24, background: "linear-gradient(135deg,#eff6ff,#ffffff)", border: "1px solid #bfdbfe", borderRadius: 20, padding: 22 },
  content: { marginTop: 32, lineHeight: 1.7, fontSize: 17 },
};
