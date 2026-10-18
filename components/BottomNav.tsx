"use client";

export type TabId = "dashboard" | "field-data" | "ai-advisor" | "settings";

interface Tab {
  id: TabId;
  labelEn: string;
  labelKm: string;
  icon: React.ReactNode;
}

const TABS: Tab[] = [
  {
    id: "dashboard",
    labelEn: "Dashboard",
    labelKm: "ផ្ទាំងគ្រប់គ្រង",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    id: "field-data",
    labelEn: "Field Data",
    labelKm: "ទិន្នន័យចម្ការ",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    id: "ai-advisor",
    labelEn: "AI Advisor",
    labelKm: "ទីប្រឹក្សា AI",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    id: "settings",
    labelEn: "Settings",
    labelKm: "ការកំណត់",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
  },
];

interface BottomNavProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
  lang: "km" | "en";
}

export default function BottomNav({ activeTab, onTabChange, lang }: BottomNavProps) {
  return (
    <nav
      className="fixed bottom-0 inset-x-0 z-40 max-w-md mx-auto"
      style={{
        backgroundColor: "#111111",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div className="flex items-stretch h-16">
        {TABS.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="flex-1 flex flex-col items-center justify-center py-1.5 relative transition-colors cursor-pointer select-none group"
              style={{
                color: isActive ? "#27a645" : "#999999",
              }}
              aria-label={lang === "km" ? tab.labelKm : tab.labelEn}
            >
              <span className={`transition-transform duration-150 ${isActive ? "scale-105" : "group-hover:scale-105"}`}>
                {tab.icon}
              </span>
              
              <div className="relative flex flex-col items-center mt-1">
                <span
                  className="text-[11px] font-semibold leading-tight tracking-tight"
                  style={{
                    color: isActive ? "#27a645" : "#999999",
                  }}
                >
                  {lang === "km" ? tab.labelKm : tab.labelEn}
                </span>

                {/* Active Tab: Green underline directly under label */}
                {isActive ? (
                  <span
                    className="w-full h-[2.5px] rounded-full mt-0.5"
                    style={{ backgroundColor: "#27a645" }}
                  />
                ) : (
                  <span className="w-full h-[2.5px] mt-0.5 opacity-0" />
                )}
              </div>
            </button>
          );
        })}
      </div>
      {/* Safe area padding for iOS */}
      <div className="h-[env(safe-area-inset-bottom)]" />
    </nav>
  );
}
