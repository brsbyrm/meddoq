const calculators = [
  {
    id: "asi",
    name: "Aortic Size Index",
    category: "Vascular",
    href: "/calculators/aortic-size-index",
    icon: "📏",
    description: "Index aortic diameter to body surface area for individualized aortic risk assessment.",
  },
  {
    id: "egfr",
    name: "eGFR",
    category: "Renal",
    href: "/calculators/egfr",
    icon: "🟢",
    description: "Estimate glomerular filtration rate using the CKD-EPI 2021 creatinine equation.",
  },
  {
    id: "crcl",
    name: "Creatinine Clearance",
    category: "Renal",
    href: "/calculators/creatinine-clearance",
    icon: "🧪",
    description: "Estimate creatinine clearance using the Cockcroft-Gault equation for drug dosing.",
  },
  {
    id: "cha",
    name: "CHA₂DS₂-VASc",
    category: "Cardiovascular",
    href: "/calculators/cha2ds2-vasc",
    icon: "❤️",
    description: "Estimate thromboembolic risk in patients with atrial fibrillation.",
  },
  {
    id: "hasbled",
    name: "HAS-BLED",
    category: "Cardiovascular",
    href: "/calculators/has-bled",
    icon: "🩸",
    description: "Assess bleeding risk in patients receiving anticoagulation for atrial fibrillation.",
  },
  {
    id: "wells",
    name: "Wells DVT",
    category: "Vascular",
    href: "/calculators/wells-dvt",
    icon: "🦵",
    description: "Estimate pretest probability of deep vein thrombosis.",
  },
  {
    id: "bsa",
    name: "Body Surface Area",
    category: "General",
    href: "/calculators/body-surface-area",
    icon: "👤",
    description: "Calculate body surface area using the Mosteller formula.",
  },
  {
    id: "bmi",
    name: "Body Mass Index",
    category: "General",
    href: "/calculators/body-mass-index",
    icon: "⚖️",
    description: "Calculate body mass index and standard weight category.",
  },
];

const categoryColors = {
  Vascular: "#2563eb",
  Renal: "#16a34a",
  Cardiovascular: "#dc2626",
  General: "#7c3aed",
};

