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
      <header style={styles.header}>
        <a href="/" style={styles.brand}>
          <img src="/brand.png" alt="Meddoq" style={styles.brandLogo} />
        </a>

        <nav style={styles.nav}>
          <a href="/calculators" style={styles.navLink}>Calculators</a>
          <a href="/search" style={styles.navLink}>Search</a>
          <a href="/faq" style={styles.navLink}>FAQ</a>
          <a href="mailto:contact@meddoq.com" style={styles.contactButton}>Contact</a>
        </nav>
      </header>

      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>
            Clinical Calculators
            <br />
            & Decision Support
          </h1>

          <p style={styles.heroText}>
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

          <div style={styles.trustRow}>
            <span>🛡️ Evidence Based</span>
            <span>🔒 Secure & Private</span>
            <span>👨‍⚕️ Physician Focused</span>
          </div>
        </div>

        <div style={styles.heroEmblemWrap}>
          <img src="/icon.png" alt="" aria-hidden="true" style={styles.heroEmblem} />
        </div>
      </section>

      <section style={styles.featuredSection}>
        <div style={styles.sectionTop}>
          <h2 style={styles.sectionTitle}>{query ? "Search Results" : "Featured Calculators"}</h2>
          <a href="/calculators" style={styles.sectionLink}>View all calculators →</a>
        </div>

        <div style={styles.cardGrid}>
          {results.slice(0, 4).map((item) => (
            <CalculatorCard key={item.id} item={item} />
          ))}
        </div>

        {query && results.length === 0 && (
          <div style={styles.emptyState}>
            <img src="/icon.png" alt="" style={styles.emptyIcon} />
            <strong>No calculators found</strong>
            <span>Try another clinical score, formula or specialty.</span>
          </div>
        )}
      </section>

      <section style={styles.benefits}>
        <Benefit icon="◎" title="Accurate" text="Built around validated clinical scores and formulas." />
        <Benefit icon="◇" title="Reliable" text="Designed for consistent bedside workflow use." />
        <Benefit icon="⚡" title="Fast" text="Clean inputs, clear results and interpretation." />
        <Benefit icon="☤" title="For Physicians" text="Clinical decision support for medical practice." />
      </section>

      <footer style={styles.footer}>
        <div style={styles.footerBrand}>
          <img src="/brand.png" alt="Meddoq" style={styles.footerLogo} />
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
    </main>
  );
}

