"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";
import type { TabId } from "@/components/BottomNav";
import DashboardScreen from "@/components/screens/DashboardScreen";
import type { FieldDataModel } from "@/components/screens/DashboardScreen";
import FieldDataScreen from "@/components/screens/FieldDataScreen";
import AiAdvisorScreen from "@/components/screens/AiAdvisorScreen";
import SettingsScreen from "@/components/screens/SettingsScreen";
import type { ProfileData, PreferencesData } from "@/components/screens/SettingsScreen";
import WelcomeScreen from "@/components/WelcomeScreen";
import WelcomeBackScreen from "@/components/WelcomeBackScreen";
import type { Language } from "@/types/agronomy";

const DEFAULT_FIELD_DATA: FieldDataModel = {
  area: "0.6",
  trees: "180",
  soilType: "laterite",
  waterSchedule: "every-3-days",
  fieldName: "M23 Planting",
  cycleStartDate: "2026-06-22",
};

const DEFAULT_PROFILE: ProfileData = {
  username: "Sokha",
  phone: "+855 12 345 678",
  email: "sokha.cashew@gmail.com",
  farmLocation: "Kampong Cham",
};

const DEFAULT_PREFERENCES: PreferencesData = {
  weatherAlerts: true,
  wateringReminders: true,
  harvestAlerts: false,
};

