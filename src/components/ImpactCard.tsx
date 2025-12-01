"use client";

import React, { useState } from "react";
import { ImpactResponse, ImpactRequestPayload, ScreenLabel } from "@/types/impactCalculation";
import fetchImpact from "@/lib/fetchImpact";
import formatExpiryDate from "@/utils/utils";

// Helper for badge action colors
const actionLabel: Record<ImpactResponse["action"], string> = {
  hold: "Tahan pakai HP",
  replace_phone: "Ganti HP",
  replace_battery: "Ganti baterai",
  replace_screen: "Ganti layar",
}

// Helper for action class
const actionColorClass: Record<ImpactResponse["action"], string> = {
  hold: "bg-emerald-100 text-emerald-700 border-emerald-200",
  replace_phone: "bg-rose-100 text-rose-700 border-rose-200",
  replace_battery: "bg-sky-100 text-sky-700 border-sky-200",
  replace_screen: "bg-amber-100 text-amber-700 border-amber-200",
}

// Helper for screen label
const screenLabelText: Record<ScreenLabel, string> = {
  safe: "Safe Condition",
  warning: "Warning Condition",
  broken: "Broken Screen",
}

// Define impact card props
type ImpactCardProps = {
  device_id: string;
  soh_pred_pct: number;
  rul_months: number;
  expiry_date?: string | null;
  screen_label: ScreenLabel | null;
}

