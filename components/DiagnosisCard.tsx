"use client";

import { useState } from "react";
import type { DiagnosisResponse } from "@/types/diagnosis";
import { diagnoseImage } from "@/lib/api/diagnose";

interface DiagnosisCardProps {
  data?: DiagnosisResponse | string | null;
  onNewUpload?: (file: File) => void;
  showUploadButton?: boolean;
}

const DEFAULT_DAILY_ADVICE = `📌 ការណែនាំប្រចាំថ្ងៃសម្រាប់ដំណាំស្វាយចន្ទី M23 (Daily M23 Cashew Tip):

• អាកាសធាតុប្រចាំថ្ងៃ: ពិនិត្យមើលការព្យាករណ៍អាកាសធាតុមុនពេលបាញ់ថ្នាំ។ ប្រសិនបើមានភ្លៀងធ្លាក់ ឬសើមខ្លាំង សូមផ្អាកការបាញ់ថ្នាំ។
• ពេលវេលាសមស្រប: គួរពិនិត្យ និងបាញ់ថ្នាំនៅពេលព្រឹកព្រលឹម (ម៉ោង ៦:០០ - ៩:០០ ព្រឹក) នៅពេលដែលមានសាត់ដើមឈើ ដើម្បីឱ្យថ្នាំទប់ទល់បានល្អ។
• ការថែទាំប្រចាំសប្តាហ៍: ពិនិត្យមើលស្លឹកខ្ចី និងក្តិបផ្លែ ដើម្បីការពារជំងឺអុចខ្មៅ (Anthracnose) និងសត្វល្អិតមូសតែ។

👉 សូមជ្រើសរើស ឬផ្ទុករូបភាពស្លឹក/ផ្លែស្វាយចន្ទីរបស់អ្នក ដើម្បីទទួលបានការវិភាគ AI ជាក់ស្តែង!`;

export default function DiagnosisCard({
  data,
  onNewUpload,
  showUploadButton = true,
}: DiagnosisCardProps) {
  const [loading, setLoading] = useState(false);
  const [customDiagnosis, setCustomDiagnosis] = useState<DiagnosisResponse | string | null>(data || null);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (onNewUpload) {
      onNewUpload(file);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await diagnoseImage(file);
      setCustomDiagnosis(result);
    } catch {
      setError("មិនអាចភ្ជាប់ទៅកាន់ Server បានទេ (Connection failed)");
    } finally {
      setLoading(false);
    }
  };

  const activeData = customDiagnosis || data;
  const isAnalyzed = Boolean(activeData);

  const isStructuredDiagnosis = (obj: unknown): obj is DiagnosisResponse => {
    return Boolean(obj && typeof obj === "object" && "disease_name_khmer" in obj);
  };

  return (
    <div
      className="p-5 rounded-2xl shadow-lg border max-w-2xl mx-auto text-zinc-100 transition-all"
      style={{
        backgroundColor: "var(--card, #232323)",
        borderColor: "#2e2e2e",
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-bold flex items-center gap-2">
          <span>🌿</span>
          <span>ពិនិត្យជំងឺរុក្ខជាតិ (Cashew Diagnosis)</span>
        </h2>
        {isAnalyzed ? (
          <span className="text-xs bg-emerald-950 text-emerald-400 border border-emerald-800/60 px-2.5 py-1 rounded-full font-semibold">
            🟢 AI Analyzed
          </span>
        ) : (
          <span className="text-xs bg-neutral-800 text-zinc-300 border border-neutral-700 px-2.5 py-1 rounded-full font-semibold">
            ℹ️ Daily Tip
          </span>
        )}
      </div>

      {showUploadButton && (
        <div className="mb-4">
          <label className="block text-xs font-medium text-zinc-400 mb-1.5">
            ថតរូប ឬផ្ទុករូបភាពថ្មី (Upload / Change Photo)
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="block w-full text-xs text-zinc-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:bg-emerald-600 file:text-white file:font-semibold hover:file:bg-emerald-500 cursor-pointer"
          />
        </div>
      )}

      {loading && (
        <div className="p-3.5 bg-neutral-900 border border-emerald-900/50 text-emerald-400 rounded-xl animate-pulse mb-3 text-xs flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
          <span>កំពុងវិភាគរូបភាពតាមបរិបទកសិកម្ម... (Analyzing image with AI...)</span>
        </div>
      )}

      {error && (
        <div className="p-3 bg-red-950/60 border border-red-900 text-red-300 rounded-xl mb-3 text-xs">
          {error}
        </div>
      )}

      <div
        className={`p-4 rounded-xl border leading-relaxed space-y-3.5 ${
          isAnalyzed
            ? "bg-neutral-900/90 border-emerald-900/40 text-zinc-200"
            : "bg-neutral-900/60 border-neutral-800 text-zinc-300"
        }`}
      >
        {isStructuredDiagnosis(activeData) ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="text-xs font-semibold bg-emerald-900/40 text-emerald-300 border border-emerald-700/40 px-2.5 py-0.5 rounded-lg">
                {activeData.crop_variety}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-xs bg-amber-950/80 text-amber-300 border border-amber-800/40 px-2 py-0.5 rounded-lg font-medium">
                  កម្រិត: {activeData.severity}
                </span>
                <span className="text-xs bg-emerald-950/80 text-emerald-300 border border-emerald-800/40 px-2 py-0.5 rounded-lg font-medium">
                  ទំនុកចិត្ត: {activeData.confidence_score}%
                </span>
              </div>
            </div>

            <div>
              <div className="font-bold text-base text-emerald-400 mb-0.5">
                {activeData.disease_name_khmer}
              </div>
              <div className="text-xs text-zinc-400 italic">
                {activeData.disease_name_english}
              </div>
            </div>

            <div>
              <div className="font-semibold text-xs text-zinc-300 mb-1">
                រោគសញ្ញា (Symptoms):
              </div>
              <ul className="list-disc list-inside space-y-1 text-xs text-zinc-400">
                {activeData.symptoms.map((symptom, idx) => (
                  <li key={idx}>{symptom}</li>
                ))}
              </ul>
            </div>

            <div>
              <div className="font-semibold text-xs text-zinc-300 mb-1.5">
                វិធានការណ៍បន្ទាន់ (Immediate Actions):
              </div>
              <div className="space-y-2">
                {activeData.immediate_actions.map((act) => (
                  <div
                    key={act.step}
                    className="bg-neutral-800/70 p-2.5 rounded-xl border border-neutral-700/70 text-xs"
                  >
                    <div className="font-semibold text-emerald-400">
                      ជំហានទី {act.step}: {act.title}
                    </div>
                    <div className="text-zinc-300 mt-1 leading-normal">
                      {act.instruction}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {activeData.prevention_tips && activeData.prevention_tips.length > 0 && (
              <div>
                <div className="font-semibold text-xs text-zinc-300 mb-1">
                  វិធីសាស្ត្របង្ការ (Prevention Tips):
                </div>
                <ul className="list-disc list-inside space-y-1 text-xs text-zinc-400">
                  {activeData.prevention_tips.map((tip, idx) => (
                    <li key={idx}>{tip}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ) : typeof activeData === "string" ? (
          <div className="whitespace-pre-line text-xs text-zinc-200">
            {activeData}
          </div>
        ) : (
          <div className="whitespace-pre-line text-xs text-zinc-300 leading-relaxed">
            {DEFAULT_DAILY_ADVICE}
          </div>
        )}
      </div>
    </div>
  );
}
