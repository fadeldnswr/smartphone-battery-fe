// Define soh data interface
export interface SoH {
  device_id: string;
  created_at: string;
  Q_mAh: number | null;
  Ct_mAh: number | null;
  soh_pct: number | null;
}

// Define cycles data interface
export interface Cycles {
  device_id: string;
  created_at: string;
  delta_charge_uah: number | null;
  discharge_uah: number | null;
  cycles_est: number | null;
}

// Define battery metrics interface
export interface BatteryMetricsResponse {
  device_id: string;
  created_at: string;
  soh_data: SoH[];
  cycles_data: Cycles[];
}