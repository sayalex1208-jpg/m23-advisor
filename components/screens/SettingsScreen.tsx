"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useUser, useClerk } from "@clerk/nextjs";
import type { Language } from "@/types/agronomy";

export interface ProfileData {
  username: string;
  phone: string;
  email: string;
  farmLocation: string;
}

export interface PreferencesData {
  weatherAlerts: boolean;
  wateringReminders: boolean;
  harvestAlerts: boolean;
}

interface SettingsScreenProps {
  lang: Language;
  onLangChange: (lang: Language) => void;
  profile: ProfileData;
  onSaveProfile: (profile: ProfileData) => void;
  preferences: PreferencesData;
  onUpdatePreferences: (prefs: PreferencesData) => void;
  isGuest?: boolean;
  onExitGuest?: () => void;
}

function ToggleSwitch({
  active,
  onToggle,
}: {
  active: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      className={`toggle-switch ${active ? "active" : "inactive"}`}
      role="switch"
      aria-checked={active}
      type="button"
    >
      <div className="toggle-knob" />
    </button>
  );
}

export default function SettingsScreen({
  lang,
  onLangChange,
  profile,
  onSaveProfile,
  preferences,
  onUpdatePreferences,
  isGuest,
  onExitGuest,
}: SettingsScreenProps) {
  const { user } = useUser();
  const { signOut } = useClerk();

  const authEmail = isGuest
    ? ""
    : (user?.primaryEmailAddress?.emailAddress ||
       user?.emailAddresses?.[0]?.emailAddress ||
       profile.email);

  const [editingProfile, setEditingProfile] = useState(false);
  const [editProfile, setEditProfile] = useState<ProfileData>({
    ...profile,
    email: authEmail,
  });
  const [validationError, setValidationError] = useState<string | null>(null);
  const [showSavedToast, setShowSavedToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  // Keep editProfile synced with profile and authEmail changes
  useEffect(() => {
    setEditProfile((prev) => ({
      ...prev,
      email: authEmail,
    }));
  }, [authEmail]);

  function handleStartEdit() {
    setEditProfile({ ...profile, email: authEmail });
    setValidationError(null);
    setEditingProfile(true);
  }

  function handleSaveProfile() {
    setValidationError(null);

    // Form Validation: Required fields
    if (!editProfile.username.trim()) {
      setValidationError(
        lang === "km" ? "សូមបញ្ចូលឈ្មោះអ្នកប្រើប្រាស់" : "Username is required"
      );
      return;
    }

    if (!editProfile.phone.trim()) {
      setValidationError(
        lang === "km" ? "សូមបញ្ចូលលេខទូរស័ព្ទ" : "Phone number is required"
      );
      return;
    }

    if (!editProfile.farmLocation.trim()) {
      setValidationError(
        lang === "km" ? "សូមបញ្ចូលទីតាំងចម្ការ" : "Farm location is required"
      );
      return;
    }

    const prevLocation = (profile.farmLocation || "").trim();
    const nextLocation = editProfile.farmLocation.trim();
    const locationChanged = prevLocation.toLowerCase() !== nextLocation.toLowerCase();

    const updatedProfile: ProfileData = {
      username: editProfile.username.trim(),
      phone: editProfile.phone.trim(),
      email: authEmail,
      farmLocation: nextLocation,
    };

    onSaveProfile(updatedProfile);
    setEditingProfile(false);

    const successMsg = locationChanged
      ? (lang === "km" ? `ទីតាំងត្រូវបានធ្វើបច្ចុប្បន្នភាពទៅជា ${nextLocation}` : `Location updated to ${nextLocation}`)
      : (lang === "km" ? "ព័ត៌មានប្រវត្តិរូបត្រូវបានរក្សាទុក!" : "Profile details saved successfully!");

    setToastMessage(successMsg);
    setShowSavedToast(true);
    setTimeout(() => setShowSavedToast(false), 3500);
  }

  function handleCancelEdit() {
    setEditProfile({ ...profile, email: authEmail });
    setValidationError(null);
    setEditingProfile(false);
  }

  function togglePref(key: keyof PreferencesData) {
    const nextVal = !preferences[key];
    onUpdatePreferences({ ...preferences, [key]: nextVal });

    const titles: Record<keyof PreferencesData, { en: string; km: string }> = {
      weatherAlerts: { en: "Weather alerts", km: "ការជូនដំណឹងអាកាសធាតុ" },
      wateringReminders: { en: "Watering reminders", km: "ការរំលឹកស្រោចទឹក" },
      harvestAlerts: { en: "Harvest alerts", km: "ការជូនដំណឹងប្រមូលផល" },
    };

    const label = titles[key][lang];
    const statusText = nextVal
      ? (lang === "km" ? "ត្រូវបានបើកដំណើរការ" : "enabled")
      : (lang === "km" ? "ត្រូវបានបិទ" : "muted");

    setToastMessage(`${label} ${statusText}`);
    setShowSavedToast(true);
    setTimeout(() => setShowSavedToast(false), 2500);
  }

  async function handleLogout() {
    setLoggingOut(true);
    try {
      localStorage.removeItem("m23_guest_mode");
      localStorage.removeItem("m23_profile_data");
      localStorage.removeItem("m23_farm_location");
    } catch {
      // ignore
    }

    if (isGuest && onExitGuest) {
      onExitGuest();
      return;
    }
    try {
      await signOut();
    } catch {
      // ignore
    } finally {
      setLoggingOut(false);
      setShowLogoutConfirm(false);
      window.location.reload();
    }
  }

  return (
    <div className="space-y-3.5 tab-content pb-4">
      {/* ── SUCCESS TOAST NOTIFICATION ── */}
      {showSavedToast && (
        <div
          className="fixed top-4 left-4 right-4 max-w-md mx-auto z-50 rounded-xl p-3 flex items-center justify-between shadow-xl toast-enter"
          style={{
            backgroundColor: "#0d3320",
            border: "1px solid #27a645",
          }}
        >
          <div className="flex items-center gap-2.5">
            <span
              className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 text-white"
              style={{ backgroundColor: "#27a645" }}
            >
              ✓
            </span>
            <span className="text-xs font-bold text-white">
              {toastMessage || (lang === "km"
                ? "ព័ត៌មានប្រវត្តិរូបត្រូវបានរក្សាទុក!"
                : "Profile details saved successfully!")}
            </span>
          </div>
          <button
            onClick={() => setShowSavedToast(false)}
            className="text-xs text-zinc-400 hover:text-white px-1.5 py-0.5 rounded cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* ── GUEST MODE BANNER ── */}
      {isGuest && (
        <div
          className="rounded-2xl p-4 shadow-sm"
          style={{
            backgroundColor: "#2a1c06",
            border: "1px solid rgba(251, 191, 36, 0.4)",
          }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <span>👤</span>
              <span>{lang === "km" ? "របៀបភ្ញៀវ (សាកល្បង)" : "Guest Exploration Mode"}</span>
            </span>
            <Link
              href="/sign-in"
              className="text-[10px] px-2.5 py-1 rounded-lg font-bold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: "var(--accent)" }}
            >
              {lang === "km" ? "ចូលគណនី" : "Sign In"}
            </Link>
          </div>
          <p className="text-xs text-amber-200/80 leading-relaxed">
            {lang === "km"
              ? "អ្នកកំពុងប្រើប្រាស់ជាភ្ញៀវ។ បង្កើតគណនី ឬចូលគណនី ដើម្បីរក្សាទុកទិន្នន័យចម្ការរបស់អ្នកទៅលើ Cloud ជារៀងរហូត។"
              : "You are exploring as a guest. Create an account or sign in to save your orchard data permanently."}
          </p>
        </div>
      )}

      {/* ── GOOGLE / AUTH ACCOUNT SECTION (Only for authenticated users) ── */}
      {!isGuest && (
        <div
          className="rounded-2xl p-4 shadow-sm"
          style={{
            backgroundColor: "var(--card)",
            border: "1px solid var(--border)",
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="font-bold text-sm flex items-center gap-2" style={{ color: "var(--text)" }}>
              <span className="text-base">🔐</span>
              <span>{lang === "km" ? "គណនីចូលប្រើប្រាស់ (Account)" : "Google Account"}</span>
            </div>
            <span
              className="text-[10px] px-2 py-0.5 rounded-full font-bold flex items-center gap-1"
              style={{
                backgroundColor: "rgba(39, 166, 69, 0.15)",
                color: "#27a645",
                border: "1px solid rgba(39, 166, 69, 0.3)",
              }}
            >
              <span>✓</span>
              <span>{lang === "km" ? "ផ្ទៀងផ្ទាត់រួច" : "Verified"}</span>
            </span>
          </div>

          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center gap-3">
            {user?.imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={user.imageUrl}
                alt="Avatar"
                className="w-10 h-10 rounded-full object-cover border border-[#27a645]/40 shrink-0"
              />
            ) : (
              <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm bg-[#1e2920] text-[#27a645] border border-[#27a645]/30 shrink-0">
                {(authEmail[0] || "U").toUpperCase()}
              </div>
            )}
            <div className="min-w-0 flex-1">
              <div className="text-[11px] font-medium" style={{ color: "var(--muted)" }}>
                {lang === "km" ? "បានចូលប្រើប្រាស់ជា:" : "Logged in as:"}
              </div>
              <div className="text-xs font-bold text-white truncate" title={authEmail}>
                {authEmail || "User"}
              </div>
              <div className="text-[10px] text-zinc-500 mt-0.5">
                {lang === "km" ? "ភ្ជាប់ជាមួយគណនីចូល (អ៊ីមែលអានប៉ុណ្ណោះ)" : "Linked via Google Auth · Read-only email"}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── PROFILE SECTION ── */}
      <div
        className="rounded-2xl p-4 shadow-sm"
        style={{
          backgroundColor: "var(--card)",
          border: "1px solid var(--border)",
        }}
      >
        <div className="flex items-center justify-between mb-3.5">
          <div className="font-bold text-sm flex items-center gap-2" style={{ color: "var(--text)" }}>
            <span>👤</span>
            <span>{lang === "km" ? "ព័ត៌មានប្រវត្តិរូប" : "Farmer Profile"}</span>
          </div>
          {!editingProfile && !isGuest && (
            <button
              onClick={handleStartEdit}
              className="text-xs font-semibold flex items-center gap-1 transition cursor-pointer hover:underline"
              style={{ color: "var(--accent)" }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 3a2.83 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
              </svg>
              <span>{lang === "km" ? "កែសម្រួល" : "Edit Profile"}</span>
            </button>
          )}
          {isGuest && (
            <span className="text-[10px] text-amber-400 font-semibold">
              {lang === "km" ? "របៀបភ្ញៀវ (អានប៉ុណ្ណោះ)" : "Guest Mode (Read-only)"}
            </span>
          )}
        </div>

        {/* Validation Error Banner */}
        {validationError && (
          <div className="mb-3 p-2.5 rounded-xl bg-red-950/70 border border-red-800 text-red-300 text-xs flex items-center gap-2">
            <span>⚠️</span>
            <span>{validationError}</span>
          </div>
        )}

        {editingProfile ? (
          /* Profile Edit Mode */
          <div className="space-y-3">
            {/* Username */}
            <div>
              <label className="block text-xs font-semibold mb-1" style={{ color: "var(--text)" }}>
                {lang === "km" ? "ឈ្មោះអ្នកប្រើប្រាស់ (Username)" : "Username"}
                <span className="text-red-400 ml-1">*</span>
              </label>
              <input
                type="text"
                value={editProfile.username}
                onChange={(e) => setEditProfile({ ...editProfile, username: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl text-sm font-semibold focus:outline-none focus:ring-1 focus:ring-[#27a645] transition"
                style={{
                  backgroundColor: "#0a0a0a",
                  color: "var(--text)",
                  border: "1px solid #3a3a3a",
                }}
                placeholder="e.g. Sokha"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-xs font-semibold mb-1" style={{ color: "var(--text)" }}>
                {lang === "km" ? "លេខទូរស័ព្ទ (Phone Number)" : "Phone Number"}
                <span className="text-red-400 ml-1">*</span>
              </label>
              <input
                type="tel"
                value={editProfile.phone}
                onChange={(e) => setEditProfile({ ...editProfile, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl text-sm font-semibold focus:outline-none focus:ring-1 focus:ring-[#27a645] transition"
                style={{
                  backgroundColor: "#0a0a0a",
                  color: "var(--text)",
                  border: "1px solid #3a3a3a",
                }}
                placeholder="+855 12 345 678"
              />
            </div>

            {/* Email Address (Non-editable / Tied to Auth) */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold" style={{ color: "var(--text)" }}>
                  {lang === "km" ? "អ៊ីមែល (Email Address)" : "Email Address"}
                </label>
                <span className="text-[10px] text-zinc-400 flex items-center gap-1 font-semibold">
                  <span>🔒</span>
                  <span>{lang === "km" ? "មិនអាចកែប្រែបាន" : "Read-only"}</span>
                </span>
              </div>
              <div className="relative">
                <input
                  type="email"
                  value={authEmail}
                  readOnly
                  disabled
                  className="w-full px-3.5 py-2.5 rounded-xl text-sm font-semibold cursor-not-allowed select-none opacity-80"
                  style={{
                    backgroundColor: "#141414",
                    color: "#888888",
                    border: "1px solid #2a2a2a",
                  }}
                />
                <span className="absolute right-3.5 top-2.5 text-xs text-zinc-500">
                  🔒
                </span>
              </div>
              <p className="text-[10px] text-zinc-500 mt-1">
                {lang === "km"
                  ? "អ៊ីមែលភ្ជាប់ជាមួយគណនី Google របស់អ្នក មិនអាចកែប្រែបានទេ"
                  : "Linked to your Google account and cannot be modified"}
              </p>
            </div>

            {/* Farm Location */}
            <div>
              <label className="block text-xs font-semibold mb-1" style={{ color: "var(--text)" }}>
                {lang === "km" ? "ទីតាំងចម្ការ (Farm Location)" : "Farm Location"}
                <span className="text-red-400 ml-1">*</span>
              </label>
              <input
                type="text"
                value={editProfile.farmLocation}
                onChange={(e) => setEditProfile({ ...editProfile, farmLocation: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl text-sm font-semibold focus:outline-none focus:ring-1 focus:ring-[#27a645] transition"
                style={{
                  backgroundColor: "#0a0a0a",
                  color: "var(--text)",
                  border: "1px solid #3a3a3a",
                }}
                placeholder="Kampong Cham"
              />
            </div>

            {/* Action buttons */}
            <div className="flex gap-2.5 pt-2">
              <button
                onClick={handleSaveProfile}
                className="flex-1 py-3 rounded-xl text-sm font-bold text-white transition active:scale-[0.98] cursor-pointer shadow-md"
                style={{ backgroundColor: "#27a645" }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#1f7d34")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#27a645")}
              >
                {lang === "km" ? "រក្សាទុក" : "Save Profile"}
              </button>
              <button
                onClick={handleCancelEdit}
                className="px-4 py-3 rounded-xl text-sm font-semibold transition active:scale-[0.98] cursor-pointer"
                style={{
                  backgroundColor: "#2a2a2a",
                  color: "var(--muted)",
                }}
              >
                {lang === "km" ? "បោះបង់" : "Cancel"}
              </button>
            </div>
          </div>
        ) : (
          /* Profile Read-Only View (with pencil icon on hover) */
          <div className="space-y-3">
            {/* Username */}
            <div
              onClick={handleStartEdit}
              className="flex items-center justify-between py-1.5 border-b group cursor-pointer hover:bg-white/[0.03] px-1.5 -mx-1.5 rounded-lg transition"
              style={{ borderColor: "var(--border)" }}
              title="Click to edit username"
            >
              <div>
                <div className="text-[11px]" style={{ color: "var(--muted)" }}>
                  {lang === "km" ? "ឈ្មោះអ្នកប្រើប្រាស់" : "Username"}
                </div>
                <div className="text-sm font-extrabold" style={{ color: "var(--text)" }}>
                  {profile.username}
                </div>
              </div>
              <span className="w-7 h-7 rounded-lg flex items-center justify-center text-zinc-400 group-hover:text-[#27a645] group-hover:bg-[#27a645]/10 transition">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 3a2.83 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
                </svg>
              </span>
            </div>

            {/* Phone */}
            <div
              onClick={handleStartEdit}
              className="flex items-center justify-between py-1.5 border-b group cursor-pointer hover:bg-white/[0.03] px-1.5 -mx-1.5 rounded-lg transition"
              style={{ borderColor: "var(--border)" }}
              title="Click to edit phone number"
            >
              <div>
                <div className="text-[11px]" style={{ color: "var(--muted)" }}>
                  {lang === "km" ? "លេខទូរស័ព្ទ" : "Phone Number"}
                </div>
                <div className="text-sm font-extrabold" style={{ color: "var(--text)" }}>
                  {profile.phone}
                </div>
              </div>
              <span className="w-7 h-7 rounded-lg flex items-center justify-center text-zinc-400 group-hover:text-[#27a645] group-hover:bg-[#27a645]/10 transition">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 3a2.83 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
                </svg>
              </span>
            </div>

            {/* Email (Read-only from Google Auth) */}
            <div
              className="flex items-center justify-between py-1.5 border-b px-1.5 -mx-1.5 rounded-lg"
              style={{ borderColor: "var(--border)" }}
              title="Email is tied to your Google login (read-only)"
            >
              <div>
                <div className="text-[11px]" style={{ color: "var(--muted)" }}>
                  {lang === "km" ? "អ៊ីមែល (Google Login)" : "Email (Google Login)"}
                </div>
                <div className="text-sm font-extrabold" style={{ color: "var(--text)" }}>
                  {authEmail}
                </div>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-white/[0.05] text-zinc-400 border border-white/[0.08] flex items-center gap-1">
                <span>🔒</span>
                <span>{lang === "km" ? "អានប៉ុណ្ណោះ" : "Read-only"}</span>
              </span>
            </div>

            {/* Farm Location */}
            <div
              onClick={handleStartEdit}
              className="flex items-center justify-between py-1.5 group cursor-pointer hover:bg-white/[0.03] px-1.5 -mx-1.5 rounded-lg transition"
              title="Click to edit farm location"
            >
              <div>
                <div className="text-[11px]" style={{ color: "var(--muted)" }}>
                  {lang === "km" ? "ទីតាំងចម្ការ" : "Farm Location"}
                </div>
                <div className="text-sm font-extrabold" style={{ color: "var(--text)" }}>
                  {profile.farmLocation}
                </div>
              </div>
              <span className="w-7 h-7 rounded-lg flex items-center justify-center text-zinc-400 group-hover:text-[#27a645] group-hover:bg-[#27a645]/10 transition">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 3a2.83 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
                </svg>
              </span>
            </div>
          </div>
        )}
      </div>

      {/* ── PREFERENCES SECTION ── */}
      <div
        className="rounded-2xl p-4 shadow-sm"
        style={{
          backgroundColor: "var(--card)",
          border: "1px solid var(--border)",
        }}
      >
        <div className="font-bold text-sm mb-3.5 flex items-center gap-2" style={{ color: "var(--text)" }}>
          <span>🔔</span>
          <span>{lang === "km" ? "ការកំណត់ការជូនដំណឹង" : "Alert Preferences"}</span>
        </div>

        <div className="space-y-1">
          {/* Weather Alerts Toggle */}
          <div className="flex items-center justify-between py-2.5">
            <div>
              <div className="text-xs font-bold" style={{ color: "var(--text)" }}>
                {lang === "km" ? "ការជូនដំណឹងអាកាសធាតុ" : "Enable weather alerts"}
              </div>
              <div className="text-[11px] mt-0.5" style={{ color: "var(--muted)" }}>
                {lang === "km"
                  ? "ទទួលដំណឹងភ្លៀង ខ្យល់ខ្លាំង និងសំណើមមុនបាញ់ថ្នាំ"
                  : "Forecast rain warnings and spraying conditions"}
              </div>
            </div>
            <ToggleSwitch
              active={preferences.weatherAlerts}
              onToggle={() => togglePref("weatherAlerts")}
            />
          </div>

          <div className="h-px" style={{ backgroundColor: "var(--border)" }} />

          {/* Watering Reminders Toggle */}
          <div className="flex items-center justify-between py-2.5">
            <div>
              <div className="text-xs font-bold" style={{ color: "var(--text)" }}>
                {lang === "km" ? "ការរំលឹកស្រោចទឹក" : "Watering reminders"}
              </div>
              <div className="text-[11px] mt-0.5" style={{ color: "var(--muted)" }}>
                {lang === "km"
                  ? "រំលឹកស្រោចទឹកដំណាំរៀងរាល់ ៣ ថ្ងៃក្នុងរដូវប្រាំង"
                  : "Reminders to maintain soil moisture during flowering"}
              </div>
            </div>
            <ToggleSwitch
              active={preferences.wateringReminders}
              onToggle={() => togglePref("wateringReminders")}
            />
          </div>

          <div className="h-px" style={{ backgroundColor: "var(--border)" }} />

          {/* Harvest Alerts Toggle */}
          <div className="flex items-center justify-between py-2.5">
            <div>
              <div className="text-xs font-bold" style={{ color: "var(--text)" }}>
                {lang === "km" ? "ការជូនដំណឹងប្រមូលផល" : "Harvest alerts"}
              </div>
              <div className="text-[11px] mt-0.5" style={{ color: "var(--muted)" }}>
                {lang === "km"
                  ? "ជូនដំណឹងពេលគ្រាប់ទុំ និងតម្លៃទីផ្សារគ្រាប់ឆៅ"
                  : "Countdown alerts when nuts drop and drying window starts"}
              </div>
            </div>
            <ToggleSwitch
              active={preferences.harvestAlerts}
              onToggle={() => togglePref("harvestAlerts")}
            />
          </div>
        </div>
      </div>

      {/* ── LANGUAGE SELECTION (English / Khmer) ── */}
      <div
        className="rounded-2xl p-4 shadow-sm"
        style={{
          backgroundColor: "var(--card)",
          border: "1px solid var(--border)",
        }}
      >
        <div className="font-bold text-sm mb-3 flex items-center gap-2" style={{ color: "var(--text)" }}>
          <span>🌐</span>
          <span>{lang === "km" ? "ជ្រើសរើសភាសា (Language)" : "Language Selection"}</span>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <button
            onClick={() => onLangChange("en")}
            type="button"
            className="py-3 px-3 rounded-xl text-xs font-bold transition cursor-pointer flex items-center justify-center gap-2"
            style={{
              backgroundColor: lang === "en" ? "var(--accent-fill)" : "#0a0a0a",
              border: lang === "en" ? "1.5px solid #27a645" : "1px solid var(--border)",
              color: lang === "en" ? "#27a645" : "var(--muted)",
            }}
          >
            <span className="text-sm">🇺🇸</span>
            <span>English</span>
            {lang === "en" && <span className="text-[#27a645] ml-1">✓</span>}
          </button>
          
          <button
            onClick={() => onLangChange("km")}
            type="button"
            className="py-3 px-3 rounded-xl text-xs font-bold transition cursor-pointer flex items-center justify-center gap-2"
            style={{
              backgroundColor: lang === "km" ? "var(--accent-fill)" : "#0a0a0a",
              border: lang === "km" ? "1.5px solid #27a645" : "1px solid var(--border)",
              color: lang === "km" ? "#27a645" : "var(--muted)",
            }}
          >
            <span className="text-sm">🇰🇭</span>
            <span>ភាសាខ្មែរ</span>
            {lang === "km" && <span className="text-[#27a645] ml-1">✓</span>}
          </button>
        </div>
      </div>

      {/* ── ABOUT SECTION WITH APP VERSION ── */}
      <div
        className="rounded-2xl p-4 shadow-sm"
        style={{
          backgroundColor: "var(--card)",
          border: "1px solid var(--border)",
        }}
      >
        <div className="font-bold text-sm mb-3 flex items-center gap-2" style={{ color: "var(--text)" }}>
          <span>ℹ️</span>
          <span>{lang === "km" ? "អំពីកម្មវិធី" : "About M23 Advisor"}</span>
        </div>

        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between py-1">
            <span style={{ color: "var(--muted)" }}>
              {lang === "km" ? "ឈ្មោះកម្មវិធី" : "Application"}
            </span>
            <span className="font-bold text-white">M23 Advisor Mobile</span>
          </div>

          <div className="flex items-center justify-between py-1 border-t" style={{ borderColor: "var(--border)" }}>
            <span style={{ color: "var(--muted)" }}>
              {lang === "km" ? "កំណែទម្រង់" : "App Version"}
            </span>
            <span className="font-bold text-[#27a645]">v1.0.0 (Production)</span>
          </div>

          <div className="flex items-center justify-between py-1 border-t" style={{ borderColor: "var(--border)" }}>
            <span style={{ color: "var(--muted)" }}>
              {lang === "km" ? "ក្រុមគោលដៅ" : "Target Agronomy"}
            </span>
            <span className="font-semibold text-zinc-300">Cambodian Cashew Farmers</span>
          </div>

          <div className="flex items-center justify-between py-1 border-t" style={{ borderColor: "var(--border)" }}>
            <span style={{ color: "var(--muted)" }}>
              {lang === "km" ? "ពូជស្វាយចន្ទី" : "Specialized Variety"}
            </span>
            <span className="font-semibold text-zinc-300">M23 Fast-Yielding Hybrid</span>
          </div>
        </div>
      </div>

      {/* ── LOGOUT BUTTON AT BOTTOM ── */}
      <div className="pt-2">
        <button
          onClick={() => setShowLogoutConfirm(true)}
          className="w-full py-3.5 rounded-2xl text-xs font-bold transition active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2 shadow-sm"
          style={{
            backgroundColor: "#181212",
            border: "1px solid #4a2222",
            color: "#ef5350",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#2a1515";
            e.currentTarget.style.borderColor = "#e53935";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#181212";
            e.currentTarget.style.borderColor = "#4a2222";
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          <span>{lang === "km" ? "ចាកចេញពីគណនី (Logout)" : "Logout"}</span>
        </button>
      </div>

      {/* Logout confirmation modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div
            className="w-full max-w-sm rounded-2xl p-5 shadow-2xl space-y-4"
            style={{
              backgroundColor: "var(--card)",
              border: "1px solid var(--border)",
            }}
          >
            <div className="text-center space-y-1">
              <span className="text-3xl block mb-2">👋</span>
              <div className="font-extrabold text-base" style={{ color: "var(--text)" }}>
                {lang === "km" ? "តើអ្នកចង់ចាកចេញមែនទេ?" : "Confirm Logout?"}
              </div>
              <div className="text-xs text-zinc-400">
                {lang === "km"
                  ? "ទិន្នន័យចម្ការរបស់អ្នកត្រូវបានរក្សាទុកដោយសុវត្ថិភាព។"
                  : "Your field records and preferences are securely saved on your device."}
              </div>
            </div>

            <div className="flex gap-2.5 pt-2">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                disabled={loggingOut}
                className="flex-1 py-2.5 rounded-xl text-xs font-semibold bg-[#2a2a2a] text-zinc-300 hover:bg-[#333] transition cursor-pointer"
              >
                {lang === "km" ? "បោះបង់" : "Cancel"}
              </button>
              <button
                onClick={handleLogout}
                disabled={loggingOut}
                className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-[#c62828] hover:bg-[#b71c1c] text-white transition cursor-pointer flex items-center justify-center gap-1.5"
              >
                {loggingOut ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>{lang === "km" ? "កំពុងចាកចេញ..." : "Logging out..."}</span>
                  </>
                ) : (
                  <span>{lang === "km" ? "យល់ព្រមចាកចេញ" : "Yes, Log Out"}</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
