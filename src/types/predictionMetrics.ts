
// Define prediction metrics types
export interface PredictionMetricsResponse {
  message: string;
  device_id: string;
  soh_pred_pct: number;
  soh_pred: number;
  rul_cycles: number;
  rul_months: number;
  rul_hours: number;
  soh_series: SoHPoint[];
  expiry_date?: string | null;
}

// Define prediction metrics for SoH
export interface SoHPoint {
  created_at: string;
  soh_true: number | null;
  soh_pred: number | null;
  efc: number | null;
}

// Define production 
export interface RULGraphsProps {
  graphTitle: string;
  data: SoHPoint[];
}