export default function Home() {
  return (
    <main style={styles.page}>
      <header style={styles.header}>
        <a href="/" style={styles.brand}>
          <img src="/logo.png" alt="Meddoq" style={styles.logoImage} />
          <div>
            <div style={styles.logoText}>Meddoq</div>
            <div style={styles.logoSubtext}>Clinical calculators</div>
          </div>
        </a>

        <nav style={styles.nav}>
          <a href="#calculators" style={styles.navLink}>Calculators</a>
          <a href="#why" style={styles.navLink}>Why Meddoq</a>
          <a href="mailto:contact@meddoq.com" style={styles.contactButton}>Contact</a>
        </nav>
      </header>

      <section style={styles.hero}>
        <div style={styles.heroLeft}>
          <div style={styles.badge}>Evidence-based physician tools</div>
          <h1 style={styles.heroTitle}>
            Clinical calculators for better decisions.
          </h1>
          <p style={styles.heroText}>
            Fast, clean and clinically interpretable medical calculators for vascular,
            cardiovascular, renal and perioperative practice.
          </p>

          <div style={styles.heroActions}>
            <a href="#calculators" style={styles.primaryButton}>Open calculator library</a>
            <a href="mailto:contact@meddoq.com" style={styles.secondaryButton}>contact@meddoq.com</a>
          </div>

          <div style={styles.heroStats}>
            <div style={styles.statItem}>
              <strong>{calculators.length}</strong>
              <span>Calculators</span>
            </div>
            <div style={styles.statItem}>
              <strong>Free</strong>
              <span>Open access</span>
            </div>
            <div style={styles.statItem}>
              <strong>Clinical</strong>
              <span>Interpretation notes</span>
            </div>
          </div>
        </div>

        <div style={styles.heroVisual}>
          <div style={styles.visualCard}>
            <div style={styles.calculatorIcon}>▦</div>
            <div style={styles.visualLine} />
            <div style={styles.visualGrid}>
              <span>+</span>
              <span>−</span>
              <span>×</span>
              <span>=</span>
            </div>
          </div>
        </div>
      </section>

      <section id="calculators" style={styles.section}>
        <div style={styles.sectionTop}>
          <div>
            <p style={styles.kicker}>Calculator library</p>
            <h2 style={styles.sectionTitle}>Select a calculator</h2>
            <p style={styles.sectionText}>
              Each tool opens on its own clinical page with formula, interpretation and references.
            </p>
          </div>
        </div>

        <div style={styles.calculatorGrid}>
          {calculators.map((item) => (
            <a key={item.id} href={item.href} style={styles.card}>
              <div style={styles.cardTop}>
                <div style={styles.iconBubble}>{item.icon}</div>
                <span
                  style={{
                    ...styles.categoryBadge,
                    color: categoryColors[item.category],
                    background: `${categoryColors[item.category]}12`,
                    borderColor: `${categoryColors[item.category]}33`,
                  }}
                >
                  {item.category}
                </span>
              </div>

              <h3 style={styles.cardTitle}>{item.name}</h3>
              <p style={styles.cardText}>{item.description}</p>
              <div style={styles.cardAction}>Open calculator →</div>
            </a>
          ))}
        </div>
      </section>

      <section id="why" style={styles.whyBox}>
        <div style={styles.whyItem}>
          <strong>Evidence-based</strong>
          <span>Designed around validated formulas, clinical scores and current medical practice.</span>
        </div>
        <div style={styles.whyItem}>
          <strong>For clinicians</strong>
          <span>Built for fast use in daily medical workflow, not general consumer calculation.</span>
        </div>
        <div style={styles.whyItem}>
          <strong>Clear interpretation</strong>
          <span>Results are supported by clinical notes, limitations and reference context.</span>
        </div>
        <div style={styles.disclaimerMini}>
          <strong>Important disclaimer</strong>
          <span>Meddoq supports clinical judgment and does not replace physician assessment.</span>
        </div>
      </section>

      <footer style={styles.footer}>
        <div>
          <strong>Meddoq</strong>
          <p>Clinical decision support for physicians.</p>
        </div>
        <div style={styles.footerEmail}>contact@meddoq.com</div>
        <div>© {new Date().getFullYear()} Meddoq</div>
      </footer>
    </main>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    fontFamily:
      'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    background:
      "radial-gradient(circle at top right, rgba(37,99,235,0.16), transparent 32%), linear-gradient(180deg, #ffffff 0%, #f8fafc 55%, #eef6ff 100%)",
    color: "#020617",
    padding: "20px",
  },
  header: {
    maxWidth: 1180,
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 18,
    padding: "14px 0",
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    textDecoration: "none",
    color: "#020617",
  },
  logoImage: {
    height: 180,
    width: "auto",
    display: "block",
  },

  logoMark: {
    width: 42,
    height: 180,
    borderRadius: 14,
    display: "grid",
    placeItems: "center",
    color: "white",
    background: "linear-gradient(135deg, #2563eb, #0f172a)",
    fontSize: 30,
    fontWeight: 900,
  },
  logoText: {
    fontSize: 25,
    fontWeight: 950,
    letterSpacing: "-0.05em",
  },
  logoSubtext: {
    color: "#64748b",
    textTransform: "uppercase",
    letterSpacing: "0.12em",
    fontSize: 11,
    fontWeight: 800,
  },
  nav: {
    display: "flex",
    alignItems: "center",
    gap: 18,
    flexWrap: "wrap",
    justifyContent: "flex-end",
  },
  navLink: {
    color: "#0f172a",
    textDecoration: "none",
    fontWeight: 800,
    fontSize: 14,
  },
  contactButton: {
    color: "white",
    background: "#2563eb",
    textDecoration: "none",
    fontWeight: 900,
    fontSize: 14,
    padding: "10px 14px",
    borderRadius: 999,
  },
  hero: {
    maxWidth: 1180,
    margin: "46px auto 0",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 360px), 1fr))",
    gap: 34,
    alignItems: "center",
  },
  heroLeft: {
    minWidth: 0,
  },
  badge: {
    display: "inline-flex",
    color: "#2563eb",
    background: "#eff6ff",
    border: "1px solid #bfdbfe",
    borderRadius: 999,
    padding: "9px 13px",
    fontSize: 13,
    fontWeight: 900,
    marginBottom: 20,
  },
  heroTitle: {
    margin: 0,
    maxWidth: 720,
    fontSize: "clamp(42px, 7vw, 82px)",
    lineHeight: 0.95,
    letterSpacing: "-0.075em",
  },
  heroText: {
    maxWidth: 650,
    margin: "24px 0 0",
    color: "#475569",
    fontSize: "clamp(17px, 2vw, 21px)",
    lineHeight: 1.65,
  },
  heroActions: {
    marginTop: 30,
    display: "flex",
    gap: 12,
    flexWrap: "wrap",
  },
  primaryButton: {
    background: "linear-gradient(135deg, #0f172a, #2563eb)",
    color: "white",
    textDecoration: "none",
    padding: "15px 18px",
    borderRadius: 16,
    fontWeight: 950,
    boxShadow: "0 18px 40px rgba(37,99,235,0.22)",
  },
  secondaryButton: {
    background: "white",
    color: "#2563eb",
    textDecoration: "none",
    padding: "15px 18px",
    borderRadius: 16,
    fontWeight: 900,
    border: "1px solid #dbeafe",
    userSelect: "all",
  },
  heroStats: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 150px), 1fr))",
    gap: 14,
    marginTop: 32,
    maxWidth: 650,
  },
  statItem: {
    background: "rgba(255,255,255,0.86)",
    border: "1px solid #e2e8f0",
    borderRadius: 20,
    padding: 17,
    display: "grid",
    gap: 4,
  },
  heroVisual: {
    minHeight: 360,
    display: "grid",
    placeItems: "center",
    background:
      "radial-gradient(circle at 20% 20%, rgba(37,99,235,0.18), transparent 24%), radial-gradient(circle at 80% 75%, rgba(14,165,233,0.16), transparent 28%)",
    borderRadius: 36,
  },
  visualCard: {
    width: "min(100%, 320px)",
    aspectRatio: "1 / 1",
    borderRadius: 32,
    background: "rgba(255,255,255,0.92)",
    border: "1px solid #dbeafe",
    boxShadow: "0 28px 80px rgba(15,23,42,0.12)",
    display: "grid",
    placeItems: "center",
    padding: 34,
  },
  calculatorIcon: {
    fontSize: 82,
    color: "#2563eb",
    fontWeight: 900,
  },
  visualLine: {
    width: "70%",
    height: 180,
    borderRadius: 999,
    background: "#dbeafe",
  },
  visualGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: 10,
    width: "70%",
  },
  section: {
    maxWidth: 1180,
    margin: "64px auto 0",
  },
  sectionTop: {
    display: "flex",
    justifyContent: "space-between",
    gap: 20,
    alignItems: "end",
    marginBottom: 22,
  },
  kicker: {
    margin: "0 0 8px",
    color: "#2563eb",
    fontWeight: 950,
    textTransform: "uppercase",
    letterSpacing: "0.12em",
    fontSize: 12,
  },
  sectionTitle: {
    margin: 0,
    fontSize: "clamp(30px, 4vw, 44px)",
    letterSpacing: "-0.055em",
  },
  sectionText: {
    margin: "10px 0 0",
    color: "#64748b",
    lineHeight: 1.6,
    fontSize: 16,
  },
  calculatorGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 255px), 1fr))",
    gap: 18,
  },
  card: {
    background: "white",
    border: "1px solid #e2e8f0",
    borderRadius: 26,
    padding: 22,
    textDecoration: "none",
    color: "#020617",
    boxShadow: "0 18px 44px rgba(15,23,42,0.06)",
    display: "grid",
    gap: 12,
  },
  cardTop: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  iconBubble: {
    width: 52,
    height: 180,
    borderRadius: 18,
    background: "#eff6ff",
    display: "grid",
    placeItems: "center",
    fontSize: 26,
  },
  categoryBadge: {
    border: "1px solid",
    borderRadius: 999,
    padding: "5px 9px",
    fontSize: 11,
    fontWeight: 950,
  },
  cardTitle: {
    margin: 0,
    fontSize: 21,
    letterSpacing: "-0.04em",
  },
  cardText: {
    margin: 0,
    color: "#475569",
    lineHeight: 1.55,
  },
  cardAction: {
    marginTop: 4,
    color: "#2563eb",
    fontWeight: 950,
    fontSize: 14,
  },
  whyBox: {
    maxWidth: 1180,
    margin: "56px auto 0",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))",
    gap: 16,
    background: "rgba(255,255,255,0.82)",
    border: "1px solid #dbeafe",
    borderRadius: 28,
    padding: 22,
  },
  whyItem: {
    display: "grid",
    gap: 8,
    color: "#475569",
    lineHeight: 1.55,
  },
  disclaimerMini: {
    display: "grid",
    gap: 8,
    color: "#475569",
    lineHeight: 1.55,
    border: "1px solid #dbeafe",
    borderRadius: 20,
    padding: 16,
    background: "#f8fafc",
  },
  footer: {
    maxWidth: 1180,
    margin: "34px auto 0",
    padding: "24px 0 8px",
    borderTop: "1px solid #e2e8f0",
    display: "flex",
    gap: 18,
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    color: "#475569",
  },
  footerEmail: {
    color: "#2563eb",
    fontWeight: 900,
    userSelect: "all",
  },
};
