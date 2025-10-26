import React from "react";

// Define props interface for MetricsCard component
interface MetricsCardProps {
  metricsName: string;
  metricsValue: string | number;
}

// Define function to render a metrics card
const MetricsCard: React.FC<MetricsCardProps> = ({metricsName, metricsValue}) => {
  return (
    <div className="box-border size-auto border-4 p-4 rounded-xl">
      <div className="text-slate-950">
        <h3>{metricsName}</h3>
      </div>
      <div>
        <p className="text-5xl font-bold">{metricsValue}</p>
      </div>
    </div>
  )
}

export default MetricsCard;