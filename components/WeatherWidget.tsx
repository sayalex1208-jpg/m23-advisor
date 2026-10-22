"use client";

import { useEffect, useState } from "react";
import type { CurrentWeather, DayForecast, WeatherData, SprayStatus, SprayStatusInfo } from "@/types/weather";
import { getProvinceCoordinates, formatLocation } from "@/lib/location";
import type { Language } from "@/types/agronomy";

function getSprayStatus(current: CurrentWeather, tomorrowRain: number): SprayStatus {
  const rainExpected = current.precipitation > 0.5 || tomorrowRain > 2;
  const humidityOk = current.humidity >= 45 && current.humidity <= 80;
  const windOk = current.windSpeed < 30;

  if (rainExpected || current.windSpeed > 40) return "bad";
  if (!humidityOk || !windOk) return "caution";
  return "good";
}

function weatherEmoji(code: number): string {
  if (code === 0) return "☀️";
  if (code <= 3) return "⛅";
  if (code <= 48) return "🌫️";
  if (code <= 55) return "🌦️";
  if (code <= 65) return "🌧️";
  if (code <= 82) return "🌩️";
  return "⛈️";
}

function weatherLabel(code: number, lang: Language = "en"): string {
  if (code === 0) return lang === "km" ? "មេឃស្រឡះ" : "Clear";
  if (code <= 3) return lang === "km" ? "មានពពកខ្លះ" : "Partly cloudy";
  if (code <= 48) return lang === "km" ? "ចុះអ័ព្ទ" : "Foggy";
  if (code <= 55) return lang === "km" ? "ភ្លៀងរលឹម" : "Drizzle";
  if (code <= 65) return lang === "km" ? "មានភ្លៀង" : "Rain";
  if (code <= 82) return lang === "km" ? "ភ្លៀងកក់ខែ" : "Showers";
  return lang === "km" ? "ផ្គររន្ទះ" : "Thunderstorm";
}

function dayLabel(dateStr: string, index: number, lang: Language = "en"): string {
  if (index === 0) return lang === "km" ? "ថ្ងៃនេះ" : "Today";
  if (index === 1) return lang === "km" ? "ថ្ងៃស្អែក" : "Tomorrow";
  const d = new Date(dateStr);
  return d.toLocaleDateString(lang === "km" ? "km-KH" : "en-US", { weekday: "short" });
}

const SPRAY_CONFIG: Record<SprayStatus, SprayStatusInfo> = {
  good: {
    label: "Good to spray",
    labelKm: "ល្អក្នុងការបាញ់ថ្នាំ",
    color: "#34d399",
    bg: "#052e16",
    icon: "✓",
  },
  caution: {
    label: "Spray with caution",
    labelKm: "ត្រូវប្រយ័ត្នក្នុងការបាញ់",
    color: "#fbbf24",
    bg: "#451a03",
    icon: "⚠",
  },
  bad: {
    label: "Avoid spraying",
    labelKm: "កុំបាញ់ថ្នាំ (មានភ្លៀង/ខ្យល់)",
    color: "#f87171",
    bg: "#450a0a",
    icon: "✕",
  },
};

interface WeatherWidgetProps {
  location?: string;
  lang?: Language;
}

