import React from "react";

// Create interface for graph props
interface GraphProps {
  graphTitle: string;
}

const EnergyGraphs: React.FC<GraphProps> = ({graphTitle}) => {
  return (
    <div className="box-border size-auto border-4 p-4 rounded-xl">
      <div className="font-semibold text-center">
        <h2>{graphTitle}</h2>
      </div>
    </div>
  )
}

export default EnergyGraphs;