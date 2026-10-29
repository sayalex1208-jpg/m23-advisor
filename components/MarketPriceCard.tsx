"use client";

import { useState, useEffect } from "react";
import type { Language } from "@/types/agronomy";

export interface ProvincePrice {
  id: string;
  nameEn: string;
  nameKm: string;
  priceRiel: number;
  priceUSD: string;
  trend: "up" | "down" | "stable";
  changePercent: string;
  lastUpdated?: string;
  isCustom?: boolean;
}

const DEFAULT_PROVINCE_PRICES: ProvincePrice[] = [
  { id: "kampong-cham", nameEn: "Kampong Cham", nameKm: "កំពង់ចាម", priceRiel: 6800, priceUSD: "1.66", trend: "up", changePercent: "+3.0" },
  { id: "tbong-khmum", nameEn: "Tbong Khmum", nameKm: "ត្បូងឃ្មុំ", priceRiel: 6700, priceUSD: "1.63", trend: "up", changePercent: "+2.1" },
  { id: "kampong-thom", nameEn: "Kampong Thom", nameKm: "កំពង់ធំ", priceRiel: 6600, priceUSD: "1.61", trend: "up", changePercent: "+1.5" },
  { id: "ratanakiri", nameEn: "Ratanakiri", nameKm: "រតនគិរី", priceRiel: 6500, priceUSD: "1.59", trend: "stable", changePercent: "0.0" },
  { id: "kratie", nameEn: "Kratie", nameKm: "ក្រចេះ", priceRiel: 6400, priceUSD: "1.56", trend: "down", changePercent: "-1.2" },
  { id: "mondulkiri", nameEn: "Mondulkiri", nameKm: "មណ្ឌលគិរី", priceRiel: 6300, priceUSD: "1.54", trend: "down", changePercent: "-0.8" },
  { id: "preah-vihear", nameEn: "Preah Vihear", nameKm: "ព្រះវិហារ", priceRiel: 6450, priceUSD: "1.57", trend: "stable", changePercent: "+0.5" },
];

const LOCAL_STORAGE_CUSTOM_PRICES_KEY = "m23_custom_market_prices";

interface MarketPriceCardProps {
  lang?: Language;
  location?: string;
}

