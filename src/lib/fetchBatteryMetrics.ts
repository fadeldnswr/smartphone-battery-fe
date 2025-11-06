import { BatteryMetricsResponse } from "@/types/batteryMetrics";

// Define URL for the backend API
const API = process.env.NEXT_PUBLIC_URL;

type FetchBatteryMetricsParams = {
  device_id: string;
  table_name: string;
}

// Define function to fetch battery metrics data
export async function fetchBatteryMetrics({device_id, table_name}: FetchBatteryMetricsParams): Promise<BatteryMetricsResponse | null> {
  // Check if URL is defined
  if(!API){
    throw new Error("API URL is not defined");
  }

  // Create URL with query parameters
  const url = new URL(`${API}/battery/metrics`)
  url.searchParams.append("device_id", device_id);
  url.searchParams.append("table_name", table_name);

  // Fetch data from the backend API
  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  })

  // Check if the response is ok
  if(!response.ok){
    throw new Error(`Error fetching battery metrics: ${response.statusText}`);
  }

  // Return the JSON response
  const json = await response.json() as BatteryMetricsResponse;
  const sohResult = json.soh_data ?? [];
  const cyclesResult = json.cycles_data ?? [];
  return {
    device_id: json.device_id,
    created_at: json.created_at,
    soh_data: sohResult,
    cycles_data: cyclesResult,
  }
}