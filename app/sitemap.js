export default function sitemap() {
  return [
    {
      url: "https://meddoq.com",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://meddoq.com/calculators/aortic-size-index",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];
}
