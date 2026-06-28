export default function CalculatorIcon({ icon, category }) {
  const key = normalizeIcon(icon, category);

  return (
    <span aria-hidden="true" style={styles.wrap}>
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {paths[key] || paths.default}
      </svg>
    </span>
  );
}

function normalizeIcon(icon, category) {
  if (icon === "🫀" || icon === "❤️") return "heart";
  if (icon === "🩸") return "blood";
  if (icon === "🫁") return "lung";
  if (icon === "🧪" || icon === "💧") return "lab";
  if (icon === "🦵" || icon === "🦶") return "vascular";
  if (icon === "📐" || icon === "⚖️") return "measure";
  if (icon === "🏃") return "activity";
  if (icon === "🤢") return "nausea";
  if (icon === "🚑") return "emergency";
  if (icon === "🏥") return "hospital";
  if (icon === "📈" || icon === "📊") return "chart";

  if (category === "Cardiology" || category === "Cardiovascular") return "heart";
  if (category === "Pulmonology" || category === "Pulmonary Embolism") return "lung";
  if (category === "Renal") return "lab";
  if (category === "Vascular") return "vascular";
  if (category === "Critical Care") return "hospital";
  if (category === "Perioperative") return "activity";

  return "default";
}

const paths = {
  heart: (
    <>
      <path d="M20.8 4.6c-1.7-1.7-4.5-1.7-6.2 0L12 7.2 9.4 4.6c-1.7-1.7-4.5-1.7-6.2 0s-1.7 4.5 0 6.2L12 19.6l8.8-8.8c1.7-1.7 1.7-4.5 0-6.2z" />
    </>
  ),
  blood: (
    <>
      <path d="M12 3s6 6.2 6 11a6 6 0 0 1-12 0c0-4.8 6-11 6-11z" />
      <path d="M9 14a3 3 0 0 0 3 3" />
    </>
  ),
  lung: (
    <>
      <path d="M12 4v16" />
      <path d="M12 8c-2.5 0-5 2.8-5 7v4" />
      <path d="M12 8c2.5 0 5 2.8 5 7v4" />
      <path d="M7 15c-2 0-3-1.6-3-3.5C4 8.5 6 6 8 6c1.4 0 2 1 2 2" />
      <path d="M17 15c2 0 3-1.6 3-3.5C20 8.5 18 6 16 6c-1.4 0-2 1-2 2" />
    </>
  ),
  lab: (
    <>
      <path d="M9 2h6" />
      <path d="M10 2v6l-5 9a3 3 0 0 0 2.6 4.5h8.8A3 3 0 0 0 19 17l-5-9V2" />
      <path d="M7 16h10" />
    </>
  ),
  vascular: (
    <>
      <path d="M12 3v18" />
      <path d="M12 8c-4 0-6 2-6 5" />
      <path d="M12 8c4 0 6 2 6 5" />
      <path d="M6 13c0 3 2 5 6 5" />
      <path d="M18 13c0 3-2 5-6 5" />
    </>
  ),
  measure: (
    <>
      <path d="M4 19h16" />
      <path d="M6 19V5h12v14" />
      <path d="M9 8h6" />
      <path d="M9 12h6" />
      <path d="M9 16h6" />
    </>
  ),
  activity: (
    <>
      <path d="M13 4a2 2 0 1 0-2 2" />
      <path d="M10 21l2-6-3-3 2-4 4 2 2 3" />
      <path d="M7 21l2-5" />
      <path d="M15 21l-3-6" />
    </>
  ),
  nausea: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M9 10h.01" />
      <path d="M15 10h.01" />
      <path d="M9 16c1.5-1 4.5-1 6 0" />
    </>
  ),
  emergency: (
    <>
      <path d="M10 17h4" />
      <path d="M12 15v4" />
      <path d="M4 13h16" />
      <path d="M6 17h12" />
      <path d="M7 9h10l2 4H5l2-4z" />
    </>
  ),
  hospital: (
    <>
      <path d="M4 21V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v16" />
      <path d="M9 21v-6h6v6" />
      <path d="M12 7v5" />
      <path d="M9.5 9.5h5" />
    </>
  ),
  chart: (
    <>
      <path d="M4 19V5" />
      <path d="M4 19h16" />
      <path d="M8 16v-5" />
      <path d="M12 16V8" />
      <path d="M16 16v-9" />
    </>
  ),
  default: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v4l3 3" />
    </>
  ),
};

const styles = {
  wrap: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
};
