export type Language = "km" | "en";

export interface Bullet {
  km: string;
  en: string;
}

export interface Chip {
  text: string;
  label_km: string;
  label_en: string;
}

export interface StageDetail {
  bullets: Bullet[];
  chips: Chip[];
}

export interface StageItem {
  id: number;
  en: string;
  km: string;
  period: string;
  icon: string;
}

export interface YieldEstimate {
  totalTrees: number;
  totalYieldKg: number;
  totalYieldTons: string;
  totalRevenueRiels: number;
  totalRevenueUSD: string;
  estimatedCostRiels: number;
  netProfitRiels: number;
  netProfitUSD: string;
}
