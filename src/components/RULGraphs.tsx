import React from "react";

// Define props interface for RuL component
interface RULGraphsProps {
  graphTitle: string;
}

const RULGraphs: React.FC<RULGraphsProps> = ({graphTitle}) => {
  return (
    <div className="box-border size-auto border-2 p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
      <div className="font-sans text-center text-gray-500">
        <h2>{graphTitle}</h2>
      </div>
    </div>
  )
}

export default RULGraphs;