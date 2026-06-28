import CalculatorV3 from "../../components/calculators/v3/CalculatorV3";
import { getCalculatorConfig } from "../../lib/calculators/v3/registry";

export default function WifiClassificationPage() {
  const config = getCalculatorConfig("wifi-classification");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalWebPage",
            name: "WIfI Classification Calculator",
            description:
              "WIfI classification calculator for wound, ischemia, and foot infection assessment in chronic limb-threatening ischemia.",
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
