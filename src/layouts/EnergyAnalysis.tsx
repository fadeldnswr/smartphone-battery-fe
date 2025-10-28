import React from "react";
import EnergyGraphs from "@/components/EnergyGraphs";

// Define grapsh list for dummy data
const graphsList = [
  { graphTitle: "Battery Energy"},
  { graphTitle: "Energy Per Bit"},
  { graphTitle: "Battery Cost of Traffic"},
  { graphTitle: "Throughput"},
]

const EnergyAnalysis = () => {
  return (
    <section className="box-border size-auto border-4 p-4 rounded-xl mt-4 bg-[#FFFFFF]">
      <h1 className="text-2xl mb-4 text-[#0A0E1F] pl-2 font-semibold font-sans text-center">
        Energy Analysis
      </h1>
      <div className="grid grid-cols-2 gap-4">
        {graphsList.map((graph, index) => (
          <EnergyGraphs
          key={index}
          graphTitle={graph.graphTitle} />
        ))}
      </div>
    </section>
  )
}

export default EnergyAnalysis;