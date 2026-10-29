"use client";

import { useState, useEffect } from "react";
import type { Language } from "@/types/agronomy";

export type BuyerType = "factory" | "cooperative" | "trader" | "exporter";

export interface Buyer {
  id: string;
  nameEn: string;
  nameKm: string;
  type: BuyerType;
  icon: string;
  locationEn: string;
  locationKm: string;
  phone: string;
  descEn: string;
  descKm: string;
  buysRaw: boolean;
  buysProcessed: boolean;
  minQtyKg?: number;
  priceRangeEn?: string;
  priceRangeKm?: string;
  verified: boolean;
  isUserAdded?: boolean;
  addedBy?: string;
}

function getBuyerTypeLabel(type: BuyerType, lang: Language) {
  const labels: Record<BuyerType, { en: string; km: string }> = {
    factory: { en: "Factory", km: "រោងចក្រ" },
    cooperative: { en: "Cooperative", km: "សហករណ៍" },
    trader: { en: "Trader", km: "ឈ្មួញ" },
    exporter: { en: "Exporter", km: "នាំចេញ" },
  };
  return lang === "km" ? labels[type].km : labels[type].en;
}

function getBuyerTypeColor(type: BuyerType) {
  switch (type) {
    case "cooperative":
      return { text: "#4ade80", bg: "#052e16", border: "rgba(74,222,128,0.3)" };
    case "factory":
      return { text: "#60a5fa", bg: "#0c1e3a", border: "rgba(96,165,250,0.3)" };
    case "trader":
      return { text: "#fbbf24", bg: "#2a2209", border: "rgba(251,191,36,0.3)" };
    case "exporter":
      return { text: "#c084fc", bg: "#1e0a3a", border: "rgba(192,132,252,0.3)" };
  }
}

interface BuyerDirectoryCardProps {
  lang?: Language;
  location?: string;
}

