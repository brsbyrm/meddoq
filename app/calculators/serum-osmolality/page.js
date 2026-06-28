"use client";

import { useMemo, useState } from "react";

export default function Page() {
  const [na, setNa] = useState("");
  const [glucose, setGlucose] = useState("");
  const [bun, setBun] = useState("");
  const [ethanol, setEthanol] = useState("");
  const [measured, setMeasured] = useState("");

  const result = useMemo(() => {
    const sodium = Number(na);
    const glu = Number(glucose);
    const b = Number(bun);
    const eth = Number(ethanol || 0);
    const meas = Number(measured || 0);

    if (!sodium || !glu || !b) return null;

    const calculated = 2 * sodium + glu / 18 + b / 2.8 + eth / 4.6;
    const gap = meas ? meas - calculated : null;

    return { calculated, gap };
  }, [na, glucose, bun, ethanol, measured]);

  const gapText =
    !result || result.gap === null
      ? ""
      : result.gap > 10
      ? "Elevated osmolar gap"
      : "Normal osmolar gap range";

  return (
    <main style={styles.main}>
      <a href="/" style={styles.back}>← Back to Meddoq</a>

      <section style={styles.hero}>
        <p style={styles.kicker}>Renal / Electrolyte Calculator</p>
        <h1>Serum Osmolality Calculator</h1>
        <p>Calculate estimated serum osmolality and optional osmolar gap.</p>
      </section>

      <section style={styles.card}>
        <div style={styles.grid}>
          <label style={styles.label}>Sodium Na⁺ (mEq/L)
            <input style={styles.input} value={na} onChange={(e) => setNa(e.target.value)} inputMode="decimal" placeholder="140" />
          </label>

          <label style={styles.label}>Glucose (mg/dL)
            <input style={styles.input} value={glucose} onChange={(e) => setGlucose(e.target.value)} inputMode="decimal" placeholder="100" />
          </label>

          <label style={styles.label}>BUN (mg/dL)
            <input style={styles.input} value={bun} onChange={(e) => setBun(e.target.value)} inputMode="decimal" placeholder="14" />
          </label>

          <label style={styles.label}>Ethanol (mg/dL) optional
            <input style={styles.input} value={ethanol} onChange={(e) => setEthanol(e.target.value)} inputMode="decimal" placeholder="0" />
          </label>

          <label style={styles.label}>Measured osmolality optional
            <input style={styles.input} value={measured} onChange={(e) => setMeasured(e.target.value)} inputMode="decimal" placeholder="290" />
          </label>
        </div>

        <div style={styles.result}>
          <span>Calculated Serum Osmolality</span>
          <strong>{result ? result.calculated.toFixed(1) : "—"} mOsm/kg</strong>
          {result && result.gap !== null && <p>Osmolar gap: <b>{result.gap.toFixed(1)} mOsm/kg</b></p>}
          <p><b>{gapText}</b></p>
          <p>Interpret with sodium status, glucose, renal function, alcohols and toxic exposure history.</p>
        </div>
      </section>

      <section style={styles.content}>
        <h2>Formula</h2>
        <p><strong>Calculated osmolality = 2 × Na + glucose/18 + BUN/2.8 + ethanol/4.6</strong></p>

        <h2>Clinical use</h2>
        <p>Calculated serum osmolality and osmolar gap support evaluation of dysnatremia, hyperglycemia and suspected toxic alcohol ingestion.</p>

        <h2>References</h2>
        <p>Smithline N, Gardner KD. N Engl J Med. 1976.</p>
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
