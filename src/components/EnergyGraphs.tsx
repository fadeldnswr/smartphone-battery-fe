import React from "react";

// Create interface for graph props
interface GraphProps {
  graphTitle: string;
}

const EnergyGraphs: React.FC<GraphProps> = ({graphTitle}) => {
  return (
    <div className="box-border size-auto border-2 p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
      <div className="text-center text-gray-500">
        <h2 className="font-sans">{graphTitle}</h2>
      </div>
    </div>
  )
}

export default EnergyGraphs;