export default function BuyerDirectoryCard({ lang = "km", location = "Kampong Cham" }: BuyerDirectoryCardProps) {
  const [buyers, setBuyers] = useState<Buyer[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [filterType, setFilterType] = useState<BuyerType | "all">("all");
  const [showAddModal, setShowAddModal] = useState(false);

  // New buyer form fields
  const [newBuyerName, setNewBuyerName] = useState("");
  const [newBuyerPhone, setNewBuyerPhone] = useState("");
  const [newBuyerLocation, setNewBuyerLocation] = useState(location);
  const [newBuyerType, setNewBuyerType] = useState<BuyerType>("trader");
  const [newBuyerPrice, setNewBuyerPrice] = useState("");
  const [farmerName, setFarmerName] = useState("");

  // Fetch shared buyers from server API
  async function loadBuyers() {
    try {
      setLoading(true);
      const res = await fetch("/api/buyers", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        if (data.buyers && Array.isArray(data.buyers)) {
          setBuyers(data.buyers);
        }
      }
    } catch (err) {
      console.error("Failed to fetch buyers", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadBuyers();
  }, []);

  // Submit new buyer to server API so ALL users see it
  async function handleAddBuyer(e: React.FormEvent) {
    e.preventDefault();
    if (!newBuyerName.trim() || !newBuyerPhone.trim()) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/buyers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nameEn: newBuyerName.trim(),
          nameKm: newBuyerName.trim(),
          type: newBuyerType,
          locationEn: newBuyerLocation || location,
          locationKm: newBuyerLocation || location,
          phone: newBuyerPhone.trim(),
          priceRangeEn: newBuyerPrice ? `${newBuyerPrice} ៛/kg` : undefined,
          priceRangeKm: newBuyerPrice ? `${newBuyerPrice} ៛/គក` : undefined,
          addedBy: farmerName.trim() || undefined,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.buyers) {
          setBuyers(data.buyers);
        } else if (data.buyer) {
          setBuyers((prev) => [data.buyer, ...prev]);
        }
        setShowAddModal(false);
        setNewBuyerName("");
        setNewBuyerPhone("");
        setNewBuyerPrice("");
        setFarmerName("");
      }
    } catch (err) {
      console.error("Failed to save buyer", err);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDeleteBuyer(buyerId: string) {
    try {
      const res = await fetch(`/api/buyers?id=${buyerId}`, { method: "DELETE" });
      if (res.ok) {
        setBuyers((prev) => prev.filter((b) => b.id !== buyerId));
      }
    } catch (err) {
      console.error("Failed to delete buyer", err);
    }
  }

  // Filter
  const filtered = filterType === "all" ? buyers : buyers.filter((b) => b.type === filterType);

  // Sort buyers: user's nearby province first
  const normalizedLocation = (location || "").toLowerCase();
  const sortedBuyers = [...filtered].sort((a, b) => {
    const aMatch =
      normalizedLocation.includes(a.locationEn.toLowerCase()) ||
      normalizedLocation.includes(a.locationKm);
    const bMatch =
      normalizedLocation.includes(b.locationEn.toLowerCase()) ||
      normalizedLocation.includes(b.locationKm);
    if (aMatch && !bMatch) return -1;
    if (!aMatch && bMatch) return 1;
    return 0;
  });

  const displayBuyers = expanded ? sortedBuyers : sortedBuyers.slice(0, 2);

  const filterOptions: Array<{ value: BuyerType | "all"; labelEn: string; labelKm: string }> = [
    { value: "all", labelEn: "All", labelKm: "ទាំងអស់" },
    { value: "cooperative", labelEn: "Co-ops", labelKm: "សហករណ៍" },
    { value: "factory", labelEn: "Factory", labelKm: "រោងចក្រ" },
    { value: "trader", labelEn: "Traders", labelKm: "ឈ្មួញ" },
    { value: "exporter", labelEn: "Export", labelKm: "នាំចេញ" },
  ];

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
          <span className="text-xl">🤝</span>
          <div>
            <div className="font-bold text-sm" style={{ color: "var(--text)" }}>
              {lang === "km" ? "បញ្ជីអ្នកទិញ និងសហករណ៍ (សហគមន៍)" : "Community Buyer Directory"}
            </div>
            <div className="text-[10px]" style={{ color: "var(--muted)" }}>
              {lang === "km"
                ? `${buyers.length} អ្នកទិញសកម្ម · ចែករំលែករួមក្នុងសហគមន៍`
                : `${buyers.length} active buyers · Shared across all farmers`}
            </div>
          </div>
        </div>

        {/* Add buyer button */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={loadBuyers}
            disabled={loading}
            title={lang === "km" ? "ទាញយកឡើងវិញ" : "Reload"}
            className="p-1 rounded-lg border text-xs cursor-pointer hover:bg-zinc-800 disabled:opacity-50"
            style={{ borderColor: "var(--border)", color: "var(--muted)" }}
          >
            <span className={`inline-block ${loading ? "animate-spin" : ""}`}>🔄</span>
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="text-[10px] px-2.5 py-1 rounded-md font-semibold cursor-pointer border transition-colors flex items-center gap-1"
            style={{
              backgroundColor: "var(--accent-fill)",
              borderColor: "rgba(39, 166, 69, 0.4)",
              color: "var(--accent)",
            }}
          >
            <span>➕</span>
            <span>{lang === "km" ? "ចែករំលែកអ្នកទិញ" : "Share Buyer"}</span>
          </button>
        </div>
      </div>

      {/* Filter chips */}
      <div className="flex gap-1.5 mb-3 overflow-x-auto no-scrollbar pb-0.5">
        {filterOptions.map((opt) => {
          const isActive = filterType === opt.value;
          return (
            <button
              key={opt.value}
              onClick={() => {
                setFilterType(opt.value);
                setExpanded(false);
              }}
              className="text-[10px] px-2.5 py-1 rounded-full font-semibold whitespace-nowrap cursor-pointer transition-all shrink-0"
              style={{
                backgroundColor: isActive ? "var(--accent)" : "rgba(255,255,255,0.05)",
                color: isActive ? "#fff" : "var(--muted)",
                border: isActive ? "1px solid var(--accent)" : "1px solid var(--border)",
              }}
            >
              {lang === "km" ? opt.labelKm : opt.labelEn}
            </button>
          );
        })}
      </div>

      {/* Buyer list */}
      <div className="space-y-2">
        {displayBuyers.map((buyer) => {
          const typeColor = getBuyerTypeColor(buyer.type);
          const isNearby =
            normalizedLocation.includes(buyer.locationEn.toLowerCase()) ||
            normalizedLocation.includes(buyer.locationKm);

          return (
            <div
              key={buyer.id}
              className="rounded-xl px-3 py-3"
              style={{
                backgroundColor: isNearby ? "rgba(39, 166, 69, 0.05)" : "rgba(255,255,255,0.03)",
                border: isNearby ? "1px solid rgba(39, 166, 69, 0.3)" : "1px solid var(--border)",
              }}
            >
              {/* Buyer header */}
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{buyer.icon}</span>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold" style={{ color: "var(--text)" }}>
                        {lang === "km" ? buyer.nameKm : buyer.nameEn}
                      </span>
                      {buyer.isUserAdded && (
                        <span className="text-[9px] px-1.5 py-0.2 rounded font-bold text-amber-300 bg-amber-950 border border-amber-500/30">
                          {lang === "km" ? "សហគមន៍ចែករំលែក" : "Community Shared"}
                        </span>
                      )}
                      {buyer.verified && (
                        <span className="text-[10px]" title="Verified">
                          ✅
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span
                        className="text-[9px] px-1.5 py-0.5 rounded-md font-bold"
                        style={{
                          backgroundColor: typeColor.bg,
                          color: typeColor.text,
                          border: `1px solid ${typeColor.border}`,
                        }}
                      >
                        {getBuyerTypeLabel(buyer.type, lang)}
                      </span>
                      <span className="text-[10px] flex items-center gap-0.5" style={{ color: "var(--muted)" }}>
                        📍 {lang === "km" ? buyer.locationKm : buyer.locationEn}
                        {isNearby && <span className="text-[#27a645] font-bold ml-1">({lang === "km" ? "ជិតចម្ការ" : "Nearby"})</span>}
                      </span>
                    </div>
                  </div>
                </div>

                {buyer.isUserAdded && (
                  <button
                    onClick={() => handleDeleteBuyer(buyer.id)}
                    className="text-zinc-500 hover:text-red-400 text-xs p-1 cursor-pointer"
                    title={lang === "km" ? "លុប" : "Delete"}
                  >
                    🗑️
                  </button>
                )}
              </div>

              {/* Description */}
              <div className="text-[11px] leading-relaxed mb-2" style={{ color: "var(--muted)" }}>
                {lang === "km" ? buyer.descKm : buyer.descEn}
              </div>

              {/* Price range and contact */}
              <div
                className="flex items-center justify-between p-2 rounded-lg"
                style={{
                  backgroundColor: "rgba(0,0,0,0.3)",
                  border: "1px solid var(--border)",
                }}
              >
                <div>
                  {buyer.priceRangeEn ? (
                    <div className="text-[10px] font-bold" style={{ color: "var(--accent)" }}>
                      💰 {lang === "km" ? buyer.priceRangeKm : buyer.priceRangeEn}
                    </div>
                  ) : (
                    <div className="text-[10px] text-zinc-500">
                      {lang === "km" ? "តម្លៃចរចាជាក់ស្ដែង" : "Negotiated price"}
                    </div>
                  )}
                  {buyer.addedBy && (
                    <div className="text-[9px] text-zinc-500">
                      {lang === "km" ? `ចែករំលែកដោយ: ${buyer.addedBy}` : `Added by: ${buyer.addedBy}`}
                    </div>
                  )}
                </div>
                <a
                  href={`tel:${buyer.phone.replace(/[\s-]/g, "")}`}
                  className="text-[10px] px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 transition-opacity hover:opacity-80"
                  style={{
                    backgroundColor: "var(--accent)",
                    color: "#fff",
                  }}
                >
                  📞 {lang === "km" ? "ទូរស័ព្ទ" : "Call"} {buyer.phone}
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Show more/less */}
      {sortedBuyers.length > 2 && (
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
            ? `មើលអ្នកទិញទាំងអស់ (${sortedBuyers.length}) ▼`
            : `View All Buyers (${sortedBuyers.length}) ▼`}
        </button>
      )}

      {/* Modal to add new community buyer */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div
            className="w-full max-w-sm rounded-2xl p-5 border shadow-2xl"
            style={{ backgroundColor: "#181818", borderColor: "var(--border)" }}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span>🤝</span>
                <span>{lang === "km" ? "ចែករំលែកអ្នកទិញទៅសហគមន៍" : "Share Buyer With Community"}</span>
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-zinc-400 hover:text-white text-lg font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-zinc-400 mb-3">
              {lang === "km"
                ? "ព័ត៌មានដែលអ្នកបញ្ចូល នឹងត្រូវបានចែករំលែកទៅកាន់កសិករស្វាយចន្ទីដទៃទៀត ដើម្បីជួយគ្នាទៅវិញទៅមក។"
                : "The buyer details you add will be shared with other cashew farmers to help everyone get fair market access."}
            </p>

            <form onSubmit={handleAddBuyer} className="space-y-3">
              <div>
                <label className="text-[11px] font-semibold text-zinc-300 block mb-1">
                  {lang === "km" ? "ឈ្មោះអ្នកទិញ / ក្រុមហ៊ុន" : "Buyer Name / Trader"}
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. ឈ្មួញ សុខា ឬ រោងចក្រស្នួល"
                  value={newBuyerName}
                  onChange={(e) => setNewBuyerName(e.target.value)}
                  className="w-full rounded-xl px-3 py-2 text-xs text-white border outline-hidden"
                  style={{ backgroundColor: "#222", borderColor: "var(--border)" }}
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-zinc-300 block mb-1">
                  {lang === "km" ? "លេខទូរស័ព្ទ" : "Phone Number"}
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. +855 12 345 678"
                  value={newBuyerPhone}
                  onChange={(e) => setNewBuyerPhone(e.target.value)}
                  className="w-full rounded-xl px-3 py-2 text-xs text-white border outline-hidden"
                  style={{ backgroundColor: "#222", borderColor: "var(--border)" }}
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] font-semibold text-zinc-300 block mb-1">
                    {lang === "km" ? "ប្រភេទ" : "Type"}
                  </label>
                  <select
                    value={newBuyerType}
                    onChange={(e) => setNewBuyerType(e.target.value as BuyerType)}
                    className="w-full rounded-xl px-3 py-2 text-xs text-white border outline-hidden"
                    style={{ backgroundColor: "#222", borderColor: "var(--border)" }}
                  >
                    <option value="trader">{lang === "km" ? "ឈ្មួញមូលដ្ឋាន" : "Local Trader"}</option>
                    <option value="cooperative">{lang === "km" ? "សហករណ៍" : "Cooperative"}</option>
                    <option value="factory">{lang === "km" ? "រោងចក្រ" : "Factory"}</option>
                    <option value="exporter">{lang === "km" ? "ក្រុមហ៊ុននាំចេញ" : "Exporter"}</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-zinc-300 block mb-1">
                    {lang === "km" ? "ខេត្ត/ទីតាំង" : "Province"}
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Kampong Cham"
                    value={newBuyerLocation}
                    onChange={(e) => setNewBuyerLocation(e.target.value)}
                    className="w-full rounded-xl px-3 py-2 text-xs text-white border outline-hidden"
                    style={{ backgroundColor: "#222", borderColor: "var(--border)" }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] font-semibold text-zinc-300 block mb-1">
                    {lang === "km" ? "តម្លៃទិញ (រៀល/គក)" : "Offered Price (៛/kg)"}
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 6,800"
                    value={newBuyerPrice}
                    onChange={(e) => setNewBuyerPrice(e.target.value)}
                    className="w-full rounded-xl px-3 py-2 text-xs text-white border outline-hidden"
                    style={{ backgroundColor: "#222", borderColor: "var(--border)" }}
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-zinc-300 block mb-1">
                    {lang === "km" ? "ឈ្មោះអ្នកចែករំលែក" : "Your Name / Farm"}
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. សុខា"
                    value={farmerName}
                    onChange={(e) => setFarmerName(e.target.value)}
                    className="w-full rounded-xl px-3 py-2 text-xs text-white border outline-hidden"
                    style={{ backgroundColor: "#222", borderColor: "var(--border)" }}
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-2 rounded-xl text-xs font-semibold text-zinc-400 border border-zinc-700 hover:bg-zinc-800 cursor-pointer"
                >
                  {lang === "km" ? "បោះបង់" : "Cancel"}
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 py-2 rounded-xl text-xs font-bold text-white transition-opacity hover:opacity-90 cursor-pointer disabled:opacity-50"
                  style={{ backgroundColor: "var(--accent)" }}
                >
                  {submitting
                    ? lang === "km" ? "កំពុងរក្សាទុក..." : "Saving..."
                    : lang === "km" ? "ចែករំលែក ✓" : "Share Now ✓"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
