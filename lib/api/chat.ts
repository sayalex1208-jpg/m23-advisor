import type { ChatResponse } from "@/types/chat";
import { getChatResponse } from "@/lib/sampleData";

export async function sendChatMessage(message: string): Promise<ChatResponse> {
  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();
    if (data.success && data.reply_km) {
      return {
        reply_km: data.reply_km,
        gloss_en: data.gloss_en || "",
      };
    }

    return getChatResponse(message);
  } catch (error) {
    console.error("Chat request failed, using local agronomy knowledge base:", error);
    return getChatResponse(message);
  }
}
