export default function Section({ kicker, title, children }) {
  return (
    <section style={styles.section}>
      {kicker ? <p style={styles.kicker}>{kicker}</p> : null}
      {title ? <h2 style={styles.title}>{title}</h2> : null}
      <div style={styles.body}>{children}</div>
    </section>
  );
}

const styles = {
  section: {
    marginTop: 28,
  },
  kicker: {
    margin: "0 0 8px",
    color: "#2563eb",
    fontSize: 12,
    fontWeight: 900,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
  },
  title: {
    margin: "0 0 14px",
    color: "#0f172a",
    fontSize: 28,
    lineHeight: 1.15,
    letterSpacing: "-0.03em",
  },
  body: {
    color: "#475569",
    fontSize: 16,
    lineHeight: 1.75,
  },
};
