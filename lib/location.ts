export interface ProvinceInfo {
  en: string;
  km: string;
}

export const CAMBODIAN_PROVINCES: Record<string, ProvinceInfo> = {
  "siemreap": { en: "Siemreap", km: "ខេត្តសៀមរាប" },
  "siem reap": { en: "Siem Reap", km: "ខេត្តសៀមរាប" },
  "kampong cham": { en: "Kampong Cham", km: "ខេត្តកំពង់ចាម" },
  "kompong cham": { en: "Kampong Cham", km: "ខេត្តកំពង់ចាម" },
  "kampong thom": { en: "Kampong Thom", km: "ខេត្តកំពង់ធំ" },
  "kompong thom": { en: "Kampong Thom", km: "ខេត្តកំពង់ធំ" },
  "battambang": { en: "Battambang", km: "ខេត្តបាត់ដំបង" },
  "kratie": { en: "Kratie", km: "ខេត្តក្រចេះ" },
  "ratanakiri": { en: "Ratanakiri", km: "ខេត្តរតនគិរី" },
  "mondulkiri": { en: "Mondulkiri", km: "ខេត្តមណ្ឌលគិរី" },
  "preah vihear": { en: "Preah Vihear", km: "ខេត្តព្រះវិហារ" },
  "tbong khmum": { en: "Tbong Khmum", km: "ខេត្តត្បូងឃ្មុំ" },
  "pursat": { en: "Pursat", km: "ខេត្តពោធិ៍សាត់" },
  "kampot": { en: "Kampot", km: "ខេត្តកំពត" },
  "takeo": { en: "Takeo", km: "ខេត្តតាកែវ" },
  "phnom penh": { en: "Phnom Penh", km: "រាជធានីភ្នំពេញ" },
  "stung treng": { en: "Stung Treng", km: "ខេត្តស្ទឹងត្រែង" },
  "oddar meanchey": { en: "Oddar Meanchey", km: "ខេត្តឧត្តរមានជ័យ" },
  "banteay meanchey": { en: "Banteay Meanchey", km: "ខេត្តបន្ទាយមានជ័យ" },
  "kandal": { en: "Kandal", km: "ខេត្តកណ្តាល" },
  "prey veng": { en: "Prey Veng", km: "ខេត្តព្រៃវែង" },
  "svay rieng": { en: "Svay Rieng", km: "ខេត្តស្វាយរៀង" },
  "koh kong": { en: "Koh Kong", km: "ខេត្តកោះកុង" },
  "kampong chhnang": { en: "Kampong Chhnang", km: "ខេត្តកំពង់ឆ្នាំង" },
  "kampong speu": { en: "Kampong Speu", km: "ខេត្តកំពង់ស្ពឺ" },
  "kep": { en: "Kep", km: "ខេត្តកែប" },
  "pailin": { en: "Pailin", km: "ខេត្តប៉ៃលិន" },
  "sihanoukville": { en: "Sihanoukville", km: "ខេត្តព្រះសីហនុ" },
  "preah sihanouk": { en: "Preah Sihanouk", km: "ខេត្តព្រះសីហនុ" },
};

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
