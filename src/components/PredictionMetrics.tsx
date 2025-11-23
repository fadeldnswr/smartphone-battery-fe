import React from "react";

// Create interface for Prediction Metrics props
interface PredictionMetricsProps {
  metricTitle: string;
  metricValue: string | number;
  metricSubtitle: string;
}

const PredictionMetrics: React.FC<PredictionMetricsProps> = ({metricTitle, metricValue, metricSubtitle}) => {
  return (
    <div className="box-border flex flex-col justify-between size-auto m-1 border-2 p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
      <h3 className="font-sans text-md font-medium tracking-wide text-gray-500 mb-1">
        {metricTitle}
      </h3>
      <p className="font-sans text-6xl font-semibold text-[#0A0E1F] leading-tight">
        {metricValue}
      </p>
      {metricSubtitle && (
        <p className="mt-1 text-xs text-gray-500 leading-snug">
          {metricSubtitle}
        </p>
      )}
    </div>
  )
}

export default PredictionMetrics;