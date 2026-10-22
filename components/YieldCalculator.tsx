"use client";

import { useState } from "react";
import type { Language } from "@/types/agronomy";
import { calculateYieldAndProfit } from "@/lib/calculator";

interface YieldCalculatorProps {
  lang: Language;
}

export default function YieldCalculator({ lang }: YieldCalculatorProps) {
  const [hectares, setHectares] = useState<number>(1);
  const [treesPerHa, setTreesPerHa] = useState<number>(180);
  const [yieldPerTree, setYieldPerTree] = useState<number>(18); // kg per tree
  const [pricePerKg, setPricePerKg] = useState<number>(6500); // Riels per kg (~$1.60)

  const totalTrees = Math.round(hectares * treesPerHa);
  const {
    totalYieldKg,
    totalYieldTons,
    totalRevenueRiels,
    totalRevenueUSD,
    estimatedCostRiels,
    netProfitRiels,
    netProfitUSD,
  } = calculateYieldAndProfit({
    trees: totalTrees,
    yieldPerTree,
    pricePerKg,
  });

  return (
    <div
      className="rounded-2xl p-4 shadow-sm"
      style={{ backgroundColor: "var(--card)", border: "1px solid #2e2e2e" }}
    >
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="font-bold text-sm" style={{ color: "var(--text)" }}>
            {lang === "km" ? "📊 ការគណនាទិន្នផល និងចំណូល M23" : "📊 M23 Yield & Revenue Calculator"}
          </div>
          <div className="text-xs" style={{ color: "var(--muted)" }}>
            {lang === "km" ? "ប៉ាន់ស្មានផលទុន និងប្រាក់ចំណេញរដូវប្រមូលផល" : "Estimate harvest yield, revenue & profit"}
          </div>
        </div>
        <span
          className="text-[11px] px-2 py-1 rounded-lg font-semibold"
          style={{ backgroundColor: "var(--accent-fill)", color: "var(--accent-bright)" }}
        >
          {lang === "km" ? "គំរូ M23" : "M23 Model"}
        </span>
      </div>

      {/* Inputs grid */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div>
          <label className="block text-[11px] mb-1" style={{ color: "var(--muted)" }}>
            {lang === "km" ? "ផ្ទៃដីចម្ការ (ហិកតា / Hectares)" : "Orchard Size (Hectares)"}
          </label>
          <input
            type="number"
            min="0.1"
            step="0.5"
            value={hectares}
            onChange={(e) => setHectares(Math.max(0.1, parseFloat(e.target.value) || 1))}
            className="w-full px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#1a1a1a] text-white border border-[#3f3f3f] focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div>
          <label className="block text-[11px] mb-1" style={{ color: "var(--muted)" }}>
            {lang === "km" ? "ដើមក្នុង ១ ហិកតា (Trees/Ha)" : "Trees per Hectare"}
          </label>
          <input
            type="number"
            min="50"
            max="300"
            value={treesPerHa}
            onChange={(e) => setTreesPerHa(parseInt(e.target.value) || 180)}
            className="w-full px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#1a1a1a] text-white border border-[#3f3f3f] focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div>
          <label className="block text-[11px] mb-1" style={{ color: "var(--muted)" }}>
            {lang === "km" ? "ផលក្នុងមួយដើម (គ.ក្រ / ដើម)" : "Yield per Tree (kg)"}
          </label>
          <input
            type="number"
            min="5"
            max="50"
            value={yieldPerTree}
            onChange={(e) => setYieldPerTree(parseFloat(e.target.value) || 18)}
            className="w-full px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#1a1a1a] text-white border border-[#3f3f3f] focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div>
          <label className="block text-[11px] mb-1" style={{ color: "var(--muted)" }}>
            {lang === "km" ? "តម្លៃគ្រាប់ឆៅ (រៀល/គ.ក្រ)" : "Price per kg (Riels)"}
          </label>
          <input
            type="number"
            step="500"
            value={pricePerKg}
            onChange={(e) => setPricePerKg(parseInt(e.target.value) || 6500)}
            className="w-full px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#1a1a1a] text-white border border-[#3f3f3f] focus:outline-none focus:border-emerald-500"
          />
        </div>
      </div>

      {/* Results Box */}
      <div
        className="rounded-xl p-3.5 space-y-2.5"
        style={{ backgroundColor: "#142920", border: "1px solid #2d6a4f44" }}
      >
        <div className="flex items-center justify-between text-xs">
          <span style={{ color: "var(--muted)" }}>
            {lang === "km" ? "ចំនួនដើមសរុប (Total Trees):" : "Total Trees:"}
          </span>
          <span className="font-bold text-white">{totalTrees.toLocaleString()} ដើម</span>
        </div>

        <div className="flex items-center justify-between text-xs">
          <span style={{ color: "var(--muted)" }}>
            {lang === "km" ? "ទិន្នផលសរុប (Total Yield):" : "Total Yield:"}
          </span>
          <span className="font-bold" style={{ color: "var(--accent-bright)" }}>
            {totalYieldKg.toLocaleString()} kg ({totalYieldTons} tons)
          </span>
        </div>

        <div className="flex items-center justify-between text-xs">
          <span style={{ color: "var(--muted)" }}>
            {lang === "km" ? "ចំណូលសរុប (Gross Revenue):" : "Gross Revenue:"}
          </span>
          <span className="font-bold text-emerald-400">
            {totalRevenueRiels.toLocaleString()} Riels (~${totalRevenueUSD})
          </span>
        </div>

        <div className="pt-2 border-t border-[#2d6a4f66] flex items-center justify-between text-xs">
          <div>
            <div className="font-bold text-white">
              {lang === "km" ? "ប្រាក់ចំណេញសុទ្ធ (Net Profit):" : "Estimated Net Profit:"}
            </div>
            <div className="text-[10px]" style={{ color: "var(--muted)" }}>
              {lang === "km" ? "หັກការចំណាយជី/ថ្នាំ ~20%" : "After ~20% fertilizer/pest cost"}
            </div>
          </div>
          <div className="text-right">
            <div className="font-bold text-sm text-emerald-300">
              {netProfitRiels.toLocaleString()} Riels
            </div>
            <div className="text-xs" style={{ color: "var(--accent-bright)" }}>
              ~${netProfitUSD}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
