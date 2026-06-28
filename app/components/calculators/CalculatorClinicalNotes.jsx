import Section from "../ui/Section";
import Card from "../ui/Card";

export default function CalculatorClinicalNotes({
  pearls = [],
  pitfalls = [],
}) {
  return (
    <Section kicker="Clinical Notes" title="Pearls and common pitfalls">
      <div style={styles.grid}>
        <Card>
          <h3 style={styles.cardTitle}>Clinical pearls</h3>
          <ul style={styles.list}>
            {pearls.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </Card>

        <Card>
          <h3 style={styles.cardTitle}>Common pitfalls</h3>
          <ul style={styles.list}>
            {pitfalls.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </Card>
      </div>
    </Section>
  );
}

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
    gap: 16,
  },
  cardTitle: {
    margin: "0 0 10px",
    color: "#0f172a",
    fontSize: 18,
    fontWeight: 900,
  },
  list: {
    margin: 0,
    paddingLeft: 18,
    color: "#475569",
    fontSize: 15,
    lineHeight: 1.75,
  },
};
