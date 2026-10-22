/**
 * Domain module for M23 Cashew yield, revenue, and production cost projections.
 */

export interface YieldCalculationResult {
  totalTrees: number;
  totalYieldKg: number;
  totalYieldTons: string;
  totalRevenueRiels: number;
  totalRevenueUSD: string;
  estimatedCostRiels: number;
  netProfitRiels: number;
  netProfitUSD: string;
}

export const RIELS_PER_USD = 4100;
export const DEFAULT_YIELD_PER_TREE_KG = 18; // Average mature M23 cashew yield per tree (kg)
export const DEFAULT_PRICE_PER_KG_RIEL = 6500; // Raw cashew nut price per kg (~$1.58 - $1.60)
export const DEFAULT_INPUT_COST_RATIO = 0.20; // ~20% expenditure for fertilizer (NPK/Urea), pest control, and labor

/**
 * Calculates cashew yield and financial metrics based on orchard size or tree count.
 */
export function calculateYieldAndProfit({
  trees,
  yieldPerTree = DEFAULT_YIELD_PER_TREE_KG,
  pricePerKg = DEFAULT_PRICE_PER_KG_RIEL,
  costRatio = DEFAULT_INPUT_COST_RATIO,
}: {
  trees: number;
  yieldPerTree?: number;
  pricePerKg?: number;
  costRatio?: number;
}): YieldCalculationResult {
  const safeTrees = Math.max(0, Math.round(trees));
  const totalYieldKg = safeTrees * Math.max(0, yieldPerTree);
  const totalYieldTons = (totalYieldKg / 1000).toFixed(1);
  const totalRevenueRiels = totalYieldKg * Math.max(0, pricePerKg);
  const totalRevenueUSD = (totalRevenueRiels / RIELS_PER_USD).toFixed(0);
  const estimatedCostRiels = totalRevenueRiels * Math.max(0, costRatio);
  const netProfitRiels = totalRevenueRiels - estimatedCostRiels;
  const netProfitUSD = (netProfitRiels / RIELS_PER_USD).toFixed(0);

  return {
    totalTrees: safeTrees,
    totalYieldKg,
    totalYieldTons,
    totalRevenueRiels,
    totalRevenueUSD,
    estimatedCostRiels,
    netProfitRiels,
    netProfitUSD,
  };
}
