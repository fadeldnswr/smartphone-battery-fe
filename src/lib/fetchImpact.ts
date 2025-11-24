import { ImpactRequestPayload, ImpactResponse } from "@/types/impactCalculation";

// Define API url
const API = process.env.NEXT_PUBLIC_URL;

// Define function to calculat eimpact
const fetchImpact = async (payload: ImpactRequestPayload): Promise<ImpactResponse> => {
  // Check if API url is defined
  if(!API) throw new Error("API URL is not defined");

  // Fetch impact from API
  const response = await fetch(`${API}/impact/carbon-ewaste`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  })

  // Check if response is ok
  if(!response.ok) throw new Error("Failed to fetch impact data");

  // Parse response as JSON
  const data: ImpactResponse = await response.json();
  return data;
}

export default fetchImpact;