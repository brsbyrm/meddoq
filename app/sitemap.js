const calculatorSlugs = [
  "aortic-size-index",
  "egfr",
  "creatinine-clearance",
  "body-surface-area",
  "body-mass-index",
  "cha2ds2-vasc",
  "has-bled",
  "wells-dvt",
  "heart-score",
  "timi-nstemi-ua-score",
  "curb-65-score",
];

export default function sitemap() {
  return [
    {
      url: "https://meddoq.com",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://meddoq.com/calculators",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: "https://meddoq.com/search",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "https://meddoq.com/faq",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.75,
    },
    ...calculatorSlugs.map((slug) => ({
      url: `https://meddoq.com/calculators/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    })),
  ];
}