// Define ImpactCard component
const ImpactCard: React.FC<ImpactCardProps> = ({device_id, soh_pred_pct, rul_months, screen_label}) => {
  // Define state for impact data
  const [impact, setImpact] = useState<ImpactResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null> (null);

  // Handler function for calculate impact
  const handleCalculateImpact = async () => {
    // Input Validation
    if(!device_id || soh_pred_pct == null || rul_months == null || screen_label == null) {
      setError("All fields must be provided");
      return;
    }
      try {
        setLoading(true);
        setError(null);

        // Define payload
        const payload: ImpactRequestPayload = {
          device_id: device_id,
          soh_pred_pct: soh_pred_pct,
          rul_months: rul_months,
          screen_label: screen_label,
        };
        const response = await fetchImpact(payload);
        setImpact(response);
      } catch(error: unknown){
        console.error("Error fetching impact data:", error);
        const message = error instanceof Error ? error.message : "An unknown error occurred";
        setError(message);
      } finally {
        setLoading(false);
      }
  }
  // Check if inputs are valid
  const disabled = !device_id || soh_pred_pct == null || rul_months == null || screen_label == null;

  return (
    <section className="box-border size-auto border-4 p-4 rounded-xl mt-4 bg-[#FFFFFF] font-sans shadow-md hover:shadow-lg transition-all duration-300">
      <h1 className="text-2xl mb-2 text-[#0A0E1F] pl-2 font-semibold text-center">
        Calculation
      </h1>
      <p className="text-[11px] text-slate-500 text-center mb-3 px-2">
        Estimate the carbon emissions and electronic waste reduction by optimizing your smartphone usage.
      </p>
      {/* Input summary */}
      <div className="grid grid-cols-3 gap-3 text-[11px] mb-3">
        <div className="border border-slate-200 rounded-lg p-2 bg-slate-50">
          <p className="text-slate-500">State of Health Prediction</p>
          <p className="text-sm font-semibold text-slate-800">
            {soh_pred_pct != null ? `${soh_pred_pct.toFixed(1)}%` : "-"}
          </p>
        </div>
        <div className="border border-slate-200 rounded-lg p-2 bg-slate-50">
          <p className="text-slate-500">Remaining Useful Life</p>
          {impact?.expiry_date && (
            <p className="text-[12px] text-slate-800 mt-1">
              Estimated until {" "}
              <span className="font-semibold">
                {formatExpiryDate(impact?.expiry_date)}
              </span>
            </p>
          )}
        </div>
        <div className="border border-slate-200 rounded-lg p-2 bg-slate-50">
          <p className="text-slate-500">
            Screen Condition
          </p>
          <p className="text-[12px] font-semibold text-slate-800">
            {screen_label ? screenLabelText[screen_label] : "-"}
          </p>
        </div>
      </div>
      {/* Action Button */}
      <div className="flex items-center justify-between mb-3">
        <button
        onClick={handleCalculateImpact}
        disabled={loading || disabled}
        className="px-4 py-2 rounded-lg text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300">
          {loading ? "Calculating..." : "Calculate"}
        </button>
        {error && (
          <p className="text-[11px] text-rose-500 text-right max-w-xs">
            {error}
          </p>
        )}
      </div>
      {/* If no result */}
      {!impact && !loading && !error && (
        <div className="border border-dashed border-slate-300 rounded-xl p-4 bg-slate-50">
          <p className="text-[11px] text-slate-400 text-center">
            Press <span className="font-semibold">Calculate</span> after the metrics are available.
          </p>
        </div>
      )}
      {/* Impact Result */}
      {impact && (
        <div className="border border-slate-200 rounded-xl p-3 bg-slate-50 space-y-3">
          {/* Recommendation */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] text-slate-500">System Recommendation</p>
              <p className="text-sm font-semibold text-slate-800">{actionLabel[impact.action]}</p>
            </div>
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-semibold border ${actionColorClass[impact.action]}`}>
              {impact.action}
            </span>
          </div>
          {/* Scenario Comparison */}
          <div className="grid grid-cols-2 gap-3 text-[11px] mt-1">
            {/* Conservative */}
            <div className="border border-slate-200 rounded-lg p-3 bg-white">
              <p className="text-[10px] font-semibold text-slate-500 mb-1">
                Conservative Scenario
              </p>
              <p className="text-xs text-slate-600 mb-1">
                α = {impact.scenarios.conservative.alpha.toFixed(2)}
              </p>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-500">Baseline E-Waste</span>
                  <span className="font-semibold text-slate-800">
                    {impact.scenarios.conservative.ewaste_baseline_kg.toFixed(2)} Kg
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">With System</span>
                  <span className="font-semibold text-slate-800">
                    {impact.scenarios.conservative.ewaste_with_system_kg.toFixed(2)} Kg
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">E-Waste Reduced</span>
                  <span className="font-semibold text-emerald-700">
                    -{impact.scenarios.conservative.ewaste_reduced_kg.toFixed(2)} Kg
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Carbon Saved</span>
                  <span className="font-semibold text-emerald-700">
                    -{impact.scenarios.conservative.carbon_saved_kg.toFixed(2)} Kg CO2e
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Equivalent Card Distance</span>
                  <span className="font-semibold text-slate-800">
                    {impact.scenarios.conservative.car_km_equivalent.toFixed(2)} Km
                  </span>
                </div>
              </div>
            </div>
            {/* Optimistic */}
            <div className="border border-slate-200 rounded-lg p-3 bg-white">
              <p className="text-[10px] font-semibold text-slate-500 mb-1">
                Optimistic Scenario
              </p>
              <p className="text-xs text-slate-600 mb-1">
                α = {impact.scenarios.optimistic.alpha.toFixed(2)}
              </p>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-500">Baseline E-Waste</span>
                  <span className="font-semibold text-slate-800">
                    {impact.scenarios.optimistic.ewaste_baseline_kg.toFixed(2)} Kg
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">With System</span>
                  <span className="font-semibold text-slate-800">
                    {impact.scenarios.optimistic.ewaste_with_system_kg.toFixed(2)} Kg
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">E-Waste Reduced</span>
                  <span className="font-semibold text-emerald-700">
                    -{impact.scenarios.optimistic.ewaste_reduced_kg.toFixed(2)} Kg
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Carbon Saved</span>
                  <span className="font-semibold text-emerald-700">
                    -{impact.scenarios.optimistic.carbon_saved_kg.toFixed(2)} Kg CO2e
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Equivalent Car Distance</span>
                  <span className="font-semibold text-slate-800">
                    {impact.scenarios.optimistic.car_km_equivalent.toFixed(2)} Km
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* Footnote */}
          <p className="mt-1 text-[10px] text-slate-400">
            *Estimation based on device current usage.
          </p>
          <p className="text-[10px] text-slate-400 mt-2">
            *Carbon saved converted using 0.192 kg CO₂e/km (EPA Standard gasoline car).
          </p>
        </div>
      )}
    </section>
  )
} 

export default ImpactCard;