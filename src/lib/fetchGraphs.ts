import { GraphHistoryResponse } from "@/types/metrics";

// Define API
const API = process.env.NEXT_PUBLIC_URL;

type FetchGraphsParams = {
  device_id: string;
  limit?: number;
}

export async function fetchGraphs({device_id, limit = 1000}: FetchGraphsParams): Promise<GraphHistoryResponse> {
  // Check if API is defined
  if(!API){
    throw new Error("API URL is not defined");
  }

  // Define url with query parameters
  const url = new URL(`${API}/graphs/metrics`);
  url.searchParams.append("device_id", device_id);
  url.searchParams.append("limit", limit.toString());

  // Define response model
  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  // Check if response is ok
  if(!response.ok){
    throw new Error(`Error fetching graphs: ${response.statusText}`);
  }

  // Return JSON response
  return await response.json() as GraphHistoryResponse;
}