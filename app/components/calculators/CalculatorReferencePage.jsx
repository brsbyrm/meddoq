import CalculatorInterpretation from "./CalculatorInterpretation";
import CalculatorClinicalNotes from "./CalculatorClinicalNotes";
import CalculatorFAQ from "./CalculatorFAQ";
import ReferenceBox from "../ui/ReferenceBox";
import Section from "../ui/Section";
import Badge from "../ui/Badge";

export default function CalculatorReferencePage({ content }) {
  return (
    <>
      <CalculatorInterpretation
        clinicalMeaning={content.interpretation.clinicalMeaning}
        severity={content.interpretation.severity}
        nextStep={content.interpretation.nextStep}
      />

      <CalculatorClinicalNotes
        pearls={content.notes.pearls}
        pitfalls={content.notes.pitfalls}
      />

      <Section kicker="Related Calculators" title="Explore related clinical tools">
        <div style={styles.related}>
          {content.related.map((item) => (
            <Badge key={item} tone="blue">{item}</Badge>
          ))}
        </div>
      </Section>

      <CalculatorFAQ items={content.faq} />

      <ReferenceBox references={content.references} />
    </>
  );
}

const styles = {
  related: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
  },
};
