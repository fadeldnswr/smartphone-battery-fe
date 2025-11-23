import { PredictionMetricsResponse } from "@/types/predictionMetrics";

// Define API url
const API = process.env.NEXT_PUBLIC_URL;

// Define battery prediction props
type FetchPredictionParams = {
  device_id: string;
}

// Define function to fetch battery prediction metrics
const fetchPrediction = async ({device_id}: FetchPredictionParams): Promise<PredictionMetricsResponse> => {
  // Check if API url is defined
  if(!API){
    throw new Error("API URL is not defined");
  }

  // Create URL with query parameters
  const url = new URL(`${API}/prediction/soh`)
  url.searchParams.append("device_id", device_id);
  console.log("Prediction URL:", url.toString());

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
    throw new Error(`Error fetching prediction metrics: ${response.statusText}`);
  }
  // Return the JSON response
  const json = await response.json() as PredictionMetricsResponse;
  return {
    message: json.message,
    device_id: json.device_id,
    soh_pred_pct: json.soh_pred_pct,
    soh_pred: json.soh_pred,
    rul_cycles: json.rul_cycles,
    rul_months: json.rul_months,
    rul_hours: json.rul_hours,
    soh_series: json.soh_series,
  }
}

export default fetchPrediction;