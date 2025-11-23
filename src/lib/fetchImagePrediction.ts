// Define function to fetch image prediction

import { ImagePredictionResponse } from "@/types/imagePrediction";

// Define API url
const API = process.env.NEXT_PUBLIC_URL;

// Define function to fetch image prediction
const fetchImagePrediction = async (image: File): Promise<ImagePredictionResponse | null> => {
  // Check if API url is defined
  if(!API) throw new Error("API URL is not defined");

  // Create form data and append image file
  const formData = new FormData();
  formData.append("file", image);

  // Fetch data from the backend API
  const response = await fetch(`${API}/image-prediction/`, {
    method: "POST",
    body: formData,
    cache: "no-store",
  });

  // Check if the response is ok
  if(!response.ok) throw new Error(`Error fetching image prediction: ${response.statusText}`);

  // Return the JSON response
  const json = await response.json() as ImagePredictionResponse;
  return {
    message: json.message,
    class_label: json.class_label,
    ui_bucket: json.ui_bucket,
    score: json.score,
    probabilities: json.probabilities,
    rep_score: json.rep_score,
    severity_weight: json.severity_weight,
    config_version: json.config_version,
    model_type: json.model_type,
  }
}

export default fetchImagePrediction;