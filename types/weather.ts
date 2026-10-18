export interface CurrentWeather {
  temp: number;
  humidity: number;
  precipitation: number;
  windSpeed: number;
  code: number;
}

export interface DayForecast {
  date: string;
  code: number;
  maxTemp: number;
  minTemp: number;
  rain: number;
}

export interface WeatherData {
  current: CurrentWeather;
  daily: DayForecast[];
  locationName?: string;
}

export type SprayStatus = "good" | "caution" | "bad";

export interface SprayStatusInfo {
  label: string;
  labelKm: string;
  color: string;
  bg: string;
  icon: string;
}
