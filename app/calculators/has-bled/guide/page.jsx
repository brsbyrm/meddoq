export const metadata = {
  title: "HAS-BLED Calculator Guide | Bleeding Risk in AF | Meddoq",
  description: "Clinical guide for HAS-BLED bleeding risk score interpretation in atrial fibrillation.",
  alternates: { canonical: "https://meddoq.com/calculators/has-bled/guide" },
};

export default function Page() {
  return (
    <main style={styles.main}>
      <a href="/calculators/has-bled" style={styles.back}>← Back to Calculator</a>
      <section style={styles.hero}>
        <p style={styles.kicker}>Cardiovascular Clinical Guide</p>
        <h1>HAS-BLED Calculator Guide</h1>
        <p>Bleeding risk assessment guide for anticoagulated patients with atrial fibrillation.</p>
      </section>
      <section style={styles.content}>
        <h2>What is HAS-BLED?</h2>
        <p>HAS-BLED estimates major bleeding risk in patients with atrial fibrillation.</p>
        <h2>Clinical use</h2>
        <p>It helps identify modifiable bleeding risk factors before and during anticoagulation therapy.</p>
        <h2>Interpretation</h2>
        <p>A higher score indicates higher bleeding risk and need for closer review, not automatic avoidance of anticoagulation.</p>
        <h2>Limitations</h2>
        <p>HAS-BLED should be interpreted with renal function, liver disease, medication exposure and clinical context.</p>
        <h2>Related calculators</h2>
        <ul>
          <li><a href="/calculators/cha2ds2-vasc">CHA₂DS₂-VASc Calculator</a></li>
          <li><a href="/calculators/egfr">eGFR Calculator</a></li>
        </ul>
      </section>
    </main>
  );
}

const styles = {
  main:{maxWidth:980,margin:"0 auto",padding:"24px",fontFamily:'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',color:"#0f172a"},
  back:{color:"#2563eb",fontWeight:800,textDecoration:"none"},
  hero:{marginTop:32,background:"linear-gradient(135deg,#ffffff,#eff6ff)",border:"1px solid #dbeafe",borderRadius:28,padding:"clamp(26px,5vw,46px)",boxShadow:"0 24px 70px rgba(15,23,42,0.08)"},
  kicker:{color:"#2563eb",fontWeight:900,textTransform:"uppercase",letterSpacing:"0.12em",fontSize:12},
  content:{marginTop:32,lineHeight:1.75,fontSize:17},
};
