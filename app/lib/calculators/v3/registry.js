import { rutherfordConfig } from "./rutherford";
import { fontaineConfig } from "./fontaine";
import { wifiConfig } from "./wifi";

const registry = {
  "rutherford-classification": rutherfordConfig,
  "fontaine-classification": fontaineConfig,
  "wifi-classification": wifiConfig,
};

export function getCalculatorConfig(slug) {
  return registry[slug] || null;
}

export function getAllCalculatorConfigs() {
  return registry;
}
