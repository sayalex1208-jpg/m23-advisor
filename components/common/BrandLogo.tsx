"use client";

/**
 * M23 Advisor — Brand Logo Component
 *
 * Renders the cashew-themed M23 logo at various sizes.
 * The icon depicts a kidney-shaped cashew nut with a pear-shaped
 * cashew apple above it, connected by a stem with leaf accents.
 *
 * Variants:
 *   - icon-only  (default): Just the cashew mark in a rounded container
 *   - with-text           : Icon + "M23 Advisor" text + optional Khmer subtitle
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
  sm:   { container: "w-8 h-8 rounded-lg",   icon: 28, text: "text-sm",  sub: "text-[10px]" },
  md:   { container: "w-9 h-9 rounded-xl",   icon: 32, text: "text-sm",  sub: "text-[10px]" },
  lg:   { container: "w-12 h-12 rounded-2xl", icon: 42, text: "text-lg", sub: "text-xs"     },
  xl:   { container: "w-16 h-16 rounded-2xl", icon: 56, text: "text-xl", sub: "text-xs"     },
  hero: { container: "w-20 h-20 rounded-3xl", icon: 70, text: "text-2xl",sub: "text-sm"     },
};

/* ── Cashew Icon SVG ── */
function CashewIcon({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="M23 Advisor cashew logo"
    >
      {/* Cashew nut — kidney / bean shape */}
      <path
        d="M22 54c-1.5-3-2-7-1-11 1.5-6 5-11 10-14 4-2.5 8-3 11-1.5 2.5 1.5 3.5 5 2.5 9-1.5 6-6 11-12 14-3 1.5-6 2.5-8.5 4-1 .5-1.5 0-2-.5z"
        fill="#34d399"
      />
      {/* Nut inner highlight */}
      <path
        d="M26 50c-1-2.5-1-5.5 0-8.5 1-4 3.5-7.5 7-10 2.5-1.5 5-2 7-1 1.5 1 2 3 1.5 5.5-1 4-4 7.5-8 10-2 1-4 2-5.5 3-.8.3-1.5.2-2-.5z"
        fill="#2dd4a0"
        opacity="0.4"
      />
      {/* Cashew apple (pear-shaped fruit above nut) */}
      <ellipse cx="40" cy="20" rx="7" ry="10" fill="#fbbf24" opacity="0.9" />
      <ellipse cx="40" cy="20" rx="4.5" ry="7" fill="#f59e0b" opacity="0.35" />
      {/* Stem connecting apple to nut */}
      <path
        d="M40 10c0-2 .5-3.5 2-4.5"
        stroke="#34d399"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Leaf at top of stem */}
      <path
        d="M43 6c3 .5 5 3 4.5 6-1.5-.5-3-1.5-4.5-2.5-.5-1.5-.5-2.5 0-3.5z"
        fill="#22c55e"
        opacity="0.85"
      />
      {/* Small secondary leaf */}
      <path
        d="M20 48c-2.5.5-5 0-6-2 1.5 0 3-.5 4.5-1.5.5 1 1 2 1.5 3.5z"
        fill="#22c55e"
        opacity="0.5"
      />
    </svg>
  );
}

export default function BrandLogo({ size = "md", showText = false, className = "" }: BrandLogoProps) {
  const s = sizeMap[size];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Icon container */}
      <div
        style={{ backgroundColor: "var(--accent-fill, #065f46)" }}
        className={`${s.container} flex items-center justify-center shrink-0`}
      >
        <CashewIcon size={s.icon} />
      </div>

      {/* Optional text */}
      {showText && (
        <div className="flex flex-col justify-center">
          <span
            className={`${s.text} font-extrabold tracking-tight leading-tight`}
            style={{ color: "var(--text, #fafaf9)" }}
          >
            M23 Advisor
          </span>
          <span
            className={`${s.sub} font-medium leading-tight`}
            style={{ color: "var(--accent-bright, #34d399)" }}
          >
            ជំនួយការស្វាយចន្ទី M23
          </span>
        </div>
      )}
    </div>
  );
}

/**
 * Standalone inline cashew SVG for embedding in other components
 * (e.g. welcome screen hero) without the container wrapper.
 */
export { CashewIcon };
