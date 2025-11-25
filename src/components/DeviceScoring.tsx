"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import fetchImagePrediction from "@/lib/fetchImagePrediction";
import { ImagePredictionResponse } from "@/types/imagePrediction";
import Image from "next/image";
import { ScreenLabel } from "@/types/impactCalculation";

// Define type for screen label
const labelColorClass: Record<string, string> = {
  safe: "bg-emerald-100 text-emerald-700 border-emerald-200",
  warning: "bg-amber-100 text-amber-700 border-amber-200",
  broken: "bg-rose-100 text-rose-700 border-rose-200",
}

// Define interface for device scoring props
const labelText: Record<string, string> = {
  safe: "Good Condition",
  warning: "Warning Condition",
  broken: "Danger Condition",
}

// Define types for DeviceScoring component
type DeviceScoringProps = {
  onScreenLabelChange: (label: ScreenLabel | null) => void;
}

const DeviceScoring: React.FC<DeviceScoringProps> = ({onScreenLabelChange}) => {
  // Define state for image prediction
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ImagePredictionResponse | null>(null);

  // Handle preview change
  useEffect(() => {
    // Check if file has uploaded
    if(!file){
      setPreviewUrl(null);
      onScreenLabelChange?.(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file, onScreenLabelChange]);

  // Handle file change
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    // Check if file is selected
    if(!file) return;
    setError(null);
    setResult(null);
    setFile(file);
  }

  // Handle form submission
  const handleSubmit = async () => {
    if(!file){
      setError("Please select an image file");
      return;
    }
    try {
      setLoading(true);
      setError(null);

      // Define fetch image prediction
      const prediction = await fetchImagePrediction(file);
      if(!prediction) throw new Error("No prediction returned");
      setResult(prediction);

      // Mapping label to ScreenLabel type
      const mapped: ScreenLabel = prediction.class_label as ScreenLabel;
      onScreenLabelChange?.(mapped);
    } catch(error: unknown){
      console.error("Error fetching image prediction:", error);
      const message = error instanceof Error ? error.message : "Failed to fetch image prediction";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Device Scoring Component Content */}
      <h3 className="text-center font-semibold font-sans text-gray-700 mb-3">
        Device Screen Scoring
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-[2fr, 3fr] gap-4 h-full">
        {/* LEFT Preview */}
        <div className="border border-slate-200 rounded-xl bg-slate-50 flex items-center justify-center overflow-hidden min-h-[230px]">
          {previewUrl ? (
            <Image
              width={400}
              height={300}
              src={previewUrl}
              alt="Screen Preview"
              className="h-50 w-full object-contain"
            />
          ): (
            <p className="text-xs text-slate-400 text-center px-4">
              Smartphone screen preview will appear here after selecting an image file.
            </p>
          )}
        </div>
        {/* Right Preview */}
        <div className="flex flex-col">
          <div className="border border-slate-200 rounded-xl p-3 bg-slate-50">
            <p className="text-xs font-medium text-slate-700 mb-2">
              Upload Screen Image
            </p>
            <div className="flex items-center gap-3">
              <label 
              className="inline-flex items-center px-3 py-2 rounded-lg border border-slate-300 text-xs font-medium text-slate-700 bg-white cursor-pointer hover:bg-slate-100">
                <input
                  type="file"
                  accept="/image"
                  onChange={handleFileChange}
                  className="hidden"
                />
                Choose file
              </label>
              <span className="text-[11px] text-slate-500 truncate max-w-[150px]">
                {file ? file.name : "No file chosen"}
              </span>
            </div>
            <button
            onClick={handleSubmit}
            disabled={loading || !file}
            className="mt-3 px-4 py-2 rounded-lg text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300">
              {loading ? "Analyzing..." : "Submit"}
            </button>
            {error && <p className="mt-2 text-[11px] text-rose-500">{error}</p>}
          </div>
          {/* Result */}
          <div className="mt-3 flex-1 border border-dashed border-slate-300 rounded-xl p-3 bg-slate-50">
            {!result && !loading && (
              <div className="h-full flex items-center justify-center">
                <p className="text-[11px] text-slate-400 text-center max-w-xs">
                  Upload an image and submit to see the scoring result.
                </p>
              </div>
            )}
            {loading && (
              <div className="h-full flex items-center justify-center">
                <p className="text-[11px] text-slate-500">Analyzing image...</p>
              </div>
            )}
            {result && !loading && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-medium text-slate-700">Device Screens Score</p>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-semibold border ${labelColorClass[result.class_label]}`}>
                    {labelText[result.class_label]}
                  </span>
                </div>
                {/* Recommendation */}
                <div className="mt-2 text-[11px] text-slate-700 leading-relaxed">
                  {result.class_label === "safe" && (
                    <p>
                      Your device screen is in good condition. Keep maintaining it well to ensure longevity and optimal performance.
                    </p>
                  )}
                  {result.class_label === "warning" && (
                    <p>
                      Your device screen has minor cracks. Consider using a screen protector and avoid further impact to prevent worsening the damage. 
                    </p>
                  )}
                  {result.class_label === "broken" && (
                    <p>
                      Your device screen is severely damaged. It is recommended to get it repaired or replaced to avoid further issues and ensure safe usage.
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeviceScoring;