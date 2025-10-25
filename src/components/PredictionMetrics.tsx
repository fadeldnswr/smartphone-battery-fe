import React from "react";

// Create interface for Prediction Metrics props
interface PredictionMetricsProps {
  metricTitle: string;
  metricValue: string | number;
}

const PredictionMetrics: React.FC<PredictionMetricsProps> = ({metricTitle, metricValue}) => {
  return (
    <div className="box-border size-auto border-4 p-4 rounded-xl">
      <div className="font-semibold">
        <h3>{metricTitle}</h3>
      </div>
      <div>
        <p>{metricValue}</p>
      </div>
    </div>
  )
}

export default PredictionMetrics;