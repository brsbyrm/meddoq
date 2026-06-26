"use client";

import { useState } from "react";
import Image from "next/image";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header style={styles.header}>
      <div style={styles.brand}>
        <Image
          src="/logo.png"
          alt="Meddoq"
          width={170}
          height={52}
          priority
          style={styles.logoImage}
        />
      </div>

      <nav className="desktop-nav" style={styles.nav}>
        <a href="#calculators" style={styles.navLink}>Calculators</a>
        <a href="#categories" style={styles.navLink}>Categories</a>
        <a href="#disclaimer" style={styles.navLink}>Disclaimer</a>
        <span style={styles.navEmail}>contact@meddoq.com</span>
      </nav>

      <button
        type="button"
        className="mobile-menu-button"
        onClick={() => setMenuOpen(!menuOpen)}
        style={styles.menuButton}
      >
        ☰
      </button>

      {menuOpen && (
        <div className="mobile-menu-panel" style={styles.mobileMenu}>
          <div style={styles.mobileMenuTop}>
            <div style={styles.mobileMenuTitle}>Meddoq</div>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              style={styles.mobileMenuClose}
            >
              ×
            </button>
          </div>

          <a onClick={() => setMenuOpen(false)} href="#calculators" style={styles.mobileMenuLink}>Calculators</a>
          <a onClick={() => setMenuOpen(false)} href="#categories" style={styles.mobileMenuLink}>Categories</a>
          <a onClick={() => setMenuOpen(false)} href="#disclaimer" style={styles.mobileMenuLink}>Disclaimer</a>
          <div style={styles.mobileMenuEmail}>✉ contact@meddoq.com</div>
        </div>
      )}
    </header>
  );
}

const styles = {
  header: {
    position: "relative",
    zIndex: 20,
    maxWidth: 1180,
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    padding: "14px 16px",
    backdropFilter: "blur(16px)",
    background: "rgba(255,255,255,0.78)",
    border: "1px solid rgba(226,232,240,0.9)",
    borderRadius: 22,
    boxShadow: "0 18px 45px rgba(15,23,42,0.08)",
    flexWrap: "wrap",
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  logoImage: {
    height: "52px",
    width: "auto",
  },
  logoText: {
    fontSize: 24,
    fontWeight: 900,
    letterSpacing: "-0.04em",
  },
  logoSubtext: {
    fontSize: 12,
    color: "#64748b",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
  },
  nav: {
    display: "flex",
    gap: 10,
    flexWrap: "wrap",
    maxWidth: "100%",
    justifyContent: "flex-end",
  },
  navLink: {
    color: "#334155",
    textDecoration: "none",
    fontSize: 14,
    fontWeight: 700,
  },
  navEmail: {
    color: "#475569",
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
    fontSize: 13,
    fontWeight: 700,
    padding: "8px 12px",
    borderRadius: 999,
    userSelect: "all",
    textDecoration: "none",
  },
  menuButton: {
    border: "1px solid #cbd5e1",
    background: "#ffffff",
    color: "#0f172a",
    borderRadius: 999,
    padding: "10px 14px",
    fontWeight: 900,
    fontSize: 14,
    cursor: "pointer",
  },
  mobileMenu: {
    width: "100%",
    display: "grid",
    gap: 10,
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: 18,
    padding: 14,
    marginTop: 10,
  },
  mobileMenuTop: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 8,
  },
  mobileMenuClose: {
    border: "1px solid #e2e8f0",
    background: "#f8fafc",
    color: "#0f172a",
    width: 34,
    height: 34,
    borderRadius: 999,
    fontSize: 22,
    lineHeight: 1,
    fontWeight: 800,
    cursor: "pointer",
  },
  mobileMenuTitle: {
    fontSize: 22,
    fontWeight: 950,
    letterSpacing: "-0.04em",
    color: "#0f172a",
  },
  mobileMenuLink: {
    color: "#0f172a",
    textDecoration: "none",
    fontWeight: 850,
    padding: "8px 4px",
  },
  mobileMenuEmail: {
    color: "#2563eb",
    background: "#eff6ff",
    border: "1px solid #bfdbfe",
    borderRadius: 14,
    padding: "10px 12px",
    fontWeight: 850,
    userSelect: "all",
    overflowWrap: "anywhere",
  },
};
