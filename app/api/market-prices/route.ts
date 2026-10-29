import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const PRICES_DATA_FILE = path.join(process.cwd(), "data", "prices.json");

export interface ProvinceMarketPrice {
  id: string;
  nameEn: string;
  nameKm: string;
  priceRiel: number;
  priceUSD: string;
  trend: "up" | "down" | "stable";
  changePercent: string;
  lastUpdated: string;
  reportedBy?: string;
}

const BASE_PROVINCES = [
  { id: "kampong-cham", nameEn: "Kampong Cham", nameKm: "កំពង់ចាម", basePrice: 6800 },
  { id: "ratanakiri", nameEn: "Ratanakiri", nameKm: "រតនគិរី", basePrice: 6500 },
  { id: "kampong-thom", nameEn: "Kampong Thom", nameKm: "កំពង់ធំ", basePrice: 6600 },
  { id: "kratie", nameEn: "Kratie", nameKm: "ក្រចេះ", basePrice: 6400 },
  { id: "mondulkiri", nameEn: "Mondulkiri", nameKm: "មណ្ឌលគិរី", basePrice: 6300 },
  { id: "tbong-khmum", nameEn: "Tbong Khmum", nameKm: "ត្បូងឃ្មុំ", basePrice: 6700 },
  { id: "preah-vihear", nameEn: "Preah Vihear", nameKm: "ព្រះវិហារ", basePrice: 6450 },
  { id: "stung-treng", nameEn: "Stung Treng", nameKm: "ស្ទឹងត្រែង", basePrice: 6350 },
];

let inMemoryCustomPrices: Record<string, { priceRiel: number; reportedBy: string; date: string }> = {};

async function getCustomPrices(): Promise<Record<string, { priceRiel: number; reportedBy: string; date: string }>> {
  try {
    const raw = await fs.readFile(PRICES_DATA_FILE, "utf-8");
    const parsed = JSON.parse(raw);
    inMemoryCustomPrices = parsed;
    return parsed;
  } catch {
    return inMemoryCustomPrices;
  }
}

async function saveCustomPrices(data: Record<string, { priceRiel: number; reportedBy: string; date: string }>) {
  inMemoryCustomPrices = data;
  try {
    await fs.mkdir(path.dirname(PRICES_DATA_FILE), { recursive: true });
    await fs.writeFile(PRICES_DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error("Failed to write prices to disk", err);
  }
}

export async function GET() {
  const now = new Date();
  const dayOfYear = Math.floor(
    (now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24)
  );

  const customPrices = await getCustomPrices();

  const prices: ProvinceMarketPrice[] = BASE_PROVINCES.map((prov, index) => {
    const custom = customPrices[prov.id];

    if (custom) {
      const usd = (custom.priceRiel / 4100).toFixed(2);
      return {
        id: prov.id,
        nameEn: prov.nameEn,
        nameKm: prov.nameKm,
        priceRiel: custom.priceRiel,
        priceUSD: usd,
        trend: "up",
        changePercent: "+2.5",
        lastUpdated: custom.date || now.toISOString(),
        reportedBy: custom.reportedBy || "Community Farmer",
      };
    }

    const variance = Math.sin(dayOfYear * 0.15 + index) * 0.035;
    const priceRiel = Math.round((prov.basePrice * (1 + variance)) / 50) * 50;
    const usd = (priceRiel / 4100).toFixed(2);
    const pctChange = (variance * 100).toFixed(1);
    const trend: "up" | "down" | "stable" =
      variance > 0.005 ? "up" : variance < -0.005 ? "down" : "stable";

    return {
      id: prov.id,
      nameEn: prov.nameEn,
      nameKm: prov.nameKm,
      priceRiel,
      priceUSD: usd,
      trend,
      changePercent: variance >= 0 ? `+${pctChange}` : `${pctChange}`,
      lastUpdated: now.toISOString(),
    };
  });

  return NextResponse.json({
    timestamp: now.toISOString(),
    commodity: "Cashew Raw Nut (M23)",
    currency: "KHR",
    exchangeRateKHRtoUSD: 4100,
    prices,
  });
}

// POST /api/market-prices - Report community price
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { provinceId, priceRiel, reportedBy } = body;

    if (!provinceId || !priceRiel) {
      return NextResponse.json({ success: false, error: "Missing fields" }, { status: 400 });
    }

    const current = await getCustomPrices();
    current[provinceId] = {
      priceRiel: parseInt(priceRiel, 10),
      reportedBy: reportedBy || "Farmer Member",
      date: new Date().toISOString(),
    };

    await saveCustomPrices(current);

    return NextResponse.json({
      success: true,
      message: "Price updated across community",
      data: current[provinceId],
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err?.message }, { status: 500 });
  }
}
