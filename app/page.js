export default function Home() {
  return (
    <main style={{
      minHeight: "100vh",
      padding: "80px 24px",
      fontFamily: "Arial, sans-serif",
      background: "#f8fafc",
      color: "#0f172a"
    }}>
      <section style={{ maxWidth: "900px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "56px", marginBottom: "16px" }}>Meddoq</h1>
        <p style={{ fontSize: "24px", color: "#475569", marginBottom: "40px" }}>
          Clinical tools for modern physicians.
        </p>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "16px"
        }}>
          {[
            "eGFR Calculator",
            "Creatinine Clearance",
            "Body Surface Area",
            "Aortic Size Index",
            "CHA₂DS₂-VASc",
            "HAS-BLED",
            "Wells DVT",
            "Wells PE"
          ].map((item) => (
            <div key={item} style={{
              background: "white",
              border: "1px solid #e2e8f0",
              borderRadius: "16px",
              padding: "20px",
              fontSize: "18px",
              boxShadow: "0 8px 24px rgba(15,23,42,0.06)"
            }}>
              {item}
            </div>
          ))}
        </div>

        <p style={{ marginTop: "48px", color: "#64748b" }}>
          Coming soon.
        </p>
      </section>
    </main>
  );
}
