export interface ImmediateAction {
  step: number;
  title: string;
  instruction: string;
}

export interface DiagnosisResponse {
  crop_variety: string;
  disease_name_khmer: string;
  disease_name_english: string;
  severity: string;
  confidence_score: number;
  symptoms: string[];
  immediate_actions: ImmediateAction[];
  prevention_tips: string[];
}
