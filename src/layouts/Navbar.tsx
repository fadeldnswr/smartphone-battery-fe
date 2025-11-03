"use client";

import React, { useEffect, useState } from "react";
import { fetchMetrics } from "@/lib/fetchMetrics";
import { RawMetricsProps } from "@/types/metrics";

// Define type props for Device id
type NavbarProps = {
  device_id?: string;
  table_name?: string;
}

const Navbar: React.FC<NavbarProps> = ({
  device_id = "SM-S931B-57bc0e2d9eac7750",
  table_name = "raw_metrics"
}) => {
  const [device, setDevice] = useState<RawMetricsProps | null>(null);
  const [loading, setLoading] = useState<boolean | null>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchMetrics({table_name, device_id});
        if(!cancelled) setDevice(data as RawMetricsProps);
      } catch (error: unknown) {
        if(!cancelled){
          const message = error instanceof Error ? error.message : "Failed to fetch device data";
          setError(message);
        }
      } finally {
        if(!cancelled) setLoading(false);
      }
    }

    run();
    return () => {
      cancelled = true;
    }
  }, [device_id, table_name]);

  return (
    <section>
      <nav className="grid grid-cols-4 mb-4 p-1">
        <div className="col-span-2">
          <h1 className="text-5xl font-bold mb-4 text-[#0A0E1F]">Smartphone Dashboard Analysis</h1>
          {loading && (
            <p className="text-gray-500 p-6">
              Loading..
            </p>
          )}
          {!loading && error && (
            <p className="text-red-500 text-center p-6">
              {error}
            </p>
          )}
          {!loading && !error && device && (
            <p>
              Device: {device.device_id} A.K.A HP ARREL!!
            </p>
          )}
        </div>
        <div className="text-right">
        </div> 
        <div className="text-right">
          <p>Login Sign Up</p>
        </div>
      </nav>
    </section>
  )
}

export default Navbar;