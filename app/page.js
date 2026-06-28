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

const featuredIds = [
  "heart-score",
  "pesi-score",
  "sofa-score",
  "egfr",
  "wells-dvt",
  "aortic-size-index",
];

export default function Home() {
  const [query, setQuery] = useState("");

  const filteredCalculators = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return calculators;

    return calculators.filter((item) =>
      [item.name, item.category, item.description, item.id]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [query]);

  const featuredCalculators = useMemo(() => {
    return featuredIds
      .map((id) => calculators.find((item) => item.id === id))
      .filter(Boolean);
  }, []);

  const recentCalculators = useMemo(() => calculators.slice(-6).reverse(), []);

  const categoryStats = useMemo(() => {
    const counts = calculators.reduce((acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(counts)
      .map(([category, count]) => ({ category, count }))
      .sort((a, b) => b.count - a.count);
  }, []);

  return (
    <main style={styles.page}>
      <header style={styles.header}>
        <a href="/" style={styles.brand}>
          <img src="/brand.png" alt="Meddoq" style={styles.logoImage} />
        </a>

        <nav style={styles.nav}>
          <a href="#calculators" style={styles.navLink}>Calculators</a>
          <a href="/calculators" style={styles.navLink}>Library</a>
          <a href="/search" style={styles.navLink}>Search</a>
          <a href="mailto:contact@meddoq.com" style={styles.contactButton}>Contact</a>
        </nav>
      </header>

      <section style={styles.hero}>
        <div style={styles.heroLeft}>
          <div style={styles.badge}>Evidence-based physician tools</div>
          <h1 style={styles.heroTitle}>
            Clinical calculators for faster, clearer decisions.
          </h1>
          <p style={styles.heroText}>
            Meddoq brings validated clinical scores, medical formulas and decision-support tools
            into a clean, fast workflow built for physicians.
          </p>

          <div style={styles.heroActions}>
            <a href="/calculators" style={styles.primaryButton}>Open calculator library</a>
            <a href="/search" style={styles.secondaryButton}>Search calculators</a>
          </div>

          <div style={styles.heroStats}>
            <div style={styles.statItem}>
              <strong>{calculators.length}</strong>
              <span>Calculators</span>
            </div>
            <div style={styles.statItem}>
              <strong>{categoryStats.length}</strong>
              <span>Clinical areas</span>
            </div>
            <div style={styles.statItem}>
              <strong>Free</strong>
              <span>Open access</span>
            </div>
          </div>
        </div>

        <div style={styles.heroVisual}>
          <div style={styles.heroPanel}>
            <div style={styles.heroPanelTop}>
              <span>Featured tools</span>
              <strong>Meddoq</strong>
            </div>
            <div style={styles.featuredMiniList}>
              {featuredCalculators.slice(0, 4).map((item) => (
                <a key={item.id} href={item.href} style={styles.featuredMiniItem}>
                  <span style={styles.miniIcon}>{item.icon}</span>
                  <div>
                    <strong>{item.name}</strong>
                    <p>{item.category}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={styles.searchSection}>
        <div style={styles.searchBox}>
          <span style={styles.searchIcon}>⌕</span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search calculators, scores, diseases..."
            style={styles.searchInput}
          />
        </div>
      </section>

      <section style={styles.section}>
        <div style={styles.sectionTop}>
          <div>
            <p style={styles.kicker}>Featured calculators</p>
            <h2 style={styles.sectionTitle}>Start with common clinical tools</h2>
          </div>
          <a href="/calculators" style={styles.sectionLink}>View all →</a>
        </div>

        <div style={styles.calculatorGrid}>
          {featuredCalculators.map((item) => (
            <CalculatorCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      <section style={styles.section}>
        <div style={styles.sectionTop}>
          <div>
            <p style={styles.kicker}>Clinical areas</p>
            <h2 style={styles.sectionTitle}>Browse by specialty</h2>
          </div>
        </div>

        <div style={styles.categoryGrid}>
          {categoryStats.map((item) => (
            <a
              key={item.category}
              href={`/calculators#${encodeURIComponent(item.category)}`}
              style={{
                ...styles.categoryCard,
                borderColor: `${categoryColors[item.category] || "#334155"}33`,
              }}
            >
              <strong style={{ color: categoryColors[item.category] || "#334155" }}>
                {item.category}
              </strong>
              <span>{item.count} calculators</span>
            </a>
          ))}
        </div>
      </section>

      <section id="calculators" style={styles.section}>
        <div style={styles.sectionTop}>
          <div>
            <p style={styles.kicker}>{query ? "Search results" : "Recently added"}</p>
            <h2 style={styles.sectionTitle}>
              {query ? `${filteredCalculators.length} matching calculators` : "Newest calculators"}
            </h2>
          </div>
        </div>

        <div style={styles.calculatorGrid}>
          {(query ? filteredCalculators : recentCalculators).map((item) => (
            <CalculatorCard key={item.id} item={item} />
          ))}
        </div>

        {query && filteredCalculators.length === 0 && (
          <div style={styles.noResults}>
            No calculator found. Try eGFR, HEART, SOFA, DVT, BMI or aortic.
          </div>
        )}
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
        <div style={styles.footerLinks}>
          <a href="/calculators">Calculator Library</a>
          <a href="/search">Search</a>
          <a href="/faq">FAQ</a>
        </div>
        <div style={styles.footerEmail}>contact@meddoq.com</div>
        <div>© {new Date().getFullYear()} Meddoq</div>
      </footer>
    </main>
  );
}

function CalculatorCard({ item }) {
  const color = categoryColors[item.category] || "#334155";

  return (
    <a href={item.href} style={styles.card}>
      <div style={styles.cardTop}>
        <div style={styles.iconBubble}>{item.icon}</div>
        <span
          style={{
            ...styles.categoryBadge,
            color,
            background: `${color}12`,
            borderColor: `${color}33`,
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

const styles = {
  page: {
    minHeight: "100vh",
    background:
      "radial-gradient(circle at top left, rgba(37,99,235,0.14), transparent 32%), linear-gradient(135deg, #f8fafc 0%, #eef6ff 100%)",
    color: "#0f172a",
    fontFamily:
      'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },
  header: {
    maxWidth: 1180,
    margin: "0 auto",
    padding: "28px 24px 12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 18,
  },
  brand: {
    display: "inline-flex",
    alignItems: "center",
    textDecoration: "none",
  },
  logoImage: {
    height: 64,
    width: "auto",
    display: "block",
  },
  nav: {
    display: "flex",
    alignItems: "center",
    gap: 14,
    flexWrap: "wrap",
    justifyContent: "flex-end",
  },
  navLink: {
    color: "#334155",
    textDecoration: "none",
    fontWeight: 800,
  },
  contactButton: {
    background: "#0f172a",
    color: "#ffffff",
    textDecoration: "none",
    padding: "11px 14px",
    borderRadius: 999,
    fontWeight: 900,
  },
  hero: {
    maxWidth: 1180,
    margin: "0 auto",
    padding: "64px 24px 34px",
    display: "grid",
    gridTemplateColumns: "minmax(0, 1.05fr) minmax(320px, 0.95fr)",
    gap: 36,
    alignItems: "center",
  },
  heroLeft: {
    minWidth: 0,
  },
  badge: {
    display: "inline-flex",
    background: "#dbeafe",
    color: "#1d4ed8",
    border: "1px solid #bfdbfe",
    borderRadius: 999,
    padding: "8px 12px",
    fontSize: 13,
    fontWeight: 900,
    marginBottom: 18,
  },
  heroTitle: {
    margin: 0,
    fontSize: "clamp(42px, 6vw, 72px)",
    lineHeight: 0.94,
    letterSpacing: "-0.065em",
  },
  heroText: {
    margin: "22px 0 0",
    maxWidth: 760,
    color: "#334155",
    fontSize: 22,
    lineHeight: 1.65,
  },
  heroActions: {
    display: "flex",
    gap: 12,
    flexWrap: "wrap",
    marginTop: 28,
  },
  primaryButton: {
    background: "#2563eb",
    color: "#ffffff",
    textDecoration: "none",
    padding: "14px 18px",
    borderRadius: 16,
    fontWeight: 900,
    boxShadow: "0 18px 40px rgba(37, 99, 235, 0.24)",
  },
  secondaryButton: {
    background: "#ffffff",
    color: "#0f172a",
    textDecoration: "none",
    padding: "14px 18px",
    borderRadius: 16,
    fontWeight: 900,
    border: "1px solid #cbd5e1",
  },
  heroStats: {
    display: "flex",
    gap: 12,
    flexWrap: "wrap",
    marginTop: 28,
  },
  statItem: {
    background: "rgba(255,255,255,0.74)",
    border: "1px solid #dbeafe",
    borderRadius: 18,
    padding: "14px 16px",
    minWidth: 120,
  },
  heroVisual: {
    minWidth: 0,
  },
  heroPanel: {
    background: "rgba(255,255,255,0.86)",
    border: "1px solid #dbeafe",
    borderRadius: 32,
    padding: 24,
    boxShadow: "0 30px 80px rgba(15, 23, 42, 0.12)",
  },
  heroPanelTop: {
    display: "flex",
    justifyContent: "space-between",
    color: "#64748b",
    fontWeight: 900,
    marginBottom: 16,
  },
  featuredMiniList: {
    display: "grid",
    gap: 12,
  },
  featuredMiniItem: {
    display: "grid",
    gridTemplateColumns: "46px 1fr",
    gap: 12,
    alignItems: "center",
    textDecoration: "none",
    color: "#0f172a",
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
    borderRadius: 18,
    padding: 14,
  },
  miniIcon: {
    width: 46,
    height: 46,
    borderRadius: 16,
    display: "grid",
    placeItems: "center",
    background: "#eff6ff",
    fontSize: 24,
  },
  searchSection: {
    maxWidth: 900,
    margin: "0 auto 22px",
    padding: "0 24px",
  },
  searchBox: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    background: "#ffffff",
    border: "1px solid #dbeafe",
    borderRadius: 22,
    padding: "0 18px",
    boxShadow: "0 20px 50px rgba(37, 99, 235, 0.08)",
  },
  searchIcon: {
    color: "#2563eb",
    fontSize: 24,
    fontWeight: 900,
  },
  searchInput: {
    width: "100%",
    border: 0,
    outline: 0,
    padding: "18px 0",
    fontSize: 16,
    background: "transparent",
    color: "#0f172a",
  },
  section: {
    maxWidth: 1180,
    margin: "0 auto",
    padding: "34px 24px",
  },
  sectionTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "end",
    gap: 16,
    marginBottom: 18,
  },
  kicker: {
    margin: 0,
    color: "#2563eb",
    fontWeight: 900,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    fontSize: 12,
  },
  sectionTitle: {
    margin: "6px 0 0",
    fontSize: 32,
    letterSpacing: "-0.04em",
  },
  sectionLink: {
    color: "#2563eb",
    fontWeight: 900,
    textDecoration: "none",
  },
  calculatorGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: 18,
  },
  card: {
    display: "flex",
    flexDirection: "column",
    minHeight: 220,
    textDecoration: "none",
    color: "#0f172a",
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: 24,
    padding: 22,
    boxShadow: "0 18px 44px rgba(15, 23, 42, 0.07)",
  },
  cardTop: {
    display: "flex",
    justifyContent: "space-between",
    gap: 12,
    alignItems: "center",
    marginBottom: 18,
  },
  iconBubble: {
    width: 46,
    height: 46,
    borderRadius: 16,
    display: "grid",
    placeItems: "center",
    background: "#eff6ff",
    fontSize: 24,
  },
  categoryBadge: {
    border: "1px solid #bfdbfe",
    borderRadius: 999,
    padding: "7px 10px",
    fontSize: 12,
    fontWeight: 900,
  },
  cardTitle: {
    margin: 0,
    fontSize: 20,
    lineHeight: 1.2,
    letterSpacing: "-0.025em",
  },
  cardText: {
    margin: "10px 0 18px",
    color: "#334155",
    lineHeight: 1.55,
    fontSize: 14,
    flex: 1,
  },
  cardAction: {
    color: "#2563eb",
    fontWeight: 900,
  },
  categoryGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
    gap: 14,
  },
  categoryCard: {
    display: "grid",
    gap: 6,
    textDecoration: "none",
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: 20,
    padding: 18,
    boxShadow: "0 14px 34px rgba(15, 23, 42, 0.05)",
  },
  noResults: {
    marginTop: 18,
    padding: 18,
    borderRadius: 18,
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    color: "#64748b",
    fontWeight: 800,
  },
  whyBox: {
    maxWidth: 1180,
    margin: "20px auto 0",
    padding: "34px 24px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 16,
  },
  whyItem: {
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: 22,
    padding: 20,
    display: "grid",
    gap: 8,
  },
  disclaimerMini: {
    background: "#0f172a",
    color: "#ffffff",
    borderRadius: 22,
    padding: 20,
    display: "grid",
    gap: 8,
  },
  footer: {
    maxWidth: 1180,
    margin: "0 auto",
    padding: "34px 24px 48px",
    color: "#334155",
    display: "flex",
    justifyContent: "space-between",
    gap: 20,
    flexWrap: "wrap",
    borderTop: "1px solid #dbeafe",
  },
  footerLinks: {
    display: "flex",
    gap: 14,
    flexWrap: "wrap",
  },
  footerEmail: {
    fontWeight: 900,
    color: "#0f172a",
  },
};
