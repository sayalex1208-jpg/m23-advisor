"use client";

import type { Language } from "@/types/agronomy";

interface LanguageToggleProps {
  lang: Language;
  onToggle: () => void;
  className?: string;
}

export default function LanguageToggle({ lang, onToggle, className = "" }: LanguageToggleProps) {
  return (
    <button
      onClick={onToggle}
      type="button"
      style={{
        backgroundColor: "#1a1a1a",
        border: "1px solid var(--border, #2a2a2a)",
      }}
      className={`flex items-center rounded-full overflow-hidden text-xs font-semibold transition ${className}`}
      aria-label="Toggle language between Khmer and English"
    >
      <span
        className="px-3 py-1.5 transition-colors"
        style={{
          backgroundColor: lang === "km" ? "rgba(39,166,69,0.2)" : "transparent",
          color: lang === "km" ? "var(--accent, #27a645)" : "var(--muted, #999)",
          fontWeight: lang === "km" ? 700 : 400,
        }}
      >
        ខ្មែរ
      </span>
      <span
        className="px-3 py-1.5 transition-colors"
        style={{
          backgroundColor: lang === "en" ? "rgba(39,166,69,0.2)" : "transparent",
          color: lang === "en" ? "var(--accent, #27a645)" : "var(--muted, #999)",
          fontWeight: lang === "en" ? 700 : 400,
        }}
      >
        EN
      </span>
    </button>
  );
}
