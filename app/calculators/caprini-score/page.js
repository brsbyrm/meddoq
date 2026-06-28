"use client";

import { useMemo, useState } from "react";
import CalculatorShell from "../../components/calculators/CalculatorShell";
import CalculatorPanel from "../../components/calculators/CalculatorPanel";
import CalculatorResult from "../../components/calculators/CalculatorResult";
import CalculatorReferencePage from "../../components/calculators/CalculatorReferencePage";

const groups = [
  {
    title: "1-point risk factors",
    items: [
      { id: "age41", label: "Age 41–60 years", points: 1 },
      { id: "minorSurgery", label: "Minor surgery planned", points: 1 },
      { id: "bmi25", label: "BMI >25 kg/m²", points: 1 },
      { id: "swollenLegs", label: "Swollen legs", points: 1 },
      { id: "varicoseVeins", label: "Varicose veins", points: 1 },
      { id: "pregnancy", label: "Pregnancy or postpartum", points: 1 },
      { id: "hormones", label: "Oral contraceptives or hormone therapy", points: 1 },
      { id: "sepsis", label: "Sepsis within 1 month", points: 1 },
      { id: "seriousLungDisease", label: "Serious lung disease within 1 month", points: 1 },
      { id: "abnormalPulmonaryFunction", label: "Abnormal pulmonary function", points: 1 },
      { id: "acuteMi", label: "Acute myocardial infarction", points: 1 },
      { id: "heartFailure", label: "Congestive heart failure within 1 month", points: 1 },
      { id: "ibd", label: "Inflammatory bowel disease history", points: 1 },
      { id: "bedRest", label: "Medical patient on bed rest", points: 1 },
    ],
  },
  {
    title: "2-point risk factors",
    items: [
      { id: "age61", label: "Age 61–74 years", points: 2 },
      { id: "arthroscopic", label: "Arthroscopic surgery", points: 2 },
      { id: "majorOpen", label: "Major open surgery >45 minutes", points: 2 },
      { id: "laparoscopic", label: "Laparoscopic surgery >45 minutes", points: 2 },
      { id: "malignancy", label: "Malignancy", points: 2 },
      { id: "bedConfined", label: "Confined to bed >72 hours", points: 2 },
      { id: "immobilizingCast", label: "Immobilizing plaster cast", points: 2 },
      { id: "centralVenousAccess", label: "Central venous access", points: 2 },
    ],
  },
  {
    title: "3-point risk factors",
    items: [
      { id: "age75", label: "Age ≥75 years", points: 3 },
      { id: "priorVte", label: "History of VTE", points: 3 },
      { id: "familyVte", label: "Family history of VTE", points: 3 },
      { id: "factorVLeiden", label: "Factor V Leiden", points: 3 },
      { id: "prothrombinMutation", label: "Prothrombin 20210A mutation", points: 3 },
      { id: "lupusAnticoagulant", label: "Lupus anticoagulant", points: 3 },
      { id: "anticardiolipin", label: "Anticardiolipin antibodies", points: 3 },
      { id: "elevatedHomocysteine", label: "Elevated serum homocysteine", points: 3 },
      { id: "hit", label: "Heparin-induced thrombocytopenia", points: 3 },
      { id: "otherThrombophilia", label: "Other congenital or acquired thrombophilia", points: 3 },
    ],
  },
  {
    title: "5-point risk factors",
    items: [
      { id: "stroke", label: "Stroke within 1 month", points: 5 },
      { id: "electiveArthroplasty", label: "Elective hip or knee arthroplasty", points: 5 },
      { id: "hipPelvisLegFracture", label: "Hip, pelvis, or leg fracture", points: 5 },
      { id: "acuteSpinalCordInjury", label: "Acute spinal cord injury within 1 month", points: 5 },
      { id: "majorTrauma", label: "Multiple trauma", points: 5 },
    ],
  },
];

const allItems = groups.flatMap((group) => group.items);

