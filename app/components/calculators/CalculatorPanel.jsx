import Card from "../ui/Card";

export default function CalculatorPanel({ children }) {
  return (
    <Card style={styles.panel}>
      {children}
    </Card>
  );
}

const styles = {
  panel: {
    marginTop: 24,
  },
};
