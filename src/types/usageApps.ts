// Create interface for usage application data
export interface UsageApp {
  device_id: string;
  fg_pkg: string;
  total_mb: number;
  avg_throughput_mbps: number;
  rank: number;
}

// Create interface for the API response
export interface UsageAppsResponse {
  device_id: string;
  usage_stats: UsageApp[];
}