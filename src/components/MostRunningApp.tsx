"use client";

import React from "react";
import { Progress } from "./ui/progress";

// Define props interface for Most Running App component
interface MostRunningAppProps {
  appName: string;
  totalMb: number;
}

// Define constants for MB to GB conversion
const MAX_GB = 50;
const MAX_MB = MAX_GB * 1024;

const MostRunningApp: React.FC<MostRunningAppProps> = ({appName, totalMb}) => {
  // Convert totalMb to a value between 0 and 100 for progress bar
  const formatStorage = (mb: number): string => {
    if (mb >= 1024) return `${(mb / 1024).toFixed(2)} GB`;
    return `${mb.toFixed(2)} MB`;
  }
  // Calculate progress bar relative to 100 GB
  const percentOfMax = Math.min((totalMb / MAX_MB) * 100, 100);

  return (
    <div className="box-border size-auto p-4 pb-8 rounded-xl font-sans w-full">
      <div className="flex items-center justify-between text-sm mb-1">
        <span className="font-semibold text-gray-800 truncate max-w-[60%]">
          {appName}
        </span>
        <span className="text-gray-500 text-xs">
          {formatStorage(totalMb)} / {MAX_GB} GB
        </span>
      </div>

      <Progress value={percentOfMax} className="h-2" />
      <p className="text-[11px] text-gray-400 mt-1">
        {percentOfMax.toFixed(2)}% of {MAX_GB} GB
      </p>
    </div>
  )
}

export default MostRunningApp;