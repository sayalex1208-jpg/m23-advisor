"use client";

import { useState, useEffect } from "react";
import type { Language } from "@/types/agronomy";

export interface PestAlert {
  id: string;
  nameEn: string;
  nameKm: string;
  icon: string;
  severity: "high" | "medium" | "low";
  descEn: string;
  descKm: string;
  actionEn: string;
  actionKm: string;
  activeMonths: number[]; // 0-indexed (0 = Jan, 11 = Dec)
  isUserReported?: boolean;
  reportedDate?: string;
  notes?: string;
}

const CASHEW_PEST_DATABASE: PestAlert[] = [
  {
    id: "tea-mosquito-bug",
    nameEn: "Tea Mosquito Bug (Helopeltis)",
    nameKm: "សត្វមូសតែ (Helopeltis)",
    icon: "🦟",
    severity: "high",
    descEn: "Attacks young shoots, flower panicles & developing nuts. Causes black lesions and flower blight. Most critical cashew pest in Cambodia.",
    descKm: "វាយប្រហារលើត្រួយ ផ្កា និងក្ដឹបស្វាយចន្ទី ធ្វើឲ្យជាំខ្មៅ និងរលាកផ្កា។ ជាសត្វល្អិតបំផ្លាញខ្លាំងបំផុតនៅកម្ពុជា។",
    actionEn: "Apply lambda-cyhalothrin or neem extract at early morning (6-8 AM). Prune dead shoots. Spray at first sign of panicle emergence.",
    actionKm: "បាញ់ថ្នាំ lambda-cyhalothrin ឬទឹកស្លឹកស្តៅពេលព្រឹកព្រលឹម (ម៉ោង ៦-៨ ព្រឹក)។ កាត់មែកងាប់ចោល។ បាញ់ពេលទើបចេញទងផ្កា។",
    activeMonths: [0, 1, 2, 3], // Jan–Apr (Flowering & nut set)
  },
  {
    id: "stem-borer",
    nameEn: "Cashew Stem & Root Borer",
    nameKm: "ដង្កូវស៊ីទម្លុះដើម និងឫស",
    icon: "🪲",
    severity: "high",
    descEn: "Larvae bore inside trunk and roots causing gum exudation and yellowing canopy. Can kill mature cashew trees if untreated.",
    descKm: "ដង្កូវទម្លុះស៊ីខាងក្នុងដើម និងឫស បង្កឲ្យមានជ័រហូរ និងស្លឹកប្រែពណ៌លឿង។ អាចធ្វើឲ្យដើមធំងាប់បាន។",
    actionEn: "Chisel bark to remove grubs. Apply chlorpyrifos or swab trunk with coal tar + carbaryl (1:1). Clear weeds around base.",
    actionKm: "ចោះសំបកកម្ចាត់ដង្កូវ។ លាបគល់ដើមដោយថ្នាំផ្សំ ឬជ័រធ្យូងថ្ម។ សម្អាតស្មៅជុំវិញគល់ដើមឲ្យស្អាត។",
    activeMonths: [10, 11, 0, 1, 2, 3], // Nov–Apr (Dry season)
  },
  {
    id: "anthracnose",
    nameEn: "Anthracnose Blight",
    nameKm: "ជំងឺអង់ត្រាក់ណូស (Anthracnose)",
    icon: "🍂",
    severity: "high",
    descEn: "Fungal blight causing brown water-soaked lesions on young leaves, flowers, and immature nuts. Heightened during damp mornings.",
    descKm: "ជំងឺផ្សិតធ្វើឲ្យមានស្នាមជាំត្នោតលើស្លឹកខ្ចី ផ្កា និងក្ដឹប។ កើតឡើងខ្លាំងនៅពេលព្រឹកមានអ័ព្ទ ឬសំណើមខ្ពស់។",
    actionEn: "Spray Copper Hydroxide or Mancozeb before and after rain flushes. Ensure proper tree spacing for sunlight penetration.",
    actionKm: "បាញ់ថ្នាំផ្សិត Copper Hydroxide ឬ Mancozeb មុន និងក្រោយភ្លៀង។ កាត់តម្រឹមមែកដើម្បីឲ្យពន្លឺថ្ងៃចាំងចូលគ្រប់គ្រាន់។",
    activeMonths: [4, 5, 6, 7, 8, 9, 10], // May–Nov (Wet season)
  },
  {
    id: "leaf-miner",
    nameEn: "Cashew Leaf Miner",
    nameKm: "ដង្កូវរូងស៊ីស្លឹក",
    icon: "🐛",
    severity: "medium",
    descEn: "Tiny caterpillars tunnel through leaf lamina leaving silvery meandering blisters. Causes early leaf drop.",
    descKm: "ដង្កូវតូចស៊ីរូងក្នុងកោសិកាស្លឹក បង្កើតជាស្នាមរបត់ពណ៌ប្រាក់។ បណ្ដាលឲ្យស្លឹកជ្រុះមុនអាយុ។",
    actionEn: "Spray systemic insecticide (e.g. Imidacloprid) or botanical bio-pesticides when 10% of new flushes show tunnels.",
    actionKm: "បាញ់ថ្នាំ Imidacloprid ឬថ្នាំសរីរាង្គជីវសាស្រ្ត នៅពេលឃើញស្នាមរូងលើត្រួយខ្ចីលើសពី ១០%។",
    activeMonths: [5, 6, 7, 8], // Jun–Sep (Vegetative growth)
  },
  {
    id: "dieback",
    nameEn: "Twig Dieback / Pink Disease",
    nameKm: "ជំងឺងាប់ចុងមែក (Dieback)",
    icon: "🌿",
    severity: "medium",
    descEn: "Tips of twigs wilt, turn brown and dry up downwards. Often triggered by secondary fungal infection following pest wounds.",
    descKm: "ចុងមែកស្វិត ប្រែពណ៌ត្នោត និងក្រៀមស្ងួតពីចុងចុះក្រោម។ កើតឡើងដោយសារផ្សិតជ្រាបចូលតាមស្នាមរបួសសត្វល្អិត។",
    actionEn: "Prune affected twigs 10 cm below dry section and burn them. Paint cut surfaces with Bordeaux paste.",
    actionKm: "កាត់មែកខូច ១០ សង់ទីម៉ែត្រក្រោមចំណុចស្ងួត ហើយដុតចោល។ លាបកំបោរស្ពាន់ (Bordeaux) នៅមុខកាត់។",
    activeMonths: [5, 6, 7, 8, 9, 10, 11], // Wet to transitional months
  },
];

