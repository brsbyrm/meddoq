export const siteUrl = "https://meddoq.com";

export function calculatorTitle(name) {
  return `${name} Calculator + Medical Reference | Meddoq`;
}

export function calculatorDescription(name, category = "clinical") {
  return `${name} calculator with clinical interpretation, severity explanation, recommended next steps, common pitfalls, FAQ, and references for healthcare professionals.`;
}

export function calculatorKeywords(name, category = "clinical") {
  return [
    `${name} calculator`,
    `${name} medical calculator`,
    `${name} clinical calculator`,
    `${name} interpretation`,
    `${name} score`,
    `${category} calculator`,
    "Meddoq",
    "clinical decision support",
    "medical reference",
  ];
}

export function calculatorMetadata({
  name,
  category = "Clinical",
  path,
}) {
  const title = calculatorTitle(name);
  const description = calculatorDescription(name, category);
  const url = `${siteUrl}${path}`;

  return {
    title,
    description,
    keywords: calculatorKeywords(name, category),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "Meddoq",
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
