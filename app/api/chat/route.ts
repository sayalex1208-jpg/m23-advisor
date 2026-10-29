import { NextRequest, NextResponse } from 'next/server';
import { generateText } from 'ai';
import { google } from '@ai-sdk/google';
import { auth } from '@clerk/nextjs/server';
import { getChatResponse } from '@/lib/sampleData';
import { getHandbookAIKnowledgeContext } from '@/lib/cashewHandbook';

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();

    const body = await req.json().catch(() => ({}));
    const message = body?.message;
    const isGuest = body?.isGuest || req.headers.get('x-guest-mode') === '1';

    // Allow authenticated users OR guest users
    if (!userId && !isGuest) {
      return NextResponse.json(
        { error: 'សូមចូលគណនីជាមុនសិន ឬប្រើប្រាស់ជាភ្ញៀវ (Please sign in or use guest mode to chat)' },
        { status: 401 }
      );
    }

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'សូមបញ្ជូនសំណួររបស់អ្នក (No message provided)' },
        { status: 400 }
      );
    }

    try {
      const handbookKnowledge = getHandbookAIKnowledgeContext();

      const systemPrompt = `
You are Mit Kasekor (មិត្តកសិករ), an elite Cambodian cashew agronomy expert specializing in the M23 variety.
You provide precise, practical, and culturally authentic advice to Cambodian cashew farmers.

OFFICIAL CAMBODIAN M23 CASHEW HANDBOOK KNOWLEDGE BASE:
${handbookKnowledge}

INSTRUCTIONS FOR RESPONDING:
1. Ground your answers strictly in the verified Cambodian cashew handbook provided above.
2. Structure your replies clearly in Khmer (primary). Use clear bullet points, dosages, timing, and bold highlights.
3. Include brief English technical terms in parentheses where helpful (e.g. NPK ratios, active ingredients like Abamectin, Lambda-cyhalothrin).
4. Emphasize safety (toxicity bands, PPE) and warnings (e.g. NEVER spray EC oil formulas during peak bloom; NEVER apply high N fertilizer in late rainy season round 2).
5. Always be encouraging, practical, and respectful to Cambodian farmers.
`;

      const { text } = await generateText({
        model: google('gemini-2.0-flash'),
        system: systemPrompt,
        prompt: message,
      });

      return NextResponse.json({
        success: true,
        reply_km: text,
        gloss_en: "AI analysis grounded in Cambodian M23 Cashew Handbook standard.",
      });
    } catch (apiError) {
      console.warn('Gemini Chat API error or offline mode, falling back to verified handbook:', apiError);
      const fallback = getChatResponse(message);
      return NextResponse.json({
        success: true,
        reply_km: fallback.reply_km,
        gloss_en: fallback.gloss_en,
      });
    }
  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json(
      { error: 'មិនអាចភ្ជាប់ទៅកាន់ AI Server បានទេ (Error connecting to AI)' },
      { status: 500 }
    );
  }
}
