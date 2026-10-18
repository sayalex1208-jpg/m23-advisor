"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import BrandLogo from "@/components/common/BrandLogo";
import LanguageToggle from "@/components/common/LanguageToggle";
import type { Language } from "@/types/agronomy";

/* ── Bilingual content ── */
const content = {
  en: {
    greeting: (name: string) => `Welcome, ${name}!`,
    encouragement:
      "Let's optimize your cashew harvest this season. Your fields are waiting — check weather, diagnose issues, and track growth all in one place.",
    cta: "Start Monitoring Your Field",
    ctaSecondary: "View Dashboard",
    tip: "Tip: Take a photo of any leaf to instantly diagnose diseases.",
    skipLabel: "Skip",
  },
  km: {
    greeting: (name: string) => `សូមស្វាគមន៍ ${name}!`,
    encouragement:
      "តោះបង្កើនទិន្នផលស្វាយចន្ទីរបស់អ្នកនៅរដូវកាលនេះ។ ពិនិត្យអាកាសធាតុ វិភាគជំងឺ និងតាមដានកំណើនទាំងអស់នៅកន្លែងតែមួយ។",
    cta: "ចាប់ផ្តើមតាមដានចម្ការ",
    ctaSecondary: "មើលផ្ទាំងគ្រប់គ្រង",
    tip: "គន្លឹះ៖ ថតរូបស្លឹកដើម្បីវិភាគជំងឺភ្លាមៗ។",
    skipLabel: "រំលង",
  },
};

/* ── Animated particles (subtle floating leaves) ── */
function FloatingParticles() {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {/* Particle 1 — large soft blob */}
      <div
        className="absolute -top-10 -right-10 w-56 h-56 rounded-full opacity-[0.06]"
        style={{
          background:
            "radial-gradient(circle, #34d399 0%, transparent 70%)",
          animation: "float-slow 12s ease-in-out infinite",
        }}
      />
      {/* Particle 2 */}
      <div
        className="absolute -bottom-16 -left-12 w-48 h-48 rounded-full opacity-[0.05]"
        style={{
          background:
            "radial-gradient(circle, #22c55e 0%, transparent 70%)",
          animation: "float-slow 15s ease-in-out infinite reverse",
        }}
      />
      {/* Particle 3 — small accent */}
      <div
        className="absolute top-1/3 right-4 w-20 h-20 rounded-full opacity-[0.04]"
        style={{
          background:
            "radial-gradient(circle, #fbbf24 0%, transparent 70%)",
          animation: "float-slow 10s ease-in-out infinite",
        }}
      />
      {/* Subtle grid dots */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #34d399 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
    </div>
  );
}

/* ── Feature pill chips ── */
const features = {
  en: [
    { icon: "🌤️", text: "Weather" },
    { icon: "🔬", text: "Diagnosis" },
    { icon: "📊", text: "Yield" },
    { icon: "🤖", text: "AI Chat" },
  ],
  km: [
    { icon: "🌤️", text: "អាកាសធាតុ" },
    { icon: "🔬", text: "វិភាគជំងឺ" },
    { icon: "📊", text: "ទិន្នផល" },
    { icon: "🤖", text: "AI ជជែក" },
  ],
};

/* ══════════════════════════════════════════════════
   WelcomeBackScreen — post-login welcome overlay
   ══════════════════════════════════════════════════ */
