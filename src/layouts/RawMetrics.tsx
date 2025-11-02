"use client";

import React, { useEffect, useState } from "react";
import MetricsCard from "@/components/MetricsCard";
import { fetchMetrics } from "@/lib/fetchMetrics";
import { RawMetricsProps } from "@/types/metrics";

// Define type props for RawMetrics component
type RawMetricsRecord = {
  table_name?: string;
  device_id: string;
}

// Define function to render raw metrics layout
const RawMetrics: React.FC<RawMetricsRecord> = ({device_id = "SM-S931B-57bc0e2d9eac7750", table_name = "raw_metrics"}) => {
  // Define state for metrics data
  const [metrics, setMetrics] = useState<RawMetricsProps | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch metrics data on component mount
  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchMetrics({ table_name, device_id });
        if(!cancelled) setMetrics(data); 
      } catch (error: unknown) {
        if (!cancelled) {
          const message = error instanceof Error ? error.message : "Failed to fetch metrics";
          setError(message);
        }
      } finally {
        if(!cancelled) setLoading(false);
      }
    };
    run();

    return () => {
      cancelled = true;
    };
  }, [device_id, table_name]);

  // Define metrics to display
  const metricsList = 
    metrics != null ? [
      {metricsName: "Tegangan (mV)", metricsValue: `${metrics.batt_voltage_mv}`},
      {metricsName: "Arus (mA)", metricsValue: `${metrics.batt_current_ua != null 
        ? (metrics.batt_current_ua / 1000).toFixed(2) : "N/A"}`},
      {metricsName: "Suhu (C)", metricsValue: `${metrics.batt_temp_c != null 
        ? metrics.batt_temp_c : "N/A"}`},
      {metricsName: "Channel Quality (dBm)", metricsValue: `${metrics.channel_quality}` != null 
        ? metrics.channel_quality : "N/A"},
      {metricsName: "Charging?", metricsValue: `${metrics.is_charging != null 
        ? metrics.is_charging : "N/A"}`},
      {metricsName: "Throughput", metricsValue: `${metrics.batt_voltage_mv}`},
      {metricsName: "Usage Application", metricsValue: `${metrics.fg_pkg != null 
        ? metrics.fg_pkg : "N/A"}`},
      {metricsName: "Battery Level (%)", metricsValue: `${metrics.battery_level != null 
        ? metrics.battery_level : "N/A"}`},
    ] : []

  return (
    <section className="box-border size-auto border-4 p-4 rounded-xl bg-[#FFFFFF] font-sans">
      <h1 className="text-2xl mb-4 text-[#0A0E1F] pl-2 font-semibold text-center">
        Device Condition
      </h1>

      {loading && (
        <div className="text-gray-500 text-center p-6">
          Loading..
        </div>
      )}

      {!loading && error && (
        <div className="text-red-500 text-center p-6">
          {error}
        </div>
      )}

      {!loading && !error && metricsList.length > 0 && (
        <div className="grid grid-cols-2 gap-4 rounded-xl">
          {metricsList.map((m, index) => (
            <MetricsCard 
            key={index} 
            metricsName={m.metricsName} 
            metricsValue={m.metricsValue} />
          ))}
        </div>
      ) }
    </section>
  )
}

export default RawMetrics;