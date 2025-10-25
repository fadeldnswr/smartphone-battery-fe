import React from "react";

// Define props interface for RuL component
interface RULGraphsProps {
  graphTitle: string;
}

const RULGraphs: React.FC<RULGraphsProps> = ({graphTitle}) => {
  return (
    <div className="box-border size-auto border-4 p-4 rounded-xl">
      <div className="font-semibold text-center">
        <h2>{graphTitle}</h2>
      </div>
    </div>
  )
}

export default RULGraphs;