export default function WeatherWidget({ location, lang = "km" }: WeatherWidgetProps) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [status, setStatus] = useState<"idle" | "locating" | "loading" | "ok" | "error">("idle");
  const [source, setSource] = useState<"gps" | "province">("province");
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    loadWeather();
  }, [location]);

  async function fetchForecast(lat: number, lon: number, locationName?: string, isGps = false) {
    const url =
      `https://api.open-meteo.com/v1/forecast` +
      `?latitude=${lat}&longitude=${lon}` +
      `&current=temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m,weather_code` +
      `&daily=precipitation_sum,temperature_2m_max,temperature_2m_min,weather_code` +
      `&timezone=Asia%2FPhnom_Penh&forecast_days=7`;

    const res = await fetch(url);
    if (!res.ok) throw new Error("Weather fetch failed");
    const data = await res.json();

    const current: CurrentWeather = {
      temp: Math.round(data.current.temperature_2m),
      humidity: data.current.relative_humidity_2m,
      precipitation: data.current.precipitation,
      windSpeed: data.current.wind_speed_10m,
      code: data.current.weather_code,
    };

    const daily: DayForecast[] = data.daily.time.map((date: string, i: number) => ({
      date,
      code: data.daily.weather_code[i],
      maxTemp: Math.round(data.daily.temperature_2m_max[i]),
      minTemp: Math.round(data.daily.temperature_2m_min[i]),
      rain: data.daily.precipitation_sum[i],
    }));

    setWeather({ current, daily, locationName });
    setSource(isGps ? "gps" : "province");
    setStatus("ok");
  }

  async function loadWeather() {
    setStatus("locating");
    const fallback = getProvinceCoordinates(location);

    try {
      // Attempt browser GPS with 4s timeout
      const pos = await new Promise<GeolocationPosition>((resolve, reject) => {
        if (!navigator.geolocation) {
          reject(new Error("No geolocation"));
          return;
        }
        navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 4000 });
      });

      const { latitude, longitude } = pos.coords;
      setStatus("loading");

      // Optional reverse geocoding
      let locationName: string | undefined;
      try {
        const geoRes = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
        );
        const geoData = await geoRes.json();
        locationName =
          geoData.address?.city ||
          geoData.address?.town ||
          geoData.address?.county ||
          geoData.address?.state;
      } catch {
        // ignore reverse geocoding error
      }

      await fetchForecast(latitude, longitude, locationName || formatLocation(location, lang), true);
    } catch {
      // Graceful fallback to user's saved farm province coordinates
      try {
        setStatus("loading");
        const resolvedName = lang === "km" ? fallback.nameKm : fallback.nameEn;
        await fetchForecast(fallback.lat, fallback.lon, resolvedName, false);
      } catch (err) {
        console.error("Failed to load fallback weather:", err);
        setStatus("error");
      }
    }
  }

  if (status === "idle" || status === "locating" || status === "loading") {
    return (
      <div
        style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }}
        className="rounded-2xl px-4 py-3 flex items-center gap-2 shadow-sm"
      >
        <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-xs font-medium" style={{ color: "var(--muted)" }}>
          {lang === "km" ? "កំពុងទាញយកទិន្នន័យអាកាសធាតុ..." : "Loading live weather data..."}
        </span>
      </div>
    );
  }

  if (status === "error" || !weather) {
    return (
      <div
        style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }}
        className="rounded-2xl px-4 py-3 flex items-center justify-between shadow-sm"
      >
        <span className="text-xs" style={{ color: "var(--muted)" }}>
          🌦️ {lang === "km" ? "មិនអាចទាញយកទិន្នន័យអាកាសធាតុបានទេ" : "Could not load weather. Check connection."}
        </span>
        <button
          onClick={loadWeather}
          className="text-xs underline font-semibold"
          style={{ color: "var(--accent)" }}
        >
          {lang === "km" ? "ព្យាយាមម្តងទៀត" : "Retry"}
        </button>
      </div>
    );
  }

  const { current, daily, locationName } = weather;
  const tomorrowRain = daily[1]?.rain ?? 0;
  const sprayStatus = getSprayStatus(current, tomorrowRain);
  const spray = SPRAY_CONFIG[sprayStatus];

  return (
    <div
      style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }}
      className="rounded-2xl px-4 pt-3.5 pb-3.5 shadow-sm space-y-3"
    >
      {/* Header row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold tracking-wider uppercase text-emerald-500">
            {lang === "km" ? "📍 អាកាសធាតុចម្ការ" : "📍 Field Weather"}
          </span>
          <span className="text-xs font-semibold" style={{ color: "var(--text)" }}>
            {locationName || formatLocation(location, lang)}
          </span>
          <span className="text-[9px] px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400 font-medium">
            {source === "gps" ? "GPS" : (lang === "km" ? "ខេត្ត" : "Province")}
          </span>
        </div>
        <button
          onClick={() => setExpanded((e) => !e)}
          className="text-xs font-semibold hover:underline cursor-pointer"
          style={{ color: "var(--accent)" }}
        >
          {expanded ? (lang === "km" ? "បង្រួម ▲" : "Less ▲") : (lang === "km" ? "៧ ថ្ងៃ ▼" : "7-day ▼")}
        </button>
      </div>

      {/* Current conditions row */}
      <div className="flex items-center gap-3">
        <span className="text-3xl">{weatherEmoji(current.code)}</span>
        <div>
          <div className="font-extrabold text-xl leading-tight" style={{ color: "var(--text)" }}>
            {current.temp}°C
          </div>
          <div className="text-xs font-medium" style={{ color: "var(--muted)" }}>
            {weatherLabel(current.code, lang)}
          </div>
        </div>
        <div className="ml-auto flex gap-3 text-xs" style={{ color: "var(--muted)" }}>
          <div className="text-center">
            <div className="text-sm">💧</div>
            <div className="font-semibold text-zinc-200">{current.humidity}%</div>
            <div className="text-[10px]">{lang === "km" ? "សំណើម" : "Humidity"}</div>
          </div>
          <div className="text-center">
            <div className="text-sm">🌧️</div>
            <div className="font-semibold text-zinc-200">{current.precipitation}mm</div>
            <div className="text-[10px]">{lang === "km" ? "ភ្លៀង" : "Precip"}</div>
          </div>
          <div className="text-center">
            <div className="text-sm">💨</div>
            <div className="font-semibold text-zinc-200">{Math.round(current.windSpeed)} km/h</div>
            <div className="text-[10px]">{lang === "km" ? "ខ្យល់" : "Wind"}</div>
          </div>
        </div>
      </div>

      {/* Spray condition indicator */}
      <div
        className="rounded-xl px-3 py-2 flex items-center gap-2.5"
        style={{ backgroundColor: spray.bg, border: `1px solid ${spray.color}44` }}
      >
        <span
          className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
          style={{ backgroundColor: spray.color + "22", color: spray.color }}
        >
          {spray.icon}
        </span>
        <div className="flex-1">
          <div className="text-xs font-bold" style={{ color: spray.color }}>
            {lang === "km" ? spray.labelKm : spray.label}
          </div>
          <div className="text-[10px] text-zinc-300">
            {sprayStatus === "good"
              ? (lang === "km" ? "អាកាសធាតុអំណោយផល សំណើម និងល្បឿនខ្យល់សមស្រប" : "Favorable conditions: low wind and balanced humidity")
              : sprayStatus === "caution"
              ? (lang === "km" ? "ប្រយ័ត្នខ្យល់ខ្លាំង ឬសំណើមទាប អាចបន្ថយប្រសិទ្ធភាពថ្នាំ" : "Caution: moderate wind or humidity may reduce effectiveness")
              : (lang === "km" ? "ជៀសវាងបាញ់ថ្នាំ — មានភ្លៀងធ្លាក់ ឬខ្យល់បោកបក់ខ្លាំង" : "Avoid spraying: high rain probability or high winds")}
          </div>
        </div>
      </div>

      {/* Expanded 7-day forecast */}
      {expanded && (
        <div className="pt-2 border-t border-zinc-800 grid grid-cols-7 gap-1 text-center">
          {daily.map((d, i) => (
            <div key={d.date} className="flex flex-col items-center py-1 rounded bg-zinc-900/40">
              <span className="text-[10px] text-zinc-400 font-medium">
                {dayLabel(d.date, i, lang)}
              </span>
              <span className="text-base my-0.5">{weatherEmoji(d.code)}</span>
              <span className="text-[10px] font-bold text-zinc-200">{d.maxTemp}°</span>
              <span className="text-[9px] text-zinc-500">{d.minTemp}°</span>
              {d.rain > 0 && (
                <span className="text-[8px] text-sky-400 font-semibold">{d.rain}mm</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
