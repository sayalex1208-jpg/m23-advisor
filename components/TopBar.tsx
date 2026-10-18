"use client";

import { useUser, SignInButton, UserButton } from "@clerk/nextjs";
import BrandLogo from "@/components/common/BrandLogo";
import LanguageToggle from "@/components/common/LanguageToggle";
import type { Language } from "@/types/agronomy";

interface TopBarProps {
  lang: Language;
  onToggleLang: () => void;
}

export default function TopBar({ lang, onToggleLang }: TopBarProps) {
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
          <div className="font-bold text-sm" style={{ color: "var(--text)" }}>
            M23 Advisor
            <span style={{ color: "var(--accent)" }} className="font-semibold ml-1 text-xs">
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