import React from "react";
import ProgressBar from "./ui/progress-bar";

// Define props interface for Most Running App component
interface MostRunningAppProps {
  appName: string;
  usagePercentage: number;
}

const MostRunningApp: React.FC<MostRunningAppProps> = ({appName, usagePercentage}) => {
  return (
    <div className="box-border size-auto p-4 rounded-xl">
      <div className="grid grid-cols-2">
        <div>
          <p className="font-semibold">{appName}</p>
        </div>
        <div>
          <p className="text-right">{usagePercentage}%</p>
        </div>
      </div>
      <ProgressBar />
    </div>
  )
}

export default MostRunningApp;