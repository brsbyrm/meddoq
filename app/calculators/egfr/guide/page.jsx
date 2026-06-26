export const metadata = {
  title: "eGFR Calculator Guide | CKD-EPI 2021 Creatinine Equation | Meddoq",
  description:
    "Clinical guide for estimated glomerular filtration rate using the CKD-EPI 2021 creatinine equation, including interpretation, CKD stages, limitations and references.",
  alternates: {
    canonical: "https://meddoq.com/calculators/egfr/guide",
  },
  openGraph: {
    title: "eGFR Calculator Guide | Meddoq",
    description:
      "Understand how to interpret eGFR using the CKD-EPI 2021 creatinine equation.",
    url: "https://meddoq.com/calculators/egfr/guide",
    siteName: "Meddoq",
    type: "article",
  },
};

export default function EGFRGuidePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalWebPage",
        "@id": "https://meddoq.com/calculators/egfr/guide#medicalwebpage",
        url: "https://meddoq.com/calculators/egfr/guide",
        name: "eGFR Calculator Guide",
        description:
          "Clinical guide for interpreting estimated glomerular filtration rate using the CKD-EPI 2021 creatinine equation.",
        medicalAudience: {
          "@type": "MedicalAudience",
          audienceType: "Healthcare professionals",
        },
        about: {
          "@type": "MedicalCondition",
          name: "Chronic kidney disease",
        },
      },
      {
        "@type": "FAQPage",
        "@id": "https://meddoq.com/calculators/egfr/guide#faq",
        mainEntity: [
          {
            "@type": "Question",
            name: "What is eGFR?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "eGFR is an estimate of glomerular filtration rate calculated from serum creatinine, age and sex. It is used to assess kidney function.",
            },
          },
          {
            "@type": "Question",
            name: "Which equation does this guide use?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "This guide refers to the CKD-EPI 2021 creatinine equation.",
            },
          },
          {
            "@type": "Question",
            name: "Can eGFR replace clinical judgment?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. eGFR should be interpreted with clinical context, medication history, body composition and current guideline recommendations.",
            },
          },
        ],
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://meddoq.com/calculators/egfr/guide#breadcrumb",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://meddoq.com",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Calculators",
            item: "https://meddoq.com/calculators",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "eGFR Calculator",
            item: "https://meddoq.com/calculators/egfr",
          },
          {
            "@type": "ListItem",
            position: 4,
            name: "eGFR Guide",
            item: "https://meddoq.com/calculators/egfr/guide",
          },
        ],
      },
    ],
  };

  return (
    <main style={styles.main}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <a href="/calculators/egfr" style={styles.back}>
        ← Back to eGFR Calculator
      </a>

      <section style={styles.hero}>
        <p style={styles.kicker}>Renal Clinical Guide</p>
        <h1>eGFR Calculator Guide</h1>
        <p>
          Clinical interpretation guide for estimated glomerular filtration rate
          using the CKD-EPI 2021 creatinine equation.
        </p>
      </section>

      <section style={styles.content}>
        <h2>What is eGFR?</h2>
        <p>
          Estimated glomerular filtration rate, or eGFR, is a calculated estimate
          of kidney filtration capacity. It is commonly used to evaluate kidney
          function, classify chronic kidney disease and support medication dosing
          decisions.
        </p>

        <h2>CKD-EPI 2021 creatinine equation</h2>
        <p>
          The CKD-EPI 2021 creatinine equation estimates GFR using serum
          creatinine, age and sex. It does not include a race coefficient.
        </p>

        <h2>When should eGFR be used?</h2>
        <p>
          eGFR is used in patients who require assessment of renal function,
          chronic kidney disease staging, cardiovascular risk evaluation,
          contrast exposure planning or renal dose adjustment.
        </p>

        <h2>Interpretation</h2>
        <ul>
          <li><strong>≥90:</strong> Normal or high kidney function if no other kidney damage markers exist.</li>
          <li><strong>60–89:</strong> Mildly decreased kidney function.</li>
          <li><strong>45–59:</strong> Mild to moderate reduction.</li>
          <li><strong>30–44:</strong> Moderate to severe reduction.</li>
          <li><strong>15–29:</strong> Severe reduction.</li>
          <li><strong>&lt;15:</strong> Kidney failure range.</li>
        </ul>

        <h2>Clinical limitations</h2>
        <p>
          eGFR may be less accurate in extremes of muscle mass, acute kidney
          injury, pregnancy, severe malnutrition, amputees, rapidly changing
          creatinine levels and unusual dietary or medication contexts.
        </p>

        <h2>Related calculators</h2>
        <ul>
          <li><a href="/calculators/egfr">eGFR Calculator</a></li>
          <li><a href="/calculators/creatinine-clearance">Creatinine Clearance Calculator</a></li>
          <li><a href="/calculators/body-surface-area">Body Surface Area Calculator</a></li>
        </ul>

        <h2>Related conditions</h2>
        <ul>
          <li>Chronic kidney disease</li>
          <li>Acute kidney injury</li>
          <li>Renal impairment</li>
          <li>Cardiorenal risk assessment</li>
        </ul>

        <h2>References</h2>
        <ol>
          <li>
            Inker LA, Eneanya ND, Coresh J, et al. New creatinine- and
            cystatin C-based equations to estimate GFR without race. N Engl J
            Med. 2021.
          </li>
          <li>
            KDIGO Clinical Practice Guideline for the Evaluation and Management
            of Chronic Kidney Disease.
          </li>
        </ol>

        <div style={styles.notice}>
          This page is intended for healthcare professionals. Calculator outputs
          should be interpreted with clinical judgment and local guideline
          recommendations.
        </div>
      </section>
    </main>
  );
}

const styles = {
  main: {
    maxWidth: 980,
    margin: "0 auto",
    padding: "24px",
    fontFamily:
      'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    color: "#0f172a",
  },
  back: {
    color: "#2563eb",
    fontWeight: 800,
    textDecoration: "none",
  },
  hero: {
    marginTop: 32,
    background: "linear-gradient(135deg, #ffffff, #eff6ff)",
    border: "1px solid #dbeafe",
    borderRadius: 28,
    padding: "clamp(26px, 5vw, 46px)",
    boxShadow: "0 24px 70px rgba(15,23,42,0.08)",
  },
  kicker: {
    color: "#2563eb",
    fontWeight: 900,
    textTransform: "uppercase",
    letterSpacing: "0.12em",
    fontSize: 12,
  },
  content: {
    marginTop: 32,
    lineHeight: 1.75,
    fontSize: 17,
  },
  notice: {
    marginTop: 32,
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
    borderRadius: 18,
    padding: 20,
    fontWeight: 700,
  },
};