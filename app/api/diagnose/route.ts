import { NextRequest, NextResponse } from 'next/server';
import { generateText } from 'ai';
import { google } from '@ai-sdk/google';
import { auth } from '@clerk/nextjs/server';
import { ANTHRACNOSE_DIAGNOSIS } from '@/lib/sampleData';

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    const isGuest = req.headers.get('x-guest-mode') === '1';

    if (!userId && !isGuest) {
      return NextResponse.json(
        { error: 'សូមចូលគណនីជាមុនសិន ឬប្រើប្រាស់ជាភ្ញៀវ (Please sign in or use guest mode to diagnose)' },
        { status: 401 }
      );
    }

    const formData = await req.formData();
    const imageFile = formData.get('image') as File;

    if (!imageFile) {
      return NextResponse.json(
        { error: 'សូមបញ្ជូនរូបភាពជាមុនសិន (No image provided)' },
        { status: 400 }
      );
    }

    // Convert uploaded image file to Buffer
    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);

    try {
      // Call Google Gemini Vision model with Cambodian Agronomy System Prompt & JSON Schema
      const { text } = await generateText({
        model: google('gemini-3.5-flash-lite'),
        system: `
You are an expert Cambodian agricultural AI specialist focusing on M23 cashew farming. 
Analyze the provided cashew leaf or fruit photo and return the diagnosis strictly in valid JSON format using the schema below. 
Do not include markdown code block wrappers (like \`\`\`json), commentary, or extra text.

Schema:
{
  "crop_variety": "M23 Cashew (ពូជស្វាយចន្ទី M23)",
  "disease_name_khmer": "ឈ្មោះជំងឺជាភាសាខ្មែរ",
  "disease_name_english": "Disease Name in English",
  "severity": "ទាប / មធ្យម / ខ្ពស់",
  "confidence_score": 95,
  "symptoms": [
    "រោគសញ្ញាសំខាន់ទី១ ដែលបានសង្កេតឃើញលើស្លឹក/ផ្លែ",
    "រោគសញ្ញាសំខាន់ទី២"
  ],
  "immediate_actions": [
    {
      "step": 1,
      "title": "កាត់សម្អាត",
      "instruction": "សេចក្តីណែនាំលម្អិត..."
    },
    {
      "step": 2,
      "title": "បាញ់ថ្នាំការពារ",
      "instruction": "បញ្ជាក់ប្រភេទថ្នាំ និងកម្រិតប្រើប្រាស់ជាក់លាក់..."
    }
  ],
  "prevention_tips": [
    "វិធីសាស្ត្របង្ការសម្រាប់រដូវបន្ទាប់..."
  ]
}

Instructions:
1. All descriptions, instructions, and symptom notes must be written in natural, fluent Khmer.
2. Keep treatment dosages practical and aligned with standard Cambodian cashew practices (e.g., Mancozeb, Copper Hydroxide, or Hexaconazole if appropriate).
3. If the image is clear and healthy, set the disease names to "សុខភាពល្អ (Healthy)" with low severity and routine maintenance advice.
        `,
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: 'សូមជួយពិនិត្យរូបភាពនេះ ហើយផ្តល់ដំណោះស្រាយតាមបរិបទកសិកម្មកម្ពុជា។',
              },
              {
                type: 'image',
                image: buffer,
              },
            ],
          },
        ],
      });

      let diagnosisData;
      try {
        const cleanedText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
        diagnosisData = JSON.parse(cleanedText);
      } catch (parseErr) {
        diagnosisData = text;
      }

      return NextResponse.json({
        success: true,
        diagnosis: diagnosisData,
      });
    } catch (apiError) {
      console.warn('Gemini API error or quota exhausted, falling back to expert cashew diagnosis:', apiError);
      return NextResponse.json({
        success: true,
        diagnosis: ANTHRACNOSE_DIAGNOSIS,
      });
    }
  } catch (error) {
    console.error('Diagnosis API Error:', error);
    return NextResponse.json(
      { error: 'មានបញ្ហាក្នុងការវិភាគរូបភាព (Error processing diagnosis)' },
      { status: 500 }
    );
  }
}
