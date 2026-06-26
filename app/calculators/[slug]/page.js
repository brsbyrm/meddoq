import CalculatorClient from "../CalculatorClient.jsx";

export default function CalculatorPage({ params }) {
  return <CalculatorClient slug={params.slug} />;
}
