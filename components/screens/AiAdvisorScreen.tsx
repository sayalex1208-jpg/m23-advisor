"use client";

import { useEffect, useRef, useState } from "react";
import { sendChatMessage } from "@/lib/api/chat";
import { diagnoseImage } from "@/lib/api/diagnose";
import DiagnosisCard from "@/components/DiagnosisCard";
import type { ChatMessage } from "@/types/chat";
import type { Language } from "@/types/agronomy";

const EXAMPLE_QUERIES = [
  {
    textEn: "When should I water next?",
    textKm: "តើពេលណាគួរស្រោចទឹកបន្ទាប់?",
    prompt: "តើពេលណាគួរស្រោចទឹកបន្ទាប់សម្រាប់ស្វាយចន្ទី M23?",
    icon: "💧",
  },
  {
    textEn: "What's wrong with my leaves?",
    textKm: "តើមានបញ្ហាអ្វីជាមួយស្លឹករបស់ខ្ញុំ?",
    prompt: "ស្លឹករបស់ខ្ញុំមានស្នាមប្រផ្នូ ហើយចាប់ផ្ដើមមាំង — តើអ្នកអាចពិនិត្យបានទេ?",
    icon: "🍂",
  },
  {
    textEn: "How can I increase yield?",
    textKm: "តើធ្វើដូចម្តេចដើម្បីបង្កើនទិន្នផល?",
    prompt: "តើធ្វើដូចម្តេចដើម្បីបង្កើនទិន្នផលស្វាយចន្ទី M23 ក្នុងដំណាក់កាលនេះ?",
    icon: "📈",
  },
];

interface AiAdvisorScreenProps {
  lang: Language;
}

