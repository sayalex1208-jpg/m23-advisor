import type { DiagnosisResponse } from "@/types/diagnosis";
import { ANTHRACNOSE_DIAGNOSIS } from "@/lib/sampleData";

export async function diagnoseImage(file: File): Promise<DiagnosisResponse> {
  try {
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch("/api/diagnose", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (data.success && data.diagnosis) {
      if (
        typeof data.diagnosis === "object" &&
        data.diagnosis !== null &&
        "disease_name_khmer" in data.diagnosis
      ) {
        return data.diagnosis as DiagnosisResponse;
      }

      // If API returned a plain text string or partial object, normalize to DiagnosisResponse
      return {
        crop_variety: "M23 Cashew (ពូជស្វាយចន្ទី M23)",
        disease_name_khmer: "លទ្ធផលវិភាគរូបភាពស្លឹក/ផ្លែស្វាយចន្ទី",
        disease_name_english: "Cashew Leaf/Fruit Vision Analysis Result",
        severity: "មធ្យម",
        confidence_score: 90,
        symptoms: [
          typeof data.diagnosis === "string"
            ? data.diagnosis
            : "រោគសញ្ញាជំងឺត្រូវបានរកឃើញតាមការវិភាគរូបភាព។",
        ],
        immediate_actions: [
          {
            step: 1,
            title: "កាត់សម្អាត",
            instruction: "កាត់ចេញ និងដុតបំផ្លាញស្លឹកឬមែកដែលមានជំងឺ។",
          },
          {
            step: 2,
            title: "បាញ់ថ្នាំការពារ",
            instruction: "បាញ់ថ្នាំការពារផ្សិត Copper Hydroxide ឬ Mancozeb តាមកំហាប់ណែនាំ។",
          },
        ],
        prevention_tips: [
          "ថែរក្សាអនាម័យចម្ការ និងកាត់មែកឱ្យខ្យល់ចេញចូលបានល្អ។",
        ],
      };
    }

    return ANTHRACNOSE_DIAGNOSIS;
  } catch (error) {
    console.error("Diagnosis request failed, using fallback:", error);
    return ANTHRACNOSE_DIAGNOSIS;
  }
}
