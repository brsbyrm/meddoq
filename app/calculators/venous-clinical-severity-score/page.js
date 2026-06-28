import CalculatorV3 from "../../components/calculators/v3/CalculatorV3";
import { getCalculatorConfig } from "../../lib/calculators/v3/registry";

export default function VenousClinicalSeverityScorePage() {
  return <CalculatorV3 config={getCalculatorConfig("venous-clinical-severity-score")} />;
}
