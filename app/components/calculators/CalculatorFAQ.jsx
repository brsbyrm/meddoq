import Section from "../ui/Section";
import Accordion from "../ui/Accordion";

export default function CalculatorFAQ({ items = [] }) {
  if (!items.length) return null;

  return (
    <Section kicker="FAQ" title="Frequently asked questions">
      <Accordion items={items} />
    </Section>
  );
}
