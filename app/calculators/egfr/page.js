import CalculatorClient from "../CalculatorClient.jsx";

export const metadata = {
  title: "eGFR Calculator | CKD-EPI 2021 Calculator | Meddoq",
  description:
    "Free eGFR calculator using the CKD-EPI 2021 creatinine equation with clinical interpretation for physicians.",
  alternates: {
    canonical: "https://meddoq.com/calculators/egfr",
  },
};

export default function Page() {
  return <CalculatorClient slug="egfr" />;
}
