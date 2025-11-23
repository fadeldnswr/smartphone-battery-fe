
// Define types interface for image prediction response
export interface ImagePredictionResponse {
  message: string;
  class_label: string;
  ui_bucket: string;
  score: number;
  probabilities: Probabilities;
  rep_score: number;
  severity_weight: number;
  config_version: string;
  model_type: string;
}

// Define class probabilities dictionary
export interface Probabilities {
  safe: number;
  warning: number;
  broken: number;
}