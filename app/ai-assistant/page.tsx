"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import DiagnosisCard from "@/components/DiagnosisCard";
import LanguageToggle from "@/components/common/LanguageToggle";
import { sendChatMessage } from "@/lib/api/chat";
import { diagnoseImage } from "@/lib/api/diagnose";
import type { ChatMessage, QuickAction } from "@/types/chat";
import type { Language } from "@/types/agronomy";

const QUICK_ACTIONS: QuickAction[] = [
  { labelKm: "វិភាគជំងឺស្លឹក", labelEn: "Diagnose leaf disease", prompt: "ស្លឹករបស់ខ្ញុំមានស្នាមប្រផ្នូ-ត្នោត ហើយចាប់ផ្ដើមមាំង — តើអ្នកអាចពិនិត្យបានទេ?" },
  { labelKm: "យោបល់អំពីជី", labelEn: "Fertilizer advice", prompt: "ត្រូវការជីអ្វីក្នុងការដាំ M23?" },
  { labelKm: "កាលវិភាគស្រោចទឹក", labelEn: "Watering schedule", prompt: "តើត្រូវស្រោចទឹកយ៉ាងដូចម្តេចចំពោះស្វាយចន្ទី M23?" },
  { labelKm: "ការព្យាបាលសត្វល្អិត", labelEn: "Pest control", prompt: "តើធ្វើដូចម្តេចដើម្បីការពារសត្វល្អិត និងជំងឺលើដើមចន្ទី?" },
  { labelKm: "ពេលប្រមូលផល", labelEn: "Harvest timing", prompt: "តើពេលណាគួរប្រមូលផលស្វាយចន្ទី M23?" },
];