export default function MarketPriceCard({ lang = "km", location = "Kampong Cham" }: MarketPriceCardProps) {
  const [prices, setPrices] = useState<ProvincePrice[]>(DEFAULT_PROVINCE_PRICES);
  const [loading, setLoading] = useState(false);
  const [lastRefreshed, setLastRefreshed] = useState<string>("");
  const [expanded, setExpanded] = useState(false);
  const [showInputModal, setShowInputModal] = useState(false);
  const [customPriceInput, setCustomPriceInput] = useState<string>("");
  const [selectedProvinceId, setSelectedProvinceId] = useState<string>("kampong-cham");

  // Fetch dynamic market prices from API
  async function fetchMarketPrices() {
    setLoading(true);
    try {
      const res = await fetch("/api/market-prices", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        if (data.prices && Array.isArray(data.prices)) {
          // Check for any locally saved custom farmer reported prices
          const savedCustom = localStorage.getItem(LOCAL_STORAGE_CUSTOM_PRICES_KEY);
          let customMap: Record<string, number> = {};
          if (savedCustom) {
            try {
              customMap = JSON.parse(savedCustom);
            } catch {
              // ignore parse errors
            }
          }

          const merged: ProvincePrice[] = data.prices.map((p: ProvincePrice) => {
            if (customMap[p.id]) {
              const customVal = customMap[p.id];
              return {
                ...p,
                priceRiel: customVal,
                priceUSD: (customVal / 4100).toFixed(2),
                isCustom: true,
              };
            }
            return p;
          });

          setPrices(merged);
          setLastRefreshed(new Date().toLocaleTimeString(lang === "km" ? "km-KH" : "en-US", { hour: "2-digit", minute: "2-digit" }));
        }
      }
    } catch {
      // Fallback gracefully to existing state
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMarketPrices();
  }, []);

  // Save custom farmer reported price into server and localStorage
  async function handleSaveCustomPrice(e: React.FormEvent) {
    e.preventDefault();
    const val = parseInt(customPriceInput.replace(/[^0-9]/g, ""), 10);
    if (!val || val < 1000 || val > 30000) return;

    // Send to server API so ALL farmers see the updated community price
    try {
      await fetch("/api/market-prices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          provinceId: selectedProvinceId,
          priceRiel: val,
          reportedBy: location || "Local Farmer",
        }),
      });
    } catch {
      // fallback
    }

    try {
      const savedCustom = localStorage.getItem(LOCAL_STORAGE_CUSTOM_PRICES_KEY);
      const customMap = savedCustom ? JSON.parse(savedCustom) : {};
      customMap[selectedProvinceId] = val;
      localStorage.setItem(LOCAL_STORAGE_CUSTOM_PRICES_KEY, JSON.stringify(customMap));

      setPrices((prev) =>
        prev.map((item) =>
          item.id === selectedProvinceId
            ? {
                ...item,
                priceRiel: val,
                priceUSD: (val / 4100).toFixed(2),
                isCustom: true,
              }
            : item
        )
      );
    } catch {
      // ignore
    }

    setCustomPriceInput("");
    setShowInputModal(false);
  }

  // Reset custom price
  function handleResetPrice(provinceId: string) {
    try {
      const savedCustom = localStorage.getItem(LOCAL_STORAGE_CUSTOM_PRICES_KEY);
      if (savedCustom) {
        const customMap = JSON.parse(savedCustom);
        delete customMap[provinceId];
        localStorage.setItem(LOCAL_STORAGE_CUSTOM_PRICES_KEY, JSON.stringify(customMap));
      }
      fetchMarketPrices();
    } catch {
      // ignore
    }
  }

  // Sort prices so the user's current farm location is at the top
  const normalizedLocation = (location || "").toLowerCase();
  const sortedPrices = [...prices].sort((a, b) => {
    const aMatch = normalizedLocation.includes(a.nameEn.toLowerCase()) || normalizedLocation.includes(a.nameKm);
    const bMatch = normalizedLocation.includes(b.nameEn.toLowerCase()) || normalizedLocation.includes(b.nameKm);
    if (aMatch && !bMatch) return -1;
    if (!aMatch && bMatch) return 1;
    return 0;
  });

  const displayPrices = expanded ? sortedPrices : sortedPrices.slice(0, 3);

  // Statistics
  const highestPrice = Math.max(...prices.map((p) => p.priceRiel));
  const avgPrice = Math.round(prices.reduce((sum, p) => sum + p.priceRiel, 0) / (prices.length || 1));

  // Determine market trend advice
  const upCount = prices.filter((p) => p.trend === "up").length;
  const isUpTrend = upCount >= prices.length / 2;

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
          <span className="text-xl">💲</span>
          <div>
            <div className="font-bold text-sm" style={{ color: "var(--text)" }}>
              {lang === "km" ? "តម្លៃទីផ្សារស្វាយចន្ទី (ផ្ទាល់)" : "Live Cashew Market Prices"}
            </div>
            <div className="text-[10px]" style={{ color: "var(--muted)" }}>
              {lang === "km"
                ? `គ្រាប់ឆៅ M23 · ${lastRefreshed ? `បានធ្វើបច្ចុប្បន្នភាពម៉ោង ${lastRefreshed}` : "ទិន្នន័យជាក់ស្ដែង"}`
                : `Raw nut M23 · ${lastRefreshed ? `Updated at ${lastRefreshed}` : "Real-time rates"}`}
            </div>
          </div>
        </div>

        {/* Refresh & Record buttons */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={fetchMarketPrices}
            disabled={loading}
            title={lang === "km" ? "ទាញយកតម្លៃថ្មី" : "Refresh prices"}
            className="p-1.5 rounded-lg border text-xs cursor-pointer transition-colors hover:bg-zinc-800 disabled:opacity-50"
            style={{ borderColor: "var(--border)", color: "var(--muted)" }}
          >
            <span className={`inline-block ${loading ? "animate-spin" : ""}`}>🔄</span>
          </button>
          <button
            onClick={() => setShowInputModal(true)}
            className="text-[10px] px-2 py-1 rounded-md font-semibold cursor-pointer border transition-colors flex items-center gap-1"
            style={{
              backgroundColor: "var(--accent-fill)",
              borderColor: "rgba(39, 166, 69, 0.4)",
              color: "var(--accent)",
            }}
          >
            <span>✏️</span>
            <span>{lang === "km" ? "កែតម្លៃ" : "Update"}</span>
          </button>
        </div>
      </div>

      {/* Average & Highest quick stats */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        <div
          className="rounded-xl px-3 py-2 text-center"
          style={{ backgroundColor: "#131e17", border: "1px solid rgba(39, 166, 69, 0.25)" }}
        >
          <div className="text-[10px] font-semibold" style={{ color: "var(--muted)" }}>
            {lang === "km" ? "តម្លៃមធ្យមទូទាំងប្រទេស" : "National Avg. Price"}
          </div>
          <div className="text-sm font-extrabold" style={{ color: "var(--accent)" }}>
            {avgPrice.toLocaleString()} ៛
          </div>
        </div>
        <div
          className="rounded-xl px-3 py-2 text-center"
          style={{ backgroundColor: "#1a1a0a", border: "1px solid rgba(212, 175, 55, 0.25)" }}
        >
          <div className="text-[10px] font-semibold" style={{ color: "var(--muted)" }}>
            {lang === "km" ? "តម្លៃខ្ពស់បំផុត" : "Highest Market Rate"}
          </div>
          <div className="text-sm font-extrabold text-[#d4af37]">
            {highestPrice.toLocaleString()} ៛
          </div>
        </div>
      </div>

      {/* Province price list */}
      <div className="space-y-1.5">
        {displayPrices.map((province) => {
          const isUserProvince =
            normalizedLocation.includes(province.nameEn.toLowerCase()) ||
            normalizedLocation.includes(province.nameKm);

          const trendIcon = province.trend === "up" ? "📈" : province.trend === "down" ? "📉" : "➡️";
          const trendStyle =
            province.trend === "up"
              ? { text: "#4ade80", bg: "#052e16" }
              : province.trend === "down"
              ? { text: "#f87171", bg: "#2a0a0a" }
              : { text: "#fbbf24", bg: "#2a2209" };

          return (
            <div
              key={province.id}
              className="rounded-xl px-3 py-2.5 flex items-center justify-between transition-all"
              style={{
                backgroundColor: isUserProvince ? "rgba(39, 166, 69, 0.08)" : "rgba(255,255,255,0.03)",
                border: isUserProvince
                  ? "1px solid rgba(39, 166, 69, 0.4)"
                  : "1px solid var(--border)",
              }}
            >
              <div className="flex items-center gap-2.5">
                <span className="text-sm">{trendIcon}</span>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold" style={{ color: "var(--text)" }}>
                      {lang === "km" ? province.nameKm : province.nameEn}
                    </span>
                    {isUserProvince && (
                      <span
                        className="text-[9px] px-1.5 py-0.2 rounded font-bold"
                        style={{ backgroundColor: "var(--accent)", color: "#fff" }}
                      >
                        {lang === "km" ? "ចម្ការអ្នក" : "Your Farm"}
                      </span>
                    )}
                    {province.isCustom && (
                      <span
                        className="text-[9px] px-1 py-0.2 rounded font-bold text-amber-300 bg-amber-950 border border-amber-600/40"
                        title={lang === "km" ? "តម្លៃកត់ត្រាផ្ទាល់ខ្លួន" : "Custom farmer price"}
                      >
                        {lang === "km" ? "កត់ត្រាផ្ទាល់" : "My Rate"}
                      </span>
                    )}
                  </div>
                  <div className="text-[10px]" style={{ color: "var(--muted)" }}>
                    {province.isCustom ? (
                      <button
                        onClick={() => handleResetPrice(province.id)}
                        className="text-[10px] text-amber-400 hover:underline cursor-pointer"
                      >
                        {lang === "km" ? "កំណត់ឡើងវិញ ↺" : "Reset to Market ↺"}
                      </button>
                    ) : (
                      lang === "km" ? "ធ្វើបច្ចុប្បន្នភាពថ្ងៃនេះ" : "Updated today"
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="text-right">
                  <div className="text-xs font-extrabold" style={{ color: "var(--text)" }}>
                    {province.priceRiel.toLocaleString()} ៛
                  </div>
                  <div className="text-[10px]" style={{ color: "var(--muted)" }}>
                    ${province.priceUSD}
                  </div>
                </div>
                <span
                  className="text-[10px] px-1.5 py-0.5 rounded-md font-bold"
                  style={{ backgroundColor: trendStyle.bg, color: trendStyle.text }}
                >
                  {province.changePercent}%
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Show more/less toggle */}
      {sortedPrices.length > 3 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full text-center text-[11px] font-semibold mt-2.5 py-1.5 rounded-lg cursor-pointer transition-colors"
          style={{ color: "var(--accent)", backgroundColor: "rgba(39, 166, 69, 0.08)" }}
        >
          {expanded
            ? lang === "km"
              ? "បង្រួម ▲"
              : "Show Less ▲"
            : lang === "km"
            ? `មើលខេត្តទាំងអស់ (${sortedPrices.length}) ▼`
            : `View All Provinces (${sortedPrices.length}) ▼`}
        </button>
      )}

      {/* Dynamic sell advice banner */}
      <div
        className="mt-3 p-2.5 rounded-xl text-[11px] font-semibold leading-relaxed"
        style={{
          backgroundColor: isUpTrend ? "#052e16" : "#2a2209",
          border: `1px solid ${isUpTrend ? "#4ade8033" : "#fbbf2433"}`,
          color: isUpTrend ? "#4ade80" : "#fbbf24",
        }}
      >
        {isUpTrend
          ? lang === "km"
            ? "📈 តម្លៃកំពុងឡើងទូទាំងប្រទេស — ជាឱកាសល្អក្នុងការចរចាលក់គ្រាប់ស្វាយចន្ទី!"
            : "📈 National trend is moving up — Good opportunity to negotiate and sell your harvest!"
          : lang === "km"
          ? "⏳ តម្លៃកំពុងប្រែប្រួល — ប្រសិនបើអាច សូមសម្ងួតគ្រាប់ទុកសិន ដើម្បីរង់ចាំតម្លៃប្រសើរ"
          : "⏳ Rates fluctuating — If properly sun-dried, consider holding stock for peak market window."}
      </div>

      {/* Custom Price Modal */}
      {showInputModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div
            className="w-full max-w-sm rounded-2xl p-5 border shadow-2xl"
            style={{ backgroundColor: "#181818", borderColor: "var(--border)" }}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span>✏️</span>
                <span>{lang === "km" ? "កត់ត្រាតម្លៃជាក់ស្ដែងនៅចម្ការ" : "Record Local Gate Price"}</span>
              </h3>
              <button
                onClick={() => setShowInputModal(false)}
                className="text-zinc-400 hover:text-white text-lg font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-zinc-400 mb-4 leading-relaxed">
              {lang === "km"
                ? "អ្នកអាចបញ្ចូលតម្លៃដែលឈ្មួញ ឬរោងចក្រកំពុងទិញជាក់ស្ដែងពីអ្នក ដើម្បីគណនាទិន្នន័យបានត្រឹមត្រូវបំផុត។"
                : "Enter the actual price traders or buyers are offering at your orchard to keep calculations precise."}
            </p>

            <form onSubmit={handleSaveCustomPrice} className="space-y-3.5">
              <div>
                <label className="text-[11px] font-semibold text-zinc-300 block mb-1">
                  {lang === "km" ? "ជ្រើសរើសខេត្ត" : "Select Province"}
                </label>
                <select
                  value={selectedProvinceId}
                  onChange={(e) => setSelectedProvinceId(e.target.value)}
                  className="w-full rounded-xl px-3 py-2 text-xs text-white border outline-hidden"
                  style={{ backgroundColor: "#222", borderColor: "var(--border)" }}
                >
                  {prices.map((p) => (
                    <option key={p.id} value={p.id}>
                      {lang === "km" ? p.nameKm : p.nameEn}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-zinc-300 block mb-1">
                  {lang === "km" ? "តម្លៃគ្រាប់ឆៅ (រៀល/គីឡូក្រាម)" : "Price per kg (Riel)"}
                </label>
                <input
                  type="number"
                  step="50"
                  placeholder="e.g. 6800"
                  value={customPriceInput}
                  onChange={(e) => setCustomPriceInput(e.target.value)}
                  required
                  min="2000"
                  max="25000"
                  className="w-full rounded-xl px-3 py-2 text-sm font-bold text-white border outline-hidden"
                  style={{ backgroundColor: "#222", borderColor: "var(--border)" }}
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowInputModal(false)}
                  className="flex-1 py-2 rounded-xl text-xs font-semibold text-zinc-400 border border-zinc-700 hover:bg-zinc-800 cursor-pointer"
                >
                  {lang === "km" ? "បោះបង់" : "Cancel"}
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl text-xs font-bold text-white transition-opacity hover:opacity-90 cursor-pointer"
                  style={{ backgroundColor: "var(--accent)" }}
                >
                  {lang === "km" ? "រក្សាទុក ✓" : "Save Price ✓"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
