"use client";

import { useRouter } from "next/navigation";
import AiAdvisorScreen from "@/components/screens/AiAdvisorScreen";

export default function AiAssistantPage() {
  const router = useRouter();

  return (
    <div
      className="flex flex-col min-h-screen max-w-2xl mx-auto px-4 py-3"
      style={{ backgroundColor: "var(--bg)" }}
    >
      {/* Navigation Header */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-zinc-800">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push("/")}
            className="w-9 h-9 flex items-center justify-center rounded-xl bg-neutral-800 hover:bg-neutral-700 transition text-zinc-300 cursor-pointer"
            title="Back to Dashboard"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="flex items-center gap-2">
            <span className="text-xl">🌿</span>
            <div>
              <div className="font-extrabold text-sm text-zinc-100">
                M23 Cashew AI Advisor · ជំនួយការ AI
              </div>
              <div className="text-[10px] text-zinc-400">
                Cambodian Cashew Agronomy & Vision Diagnosis
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Shared Reusable AI Advisor Component */}
      <div className="flex-1">
        <AiAdvisorScreen lang="km" />
      </div>
    </div>
  );
}
