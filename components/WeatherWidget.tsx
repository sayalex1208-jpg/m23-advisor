"use client";

import { useEffect, useState } from "react";
import type { CurrentWeather, DayForecast, WeatherData, SprayStatus, SprayStatusInfo } from "@/types/weather";

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

function weatherLabel(code: number): string {
  if (code === 0) return "Clear";
  if (code <= 3) return "Partly cloudy";
  if (code <= 48) return "Foggy";
  if (code <= 55) return "Drizzle";
  if (code <= 65) return "Rain";
  if (code <= 82) return "Showers";
  return "Thunderstorm";
}

function dayLabel(dateStr: string, index: number): string {
  if (index === 0) return "Today";
  if (index === 1) return "Tomorrow";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { weekday: "short" });
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
    labelKm: "កុំបាញ់ថ្នាំ",
    color: "#f87171",
    bg: "#450a0a",
    icon: "✕",
  },
};

export default function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [status, setStatus] = useState<"idle" | "locating" | "loading" | "ok" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    loadWeather();
  }, []);

  async function loadWeather() {
    setStatus("locating");
    try {
      const pos = await new Promise<GeolocationPosition>((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 8000 })
      );
      const { latitude, longitude } = pos.coords;
      setStatus("loading");

      const url =
        `https://api.open-meteo.com/v1/forecast` +
        `?latitude=${latitude}&longitude=${longitude}` +
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

      // reverse-geocode for a friendly location name
      let locationName: string | undefined;
      try {
        const geoRes = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
        );
        const geoData = await geoRes.json();
        locationName =
          geoData.address?.city ||
          geoData.address?.town ||
          geoData.address?.village ||
          geoData.address?.county ||
          geoData.address?.state;
      } catch {
        // location name is optional
      }

      setWeather({ current, daily, locationName });
      setStatus("ok");
    } catch (err) {
      setStatus("error");
      if (err instanceof GeolocationPositionError) {
        setErrorMsg("Location access denied. Enable location to see weather.");
      } else {
        setErrorMsg("Could not load weather. Check your connection.");
      }
    }
  }

  if (status === "idle" || status === "locating" || status === "loading") {
    return (
      <div
        style={{ backgroundColor: "var(--card)", borderBottom: "1px solid #2e2e2e" }}
        className="px-4 py-3 flex items-center gap-2"
      >
        <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
        <span className="text-xs" style={{ color: "var(--muted)" }}>
          {status === "locating" ? "Getting your location…" : "Loading weather…"}
        </span>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div
        style={{ backgroundColor: "var(--card)", borderBottom: "1px solid #2e2e2e" }}
        className="px-4 py-3 flex items-center justify-between"
      >
        <span className="text-xs" style={{ color: "var(--muted)" }}>
          🌦️ {errorMsg}
        </span>
        <button
          onClick={loadWeather}
          className="text-xs underline"
          style={{ color: "var(--accent-bright)" }}
        >
          Retry
        </button>
      </div>
    );
  }

  if (!weather) return null;

  const { current, daily, locationName } = weather;
  const tomorrowRain = daily[1]?.rain ?? 0;
  const sprayStatus = getSprayStatus(current, tomorrowRain);
  const spray = SPRAY_CONFIG[sprayStatus];

  return (
    <div
      style={{ backgroundColor: "var(--card)", borderBottom: "1px solid #2e2e2e" }}
      className="px-4 pt-3 pb-3"
    >
      {/* Header row */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: "var(--muted)" }}>
            Weather
          </span>
          {locationName && (
            <span className="text-xs" style={{ color: "var(--muted)" }}>
              · {locationName}
            </span>
          )}
        </div>
        <button
          onClick={() => setExpanded((e) => !e)}
          className="text-xs"
          style={{ color: "var(--accent-bright)" }}
        >
          {expanded ? "Less ▲" : "7-day ▼"}
        </button>
      </div>

      {/* Current conditions row */}
      <div className="flex items-center gap-3 mb-3">
        <span className="text-3xl">{weatherEmoji(current.code)}</span>
        <div>
          <div className="font-bold text-xl" style={{ color: "var(--text)" }}>
            {current.temp}°C
          </div>
          <div className="text-xs" style={{ color: "var(--muted)" }}>
            {weatherLabel(current.code)}
          </div>
        </div>
        <div className="ml-auto flex gap-3 text-xs" style={{ color: "var(--muted)" }}>
          <div className="text-center">
            <div className="text-base">💧</div>
            <div>{current.humidity}%</div>
            <div>Humidity</div>
          </div>
          <div className="text-center">
            <div className="text-base">🌧️</div>
            <div>{current.precipitation} mm</div>
            <div>Now</div>
          </div>
          <div className="text-center">
            <div className="text-base">💨</div>
            <div>{Math.round(current.windSpeed)} km/h</div>
            <div>Wind</div>
          </div>
        </div>
      </div>

      {/* Spray condition indicator */}
      <div
        className="rounded-xl px-3 py-2 flex items-center gap-2"
        style={{ backgroundColor: spray.bg, border: `1px solid ${spray.color}33` }}
      >
        <span
          className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
          style={{ backgroundColor: spray.color + "22", color: spray.color }}
        >
          {spray.icon}
        </span>
        <div>
          <div className="text-sm font-semibold" style={{ color: spray.color }}>
            {spray.labelKm}
          </div>
          <div className="text-xs" style={{ color: spray.color + "cc" }}>
            {spray.label}
            {sprayStatus === "bad" && current.precipitation > 0.5 && " · rain detected"}
            {sprayStatus === "bad" && tomorrowRain > 2 && " · rain forecast tomorrow"}
            {sprayStatus === "caution" && current.humidity > 80 && " · humidity too high"}
            {sprayStatus === "caution" && current.humidity < 45 && " · humidity too low"}
          </div>
        </div>
      </div>

      {/* 7-day forecast */}
      {expanded && (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {daily.map((day, i) => (
            <div
              key={day.date}
              className="flex flex-col items-center shrink-0 rounded-xl px-2 py-2 min-w-13"
              style={{
                backgroundColor: i === 0 ? "var(--accent-fill)" : "#2e2e2e",
                border: `1px solid ${i === 0 ? "#34d39944" : "#3f3f3f"}`,
              }}
            >
              <div className="text-xs font-semibold mb-1" style={{ color: i === 0 ? "var(--accent-bright)" : "var(--muted)" }}>
                {dayLabel(day.date, i)}
              </div>
              <div className="text-lg">{weatherEmoji(day.code)}</div>
              <div className="text-xs font-bold mt-1" style={{ color: "var(--text)" }}>
                {day.maxTemp}°
              </div>
              <div className="text-xs" style={{ color: "var(--muted)" }}>
                {day.minTemp}°
              </div>
              {day.rain > 0.5 && (
                <div className="text-xs mt-0.5" style={{ color: "#60a5fa" }}>
                  {day.rain.toFixed(1)}mm
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
