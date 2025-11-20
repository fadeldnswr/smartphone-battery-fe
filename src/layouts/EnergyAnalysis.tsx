"use client";

import React, { useEffect, useState } from "react";
import EnergyGraphs from "@/components/EnergyGraphs";
import SummaryMetricsCard from "@/components/SummaryMetricsCard";
import { BatterySummaryMetrics} from "@/types/batteryMetrics";
import { fetchSummaryMetrics } from "@/lib/fetchSummaryMetrics";

// Define grapsh list for dummy data
const graphsList = [
  { graphTitle: "Battery Energy"},
  { graphTitle: "Throughput"},
  { graphTitle: "Battery Cost of Traffic"},
  { graphTitle: "Energy Per Bit"},
]

// Define energy analysis layout component
type EnergyAnalysisProps = {
  device_id: string;
}

const EnergyAnalysis: React.FC<EnergyAnalysisProps> = ({device_id}) => {
  // Define states for summary metrics
  const [summary, setSummary] = useState<BatterySummaryMetrics | null>(null);
  const [windowStart, setWindowStart] = useState<string | null>(null);
  const [windowEnd, setWindowEnd] = useState<string | null>(null);

  // Define loading and error states
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch summary metrics data
  useEffect(() => {
    let cancelled = false;
    const fetchSummary = async () => {
      setLoading(true);
      setError(null);

      try {
        // Fetch summary metrics from API
        const response = await fetchSummaryMetrics({device_id});
        if(!cancelled){
          setSummary(response.summary);
          setWindowStart(response.window_start);
          setWindowEnd(response.window_end);
          console.log("Fetched summary metrics:", response);
        }
      } catch(error: unknown){
        if (!cancelled) {
          const message = error instanceof Error ? error.message : "Failed to fetch metrics";
          setError(message);
        }
      } finally {
        if(!cancelled) setLoading(false);
      }
    }

    // Fetch summary metrics on component mount
    fetchSummary();
    return () => {
      cancelled = true;
    }
  }, [device_id]);

  // Create formatter 
  const formatWh = (x: number | undefined) => typeof x === "number" && !Number.isNaN(x) ? x.toFixed(2) : "-";
  const formatMbps = (x: number | undefined) => typeof x === "number" && !Number.isNaN(x) ? x.toFixed(2) : "-";
  const formatBot = (x: number | undefined) => typeof x === "number" && !Number.isNaN(x) ? x.toFixed(2) : "-";
  const formatEpb = (x: number | undefined) => typeof x === "number" && !Number.isNaN(x) ? x.toFixed(2) : "-";

  // Create subtitle
  const windowSubtitle = windowStart && windowEnd ?
  `Last Window: ${new Date(windowStart).toLocaleTimeString()} - ${new Date(windowEnd).toLocaleTimeString()}` : undefined;

  return (
    <section className="box-border size-auto border-4 p-4 rounded-xl mt-4 bg-[#FFFFFF]">
      <h1 className="text-2xl mb-4 text-[#0A0E1F] pl-2 font-semibold font-sans text-center">
        Energy Analysis
      </h1>
      {/* Summary Section */}
      {loading ? (
        <p className="text-center text-gray-500">Loading summary...</p>
      ): error ? (
        <p className="text-center text-red-500">{error}</p>
      ): summary ? (
        <>
          {windowSubtitle && (
            <p className="text-center text-xs text-gray-500 mb-2">
              {windowSubtitle}
            </p>
          )}

          {/* Summary Card */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <SummaryMetricsCard 
            title="Last Hour Energy"
            value={`${formatWh(summary.energy_last_wh)} Wh`}
            />
            <SummaryMetricsCard 
            title="Avg Throughput"
            value={`${formatMbps(summary.avg_thr_last_mbps)} Mbps`}
            />
            <SummaryMetricsCard 
            title="Avg Battery Cost of Traffic"
            value={`${formatBot(summary.avg_bot_last)} mAh/Gbps`}
            />
            <SummaryMetricsCard 
            title="Avg Energy per Bit"
            value={`${formatEpb(summary.avg_epb_last)} J/bit`}
            />
          </div>
        </>
      ): (
        <p className="text-center text-gray-500">
          No summary available for this device.
        </p>
      )}
      {/* Graphs Section */}
      <div className="grid grid-cols-2 gap-4">
        {graphsList.map((graph, index) => (
          <EnergyGraphs
          key={index}
          device_id={device_id}
          graphTitle={graph.graphTitle} />
        ))}
      </div>
    </section>
  )
}

export default EnergyAnalysis;