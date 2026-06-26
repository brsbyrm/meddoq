import CalculatorClient from "./CalculatorClient";

const calculators = {
  "aortic-size-index": "Aortic Size Index Calculator",
  egfr: "eGFR Calculator",
  "creatinine-clearance": "Creatinine Clearance Calculator",
  "body-surface-area": "Body Surface Area Calculator",
  "body-mass-index": "BMI Calculator",
  "cha2ds2-vasc": "CHA₂DS₂-VASc Calculator",
  "has-bled": "HAS-BLED Calculator",
  "wells-dvt": "Wells DVT Calculator",
};

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const title = calculators[slug] || "Clinical Calculator";

  return {
    title: `${title} | Meddoq`,
    description: `${title} for healthcare professionals. Free clinical calculator with interpretation notes and references.`,
    alternates: {
      canonical: `https://meddoq.com/calculators/${slug}`,
    },
  };
}

export function generateStaticParams() {
  return Object.keys(calculators).map((slug) => ({ slug }));
}

export default async function Page({ params }) {
  const { slug } = await params;
  return <CalculatorClient slug={slug} />;
}
