"use client";

import { useMemo, useState } from "react";
import CalculatorShell from "@/components/calculators/CalculatorShell";
import CalculatorPanel from "@/components/calculators/CalculatorPanel";
import CalculatorResult from "@/components/calculators/CalculatorResult";
import NumericInput from "@/components/calculators/NumericInput";
import CalculatorReferencePage from "@/components/calculators/CalculatorReferencePage";

function classifyBMI(bmi) {
  if (bmi < 18.5) return { label: "Underweight", tone: "warning", detail: "BMI is below the normal adult reference range." };
  if (bmi < 25) return { label: "Normal weight", tone: "success", detail: "BMI is within the normal adult reference range." };
  if (bmi < 30) return { label: "Overweight", tone: "warning", detail: "BMI is above the normal adult reference range." };
  if (bmi < 35) return { label: "Class I obesity", tone: "danger", detail: "BMI is in obesity class I." };
  if (bmi < 40) return { label: "Class II obesity", tone: "danger", detail: "BMI is in obesity class II." };
  return { label: "Class III obesity", tone: "danger", detail: "BMI is in obesity class III." };
}

export default function BodyMassIndexCalculatorClient() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");

  const result = useMemo(() => {
    const h = Number(height);
    const w = Number(weight);

    if (!h || !w || h <= 0 || w <= 0) return null;

    const heightM = h / 100;
    const bmi = w / (heightM * heightM);
    const rounded = Math.round(bmi * 10) / 10;
    const interpretation = classifyBMI(rounded);

    return {
      value: rounded,
      interpretation,
    };
  }, [height, weight]);

  return (
    <CalculatorShell
      title="Body Mass Index Calculator"
      subtitle="Calculate adult BMI using height and weight."
      category="General Medicine"
      heroMetric={result ? String(result.value) : "BMI"}
      heroMetricLabel={result ? result.interpretation.label : "kg/m²"}
    >
      <CalculatorPanel title="Patient parameters">
        <NumericInput
          label="Height"
          value={height}
          onChange={setHeight}
          unit="cm"
          placeholder="170"
          min={1}
        />

        <NumericInput
          label="Weight"
          value={weight}
          onChange={setWeight}
          unit="kg"
          placeholder="70"
          min={1}
        />
      </CalculatorPanel>

      <CalculatorResult
        title="BMI result"
        value={result ? result.value : "—"}
        unit="kg/m²"
        interpretation={result ? result.interpretation.label : "Enter height and weight to calculate BMI."}
        tone={result ? result.interpretation.tone : "neutral"}
      >
        {result ? (
          <p>{result.interpretation.detail}</p>
        ) : (
          <p>Body mass index is calculated as weight in kilograms divided by height in metres squared.</p>
        )}
      </CalculatorResult>

      <CalculatorReferencePage
        title="Clinical interpretation"
        sections={[
          {
            heading: "Formula",
            content: "BMI = weight / height², using kilograms and metres.",
          },
          {
            heading: "Adult BMI categories",
            content:
              "Common adult categories are underweight <18.5, normal 18.5–24.9, overweight 25.0–29.9, class I obesity 30.0–34.9, class II obesity 35.0–39.9, and class III obesity ≥40 kg/m².",
          },
          {
            heading: "Clinical note",
            content:
              "BMI is a population-level screening tool. It does not directly measure adiposity, body composition, sarcopenia, oedema, pregnancy status, or cardiometabolic risk.",
          },
        ]}
        references={[
          "World Health Organization. Obesity: preventing and managing the global epidemic. WHO Technical Report Series 894.",
          "CDC. About Adult BMI.",
        ]}
      />
    </CalculatorShell>
  );
}
