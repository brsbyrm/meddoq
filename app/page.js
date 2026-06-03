const calculators = [
  { title: "eGFR Calculator", category: "Nephrology", desc: "Estimate kidney function quickly." },
  { title: "Creatinine Clearance", category: "Nephrology", desc: "Cockcroft-Gault based clearance." },
  { title: "Body Surface Area", category: "General", desc: "BSA for clinical indexing." },
  { title: "Aortic Size Index", category: "Vascular", desc: "Index aortic diameter to BSA." },
  { title: "CHA₂DS₂-VASc", category: "Cardiology", desc: "Stroke risk estimation in AF." },
  { title: "HAS-BLED", category: "Cardiology", desc: "Bleeding risk assessment." },
  { title: "Wells DVT", category: "Emergency", desc: "DVT clinical probability." },
  { title: "Wells PE", category: "Emergency", desc: "Pulmonary embolism probability." },
];

export default function Home() {
  return (
    <main style={{
      minHeight: "100vh",
      fontFamily: "Inter, Arial, sans-serif",
      background: "linear-gradient(135deg, #f8fafc 0%, #eef6ff 45%, #ffffff 100%)",
      color: "#0f172a"
    }}>
      <header style={{
        maxWidth: "1120px",
        margin: "0 auto",
        padding: "32px 24px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{
            width: "42px",
            height: "42px",
            borderRadius: "14px",
            background: "#0f172a",
            color: "white",
            display: "grid",
            placeItems: "center",
            fontWeight: "700"
          }}>
            M
          </div>
          <strong style={{ fontSize: "22px" }}>Meddoq</strong>
        </div>

        <nav style={{ display: "flex", gap: "22px", color: "#475569", fontSize: "14px" }}>
          <span>Calculators</span>
          <span>Vascular</span>
          <span>Early Access</span>
        </nav>
      </header>

      <section style={{
        maxWidth: "1120px",
        margin: "0 auto",
        padding: "80px 24px 48px"
      }}>
        <div style={{
          display: "inline-block",
          padding: "8px 14px",
          borderRadius: "999px",
          background: "#dbeafe",
          color: "#1d4ed8",
          fontWeight: "600",
          fontSize: "14px",
          marginBottom: "22px"
        }}>
          Clinical decision support, simplified
        </div>

        <h1 style={{
          fontSize: "clamp(44px, 7vw, 76px)",
          lineHeight: "1.02",
          letterSpacing: "-0.05em",
          margin: "0 0 24px"
        }}>
          Medical calculators for modern physicians.
        </h1>

        <p style={{
          fontSize: "22px",
          lineHeight: "1.55",
          color: "#475569",
          maxWidth: "760px",
          marginBottom: "34px"
        }}>
          Fast, reliable and practical clinical tools for physicians, surgeons and healthcare professionals.
        </p>

        <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
          <button style={{
            border: "0",
            background: "#0f172a",
            color: "white",
            padding: "14px 22px",
            borderRadius: "14px",
            fontWeight: "700",
            fontSize: "15px"
          }}>
            Explore calculators
          </button>
          <button style={{
            border: "1px solid #cbd5e1",
            background: "white",
            color: "#0f172a",
            padding: "14px 22px",
            borderRadius: "14px",
            fontWeight: "700",
            fontSize: "15px"
          }}>
            Join early access
          </button>
        </div>
      </section>

      <section style={{
        maxWidth: "1120px",
        margin: "0 auto",
        padding: "24px 24px 90px"
      }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "18px"
        }}>
          {calculators.map((item) => (
            <div key={item.title} style={{
              background: "rgba(255,255,255,0.84)",
              border: "1px solid #e2e8f0",
              borderRadius: "22px",
              padding: "24px",
              boxShadow: "0 20px 50px rgba(15,23,42,0.08)"
            }}>
              <div style={{
                fontSize: "13px",
                color: "#2563eb",
                fontWeight: "700",
                marginBottom: "12px"
              }}>
                {item.category}
              </div>
              <h3 style={{ margin: "0 0 10px", fontSize: "21px" }}>{item.title}</h3>
              <p style={{ margin: 0, color: "#64748b", lineHeight: "1.5" }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
