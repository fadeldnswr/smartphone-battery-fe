"use client";

import React, { useEffect, useState } from "react";
import ImpactCard from "@/components/ImpactCard";
import fetchPrediction from "@/lib/fetchPrediction";
import { PredictionMetricsResponse } from "@/types/predictionMetrics";
import { ScreenLabel } from "@/types/impactCalculation";
import formatExpiryDate from "@/utils/utils";

// Define type for impact analysis props
type ImpactAnalysisProps = {
  device_id: string;
  soh_pred_pct: number | null;
  rul_months: number | null;
  screen_label: ScreenLabel | null;
}

// Define screen label
const screenLabelText: Record<ScreenLabel, string> = {
  safe: "Safe Condition",
  warning: "Warning Condition",
  broken: "Critical Condition",
}

const ImpactAnalysis: React.FC<ImpactAnalysisProps> = ({device_id, screen_label}) => {
  // Define state for prediction data
  const [prediction, setPrediction] = useState<PredictionMetricsResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch SoH + RUL
  useEffect(() => {
    const fecthPred = async () => {
      try {
        setLoading(true);
        const response = await fetchPrediction({device_id});
        setPrediction(response);
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Failed to fetch prediction data";
        setError(message);
      } finally {
        setLoading(false);
      }
    }
    // Call fetch prediction function
    fecthPred();
  }, [device_id])

  return (
    <section className="box-border size-auto border-4 p-4 rounded-xl mt-4 bg-[#FFFFFF] font-sans">
      <h1 className="text-2xl mb-2 text-[#0A0E1F] pl-2 font-semibold text-center">
        Carbon & E-Waste Impact Analysis
      </h1>
      <p className="text-[11px] text-slate-500 text-center mb-4 px-2">
        Combine battery prediction and screen condition to estimate e-waste mitigation and carbon savings.
      </p>
      {/* Summary */}
      <div className="grid grid-cols-3 gap-3 text-[11px] mb-4">
        {/* SoH */}
        <div className="border border-slate-200 rounded-lg p-2 bg-slate-50">
          <p className="text-slate-500">Predicted SoH</p>
          {loading && (
            <p className="text-xs text-slate-400">Loading...</p>
          )}
          {loading && error && (
            <p className="text-xs text-rose-500">{error}</p>
          )}
          {!loading && !error && (
            <p className="text-sm font-semibold text-slate-800">
              {prediction ? `${prediction.soh_pred_pct.toFixed(2)}%` : "-"}
            </p>
          )}
        </div>
        {/* RUL */}
        <div className="border border-slate-200 rounded-lg p-2 bg-slate-50">
          <p className="text-slate-500">Estimated RUL</p>
          {loading && (
            <p className="text-xs text-slate-400">Loading...</p>
          )}
          {!loading && error && (
            <p className="text-xs text-rose-500">{error}</p>
          )}
          {!loading && !error && (
            <>
              <p className="text-sm font-semibold text-slate-800">
                {prediction ? `${prediction.rul_months.toFixed(1)} months` : "-"}
              </p>
              {prediction && prediction.expiry_date && (
                <p className="text-[10px] text-slate-500 mt-1">
                  Estimated until {" "}
                  <span className="font-semibold">
                    {formatExpiryDate(prediction.expiry_date)}
                  </span>
                </p>
              )}
            </>
          )}
        </div>
        {/* Screen Label */}
        <div className="border border-slate-200 rounded-lg p-2 bg-slate-50">
          <p className="text-slate-500 mb-1">Screen Condition</p>
          <p className="text-sm font-semibold text-slate-800">
            {screen_label ? screenLabelText[screen_label] : "Awaiting image classification"}
          </p>
        </div>
      </div>
      {/* Impact Card */}
      <ImpactCard
      device_id={device_id}
      soh_pred_pct={prediction?.soh_pred_pct ?? 0}
      rul_months={prediction?.rul_months ?? 0}
      screen_label={screen_label}
      expiry_date={prediction?.expiry_date ?? null}
      />
    </section>
  )
}

export default ImpactAnalysis;