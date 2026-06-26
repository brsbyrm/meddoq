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
  const title = calculators[slug] || "Clinical Calculator";
  const url = `https://meddoq.com/calculators/${slug}`;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "BreadcrumbList",
                "itemListElement": [
                  {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Meddoq",
                    "item": "https://meddoq.com"
                  },
                  {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "Calculators",
                    "item": "https://meddoq.com/#calculators"
                  },
                  {
                    "@type": "ListItem",
                    "position": 3,
                    "name": title,
                    "item": url
                  }
                ]
              },
              {
                "@type": "MedicalWebPage",
                "name": title,
                "url": url,
                "description": `${title} for healthcare professionals with clinical interpretation notes.`,
                "medicalAudience": {
                  "@type": "MedicalAudience",
                  "audienceType": "Healthcare professionals"
                },
                "publisher": {
                  "@type": "Organization",
                  "name": "Meddoq",
                  "url": "https://meddoq.com"
                }
              },
              {
                "@type": "WebApplication",
                "name": title,
                "url": url,
                "applicationCategory": "MedicalApplication",
                "operatingSystem": "Any",
                "isAccessibleForFree": true
              },
              {
                "@type": "FAQPage",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": "Who should use this calculator?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "This calculator is intended for healthcare professionals."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Can this calculator replace clinical judgement?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "No. Results should always be interpreted together with clinical judgement, patient context and current guidelines."
                    }
                  }
                ]
              }
            ]
          })
        }}
      />
      <CalculatorClient slug={slug} />
    </>
  );
}