const LOCAL_STORAGE_PEST_REPORTS_KEY = "m23_pest_observations";

function getSeverityStyle(severity: "high" | "medium" | "low") {
  switch (severity) {
    case "high":
      return { text: "#f87171", bg: "#2a0a0a", border: "rgba(248, 113, 113, 0.3)", labelEn: "High Risk", labelKm: "ហានិភ័យខ្ពស់" };
    case "medium":
      return { text: "#fbbf24", bg: "#2a2209", border: "rgba(251, 191, 36, 0.3)", labelEn: "Moderate", labelKm: "មធ្យម" };
    case "low":
      return { text: "#4ade80", bg: "#052e16", border: "rgba(74, 222, 128, 0.3)", labelEn: "Low Risk", labelKm: "ហានិភ័យទាប" };
  }
}

function getMonthName(lang: Language): string {
  const now = new Date();
  if (lang === "km") {
    const kmMonths = ["មករា", "កុម្ភៈ", "មីនា", "មេសា", "ឧសភា", "មិថុនា", "កក្កដា", "សីហា", "កញ្ញា", "តុលា", "វិច្ឆិកា", "ធ្នូ"];
    return kmMonths[now.getMonth()];
  }
  return now.toLocaleString("en", { month: "long" });
}

interface PestAlertCardProps {
  lang?: Language;
}