export default function AiAssistantPage() {
  const router = useRouter();
  const [lang, setLang] = useState<Language>("km");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const nextIdRef = useRef(1);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, thinking]);

  function addMessage(msg: Omit<ChatMessage, "id">) {
    const id = nextIdRef.current++;
    setMessages((prev) => [...prev, { ...msg, id }]);
  }

  async function handleSend(text: string) {
    if (!text.trim() || thinking) return;
    setInput("");
    addMessage({ kind: "user-text", text });
    setThinking(true);

    try {
      const res = await sendChatMessage(text);
      addMessage({ kind: "ai-chat", reply_km: res.reply_km, gloss_en: res.gloss_en });
    } finally {
      setThinking(false);
    }
  }

  async function handlePhoto(file: File) {
    if (thinking) return;
    const url = URL.createObjectURL(file);
    addMessage({ kind: "user-photo", photoUrl: url });
    setThinking(true);

    try {
      const diagnosis = await diagnoseImage(file);
      addMessage({ kind: "ai-diagnosis", diagnosis });
    } finally {
      setThinking(false);
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handlePhoto(file);
    e.target.value = "";
  }

  const showEmpty = messages.length === 0 && !thinking;

  return (
    <div
      className="flex flex-col h-screen max-w-2xl mx-auto text-zinc-100"
      style={{ backgroundColor: "#0F1115" }}
    >
      {/* Sticky Header */}
      <div
        className="flex items-center justify-between px-4 py-3 sticky top-0 z-10 border-b border-neutral-800 backdrop-blur-md bg-[#0F1115]/90"
      >
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
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-emerald-600/20 text-emerald-400 font-bold">
              🌱
            </div>
            <div>
              <div className="font-bold text-sm flex items-center gap-2">
                M23 AI Assistant
                <span className="flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800/50">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Online
                </span>
              </div>
              <div className="text-xs text-zinc-400">
                {lang === "km" ? "ជំនួយការផ្ទាល់ខ្លួនសម្រាប់ស្វាយចន្ទី M23" : "Expert AI Advisor for M23 Cashew"}
              </div>
            </div>
          </div>
        </div>

        {/* Language Toggle */}
        <LanguageToggle
          lang={lang}
          onToggle={() => setLang((l) => (l === "km" ? "en" : "km"))}
        />
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {showEmpty && (
          <div className="flex flex-col items-center justify-center h-full gap-6 py-12">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/20">
              🌿
            </div>
            <div className="text-center max-w-sm">
              <div className="font-bold text-base mb-1 text-zinc-100">
                សួរអំពីដើមស្វាយចន្ទី M23 របស់អ្នក
              </div>
              <div className="text-xs text-zinc-400">
                Ask anything about M23 cashew farming, leaf diseases, fertilizers, or harvest schedules.
              </div>
            </div>

            <div className="grid grid-cols-1 gap-2 w-full max-w-md">
              {QUICK_ACTIONS.map((action, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(action.prompt)}
                  className="w-full text-left text-xs px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-zinc-200 hover:border-emerald-600 hover:bg-neutral-850 transition flex items-center justify-between group cursor-pointer"
                >
                  <span>{lang === "km" ? action.labelKm : action.labelEn}</span>
                  <span className="text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg) => {
          if (msg.kind === "user-text") {
            return (
              <div key={msg.id} className="flex justify-end">
                <div className="rounded-2xl rounded-tr-sm px-4 py-3 max-w-[80%] text-sm bg-emerald-600 text-white shadow-md">
                  {msg.text}
                </div>
              </div>
            );
          }

          if (msg.kind === "user-photo") {
            return (
              <div key={msg.id} className="flex justify-end">
                <div className="rounded-2xl rounded-tr-sm overflow-hidden border-2 border-emerald-600 shadow-md">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={msg.photoUrl} alt="farm photo" className="max-w-xs max-h-60 object-cover" />
                </div>
              </div>
            );
          }

          if (msg.kind === "ai-chat") {
            return (
              <div key={msg.id} className="flex justify-start">
                <div className="rounded-2xl rounded-tl-sm px-4 py-3 max-w-[85%] text-sm bg-neutral-900 border border-neutral-800 text-zinc-100 shadow-md whitespace-pre-wrap">
                  <div className="mb-1">
                    {msg.reply_km}
                  </div>
                  {msg.gloss_en && (
                    <div className="text-xs text-zinc-400 border-t border-neutral-800 pt-2 mt-2">
                      {msg.gloss_en}
                    </div>
                  )}
                </div>
              </div>
            );
          }

          if (msg.kind === "ai-diagnosis" && msg.diagnosis) {
            return (
              <div key={msg.id} className="flex justify-start w-full">
                <DiagnosisCard data={msg.diagnosis} showUploadButton={false} />
              </div>
            );
          }

          return null;
        })}

        {thinking && (
          <div className="flex justify-start">
            <div className="rounded-2xl rounded-tl-sm px-4 py-3 bg-neutral-900 border border-neutral-800">
              <div className="flex gap-1.5 items-center">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Quick Action Chips when messages exist */}
      {!showEmpty && (
        <div className="px-4 py-1.5 flex gap-2 overflow-x-auto no-scrollbar bg-[#0F1115] border-t border-neutral-800/60">
          {QUICK_ACTIONS.map((action, i) => (
            <button
              key={i}
              onClick={() => handleSend(action.prompt)}
              disabled={thinking}
              className="text-xs px-3 py-1 rounded-full whitespace-nowrap bg-neutral-900 border border-neutral-800 text-zinc-300 hover:border-emerald-600 hover:text-emerald-400 transition cursor-pointer disabled:opacity-50"
            >
              {lang === "km" ? action.labelKm : action.labelEn}
            </button>
          ))}
        </div>
      )}

      {/* Sticky Message Input */}
      <div className="px-4 py-3 border-t border-neutral-800 bg-[#0F1115]">
        <div className="flex items-center gap-2 rounded-2xl px-3 py-2 bg-neutral-900 border border-neutral-800 focus-within:border-emerald-600 transition">
          <button
            onClick={() => fileRef.current?.click()}
            disabled={thinking}
            className="w-9 h-9 flex items-center justify-center rounded-full shrink-0 text-zinc-400 hover:text-zinc-200 hover:bg-neutral-800 transition disabled:opacity-40 cursor-pointer"
            title="Upload photo for diagnosis"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 5h-3.17L15 3H9L7.17 5H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm-8 13c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
            </svg>
          </button>
          <input type="file" ref={fileRef} accept="image/*" className="hidden" onChange={handleFileChange} />

          <textarea
            rows={1}
            className="flex-1 bg-transparent text-sm outline-none text-zinc-100 placeholder-zinc-500 resize-none py-1.5"
            placeholder={lang === "km" ? "សួរអំពីស្វាយចន្ទី M23..." : "Ask about M23 cashew..."}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend(input);
              }
            }}
            disabled={thinking}
          />

          <button
            onClick={() => handleSend(input)}
            disabled={!input.trim() || thinking}
            className="w-9 h-9 flex items-center justify-center rounded-full shrink-0 bg-emerald-600 hover:bg-emerald-500 text-white transition disabled:opacity-40 shadow-md cursor-pointer"
            title="Send message"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
