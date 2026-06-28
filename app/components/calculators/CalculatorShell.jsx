import Badge from "../ui/Badge";

export default function CalculatorShell({
  category = "Clinical",
  title,
  description,
  children,
}) {
  return (
    <main style={styles.main}>
      <a href="/" style={styles.back}>← Back to Meddoq</a>

      <section style={styles.hero}>
        <div style={styles.badges}>
          <Badge>{category}</Badge>
          <Badge tone="slate">Calculator + Medical Reference</Badge>
        </div>

        <h1 style={styles.title}>{title}</h1>

        {description ? <p style={styles.description}>{description}</p> : null}
      </section>

      {children}
    </main>
  );
}

const styles = {
  main: {
    maxWidth: 980,
    margin: "0 auto",
    padding: "24px",
    fontFamily:
      'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    color: "#0f172a",
  },
  back: {
    color: "#2563eb",
    textDecoration: "none",
    fontWeight: 800,
    fontSize: 14,
  },
  hero: {
    marginTop: 24,
    marginBottom: 24,
    background: "linear-gradient(135deg,#eff6ff,#ffffff)",
    border: "1px solid #dbeafe",
    borderRadius: 28,
    padding: 30,
    boxShadow: "0 20px 55px rgba(15,23,42,0.06)",
  },
  badges: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 14,
  },
  title: {
    margin: 0,
    color: "#0f172a",
    fontSize: 42,
    lineHeight: 1.05,
    letterSpacing: "-0.05em",
  },
  description: {
    margin: "14px 0 0",
    color: "#475569",
    fontSize: 18,
    lineHeight: 1.7,
    maxWidth: 780,
  },
};
