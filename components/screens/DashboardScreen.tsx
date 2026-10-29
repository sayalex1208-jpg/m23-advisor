"use client";

import { useState } from "react";
import BrandLogo from "@/components/common/BrandLogo";
import WeatherWidget from "@/components/WeatherWidget";
import MarketPriceCard from "@/components/MarketPriceCard";
import PestAlertCard from "@/components/PestAlertCard";
import BuyerDirectoryCard from "@/components/BuyerDirectoryCard";
import CashewHandbookReader from "@/components/CashewHandbookReader";
import type { Language } from "@/types/agronomy";
import { calculateM23Lifecycle, M23_LIFECYCLE_STAGES } from "@/lib/lifecycle";
import { formatLocation } from "@/lib/location";
import { calculateYieldAndProfit } from "@/lib/calculator";
import type { PreferencesData } from "./SettingsScreen";

export interface FieldDataModel {
  area: string;
  trees: string;
  soilType: string;
  waterSchedule: string;
  fieldName?: string;
  cycleStartDate?: string;
}

export type DashboardSection = "farm" | "market" | "health" | "handbook";

interface DashboardScreenProps {
  lang: Language;
  fieldData: FieldDataModel;
  location?: string;
  preferences?: PreferencesData;
}

export default function DashboardScreen({
  lang,
  fieldData,
  location,
  preferences,
}: DashboardScreenProps) {
  const [activeSection, setActiveSection] = useState<DashboardSection>("farm");

  // Dynamically calculate lifecycle metrics from cycle start date & current date
  const lifecycle = calculateM23Lifecycle(fieldData.cycleStartDate);
  const {
    dayOf,
    totalDays,
    progressPercent,
    currentStage,
    stageIndex,
    daysToHarvest,
  } = lifecycle;

  // Calculations based on shared field data
  const parsedArea = parseFloat(fieldData.area) || 0.6;
  const parsedTrees = parseInt(fieldData.trees) || 180;
  const {
    totalYieldTons,
    totalRevenueRiels,
    totalRevenueUSD,
    estimatedCostRiels,
    netProfitRiels,
    netProfitUSD,
  } = calculateYieldAndProfit({ trees: parsedTrees });

  const fieldDisplayName = fieldData.fieldName || (lang === "km" ? "ការដាំ M23" : "M23 Planting");

  const filterTabs: Array<{ id: DashboardSection; labelKm: string; labelEn: string; icon: string }> = [
    { id: "farm", labelKm: "ចម្ការ", labelEn: "Farm", icon: "🌿" },
    { id: "market", labelKm: "ទីផ្សារ", labelEn: "Market", icon: "💰" },
    { id: "health", labelKm: "ការពារ", labelEn: "Health", icon: "🛡️" },
    { id: "handbook", labelKm: "សៀវភៅ", labelEn: "Handbook", icon: "📖" },
  ];

  return (
    <div className="space-y-3 tab-content pb-4">
      {/* ── HEADER WITH LOGO AND FIELD NAME ── */}
      <div
        className="rounded-2xl p-4 flex items-center justify-between shadow-sm"
        style={{
          backgroundColor: "var(--card)",
          border: "1px solid var(--border)",
        }}
      >
        <div className="flex items-center gap-3">
          <BrandLogo size="md" />
          <div>
            <div className="text-[11px] font-semibold tracking-wide uppercase" style={{ color: "var(--accent)" }}>
              {lang === "km" ? "ចម្ការសកម្ម" : "Active Field"}
            </div>
            <div className="font-extrabold text-base leading-tight" style={{ color: "var(--text)" }}>
              {lang === "km" ? `ចម្ការ: ${fieldDisplayName}` : `Field: ${fieldDisplayName}`}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <span
            className="text-[11px] px-2.5 py-1 rounded-full font-bold flex items-center gap-1"
            style={{
              backgroundColor: "var(--accent-fill)",
              color: "var(--accent)",
              border: "1px solid rgba(39, 166, 69, 0.3)",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#27a645] animate-pulse" />
            {lang === "km" ? "ពូជ M23" : "M23 Variety"}
          </span>
          <span className="text-[10px] mt-1 font-medium" style={{ color: "var(--muted)" }}>
            {formatLocation(location, lang)}
          </span>
        </div>
      </div>

      {/* ── SUB-TABS / FILTER PILLS ── */}
      <div
        className="flex items-center gap-1 p-1 rounded-xl sticky top-0 z-30 shadow-md backdrop-blur-md"
        style={{
          backgroundColor: "rgba(18, 18, 18, 0.95)",
          border: "1px solid var(--border)",
        }}
      >
        {filterTabs.map((tab) => {
          const isActive = activeSection === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id)}
              className="flex-1 py-1.5 px-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer select-none"
              style={{
                backgroundColor: isActive ? "var(--accent)" : "transparent",
                color: isActive ? "#ffffff" : "var(--muted)",
                boxShadow: isActive ? "0 2px 8px rgba(39, 166, 69, 0.35)" : "none",
              }}
            >
              <span className="text-sm">{tab.icon}</span>
              <span className="text-[11px] leading-none">
                {lang === "km" ? tab.labelKm : tab.labelEn}
              </span>
            </button>
          );
        })}
      </div>

      {/* ═══════════════════════════════════════════════════════
          SECTION 1: 🌿 FARM (FIELD & GROWTH)
      ═══════════════════════════════════════════════════════ */}
      {activeSection === "farm" && (
        <>
          {/* Cashew Handbook Quick Access Banner */}
          <div
            onClick={() => setActiveSection("handbook")}
            className="rounded-2xl p-3.5 cursor-pointer hover:border-[#27a645]/60 transition-all flex items-center justify-between gap-3 shadow-sm group"
            style={{
              backgroundColor: "rgba(39, 166, 69, 0.08)",
              border: "1px solid rgba(39, 166, 69, 0.35)",
            }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#27a645]/20 border border-[#27a645]/40 flex items-center justify-center text-xl shrink-0 group-hover:scale-105 transition-transform">
                📖
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white group-hover:text-[#27a645] transition-colors">
                    {lang === "km" ? "សៀវភៅណែនាំបច្ចេកទេសស្វាយចន្ទី" : "Cashew Agronomy Handbook"}
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#27a645] text-white font-bold">
                    M23
                  </span>
                </div>
                <p className="text-[11px] text-zinc-400 mt-0.5">
                  {lang === "km"
                    ? "អានបច្ចេកទេស ៩ ជំពូកពេញលេញ (កាត់មែក ជី NPK ជំរុញផ្កា ការពារសត្វល្អិត)"
                    : "Complete 9-chapter official guide: pruning, NPK ratios, flowering, and IPM"}
                </p>
              </div>
            </div>
            <span className="text-zinc-400 group-hover:text-white transition-colors text-sm shrink-0">
              ➔
            </span>
          </div>

          {/* Welcome Card */}
          <div
            className="rounded-2xl p-4 shadow-sm"
            style={{
              backgroundColor: "var(--accent-fill)",
              border: "1px solid rgba(39, 166, 69, 0.35)",
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold shrink-0 text-white"
                style={{ backgroundColor: "var(--accent)" }}
              >
                ✓
              </div>
              <div>
                <div className="font-bold text-sm" style={{ color: "var(--accent)" }}>
                  {lang === "km"
                    ? "ចម្ការរបស់អ្នកកំពុងដំណើរការល្អ ✓"
                    : "Your field is on track ✓"}
                </div>
                <div className="text-xs mt-0.5 leading-snug" style={{ color: "var(--muted)" }}>
                  {lang === "km"
                    ? "ការលូតលាស់ស្ថិតក្នុងកម្រិតល្អប្រសើរ គ្មានជំងឺរាតត្បាត"
                    : "Growth is optimal and conditions align with seasonal benchmarks"}
                </div>
              </div>
            </div>
          </div>

          {/* Dynamic Life Cycle Progress Card */}
          <div
            className="rounded-2xl p-4 shadow-sm"
            style={{
              backgroundColor: "var(--card)",
              border: "1px solid var(--border)",
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">{currentStage.icon}</span>
                <div>
                  <div className="font-bold text-sm" style={{ color: "var(--text)" }}>
                    {lang === "km"
                      ? `វដ្ដជីវិត — ${currentStage.nameKm}`
                      : `Life Cycle — ${currentStage.nameEn}`}
                  </div>
                  <div className="text-[11px]" style={{ color: "var(--muted)" }}>
                    {lang === "km"
                      ? `ដំណាក់កាលទី ${stageIndex + 1} នៃ ៥ · វដ្ដប្រចាំឆ្នាំ M23 (${currentStage.period})`
                      : `Stage ${stageIndex + 1} of 5 · M23 Annual Cycle (${currentStage.period})`}
                  </div>
                </div>
              </div>
              <span
                className="text-xs font-bold px-2.5 py-1 rounded-lg"
                style={{
                  backgroundColor: "var(--accent-fill)",
                  color: "var(--accent)",
                  border: "1px solid rgba(39, 166, 69, 0.3)",
                }}
              >
                {lang === "km" ? `${progressPercent}% បានបញ្ចប់` : `${progressPercent}% complete`}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs mb-2 font-medium" style={{ color: "var(--muted)" }}>
              <span>
                {lang === "km" ? `ថ្ងៃទី ${dayOf} នៃ ${totalDays}` : `Day ${dayOf} of ${totalDays}`}
              </span>
              <span style={{ color: "var(--accent)" }}>
                {daysToHarvest > 0
                  ? (lang === "km" ? `នៅសល់ ~${daysToHarvest} ថ្ងៃ ដល់រដូវប្រមូលផល` : `~${daysToHarvest} days remaining to harvest`)
                  : (lang === "km" ? "រដូវប្រមូលផលកំពុងដំណើរការ!" : "Harvest season active!")}
              </span>
            </div>

            <div
              className="w-full h-2.5 rounded-full overflow-hidden"
              style={{ backgroundColor: "#252525" }}
            >
              <div
                className="h-full rounded-full transition-all duration-700 ease-out"
                style={{
                  width: `${Math.min(100, progressPercent)}%`,
                  backgroundColor: "var(--accent)",
                }}
              />
            </div>

            <div
              className="mt-3 p-2.5 rounded-xl border text-[11px] leading-relaxed flex items-start gap-2"
              style={{
                backgroundColor: "#131e17",
                borderColor: "rgba(39, 166, 69, 0.25)",
                color: "#c2eed2",
              }}
            >
              <span className="text-xs shrink-0 mt-0.5">💡</span>
              <div>
                <span className="font-bold text-[#27a645] mr-1">
                  {lang === "km" ? "គន្លឹះដំណាក់កាលនេះ:" : "Stage Focus:"}
                </span>
                <span>{lang === "km" ? currentStage.tipKm : currentStage.tipEn}</span>
              </div>
            </div>

            <div className="grid grid-cols-5 gap-1 mt-3.5 pt-3 border-t text-center" style={{ borderColor: "var(--border)" }}>
              {M23_LIFECYCLE_STAGES.map((stage, idx) => {
                const isCompleted = idx < stageIndex;
                const isCurrent = idx === stageIndex;

                return (
                  <div key={stage.id} className="flex flex-col items-center">
                    <span className={`text-sm ${isCurrent ? "scale-110" : !isCompleted ? "opacity-50" : ""}`}>
                      {stage.icon}
                    </span>
                    <span
                      className={`text-[10px] mt-0.5 ${
                        isCurrent ? "font-bold text-[#27a645]" : isCompleted ? "text-zinc-300" : "text-zinc-500"
                      }`}
                    >
                      {lang === "km" ? stage.nameKm.split(" ")[0] : stage.nameEn.split(" ")[0]}
                    </span>
                    <span className="text-[9px] mt-0.5 font-bold">
                      {isCurrent ? (
                        <span className="text-[#27a645]">● Now</span>
                      ) : isCompleted ? (
                        <span className="text-[#27a645]">✓</span>
                      ) : (
                        <span className="text-zinc-600">○</span>
                      )}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider mb-2 px-1" style={{ color: "var(--muted)" }}>
              {lang === "km" ? "ទិន្នន័យសង្ខេបចម្ការ" : "Field Quick Stats"}
            </div>
            <div className="grid grid-cols-4 gap-2">
              <div
                className="rounded-xl p-3 flex flex-col items-center text-center shadow-sm"
                style={{
                  backgroundColor: "var(--card)",
                  border: "1px solid var(--border)",
                }}
              >
                <span className="text-lg mb-1">📐</span>
                <span className="text-xs font-bold leading-tight" style={{ color: "var(--text)" }}>
                  {parsedArea} ha
                </span>
                <span className="text-[10px] mt-0.5 font-medium" style={{ color: "var(--muted)" }}>
                  {lang === "km" ? "ផ្ទៃដី" : "Area"}
                </span>
              </div>

              <div
                className="rounded-xl p-3 flex flex-col items-center text-center shadow-sm"
                style={{
                  backgroundColor: "var(--card)",
                  border: "1px solid var(--border)",
                }}
              >
                <span className="text-lg mb-1">🌳</span>
                <span className="text-xs font-bold leading-tight" style={{ color: "var(--text)" }}>
                  {parsedTrees}
                </span>
                <span className="text-[10px] mt-0.5 font-medium" style={{ color: "var(--muted)" }}>
                  {lang === "km" ? "ដើម" : "Trees"}
                </span>
              </div>

              <div
                className="rounded-xl p-3 flex flex-col items-center text-center shadow-sm"
                style={{
                  backgroundColor: "var(--card)",
                  border: "1px solid var(--border)",
                }}
              >
                <span className="text-lg mb-1">📊</span>
                <span className="text-xs font-bold leading-tight" style={{ color: "var(--accent)" }}>
                  {totalYieldTons}t
                </span>
                <span className="text-[10px] mt-0.5 font-medium" style={{ color: "var(--muted)" }}>
                  {lang === "km" ? "ទិន្នផល" : "Yield"}
                </span>
              </div>

              <div
                className="rounded-xl p-3 flex flex-col items-center text-center shadow-sm"
                style={{
                  backgroundColor: "var(--card)",
                  border: "1px solid var(--border)",
                }}
              >
                <span className="text-lg mb-1">💰</span>
                <span className="text-xs font-bold leading-tight text-[#d4af37]">
                  ${netProfitUSD}
                </span>
                <span className="text-[10px] mt-0.5 font-medium" style={{ color: "var(--muted)" }}>
                  {lang === "km" ? "ចំណេញ" : "Profit"}
                </span>
              </div>
            </div>
          </div>

          {/* Watering Reminder */}
          {preferences?.wateringReminders && (
            <div
              className="rounded-2xl p-4 flex items-start gap-3 shadow-sm"
              style={{
                backgroundColor: "#0d2230",
                border: "1px solid rgba(56, 189, 248, 0.35)",
              }}
            >
              <span className="text-xl shrink-0 mt-0.5">💧</span>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
                    {lang === "km" ? "ការរំលឹកស្រោចទឹក" : "Watering Reminder"}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-sky-950 text-sky-300 font-semibold border border-sky-500/30">
                    {lang === "km" ? "សកម្ម" : "Active"}
                  </span>
                </div>
                <div className="text-xs font-semibold mt-1 text-white">
                  {lang === "km"
                    ? "រំលឹកស្រោចទឹកដំណាំរៀងរាល់ ៣ ថ្ងៃ (ផ្អាកពេលមានភ្លៀង)"
                    : "Scheduled watering every 3 days · Maintain soil moisture"}
                </div>
                <div className="text-[11px] text-sky-200/80 mt-1">
                  {lang === "km"
                    ? "💡 ស្រោចទឹក ~០.៥ លីត្រ/ដើម ក្នុងដំណាក់កាលលូតលាស់បច្ចុប្បន្ន"
                    : "💡 Recommended volume: ~0.5L/tree during this growth stage"}
                </div>
              </div>
            </div>
          )}

          {/* Harvest Alert */}
          {preferences?.harvestAlerts && (
            <div
              className="rounded-2xl p-4 flex items-start gap-3 shadow-sm"
              style={{
                backgroundColor: "#2a1c06",
                border: "1px solid rgba(251, 191, 36, 0.4)",
              }}
            >
              <span className="text-xl shrink-0 mt-0.5">🌾</span>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                    {lang === "km" ? "ការជូនដំណឹងប្រមូលផល" : "Harvest Alert"}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-950 text-amber-300 font-semibold border border-amber-500/30">
                    {daysToHarvest > 0
                      ? (lang === "km" ? `នៅសល់ ~${daysToHarvest} ថ្ងៃ` : `~${daysToHarvest}d left`)
                      : (lang === "km" ? "រដូវសកម្ម" : "Active")}
                  </span>
                </div>
                <div className="text-xs font-semibold mt-1 text-white">
                  {daysToHarvest > 0
                    ? (lang === "km"
                        ? `រាប់ថយក្រោយដល់រដូវផ្លែទុំជ្រុះ និងសម្ងួតគ្រាប់ (~${daysToHarvest} ថ្ងៃ)`
                        : `Nut maturity countdown: ~${daysToHarvest} days until nut drop`)
                    : (lang === "km"
                        ? "រដូវប្រមូលផលកំពុងដំណើរការ! ត្រៀមសម្ងួតគ្រាប់ភ្លាមៗ"
                        : "Harvest season is live! Prepare sun drying mats immediately")}
                </div>
                <div className="text-[11px] text-amber-200/80 mt-1">
                  {lang === "km"
                    ? "📈 តម្លៃទីផ្សារគ្រាប់ឆៅ M23 បច្ចុប្បន្ន: ~6,500 ៛/kg"
                    : "📈 Current M23 raw cashew market price benchmark: ~6,500 ៛/kg ($1.60)"}
                </div>
              </div>
            </div>
          )}

          {/* Weather Widget */}
          {preferences?.weatherAlerts !== false ? (
            <WeatherWidget location={location} lang={lang} />
          ) : (
            <div
              className="rounded-2xl p-3.5 flex items-center justify-between shadow-sm border border-zinc-800 bg-zinc-900/30 text-xs"
            >
              <div className="flex items-center gap-2 text-zinc-500">
                <span>🔕</span>
                <span>
                  {lang === "km"
                    ? "ការជូនដំណឹងអាកាសធាតុត្រូវបានបិទ (បើកក្នុង Settings)"
                    : "Weather alerts muted (enable in Settings)"}
                </span>
              </div>
              <span className="text-[10px] text-zinc-500 font-semibold">
                {formatLocation(location, lang)}
              </span>
            </div>
          )}
        </>
      )}

      {/* ═══════════════════════════════════════════════════════
          SECTION 2: 💰 MARKET & BUYERS
      ═══════════════════════════════════════════════════════ */}
      {activeSection === "market" && (
        <>
          {/* Financial Summary Card */}
          <div
            className="rounded-2xl p-4 shadow-sm"
            style={{
              backgroundColor: "var(--card)",
              border: "1px solid var(--border)",
            }}
          >
            <div className="flex items-center justify-between mb-3.5">
              <div className="font-bold text-sm flex items-center gap-2" style={{ color: "var(--text)" }}>
                <span>💰</span>
                <span>{lang === "km" ? "ការប៉ាន់ស្មានចំណូលចម្ការ" : "Estimated Farm Revenue"}</span>
              </div>
              <span
                className="text-[10px] px-2 py-0.5 rounded-md font-semibold"
                style={{ backgroundColor: "#1e2920", color: "var(--accent)" }}
              >
                {lang === "km" ? "គំរូ M23" : "M23 Benchmark"}
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold" style={{ color: "var(--text)" }}>
                    {lang === "km" ? "ប្រាក់ចំណេញសុទ្ធរំពឹងទុក (Net Profit)" : "Expected Net Profit"}
                  </div>
                  <div className="text-[10px]" style={{ color: "var(--muted)" }}>
                    {lang === "km" ? "ក្រោយកាត់ការចំណាយ ~20%" : "After ~20% operating costs"}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-base font-extrabold" style={{ color: "var(--accent)" }}>
                    ${netProfitUSD}
                  </div>
                  <div className="text-[10px] font-medium" style={{ color: "var(--muted)" }}>
                    {netProfitRiels.toLocaleString()} ៛
                  </div>
                </div>
              </div>

              <div className="h-px" style={{ backgroundColor: "var(--border)" }} />

              <div className="flex items-center justify-between">
                <span className="text-xs" style={{ color: "var(--muted)" }}>
                  {lang === "km" ? "ចំណូលសរុប (Revenue)" : "Total Revenue"}
                </span>
                <div className="text-right">
                  <span className="text-xs font-bold" style={{ color: "var(--text)" }}>
                    ${totalRevenueUSD}
                  </span>
                  <span className="text-[10px] ml-1" style={{ color: "var(--muted)" }}>
                    ({totalRevenueRiels.toLocaleString()} ៛)
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs" style={{ color: "var(--muted)" }}>
                  {lang === "km" ? "ចំណាយជី/ថ្នាំ (~20%)" : "Costs (~20% input & labor)"}
                </span>
                <div className="text-right">
                  <span className="text-xs font-semibold text-[#ef5350]">
                    -${(estimatedCostRiels / 4100).toFixed(0)}
                  </span>
                  <span className="text-[10px] ml-1" style={{ color: "var(--muted)" }}>
                    ({estimatedCostRiels.toLocaleString()} ៛)
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Cashew Market Price Tracker */}
          <MarketPriceCard lang={lang} location={location} />

          {/* Buyer & Trader Directory */}
          <BuyerDirectoryCard lang={lang} location={location} />
        </>
      )}

      {/* ═══════════════════════════════════════════════════════
          SECTION 3: 🛡️ CROP HEALTH & PROTECTION
      ═══════════════════════════════════════════════════════ */}
      {activeSection === "health" && (
        <>
          {/* Pest & Disease Alerts */}
          <PestAlertCard lang={lang} />

          {/* Weather Widget for Spray Suitability */}
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider mb-2 px-1" style={{ color: "var(--muted)" }}>
              {lang === "km" ? "អាកាសធាតុ & ផែនការបាញ់ថ្នាំ" : "Weather & Spray Windows"}
            </div>
            <WeatherWidget location={location} lang={lang} />
          </div>
        </>
      )}

      {/* ═══════════════════════════════════════════════════════
          SECTION 4: 📖 OFFICIAL CASHEW HANDBOOK READER
      ═══════════════════════════════════════════════════════ */}
      {activeSection === "handbook" && (
        <CashewHandbookReader lang={lang} />
      )}
    </div>
  );
}
