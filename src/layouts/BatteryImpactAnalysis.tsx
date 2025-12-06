"use client";

import PredictionMetrics from "@/components/PredictionMetrics";
import RULGraphs from "@/components/RULGraphs";
import React, { useEffect, useMemo, useState } from "react";
import { BatteryMetricsResponse } from "@/types/batteryMetrics";
import { fetchBatteryMetrics } from "@/lib/fetchBatteryMetrics";
import { PredictionMetricsResponse, SoHPoint } from "@/types/predictionMetrics";
import fetchPrediction from "@/lib/fetchPrediction";

// Define type for battery impact analysis props
type BatteryImpactAnalysisProps = {
  device_id: string;
  table_name: string;
};

const BatteryImpactAnalysis: React.FC<BatteryImpactAnalysisProps> = ({device_id, table_name}) => {
  // Define metrics state
  const [metrics, setMetrics] = useState<BatteryMetricsResponse | null>(null);
  const [prediction, setPrediction] = useState<PredictionMetricsResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch metrics data on component mount
  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Define state for fetch battery metrics
        const [metricsRes, predictionRes] = await Promise.all([
          fetchBatteryMetrics({ device_id, table_name }),
          fetchPrediction({ device_id })
        ])
        if(!cancelled) {
          setMetrics(metricsRes);
          setPrediction(predictionRes);
          console.log("Fetched battery metrics:", metricsRes);
          console.log("Fetched prediction:", predictionRes);
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
    // Call fetch data function
    fetchData();

    return () => {
      cancelled = true;
    }
  }, [device_id, table_name]);

  // Define State of Health history
  const sohHistory: SoHPoint[] = useMemo(() => {
  if (!prediction || !prediction.soh_series || prediction.soh_series.length === 0) {
    return [];
  }
  return prediction.soh_series
    .filter((p) => p.soh_true != null && p.soh_pred != null && p.efc != null)
    .map((p) => ({
      created_at: p.created_at,
      efc: p.efc as number,
      soh_true: p.soh_true,
      soh_pred: p.soh_pred,
    }));
}, [prediction]);

  // Create function to format months and years
  const formatMonthsAndYears = (months: number | null | undefined) => {
  if (months == null) return null;
  const years = months / 12;
  return {
    monthsStr: `${months.toFixed(1)} bulan`,
    yearsStr: `${years.toFixed(1)} tahun`,
  };
};

  // Define prediction metrics values
  const rulMonths = prediction?.rul_months ?? null;
  const rulCycles = prediction?.rul_cycles ?? null;
  const sohPredPct = prediction?.soh_pred_pct ?? null;
  const cyclesUsed = metrics?.cycles_data?.[0]?.cycles_est ?? null;
  const rulFmt = formatMonthsAndYears(rulMonths);

  // Define list for prediction metrics
  const predictionList = [
    {
      metricTitle: "Estimated RUL",
      metricValue: rulMonths != null ? rulMonths.toFixed(1) : "N/A",
      metricSubtitle:
        rulFmt && sohPredPct != null
          ? `Perkiraan ${rulFmt.monthsStr} (~${rulFmt.yearsStr}) sampai SoH turun ke ambang akhir pakai, berdasarkan degradasi sekarang.`
          : "Model memperkirakan sisa umur pakai berdasarkan tren degradasi SoH.",
    },
    {
      metricTitle: "Predicted State of Health",
      metricValue:
        sohPredPct != null ? `${sohPredPct.toFixed(2)} %` : "N/A",
      metricSubtitle:
        sohPredPct != null
          ? `Baterai diperkirakan masih sekitar ${sohPredPct.toFixed(1)}% dari kapasitas awalnya.`
          : "Prediksi SoH tidak tersedia untuk saat ini.",
    },
    {
      metricTitle: "Battery Cycles",
      metricValue:
        cyclesUsed != null ? cyclesUsed.toFixed(1) : "N/A",
      metricSubtitle:
        cyclesUsed != null
          ? `Perkiraan sudah terpakai ~${cyclesUsed.toFixed(
              1
            )} equivalent full cycles sejauh ini.`
          : "Jumlah siklus baterai belum dapat dihitung.",
    },
    {
      metricTitle: "RUL Cycles",
      metricValue:
        rulCycles != null ? rulCycles.toFixed(1) : "N/A",
      metricSubtitle:
        rulCycles != null
          ? `Kurang lebih ${rulCycles.toFixed(
              1
            )} equivalent full cycles tersisa sebelum mencapai ambang akhir pakai.`
          : "RUL dalam satuan siklus belum tersedia.",
    },
  ]

  return (
    <section className="box-border size-auto border-4 p-4 rounded-xl mt-4 bg-[#FFFFFF]">
      <h1 className="text-xl mb-4 text-[#0A0E1F] pl-2 font-semibold font-sans text-center">Battery Impact Analysis</h1>
      {loading && (
        <div className="text-center text-gray-500 p-6">Loading...</div>
      )}
      {error && (
        <div className="text-center text-red-500 p-6">
          {error}
        </div>
      )}
      {!loading && !error && (
        <div className="grid grid-cols-2 gap-4">
          <RULGraphs graphTitle="State of Health Prediction"
          data={sohHistory}
          />
          <div className="grid grid-cols-2 gap-4">
            {predictionList.map((m, index) => (
              <PredictionMetrics 
              key={index}
              metricTitle={m.metricTitle}
              metricValue={m.metricValue}
              metricSubtitle={m.metricSubtitle}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  )
}

export default BatteryImpactAnalysis;