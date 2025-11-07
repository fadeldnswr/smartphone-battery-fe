import { UsageAppsResponse } from "@/types/usageApps";
import React from "react";

// Define API call to fetch usage apps data
const API = process.env.NEXT_PUBLIC_URL;

// Define types for fetch parameters
type FetchUsageAppsParams = {
  device_id: string;
  top_rank: number;
  table_name: string;
}

export async function fetchUsageApps({device_id, top_rank, table_name}: FetchUsageAppsParams): Promise<UsageAppsResponse | null>{
  // Check if API URL is defined
  if(!API){
    throw new Error("API URL is not defined");
  }

  // Create URL with query parameters
  const url = new URL(`${API}/data-visualization/app-usage`)
  url.searchParams.append("device_id", device_id);
  url.searchParams.append("top_rank", top_rank.toString());
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
    throw new Error(`Error fetching usage apps: ${response.statusText}`);
  }
  // Return the JSON response
  const json = await response.json() as UsageAppsResponse;
  const usageStats = json.usage_stats ?? [];
  return {
    device_id: json.device_id,
    usage_stats: usageStats,
  }
}