import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { RULGraphsProps } from "@/types/predictionMetrics";


const RULGraphs: React.FC<RULGraphsProps> = ({graphTitle, data}) => {
  return (
    <div className="box-border size-auto border-2 h-96 p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
      <div className="font-sans text-center text-gray-500">
        <h2 className="font-semibold">{graphTitle}</h2>
      </div>
      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="efc"
              tickFormatter={(v) => v.toFixed(1)}
              label={{
                value: "EFC",
                position: "insideBottom",
                offset: -5,
              }}
              minTickGap={20}
            />
            <YAxis 
              domain={[0, 100]} 
              tickFormatter={(v) => `${v.toFixed(1)}%`}
            />
            <Tooltip 
              formatter={(value: number) =>
                typeof value === "number" ? `${value.toFixed(2)} %` : value}
              labelFormatter={(label) => `EFC: ${label.toFixed(2)}`}
            />
            <Legend verticalAlign="top" height={24}/>
            <Line 
              type="monotone"
              dataKey="soh_true"
              name="SoH True (%)"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={false}
            />
            <Line 
              type="monotone"
              dataKey="soh_pred"
              name="SoH Pred (%)"
              stroke="#E2852E"
              dot={false}
              strokeWidth={2}
              connectNulls={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default RULGraphs;