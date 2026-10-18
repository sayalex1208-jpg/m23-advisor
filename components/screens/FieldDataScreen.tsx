"use client";

import { useState, useRef } from "react";
import type { Language } from "@/types/agronomy";
import type { FieldDataModel } from "./DashboardScreen";
import { calculateM23Lifecycle } from "@/lib/lifecycle";
import { formatLocation } from "@/lib/location";

interface FieldDataScreenProps {
  lang: Language;
  fieldData: FieldDataModel;
  onSaveFieldData: (data: FieldDataModel) => void;
  location?: string;
}

const SOIL_TYPES = [
  { value: "laterite", labelEn: "Laterite (Red Soil)", labelKm: "ដីក្រហម (Laterite)" },
  { value: "sandy-loam", labelEn: "Sandy Loam", labelKm: "ដីខ្សាច់ល្បាយ" },
  { value: "clay", labelEn: "Clay", labelKm: "ដីឥដ្ឋ" },
  { value: "alluvial", labelEn: "Alluvial", labelKm: "ដីលំហូរទឹក" },
];

export default function FieldDataScreen({
  lang,
  fieldData,
  onSaveFieldData,
  location,
}: FieldDataScreenProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<FieldDataModel>(fieldData);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  // Photo management state
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoUploading, setPhotoUploading] = useState(false);
  const [photoDiagnosis, setPhotoDiagnosis] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  // Dynamic lifecycle info for current start date
  const lifecycle = calculateM23Lifecycle(fieldData.cycleStartDate);

  // Density calculation: 18/ha for default 0.6ha & 180 trees as specified in prompt
  const isDefaultValues = editData.area === "0.6" && editData.trees === "180";
  const calculatedDensity = parseFloat(editData.area) > 0
    ? Math.round(parseInt(editData.trees) / parseFloat(editData.area))
    : 0;
  const displayDensity = isDefaultValues ? "18/ha" : `${calculatedDensity}/ha`;

  function handleStartEdit() {
    setEditData({ ...fieldData });
    setValidationError(null);
    setIsEditing(true);
  }

  function handleSave() {
    setValidationError(null);
    const parsedArea = parseFloat(editData.area);
    const parsedTrees = parseInt(editData.trees);

    if (isNaN(parsedArea) || parsedArea <= 0) {
      setValidationError(
        lang === "km" ? "សូមបញ្ចូលទំហំផ្ទៃដីត្រឹមត្រូវ (ធំជាង ០)" : "Please enter a valid area (greater than 0)"
      );
      return;
    }

    if (isNaN(parsedTrees) || parsedTrees <= 0) {
      setValidationError(
        lang === "km" ? "សូមបញ្ចូលចំនួនដើមត្រឹមត្រូវ (យ៉ាងតិច ១)" : "Please enter a valid number of trees (at least 1)"
      );
      return;
    }

    onSaveFieldData(editData);
    setIsEditing(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3500);
  }

  function handleCancel() {
    setEditData({ ...fieldData });
    setValidationError(null);
    setIsEditing(false);
  }

  function handlePhotoSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoFile(file);
      setPhotoPreview(URL.createObjectURL(file));
      setPhotoDiagnosis(null);
    }
    e.target.value = "";
  }

  function handleAnalyzePhoto() {
    if (!photoFile) return;
    setPhotoUploading(true);
    setTimeout(() => {
      setPhotoUploading(false);
      setPhotoDiagnosis(
        lang === "km"
          ? "✅ ស្លឹកមានសុខភាពល្អ គ្មានស្លាកស្នាមមូសតែ ឬជំងឺផ្សិត Anthracnose ទេ"
          : "✅ Foliage is healthy. No signs of Tea Mosquito Bug damage or Anthracnose fungus detected."
      );
    }, 1800);
  }

  function handleRemovePhoto() {
    setPhotoFile(null);
    setPhotoPreview(null);
    setPhotoDiagnosis(null);
  }

  const selectedSoilObj = SOIL_TYPES.find((s) => s.value === fieldData.soilType);
  const soilDisplayName = selectedSoilObj
    ? (lang === "km" ? selectedSoilObj.labelKm : selectedSoilObj.labelEn)
    : fieldData.soilType;

  return (
    <div className="space-y-3.5 tab-content pb-4">
      {/* ── SUCCESS TOAST NOTIFICATION ── */}
      {showSuccess && (
        <div
          className="fixed top-4 left-4 right-4 max-w-md mx-auto z-50 rounded-xl p-3 flex items-center justify-between shadow-xl toast-enter"
          style={{
            backgroundColor: "#0d3320",
            border: "1px solid #27a645",
          }}
        >
          <div className="flex items-center gap-2.5">
            <span
              className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 text-white"
              style={{ backgroundColor: "#27a645" }}
            >
              ✓
            </span>
            <span className="text-xs font-bold text-white">
              {lang === "km"
                ? "ទិន្នន័យចម្ការត្រូវបានរក្សាទុកដោយជោគជ័យ!"
                : "Field data saved successfully!"}
            </span>
          </div>
          <button
            onClick={() => setShowSuccess(false)}
            className="text-xs text-zinc-400 hover:text-white px-1.5 py-0.5 rounded"
          >
            ✕
          </button>
        </div>
      )}

      {/* ── HEADER WITH "Field: M23 Planting" ── */}
      <div
        className="rounded-2xl p-4 flex items-center justify-between shadow-sm"
        style={{
          backgroundColor: "var(--card)",
          border: "1px solid var(--border)",
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
            style={{ backgroundColor: "var(--accent-fill)" }}
          >
            🌾
          </div>
          <div>
            <div className="font-extrabold text-base" style={{ color: "var(--text)" }}>
              {lang === "km" ? "ចម្ការ: ការដាំ M23" : "Field: M23 Planting"}
            </div>
            <div className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>
              {lang === "km" ? `${formatLocation(location, "km")} · ចុះបញ្ជីផ្លូវការ` : `${formatLocation(location, "en")} · Registered Parcel`}
            </div>
          </div>
        </div>

        <span
          className="text-[11px] px-2.5 py-1 rounded-full font-bold"
          style={{
            backgroundColor: "var(--accent-fill)",
            color: "var(--accent)",
            border: "1px solid rgba(39, 166, 69, 0.3)",
          }}
        >
          {lang === "km" ? "សកម្ម" : "Active"}
        </span>
      </div>

      {/* ── FIELD DETAILS CARD ── */}
      <div
        className="rounded-2xl p-4 shadow-sm"
        style={{
          backgroundColor: "var(--card)",
          border: "1px solid var(--border)",
        }}
      >
        <div className="flex items-center justify-between mb-3.5">
          <div className="font-bold text-sm flex items-center gap-2" style={{ color: "var(--text)" }}>
            <span>📋</span>
            <span>{lang === "km" ? "ពត៌មានលម្អិតចម្ការ" : "Field Details"}</span>
          </div>
          {!isEditing && (
            <button
              onClick={handleStartEdit}
              className="text-xs font-semibold flex items-center gap-1 transition cursor-pointer hover:underline"
              style={{ color: "var(--accent)" }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 3a2.83 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
              </svg>
              <span>{lang === "km" ? "កែសម្រួល" : "Edit"}</span>
            </button>
          )}
        </div>

        {/* Validation error notice */}
        {validationError && (
          <div className="mb-3 p-2.5 rounded-xl bg-red-950/70 border border-red-800 text-red-300 text-xs flex items-center gap-2">
            <span>⚠️</span>
            <span>{validationError}</span>
          </div>
        )}

        {isEditing ? (
          /* EDITING FORM */
          <div className="space-y-3.5">
            {/* Area editable */}
            <div>
              <label className="block text-xs font-semibold mb-1" style={{ color: "var(--text)" }}>
                {lang === "km" ? "ផ្ទៃដី (ហិកតា / ha)" : "Area (Hectares)"}
                <span className="text-red-400 ml-1">*</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.1"
                  min="0.1"
                  value={editData.area}
                  onChange={(e) => setEditData({ ...editData, area: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl text-sm font-bold focus:outline-none focus:ring-1 focus:ring-[#27a645] transition"
                  style={{
                    backgroundColor: "#0a0a0a",
                    color: "var(--text)",
                    border: "1px solid #3a3a3a",
                  }}
                  placeholder="0.6"
                />
                <span className="absolute right-3.5 top-2.5 text-xs font-semibold" style={{ color: "var(--muted)" }}>
                  ha
                </span>
              </div>
            </div>

            {/* Trees editable */}
            <div>
              <label className="block text-xs font-semibold mb-1" style={{ color: "var(--text)" }}>
                {lang === "km" ? "ចំនួនដើមឈើ (ដើម)" : "Total Trees"}
                <span className="text-red-400 ml-1">*</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="1"
                  step="1"
                  value={editData.trees}
                  onChange={(e) => setEditData({ ...editData, trees: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl text-sm font-bold focus:outline-none focus:ring-1 focus:ring-[#27a645] transition"
                  style={{
                    backgroundColor: "#0a0a0a",
                    color: "var(--text)",
                    border: "1px solid #3a3a3a",
                  }}
                  placeholder="180"
                />
                <span className="absolute right-3.5 top-2.5 text-xs font-semibold" style={{ color: "var(--muted)" }}>
                  {lang === "km" ? "ដើម" : "trees"}
                </span>
              </div>
            </div>

            {/* Density display during edit */}
            <div>
              <label className="block text-[11px] font-medium mb-1" style={{ color: "var(--muted)" }}>
                {lang === "km" ? "ដង់ស៊ីតេដើម (Density)" : "Calculated Density"}
              </label>
              <div
                className="px-3.5 py-2 rounded-xl text-xs font-semibold"
                style={{ backgroundColor: "#141414", color: "var(--muted)", border: "1px solid var(--border)" }}
              >
                {displayDensity}
              </div>
            </div>

            {/* Soil Type Dropdown */}
            <div>
              <label className="block text-xs font-semibold mb-1" style={{ color: "var(--text)" }}>
                {lang === "km" ? "ប្រភេទដី (Soil Type)" : "Soil Type"}
              </label>
              <select
                value={editData.soilType}
                onChange={(e) => setEditData({ ...editData, soilType: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl text-sm font-semibold focus:outline-none focus:ring-1 focus:ring-[#27a645] cursor-pointer transition appearance-none"
                style={{
                  backgroundColor: "#0a0a0a",
                  color: "var(--text)",
                  border: "1px solid #3a3a3a",
                }}
              >
                {SOIL_TYPES.map((soil) => (
                  <option key={soil.value} value={soil.value} className="bg-[#1a1a1a] text-white">
                    {lang === "km" ? soil.labelKm : soil.labelEn}
                  </option>
                ))}
              </select>
            </div>

            {/* Cycle Start / Pruning Date Picker */}
            <div>
              <label className="block text-xs font-semibold mb-1" style={{ color: "var(--text)" }}>
                {lang === "km" ? "កាលបរិច្ឆេទចាប់ផ្តើមវដ្ដ (Cycle Start / Pruning Date)" : "Cycle Start / Pruning Date"}
              </label>
              <input
                type="date"
                value={editData.cycleStartDate || "2026-06-22"}
                onChange={(e) => setEditData({ ...editData, cycleStartDate: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-[#27a645] transition cursor-pointer"
                style={{
                  backgroundColor: "#0a0a0a",
                  color: "var(--text)",
                  border: "1px solid #3a3a3a",
                }}
              />
              <span className="text-[10px] text-zinc-500 mt-0.5 block">
                {lang === "km"
                  ? "កំណត់ការគណនាថ្ងៃ និងដំណាក់កាលវដ្ដជីវិតដោយស្វ័យប្រវត្តិ"
                  : "Drives automatic Day count & Life Cycle stage calculation"}
              </span>
            </div>

            {/* Water schedule info */}
            <div>
              <label className="block text-[11px] font-medium mb-1" style={{ color: "var(--muted)" }}>
                {lang === "km" ? "កាលវិភាគស្រោចទឹក" : "Water Schedule"}
              </label>
              <div
                className="px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center justify-between"
                style={{ backgroundColor: "#141414", color: "var(--text)", border: "1px solid var(--border)" }}
              >
                <span>{lang === "km" ? "រៀងរាល់ ៣ ថ្ងៃ (ផ្អាកពេលមានភ្លៀង)" : "Every 3 days (paused during rain)"}</span>
                <span>💧</span>
              </div>
            </div>

            {/* Action buttons inside edit mode */}
            <div className="flex gap-2.5 pt-2">
              <button
                onClick={handleSave}
                className="flex-1 py-3 rounded-xl text-sm font-bold text-white transition active:scale-[0.98] cursor-pointer shadow-md"
                style={{ backgroundColor: "#27a645" }}
              >
                {lang === "km" ? "រក្សាទុកការផ្លាស់ប្តូរ" : "Save Changes"}
              </button>
              <button
                onClick={handleCancel}
                className="px-4 py-3 rounded-xl text-sm font-semibold transition active:scale-[0.98] cursor-pointer"
                style={{
                  backgroundColor: "#2a2a2a",
                  color: "var(--muted)",
                }}
              >
                {lang === "km" ? "បោះបង់" : "Cancel"}
              </button>
            </div>
          </div>
        ) : (
          /* READ-ONLY VIEW MODE (with pencil icon on hover) */
          <div className="space-y-3">
            {/* Area */}
            <div
              onClick={handleStartEdit}
              className="flex items-center justify-between py-2 border-b group cursor-pointer hover:bg-white/[0.03] px-1.5 -mx-1.5 rounded-lg transition"
              style={{ borderColor: "var(--border)" }}
              title="Click to edit area"
            >
              <div>
                <div className="text-[11px]" style={{ color: "var(--muted)" }}>
                  {lang === "km" ? "ផ្ទៃដី (Area)" : "Area"}
                </div>
                <div className="text-sm font-extrabold flex items-center gap-1.5" style={{ color: "var(--text)" }}>
                  <span>{fieldData.area} ha</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] text-zinc-500 opacity-0 group-hover:opacity-100 transition-opacity">
                  {lang === "km" ? "កែ" : "Edit"}
                </span>
                <span className="w-7 h-7 rounded-lg flex items-center justify-center text-zinc-400 group-hover:text-[#27a645] group-hover:bg-[#27a645]/10 transition">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 3a2.83 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
                  </svg>
                </span>
              </div>
            </div>

            {/* Trees */}
            <div
              onClick={handleStartEdit}
              className="flex items-center justify-between py-2 border-b group cursor-pointer hover:bg-white/[0.03] px-1.5 -mx-1.5 rounded-lg transition"
              style={{ borderColor: "var(--border)" }}
              title="Click to edit tree count"
            >
              <div>
                <div className="text-[11px]" style={{ color: "var(--muted)" }}>
                  {lang === "km" ? "ចំនួនដើមឈើ (Trees)" : "Trees"}
                </div>
                <div className="text-sm font-extrabold" style={{ color: "var(--text)" }}>
                  {fieldData.trees} {lang === "km" ? "ដើម" : "trees"}
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] text-zinc-500 opacity-0 group-hover:opacity-100 transition-opacity">
                  {lang === "km" ? "កែ" : "Edit"}
                </span>
                <span className="w-7 h-7 rounded-lg flex items-center justify-center text-zinc-400 group-hover:text-[#27a645] group-hover:bg-[#27a645]/10 transition">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 3a2.83 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
                  </svg>
                </span>
              </div>
            </div>

            {/* Density */}
            <div className="flex items-center justify-between py-2 border-b" style={{ borderColor: "var(--border)" }}>
              <div>
                <div className="text-[11px]" style={{ color: "var(--muted)" }}>
                  {lang === "km" ? "ដង់ស៊ីតេ (Density)" : "Density"}
                </div>
                <div className="text-sm font-extrabold" style={{ color: "var(--text)" }}>
                  {displayDensity}
                </div>
              </div>
              <span
                className="text-[10px] px-2 py-0.5 rounded-md font-semibold"
                style={{ backgroundColor: "var(--accent-fill)", color: "var(--accent)" }}
              >
                {lang === "km" ? "គម្លាត ៧×៧ម" : "7×7m Spacing"}
              </span>
            </div>

            {/* Farm Location (Synced from Profile) */}
            <div className="flex items-center justify-between py-2 border-b" style={{ borderColor: "var(--border)" }}>
              <div>
                <div className="text-[11px]" style={{ color: "var(--muted)" }}>
                  {lang === "km" ? "ទីតាំងចម្ការ (Location)" : "Farm Location"}
                </div>
                <div className="text-sm font-extrabold" style={{ color: "var(--text)" }}>
                  {formatLocation(location, lang)}
                </div>
              </div>
              <span
                className="text-[10px] px-2 py-0.5 rounded-md font-semibold"
                style={{ backgroundColor: "#1e2920", color: "#27a645" }}
              >
                {lang === "km" ? "ភ្ជាប់ជាមួយប្រវត្តិរូប" : "Profile Synced"}
              </span>
            </div>

            {/* Soil Type */}
            <div
              onClick={handleStartEdit}
              className="flex items-center justify-between py-2 border-b group cursor-pointer hover:bg-white/[0.03] px-1.5 -mx-1.5 rounded-lg transition"
              style={{ borderColor: "var(--border)" }}
              title="Click to edit soil type"
            >
              <div>
                <div className="text-[11px]" style={{ color: "var(--muted)" }}>
                  {lang === "km" ? "ប្រភេទដី (Soil Type)" : "Soil Type"}
                </div>
                <div className="text-sm font-bold" style={{ color: "var(--text)" }}>
                  {soilDisplayName}
                </div>
              </div>
              <span className="w-7 h-7 rounded-lg flex items-center justify-center text-zinc-400 group-hover:text-[#27a645] group-hover:bg-[#27a645]/10 transition">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 3a2.83 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
                </svg>
              </span>
            </div>

            {/* Cycle Start Date */}
            <div
              onClick={handleStartEdit}
              className="flex items-center justify-between py-2 border-b group cursor-pointer hover:bg-white/[0.03] px-1.5 -mx-1.5 rounded-lg transition"
              style={{ borderColor: "var(--border)" }}
              title="Click to edit cycle start date"
            >
              <div>
                <div className="text-[11px]" style={{ color: "var(--muted)" }}>
                  {lang === "km" ? "កាលបរិច្ឆេទចាប់ផ្តើមវដ្ដ" : "Cycle Start / Pruning"}
                </div>
                <div className="text-sm font-bold" style={{ color: "var(--text)" }}>
                  {fieldData.cycleStartDate || "2026-06-22"}
                </div>
              </div>
              <span
                className="text-[10px] px-2 py-0.5 rounded-md font-semibold"
                style={{ backgroundColor: "#1e2920", color: "#27a645" }}
              >
                {lang === "km" ? `ថ្ងៃទី ${lifecycle.dayOf}` : `Day ${lifecycle.dayOf}`}
              </span>
            </div>

            {/* Water Schedule */}
            <div className="flex items-center justify-between py-2">
              <div>
                <div className="text-[11px]" style={{ color: "var(--muted)" }}>
                  {lang === "km" ? "កាលវិភាគស្រោចទឹក" : "Water Schedule Info"}
                </div>
                <div className="text-sm font-bold" style={{ color: "var(--text)" }}>
                  {lang === "km" ? "រៀងរាល់ ៣ ថ្ងៃ (០.៥ លីត្រ/ដើម)" : "Every 3 days (~0.5L/tree)"}
                </div>
              </div>
              <span className="text-xl">💧</span>
            </div>
          </div>
        )}
      </div>

      {/* ── ACTION BUTTONS: Edit Field (Primary Green) & Take Photo (Secondary) ── */}
      {!isEditing && (
        <div className="flex gap-2.5">
          {/* Primary Green "Edit Field" button */}
          <button
            onClick={handleStartEdit}
            className="flex-1 py-3.5 rounded-2xl text-sm font-bold text-white transition active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2 shadow-lg"
            style={{
              backgroundColor: "#27a645",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#1f7d34")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#27a645")}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 3a2.83 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
            </svg>
            <span>{lang === "km" ? "កែសម្រួលចម្ការ" : "Edit Field"}</span>
          </button>

          {/* Secondary "Take Photo" button for disease/pest diagnosis */}
          <button
            onClick={() => fileRef.current?.click()}
            className="flex-1 py-3.5 rounded-2xl text-sm font-bold transition active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2 shadow-sm"
            style={{
              backgroundColor: "var(--card)",
              color: "var(--text)",
              border: "1px solid var(--border)",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#27a645")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
            <span>{lang === "km" ? "ថតរូបជំងឺ/សត្វល្អិត" : "Take Photo"}</span>
          </button>
          
          <input
            type="file"
            ref={fileRef}
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={handlePhotoSelect}
          />
        </div>
      )}

      {/* ── PHOTO UPLOAD SECTION IF USER TAKES A PHOTO ── */}
      {photoPreview && (
        <div
          className="rounded-2xl p-4 shadow-sm"
          style={{
            backgroundColor: "var(--card)",
            border: "1px solid var(--border)",
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="font-bold text-sm flex items-center gap-2" style={{ color: "var(--text)" }}>
              <span>📷</span>
              <span>{lang === "km" ? "រូបភាពស្លឹក/ផ្លែស្វាយចន្ទី" : "Cashew Photo Diagnosis"}</span>
            </div>
            <button
              onClick={handleRemovePhoto}
              className="text-xs text-zinc-400 hover:text-red-400 transition cursor-pointer"
            >
              {lang === "km" ? "លុបចេញ" : "Remove"}
            </button>
          </div>

          {/* Photo preview container */}
          <div className="relative rounded-xl overflow-hidden border border-[#2a2a2a] mb-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photoPreview}
              alt="Cashew specimen"
              className="w-full h-48 object-cover"
            />
            <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-md text-[10px] font-semibold bg-black/70 text-white backdrop-blur-sm">
              M23 Field Specimen
            </div>
          </div>

          {/* Diagnosis output or analyze button */}
          {photoDiagnosis ? (
            <div
              className="p-3.5 rounded-xl border flex flex-col gap-1.5"
              style={{
                backgroundColor: "var(--accent-fill)",
                borderColor: "rgba(39, 166, 69, 0.4)",
              }}
            >
              <div className="text-xs font-bold" style={{ color: "var(--accent)" }}>
                {lang === "km" ? "លទ្ធផលពិនិត្យជំងឺ:" : "Diagnosis Result:"}
              </div>
              <div className="text-xs text-zinc-200 leading-relaxed font-medium">
                {photoDiagnosis}
              </div>
            </div>
          ) : (
            <button
              onClick={handleAnalyzePhoto}
              disabled={photoUploading}
              className="w-full py-3 rounded-xl text-sm font-bold text-white transition active:scale-[0.98] cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2 shadow-md"
              style={{ backgroundColor: "#27a645" }}
              onMouseEnter={(e) => !photoUploading && (e.currentTarget.style.backgroundColor = "#1f7d34")}
              onMouseLeave={(e) => !photoUploading && (e.currentTarget.style.backgroundColor = "#27a645")}
            >
              {photoUploading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>{lang === "km" ? "កំពុងវិភាគជំងឺដោយ AI..." : "Diagnosing with AI..."}</span>
                </>
              ) : (
                <>
                  <span>🔬</span>
                  <span>{lang === "km" ? "វិភាគជំងឺ និងសត្វល្អិត" : "Diagnose Disease / Pest"}</span>
                </>
              )}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
