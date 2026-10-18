import type { DiagnosisResponse } from "./diagnosis";

export interface ChatResponse {
  reply_km: string;
  gloss_en: string;
}

export type MessageKind = "user-text" | "user-photo" | "ai-chat" | "ai-diagnosis";

export interface ChatMessage {
  id: number;
  kind: MessageKind;
  text?: string;
  photoUrl?: string;
  reply_km?: string;
  gloss_en?: string;
  diagnosis?: DiagnosisResponse;
}

export interface QuickAction {
  labelKm: string;
  labelEn: string;
  prompt: string;
}
