import { MetricsResponse, RawMetricsProps } from "@/types/metrics";

// Define URL for the backend API
const API = process.env.NEXT_PUBLIC_URL;

type FetchMetricsParams = {
  table_name: string;
  device_id: string;
}

// Define function to fetch metrics data
export async function fetchMetrics({
  table_name = "raw_metrics", device_id}: FetchMetricsParams): Promise<RawMetricsProps | null> {
  
  // Check if URL is defined
  if(!API){
    throw new Error("API URL is not defined");
  }

  // Create URL with query parameters
  const url = new URL(`${API}/data-visualization/raw-metrics`)
  url.searchParams.append("table_name", table_name);
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
    throw new Error(`Error fetching metrics: ${response.statusText}`);
  }

  // Return the JSON response
  const json = await response.json() as MetricsResponse;
  return json.data?.[0] ?? null;
}