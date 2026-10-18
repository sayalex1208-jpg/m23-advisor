/**
 * M23 Cashew Phenology & Lifecycle Calculation Engine
 * 
 * Maps elapsed days from seasonal pruning/cycle start to the 5 agronomic stages
 * of M23 Cashew cultivation in Cambodia.
 */

export interface M23StageInfo {
  id: number;
  nameEn: string;
  nameKm: string;
  icon: string;
  period: string;
  minDay: number;
  maxDay: number;
  tipEn: string;
  tipKm: string;
}

export const M23_LIFECYCLE_STAGES: M23StageInfo[] = [
  {
    id: 0,
    nameEn: "Planting & Pruning",
    nameKm: "ការដាំដុះ និងកាត់មែក",
    icon: "🌱",
    period: "Jun–Jul",
    minDay: 1,
    maxDay: 45,
    tipEn: "Prune dead branches after harvest and apply base NPK 15-15-15 + Urea into root zone.",
    tipKm: "កាត់មែកចាស់ៗចោលក្រោយប្រមូលផលរួច និងដាក់ជីទ្រាប់បាត NPK ១៥-១៥-១៥ + អ៊ុយរ៉េ។",
  },
  {
    id: 1,
    nameEn: "Vegetative Flush",
    nameKm: "ដំណាក់កាលលូតលាស់ស្លឹក",
    icon: "🌿",
    period: "Aug–Oct",
    minDay: 46,
    maxDay: 105,
    tipEn: "Foliar nutrition with NPK (high N) helps leaves turn dark green and hardened before flower flush.",
    tipKm: "បាញ់ជីស្លឹកដើម្បីឱ្យស្លឹកថ្មីឆាប់ចាស់រឹងមាំ ត្រៀមបញ្ចេញទងផ្កា។",
  },
  {
    id: 2,
    nameEn: "Flowering Stage",
    nameKm: "ការចេញផ្កា (រដូវផ្កា)",
    icon: "🌸",
    period: "Nov–Dec",
    minDay: 106,
    maxDay: 155,
    tipEn: "Day 15–20 after flower burst is high risk. Avoid EC sprays; apply Copper Hydroxide if fog persists.",
    tipKm: "ថ្ងៃទី ១៥-២០ ប្រថុយប្រថានបំផុត។ ជៀសវាងថ្នាំ EC; បាញ់ថ្នាំការពារផ្សិតពេលមានអ័ព្ទច្រើន។",
  },
  {
    id: 3,
    nameEn: "Fruit Development",
    nameKm: "ការលូតលាស់ក្តិបផ្លែ",
    icon: "🥭",
    period: "Jan–Feb",
    minDay: 156,
    maxDay: 210,
    tipEn: "Nut enlargement phase. Maintain soil moisture with irrigation every 3–4 days to prevent fruit drop.",
    tipKm: "ដំណាក់កាលគ្រាប់រីកធំ។ ស្រោចទឹកជាប្រចាំរៀងរាល់ ៣-៤ ថ្ងៃ ដើម្បីកុំឱ្យក្តិបជ្រុះ។",
  },
  {
    id: 4,
    nameEn: "Harvest & Drying",
    nameKm: "ការប្រមូលផល និងហាល",
    icon: "🌾",
    period: "Mar–May",
    minDay: 211,
    maxDay: 270,
    tipEn: "Collect fallen nuts within 2–3 days. Sun-dry for 2–3 days until moisture drops below 11%.",
    tipKm: "ប្រមូលគ្រាប់ដែលជ្រុះក្នុងរយៈពេល ២-៣ ថ្ងៃ។ ហាលថ្ងៃ ២-៣ ថ្ងៃ ឱ្យសំណើមក្រោម ១១%។",
  },
];

export interface LifecycleCalculationResult {
  dayOf: number;
  totalDays: number;
  progressPercent: number;
  currentStage: M23StageInfo;
  stageIndex: number;
  daysRemainingInStage: number;
  daysToHarvest: number;
  isHarvestSeason: boolean;
  cycleStartDate: string;
}

/**
 * Calculates real-time M23 lifecycle status based on cycle start date.
 * If no date provided, defaults to June 22nd of the current agricultural season
 * (which represents Day 118 / Flowering Stage on mid-October).
 */
export function calculateM23Lifecycle(
  cycleStartDateStr?: string,
  targetDate: Date = new Date()
): LifecycleCalculationResult {
  const now = targetDate;
  const currentYear = now.getFullYear();

  // Parse or default cycle start date
  let startDate: Date;
  if (cycleStartDateStr) {
    startDate = new Date(cycleStartDateStr);
    if (isNaN(startDate.getTime())) {
      startDate = new Date(currentYear, 5, 22); // June 22 default
    }
  } else {
    startDate = new Date(currentYear, 5, 22); // June 22 default
  }

  // Calculate elapsed days
  const diffMs = now.getTime() - startDate.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  // Keep within positive bounds 1 to 270
  const dayOf = Math.max(1, Math.min(270, diffDays + 1));

  // Flowering benchmark cycle duration is ~150 days (Planting to Fruit Set)
  const totalDays = 150;
  const progressPercent = Math.min(100, Math.round((dayOf / totalDays) * 100));

  // Determine stage
  let stageIndex = 2; // Default to flowering
  for (let i = 0; i < M23_LIFECYCLE_STAGES.length; i++) {
    const s = M23_LIFECYCLE_STAGES[i];
    if (dayOf >= s.minDay && dayOf <= s.maxDay) {
      stageIndex = i;
      break;
    }
  }
  if (dayOf > M23_LIFECYCLE_STAGES[M23_LIFECYCLE_STAGES.length - 1].maxDay) {
    stageIndex = M23_LIFECYCLE_STAGES.length - 1;
  }

  const currentStage = M23_LIFECYCLE_STAGES[stageIndex];
  const daysRemainingInStage = Math.max(0, currentStage.maxDay - dayOf);
  const daysToHarvest = Math.max(0, 211 - dayOf);
  const isHarvestSeason = dayOf >= 211;

  // Format cycle start date for inputs (YYYY-MM-DD)
  const cycleStartDate = startDate.toISOString().split("T")[0];

  return {
    dayOf,
    totalDays,
    progressPercent,
    currentStage,
    stageIndex,
    daysRemainingInStage,
    daysToHarvest,
    isHarvestSeason,
    cycleStartDate,
  };
}
