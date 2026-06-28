export default function Card({ children, style = {} }) {
  return (
    <section style={{ ...styles.card, ...style }}>
      {children}
    </section>
  );
}

const styles = {
  card: {
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: 24,
    padding: 24,
    boxShadow: "0 16px 40px rgba(15,23,42,0.06)",
  },
};
