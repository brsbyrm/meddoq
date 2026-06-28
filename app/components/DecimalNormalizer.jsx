"use client";

import { useEffect } from "react";

export default function DecimalNormalizer() {
  useEffect(() => {
    function normalizeDecimalInput(e) {
      const el = e.target;

      if (!el || el.tagName !== "INPUT") return;

      const shouldNormalize =
        el.inputMode === "decimal" ||
        el.getAttribute("pattern")?.includes(".,") ||
        el.placeholder?.includes(".") ||
        el.placeholder?.match(/^\d+[,.]\d+/);

      if (!shouldNormalize) return;

      if (el.value.includes(",")) {
        const start = el.selectionStart;
        const end = el.selectionEnd;

        el.value = el.value.replace(/,/g, ".");

        try {
          el.setSelectionRange(start, end);
        } catch {}
      }
    }

    document.addEventListener("input", normalizeDecimalInput, true);

    return () => {
      document.removeEventListener("input", normalizeDecimalInput, true);
    };
  }, []);

  return null;
}
