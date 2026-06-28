import { calculators } from "./data/calculators";

export default function sitemap() {
  const baseUrl = "https://meddoq.com";

  const staticRoutes = ["", "/calculators", "/search", "/faq"];

  const staticEntries = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));

  const calculatorEntries = calculators.map((item) => ({
    url: `${baseUrl}${item.href}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticEntries, ...calculatorEntries];
}
