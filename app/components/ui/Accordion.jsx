export default function Accordion({ items = [] }) {
  return (
    <div style={styles.wrap}>
      {items.map((item) => (
        <details key={item.question} style={styles.item}>
          <summary style={styles.summary}>{item.question}</summary>
          <p style={styles.answer}>{item.answer}</p>
        </details>
      ))}
    </div>
  );
}

const styles = {
  wrap: {
    border: "1px solid #e2e8f0",
    borderRadius: 20,
    overflow: "hidden",
    background: "#ffffff",
  },
  item: {
    padding: "16px 18px",
    borderBottom: "1px solid #e2e8f0",
  },
  summary: {
    cursor: "pointer",
    fontWeight: 900,
    color: "#0f172a",
  },
  answer: {
    margin: "12px 0 0",
    color: "#475569",
    fontSize: 15,
    lineHeight: 1.7,
  },
};
