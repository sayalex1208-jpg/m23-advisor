"use client";

import { useUser, SignInButton, UserButton } from "@clerk/nextjs";
import BrandLogo from "@/components/common/BrandLogo";
import LanguageToggle from "@/components/common/LanguageToggle";
import type { Language } from "@/types/agronomy";

interface TopBarProps {
  lang: Language;
  onToggleLang: () => void;
  isGuest?: boolean;
}

export default function TopBar({ lang, onToggleLang, isGuest }: TopBarProps) {
  const { isSignedIn, isLoaded } = useUser();

  return (
    <div
      style={{
        backgroundColor: "var(--card)",
        borderBottom: "1px solid var(--border)",
      }}
      className="flex items-center justify-between px-4 py-3 sticky top-0 z-10"
    >
      {/* Left side: Logo & App Title */}
      <div className="flex items-center gap-3">
        <BrandLogo size="md" />
        <div>
          <div className="font-bold text-sm flex items-center gap-1.5" style={{ color: "var(--text)" }}>
            <span>M23 Advisor</span>
            {isGuest && (
              <span className="text-[9px] px-1.5 py-0.2 rounded-md bg-amber-950 text-amber-300 border border-amber-600/30 font-bold">
                {lang === "km" ? "ភ្ញៀវ" : "Guest"}
              </span>
            )}
            <span style={{ color: "var(--accent)" }} className="font-semibold text-xs">
              · កើនផល · កើនលុយ
            </span>
          </div>
          <div className="text-xs" style={{ color: "var(--muted)" }}>
            More Yield · More Income
          </div>
        </div>
      </div>

      {/* Right side: Language Switcher & User Auth */}
      <div className="flex items-center gap-3">
        <LanguageToggle lang={lang} onToggle={onToggleLang} />

        {isLoaded && !isSignedIn && (
          <SignInButton mode="modal">
            <button
              className="text-white px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer"
              style={{ backgroundColor: "var(--accent)" }}
            >
              {lang === "km" ? "ចូលប្រើប្រាស់" : "Sign In"}
            </button>
          </SignInButton>
        )}

        {isLoaded && isSignedIn && (
          <UserButton showName={false} />
        )}
      </div>
    </div>
  );
}