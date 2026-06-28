import Section from "../ui/Section";
import Card from "../ui/Card";

export default function CalculatorInterpretation({
  clinicalMeaning,
  severity,
  nextStep,
}) {
  return (
    <Section
      kicker="Clinical Interpretation"
      title="How to interpret this result"
      description="Use the calculated value as structured clinical decision support, not as a standalone treatment decision."
    >
      <div style={styles.grid}>
        <Card>
          <h3 style={styles.cardTitle}>Clinical meaning</h3>
          <p style={styles.text}>{clinicalMeaning}</p>
        </Card>

        <Card>
          <h3 style={styles.cardTitle}>Severity explanation</h3>
          <p style={styles.text}>{severity}</p>
        </Card>

        <Card>
          <h3 style={styles.cardTitle}>Recommended next step</h3>
          <p style={styles.text}>{nextStep}</p>
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
  text: {
    margin: 0,
    color: "#475569",
    fontSize: 15,
    lineHeight: 1.75,
  },
};
