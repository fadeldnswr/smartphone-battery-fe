"use client";

import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { fetchGraphs } from "@/lib/fetchGraphs";
import { ThroughputPoint, EnergyPoint, EnergyPerBitPoint, BatteryCostPoint } from "@/types/metrics";

// Create interface for graph props
interface GraphProps {
  device_id: string;
  graphTitle: string;
  refreshMs?: number;
}

const EnergyGraphs: React.FC<GraphProps> = ({graphTitle, device_id, refreshMs = 50000}) => {
  // Define state for graph data
  const [throughput, setThroughput] = useState<ThroughputPoint[]>([]);
  const [energy, setEnergy] = useState<EnergyPoint[]>([]);
  const [energyPerBit, setEnergyPerBit] = useState<EnergyPerBitPoint[]>([]);
  const [batteryCost, setBatteryCost] = useState<BatteryCostPoint[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Load graph data
  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try{
        setLoading(true);
        const response = await fetchGraphs({device_id})
        if(!cancelled){
          const thrFormatted = response.thr_points.map((thr) => ({
            ...thr,
            timestamp: new Date(thr.timestamp).toLocaleString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          }))
          const energyFormatted = response.energy_points.map((en) => ({
            ...en,
            timestamp: new Date(en.timestamp).toLocaleString([], {
              hour: "2-digit",
              minute: "2-digit",
            })
          }))
          const epbFormatted = response.energy_per_bit_points.map((epb) => ({
            ...epb,
            timestamp: new Date(epb.timestamp).toLocaleString([], {
              hour: "2-digit",
              minute: "2-digit",
            })
          }))
          const bctFormatted = response.bot_points.map((bct) => ({
            ...bct,
            timestamp: new Date(bct.timestamp).toLocaleString([], {
              hour: "2-digit",
              minute: "2-digit",
            })
          }))
          setThroughput(thrFormatted);
          setEnergy(energyFormatted);
          setEnergyPerBit(epbFormatted);
          setBatteryCost(bctFormatted);
        }
      } catch (error){
        console.error("Error loading graph data:", error);
      } finally {
        if(!cancelled) setLoading(false);
      }
    }
    load();

    const interval = setInterval(() => {
      load();
    }, refreshMs);

    return () => {
      cancelled = true;
      clearInterval(interval);
    }
  }, [device_id, refreshMs]);

  // Check if graph is throughput or energy
  const isEnergy = graphTitle === "Battery Energy";
  const isThroughput = graphTitle === "Throughput";
  const isEnergyPerBit = graphTitle === "Energy Per Bit";
  const isBatteryCost = graphTitle === "Battery Cost of Traffic";

  return (
    <div className="box-border w-full size-auto border-2 p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
      <div className="text-center text-gray-500">
        <h2 className="font-sans">{graphTitle}</h2>
      </div>

      {isEnergy && (
        <div className="w-full h-72">
          {loading && energy.length === 0 ? (
            <div className="text-gray-400 text-sm text-center mt-8">
              Loading...
            </div>
          ): energy.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-400 text-sm">No energy data yet.</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={energy}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="timestamp" 
              label={{angle: 45}}
              />
              <YAxis label={{ value: "Wh", angle: -90, position: "insideLeft" }} />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone"
                dataKey="energy_wh"
                name="Total Energy (Wh)"
                stroke="#0A0E1F"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div> 
      )}

      {isThroughput && (
        <div className="w-full h-72">
          {loading && throughput.length === 0 ? (
            <div className="text-gray-400 text-sm text-center mt-8">
              Loading...
            </div>
          ): throughput.length === 0 ? (
            <div className="text-gray-400 text-sm text-center mt-8">
              No throughput data yet.
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={throughput}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timestamp" 
                label={{angle: 45}}
                />
                <YAxis label={{ value: "Mbps", angle: -90, position: "insideLeft" }} />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone"
                  dataKey="throughput_total_mbps"
                  name="Total Throughput (Mbps)"
                  stroke="#0A0E1F"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
        )}
      </div>
    )}

    {isBatteryCost && (
      <div className="w-full h-72 flex items-center justify-center">
        {loading && batteryCost.length === 0 ? (
          <div className="text-gray-400 text-sm text-center mt-8">
              Loading...
          </div>
          ): batteryCost.length === 0 ? (
            <div className="text-gray-400 text-sm text-center mt-8">
              No throughput data yet.
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={batteryCost}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timestamp" 
                label={{angle: 45}}
                />
                <YAxis label={{ value: "mAh/Gbps", angle: -90, position: "insideLeft" }} />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone"
                  dataKey="bot_mAh_per_Gbps"
                  name="Battery Cost of Traffic (mAh/Gbps)"
                  stroke="#0A0E1F"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
        )}
      </div>
    )}

    {isEnergyPerBit && (
      <div className="w-full h-72 flex items-center justify-center">
      {loading && energyPerBit.length === 0 ? (
          <div className="text-gray-400 text-sm text-center mt-8">
              Loading...
          </div>
          ): energyPerBit.length === 0 ? (
            <div className="text-gray-400 text-sm text-center mt-8">
              No throughput data yet.
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={energyPerBit}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timestamp" 
                label={{angle: 45}}
                />
                <YAxis label={{ value: "Joule", angle: -90, position: "insideLeft" }} />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone"
                  dataKey="energy_per_bit_avg_J"
                  name="Average Energy Per Bit (Joule)"
                  stroke="#0A0E1F"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
        )}
      </div>
    )}
    </div>
  )};

export default EnergyGraphs;