export default function WelcomeBackScreen({
  onDismiss,
}: {
  onDismiss: () => void;
}) {
  const { user } = useUser();
  const router = useRouter();
  const [lang, setLang] = useState<Language>("km");

  /* Staged animation states */
  const [showLogo, setShowLogo] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);
  const [showBody, setShowBody] = useState(false);
  const [showActions, setShowActions] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShowLogo(true), 100);
    const t2 = setTimeout(() => setShowGreeting(true), 400);
    const t3 = setTimeout(() => setShowBody(true), 700);
    const t4 = setTimeout(() => setShowActions(true), 1000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  const t = content[lang];
  const firstName =
    user?.firstName || user?.username || (lang === "km" ? "កសិករ" : "Farmer");

  function handleStart() {
    onDismiss();
  }

  function handleDashboard() {
    onDismiss();
    router.push("/");
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: "var(--bg, #171717)" }}
    >
      <FloatingParticles />

      <div className="relative z-10 flex flex-col items-center justify-between min-h-screen min-h-dvh max-w-md mx-auto px-6 py-8 w-full">
        {/* Top bar — language toggle + skip */}
        <div className="w-full flex items-center justify-between pt-1">
          <button
            onClick={onDismiss}
            className="text-xs font-medium transition hover:text-emerald-400 cursor-pointer"
            style={{ color: "var(--muted, #a8a29e)" }}
          >
            {t.skipLabel}
          </button>
          <LanguageToggle
            lang={lang}
            onToggle={() => setLang((l) => (l === "km" ? "en" : "km"))}
          />
        </div>

        {/* Center content */}
        <div className="flex-1 flex flex-col items-center justify-center text-center -mt-8">
          {/* Logo with glow */}
          <div
            className="relative mb-8 transition-all duration-700 ease-out"
            style={{
              opacity: showLogo ? 1 : 0,
              transform: showLogo ? "scale(1) translateY(0)" : "scale(0.8) translateY(20px)",
            }}
          >
            <div
              className="absolute inset-0 rounded-3xl blur-3xl opacity-25"
              style={{ backgroundColor: "#34d399" }}
              aria-hidden="true"
            />
            <BrandLogo size="hero" className="relative" />
          </div>

          {/* Greeting */}
          <div
            className="transition-all duration-600 ease-out mb-2"
            style={{
              opacity: showGreeting ? 1 : 0,
              transform: showGreeting ? "translateY(0)" : "translateY(16px)",
            }}
          >
            <h1
              className="text-2xl font-extrabold tracking-tight"
              style={{ color: "var(--text, #fafaf9)" }}
            >
              {t.greeting(firstName)}
            </h1>
            <p
              className="text-xs font-semibold mt-1"
              style={{ color: "var(--accent-bright, #34d399)" }}
            >
              M23 Advisor · ជំនួយការស្វាយចន្ទី
            </p>
          </div>

          {/* Divider */}
          <div
            className="w-10 h-0.5 rounded-full my-5 transition-all duration-500"
            style={{
              backgroundColor: "var(--accent-fill, #065f46)",
              opacity: showBody ? 1 : 0,
              transform: showBody ? "scaleX(1)" : "scaleX(0)",
            }}
            aria-hidden="true"
          />

          {/* Encouragement message */}
          <div
            className="transition-all duration-600 ease-out max-w-[320px]"
            style={{
              opacity: showBody ? 1 : 0,
              transform: showBody ? "translateY(0)" : "translateY(16px)",
            }}
          >
            <p
              className="text-sm leading-relaxed mb-5"
              style={{ color: "var(--muted, #a8a29e)" }}
            >
              {t.encouragement}
            </p>

            {/* Feature pills */}
            <div className="flex flex-wrap justify-center gap-2 mb-5">
              {features[lang].map((f) => (
                <span
                  key={f.text}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
                  style={{
                    backgroundColor: "#1e1e1e",
                    border: "1px solid #2e2e2e",
                    color: "var(--text, #fafaf9)",
                  }}
                >
                  <span>{f.icon}</span>
                  {f.text}
                </span>
              ))}
            </div>

            {/* Tip */}
            <p
              className="text-[11px] leading-relaxed italic"
              style={{ color: "#6b7280" }}
            >
              💡 {t.tip}
            </p>
          </div>
        </div>

        {/* Bottom CTA buttons */}
        <div
          className="w-full space-y-3 pb-4 transition-all duration-700 ease-out"
          style={{
            opacity: showActions ? 1 : 0,
            transform: showActions ? "translateY(0)" : "translateY(24px)",
          }}
        >
          {/* Primary CTA */}
          <button
            onClick={handleStart}
            className="flex items-center justify-center w-full py-3.5 rounded-2xl text-base font-bold text-white transition-all duration-200 hover:brightness-110 active:scale-[0.98] shadow-lg cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#171717]"
            style={{ backgroundColor: "#059669" }}
          >
            🌿 {t.cta}
          </button>

          {/* Secondary CTA */}
          <button
            onClick={handleDashboard}
            className="flex items-center justify-center w-full py-3.5 rounded-2xl text-base font-bold transition-all duration-200 hover:bg-white/5 active:scale-[0.98] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#171717]"
            style={{
              color: "var(--accent-bright, #34d399)",
              border: "1.5px solid #34d399",
            }}
          >
            📊 {t.ctaSecondary}
          </button>
        </div>
      </div>

      {/* Keyframe animation for floating particles */}
      <style jsx>{`
        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0) translateX(0);
          }
          33% {
            transform: translateY(-12px) translateX(6px);
          }
          66% {
            transform: translateY(8px) translateX(-8px);
          }
        }
      `}</style>
    </div>
  );
}
