import { NextRequest, NextResponse } from 'next/server';
import { generateText } from 'ai';
import { google } from '@ai-sdk/google';
import { auth } from '@clerk/nextjs/server';
import { getChatResponse } from '@/lib/sampleData';

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { error: 'សូមចូលគណនីជាមុនសិន (Please sign in to access AI features)' },
        { status: 401 }
      );
    }

    const { message } = await req.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'សូមបញ្ជូនសំណួររបស់អ្នក (No message provided)' },
        { status: 400 }
      );
    }

    try {
      const systemPrompt = `
You are Mit Kasekor, an AI agricultural expert specializing exclusively in Cambodian cashew farming (focusing on the M23 high-yield variety).

KNOWLEDGE BASE & GUIDELINES:
- You help farmers with site selection (soil pH 5.5-7, drainage, 4-month dry season), planting (rainy season months 5-8, spacing 7x7m or 8x8m, hole preparation 0.4m x 0.4m with NPK), grafting, flowering, fertilizer application, pest and disease control (like Anthracnose, tea mosquito bug), and harvest.
- Always respond professionally and clearly in Khmer (primary) with English translation/glossary (for technical terms).
- Provide practical, actionable advice tailored to Cambodian agricultural conditions.
    `;

      const { text } = await generateText({
        model: google('gemini-2.0-flash'),
        system: systemPrompt,
        prompt: message,
      });

      return NextResponse.json({
        success: true,
        reply_km: text,
        gloss_en: "AI analysis based on M23 Cambodian Cashew Agronomy Knowledge Base.",
      });
    } catch (apiError) {
      console.warn('Gemini Chat API error or quota exhausted, falling back to sample data:', apiError);
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
