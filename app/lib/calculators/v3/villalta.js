export const villaltaConfig = {
  slug: "villalta-score",
  category: "Vascular",
  title: "Villalta Score Calculator",
  description: "Assess post-thrombotic syndrome severity after deep vein thrombosis.",
  type: "select-score",
  resultMode: "villalta",
  defaultValues: { pain:0, cramps:0, heaviness:0, paresthesia:0, pruritus:0, edema:0, induration:0, hyperpigmentation:0, redness:0, ectasia:0, calfPain:0, ulcer:0 },
  inputs: [
    { key:"pain", label:"Pain", options:["0 - Absent","1 - Mild","2 - Moderate","3 - Severe"] },
    { key:"cramps", label:"Cramps", options:["0 - Absent","1 - Mild","2 - Moderate","3 - Severe"] },
    { key:"heaviness", label:"Heaviness", options:["0 - Absent","1 - Mild","2 - Moderate","3 - Severe"] },
    { key:"paresthesia", label:"Paresthesia", options:["0 - Absent","1 - Mild","2 - Moderate","3 - Severe"] },
    { key:"pruritus", label:"Pruritus", options:["0 - Absent","1 - Mild","2 - Moderate","3 - Severe"] },
    { key:"edema", label:"Pretibial edema", options:["0 - Absent","1 - Mild","2 - Moderate","3 - Severe"] },
    { key:"induration", label:"Skin induration", options:["0 - Absent","1 - Mild","2 - Moderate","3 - Severe"] },
    { key:"hyperpigmentation", label:"Hyperpigmentation", options:["0 - Absent","1 - Mild","2 - Moderate","3 - Severe"] },
    { key:"redness", label:"Redness", options:["0 - Absent","1 - Mild","2 - Moderate","3 - Severe"] },
    { key:"ectasia", label:"Venous ectasia", options:["0 - Absent","1 - Mild","2 - Moderate","3 - Severe"] },
    { key:"calfPain", label:"Pain on calf compression", options:["0 - Absent","1 - Mild","2 - Moderate","3 - Severe"] },
    { key:"ulcer", label:"Venous ulcer", options:["0 - Absent","1 - Present"] }
  ],
  reference: {
    clinicalMeaning: "Villalta score assesses post-thrombotic syndrome after DVT using symptoms and clinical signs.",
    severity: "Scores 5–9 suggest mild PTS, 10–14 moderate PTS, and ≥15 or ulceration severe PTS.",
    nextStep: "Assess venous duplex findings, recurrence, compression strategy, ulcer status, and possible iliocaval obstruction.",
    pearls: ["Use in the chronic phase after DVT.", "Ulceration indicates severe PTS.", "Symptoms and signs both matter."],
    pitfalls: ["Scoring acute DVT as chronic PTS.", "Ignoring recurrent DVT or iliocaval obstruction.", "Confusing venous disease with lymphedema or heart failure."],
    faq: [{ question: "When is Villalta score used?", answer: "It is used after DVT to evaluate chronic post-thrombotic syndrome, not to diagnose acute DVT." }],
    references: ["Villalta S et al. Haemostasis. 1994."],
    related: ["VCSS", "CEAP Classification", "Wells DVT", "Padua Score"]
  }
};
