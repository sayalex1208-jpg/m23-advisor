"use client";

import { useState, useMemo } from "react";
import type { Language } from "@/types/agronomy";
import {
  CASHEW_HANDBOOK,
  searchHandbook,
  type HandbookChapter,
  type HandbookSection,
} from "@/lib/cashewHandbook";

interface CashewHandbookReaderProps {
  lang: Language;
  onClose?: () => void;
  onAskAI?: (topic: string) => void;
  isModal?: boolean;
}

export default function CashewHandbookReader({
  lang,
  onClose,
  onAskAI,
  isModal = false,
}: CashewHandbookReaderProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedChapterId, setSelectedChapterId] = useState<string>("all");
  const [expandedSectionCode, setExpandedSectionCode] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return null;
    return searchHandbook(searchQuery, lang);
  }, [searchQuery, lang]);

  const filteredChapters = useMemo(() => {
    if (selectedChapterId === "all") return CASHEW_HANDBOOK;
    return CASHEW_HANDBOOK.filter((ch) => ch.id === selectedChapterId);
  }, [selectedChapterId]);

  function handleCopy(section: HandbookSection) {
    const textToCopy = `${lang === "km" ? section.titleKm : section.titleEn}\n\n${
      lang === "km" ? section.contentKm : section.contentEn
    }\n\n${
      section.keyPointsKm && lang === "km"
        ? section.keyPointsKm.join("\n")
        : section.keyPointsEn
        ? section.keyPointsEn.join("\n")
        : ""
    }`;

    navigator.clipboard.writeText(textToCopy);
    setCopiedCode(section.code);
    setTimeout(() => setCopiedCode(null), 2000);
  }

  const containerClasses = isModal
    ? "fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-sm animate-in fade-in"
    : "w-full";

  const cardClasses = isModal
    ? "w-full max-w-3xl max-h-[90vh] flex flex-col rounded-2xl overflow-hidden shadow-2xl border"
    : "w-full rounded-2xl overflow-hidden border shadow-sm";

  return (
    <div className={containerClasses}>
      <div
        className={cardClasses}
        style={{
          backgroundColor: "var(--card)",
          borderColor: "var(--border)",
        }}
      >
        {/* Header */}
        <div
          className="p-4 sm:p-5 border-b flex items-start justify-between gap-3 sticky top-0 z-10"
          style={{
            backgroundColor: "var(--card)",
            borderColor: "var(--border)",
          }}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#27a645]/15 border border-[#27a645]/30 flex items-center justify-center text-xl shrink-0">
              📖
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-white">
                  {lang === "km"
                    ? "សៀវភៅណែនាំបច្ចេកទេសស្វាយចន្ទី"
                    : "Cashew Agronomy Handbook"}
                </h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#27a645]/20 text-[#27a645] border border-[#27a645]/40">
                  M23 Guide
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-0.5">
                {lang === "km"
                  ? "ស្តង់ដារបច្ចេកទេសកសិកម្មចន្ទីកម្ពុជា (៩ ជំពូកពេញលេញ)"
                  : "Complete 9-Chapter Official Technical Reference"}
              </p>
            </div>
          </div>

          {onClose && (
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white flex items-center justify-center transition-colors text-sm"
              title="Close"
            >
              ✕
            </button>
          )}
        </div>

        {/* Search Bar */}
        <div
          className="p-3 sm:px-5 sm:py-3 border-b flex flex-col sm:flex-row gap-2 bg-black/20"
          style={{ borderColor: "var(--border)" }}
        >
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 text-sm">
              🔍
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                lang === "km"
                  ? "ស្វែងរកប្រធានបទ (ឧ. មូសតែ, ជី NPK, កាត់មែក, ផ្សាំ, ហាលគ្រាប់...)"
                  : "Search topics (e.g. tea mosquito, NPK, pruning, grafting, drying...)"
              }
              className="w-full pl-9 pr-8 py-2 rounded-xl text-xs sm:text-sm bg-white/[0.04] border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-[#27a645] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white text-xs"
              >
                ✕
              </button>
            )}
          </div>

          {/* Quick Chapter Selector */}
          {!searchResults && (
            <div className="flex gap-1.5 overflow-x-auto pb-1 sm:pb-0 no-scrollbar">
              <button
                onClick={() => setSelectedChapterId("all")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold shrink-0 transition-colors ${
                  selectedChapterId === "all"
                    ? "bg-[#27a645] text-white"
                    : "bg-white/[0.04] text-zinc-400 hover:text-white border border-white/10"
                }`}
              >
                {lang === "km" ? "ទាំងអស់" : "All"}
              </button>
              {CASHEW_HANDBOOK.map((ch) => (
                <button
                  key={ch.id}
                  onClick={() => setSelectedChapterId(ch.id)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold shrink-0 transition-colors flex items-center gap-1.5 ${
                    selectedChapterId === ch.id
                      ? "bg-[#27a645] text-white"
                      : "bg-white/[0.04] text-zinc-400 hover:text-white border border-white/10"
                  }`}
                  title={lang === "km" ? ch.titleKm : ch.titleEn}
                >
                  <span>{ch.icon}</span>
                  <span>{ch.code}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto p-4 sm:p-5 space-y-6 flex-1">
          {/* SEARCH RESULTS VIEW */}
          {searchResults ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-zinc-400 pb-1">
                <span>
                  {lang === "km"
                    ? `រកឃើញ ${searchResults.length} ចំណុច`
                    : `Found ${searchResults.length} matching sections`}
                </span>
                <button
                  onClick={() => setSearchQuery("")}
                  className="text-[#27a645] hover:underline"
                >
                  {lang === "km" ? "សម្អាត" : "Clear search"}
                </button>
              </div>

              {searchResults.length === 0 ? (
                <div className="p-8 text-center text-zinc-400 bg-white/[0.02] rounded-xl border border-white/5">
                  <div className="text-3xl mb-2">🔍</div>
                  <p className="text-sm font-medium">
                    {lang === "km"
                      ? "មិនមានព័ត៌មានត្រូវគ្នានឹងការស្វែងរកនេះទេ"
                      : "No matching handbook content found"}
                  </p>
                  <p className="text-xs text-zinc-500 mt-1">
                    {lang === "km"
                      ? "សាកល្បងស្វែងរកពាក្យដូចជា៖ ជី, ផ្កា, ជំងឺ, ក្តឹប, មូសតែ"
                      : "Try searching terms like: fertilizer, bloom, disease, pruning"}
                  </p>
                </div>
              ) : (
                searchResults.map((section) => (
                  <SectionCard
                    key={section.code}
                    section={section}
                    lang={lang}
                    isExpanded={true}
                    onToggle={() => {}}
                    onCopy={() => handleCopy(section)}
                    isCopied={copiedCode === section.code}
                    onAskAI={onAskAI}
                  />
                ))
              )}
            </div>
          ) : (
            /* CHAPTER BY CHAPTER VIEW */
            filteredChapters.map((chapter) => (
              <div
                key={chapter.id}
                className="rounded-2xl p-4 sm:p-5 bg-white/[0.02] border border-white/10 space-y-4"
              >
                {/* Chapter Banner */}
                <div className="flex items-start justify-between gap-3 border-b border-white/10 pb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{chapter.icon}</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800/50">
                          {lang === "km" ? `ជំពូក "${chapter.code}"` : `Chapter ${chapter.code}`}
                        </span>
                        <h3 className="text-sm sm:text-base font-bold text-white">
                          {lang === "km" ? chapter.titleKm : chapter.titleEn}
                        </h3>
                      </div>
                      <p className="text-xs text-zinc-400 mt-1">
                        {lang === "km" ? chapter.summaryKm : chapter.summaryEn}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Chapter Sections */}
                <div className="space-y-3">
                  {chapter.sections.map((section) => (
                    <SectionCard
                      key={section.code}
                      section={section}
                      lang={lang}
                      isExpanded={
                        expandedSectionCode === section.code ||
                        chapter.sections.length === 1
                      }
                      onToggle={() =>
                        setExpandedSectionCode(
                          expandedSectionCode === section.code ? null : section.code
                        )
                      }
                      onCopy={() => handleCopy(section)}
                      isCopied={copiedCode === section.code}
                      onAskAI={onAskAI}
                    />
                  ))}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer info */}
        <div
          className="p-3 sm:px-5 border-t flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-zinc-400 bg-black/40"
          style={{ borderColor: "var(--border)" }}
        >
          <div className="flex items-center gap-2">
            <span>✅</span>
            <span>
              {lang === "km"
                ? "ទិន្នន័យស្រាវជ្រាវ និងផ្ទៀងផ្ទាត់ផ្លូវការសម្រាប់ស្វាយចន្ទី M23 កម្ពុជា"
                : "Verified Cambodian M23 Cashew Agronomic Standard"}
            </span>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white font-medium transition-colors text-xs"
            >
              {lang === "km" ? "បិទ" : "Close"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

interface SectionCardProps {
  section: HandbookSection;
  lang: Language;
  isExpanded: boolean;
  onToggle: () => void;
  onCopy: () => void;
  isCopied: boolean;
  onAskAI?: (topic: string) => void;
}

function SectionCard({
  section,
  lang,
  isExpanded,
  onToggle,
  onCopy,
  isCopied,
  onAskAI,
}: SectionCardProps) {
  const title = lang === "km" ? section.titleKm : section.titleEn;
  const content = lang === "km" ? section.contentKm : section.contentEn;
  const keyPoints = lang === "km" ? section.keyPointsKm : section.keyPointsEn;
  const warning = lang === "km" ? section.warningKm : section.warningEn;

  return (
    <div className="rounded-xl bg-white/[0.03] border border-white/5 overflow-hidden transition-all">
      <div
        onClick={onToggle}
        className="p-3 sm:p-4 flex items-center justify-between gap-3 cursor-pointer hover:bg-white/[0.02] transition-colors"
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 shrink-0">
            {section.code}
          </span>
          <h4 className="text-xs sm:text-sm font-semibold text-white truncate">
            {title}
          </h4>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-zinc-500 text-xs">{isExpanded ? "▲" : "▼"}</span>
        </div>
      </div>

      {isExpanded && (
        <div className="px-3 pb-3 sm:px-4 sm:pb-4 space-y-3 border-t border-white/5 pt-3">
          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
            {content}
          </p>

          {keyPoints && keyPoints.length > 0 && (
            <div className="p-3 rounded-lg bg-black/30 border border-white/5 space-y-1.5">
              <div className="text-[11px] font-bold text-emerald-400 uppercase tracking-wide">
                {lang === "km" ? "ចំណុចសំខាន់ៗ" : "Key Guidelines"}
              </div>
              <ul className="space-y-1 text-xs text-zinc-300">
                {keyPoints.map((pt, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-0.5 text-xs">✓</span>
                    <span className="leading-relaxed">{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {warning && (
            <div className="p-3 rounded-lg bg-amber-950/30 border border-amber-800/40 text-amber-300 flex items-start gap-2 text-xs leading-relaxed">
              <span className="text-amber-400 text-sm mt-0.5">⚠️</span>
              <div>
                <span className="font-bold">
                  {lang === "km" ? "ការប្រុងប្រយ័ត្ន៖ " : "Warning: "}
                </span>
                <span>{warning}</span>
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-2 pt-1 border-t border-white/5">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onCopy();
              }}
              className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white text-[11px] transition-colors flex items-center gap-1"
            >
              <span>{isCopied ? "✓" : "📋"}</span>
              <span>
                {isCopied
                  ? lang === "km"
                    ? "ចម្លងរួច"
                    : "Copied"
                  : lang === "km"
                  ? "ចម្លង"
                  : "Copy"}
              </span>
            </button>

            {onAskAI && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onAskAI(title);
                }}
                className="px-2.5 py-1 rounded bg-[#27a645]/20 hover:bg-[#27a645]/30 text-[#27a645] text-[11px] font-medium border border-[#27a645]/40 transition-colors flex items-center gap-1"
              >
                <span>🤖</span>
                <span>
                  {lang === "km" ? "សួរ AI ពីចំណុចនេះ" : "Ask AI About This"}
                </span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
