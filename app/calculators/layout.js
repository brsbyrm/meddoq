import PremiumCalculatorReference from "../components/calculators/PremiumCalculatorReference";

export default function CalculatorsLayout({ children }) {
  return (
    <>
      {children}
      <PremiumCalculatorReference />
    </>
  );
}
