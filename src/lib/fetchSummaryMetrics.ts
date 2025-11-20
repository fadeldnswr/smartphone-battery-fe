import { BatterySummaryMetricsResponse } from "@/types/batteryMetrics";

// Define API url
const API = process.env.NEXT_PUBLIC_URL;

// Define battery summary props
type FetchSummaryMetricsParams = {
  device_id: string;
}

// Define function to fetch battery summary metrics
export async function fetchSummaryMetrics({device_id} : FetchSummaryMetricsParams): Promise<BatterySummaryMetricsResponse> {
  // Check if API url is defined
  if(!API){
    throw new Error("API URL is not defined");
  }

  // Create URL with query parameters
  const url = new URL(`${API}/graphs/summary`)
  url.searchParams.append("device_id", device_id);

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
    throw new Error(`Error fetching summary metrics: ${response.statusText}`);
  }

  // Return the JSON response
  const json = await response.json() as BatterySummaryMetricsResponse;
  return {
    message: json.message,
    device_id: json.device_id,
    window_start: json.window_start,
    window_end: json.window_end,
    summary: json.summary,
  }
}