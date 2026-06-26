export const metadata = {
  title: "CHA₂DS₂-VASc Calculator Guide | Stroke Risk in AF | Meddoq",
  description: "Clinical guide for CHA₂DS₂-VASc score interpretation in atrial fibrillation.",
  alternates: { canonical: "https://meddoq.com/calculators/cha2ds2-vasc/guide" },
};

export default function Page() {
  return (
    <main style={styles.main}>
      <a href="/calculators/cha2ds2-vasc" style={styles.back}>← Back to Calculator</a>
      <section style={styles.hero}>
        <p style={styles.kicker}>Cardiovascular Clinical Guide</p>
        <h1>CHA₂DS₂-VASc Calculator Guide</h1>
        <p>Stroke risk assessment guide for patients with atrial fibrillation.</p>
      </section>
      <section style={styles.content}>
        <h2>What is CHA₂DS₂-VASc?</h2>
        <p>CHA₂DS₂-VASc estimates thromboembolic stroke risk in patients with atrial fibrillation.</p>
        <h2>Clinical use</h2>
        <p>It supports anticoagulation decision-making together with bleeding risk, patient preference and guideline recommendations.</p>
        <h2>Interpretation</h2>
        <p>Higher scores indicate higher annual stroke risk. Treatment decisions should be individualized.</p>
        <h2>Limitations</h2>
        <p>The score does not replace clinical judgment and does not fully capture frailty, bleeding risk or complex comorbidity.</p>
        <h2>Related calculators</h2>
        <ul>
          <li><a href="/calculators/has-bled">HAS-BLED Calculator</a></li>
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
