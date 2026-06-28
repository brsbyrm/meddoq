export default function Callout({ title, children, tone = "blue" }) {
  const toneStyle = tones[tone] || tones.blue;

  return (
    <aside style={{ ...styles.callout, borderColor: toneStyle.border, background: toneStyle.bg }}>
      {title ? <strong style={{ ...styles.title, color: toneStyle.text }}>{title}</strong> : null}
      <div style={styles.body}>{children}</div>
    </aside>
  );
}

const tones = {
  blue: { bg: "#eff6ff", border: "#bfdbfe", text: "#1d4ed8" },
  green: { bg: "#ecfdf5", border: "#bbf7d0", text: "#047857" },
  amber: { bg: "#fffbeb", border: "#fde68a", text: "#b45309" },
  red: { bg: "#fef2f2", border: "#fecaca", text: "#b91c1c" },
  slate: { bg: "#f8fafc", border: "#cbd5e1", text: "#334155" },
};

const styles = {
  callout: {
    border: "1px solid",
    borderRadius: 20,
    padding: 18,
    marginTop: 18,
  },
  title: {
    display: "block",
    marginBottom: 8,
    fontSize: 15,
    fontWeight: 900,
  },
  body: {
    color: "#475569",
    fontSize: 15,
    lineHeight: 1.7,
  },
};