export default function AiAdvisorScreen({ lang }: AiAdvisorScreenProps) {
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
    <div className="flex flex-col tab-content" style={{ height: "calc(100vh - 150px)" }}>
      {/* ── MESSAGES HISTORY AREA ── */}
      <div className="flex-1 overflow-y-auto space-y-3.5 no-scrollbar pb-3 px-0.5">
        {showEmpty && (
          <div className="flex flex-col items-center justify-center h-full gap-5 py-6">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-md"
              style={{
                backgroundColor: "var(--accent-fill)",
                border: "1px solid rgba(39, 166, 69, 0.4)",
              }}
            >
              🌿
            </div>
            
            <div className="text-center max-w-sm">
              <div className="font-extrabold text-base mb-1" style={{ color: "var(--text)" }}>
                {lang === "km"
                  ? "សួរនាំទីប្រឹក្សា AI ស្វាយចន្ទី M23"
                  : "M23 Cashew AI Advisor"}
              </div>
              <div className="text-xs leading-relaxed" style={{ color: "var(--muted)" }}>
                {lang === "km"
                  ? "ទទួលបានការណែនាំច្បាស់លាស់អំពីជី ការថែទាំ ការការពារជំងឺ និងការប្រមូលផល"
                  : "Ask anything about watering, flowering protection, fertilizers, or pest management"}
              </div>
            </div>

            {/* Example Queries List */}
            <div className="w-full space-y-2 mt-1">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 px-1">
                {lang === "km" ? "សំណួរគំរូទូទៅ" : "Example Queries"}
              </div>
              {EXAMPLE_QUERIES.map((q, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(q.prompt)}
                  className="w-full text-left text-xs px-4 py-3 rounded-xl flex items-center justify-between group cursor-pointer transition shadow-sm"
                  style={{
                    backgroundColor: "var(--card)",
                    border: "1px solid var(--border)",
                    color: "var(--text)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#27a645";
                    e.currentTarget.style.backgroundColor = "#202020";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--border)";
                    e.currentTarget.style.backgroundColor = "var(--card)";
                  }}
                >
                  <span className="flex items-center gap-2.5 font-medium">
                    <span className="text-base">{q.icon}</span>
                    <span>{lang === "km" ? q.textKm : q.textEn}</span>
                  </span>
                  <span
                    className="text-[#27a645] opacity-0 group-hover:opacity-100 transition-opacity font-bold"
                  >
                    →
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Message stream */}
        {messages.map((msg) => {
          /* Farmer question */
          if (msg.kind === "user-text") {
            return (
              <div key={msg.id} className="flex justify-end">
                <div
                  className="rounded-2xl rounded-tr-sm px-4 py-3 max-w-[85%] text-xs font-medium shadow-md leading-relaxed"
                  style={{ backgroundColor: "#27a645", color: "white" }}
                >
                  {msg.text}
                </div>
              </div>
            );
          }

          /* Farmer uploaded photo */
          if (msg.kind === "user-photo") {
            return (
              <div key={msg.id} className="flex justify-end">
                <div
                  className="rounded-2xl rounded-tr-sm overflow-hidden shadow-md border-2"
                  style={{ borderColor: "#27a645" }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={msg.photoUrl} alt="farm specimen" className="max-w-[240px] max-h-56 object-cover" />
                </div>
              </div>
            );
          }

          /* AI response card with advice */
          if (msg.kind === "ai-chat") {
            return (
              <div key={msg.id} className="flex justify-start w-full">
                <div
                  className="rounded-2xl p-4 w-full text-xs shadow-md space-y-2.5"
                  style={{
                    backgroundColor: "var(--card)",
                    border: "1px solid var(--border)",
                  }}
                >
                  {/* Card Header with Agronomist Badge */}
                  <div className="flex items-center justify-between pb-2 border-b" style={{ borderColor: "var(--border)" }}>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg flex items-center justify-center text-xs bg-[#27a645]/20 text-[#27a645]">
                        🌱
                      </div>
                      <span className="font-bold text-xs" style={{ color: "var(--text)" }}>
                        {lang === "km" ? "យោបល់អ្នកជំនាញស្វាយចន្ទី M23" : "M23 Agronomist Advice"}
                      </span>
                    </div>
                    <span
                      className="text-[10px] px-2 py-0.5 rounded-full font-semibold"
                      style={{ backgroundColor: "var(--accent-fill)", color: "var(--accent)" }}
                    >
                      AI Advice Card
                    </span>
                  </div>

                  {/* Primary Advice (Khmer) */}
                  <div className="leading-relaxed font-medium text-zinc-100 whitespace-pre-wrap">
                    {msg.reply_km}
                  </div>

                  {/* English Gloss / translation if provided */}
                  {msg.gloss_en && (
                    <div
                      className="pt-2 text-[11px] leading-relaxed text-zinc-400 border-t italic"
                      style={{ borderColor: "var(--border)" }}
                    >
                      <span className="font-semibold text-zinc-300 not-italic block mb-0.5">
                        English Translation:
                      </span>
                      {msg.gloss_en}
                    </div>
                  )}
                </div>
              </div>
            );
          }

          /* AI diagnosis card */
          if (msg.kind === "ai-diagnosis" && msg.diagnosis) {
            return (
              <div key={msg.id} className="flex justify-start w-full">
                <DiagnosisCard data={msg.diagnosis} showUploadButton={false} />
              </div>
            );
          }

          return null;
        })}

        {/* Loading state while AI thinks */}
        {thinking && (
          <div className="flex justify-start">
            <div
              className="rounded-2xl p-3.5 shadow-sm flex items-center gap-3"
              style={{
                backgroundColor: "var(--card)",
                border: "1px solid var(--border)",
              }}
            >
              <div className="w-4 h-4 border-2 border-[#27a645] border-t-transparent rounded-full animate-spin" />
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold text-zinc-300">
                  {lang === "km" ? "AI កំពុងវិភាគ..." : "AI Advisor is thinking..."}
                </span>
                <span className="flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#27a645] animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#27a645] animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#27a645] animate-bounce" style={{ animationDelay: "300ms" }} />
                </span>
              </div>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* ── QUICK SUGGESTION CHIPS WHEN MESSAGES EXIST ── */}
      {!showEmpty && (
        <div className="py-2 flex gap-2 overflow-x-auto no-scrollbar border-t" style={{ borderColor: "var(--border)" }}>
          {EXAMPLE_QUERIES.map((q, i) => (
            <button
              key={i}
              onClick={() => handleSend(q.prompt)}
              disabled={thinking}
              className="text-[11px] px-3 py-1.5 rounded-full whitespace-nowrap transition cursor-pointer disabled:opacity-50 font-medium shrink-0 flex items-center gap-1.5"
              style={{
                backgroundColor: "var(--card)",
                border: "1px solid var(--border)",
                color: "var(--text)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#27a645")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
            >
              <span>{q.icon}</span>
              <span>{lang === "km" ? q.textKm : q.textEn}</span>
            </button>
          ))}
        </div>
      )}

      {/* ── STICKY INPUT FIELD AT BOTTOM: "Ask about this stage..." + Photo upload ── */}
      <div className="pt-2">
        <div
          className="flex items-center gap-2 rounded-2xl px-3 py-2 transition shadow-lg"
          style={{
            backgroundColor: "var(--card)",
            border: "1px solid var(--border)",
          }}
        >
          {/* File upload button for photos */}
          <button
            onClick={() => fileRef.current?.click()}
            disabled={thinking}
            className="w-9 h-9 flex items-center justify-center rounded-xl shrink-0 text-zinc-400 hover:text-white hover:bg-neutral-800 transition disabled:opacity-40 cursor-pointer"
            title={lang === "km" ? "ផ្ទុករូបថតស្លឹកឬផ្លែ" : "Upload photo"}
            aria-label="Upload leaf or specimen photo"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 5h-3.17L15 3H9L7.17 5H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm-8 13c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
            </svg>
          </button>
          <input type="file" ref={fileRef} accept="image/*" className="hidden" onChange={handleFileChange} />

          {/* Input field: "Ask about this stage..." */}
          <input
            type="text"
            className="flex-1 bg-transparent text-xs sm:text-sm outline-none py-1 text-zinc-100 placeholder-zinc-500 font-medium"
            placeholder={lang === "km" ? "សួរអំពីដំណាក់កាលនេះ..." : "Ask about this stage..."}
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

          {/* Send button */}
          <button
            onClick={() => handleSend(input)}
            disabled={!input.trim() || thinking}
            className="w-9 h-9 flex items-center justify-center rounded-xl shrink-0 text-white transition active:scale-95 disabled:opacity-40 shadow-md cursor-pointer"
            style={{ backgroundColor: "#27a645" }}
            onMouseEnter={(e) => !thinking && (e.currentTarget.style.backgroundColor = "#1f7d34")}
            onMouseLeave={(e) => !thinking && (e.currentTarget.style.backgroundColor = "#27a645")}
            title={lang === "km" ? "ផ្ញើ" : "Send"}
            aria-label="Send query"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
