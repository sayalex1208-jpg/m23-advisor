export interface ProvinceInfo {
  en: string;
  km: string;
  lat: number;
  lon: number;
}

export const CAMBODIAN_PROVINCES: Record<string, ProvinceInfo> = {
  "siemreap": { en: "Siem Reap", km: "ខេត្តសៀមរាប", lat: 13.3671, lon: 103.8448 },
  "siem reap": { en: "Siem Reap", km: "ខេត្តសៀមរាប", lat: 13.3671, lon: 103.8448 },
  "kampong cham": { en: "Kampong Cham", km: "ខេត្តកំពង់ចាម", lat: 11.9924, lon: 105.4645 },
  "kompong cham": { en: "Kampong Cham", km: "ខេត្តកំពង់ចាម", lat: 11.9924, lon: 105.4645 },
  "kampong thom": { en: "Kampong Thom", km: "ខេត្តកំពង់ធំ", lat: 12.7111, lon: 104.8887 },
  "kompong thom": { en: "Kampong Thom", km: "ខេត្តកំពង់ធំ", lat: 12.7111, lon: 104.8887 },
  "battambang": { en: "Battambang", km: "ខេត្តបាត់ដំបង", lat: 13.0957, lon: 103.2022 },
  "kratie": { en: "Kratie", km: "ខេត្តក្រចេះ", lat: 12.4881, lon: 106.0188 },
  "ratanakiri": { en: "Ratanakiri", km: "ខេត្តរតនគិរី", lat: 13.7394, lon: 106.9873 },
  "mondulkiri": { en: "Mondulkiri", km: "ខេត្តមណ្ឌលគិរី", lat: 12.4558, lon: 107.1881 },
  "preah vihear": { en: "Preah Vihear", km: "ខេត្តព្រះវិហារ", lat: 13.8073, lon: 104.9811 },
  "tbong khmum": { en: "Tbong Khmum", km: "ខេត្តត្បូងឃ្មុំ", lat: 11.9333, lon: 105.6500 },
  "pursat": { en: "Pursat", km: "ខេត្តពោធិ៍សាត់", lat: 12.5388, lon: 103.9192 },
  "kampot": { en: "Kampot", km: "ខេត្តកំពត", lat: 10.6104, lon: 104.1815 },
  "takeo": { en: "Takeo", km: "ខេត្តតាកែវ", lat: 10.9908, lon: 104.7850 },
  "phnom penh": { en: "Phnom Penh", km: "រាជធានីភ្នំពេញ", lat: 11.5564, lon: 104.9282 },
  "stung treng": { en: "Stung Treng", km: "ខេត្តស្ទឹងត្រែង", lat: 13.5259, lon: 105.9683 },
  "oddar meanchey": { en: "Oddar Meanchey", km: "ខេត្តឧត្តរមានជ័យ", lat: 14.1818, lon: 103.5176 },
  "banteay meanchey": { en: "Banteay Meanchey", km: "ខេត្តបន្ទាយមានជ័យ", lat: 13.5859, lon: 102.9737 },
  "kandal": { en: "Kandal", km: "ខេត្តកណ្តាល", lat: 11.4588, lon: 104.9544 },
  "prey veng": { en: "Prey Veng", km: "ខេត្តព្រៃវែង", lat: 11.4851, lon: 105.3253 },
  "svay rieng": { en: "Svay Rieng", km: "ខេត្តស្វាយរៀង", lat: 11.0879, lon: 105.7993 },
  "koh kong": { en: "Koh Kong", km: "ខេត្តកោះកុង", lat: 11.6153, lon: 102.9838 },
  "kampong chhnang": { en: "Kampong Chhnang", km: "ខេត្តកំពង់ឆ្នាំង", lat: 12.2500, lon: 104.6667 },
  "kampong speu": { en: "Kampong Speu", km: "ខេត្តកំពង់ស្ពឺ", lat: 11.4533, lon: 104.5209 },
  "kep": { en: "Kep", km: "ខេត្តកែប", lat: 10.4829, lon: 104.3167 },
  "pailin": { en: "Pailin", km: "ខេត្តប៉ៃលិន", lat: 12.8489, lon: 102.6093 },
  "sihanoukville": { en: "Sihanoukville", km: "ខេត្តព្រះសីហនុ", lat: 10.6275, lon: 103.5221 },
  "preah sihanouk": { en: "Preah Sihanouk", km: "ខេត្តព្រះសីហនុ", lat: 10.6275, lon: 103.5221 },
};

/**
 * Default fallback coordinates: Kampong Cham (Cambodia cashew farming center)
 */
export const DEFAULT_PROVINCE_COORDINATES = {
  nameEn: "Kampong Cham",
  nameKm: "ខេត្តកំពង់ចាម",
  lat: 11.9924,
  lon: 105.4645,
};

/**
 * Get latitude and longitude coordinates for a province name or fallback to Kampong Cham.
 */
export function getProvinceCoordinates(location?: string | null): {
  nameEn: string;
  nameKm: string;
  lat: number;
  lon: number;
} {
  if (!location || !location.trim()) {
    return DEFAULT_PROVINCE_COORDINATES;
  }

  const clean = location.trim().toLowerCase();
  const match = CAMBODIAN_PROVINCES[clean];

  if (match) {
    return {
      nameEn: match.en,
      nameKm: match.km,
      lat: match.lat,
      lon: match.lon,
    };
  }

  // Look for partial substring match
  for (const [key, val] of Object.entries(CAMBODIAN_PROVINCES)) {
    if (clean.includes(key) || key.includes(clean)) {
      return {
        nameEn: val.en,
        nameKm: val.km,
        lat: val.lat,
        lon: val.lon,
      };
    }
  }

  return DEFAULT_PROVINCE_COORDINATES;
}

/**
 * Format a location name according to the selected language (Khmer or English).
 * Preserves user entered casing for English if not in known map, and maps known provinces to Khmer.
 */
export function formatLocation(location: string | undefined | null, lang: "km" | "en" = "en"): string {
  if (!location || !location.trim()) {
    return lang === "km" ? "ខេត្តកំពង់ចាម" : "Kampong Cham";
  }

  const clean = location.trim();
  const normalized = clean.toLowerCase();

  // Check known map
  if (CAMBODIAN_PROVINCES[normalized]) {
    return lang === "km" ? CAMBODIAN_PROVINCES[normalized].km : clean;
  }

  // Check if text already has Khmer script
  const hasKhmerChars = /[\u1780-\u17FF]/.test(clean);
  if (lang === "km") {
    if (hasKhmerChars) {
      return clean.startsWith("ខេត្ត") || clean.startsWith("រាជធានី") ? clean : `ខេត្ត${clean}`;
    }
    return `ខេត្ត ${clean}`;
  }

  return clean;
}
