"use client";

import { useState } from "react";
import type { Bullet, Chip, StageDetail, StageItem } from "@/types/agronomy";

const STAGES: StageItem[] = [
  { id: 0, en: "Planting", km: "ការដាំដុះ", period: "Jun–Jul", icon: "🌱" },
  { id: 1, en: "Vegetative", km: "ដំណាក់កាលលូតលាស់", period: "Aug–Oct", icon: "🌿" },
  { id: 2, en: "Flowering", km: "ការចេញផ្កា", period: "Nov–Dec", icon: "🌸" },
  { id: 3, en: "Fruit Dev.", km: "ការលូតលាស់ផ្លែ", period: "Jan–Feb", icon: "🥭" },
  { id: 4, en: "Harvest", km: "ការប្រមូលផល", period: "Mar–May", icon: "🌾" },
];

const STAGE_DETAILS: StageDetail[] = [
  // 0 — Planting Jun–Jul
  {
    bullets: [
      {
        km: "ដាំ: ខែ ៥-៨ (រដូវភ្លៀង) — ត្រូវការសំណើម > ០.៥ ម",
        en: "Plant month 5–8 (rainy season) — soil moisture must reach below 0.5m depth",
      },
      {
        km: "ចម្ងាយ: ដីរាប ៧×៧ ម (~១៨០ ដើម/ហ) — ដីព្រៃ ៨×៨ ម",
        en: "Spacing: flat land 7×7m (~180 trees/ha), uneven land 8×8m with thinning later",
      },
      {
        km: "រណ្តៅ ០.៤×០.៤×០.៤ ម — លាយ NPK 15-15-15 + Urea មុនដាំ ១៥ ថ្ងៃ",
        en: "Pit 0.4×0.4×0.4m — mix NPK 15-15-15 + Urea in topsoil, leave 15 days before planting",
      },
      {
        km: "ស្រោចទឹក ~០.៥ ល/ដើម ភ្លាម — ក្រាលចំបើងគ្របគល់",
        en: "Water immediately ~0.5L/tree after planting, then mulch around the base to retain moisture",
      },
    ],
    chips: [
      { text: "ខែដាំ M23?", label_km: "ខែដាំ", label_en: "Planting season" },
      { text: "ចន្លោះ គម្លាត M23?", label_km: "ចន្លោះ", label_en: "Spacing" },
    ],
  },

  // 1 — Vegetative Aug–Oct
  {
    bullets: [
      {
        km: "ជី ដើមក្មេង (១-៤ ឆ្នាំ): N=៣:P=១:K=១",
        en: "Young trees (age 1–4): NPK ratio N=3:P=1:K=1 to support leaf and branch growth",
      },
      {
        km: "ជី ៣ ដង/ឆ្នាំ: ខែ ៥-៦, ខែ ៧-៨, ខែ ៩",
        en: "Fertilize 3 times/year: months 5–6 (early rain), 7–8 (pre-flower), 9 (before flush)",
      },
      {
        km: "កាត់មែក ២ ដង/ឆ្នាំ — ចំណុចសំខាន់: ខែ ១១-១២",
        en: "Prune twice/year — most critical pruning is right after harvest (month 11–12)",
      },
      {
        km: "ឃ្លាំ: មូសតែ (ខែ ៦-២) — ការខូចខាតដល់ ៣០-៤០%",
        en: "Watch for Tea Mosquito Bug (month 6–Jan/Feb) — most active after rain, up to 40% crop loss",
      },
    ],
    chips: [
      { text: "ជី NPK ដើមក្មេង?", label_km: "ជីដើម", label_en: "Young tree fertilizer" },
      { text: "ពេលណា កាត់មែក M23?", label_km: "កាត់មែក", label_en: "Pruning" },
    ],
  },

  // 2 — Flowering Nov–Dec
  {
    bullets: [
      {
        km: "ថ្ងៃទី ១៥-២០ ប្រថុយបំផុត — ខ្យល់ខ្លាំងខូចខាត ៤០% ផល",
        en: "Day 15–20 most vulnerable — strong wind in this window can destroy up to 40% of total yield",
      },
      {
        km: "KNO3 ១៣-០-៤៦ + ថៃអុរ្យា: ជំរុញផ្កាចេញស្មើ",
        en: "KNO3 13-0-46 mixed with Thiourea promotes uniform flowering timing — follow label for doses",
      },
      {
        km: "ជៀសវាង EC ពេលចេញផ្កា — ប្រើ SC/SL ប្រភេទ",
        en: "Avoid EC-formulation sprays during flowering (can burn flowers) — use SC or SL types instead",
      },
      {
        km: "Copper Hydroxide/Mancozeb ១-១.៥ ក្រ/ល ការពារផ្សិត",
        en: "Copper Hydroxide or Mancozeb 1–1.5g/L sprayed during flowering to prevent fungal disease",
      },
    ],
    chips: [
      { text: "ជីផ្កា KNO3 M23?", label_km: "ជីផ្កា", label_en: "Flowering fertilizer" },
      { text: "ហេតុអ្វីផ្កាធ្លាក់?", label_km: "ផ្កាធ្លាក់", label_en: "Flower drop" },
    ],
  },

  // 3 — Fruit Development Jan–Feb  (pending user book content)
  {
    bullets: [
      {
        km: "ខែ ១១-ខែ ៥: Thrips បង្កគ្រោះដល់ស្លឹក ផ្កា ផ្ទៃផ្លែ",
        en: "Month 11–May: Thrips damage young leaves, flowers, and fruit surface (scarring)",
      },
      {
        km: "ខែ ៣-៤: ឃ្លាំ ដង្កូវវ — ប្រើ Abamectin/Emamectin",
        en: "Month 3–4: watch for fruit borers and scale insects — treat with Abamectin/Emamectin",
      },
      {
        km: "ខែ ១ ឡើង: ឃ្លាំ ចែស — ស្រមោចច្រើន → ចែសច្រើន",
        en: "Month 1 onward: heavy ant activity on a tree often signals mealybug infestation",
      },
      {
        km: "សំណើមខ្ពស់: ហានិភ័យ Anthracnose/ផ្សិត — ស្ងួតក្រោយបាញ់",
        en: "High moisture raises anthracnose and mildew risk — spray in morning so leaves dry fast",
      },
    ],
    chips: [
      { text: "ដង្កូវ ចោះ M23?", label_km: "ដង្កូវវ", label_en: "Fruit borer" },
      { text: "Thrips M23?", label_km: "Thrips", label_en: "Thrips" },
    ],
  },

  // 4 — Harvest Mar–May
  {
    bullets: [
      {
        km: "ប្រមូលផល ខែ ១-៥ — M23 ចេញផ្កា ២-៣ ជំនាន់",
        en: "Harvest spans month 1–5 because M23 flowers in 2–3 flushes with different ripening times",
      },
      {
        km: "ប្រមូលក្នុង ២-៣ ថ្ងៃ — កុំទុកលើស ៤-៥ ថ្ងៃ ជៀសវាងថ្ងៃភ្លៀង",
        en: "Collect fallen nuts within 2–3 days, never more than 4–5 days; avoid collecting on rainy days",
      },
      {
        km: "ហាល ២-៣ ថ្ងៃ — ស្ដុក: សំណើម < ១១%",
        en: "Sun-dry 2–3 days before storage; nut moisture must be below 11% for safe storage",
      },
      {
        km: "គ្រាប់ > ៤-៥ ថ្ងៃ នៅដី: ខូចគុណភាព — ប្រយ័ត្នថ្ងៃភ្លៀង",
        en: "Nuts left on the ground 4–5+ days start losing quality; rain accelerates spoilage",
      },
    ],
    chips: [
      { text: "ប្រមូលផល M23?", label_km: "ប្រមូលផល", label_en: "Harvest timing" },
      { text: "ស្ដុក M23?", label_km: "ស្ដុក M23", label_en: "Storage" },
    ],
  },
];

