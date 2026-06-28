import CalculatorV3 from "../../components/calculators/v3/CalculatorV3";
import { getCalculatorConfig } from "../../lib/calculators/v3/registry";

export default function RutherfordClassificationPage() {
  const config = getCalculatorConfig("rutherford-classification");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalWebPage",
            name: "Rutherford Classification Calculator",
            description:
              "Rutherford classification calculator for peripheral artery disease and chronic limb ischemia severity.",
            publisher: {
              "@type": "Organization",
              name: "Meddoq",
              url: "https://meddoq.com",
            },
            medicalAudience: {
              "@type": "MedicalAudience",
              audienceType: "Healthcare professionals",
            },
          }),
        }}
      />

      <CalculatorV3 config={config} />
    </>
  );
}
