"use client";

import React, { useState } from "react";
import Navbar from "@/layouts/Navbar";
import RawMetrics from "@/layouts/RawMetrics";
import EnergyAnalysis from "@/layouts/EnergyAnalysis";
import BatteryImpactAnalysis from "@/layouts/BatteryImpactAnalysis";
import Insights from "@/layouts/Insights";
import ImpactAnalysis from "@/layouts/ImpactAnalysis";
import { ScreenLabel } from "@/types/impactCalculation";

// Define type for dashboard client props
type DashboardClientProps = {
  device_id: string;
  soh_pred_pct: number | null;
  rul_months: number | null;
};

const DashboardClient: React.FC<DashboardClientProps> = ({ device_id, soh_pred_pct, rul_months }) => {
  // Define state for screen label
  const [screenLabel, setScreenLabel] = useState<ScreenLabel | null>(null);
  return (
    <div className="font-['Lexend'] p-4 bg-[#F9FAFB]">
      <Navbar device_id={device_id} table_name="raw_metrics" />
      <RawMetrics device_id={device_id} table_name="raw_metrics" />
      <EnergyAnalysis device_id={device_id} />
      <BatteryImpactAnalysis device_id={device_id} table_name="raw_metrics" />

      {/* Most Running App + DeviceScoring */}
      <Insights
        table_name="raw_metrics"
        device_id={device_id}
        top_rank={4}
        onScreenLabelChange={setScreenLabel}
      />

      {/* Carbon & Ewaste Impact pakai hasil screenLabel */}
      <ImpactAnalysis
        device_id={device_id}
        soh_pred_pct={soh_pred_pct}
        rul_months={rul_months}
        screen_label={screenLabel}
      />
    </div>
  )
}

export default DashboardClient;