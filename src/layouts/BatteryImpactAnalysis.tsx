"use client";

import PredictionMetrics from "@/components/PredictionMetrics";
import RULGraphs from "@/components/RULGraphs";
import React, { useEffect, useState } from "react";
import { BatteryMetricsResponse } from "@/types/batteryMetrics";
import { fetchBatteryMetrics } from "@/lib/fetchBatteryMetrics";

// Define type for battery impact analysis props
type BatteryImpactAnalysisProps = {
  device_id: string;
  table_name: string;
};

const BatteryImpactAnalysis: React.FC<BatteryImpactAnalysisProps> = ({device_id, table_name}) => {
  // Define metrics state
  const [metrics, setMetrics] = useState<BatteryMetricsResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch metrics data on component mount
  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetchBatteryMetrics({ device_id, table_name });
        if(!cancelled) {
          setMetrics(response);
          console.log("Fetched battery metrics:", response);
        }
      } catch(error: unknown) {
        if (!cancelled) {
          const message = error instanceof Error ? error.message : "Failed to fetch metrics";
          setError(message);
        }
      } finally {
        if(!cancelled) setLoading(false);
      }
    }

    fetchData();

    return () => {
      cancelled = true;
    }
  }, [device_id, table_name]);

  // Define list for prediction metrics
  const predictionList = [
    { metricTitle: "Predicted RUL", metricValue: "5 Months"},
    { metricTitle: "State of Health", metricValue: `${metrics?.soh_data != null ?
      metrics.soh_data[0].soh_pct : "N/A"
    }`},
    { metricTitle: "Battery Cycles", metricValue: `${metrics?.cycles_data != null ?
      metrics.cycles_data[0].cycles_est : "N/A"
    }`},
    { metricTitle: "E-Waste Reduction", metricValue: "Good"},
  ]

  return (
    <section className="box-border size-auto border-4 p-4 rounded-xl mt-4 bg-[#FFFFFF]">
      <h1 className="text-2xl mb-4 text-[#0A0E1F] pl-2 font-semibold font-sans text-center">Battery Impact Analysis</h1>
      <div className="grid grid-cols-2 gap-4">
        <RULGraphs graphTitle="State of Health Prediction" />
        {loading && (
          <div className="text-center text-gray-500 p-6">
            Loading...
          </div>
        )}

        {error && (
          <div className="text-center text-red-500 p-6">
            {error}
          </div>
        )}

        {!loading && !error && predictionList.length > 0 && (
          <div className="grid grid-cols-2 gap-4">
          {predictionList.map((metrics, index) => (
            <PredictionMetrics 
            key={index}
            metricTitle={metrics.metricTitle}
            metricValue={metrics.metricValue} />
          ))}
        </div>
        )}
      </div>  
    </section>
  )
}

export default BatteryImpactAnalysis;