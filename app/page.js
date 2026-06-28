"use client";

import { useMemo, useState } from "react";
import { calculators } from "./data/calculators";

const categoryColors = {
  Vascular: "#2563eb",
  Renal: "#16a34a",
  Cardiovascular: "#dc2626",
  Cardiology: "#dc2626",
  General: "#7c3aed",
  Perioperative: "#ea580c",
  Pulmonology: "#0891b2",
  "Pulmonary Embolism": "#0891b2",
  "Critical Care": "#7c3aed",
};

const featuredIds = ["cha2ds2-vasc", "egfr", "wells-dvt", "aortic-size-index"];

export default function Home() {
  const [query, setQuery] = useState("");

  const featuredCalculators = useMemo(() => {
    return featuredIds
      .map((id) => calculators.find((item) => item.id === id))
      .filter(Boolean);
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return featuredCalculators;

    return calculators.filter((item) =>
      [item.name, item.category, item.description, item.id]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [query, featuredCalculators]);

  return (
    <main style={styles.page}>
      <style id="meddoq-mobile-responsive-fix">{`
        @media (max-width: 900px) {
          .meddoq-shell {
            width: 100% !important;
            box-shadow: none !important;
          }

          .meddoq-header {
            height: auto !important;
            padding: 14px 18px !important;
            align-items: flex-start !important;
            gap: 12px !important;
          }

          .meddoq-brand-logo {
            height: 64px !important;
          }

          .meddoq-nav {
            gap: 10px !important;
            justify-content: flex-start !important;
          }

          .meddoq-contact-button {
            padding: 9px 12px !important;
          }

          .meddoq-hero {
            height: auto !important;
            min-height: 0 !important;
            padding: 28px 18px 24px !important;
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }

          .meddoq-hero-title {
            font-size: 42px !important;
            line-height: 1.04 !important;
          }

          .meddoq-hero-text {
            font-size: 17px !important;
          }

          .meddoq-hero-emblem-wrap {
            height: 210px !important;
            min-height: 0 !important;
          }

          .meddoq-hero-emblem {
            width: 300px !important;
            height: 300px !important;
          }

          .meddoq-featured {
            padding: 24px 18px 20px !important;
          }

          .meddoq-card-grid {
            grid-template-columns: 1fr !important;
          }

          .meddoq-card {
            height: auto !important;
            min-height: 170px !important;
          }

          .meddoq-benefits {
            padding: 20px 18px !important;
            grid-template-columns: 1fr !important;
          }

          .meddoq-footer {
            padding: 22px 18px !important;
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }

          .meddoq-footer-logo {
            height: 54px !important;
          }
        }

        @media (max-width: 520px) {
          .meddoq-header {
            display: grid !important;
            grid-template-columns: 1fr !important;
          }

          .meddoq-nav {
            width: 100% !important;
            display: grid !important;
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }

          .meddoq-nav-link,
          .meddoq-contact-button {
            text-align: center !important;
            font-size: 13px !important;
          }

          .meddoq-hero-title {
            font-size: 36px !important;
          }

          .meddoq-trust-row {
            gap: 10px !important;
            font-size: 12px !important;
          }

          .meddoq-section-top {
            display: grid !important;
            gap: 8px !important;
          }
        }
      `}</style>
      <div className="meddoq-shell" style={styles.shell}>
        <header className="meddoq-header" style={styles.header}>
          <a href="/" style={styles.brand}>
            <img className="meddoq-brand-logo" src="/brand.png" alt="Meddoq" style={styles.brandLogo} />
          </a>

          <nav className="meddoq-nav" style={styles.nav}>
            <a href="/calculators" className="meddoq-nav-link" style={styles.navLink}>Calculators</a>
            <a href="/search" className="meddoq-nav-link" style={styles.navLink}>Search</a>
            <a href="/faq" className="meddoq-nav-link" style={styles.navLink}>FAQ</a>
            <a href="mailto:contact@meddoq.com" className="meddoq-contact-button" style={styles.contactButton}>Contact</a>
          </nav>
        </header>

        <section className="meddoq-hero" style={styles.hero}>
          <div style={styles.heroContent}>
            <h1 className="meddoq-hero-title" style={styles.heroTitle}>
              Clinical Calculators
              <br />
              & Decision Support
            </h1>

            <p className="meddoq-hero-text" style={styles.heroText}>
              Evidence-based tools to help physicians make better clinical decisions, faster.
            </p>

            <div style={styles.searchBox}>
              <span style={styles.searchIcon}>⌕</span>
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search calculators..."
                style={styles.searchInput}
              />
            </div>

            <div className="meddoq-trust-row" style={styles.trustRow}>
              <span>🛡️ Evidence Based</span>
              <span>🔒 Secure & Private</span>
              <span>👨‍⚕️ Physician Focused</span>
            </div>
          </div>

          <div className="meddoq-hero-emblem-wrap" style={styles.heroEmblemWrap}>
            <img src="/icon.png" alt="" aria-hidden="true" className="meddoq-hero-emblem" style={styles.heroEmblem} />
          </div>
        </section>

        <section className="meddoq-featured" style={styles.featuredSection}>
          <div className="meddoq-section-top" style={styles.sectionTop}>
            <h2 style={styles.sectionTitle}>{query ? "Search Results" : "Featured Calculators"}</h2>
            <a href="/calculators" style={styles.sectionLink}>View all calculators →</a>
          </div>

          <div className="meddoq-card-grid" style={styles.cardGrid}>
            {results.slice(0, 4).map((item) => (
              <CalculatorCard key={item.id} item={item} />
            ))}
          </div>
        </section>

        <section className="meddoq-benefits" style={styles.benefits}>
          <Benefit icon="◎" title="Accurate" text="Validated clinical scores and formulas." />
          <Benefit icon="◇" title="Reliable" text="Consistent bedside workflow use." />
          <Benefit icon="⚡" title="Fast" text="Clean inputs and clear results." />
          <Benefit icon="☤" title="For Physicians" text="Built for modern medical practice." />
        </section>

        <footer className="meddoq-footer" style={styles.footer}>
          <div style={styles.footerBrand}>
            <img src="/brand.png" alt="Meddoq" className="meddoq-footer-logo" style={styles.footerLogo} />
            <p>Evidence-based clinical calculators for physicians.</p>
          </div>

          <div style={styles.footerLinks}>
            <a href="/calculators" style={styles.footerLink}>Calculators</a>
            <a href="/search" style={styles.footerLink}>Search</a>
            <a href="/faq" style={styles.footerLink}>FAQ</a>
            <a href="mailto:contact@meddoq.com" style={styles.footerLink}>Contact</a>
          </div>

          <div style={styles.footerCopy}>© {new Date().getFullYear()} Meddoq</div>
        </footer>
      </div>
    </main>
  );
}

function CalculatorCard({ item }) {
  const color = categoryColors[item.category] || "#2563eb";

  return (
    <a href={item.href} className="meddoq-card" style={styles.card}>
      <div style={styles.cardTop}>
        <div style={styles.iconBubble}>{item.icon}</div>
        <span
          style={{
            ...styles.categoryBadge,
            color,
            borderColor: `${color}33`,
            background: `${color}12`,
          }}
        >
          {item.category}
        </span>
      </div>

      <h3 style={styles.cardTitle}>{item.name}</h3>
      <p style={styles.cardText}>{item.description}</p>
      <div style={styles.cardAction}>Open calculator →</div>
    </a>
  );
}

function Benefit({ icon, title, text }) {
  return (
    <div style={styles.benefitItem}>
      <span style={styles.benefitIcon}>{icon}</span>
      <div>
        <strong>{title}</strong>
        <p>{text}</p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f4f8ff",
    color: "#071a3d",
    fontFamily:
      'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },
  shell: {
    width: "min(100%, 1440px)",
    margin: "0 auto",
    background: "#ffffff",
    boxShadow: "0 0 0 1px #e8eef8",
  },
  header: {
    height: 70,
    padding: "0 56px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 24,
    background: "rgba(255,255,255,0.96)",
    borderBottom: "1px solid #e8eef8",
  },
  brand: {
    display: "inline-flex",
    alignItems: "center",
    textDecoration: "none",
  },
  brandLogo: {
    height: 86,
    width: "auto",
    display: "block",
  },
  nav: {
    display: "flex",
    alignItems: "center",
    gap: 28,
    flexWrap: "wrap",
    justifyContent: "flex-end",
  },
  navLink: {
    color: "#071a3d",
    textDecoration: "none",
    fontWeight: 850,
    fontSize: 14,
  },
  contactButton: {
    background: "linear-gradient(135deg, #083074, #075bb8)",
    color: "#ffffff",
    textDecoration: "none",
    padding: "12px 20px",
    borderRadius: 10,
    fontWeight: 950,
    boxShadow: "0 12px 26px rgba(8, 48, 116, 0.22)",
  },
  hero: {
    position: "relative",
    overflow: "hidden",
    height: 370,
    padding: "32px 56px 28px",
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr) minmax(430px, 0.9fr)",
    alignItems: "center",
    gap: 26,
    background:
      "linear-gradient(135deg, #ffffff 0%, #f3f8ff 52%, #eaf4ff 100%)",
    borderBottom: "1px solid #e8eef8",
  },
  heroContent: {
    position: "relative",
    zIndex: 2,
    maxWidth: 670,
  },
  heroTitle: {
    margin: 0,
    color: "#071a3d",
    fontSize: "clamp(44px, 4.2vw, 64px)",
    lineHeight: 1.02,
    letterSpacing: "-0.055em",
    fontWeight: 950,
  },
  heroText: {
    margin: "14px 0 0",
    maxWidth: 620,
    color: "#334155",
    fontSize: 18,
    lineHeight: 1.45,
    fontWeight: 500,
  },
  searchBox: {
    marginTop: 20,
    display: "flex",
    alignItems: "center",
    gap: 14,
    width: "min(100%, 560px)",
    background: "#ffffff",
    border: "1px solid #dbe7f8",
    borderRadius: 12,
    padding: "0 18px",
    boxShadow: "0 16px 36px rgba(15, 23, 42, 0.08)",
  },
  searchIcon: {
    color: "#365b91",
    fontSize: 24,
    fontWeight: 900,
  },
  searchInput: {
    width: "100%",
    border: 0,
    outline: 0,
    padding: "14px 0",
    background: "transparent",
    color: "#071a3d",
    fontSize: 16,
  },
  trustRow: {
    marginTop: 18,
    display: "flex",
    alignItems: "center",
    gap: 28,
    flexWrap: "wrap",
    color: "#071a3d",
    fontWeight: 900,
    fontSize: 13,
  },
  heroEmblemWrap: {
    position: "relative",
    height: 340,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  heroEmblem: {
    width: 520,
    height: 520,
    objectFit: "contain",
    opacity: 0.24,
    filter: "saturate(0.95)",
    display: "block",
  },
  featuredSection: {
    padding: "22px 56px 20px",
    background: "#ffffff",
  },
  sectionTop: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 18,
    marginBottom: 14,
  },
  sectionTitle: {
    margin: 0,
    color: "#071a3d",
    fontSize: 25,
    letterSpacing: "-0.035em",
  },
  sectionLink: {
    color: "#075bb8",
    textDecoration: "none",
    fontWeight: 950,
    fontSize: 14,
  },
  cardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
    gap: 18,
  },
  card: {
    height: 172,
    display: "flex",
    flexDirection: "column",
    textDecoration: "none",
    color: "#071a3d",
    background: "#ffffff",
    border: "1px solid #dce6f4",
    borderRadius: 16,
    padding: 15,
    boxShadow: "0 12px 30px rgba(15, 23, 42, 0.055)",
  },
  cardTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
    marginBottom: 12,
  },
  iconBubble: {
    width: 44,
    height: 44,
    borderRadius: 13,
    display: "grid",
    placeItems: "center",
    background: "#eff6ff",
    fontSize: 25,
  },
  categoryBadge: {
    border: "1px solid #bfdbfe",
    borderRadius: 999,
    padding: "5px 8px",
    fontSize: 10,
    fontWeight: 950,
  },
  cardTitle: {
    margin: 0,
    color: "#071a3d",
    fontSize: 17,
    lineHeight: 1.18,
    letterSpacing: "-0.025em",
  },
  cardText: {
    margin: "7px 0 9px",
    color: "#334155",
    lineHeight: 1.35,
    fontSize: 13,
    flex: 1,
    overflow: "hidden",
  },
  cardAction: {
    color: "#075bb8",
    fontWeight: 950,
    fontSize: 13,
  },
  benefits: {
    padding: "16px 56px",
    display: "grid",
    gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
    gap: 18,
    background: "#ffffff",
    borderTop: "1px solid #e8eef8",
  },
  benefitItem: {
    display: "grid",
    gridTemplateColumns: "36px 1fr",
    gap: 12,
    alignItems: "start",
    minWidth: 0,
  },
  benefitIcon: {
    width: 34,
    height: 34,
    borderRadius: 12,
    display: "grid",
    placeItems: "center",
    color: "#075bb8",
    fontSize: 22,
    fontWeight: 900,
  },
  footer: {
    minHeight: 112,
    background: "linear-gradient(135deg, #061b3f, #072e6f)",
    color: "#ffffff",
    padding: "18px 56px",
    display: "grid",
    gridTemplateColumns: "1.2fr 1fr auto",
    gap: 24,
    alignItems: "center",
  },
  footerBrand: {
    display: "grid",
    gap: 6,
  },
  footerLogo: {
    height: 58,
    width: "auto",
    display: "block",
  },
  footerLinks: {
    display: "flex",
    gap: 16,
    flexWrap: "wrap",
  },
  footerLink: {
    color: "#ffffff",
    textDecoration: "none",
    fontWeight: 850,
    fontSize: 14,
  },
  footerCopy: {
    color: "#bfdbfe",
    fontWeight: 800,
    whiteSpace: "nowrap",
  },
};
