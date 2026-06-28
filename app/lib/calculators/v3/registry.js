import { rutherfordConfig } from "./rutherford";
import { fontaineConfig } from "./fontaine";
import { wifiConfig } from "./wifi";
import { ceapConfig } from "./ceap";
import { vcssConfig } from "./vcss";
import { villaltaConfig } from "./villalta";

const registry = {
  "rutherford-classification": rutherfordConfig,
  "fontaine-classification": fontaineConfig,
  "wifi-classification": wifiConfig,
  "ceap-classification": ceapConfig,
  "venous-clinical-severity-score": vcssConfig,
  "villalta-score": villaltaConfig,
};

export function getCalculatorConfig(slug) {
  return registry[slug] || null;
}

export function getAllCalculatorConfigs() {
  return registry;
}
