export default function Section({ kicker, title, description, children }) {
  return (
    <section style={styles.section}>
      {kicker ? <p style={styles.kicker}>{kicker}</p> : null}
      {title ? <h2 style={styles.title}>{title}</h2> : null}
      {description ? <p style={styles.description}>{description}</p> : null}
      <div style={styles.body}>{children}</div>
    </section>
  );
}

const styles = {
  section: { marginTop: 28 },
  kicker: {
    margin: "0 0 8px",
    color: "#2563eb",
    fontSize: 12,
    fontWeight: 900,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
  },
  title: {
    margin: "0 0 10px",
    color: "#0f172a",
    fontSize: 28,
    lineHeight: 1.15,
    letterSpacing: "-0.03em",
  },
  description: {
    margin: "0 0 16px",
    color: "#475569",
    fontSize: 16,
    lineHeight: 1.7,
  },
  body: {
    color: "#475569",
    fontSize: 16,
    lineHeight: 1.75,
  },
};
