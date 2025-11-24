
// Define types for screen label
export type ScreenLabel = "safe" | "warning" | "broken";

// Define action types
export type ActionType = "hold" | "replace_phone" | "replace_battery" | "replace_screen";

// Define ewaste impact type
export interface EwasteImpact {
  alpha: number;
  ewaste_baseline_kg: number;
  ewaste_with_system_kg: number;
  ewaste_reduced_kg: number;
  carbon_saved_kg: number;
}

// Define impact request payload
export interface ImpactRequestPayload {
  device_id: string;
  soh_pred_pct: number;
  rul_months: number;
  screen_label: ScreenLabel;
}

// Define impact calculation response
export interface ImpactResponse {
  message: string;
  device_id: string;
  action: ActionType;
  soh_pred_pct: number;
  rul_months: number;
  screen_label: ScreenLabel;
  expiry_date?: string | null;
  scenarios: {
    conservative: EwasteImpact;
    optimistic: EwasteImpact;
  }
}