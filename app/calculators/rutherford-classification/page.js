"use client";

import { useMemo, useState } from "react";
import CalculatorShell from "../../components/calculators/CalculatorShell";
import CalculatorPanel from "../../components/calculators/CalculatorPanel";
import CalculatorResult from "../../components/calculators/CalculatorResult";
import CalculatorReferencePage from "../../components/calculators/CalculatorReferencePage";
import { getCalculatorContent } from "../../lib/calculators/calculatorContent";

const categories = [
  {
    value: "0",
    title: "Category 0",
    label: "Asymptomatic",
    description: "No clinically apparent limb ischemia symptoms.",
    interpretation:
      "Asymptomatic PAD may still carry systemic cardiovascular risk and should be interpreted with ABI, pulse findings, and risk-factor profile.",
    recommendation:
      "Optimize cardiovascular risk reduction and consider ABI or vascular follow-up when PAD is suspected or objectively documented.",
    tone: "green",
  },
  {
    value: "1",
    title: "Category 1",
    label: "Mild claudication",
    description: "Claudication with mild limitation of walking performance.",
    interpretation:
      "Mild claudication usually indicates exertional ischemic symptoms with preserved daily function.",
    recommendation:
      "Use guideline-directed medical therapy, supervised or structured exercise therapy, smoking cessation, and objective perfusion assessment.",
    tone: "blue",
  },
  {
    value: "2",
    title: "Category 2",
    label: "Moderate claudication",
    description: "Claudication with clear functional limitation.",
    interpretation:
      "Moderate claudication affects routine activity and should prompt structured assessment of walking limitation, risk factors, and anatomy if symptoms persist.",
    recommendation:
      "Assess ABI or toe pressure, optimize medical therapy, start exercise therapy, and consider duplex/CTA/MRA if revascularization is being discussed.",
    tone: "amber",
  },
  {
    value: "3",
    title: "Category 3",
    label: "Severe claudication",
    description: "Marked limitation from short-distance claudication.",
    interpretation:
      "Severe claudication is lifestyle-limiting PAD and may justify anatomical imaging when symptoms remain unacceptable despite optimal therapy.",
    recommendation:
      "Confirm hemodynamic significance, optimize medical therapy, and evaluate revascularization feasibility when symptoms remain lifestyle-limiting.",
    tone: "amber",
  },
  {
    value: "4",
    title: "Category 4",
    label: "Ischemic rest pain",
    description: "Chronic limb-threatening ischemia presenting with rest pain.",
    interpretation:
      "Rest pain suggests chronic limb-threatening ischemia and requires urgent vascular assessment, especially when associated with low toe pressure or tissue compromise.",
    recommendation:
      "Obtain objective perfusion testing and urgent vascular imaging to assess revascularization options.",
    tone: "red",
  },
  {
    value: "5",
    title: "Category 5",
    label: "Minor tissue loss",
    description: "Non-healing ulcer or focal gangrene with limb salvage potential.",
    interpretation:
      "Minor tissue loss indicates chronic limb-threatening ischemia until proven otherwise and requires combined wound, ischemia, and infection assessment.",
    recommendation:
      "Assess WIfI stage, toe pressure, infection, wound depth, and revascularization feasibility urgently.",
    tone: "red",
  },
  {
    value: "6",
    title: "Category 6",
    label: "Major tissue loss",
    description: "Extensive gangrene or major tissue loss threatening limb viability.",
    interpretation:
      "Major tissue loss indicates advanced limb threat with high amputation risk and requires urgent multidisciplinary limb-salvage or amputation-level planning.",
    recommendation:
      "Arrange urgent vascular evaluation, infection control, imaging, wound planning, and shared decision-making regarding limb salvage versus major amputation.",
    tone: "red",
  },
];

export default function RutherfordClassificationPage() {
  const [selected, setSelected] = useState("0");
  const content = getCalculatorContent("rutherford-classification");

  const result = useMemo(
    () => categories.find((item) => item.value === selected) || categories[0],
    [selected]
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalWebPage",
            name: "Rutherford Classification Calculator",
            description:
              "Rutherford classification calculator for peripheral artery disease and chronic limb ischemia severity.",
            publisher: {
              "@type": "Organization",
              name: "Meddoq",
              url: "https://meddoq.com",
            },
            medicalAudience: {
              "@type": "MedicalAudience",
              audienceType: "Healthcare professionals",
            },
          }),
        }}
      />

      <CalculatorShell
        category={content.category}
        title="Rutherford Classification Calculator"
        description={content.description}
      >
        <CalculatorPanel>
          <div style={styles.grid}>
            {categories.map((item) => (
              <label
                key={item.value}
                style={{
                  ...styles.option,
                  ...(selected === item.value ? styles.optionActive : {}),
                }}
              >
                <input
                  type="radio"
                  name="rutherford"
                  value={item.value}
                  checked={selected === item.value}
                  onChange={(event) => setSelected(event.target.value)}
                />
                <div>
                  <strong style={styles.optionTitle}>
                    {item.title} — {item.label}
                  </strong>
                  <span style={styles.optionText}>{item.description}</span>
                </div>
              </label>
            ))}
          </div>

          <CalculatorResult
            title="Selected Rutherford Category"
            value={result.title}
            unit={result.label}
            interpretation={result.interpretation}
            recommendation={result.recommendation}
            tone={result.tone}
          />
        </CalculatorPanel>

        <CalculatorReferencePage content={content} />
      </CalculatorShell>
    </>
  );
}

const styles = {
  grid: {
    display: "grid",
    gap: 12,
  },
  option: {
    display: "grid",
    gridTemplateColumns: "24px 1fr",
    gap: 12,
    alignItems: "center",
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
    borderRadius: 18,
    padding: 15,
    cursor: "pointer",
  },
  optionActive: {
    background: "#eff6ff",
    borderColor: "#93c5fd",
    boxShadow: "0 12px 28px rgba(37,99,235,0.12)",
  },
  optionTitle: {
    display: "block",
    color: "#0f172a",
    fontSize: 15,
    marginBottom: 4,
  },
  optionText: {
    display: "block",
    color: "#475569",
    fontSize: 14,
    lineHeight: 1.55,
  },
};
