export default function Badge({ children, tone = "blue" }) {
  const toneStyle = tones[tone] || tones.blue;
  return <span style={{ ...styles.badge, ...toneStyle }}>{children}</span>;
}

const tones = {
  blue: { background: "#eff6ff", color: "#1d4ed8" },
  green: { background: "#ecfdf5", color: "#047857" },
  amber: { background: "#fffbeb", color: "#b45309" },
  red: { background: "#fef2f2", color: "#b91c1c" },
  slate: { background: "#f8fafc", color: "#334155" },
};

const styles = {
  badge: {
    display: "inline-flex",
    alignItems: "center",
    borderRadius: 999,
    padding: "7px 11px",
    fontSize: 13,
    fontWeight: 850,
    lineHeight: 1,
  },
};