export default function Home() {
  const { isSignedIn, isLoaded, user } = useUser();
  const [lang, setLang] = useState<Language>("km");
  const [activeTab, setActiveTab] = useState<TabId>("dashboard");
  const [showWelcome, setShowWelcome] = useState(false);

  // Persistent state for field data, profile, and preferences
  const [fieldData, setFieldData] = useState<FieldDataModel>(DEFAULT_FIELD_DATA);
  const [profile, setProfile] = useState<ProfileData>(DEFAULT_PROFILE);
  const [preferences, setPreferences] = useState<PreferencesData>(DEFAULT_PREFERENCES);
  const [hydrated, setHydrated] = useState(false);

  // Load persisted state from localStorage on client mount
  useEffect(() => {
    try {
      const savedLang = localStorage.getItem("m23_app_lang") as Language | null;
      if (savedLang === "km" || savedLang === "en") {
        setLang(savedLang);
      }

      const savedField = localStorage.getItem("m23_field_data");
      if (savedField) {
        setFieldData(JSON.parse(savedField));
      }

      const savedProfile = localStorage.getItem("m23_profile_data");
      if (savedProfile) {
        setProfile(JSON.parse(savedProfile));
      }

      const savedPrefs = localStorage.getItem("m23_preferences_data");
      if (savedPrefs) {
        setPreferences(JSON.parse(savedPrefs));
      }
    } catch {
      // Safe fallback if localStorage is disabled or restricted
    } finally {
      setHydrated(true);
    }
  }, []);

  // Save changes to localStorage when updated
  function handleSaveFieldData(newData: FieldDataModel) {
    setFieldData(newData);
    try {
      localStorage.setItem("m23_field_data", JSON.stringify(newData));
    } catch {
      // Ignore storage errors
    }
  }

  function handleSaveProfile(newProfile: ProfileData) {
    // Ensure email is always the logged-in user's actual email
    const authEmail =
      user?.primaryEmailAddress?.emailAddress ||
      user?.emailAddresses?.[0]?.emailAddress ||
      newProfile.email;

    const finalizedProfile = {
      ...newProfile,
      email: authEmail,
    };

    setProfile(finalizedProfile);
    try {
      localStorage.setItem("m23_profile_data", JSON.stringify(finalizedProfile));
      localStorage.setItem("m23_farm_location", finalizedProfile.farmLocation);
      if (user?.id) {
        localStorage.setItem(`m23_profile_data_${user.id}`, JSON.stringify(finalizedProfile));
      }
    } catch {
      // Ignore storage errors
    }
  }

  function handleUpdatePreferences(newPrefs: PreferencesData) {
    setPreferences(newPrefs);
    try {
      localStorage.setItem("m23_preferences_data", JSON.stringify(newPrefs));
    } catch {
      // Ignore storage errors
    }
  }

  function handleLanguageChange(newLang: Language) {
    setLang(newLang);
    try {
      localStorage.setItem("m23_app_lang", newLang);
    } catch {
      // Ignore storage errors
    }
  }

  // Sync profile with authenticated user credentials upon login
  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      const authEmail =
        user.primaryEmailAddress?.emailAddress ||
        user.emailAddresses?.[0]?.emailAddress ||
        "";
      const authName =
        user.fullName ||
        [user.firstName, user.lastName].filter(Boolean).join(" ") ||
        user.username ||
        "";

      const userStorageKey = `m23_profile_data_${user.id}`;
      let loadedProfile: ProfileData = profile;

      try {
        const savedUserProf = localStorage.getItem(userStorageKey);
        if (savedUserProf) {
          loadedProfile = JSON.parse(savedUserProf);
        } else {
          const savedGlobalProf = localStorage.getItem("m23_profile_data");
          if (savedGlobalProf) {
            loadedProfile = JSON.parse(savedGlobalProf);
          }
        }
      } catch {
        // ignore
      }

      const syncedProfile: ProfileData = {
        username:
          loadedProfile.username && loadedProfile.username !== "Sokha"
            ? loadedProfile.username
            : (authName || loadedProfile.username || "Farmer"),
        phone: loadedProfile.phone || user.phoneNumbers?.[0]?.phoneNumber || "+855 12 345 678",
        email: authEmail || loadedProfile.email,
        farmLocation: loadedProfile.farmLocation || "Kampong Cham",
      };

      setProfile(syncedProfile);
      try {
        localStorage.setItem("m23_profile_data", JSON.stringify(syncedProfile));
        localStorage.setItem(userStorageKey, JSON.stringify(syncedProfile));
        localStorage.setItem("m23_farm_location", syncedProfile.farmLocation);
      } catch {
        // ignore
      }
    }
  }, [isLoaded, isSignedIn, user?.id, user?.primaryEmailAddress?.emailAddress]);

  // Real-time synchronization across browser tabs via storage events
  useEffect(() => {
    function handleStorageChange(e: StorageEvent) {
      if (!e.key || e.newValue === null) return;
      try {
        if (
          e.key === "m23_profile_data" ||
          (user && e.key === `m23_profile_data_${user.id}`)
        ) {
          const parsed = JSON.parse(e.newValue);
          setProfile((prev) => ({
            ...prev,
            ...parsed,
            email:
              user?.primaryEmailAddress?.emailAddress ||
              user?.emailAddresses?.[0]?.emailAddress ||
              parsed.email ||
              prev.email,
          }));
        } else if (e.key === "m23_farm_location") {
          setProfile((prev) => ({ ...prev, farmLocation: e.newValue || prev.farmLocation }));
        } else if (e.key === "m23_field_data") {
          setFieldData(JSON.parse(e.newValue));
        } else if (e.key === "m23_preferences_data") {
          setPreferences(JSON.parse(e.newValue));
        } else if (e.key === "m23_app_lang") {
          if (e.newValue === "km" || e.newValue === "en") {
            setLang(e.newValue as Language);
          }
        }
      } catch {
        // ignore storage parse errors
      }
    }

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [user]);

  /* Show welcome screen once per session after sign-in */
  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      const key = `m23_welcomed_${user.id}`;
      if (!sessionStorage.getItem(key)) {
        setShowWelcome(true);
        sessionStorage.setItem(key, "1");
      }
    }
  }, [isLoaded, isSignedIn, user]);

  // Show loading state while Clerk initializes
  if (!isLoaded || !hydrated) {
    return (
      <div
        className="flex items-center justify-center min-h-screen"
        style={{ backgroundColor: "var(--bg)" }}
      >
        <div className="flex flex-col items-center gap-3">
          <div
            className="w-9 h-9 border-2 rounded-full animate-spin"
            style={{
              borderColor: "var(--accent)",
              borderTopColor: "transparent",
            }}
          />
          <span className="text-xs font-semibold" style={{ color: "var(--muted)" }}>
            Loading M23 Advisor · ជំនួយការស្វាយចន្ទី...
          </span>
        </div>
      </div>
    );
  }

  // Show welcome/onboarding screen for unauthenticated users
  if (!isSignedIn) {
    return <WelcomeScreen />;
  }

  function renderScreen() {
    switch (activeTab) {
      case "dashboard":
        return (
          <DashboardScreen
            lang={lang}
            fieldData={fieldData}
            location={profile.farmLocation}
            preferences={preferences}
          />
        );
      case "field-data":
        return (
          <FieldDataScreen
            lang={lang}
            fieldData={fieldData}
            onSaveFieldData={handleSaveFieldData}
            location={profile.farmLocation}
          />
        );
      case "ai-advisor":
        return <AiAdvisorScreen lang={lang} />;
      case "settings":
        return (
          <SettingsScreen
            lang={lang}
            onLangChange={handleLanguageChange}
            profile={profile}
            onSaveProfile={handleSaveProfile}
            preferences={preferences}
            onUpdatePreferences={handleUpdatePreferences}
          />
        );
      default:
        return (
          <DashboardScreen
            lang={lang}
            fieldData={fieldData}
            location={profile.farmLocation}
            preferences={preferences}
          />
        );
    }
  }

  return (
    <>
      {/* Post-login welcome overlay */}
      {showWelcome && (
        <WelcomeBackScreen onDismiss={() => setShowWelcome(false)} />
      )}

      {/* Main Container - Mobile Responsive constrained to 420px max */}
      <div
        className="flex flex-col min-h-screen max-w-md mx-auto relative select-none"
        style={{ backgroundColor: "var(--bg)" }}
      >
        {/* Sticky Top Bar */}
        <TopBar
          lang={lang}
          onToggleLang={() => handleLanguageChange(lang === "km" ? "en" : "km")}
        />

        {/* Scrollable Viewport with tab content */}
        <main
          className="flex-1 px-4 py-3 overflow-y-auto no-scrollbar"
          style={{ paddingBottom: "76px" }}
        >
          {renderScreen()}
        </main>

        {/* Bottom Navigation Bar with 4 tabs */}
        <BottomNav
          activeTab={activeTab}
          onTabChange={setActiveTab}
          lang={lang}
        />
      </div>
    </>
  );
}
