export const ceapConfig = {
  slug: "ceap-classification",
  category: "Vascular",
  title: "CEAP Classification Calculator",
  description: "Classify chronic venous disease using CEAP clinical classes.",
  type: "single-choice",
  inputName: "ceap",
  defaultValue: "C0",
  options: [
    { value: "C0", title: "C0", label: "No visible or palpable venous disease", description: "No clinical signs of venous disease.", tone: "green", interpretation: "No visible chronic venous disease is present.", recommendation: "Assess symptoms and risk factors; no CEAP clinical disease is visible." },
    { value: "C1", title: "C1", label: "Telangiectasia or reticular veins", description: "Small superficial venous changes.", tone: "blue", interpretation: "Early visible venous disease without varicose veins or edema.", recommendation: "Consider symptom assessment, reassurance, compression when symptomatic, and duplex if clinically indicated." },
    { value: "C2", title: "C2", label: "Varicose veins", description: "Dilated superficial varicose veins.", tone: "blue", interpretation: "Clinically apparent superficial venous disease.", recommendation: "Assess symptoms and perform venous duplex if intervention is considered." },
    { value: "C3", title: "C3", label: "Edema", description: "Venous edema without skin damage.", tone: "amber", interpretation: "Edema suggests clinically significant venous hypertension or alternative causes.", recommendation: "Evaluate reflux/obstruction and exclude cardiac, renal, lymphatic, or medication-related edema." },
    { value: "C4", title: "C4", label: "Skin changes", description: "Pigmentation, eczema, lipodermatosclerosis, or atrophie blanche.", tone: "amber", interpretation: "Skin changes indicate advanced chronic venous disease.", recommendation: "Use duplex ultrasound, compression, skin care, and consider venous intervention when appropriate." },
    { value: "C5", title: "C5", label: "Healed venous ulcer", description: "Previous venous ulcer now healed.", tone: "red", interpretation: "Healed ulcer indicates severe chronic venous disease with recurrence risk.", recommendation: "Continue compression strategy and evaluate treatable reflux or obstruction." },
    { value: "C6", title: "C6", label: "Active venous ulcer", description: "Open active venous ulcer.", tone: "red", interpretation: "Active ulcer indicates severe chronic venous disease requiring structured ulcer care.", recommendation: "Assess arterial perfusion, venous duplex, compression eligibility, wound care, and intervention options." }
  ],
  reference: {
    clinicalMeaning: "CEAP describes chronic venous disease using Clinical class, Etiology, Anatomy, and Pathophysiology.",
    severity: "Clinical severity ranges from C0 to C6, from no visible disease to active venous ulcer.",
    nextStep: "Combine CEAP clinical class with venous duplex ultrasound to define reflux, obstruction, anatomy, and treatment options.",
    pearls: ["CEAP is descriptive, not a treatment algorithm.", "C5 and C6 indicate healed or active venous ulceration.", "Duplex is needed for anatomic and pathophysiologic classification."],
    pitfalls: ["Writing only C class and ignoring E, A, and P components.", "Assuming every leg ulcer is venous without arterial assessment.", "Not updating CEAP after progression or treatment."],
    faq: [{ question: "Does CEAP replace duplex ultrasound?", answer: "No. CEAP standardizes description, but duplex ultrasound is needed to define reflux, obstruction, and anatomy." }],
    references: ["Eklöf B et al. J Vasc Surg. 2004."],
    related: ["VCSS", "Villalta Score", "Wells DVT", "Padua Score"]
  }
};
