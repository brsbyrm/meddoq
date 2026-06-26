import "./globals.css";
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
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
  openGraph: {
    images: ["/logo.png"],
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
      
<body>
<script
type="application/ld+json"
dangerouslySetInnerHTML={{
__html:JSON.stringify({
"@context":"https://schema.org",
"@graph":[
{
"@type":"WebSite",
"url":"https://meddoq.com",
"name":"Meddoq",
"potentialAction":{
"@type":"SearchAction",
"target":"https://meddoq.com/search?q={search_term_string}",
"query-input":"required name=search_term_string"
}
},
{
"@type":"MedicalOrganization",
"name":"Meddoq",
"url":"https://meddoq.com",
"logo":"https://meddoq.com/logo.png",
"email":"contact@meddoq.com"
}
]
})
}}
/>

{children}

<GoogleAnalytics gaId={GA_MEASUREMENT_ID} />
      </body>
    </html>
  );
}