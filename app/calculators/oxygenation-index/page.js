"use client";

import { useMemo, useState } from "react";


function n(value) {
  if (value === null || value === undefined) return 0;
  const normalized = String(value).replace(/,/g, ".");
  const parsed = parseFloat(normalized);
  return Number.isFinite(parsed) ? parsed : 0;
}


export default function Page() {
  const [fio2, setFio2] = useState("");
  const [map, setMap] = useState("");
  const [pao2, setPao2] = useState("");

  const oi = useMemo(() => {
    const f = n(fio2);
    const m = n(map);
    const p = n(pao2);

    if (!f || !m || !p) return null;

    const fraction = f > 1 ? f / 100 : f;
    return (fraction * m * 100) / p;
  }, [fio2, map, pao2]);

  const interpretation =
    oi === null ? "" :
    oi < 5 ? "Mild oxygenation impairment" :
    oi < 15 ? "Moderate oxygenation impairment" :
    oi < 25 ? "Severe oxygenation impairment" :
    "Very severe oxygenation impairment";

  return (
    <main style={styles.main}>
      <a href="/" style={styles.back}>← Back to Meddoq</a>

      <section style={styles.hero}>
        <p style={styles.kicker}>Critical Care Calculator</p>
        <h1>Oxygenation Index Calculator</h1>
        <p>Calculate oxygenation index using FiO₂, mean airway pressure and PaO₂.</p>
      </section>

      <section style={styles.card}>
        <div style={styles.grid}>
          <label style={styles.label}>FiO₂
            <input type="text" style={styles.input} value={fio2} onChange={(e) => setFio2(e.target.value.replace(/,/g, "."))} inputMode="decimal" pattern="[0-9]*[.,]?[0-9]*" placeholder="0.60 or 60" />
          </label>

          <label style={styles.label}>Mean airway pressure (cmH₂O)
            <input type="text" style={styles.input} value={map} onChange={(e) => setMap(e.target.value.replace(/,/g, "."))} inputMode="decimal" pattern="[0-9]*[.,]?[0-9]*" placeholder="18" />
          </label>

          <label style={styles.label}>PaO₂ (mmHg)
            <input type="text" style={styles.input} value={pao2} onChange={(e) => setPao2(e.target.value.replace(/,/g, "."))} inputMode="decimal" pattern="[0-9]*[.,]?[0-9]*" placeholder="80" />
          </label>
        </div>

        <div style={styles.result}>
          <span>Oxygenation Index</span>
          <strong>{oi === null ? "—" : oi.toFixed(1)}</strong>
          <p><b>{interpretation}</b></p>
          <p>Higher oxygenation index indicates worse oxygenation relative to ventilatory support.</p>
        </div>
      </section>

      <section style={styles.content}>
        <h2>Formula</h2>
        <p><strong>OI = FiO₂ × mean airway pressure × 100 / PaO₂</strong></p>

        <h2>Clinical use</h2>
        <p>Oxygenation index supports assessment of hypoxemic respiratory failure and ventilatory support severity.</p>

        <h2>Limitations</h2>
        <p>Interpret with ventilator settings, PEEP, lung mechanics, hemodynamics and clinical context.</p>
      </section>
    </main>
  );
}

const styles = {
  main: { maxWidth: 980, margin: "0 auto", padding: 24, fontFamily: "Inter,system-ui,sans-serif", color: "#0f172a" },
  back: { color: "#2563eb", fontWeight: 800, textDecoration: "none" },
  hero: { marginTop: 32, background: "linear-gradient(135deg,#fff,#eff6ff)", border: "1px solid #dbeafe", borderRadius: 28, padding: 40 },
  kicker: { color: "#2563eb", fontWeight: 900, fontSize: 12, textTransform: "uppercase" },
  card: { marginTop: 24, background: "#fff", border: "1px solid #e2e8f0", borderRadius: 24, padding: 24 },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,220px),1fr))", gap: 16 },
  label: { display: "grid", gap: 8, fontWeight: 700 },
  input: { padding: 14, borderRadius: 12, border: "1px solid #cbd5e1" },
  result: { marginTop: 24, background: "#eff6ff", padding: 20, borderRadius: 18, border: "1px solid #bfdbfe" },
  content: { marginTop: 32, lineHeight: 1.7, fontSize: 17 },
};