function CalculatorCard({ item }) {
  const color = categoryColors[item.category] || "#2563eb";

  return (
    <a href={item.href} style={styles.card}>
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
    background: "#f8fbff",
    color: "#071a3d",
    fontFamily:
      'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },
  header: {
    height: 68,
    maxWidth: 1320,
    margin: "0 auto",
    padding: "0 36px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 24,
    background: "rgba(255,255,255,0.95)",
  },
  brand: {
    display: "inline-flex",
    alignItems: "center",
    textDecoration: "none",
  },
  brandLogo: {
    height: 74,
    width: "auto",
    display: "block",
  },
  nav: {
    display: "flex",
    alignItems: "center",
    gap: 26,
    flexWrap: "wrap",
    justifyContent: "flex-end",
  },
  navLink: {
    color: "#071a3d",
    textDecoration: "none",
    fontWeight: 800,
    fontSize: 15,
  },
  contactButton: {
    background: "linear-gradient(135deg, #083074, #075bb8)",
    color: "#ffffff",
    textDecoration: "none",
    padding: "13px 20px",
    borderRadius: 10,
    fontWeight: 900,
    boxShadow: "0 14px 28px rgba(8, 48, 116, 0.2)",
  },
  hero: {
    position: "relative",
    overflow: "hidden",
    maxWidth: 1320,
    margin: "0 auto",
    minHeight: 315,
    padding: "24px 36px 20px",
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr) minmax(390px, 0.85fr)",
    alignItems: "center",
    gap: 26,
    borderTop: "1px solid #e8eef8",
    borderBottom: "1px solid #e8eef8",
    background:
      "linear-gradient(135deg, #ffffff 0%, #f3f8ff 52%, #eef6ff 100%)",
  },
  heroContent: {
    position: "relative",
    zIndex: 2,
    maxWidth: 670,
  },
  heroTitle: {
    margin: 0,
    color: "#071a3d",
    fontSize: "clamp(38px, 4vw, 54px)",
    lineHeight: 1.02,
    letterSpacing: "-0.055em",
    fontWeight: 950,
  },
  heroText: {
    margin: "12px 0 0",
    maxWidth: 620,
    color: "#334155",
    fontSize: 17,
    lineHeight: 1.5,
    fontWeight: 500,
  },
  searchBox: {
    marginTop: 16,
    display: "flex",
    alignItems: "center",
    gap: 14,
    width: "min(100%, 620px)",
    background: "#ffffff",
    border: "1px solid #dbe7f8",
    borderRadius: 12,
    padding: "0 18px",
    boxShadow: "0 18px 42px rgba(15, 23, 42, 0.08)",
  },
  searchIcon: {
    color: "#365b91",
    fontSize: 25,
    fontWeight: 900,
  },
  searchInput: {
    width: "100%",
    border: 0,
    outline: 0,
    padding: "13px 0",
    background: "transparent",
    color: "#071a3d",
    fontSize: 17,
  },
  trustRow: {
    marginTop: 14,
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
    minHeight: 260,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  heroEmblem: {
    width: "min(620px, 120%)",
    height: "auto",
    opacity: 0.30,
    filter: "saturate(0.95)",
    display: "block",
  },
  featuredSection: {
    maxWidth: 1320,
    margin: "0 auto",
    padding: "20px 36px 18px",
    background: "#ffffff",
  },
  sectionTop: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 18,
    marginBottom: 12,
  },
  sectionTitle: {
    margin: 0,
    color: "#071a3d",
    fontSize: 24,
    letterSpacing: "-0.035em",
  },
  sectionLink: {
    color: "#075bb8",
    textDecoration: "none",
    fontWeight: 900,
  },
  cardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
    gap: 18,
  },
  card: {
    minHeight: 150,
    display: "flex",
    flexDirection: "column",
    textDecoration: "none",
    color: "#071a3d",
    background: "#ffffff",
    border: "1px solid #dce6f4",
    borderRadius: 16,
    padding: 14,
    boxShadow: "0 14px 34px rgba(15, 23, 42, 0.055)",
  },
  cardTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
    marginBottom: 16,
  },
  iconBubble: {
    width: 44,
    height: 44,
    borderRadius: 14,
    display: "grid",
    placeItems: "center",
    background: "#eff6ff",
    fontSize: 22,
  },
  categoryBadge: {
    border: "1px solid #bfdbfe",
    borderRadius: 999,
    padding: "6px 9px",
    fontSize: 11,
    fontWeight: 950,
  },
  cardTitle: {
    margin: 0,
    color: "#071a3d",
    fontSize: 17,
    lineHeight: 1.22,
    letterSpacing: "-0.025em",
  },
  cardText: {
    margin: "7px 0 10px",
    color: "#334155",
    lineHeight: 1.45,
    fontSize: 14,
    flex: 1,
  },
  cardAction: {
    color: "#075bb8",
    fontWeight: 950,
  },
  emptyState: {
    marginTop: 18,
    minHeight: 170,
    border: "1px solid #dce6f4",
    borderRadius: 18,
    background: "#f8fbff",
    display: "grid",
    placeItems: "center",
    textAlign: "center",
    color: "#334155",
    padding: 22,
  },
  emptyIcon: {
    width: 82,
    height: 82,
    objectFit: "contain",
    opacity: 0.45,
  },
  benefits: {
    maxWidth: 1320,
    margin: "0 auto",
    padding: "14px 36px",
    display: "grid",
    gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
    gap: 20,
    background: "#ffffff",
    borderTop: "1px solid #e8eef8",
  },
  benefitItem: {
    display: "grid",
    gridTemplateColumns: "42px 1fr",
    gap: 14,
    alignItems: "start",
    paddingRight: 12,
  },
  benefitIcon: {
    width: 32,
    height: 32,
    borderRadius: 14,
    display: "grid",
    placeItems: "center",
    color: "#075bb8",
    fontSize: 20,
    fontWeight: 900,
  },
  footer: {
    maxWidth: 1320,
    margin: "0 auto",
    background:
      "linear-gradient(135deg, #061b3f, #072e6f)",
    color: "#ffffff",
    borderRadius: "18px 18px 0 0",
    padding: "16px 36px",
    display: "grid",
    gridTemplateColumns: "1.3fr 1fr auto",
    gap: 24,
    alignItems: "center",
  },
  footerBrand: {
    display: "grid",
    gap: 8,
  },
  footerLogo: {
    height: 52,
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
  },
  footerCopy: {
    color: "#bfdbfe",
    fontWeight: 800,
  },
};
