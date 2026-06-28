"use client";

import { useMemo, useState } from "react";

export default function Page() {
  const [ph, setPh] = useState("");
  const [hco3, setHco3] = useState("");

  const result = useMemo(() => {
    const pH = Number(ph);
    const bicarbonate = Number(hco3);

    if (!pH || !bicarbonate) return null;

    const baseExcess = 0.93 * (bicarbonate - 24.4 + 14.83 * (pH - 7.4));

    let interpretation = "Normal base excess range";
    if (baseExcess < -2) interpretation = "Base deficit / metabolic acidosis pattern";
    if (baseExcess > 2) interpretation = "Base excess / metabolic alkalosis pattern";

    return { baseExcess, interpretation };
  }, [ph, hco3]);

  return (
    <main style={styles.main}>
      <a href="/" style={styles.back}>← Back to Meddoq</a>

      <section style={styles.hero}>
        <p style={styles.kicker}>Acid-Base Calculator</p>
        <h1>Base Excess Calculator</h1>
        <p>Estimate base excess from arterial pH and bicarbonate.</p>
      </section>

      <section style={styles.card}>
        <div style={styles.grid}>
          <label style={styles.label}>pH
            <input style={styles.input} value={ph} onChange={(e) => setPh(e.target.value)} inputMode="decimal" placeholder="7.32" />
          </label>

          <label style={styles.label}>Bicarbonate HCO₃⁻ (mEq/L)
            <input style={styles.input} value={hco3} onChange={(e) => setHco3(e.target.value)} inputMode="decimal" placeholder="18" />
          </label>
        </div>

        <div style={styles.result}>
          <span>Base Excess</span>
          <strong>{result ? result.baseExcess.toFixed(1) : "—"} mEq/L</strong>
          {result && <p><b>{result.interpretation}</b></p>}
          <p>Base excess supports assessment of the metabolic component of acid-base disorders.</p>
        </div>
      </section>

      <section style={styles.content}>
        <h2>Formula</h2>
        <p><strong>BE = 0.93 × [HCO₃⁻ − 24.4 + 14.83 × (pH − 7.4)]</strong></p>

        <h2>Clinical use</h2>
        <p>Base excess is commonly used in arterial blood gas interpretation, shock assessment and metabolic acid-base evaluation.</p>

        <h2>Limitations</h2>
        <p>Interpret with pH, PaCO₂, lactate, electrolytes, albumin, renal function and clinical context.</p>
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
