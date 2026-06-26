export const metadata = {
  title: "Revised Cardiac Risk Index Calculator | RCRI | Meddoq",
  description:
    "Revised Cardiac Risk Index calculator for estimating perioperative cardiac risk before non-cardiac surgery.",
  alternates: {
    canonical: "https://meddoq.com/calculators/revised-cardiac-risk-index",
  },
};

export default function Page() {
  return (
    <main style={{ maxWidth: 980, margin: "0 auto", padding: 24, fontFamily: "Inter, system-ui, sans-serif", color: "#0f172a" }}>
      <a href="/" style={{ color: "#2563eb", fontWeight: 800, textDecoration: "none" }}>← Back to Meddoq</a>

      <section style={{ marginTop: 32, background: "linear-gradient(135deg,#ffffff,#eff6ff)", border: "1px solid #dbeafe", borderRadius: 28, padding: 36 }}>
        <p style={{ color: "#2563eb", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.12em", fontSize: 12 }}>Perioperative Calculator</p>
        <h1>Revised Cardiac Risk Index Calculator</h1>
        <p>Estimate perioperative cardiac risk before non-cardiac surgery.</p>
      </section>

      <section style={{ marginTop: 24, background: "#fff", border: "1px solid #e2e8f0", borderRadius: 24, padding: 24 }}>
        <p><strong>Calculator interface coming next.</strong></p>
      </section>
    </main>
  );
}
