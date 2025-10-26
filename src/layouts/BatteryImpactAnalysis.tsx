import PredictionMetrics from "@/components/PredictionMetrics";
import RULGraphs from "@/components/RULGraphs";
import React from "react";

// Define list for prediction metrics
const predictionList = [
  { metricTitle: "Predicted RUL", metricValue: "5 Months"},
  { metricTitle: "State of Health", metricValue: "75%"},
  { metricTitle: "E-Waste Reduction ", metricValue: "108 Kg/year"},
  { metricTitle: "Device Status", metricValue: "Good"},
]

const BatteryImpactAnalysis = () => {
  return (
    <section className="box-border size-auto border-2 p-4 rounded-xl mt-4">
      <h1 className="text-2xl mb-4 text-[#0A0E1F] pl-2 font-semibold">Battery Impact Analysis</h1>
      <div className="grid grid-cols-2 gap-4">
        <RULGraphs graphTitle="Grafik Prediksi RUL" />
        <div className="grid grid-cols-2 gap-4">
          {predictionList.map((metrics, index) => (
            <PredictionMetrics key={index}
            metricTitle={metrics.metricTitle}
            metricValue={metrics.metricValue} />
          ))}
        </div>
      </div>  
    </section>
  )
}

export default BatteryImpactAnalysis;