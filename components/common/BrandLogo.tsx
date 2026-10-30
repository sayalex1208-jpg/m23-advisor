"use client";

import { useId } from "react";

/**
 * Mit Kasekor (មិត្តកសិករ) — Premium Brand Logo Component
 *
 * An iconic, modern AgriTech emblem combining:
 * 1. The Golden Cashew Apple (warm amber/gold gradient)
 * 2. The Signature M23 Crescent Nut (emerald/jade gradient with inner contour)
 * 3. A Sprouted Agronomy Leaf (fresh green growth)
 * 4. A subtle 4-point AI Star (precision agriculture & intelligence)
 */

interface BrandLogoProps {
  /** Preset size — controls both the container and internal icon */
  size?: "sm" | "md" | "lg" | "xl" | "hero";
  /** Show app name text next to the icon */
  showText?: boolean;
  /** Additional CSS classes on the outer wrapper */
  className?: string;
}

/* ── Size lookup table ── */
const sizeMap = {
  sm:   { container: "w-8 h-8 rounded-lg",     icon: 24, text: "text-sm",  sub: "text-[10px]" },
  md:   { container: "w-9 h-9 rounded-xl",     icon: 28, text: "text-sm",  sub: "text-[10px]" },
  lg:   { container: "w-12 h-12 rounded-2xl",  icon: 38, text: "text-lg",  sub: "text-xs"     },
  xl:   { container: "w-16 h-16 rounded-2xl",  icon: 50, text: "text-xl",  sub: "text-xs"     },
  hero: { container: "w-20 h-20 rounded-3xl",  icon: 64, text: "text-2xl", sub: "text-sm"     },
};

/* ── Modern Handcrafted Cashew Vector Emblem ── */
function CashewIcon({ size = 32 }: { size?: number }) {
  const uid = useId().replace(/:/g, "");

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Mit Kasekor M23 Cashew Logo"
      className="transition-transform duration-300 hover:scale-105"
    >
      <defs>
        {/* Golden Cashew Apple Gradient */}
        <linearGradient id={`appleGrad-${uid}`} x1="22" y1="12" x2="44" y2="36" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FDE047" />
          <stop offset="45%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>

        {/* M23 Cashew Nut Gradient */}
        <linearGradient id={`nutGrad-${uid}`} x1="18" y1="30" x2="44" y2="58" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#34D399" />
          <stop offset="50%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>

        {/* Leaf Gradient */}
        <linearGradient id={`leafGrad-${uid}`} x1="26" y1="4" x2="48" y2="16" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#86EFAC" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>

        {/* AI Star Sparkle Gradient */}
        <linearGradient id={`starGrad-${uid}`} x1="46" y1="10" x2="56" y2="20" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FDE68A" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>

        {/* Soft Drop Shadow Filter */}
        <filter id={`glowFilter-${uid}`} x="-15%" y="-15%" width="130%" height="130%" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#047857" floodOpacity="0.3" />
        </filter>
      </defs>

      <g filter={`url(#glowFilter-${uid})`}>
        {/* ── 1. CASHEW APPLE (Fleshy golden fruit above the nut) ── */}
        <path
          d="M 27 16 
             C 24 21, 21 26, 23 32 
             C 25 37, 30 39, 36 38 
             C 42 37, 46 33, 45 27 
             C 44 21, 39 16, 33 15 
             C 30 15, 28 15, 27 16 Z"
          fill={`url(#appleGrad-${uid})`}
        />

        {/* Apple Gloss Highlight */}
        <path
          d="M 28 18 
             C 25 22, 24 26, 25 30 
             C 24 26, 26 21, 30 18 
             C 31 17, 33 17, 34 17 
             C 31 17, 29 17, 28 18 Z"
          fill="#FFFFFF"
          opacity="0.4"
        />

        {/* ── 2. THE SIGNATURE M23 CASHEW NUT (Kidney/crescent shape below) ── */}
        <path
          d="M 23 34
             C 17 38, 14 46, 17 52
             C 20 57, 27 60, 34 58
             C 42 55, 47 48, 45 40
             C 43 33, 36 32, 31 35
             C 28 37, 26 41, 28 44
             C 30 46, 33 45, 34 43
             C 35 41, 37 38, 39 41
             C 40 44, 37 50, 31 52
             C 26 53, 22 51, 20 47
             C 18 42, 21 37, 25 34 Z"
          fill={`url(#nutGrad-${uid})`}
        />

        {/* Nut Inner Ridge Contour Line */}
        <path
          d="M 23 44 
             C 22 47, 25 51, 29 52
             C 34 53, 38 49, 39 45"
          stroke="#6EE7B7"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.6"
        />

        {/* ── 3. SPROUTED AGRONOMY LEAF & STEM (Top) ── */}
        {/* Stem */}
        <path
          d="M 32 16 C 32 11, 34 8, 37 5"
          stroke="#10B981"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Primary Leaf */}
        <path
          d="M 37 5 
             C 41 3, 49 5, 50 11 
             C 50 14, 43 15, 38 12 
             C 37 10, 37 7, 37 5 Z"
          fill={`url(#leafGrad-${uid})`}
        />

        {/* Leaf Vein */}
        <path
          d="M 38 9 C 41 9, 45 10, 48 11"
          stroke="#D1FAE5"
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.8"
        />

        {/* Secondary Fresh Sprout */}
        <path
          d="M 33 11 
             C 29 8, 25 10, 24 13 
             C 26 15, 30 14, 33 12 Z"
          fill="#34D399"
          opacity="0.8"
        />

        {/* ── 4. AI PRECISION STAR SPARKLE (Top-Right) ── */}
        <path
          d="M 52 14 
             Q 52 18 56 18 
             Q 52 18 52 22 
             Q 52 18 48 18 
             Q 52 18 52 14 Z"
          fill={`url(#starGrad-${uid})`}
        />
        <circle cx="52" cy="18" r="1" fill="#FFFFFF" />
      </g>
    </svg>
  );
}

export default function BrandLogo({
  size = "md",
  showText = false,
  className = "",
}: BrandLogoProps) {
  const s = sizeMap[size];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Premium Badge Container with Subtle Inner Glow */}
      <div
        className={`${s.container} relative flex items-center justify-center shrink-0 shadow-md transition-all duration-300 hover:shadow-emerald-500/20`}
        style={{
          background: "linear-gradient(135deg, rgba(16, 185, 129, 0.18) 0%, rgba(5, 150, 105, 0.08) 100%)",
          border: "1px solid rgba(52, 211, 153, 0.3)",
          backdropFilter: "blur(8px)",
        }}
      >
        <CashewIcon size={s.icon} />
      </div>

      {/* Brand Typography & Subtitle */}
      {showText && (
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-1.5">
            <span
              className={`${s.text} font-black tracking-tight leading-tight`}
              style={{ color: "var(--text, #fafaf9)" }}
            >
              Mit Kasekor
            </span>
            <span className="text-[10px] uppercase font-extrabold px-1.5 py-0.5 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30">
              M23
            </span>
          </div>
          <span
            className={`${s.sub} font-medium leading-tight mt-0.5`}
            style={{ color: "var(--accent-bright, #34d399)" }}
          >
            មិត្តកសិករ · Cashew Advisor
          </span>
        </div>
      )}
    </div>
  );
}

export { CashewIcon };