export default function PestAlertCard({ lang = "km" }: PestAlertCardProps) {
  const [userReports, setUserReports] = useState<PestAlert[]>([]);
  const [showReportModal, setShowReportModal] = useState(false);
  const [selectedPestType, setSelectedPestType] = useState(CASHEW_PEST_DATABASE[0].id);
  const [customPestName, setCustomPestName] = useState("");
  const [pestNotes, setPestNotes] = useState("");

  // Load custom observations
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_PEST_REPORTS_KEY);
      if (saved) {
        setUserReports(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  function handleAddReport(e: React.FormEvent) {
    e.preventDefault();
    const basePest = CASHEW_PEST_DATABASE.find((p) => p.id === selectedPestType);
    const newReport: PestAlert = {
      id: `report-${Date.now()}`,
      nameEn: customPestName.trim() || basePest?.nameEn || "Field Observation",
      nameKm: customPestName.trim() || basePest?.nameKm || "ការកត់ត្រាសត្វល្អិតក្នុងចម្ការ",
      icon: basePest?.icon || "🔍",
      severity: "high",
      descEn: pestNotes.trim() || "Spotted in field by farmer. Immediate inspection recommended.",
      descKm: pestNotes.trim() || "បានប្រទះឃើញដោយផ្ទាល់ក្នុងចម្ការ។ គួរចុះពិនិត្យ និងចាត់វិធានការភ្លាមៗ។",
      actionEn: basePest?.actionEn || "Inspect affected trees, isolate infested branches, and apply appropriate treatment.",
      actionKm: basePest?.actionKm || "ពិនិត្យដើមដែលរងផលប៉ះពាល់ កាត់មែកដែលឆ្លងរាលដាល និងបាញ់ថ្នាំការពារ។",
      activeMonths: [new Date().getMonth()],
      isUserReported: true,
      reportedDate: new Date().toLocaleDateString(lang === "km" ? "km-KH" : "en-US"),
      notes: pestNotes.trim(),
    };

    const updated = [newReport, ...userReports];
    setUserReports(updated);
    try {
      localStorage.setItem(LOCAL_STORAGE_PEST_REPORTS_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }

    setCustomPestName("");
    setPestNotes("");
    setShowReportModal(false);
  }

  function handleResolveReport(id: string) {
    const updated = userReports.filter((r) => r.id !== id);
    setUserReports(updated);
    try {
      localStorage.setItem(LOCAL_STORAGE_PEST_REPORTS_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }
  }

  // Calculate dynamic active alerts for current month
  const currentMonth = new Date().getMonth();
  const seasonalAlerts = CASHEW_PEST_DATABASE.filter((pest) =>
    pest.activeMonths.includes(currentMonth)
  );

  // Combine user reports (top priority) + seasonal alerts
  const combinedAlerts = [...userReports, ...seasonalAlerts];
  const highCount = combinedAlerts.filter((a) => a.severity === "high").length;
  const monthName = getMonthName(lang);

  return (
    <div
      className="rounded-2xl p-4 shadow-sm relative"
      style={{
        backgroundColor: "var(--card)",
        border: "1px solid var(--border)",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xl">🐛</span>
          <div>
            <div className="font-bold text-sm" style={{ color: "var(--text)" }}>
              {lang === "km" ? "ការព្រមានសត្វល្អិត និងជំងឺ" : "Pest & Disease Alerts"}
            </div>
            <div className="text-[10px]" style={{ color: "var(--muted)" }}>
              {lang === "km"
                ? `ខែ${monthName} · ការព្រមានតាមរដូវកាល M23`
                : `${monthName} · M23 Dynamic seasonal surveillance`}
            </div>
          </div>
        </div>

        {/* Action button to report observation */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setShowReportModal(true)}
            className="text-[10px] px-2 py-1 rounded-md font-semibold cursor-pointer border transition-colors flex items-center gap-1"
            style={{
              backgroundColor: "var(--accent-fill)",
              borderColor: "rgba(39, 166, 69, 0.4)",
              color: "var(--accent)",
            }}
          >
            <span>📷</span>
            <span>{lang === "km" ? "កត់ត្រាជួបប្រទះ" : "Report"}</span>
          </button>
          {highCount > 0 && (
            <span
              className="text-[10px] px-2 py-0.5 rounded-full font-bold animate-pulse"
              style={{
                backgroundColor: "#2a0a0a",
                color: "#f87171",
                border: "1px solid rgba(248, 113, 113, 0.4)",
              }}
            >
              {highCount} {lang === "km" ? "ហានិភ័យខ្ពស់" : "High Risk"}
            </span>
          )}
        </div>
      </div>

      {/* Active alerts list */}
      <div className="space-y-2">
        {combinedAlerts.map((alert) => {
          const style = getSeverityStyle(alert.severity);
          return (
            <div
              key={alert.id}
              className="rounded-xl px-3 py-3"
              style={{
                backgroundColor: alert.isUserReported ? "#261309" : style.bg,
                border: alert.isUserReported
                  ? "1px solid rgba(249, 115, 22, 0.4)"
                  : `1px solid ${style.border}`,
              }}
            >
              {/* Alert header */}
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-sm">{alert.icon}</span>
                  <span className="text-xs font-bold" style={{ color: alert.isUserReported ? "#fb923c" : style.text }}>
                    {lang === "km" ? alert.nameKm : alert.nameEn}
                  </span>
                  {alert.isUserReported && (
                    <span className="text-[9px] px-1.5 py-0.2 rounded font-bold bg-orange-950 text-orange-400 border border-orange-500/30">
                      {lang === "km" ? "កត់ត្រាជាក់ស្ដែង" : "Field Sighting"}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1.5">
                  <span
                    className="text-[9px] px-1.5 py-0.5 rounded-md font-bold uppercase tracking-wider"
                    style={{
                      backgroundColor: `${style.text}15`,
                      color: style.text,
                    }}
                  >
                    {lang === "km" ? style.labelKm : style.labelEn}
                  </span>
                  {alert.isUserReported && (
                    <button
                      onClick={() => handleResolveReport(alert.id)}
                      title={lang === "km" ? "បានព្យាបាលរួចរាល់" : "Mark as treated"}
                      className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-600/40 hover:bg-emerald-900 cursor-pointer"
                    >
                      ✓ {lang === "km" ? "ដោះស្រាយរួច" : "Resolved"}
                    </button>
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="text-[11px] leading-relaxed mb-2" style={{ color: "var(--muted)" }}>
                {lang === "km" ? alert.descKm : alert.descEn}
              </div>

              {/* Action advice */}
              <div
                className="text-[11px] leading-relaxed flex items-start gap-1.5 p-2 rounded-lg"
                style={{
                  backgroundColor: "rgba(0,0,0,0.3)",
                  border: `1px solid ${style.border}`,
                }}
              >
                <span className="shrink-0 mt-0.5">💊</span>
                <div>
                  <span className="font-bold mr-1 text-[10px] uppercase tracking-wider" style={{ color: style.text }}>
                    {lang === "km" ? "វិធានការដោះស្រាយ:" : "Recommended Action:"}
                  </span>
                  <span style={{ color: "#d4d4d4" }}>
                    {lang === "km" ? alert.actionKm : alert.actionEn}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Seasonal tip */}
      <div
        className="mt-3 p-2.5 rounded-xl text-[11px] leading-relaxed flex items-start gap-2"
        style={{
          backgroundColor: "#131e17",
          border: "1px solid rgba(39, 166, 69, 0.25)",
          color: "#c2eed2",
        }}
      >
        <span className="shrink-0 mt-0.5">🛡️</span>
        <span>
          {lang === "km"
            ? "ការណែនាំ agronomy: បាញ់ថ្នាំការពារពេលព្រឹកព្រលឹម (ម៉ោង ៦-៨ ព្រឹក) ដើម្បីជៀសវាងកម្ដៅថ្ងៃបំផ្លាញផ្កា និងប្រសិទ្ធភាពថ្នាំ។"
            : "Agronomy guideline: Apply sprays during early morning (6-8 AM) to avoid midday heat damaging blossoms and reducing chemical efficacy."}
        </span>
      </div>

      {/* Modal to report field pest finding */}
      {showReportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div
            className="w-full max-w-sm rounded-2xl p-5 border shadow-2xl"
            style={{ backgroundColor: "#181818", borderColor: "var(--border)" }}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span>📷</span>
                <span>{lang === "km" ? "កត់ត្រាសត្វល្អិតដែលបានប្រទះឃើញ" : "Record Pest Sighting"}</span>
              </h3>
              <button
                onClick={() => setShowReportModal(false)}
                className="text-zinc-400 hover:text-white text-lg font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-zinc-400 mb-4">
              {lang === "km"
                ? "កត់ត្រាសញ្ញាសត្វល្អិត ឬជំងឺដែលអ្នកទើបតែបានរកឃើញនៅចម្ការរបស់អ្នក ដើម្បីទទួលបានការណែនាំ និងតាមដាន។"
                : "Record symptoms or pests you spotted in your orchard to monitor and track resolution."}
            </p>

            <form onSubmit={handleAddReport} className="space-y-3">
              <div>
                <label className="text-[11px] font-semibold text-zinc-300 block mb-1">
                  {lang === "km" ? "ប្រភេទសត្វល្អិត/ជំងឺ" : "Pest or Disease Type"}
                </label>
                <select
                  value={selectedPestType}
                  onChange={(e) => setSelectedPestType(e.target.value)}
                  className="w-full rounded-xl px-3 py-2 text-xs text-white border outline-hidden"
                  style={{ backgroundColor: "#222", borderColor: "var(--border)" }}
                >
                  {CASHEW_PEST_DATABASE.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.icon} {lang === "km" ? p.nameKm : p.nameEn}
                    </option>
                  ))}
                  <option value="other">{lang === "km" ? "🔍 ផ្សេងៗទៀត (Other)" : "🔍 Other"}</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-zinc-300 block mb-1">
                  {lang === "km" ? "កំណត់ចំណាំ ឬរោគសញ្ញាដែលបានឃើញ" : "Symptoms / Notes"}
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder={lang === "km" ? "ឧ. ឃើញជ័រហូរលើដើម ២-៣ ដើម ជិតផ្លូវចូល..." : "e.g. Gum oozing on 2 trees near entrance..."}
                  value={pestNotes}
                  onChange={(e) => setPestNotes(e.target.value)}
                  className="w-full rounded-xl px-3 py-2 text-xs text-white border outline-hidden"
                  style={{ backgroundColor: "#222", borderColor: "var(--border)" }}
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowReportModal(false)}
                  className="flex-1 py-2 rounded-xl text-xs font-semibold text-zinc-400 border border-zinc-700 hover:bg-zinc-800 cursor-pointer"
                >
                  {lang === "km" ? "បោះបង់" : "Cancel"}
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl text-xs font-bold text-white transition-opacity hover:opacity-90 cursor-pointer"
                  style={{ backgroundColor: "var(--accent)" }}
                >
                  {lang === "km" ? "កត់ត្រាទុក ✓" : "Record Alert ✓"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
