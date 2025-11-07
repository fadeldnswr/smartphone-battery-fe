"use client";

import React, { useEffect, useState } from "react";
import MostRunningApp from "@/components/MostRunningApp";
import { UsageAppsResponse } from "@/types/usageApps";
import { fetchUsageApps } from "@/lib/fetchUsageApps";

// Define props for usage apps
type UsageAppsProps = {
  device_id: string;
  table_name: string;
  top_rank: number;
}

const Insights: React.FC<UsageAppsProps> = ({device_id, table_name, top_rank}) => {
  // Define most running application states
  const [apps, setApps] = useState<UsageAppsResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch most running applications data
  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetchUsageApps({ device_id, top_rank, table_name });
        if(!cancelled){
          setApps(response);
          console.log("Fetched usage apps:", response);
        }
      } catch (error: unknown){
        if(!cancelled){
          const message = error instanceof Error ? error.message : "Failed to fetch usage apps";
          setError(message);
        }
      } finally {
        if(!cancelled) setLoading(false);
      }
    }

    // Fetch data from 
    fetchData();

    // Return function to cancel fetch on unmount
    return () => {
      cancelled = true;
    }
  }, [device_id, table_name, top_rank]);

  // Define the list of most running applications
  const usageStats = apps?.usage_stats ?? [];
  const mostRunningApps = usageStats.length > 0 ? usageStats.map((app) => ({
    appName: app.fg_pkg ?? "Unknown App",
    totalMb: app.total_mb ?? 0,
  })) : [];

  return (
    <section className="box-border size-auto border-4 p-4 rounded-xl mt-4 bg-[#FFFFFF] font-sans">
      <h1 className="text-2xl mb-4 text-[#0A0E1F] pl-2 font-semibold text-center">Most Running Application</h1>
      <div className="grid grid-cols-2 mt-4">
        <div className="box-border size-auto border-2 rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300">
          {loading && (
            <div className="text-xs text-gray-500 text-center py-4">
              Loading...
            </div>
          )}

          {!loading && error && (
            <div className="text-xs text-red-500 text-center py-4">
              {error}
            </div>
          )}

          {!loading && !error && mostRunningApps.length === 0 && (
            <div className="text-xs text-gray-400 text-center py-4">
              No application data available.
            </div>
          )}

          {!loading && !error && mostRunningApps.length > 0 && (
            <div className="space-y-2">
              {mostRunningApps.map((app, index) => (
                <MostRunningApp 
                key={index}
                appName={app.appName}
                totalMb={app.totalMb}
                />
              ))}
            </div>
          )}
        </div>
        <div className="box-border size-auto border-2 p-4 rounded-xl ml-4 shadow-md hover:shadow-lg transition-all duration-300">
          <h3 className="text-center font-semibold font-sans text-gray-500">Insights & Recommendation</h3>
          <p className="text-justify mt-4 font-sans">Device anda masih termasuk dalam kondisi sehat,
            tetap pertahankan selama 1-2 tahun kedepan untuk
            mengurangi kontribusi limbah elektronik</p>
        </div>
      </div>
    </section>
  )
}

export default Insights;