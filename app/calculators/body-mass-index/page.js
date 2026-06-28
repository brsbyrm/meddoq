import BodyMassIndexCalculatorClient from "./BodyMassIndexCalculatorClient";

export const metadata = {
  title: "BMI Calculator | Body Mass Index Calculator | Meddoq",
  description:
    "Calculate adult body mass index using height and weight. Includes BMI category interpretation and clinical notes.",
  alternates: {
    canonical: "/calculators/body-mass-index",
  },
};

export default function BodyMassIndexPage() {
  return <BodyMassIndexCalculatorClient />;
}