interface LifecycleTrackerProps {
  activeStage?: number;
  dayOf?: number;
  totalDays?: number;
  onAskQuestion?: (text: string) => void;
}

export default function LifecycleTracker({
  activeStage = 2,
  dayOf = 118,
  totalDays = 150,
  onAskQuestion,
}: LifecycleTrackerProps) {
  const [selectedStage, setSelectedStage] = useState<number | null>(null);

  const detail = selectedStage !== null ? STAGE_DETAILS[selectedStage] : null;
  const stage = selectedStage !== null ? STAGES[selectedStage] : null;

  function handleChip(text: string) {
    setSelectedStage(null);
    onAskQuestion?.(text);
  }

  return (
    <>
      <div
        style={{ backgroundColor: "var(--card)", borderBottom: "1px solid #2e2e2e" }}
        className="px-4 pt-3 pb-4"
      >
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: "var(--muted)" }}>
              M23 Life Cycle
            </span>
            <span className="text-xs ml-1" style={{ color: "var(--muted)" }}>
              · វដ្ដជីវិតដើមស្វាយចន្ទី
            </span>
          </div>
          <span className="text-xs font-semibold" style={{ color: "var(--accent-bright)" }}>
            Day {dayOf} of ~{totalDays}
          </span>
        </div>

        <div className="flex items-start gap-0 overflow-x-auto pb-1 scrollbar-hide">
          {STAGES.map((s, i) => {
            const isSelected = s.id === selectedStage;
            return (
              <div key={s.id} className="flex items-center shrink-0">
                <div className="flex flex-col items-center w-16">
                  <button
                    onClick={() => setSelectedStage(s.id)}
                    className="w-12 h-12 rounded-full flex items-center justify-center text-xl border-2 transition-all active:scale-95"
                    style={{
                      backgroundColor: "#1a3a2e",
                      borderColor: "#2d6a4f",
                      boxShadow: isSelected
                        ? "0 0 0 2px var(--card), 0 0 0 5px var(--accent-bright)"
                        : "none",
                    }}
                    aria-label={`${s.en} stage details`}
                  >
                    {s.icon}
                  </button>
                  <div
                    className="text-xs font-semibold mt-1 text-center leading-tight"
                    style={{ color: isSelected ? "var(--accent-bright)" : "var(--text)" }}
                  >
                    {s.en}
                  </div>
                  <div
                    className="text-xs text-center leading-tight"
                    style={{ color: "var(--muted)", fontSize: "10px" }}
                  >
                    {s.km}
                  </div>
                  <div
                    className="text-xs text-center mt-0.5"
                    style={{ color: "var(--muted)", fontSize: "10px" }}
                  >
                    {s.period}
                  </div>
                </div>
                {i < STAGES.length - 1 && (
                  <div
                    className="w-4 h-0.5 shrink-0 mt-7"
                    style={{
                      backgroundColor: "#2d6a4f",
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Backdrop */}
      {selectedStage !== null && (
        <div
          className="fixed inset-0 bg-black/60 z-20"
          onClick={() => setSelectedStage(null)}
        />
      )}

      {/* Bottom sheet */}
      {selectedStage !== null && stage && detail && (
        <div
          className="fixed inset-x-0 bottom-0 z-30 rounded-t-2xl max-w-md mx-auto"
          style={{ backgroundColor: "var(--card)", borderTop: "1px solid #2e2e2e" }}
        >
          {/* Sheet header */}
          <div className="flex items-center justify-between px-4 pt-4 pb-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{stage.icon}</span>
              <div>
                <div className="font-bold text-sm" style={{ color: "var(--text)" }}>
                  {stage.en} · {stage.km}
                </div>
                <div className="text-xs" style={{ color: "var(--muted)" }}>
                  {stage.period}
                </div>
              </div>
            </div>
            <button
              onClick={() => setSelectedStage(null)}
              className="w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold"
              style={{ backgroundColor: "#2e2e2e", color: "var(--muted)" }}
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          {/* Bullets — km primary, en subtitle */}
          <div className="px-4 pb-3 space-y-3">
            {detail.bullets.map((b, i) => (
              <div key={i} className="flex items-start gap-3">
                <div
                  className="w-1.5 h-1.5 rounded-full shrink-0 mt-2"
                  style={{ backgroundColor: "var(--accent-bright)" }}
                />
                <div>
                  <div className="text-sm leading-snug" style={{ color: "var(--text)" }}>
                    {b.km}
                  </div>
                  <div className="text-xs mt-0.5 leading-snug" style={{ color: "var(--muted)" }}>
                    {b.en}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Chip section */}
          <div
            className="px-4 pt-3 pb-8 border-t"
            style={{ borderColor: "#2e2e2e" }}
          >
            <div className="text-xs mb-2.5" style={{ color: "var(--muted)" }}>
              Ask about this stage · សួរ
            </div>
            <div className="flex flex-wrap gap-2">
              {detail.chips.map((chip, i) => (
                <button
                  key={i}
                  onClick={() => handleChip(chip.text)}
                  className="flex flex-col items-start px-3 py-2 rounded-xl transition-opacity active:opacity-70"
                  style={{
                    backgroundColor: "var(--accent-fill)",
                    border: "1px solid var(--accent-bright)33",
                  }}
                >
                  <span className="text-xs font-semibold" style={{ color: "var(--accent-bright)" }}>
                    {chip.label_km}
                  </span>
                  <span className="text-xs" style={{ color: "var(--muted)" }}>
                    {chip.label_en}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
