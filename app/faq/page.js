export const metadata = {
  title: "Clinical Calculator FAQ | Meddoq",
  description:
    "Frequently asked questions about Meddoq clinical calculators, interpretation, limitations and professional medical use.",
  alternates: {
    canonical: "https://meddoq.com/faq",
  },
};

const faqs = [
  [
    "Who is Meddoq for?",
    "Meddoq is intended for healthcare professionals who need fast clinical calculators and decision support tools.",
  ],
  [
    "Can Meddoq replace clinical judgment?",
    "No. Meddoq supports clinical judgment but does not replace physician assessment, local protocols or guideline-based individualized decision-making.",
  ],
  [
    "Are Meddoq calculators free?",
    "Yes. The current Meddoq calculator tools are free to access.",
  ],
  [
    "Which calculators are currently available?",
    "Current tools include Aortic Size Index, eGFR, Creatinine Clearance, Body Surface Area, Body Mass Index, CHA₂DS₂-VASc, HAS-BLED and Wells DVT.",
  ],
  [
    "How should calculator results be interpreted?",
    "Results should be interpreted together with the full clinical context, patient-specific factors and current guideline recommendations.",
  ],
];

export default function Page() {
  return (
    <main style={styles.main}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map(([question, answer]) => ({
              "@type": "Question",
              name: question,
              acceptedAnswer: {
                "@type": "Answer",
                text: answer,
              },
            })),
          }),
        }}
      />

      <a href="/" style={styles.back}>← Back to Meddoq</a>

      <section style={styles.hero}>
        <p style={styles.kicker}>FAQ</p>
        <h1>Clinical Calculator FAQ</h1>
        <p>
          Frequently asked questions about Meddoq calculators, interpretation,
          limitations and professional medical use.
        </p>
      </section>

      <section style={styles.list}>
        {faqs.map(([question, answer]) => (
          <article key={question} style={styles.card}>
            <h2>{question}</h2>
            <p>{answer}</p>
          </article>
        ))}
      </section>
    </main>
  );
}

const styles = {
  main: {
    maxWidth: 960,
    margin: "0 auto",
    padding: 24,
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
  list: {
    display: "grid",
    gap: 16,
    marginTop: 28,
  },
  card: {
    background: "white",
    border: "1px solid #e2e8f0",
    borderRadius: 22,
    padding: 22,
    boxShadow: "0 14px 36px rgba(15,23,42,0.06)",
  },
};
