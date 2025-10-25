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
      <div className="font-semibold">
        <h3>{metricsName}</h3>
      </div>
      <div>
        <p>{metricsValue}</p>
      </div>
    </div>
  )
}

export default MetricsCard;