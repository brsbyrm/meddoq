import CalculatorV3 from "../../components/calculators/v3/CalculatorV3";
import { getCalculatorConfig } from "../../lib/calculators/v3/registry";

export default function FontaineClassificationPage() {
  const config = getCalculatorConfig("fontaine-classification");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalWebPage",
            name: "Fontaine Classification Calculator",
            description:
              "Fontaine classification calculator for peripheral artery disease severity.",
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
