"use client";

import { useState } from "react";
import Link from "next/link";
import type { Language } from "@/types/agronomy";
import LanguageToggle from "@/components/common/LanguageToggle";
import BrandLogo from "@/components/common/BrandLogo";

/* ─── Floating cashew leaf decorations (background) ─── */
function FloatingLeaves() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Top-right cluster */}
      <svg
        className="absolute -top-6 -right-8 opacity-[0.07]"
        width="200"
        height="200"
        viewBox="0 0 200 200"
        fill="none"
      >
        <ellipse cx="100" cy="80" rx="70" ry="90" fill="#34d399" />
        <ellipse cx="140" cy="120" rx="50" ry="65" fill="#22c55e" />
      </svg>

      {/* Bottom-left cluster */}
      <svg
        className="absolute -bottom-12 -left-10 opacity-[0.06]"
        width="180"
        height="180"
        viewBox="0 0 180 180"
        fill="none"
      >
        <ellipse cx="90" cy="100" rx="80" ry="60" fill="#34d399" />
        <ellipse cx="50" cy="60" rx="45" ry="55" fill="#065f46" />
      </svg>

      {/* Mid-right subtle accent */}
      <svg
        className="absolute top-1/3 -right-4 opacity-[0.04]"
        width="100"
        height="140"
        viewBox="0 0 100 140"
        fill="none"
      >
        <ellipse cx="60" cy="70" rx="50" ry="70" fill="#34d399" />
      </svg>

      {/* Subtle grid dots pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle, #34d399 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />
    </div>
  );
}

/* ─── Content map ─── */
const content = {
  en: {
    tagline: "Smart guidance for Cambodian cashew farmers",
    description:
      "Get AI-powered advice on cashew cultivation, disease diagnosis, yield estimation, and weather-smart farming — all tailored for Cambodia.",
    signIn: "Sign In",
    createAccount: "Create Account",
    footer: "Empowering farmers with technology",
  },
  km: {
    tagline: "ការណែនាំឆ្លាតវៃសម្រាប់កសិករដាំស្វាយចន្ទីកម្ពុជា",
    description:
      "ទទួលបានការប្រឹក្សាដោយ AI អំពីការដាំស្វាយចន្ទី ការវិនិច្ឆ័យជំងឺ ការប៉ាន់ស្មានទិន្នផល និងកសិកម្មតាមអាកាសធាតុ — សម្រាប់កម្ពុជា។",
    signIn: "ចូលគណនី",
    createAccount: "បង្កើតគណនី",
    footer: "ពង្រឹងកសិករដោយបច្ចេកវិទ្យា",
  },
};

/* ─── Main Welcome Screen ─── */
export default function WelcomeScreen() {
  const [lang, setLang] = useState<Language>("km");
  const t = content[lang];

  return (
    <div
      className="relative flex flex-col items-center justify-between min-h-screen min-h-dvh max-w-md mx-auto px-6 py-8 overflow-hidden select-none"
      style={{ backgroundColor: "var(--bg)" }}
    >
      {/* Background decorations */}
      <FloatingLeaves />

      {/* ── Top section: Language toggle ── */}
      <div className="relative z-10 w-full flex justify-end pt-2">
        <LanguageToggle
          lang={lang}
          onToggle={() => setLang((l) => (l === "km" ? "en" : "km"))}
        />
      </div>

      {/* ── Center section: Logo, brand, tagline, description ── */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center -mt-4">
        {/* Logo with subtle glow */}
        <div className="relative mb-6">
          <div
            className="absolute inset-0 rounded-full blur-2xl opacity-20"
            style={{ backgroundColor: "#34d399" }}
            aria-hidden="true"
          />
          <BrandLogo size="hero" className="relative" />
        </div>

        {/* App name */}
        <h1
          className="text-3xl font-extrabold tracking-tight mb-1"
          style={{ color: "var(--text)" }}
        >
          M23 Advisor
        </h1>

        {/* Khmer sub-name */}
        <p
          className="text-sm font-medium mb-4 tracking-wide"
          style={{ color: "var(--accent-bright)" }}
        >
          ជំនួយការស្វាយចន្ទី M23
        </p>

        {/* Divider */}
        <div
          className="w-12 h-0.5 rounded-full mb-5"
          style={{ backgroundColor: "var(--accent-fill)" }}
          aria-hidden="true"
        />

        {/* Tagline */}
        <p
          className="text-base font-semibold leading-relaxed mb-3 max-w-[300px]"
          style={{ color: "var(--text)" }}
        >
          {t.tagline}
        </p>

        {/* Description */}
        <p
          className="text-sm leading-relaxed max-w-[300px]"
          style={{ color: "var(--muted)" }}
        >
          {t.description}
        </p>
      </div>

      {/* ── Bottom section: CTA buttons + footer ── */}
      <div className="relative z-10 w-full space-y-3 pb-4">
        {/* Sign In — Primary */}
        <Link
          href="/sign-in"
          className="flex items-center justify-center w-full py-3.5 rounded-2xl text-base font-bold text-white transition-all duration-200 hover:brightness-110 active:scale-[0.98] shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#171717]"
          style={{ backgroundColor: "#059669" }}
        >
          {t.signIn}
        </Link>

        {/* Create Account — Secondary / Outline */}
        <Link
          href="/sign-up"
          className="flex items-center justify-center w-full py-3.5 rounded-2xl text-base font-bold transition-all duration-200 hover:bg-white/5 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#171717]"
          style={{
            color: "var(--accent-bright)",
            border: "1.5px solid #34d399",
          }}
        >
          {t.createAccount}
        </Link>

        {/* Footer text */}
        <p
          className="text-center text-[11px] pt-3"
          style={{ color: "#525252" }}
        >
          🌿 {t.footer}
        </p>
      </div>
    </div>
  );
}
