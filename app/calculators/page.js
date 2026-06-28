"use client";

import { useMemo, useState } from "react";
import { calculators } from "../data/calculators";

export default function CalculatorLibraryPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const categories = useMemo(() => {
    return ["All", ...Array.from(new Set(calculators.map((item) => item.category))).sort()];
  }, []);

  const filteredCalculators = useMemo(() => {
    const q = query.trim().toLowerCase();

    return calculators
      .filter((item) => category === "All" || item.category === category)
      .filter((item) => {
        if (!q) return true;
        return [item.name, item.category, item.description, item.id]
          .join(" ")
          .toLowerCase()
          .includes(q);
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [query, category]);

  return (
    <main style={styles.page}>
      <section style={styles.hero}>
        <p style={styles.kicker}>Calculator Library</p>
        <h1 style={styles.title}>Clinical Calculator Library</h1>
        <p style={styles.text}>
          Search Meddoq clinical calculators by name, specialty, score, formula or clinical topic.
        </p>

        <div style={styles.searchBox}>
          <span style={styles.searchIcon}>⌕</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search eGFR, HEART, CURB-65, SOFA, DVT..."
            style={styles.searchInput}
          />
        </div>

        <div style={styles.filters}>
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              style={{
                ...styles.filterButton,
                ...(category === item ? styles.filterButtonActive : {}),
              }}
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      <section style={styles.summary}>
        <strong>{filteredCalculators.length}</strong>
        <span>
          {filteredCalculators.length === 1 ? "calculator" : "calculators"} shown
          {category !== "All" ? ` in ${category}` : ""}
        </span>
      </section>

      <section style={styles.grid}>
        {filteredCalculators.map((item) => (
          <a key={item.id} href={item.href} style={styles.card}>
            <div style={styles.cardTop}>
              <div style={styles.iconBubble}>{item.icon}</div>
              <span style={styles.categoryBadge}>{item.category}</span>
            </div>
            <h2 style={styles.cardTitle}>{item.name}</h2>
            <p style={styles.cardText}>{item.description}</p>
            <div style={styles.cardAction}>Open calculator →</div>
          </a>
        ))}
      </section>

      {filteredCalculators.length === 0 && (
        <section style={styles.empty}>
          No calculator found. Try a broader search term.
        </section>
      )}
    </main>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    padding: "44px 24px 64px",
    background: "linear-gradient(135deg, #f8fafc 0%, #eef6ff 100%)",
    color: "#0f172a",
    fontFamily:
      'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },
  hero: {
    maxWidth: 1120,
    margin: "0 auto 28px",
  },
  kicker: {
    margin: 0,
    color: "#2563eb",
    fontWeight: 900,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    fontSize: 12,
  },
  title: {
    margin: "8px 0",
    fontSize: 44,
    lineHeight: 1.05,
    letterSpacing: "-0.045em",
  },
  text: {
    margin: "0 0 22px",
    color: "#475569",
    maxWidth: 760,
    fontSize: 17,
    lineHeight: 1.65,
  },
  searchBox: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    maxWidth: 760,
    background: "#ffffff",
    border: "1px solid #dbeafe",
    borderRadius: 20,
    padding: "0 16px",
    boxShadow: "0 18px 44px rgba(37, 99, 235, 0.08)",
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
  filters: {
    display: "flex",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 18,
  },
  filterButton: {
    border: "1px solid #cbd5e1",
    background: "#ffffff",
    color: "#334155",
    borderRadius: 999,
    padding: "10px 14px",
    fontWeight: 850,
    cursor: "pointer",
  },
  filterButtonActive: {
    background: "#2563eb",
    borderColor: "#2563eb",
    color: "#ffffff",
  },
  summary: {
    maxWidth: 1120,
    margin: "0 auto 18px",
    display: "flex",
    gap: 8,
    alignItems: "baseline",
    color: "#475569",
  },
  grid: {
    maxWidth: 1120,
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: 18,
  },
  card: {
    display: "flex",
    flexDirection: "column",
    minHeight: 210,
    textDecoration: "none",
    color: "#0f172a",
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: 24,
    padding: 22,
    boxShadow: "0 18px 44px rgba(15, 23, 42, 0.07)",
    transition: "transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease",
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
    background: "#eff6ff",
    color: "#2563eb",
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
    color: "#475569",
    lineHeight: 1.55,
    fontSize: 14,
    flex: 1,
  },
  cardAction: {
    color: "#2563eb",
    fontWeight: 900,
  },
  empty: {
    maxWidth: 1120,
    margin: "24px auto 0",
    padding: 20,
    borderRadius: 20,
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    color: "#64748b",
    fontWeight: 800,
  },
};
