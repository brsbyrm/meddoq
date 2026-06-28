export default function ReferenceBox({ references = [] }) {
  if (!references.length) return null;

  return (
    <section style={styles.box}>
      <h3 style={styles.title}>References</h3>
      <ol style={styles.list}>
        {references.map((reference) => (
          <li key={reference}>{reference}</li>
        ))}
      </ol>
    </section>
  );
}

const styles = {
  box: {
    marginTop: 24,
    border: "1px solid #e2e8f0",
    borderRadius: 22,
    background: "#ffffff",
    padding: 22,
    boxShadow: "0 12px 32px rgba(15,23,42,0.05)",
  },
  title: {
    margin: "0 0 10px",
    color: "#0f172a",
    fontSize: 18,
    fontWeight: 900,
  },
  list: {
    margin: 0,
    paddingLeft: 18,
    color: "#475569",
    fontSize: 14,
    lineHeight: 1.7,
  },
};
