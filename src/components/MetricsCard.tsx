import React from "react";

// Define props interface for MetricsCard component
interface MetricsCardProps {
  metricsName: string;
  metricsValue: string | number;
}

// Define function to render a metrics card
const MetricsCard: React.FC<MetricsCardProps> = ({metricsName, metricsValue}) => {
  return (
    <div className="box-border size-auto m-1 border-2 p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
      <div className="text-gray-500 font-sans">
        <h3>{metricsName}</h3>
      </div>
      <div>
        <p className="text-3xl font-bold font-sans">{metricsValue}</p>
      </div>
    </div>
  )
}

export default MetricsCard;