const content = {
  interpretation: {
    clinicalMeaning:
      "The Caprini score estimates venous thromboembolism risk in surgical patients using cumulative clinical risk factors.",
    severity:
      "Scores 0–1 are commonly considered low risk, 2 moderate risk, 3–4 high risk, and 5 or more very high risk.",
    nextStep:
      "Use with procedure type, bleeding risk, mobility, renal function, anesthesia plan, institutional VTE protocol, and contraindications to pharmacologic prophylaxis.",
  },
  notes: {
    pearls: [
      "Caprini is cumulative; multiple risk factors can substantially increase total VTE risk.",
      "History of VTE or thrombophilia meaningfully increases risk.",
      "Bleeding risk must be assessed before pharmacologic prophylaxis.",
    ],
    pitfalls: [
      "Using the score without considering procedure-specific VTE and bleeding risk.",
      "Failing to reassess when immobility, infection, cancer, or complications evolve.",
      "Treating the score as a replacement for local perioperative prophylaxis protocols.",
    ],
  },
  faq: [
    {
      question: "What Caprini score is very high risk?",
      answer:
        "A score of 5 or more is often considered very high risk in common Caprini-based perioperative stratification.",
    },
    {
      question: "Does Caprini determine prophylaxis alone?",
      answer:
        "No. Prophylaxis decisions should also consider bleeding risk, surgery type, mobility, renal function, and local protocols.",
    },
  ],
  references: [
    "Caprini JA. Dis Mon. 2005.",
    "Gould MK et al. Chest. 2012.",
    "Cronin M et al. J Am Coll Surg. 2019.",
  ],
  related: ["Padua Prediction Score", "IMPROVE VTE Risk Score", "IMPROVE Bleeding Risk", "Wells DVT"],
};

export default function CapriniScorePage() {
  const [checked, setChecked] = useState({});

  const score = useMemo(() => {
    return allItems.reduce((sum, item) => sum + (checked[item.id] ? item.points : 0), 0);
  }, [checked]);

  const risk = useMemo(() => {
    if (score >= 5) {
      return {
        tone: "red",
        label: "Very high VTE risk",
        interpretation:
          "Caprini score ≥5 suggests very high perioperative venous thromboembolism risk.",
        recommendation:
          "Assess bleeding risk and consider combined mechanical and pharmacologic prophylaxis according to institutional and guideline-based protocols.",
      };
    }

    if (score >= 3) {
      return {
        tone: "amber",
        label: "High VTE risk",
        interpretation:
          "Caprini score 3–4 suggests high perioperative venous thromboembolism risk.",
        recommendation:
          "Consider VTE prophylaxis strategy according to surgery type, bleeding risk, mobility, and local protocol.",
      };
    }

    if (score === 2) {
      return {
        tone: "blue",
        label: "Moderate VTE risk",
        interpretation:
          "Caprini score 2 suggests moderate perioperative VTE risk.",
        recommendation:
          "Consider mechanical or pharmacologic prophylaxis based on bleeding risk and institutional pathway.",
      };
    }

    return {
      tone: "green",
      label: "Low VTE risk",
      interpretation:
        "Caprini score 0–1 suggests low measured perioperative VTE risk.",
      recommendation:
        "Early ambulation and routine perioperative measures may be sufficient in many patients, but local protocols should be followed.",
    };
  }, [score]);

  function toggle(id) {
    setChecked((previous) => {
      const next = { ...previous, [id]: !previous[id] };

      if (id === "age41" && next.age41) {
        next.age61 = false;
        next.age75 = false;
      }

      if (id === "age61" && next.age61) {
        next.age41 = false;
        next.age75 = false;
      }

      if (id === "age75" && next.age75) {
        next.age41 = false;
        next.age61 = false;
      }

      return next;
    });
  }

  return (
    <CalculatorShell
      category="Perioperative"
      title="Caprini Score Calculator"
      description="Perioperative venous thromboembolism risk assessment using cumulative Caprini risk factors."
    >
      <CalculatorPanel>
        <div style={styles.groups}>
          {groups.map((group) => (
            <section key={group.title} style={styles.group}>
              <h3 style={styles.groupTitle}>{group.title}</h3>
              <div style={styles.grid}>
                {group.items.map((item) => (
                  <label key={item.id} style={styles.option}>
                    <input
                      type="checkbox"
                      checked={Boolean(checked[item.id])}
                      onChange={() => toggle(item.id)}
                    />
                    <span>{item.label}</span>
                    <strong>+{item.points}</strong>
                  </label>
                ))}
              </div>
            </section>
          ))}
        </div>

        <CalculatorResult
          title="Caprini Score"
          value={score}
          unit={risk.label}
          tone={risk.tone}
          interpretation={risk.interpretation}
          recommendation={risk.recommendation}
        />
      </CalculatorPanel>

      <CalculatorReferencePage content={content} />
    </CalculatorShell>
  );
}

const styles = {
  groups: { display: "grid", gap: 18 },
  group: {
    display: "grid",
    gap: 12,
  },
  groupTitle: {
    margin: 0,
    color: "#0f172a",
    fontSize: 18,
    letterSpacing: "-0.02em",
  },
  grid: { display: "grid", gap: 12 },
  option: {
    display: "grid",
    gridTemplateColumns: "24px 1fr auto",
    gap: 12,
    alignItems: "center",
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
    borderRadius: 16,
    padding: 14,
    cursor: "pointer",
    color: "#0f172a",
    fontWeight: 750,
  },
};
