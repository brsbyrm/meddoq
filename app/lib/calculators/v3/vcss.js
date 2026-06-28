export const vcssConfig = {
  slug: "venous-clinical-severity-score",
  category: "Vascular",
  title: "Venous Clinical Severity Score Calculator",
  description: "Estimate chronic venous disease severity using VCSS domains.",
  type: "select-score",
  resultMode: "sum-score",
  defaultValues: { pain:0, varicosities:0, edema:0, pigmentation:0, inflammation:0, induration:0, ulcers:0, duration:0, size:0, compression:0 },
  inputs: [
    { key:"pain", label:"Pain", options:["0 - None","1 - Occasional","2 - Daily moderate","3 - Daily severe"] },
    { key:"varicosities", label:"Varicose veins", options:["0 - None","1 - Few","2 - Multiple","3 - Extensive"] },
    { key:"edema", label:"Venous edema", options:["0 - None","1 - Foot/ankle","2 - Below knee","3 - Above knee"] },
    { key:"pigmentation", label:"Pigmentation", options:["0 - None","1 - Limited","2 - Diffuse lower third","3 - Wider distribution"] },
    { key:"inflammation", label:"Inflammation", options:["0 - None","1 - Limited","2 - Moderate","3 - Severe"] },
    { key:"induration", label:"Induration", options:["0 - None","1 - Limited","2 - Moderate","3 - Severe"] },
    { key:"ulcers", label:"Active ulcer number", options:["0 - None","1 - One","2 - Two","3 - Three or more"] },
    { key:"duration", label:"Ulcer duration", options:["0 - None","1 - <3 months","2 - 3–12 months","3 - >12 months"] },
    { key:"size", label:"Ulcer size", options:["0 - None","1 - <2 cm","2 - 2–6 cm","3 - >6 cm"] },
    { key:"compression", label:"Compression therapy", options:["0 - Full compliance","1 - Intermittent","2 - Most days not used","3 - Not used"] }
  ],
  reference: {
    clinicalMeaning: "VCSS quantifies chronic venous disease severity and is useful for baseline assessment and follow-up.",
    severity: "Higher scores reflect greater pain, edema, skin damage, ulcer burden, and compression-related disease burden.",
    nextStep: "Interpret with CEAP class, venous duplex, ulcer status, arterial perfusion, and compression tolerance.",
    pearls: ["VCSS is useful for follow-up after venous intervention.", "Ulcer duration and size strongly affect severity.", "Compression use should be documented accurately."],
    pitfalls: ["Using VCSS instead of duplex ultrasound.", "Ignoring iliac or deep venous obstruction.", "Scoring skin changes without checking arterial disease."],
    faq: [{ question: "What does a high VCSS mean?", answer: "A high VCSS indicates greater chronic venous disease burden and need for structured venous assessment and management." }],
    references: ["Rutherford RB et al. J Vasc Surg. 2000."],
    related: ["CEAP Classification", "Villalta Score", "Wells DVT", "Padua Score"]
  }
};
