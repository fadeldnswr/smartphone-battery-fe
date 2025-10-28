import React from "react";

// Create interface for Prediction Metrics props
interface PredictionMetricsProps {
  metricTitle: string;
  metricValue: string | number;
}

const PredictionMetrics: React.FC<PredictionMetricsProps> = ({metricTitle, metricValue}) => {
  return (
    <div className="box-border size-auto border-2 p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
      <div className="font-sans text-gray-500">
        <h3>{metricTitle}</h3>
      </div>
      <div className="font-sans font-semibold">
        <p>{metricValue}</p>
      </div>
    </div>
  )
}

export default PredictionMetrics;