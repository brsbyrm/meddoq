"use client";

export default function PremiumResultCard({
  title = "Result",
  value = "—",
  unit = "",
  interpretation = "Interpret this result together with the full clinical context.",
  recommendation = "Confirm inputs, assess patient-specific risk, and follow current guideline-based care.",
}) {
  return (
    <section style={styles.card}>
      <p style={styles.kicker}>Professional Result</p>

      <h2 style={styles.title}>{title}</h2>

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
  kicker: {
    margin: 0,
    color: "#2563eb",
    fontSize: 12,
    fontWeight: 900,
    letterSpacing: "0.09em",
    textTransform: "uppercase",
  },
  title: {
    margin: "8px 0 18px",
    fontSize: 24,
    lineHeight: 1.15,
    letterSpacing: "-0.02em",
    color: "#0f172a",
  },
  valueBox: {
    border: "1px solid #e2e8f0",
    borderRadius: 24,
    background: "#ffffff",
    padding: "28px 18px",
    textAlign: "center",
  },
  value: {
    fontSize: 56,
    lineHeight: 1,
    fontWeight: 950,
    letterSpacing: "-0.05em",
    color: "#0f172a",
  },
  unit: {
    marginTop: 8,
    fontSize: 17,
    fontWeight: 800,
    color: "#64748b",
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
    fontSize: 15,
    fontWeight: 900,
    color: "#0f172a",
  },
  text: {
    margin: 0,
    fontSize: 14,
    lineHeight: 1.65,
    color: "#475569",
  },
};
