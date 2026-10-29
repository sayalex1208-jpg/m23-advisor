import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

const DATA_FILE = path.join(process.cwd(), "data", "buyers.json");

let inMemoryBuyers: any[] = [];

async function getLocalBuyers(): Promise<any[]> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      inMemoryBuyers = parsed;
      return parsed;
    }
  } catch {
    // fallback
  }
  return inMemoryBuyers;
}

async function saveLocalBuyers(buyers: any[]): Promise<void> {
  inMemoryBuyers = buyers;
  try {
    await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
    await fs.writeFile(DATA_FILE, JSON.stringify(buyers, null, 2), "utf-8");
  } catch {
    // fallback
  }
}

// GET /api/buyers - Returns buyers from Supabase (or local fallback)
export async function GET() {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from("buyers")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data && data.length > 0) {
        // Map database columns to app format
        const mapped = data.map((b: any) => ({
          id: b.id,
          nameEn: b.name_en,
          nameKm: b.name_km || b.name_en,
          type: b.type,
          icon: b.icon || "🤝",
          locationEn: b.location_en,
          locationKm: b.location_km || b.location_en,
          phone: b.phone,
          descEn: b.desc_en,
          descKm: b.desc_km,
          buysRaw: b.buys_raw ?? true,
          buysProcessed: b.buys_processed ?? false,
          minQtyKg: b.min_qty_kg,
          priceRangeEn: b.price_range_en,
          priceRangeKm: b.price_range_km,
          verified: b.verified ?? false,
          isUserAdded: b.is_user_added ?? true,
          addedBy: b.added_by,
        }));

        return NextResponse.json({
          success: true,
          source: "supabase",
          count: mapped.length,
          buyers: mapped,
        });
      }
    } catch (err) {
      console.warn("Supabase fetch error, using local fallback", err);
    }
  }

  // Local file fallback
  const buyers = await getLocalBuyers();
  return NextResponse.json({
    success: true,
    source: "local",
    count: buyers.length,
    buyers,
  });
}

// POST /api/buyers - Adds a new buyer to Supabase (or local fallback)
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      nameEn,
      nameKm,
      type,
      locationEn,
      locationKm,
      phone,
      priceRangeEn,
      priceRangeKm,
      addedBy,
    } = body;

    if (!nameEn?.trim() || !phone?.trim()) {
      return NextResponse.json(
        { success: false, error: "Name and phone are required" },
        { status: 400 }
      );
    }

    const icon = type === "cooperative" ? "🤝" : type === "factory" ? "🏭" : type === "trader" ? "🚚" : "🌏";

    // 1. If Supabase is connected, write to Supabase
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from("buyers")
          .insert([
            {
              name_en: nameEn.trim(),
              name_km: nameKm?.trim() || nameEn.trim(),
              type: type || "trader",
              icon,
              location_en: locationEn || "Cambodia",
              location_km: locationKm || locationEn || "កម្ពុជា",
              phone: phone.trim(),
              desc_en: `Community contact added by ${addedBy || "a cashew farmer"}.`,
              desc_km: `ទំនាក់ទំនងអ្នកទិញដែលបានចែករំលែកដោយ ${addedBy || "កសិករក្នុងសហគមន៍"}។`,
              buys_raw: true,
              buys_processed: false,
              price_range_en: priceRangeEn || null,
              price_range_km: priceRangeKm || null,
              verified: false,
              is_user_added: true,
              added_by: addedBy || "Community Farmer",
            },
          ])
          .select();

        if (!error && data && data[0]) {
          const row = data[0];
          const newBuyer = {
            id: row.id,
            nameEn: row.name_en,
            nameKm: row.name_km,
            type: row.type,
            icon: row.icon,
            locationEn: row.location_en,
            locationKm: row.location_km,
            phone: row.phone,
            descEn: row.desc_en,
            descKm: row.desc_km,
            buysRaw: row.buys_raw,
            buysProcessed: row.buys_processed,
            priceRangeEn: row.price_range_en,
            priceRangeKm: row.price_range_km,
            verified: row.verified,
            isUserAdded: row.is_user_added,
            addedBy: row.added_by,
          };

          return NextResponse.json({
            success: true,
            source: "supabase",
            message: "Buyer saved to Supabase",
            buyer: newBuyer,
          });
        }
      } catch (err) {
        console.warn("Supabase insert error, falling back to local file", err);
      }
    }

    // 2. Fallback to local storage
    const currentBuyers = await getLocalBuyers();
    const newBuyer = {
      id: `comm-${Date.now()}`,
      nameEn: nameEn.trim(),
      nameKm: nameKm?.trim() || nameEn.trim(),
      type: type || "trader",
      icon,
      locationEn: locationEn || "Cambodia",
      locationKm: locationKm || locationEn || "កម្ពុជា",
      phone: phone.trim(),
      descEn: `Community contact added by ${addedBy || "a cashew farmer"}.`,
      descKm: `ទំនាក់ទំនងអ្នកទិញដែលបានចែករំលែកដោយ ${addedBy || "កសិករក្នុងសហគមន៍"}។`,
      buysRaw: true,
      buysProcessed: false,
      priceRangeEn: priceRangeEn || undefined,
      priceRangeKm: priceRangeKm || undefined,
      verified: false,
      isUserAdded: true,
      addedBy: addedBy || "Community Farmer",
      createdAt: new Date().toISOString(),
    };

    const updated = [newBuyer, ...currentBuyers];
    await saveLocalBuyers(updated);

    return NextResponse.json({
      success: true,
      source: "local",
      message: "Buyer saved to local storage",
      buyer: newBuyer,
      buyers: updated,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to add buyer" },
      { status: 500 }
    );
  }
}

// DELETE /api/buyers?id=...
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ success: false, error: "Missing ID" }, { status: 400 });
    }

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from("buyers").delete().eq("id", id);
      } catch {
        // fallback
      }
    }

    const currentBuyers = await getLocalBuyers();
    const updated = currentBuyers.filter((b) => b.id !== id);
    await saveLocalBuyers(updated);

    return NextResponse.json({
      success: true,
      message: "Buyer deleted",
      buyers: updated,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to delete" },
      { status: 500 }
    );
  }
}
