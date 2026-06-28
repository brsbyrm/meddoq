const calculatorSeoMap = {
  "aortic-size-index": { name: "Aortic Size Index", category: "Vascular" },
  egfr: { name: "eGFR", category: "Nephrology" },
  "creatinine-clearance": { name: "Creatinine Clearance", category: "Nephrology" },
  "body-surface-area": { name: "Body Surface Area", category: "General" },
  "body-mass-index": { name: "Body Mass Index", category: "General" },
  "cha2ds2-vasc": { name: "CHA₂DS₂-VASc", category: "Cardiovascular" },
  "has-bled": { name: "HAS-BLED", category: "Cardiovascular" },
  "wells-dvt": { name: "Wells DVT", category: "Vascular" },
};

export function generateMetadata({ params }) {
  const slug = params?.slug;
  const item = calculatorSeoMap[slug] || {
    name: "Clinical Calculator",
    category: "Clinical",
  };

  return calculatorMetadata({
    name: item.name,
    category: item.category,
    path: `/calculators/${slug}`,
  });
}

import CalculatorClient from "../CalculatorClient.jsx";

export default function CalculatorPage({ params }) {
  return <CalculatorClient slug={params.slug} />;
}
