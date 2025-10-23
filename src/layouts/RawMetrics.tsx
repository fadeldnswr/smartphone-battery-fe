import React from "react";
import MetricsCard from "@/components/MetricsCard";

// Dummy data for proof of concept
const metricsList = [
    { metricsName: "Tegangan (V)", metricsValue: 4.26 },
    { metricsName: "Arus (A)", metricsValue: 0.84 },
    { metricsName: "Suhu (°C)", metricsValue: 32.5 },
    { metricsName: "Kelembapan (%)", metricsValue: 70 },
    { metricsName: "Rx Bytes", metricsValue: 580080813 },
    { metricsName: "Tx Bytes", metricsValue: 430050210 },
    { metricsName: "Throughput (MB)", metricsValue: 10 },
    { metricsName: "Channel Quality (dBm)", metricsValue: -55 },
  ];

// Define function to render raw metrics layout
const RawMetrics = () => {
  return (
    <section>
      <h1>
        Smartphone Battery Parameters
      </h1>
      <div className="grid grid-cols-2 gap-4">
        {metricsList.map((metrics, index) => (
          <MetricsCard 
          key={index} 
          metricsName={metrics.metricsName} 
          metricsValue={metrics.metricsValue} />
        ))}
      </div>
    </section>
  )
}

export default RawMetrics;