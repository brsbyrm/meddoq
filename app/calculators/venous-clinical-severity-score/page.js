"use client";

import { useMemo, useState } from "react";


function n(value) {
  if (value === null || value === undefined) return 0;
  const normalized = String(value).replace(/,/g, ".");
  const parsed = parseFloat(normalized);
  return Number.isFinite(parsed) ? parsed : 0;
}


const domains = [
  {
    id: "pain",
    title: "Pain",
    options: [
      "None",
      "Occasional pain or discomfort",
      "Daily pain or discomfort interfering with but not preventing activity",
      "Daily pain or discomfort limiting most regular activity",
    ],
  },
  {
    id: "varicoseVeins",
    title: "Varicose veins",
    options: [
      "None",
      "Few scattered branch varicosities",
      "Multiple varicosities confined to calf or thigh",
      "Extensive varicosities involving calf and thigh",
    ],
  },
  {
    id: "edema",
    title: "Venous edema",
    options: [
      "None",
      "Evening ankle edema only",
      "Afternoon edema above ankle",
      "Morning edema above ankle requiring activity change",
    ],
  },
  {
    id: "pigmentation",
    title: "Skin pigmentation",
    options: [
      "None",
      "Limited perimalleolar pigmentation",
      "Diffuse pigmentation over lower third of calf",
      "Wider distribution above lower third of calf",
    ],
  },
  {
    id: "inflammation",
    title: "Inflammation",
    options: [
      "None",
      "Mild cellulitis or limited dermatitis",
      "Moderate cellulitis or dermatitis involving lower third of calf",
      "Severe inflammation involving more than lower third of calf",
    ],
  },
  {
    id: "induration",
    title: "Induration",
    options: [
      "None",
      "Focal perimalleolar induration",
      "Medial or lateral lower third of calf",
      "Entire lower third of calf or more",
    ],
  },
  {
    id: "activeUlcers",
    title: "Number of active ulcers",
    options: ["0", "1", "2", "3 or more"],
  },
  {
    id: "ulcerDuration",
    title: "Active ulcer duration",
    options: ["None", "<3 months", "3–12 months", ">12 months"],
  },
  {
    id: "ulcerSize",
    title: "Active ulcer size",
    options: ["None", "<2 cm", "2–6 cm", ">6 cm"],
  },
  {
    id: "compression",
    title: "Compression therapy use",
    options: [
      "Not used",
      "Intermittent use",
      "Wears elastic stockings most days",
      "Full compliance with stockings and elevation",
    ],
    reverse: true,
  },
];

function severity(score) {
  if (score <= 4) return "Mild clinical severity";
  if (score <= 9) return "Moderate clinical severity";
  if (score <= 14) return "Severe clinical severity";
  return "Very severe clinical severity";
}

export default function Page() {
  const [values, setValues] = useState(
    Object.fromEntries(domains.map((d) => [d.id, "0"]))
  );

  const score = useMemo(() => {
    return domains.reduce((sum, d) => {
      const value = n(values[d.id] || 0);
      return sum + (d.reverse ? 3 - value : value);
    }, 0);
  }, [values]);

  return (
    <main style={styles.main}>
      <a href="/" style={styles.back}>← Back to Meddoq</a>

      <section style={styles.hero}>
        <p style={styles.kicker}>Vascular Calculator</p>
        <h1>Venous Clinical Severity Score Calculator</h1>
        <p>
          Calculate VCSS for chronic venous disease using pain, edema, skin changes,
          ulcers and compression therapy.
        </p>
      </section>

      <section style={styles.card}>
        <div style={styles.grid}>
          {domains.map((domain) => (
            <label key={domain.id} style={styles.label}>
              {domain.title}
              <select
                style={styles.input}
                value={values[domain.id]}
                onChange={(e) =>
                  setValues((prev) => ({ ...prev, [domain.id]: e.target.value }))
                }
              >
                {domain.options.map((option, index) => (
                  <option key={option} value={index}>
                    {domain.reverse ? 3 - index : index} — {option}
                  </option>
                ))}
              </select>
            </label>
          ))}
        </div>

        <div style={styles.result}>
          <span>VCSS Total Score</span>
          <strong>{score}</strong>
          <p><b>{severity(score)}</b></p>
          <p>
            Higher scores indicate more severe chronic venous disease. Follow-up
            scoring can help document clinical change after compression, intervention
            or wound treatment.
          </p>
          <p><b>Clinical meaning:</b> Mild scores usually reflect limited symptoms/signs; moderate or severe scores suggest clinically significant venous disease or ulcer burden.</p>
          <p><b>Next step:</b> Correlate with CEAP class, duplex reflux/obstruction findings, compression use and wound trajectory.</p>
        </div>
      </section>

      <section style={styles.content}>
        <h2>Clinical use</h2>
        <p>
          The Venous Clinical Severity Score is used to quantify clinical severity in
          chronic venous disease and to monitor response to treatment.
        </p>

        <h2>Scoring</h2>
        <p>
          Ten domains are scored from 0 to 3. Total score ranges from 0 to 30.
          The compression domain is scored so that better compliance lowers the total severity score.
        </p>

        <h2>Limitations</h2>
        <p>
          VCSS should be interpreted with CEAP class, duplex findings, ulcer status,
          symptoms, recurrence history and clinical context.
        </p>

        <h2>References</h2>
        <p>
          Rutherford RB et al. J Vasc Surg. 2000. Vasquez MA et al. J Vasc Surg. 2010.
        </p>
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
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))", gap: 16 },
  label: { display: "grid", gap: 8, fontWeight: 800, color: "#334155" },
  input: { padding: "14px 16px", borderRadius: 14, border: "1px solid #cbd5e1", fontSize: 15, background: "#fff" },
  result: { marginTop: 24, background: "linear-gradient(135deg,#eff6ff,#ffffff)", border: "1px solid #bfdbfe", borderRadius: 20, padding: 22 },
  content: { marginTop: 32, lineHeight: 1.7, fontSize: 17 },
};
