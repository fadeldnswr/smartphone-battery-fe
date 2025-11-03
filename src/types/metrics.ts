// Create interface for raw metrics data
export interface RawMetricsProps {
  device_id: string;
  created_at: string;
  channel_quality: number;
  ts_utc: string;
  net_type: string;
  is_charging: boolean;
  battery_level: number;
  rx_total_bytes: number;
  tx_total_bytes: number;
  batt_voltage_mv: number | null;
  batt_current_ua: number | null;
  batt_temp_c: number | null;
  charge_source: string | null;
  cycles_count: number | null;
  charge_counter_uah: number | null; 
  battery_capacity_pct: number | null;
  current_avg_ua: number | null;
  battery_health: string | null;
  fg_pkg: string | null;
  energy_nwh: number | null;
}

export interface RawMetricsPropsWithThroughput extends RawMetricsProps {
  throughput_total_mbps?: number | null;
  throughput_upload_mbps?: number | null;
  throughput_download_mbps?: number | null;
}

export interface ThroughputRow {
  throughput_total_mbps?: number | null;
  throughput_upload_mbps?: number | null;
  throughput_download_mbps?: number | null;
}

// Create interface for the API response
export interface MetricsResponse {
  message: string;
  data: RawMetricsProps[];
  throughput?: ThroughputRow[];
}

// Define throughput point interface for history data
export interface ThroughputPoint {
  timestamp: string;
  throughput_total_mbps: number;
  throughput_upload_mbps: number;
  throughput_download_mbps: number;
}

// Define energy point interface for history data
export interface EnergyPoint {
  timestamp: string;
  energy_nwh: number;
}

// Define energy per bit point interface for history data
export interface EnergyPerBitPoint {
  timestamp: string;
  energy_per_bit_tx_J: number;
  energy_per_bit_rx_J: number;
  energy_per_bit_avg_J: number;
}

// Define battery cost point interface for history data
export interface BatteryCostPoint {
  timestamp: string;
  BoT_mAh_per_Gbps: number;
}

// Define throughput history response interface
export interface GraphHistoryResponse {
  device_id: string;
  thr_points: ThroughputPoint[];
  energy_points: EnergyPoint[];
  energy_per_bit_points: EnergyPerBitPoint[];
  bot_points: BatteryCostPoint[];
}