import { GoogleAnalytics } from "@next/third-parties/google";

export const metadata = {
  title: "Meddoq | Clinical Calculators and Decision Support for Physicians",
  description:
    "Professional clinical calculators, risk scores and decision support tools for physicians, with a vascular surgery focused workflow.",
  keywords: [
    "clinical calculator",
    "medical calculator",
    "vascular surgery",
    "eGFR",
    "creatinine clearance",
    "CHA2DS2-VASc",
    "HAS-BLED",
    "Wells DVT",
    "aortic size index",
    "clinical decision support",
    "physician tools",
  ],
  authors: [{ name: "Meddoq" }],
  creator: "Meddoq",
  publisher: "Meddoq",
  metadataBase: new URL("https://meddoq.com"),
  openGraph: {
    title: "Meddoq | Clinical Calculators for Physicians",
    description:
      "Professional clinical calculators, risk scores and decision support tools for physicians.",
    url: "https://meddoq.com",
    siteName: "Meddoq",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "Meddoq | Clinical Calculators for Physicians",
    description:
      "Professional clinical calculators, risk scores and decision support tools for physicians.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const GA_MEASUREMENT_ID = "G-K7V1PRDWQY";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
      <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />
    </html>
  );
}