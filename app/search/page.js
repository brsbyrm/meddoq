"use client";

import { useMemo, useState } from "react";
import { calculators } from "../data/calculators";

export default function SearchPage() {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();

    if (!q) return calculators;

    return calculators.filter((item) =>
      [item.name, item.category, item.description, item.id]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [query]);

  return (
    <main style={styles.page}>
      <section style={styles.hero}>
        <p style={styles.kicker}>Search</p>
        <h1 style={styles.title}>Search clinical calculators</h1>
        <p style={styles.text}>
          Find Meddoq calculators by name, specialty, clinical score, disease area or formula.
        </p>

        <div style={styles.searchBox}>
          <span style={styles.searchIcon}>⌕</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search eGFR, HEART, SOFA, DVT, BMI..."
            style={styles.searchInput}
            autoFocus
          />
        </div>
      </section>

      <section style={styles.summary}>
        <strong>{results.length}</strong>
        <span>{results.length === 1 ? "result" : "results"}</span>
      </section>

      <section style={styles.grid}>
        {results.map((item) => (
          <a key={item.id} href={item.href} style={styles.card}>
            <div style={styles.icon}>{item.icon}</div>
            <div>
              <div style={styles.cardTop}>
                <h2 style={styles.cardTitle}>{item.name}</h2>
                <span style={styles.badge}>{item.category}</span>
              </div>
              <p style={styles.cardText}>{item.description}</p>
            </div>
          </a>
        ))}
      </section>

      {results.length === 0 && (
        <section style={styles.empty}>
          No calculator found. Try another keyword.
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
    maxWidth: 980,
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
  summary: {
    maxWidth: 980,
    margin: "0 auto 18px",
    display: "flex",
    gap: 8,
    alignItems: "baseline",
    color: "#475569",
  },
  grid: {
    maxWidth: 980,
    margin: "0 auto",
    display: "grid",
    gap: 14,
  },
  card: {
    display: "grid",
    gridTemplateColumns: "52px 1fr",
    gap: 14,
    alignItems: "center",
    textDecoration: "none",
    color: "#0f172a",
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: 20,
    padding: 18,
    boxShadow: "0 14px 34px rgba(15, 23, 42, 0.06)",
  },
  icon: {
    width: 52,
    height: 52,
    borderRadius: 18,
    display: "grid",
    placeItems: "center",
    background: "#eff6ff",
    fontSize: 25,
  },
  cardTop: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 6,
  },
  cardTitle: {
    margin: 0,
    fontSize: 20,
    letterSpacing: "-0.025em",
  },
  badge: {
    border: "1px solid #bfdbfe",
    background: "#eff6ff",
    color: "#2563eb",
    borderRadius: 999,
    padding: "6px 10px",
    fontSize: 12,
    fontWeight: 900,
    whiteSpace: "nowrap",
  },
  cardText: {
    margin: 0,
    color: "#475569",
    lineHeight: 1.55,
  },
  empty: {
    maxWidth: 980,
    margin: "24px auto 0",
    padding: 20,
    borderRadius: 20,
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    color: "#64748b",
    fontWeight: 800,
  },
};
