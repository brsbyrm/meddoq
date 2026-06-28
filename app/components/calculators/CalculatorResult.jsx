"use client";

import Badge from "../ui/Badge";

export default function CalculatorResult({
  title = "Result",
  value = "—",
  unit = "",
  interpretation = "Interpret the result together with clinical context.",
  recommendation = "Confirm inputs, review patient-specific factors, and follow current standards of care.",
  tone = "blue",
}) {
  return (
    <section style={styles.card}>
      <div style={styles.header}>
        <div>
          <p style={styles.kicker}>Professional Result</p>
          <h2 style={styles.title}>{title}</h2>
        </div>
        <Badge tone={tone}>Clinical decision support</Badge>
      </div>

      <div style={styles.valueBox}>
        <div style={styles.value}>{value}</div>
        {unit ? <div style={styles.unit}>{unit}</div> : null}
      </div>

      <div style={styles.grid}>
        <div style={styles.info}>
          <h3 style={styles.infoTitle}>Interpretation</h3>
          <p style={styles.text}>{interpretation}</p>
        </div>

        <div style={styles.info}>
          <h3 style={styles.infoTitle}>Recommendation</h3>
          <p style={styles.text}>{recommendation}</p>
        </div>
      </div>
    </section>
  );
}

const styles = {
  card: {
    marginTop: 24,
    border: "1px solid #dbeafe",
    borderRadius: 28,
    background: "linear-gradient(180deg,#ffffff 0%,#f8fafc 100%)",
    boxShadow: "0 24px 60px rgba(15,23,42,0.08)",
    padding: 28,
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 16,
    flexWrap: "wrap",
  },
  kicker: {
    margin: 0,
    color: "#2563eb",
    fontSize: 12,
    fontWeight: 900,
    letterSpacing: "0.09em",
    textTransform: "uppercase",
  },
  title: {
    margin: "8px 0 0",
    color: "#0f172a",
    fontSize: 24,
    lineHeight: 1.15,
    letterSpacing: "-0.02em",
  },
  valueBox: {
    marginTop: 22,
    border: "1px solid #e2e8f0",
    borderRadius: 24,
    background: "#ffffff",
    padding: "30px 18px",
    textAlign: "center",
  },
  value: {
    color: "#0f172a",
    fontSize: 58,
    lineHeight: 1,
    fontWeight: 950,
    letterSpacing: "-0.05em",
  },
  unit: {
    marginTop: 8,
    color: "#64748b",
    fontSize: 17,
    fontWeight: 800,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
    gap: 14,
    marginTop: 18,
  },
  info: {
    border: "1px solid #e2e8f0",
    borderRadius: 20,
    background: "#ffffff",
    padding: 18,
  },
  infoTitle: {
    margin: "0 0 8px",
    color: "#0f172a",
    fontSize: 15,
    fontWeight: 900,
  },
  text: {
    margin: 0,
    color: "#475569",
    fontSize: 14,
    lineHeight: 1.65,
  },
};
