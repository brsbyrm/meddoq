"use client";

export default function NumericInput({ value, onChange, placeholder = "", style = {}, ...props }) {
  function normalize(raw) {
    return String(raw)
      .replace(/٫/g, ".")
      .replace(/،/g, ".")
      .replace(/,/g, ".")
      .replace(/[^0-9.\-]/g, "");
  }

  return (
    <input
      {...props}
      type="text"
      inputMode="decimal"
      pattern="[0-9]*[.,]?[0-9]*"
      value={value}
      placeholder={placeholder}
      style={style}
      onChange={(e) => onChange(normalize(e.target.value))}
      onInput={(e) => {
        const next = normalize(e.currentTarget.value);
        if (e.currentTarget.value !== next) e.currentTarget.value = next;
      }}
    />
  );
}

export function toNumber(value) {
  const parsed = parseFloat(
    String(value ?? "")
      .replace(/٫/g, ".")
      .replace(/،/g, ".")
      .replace(/,/g, ".")
  );
  return Number.isFinite(parsed) ? parsed : 0;
}
