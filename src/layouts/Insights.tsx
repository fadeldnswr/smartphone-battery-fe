import React from "react";
import MostRunningApp from "@/components/MostRunningApp";

// Define most running app dummy data
const runningApps = [
  { appName: "YouTube", usagePercentage: 100 },
  { appName: "Instagram", usagePercentage: 100 },
  { appName: "WhatsApp", usagePercentage: 100 },
  { appName: "TikTok", usagePercentage: 100 },
]

const Insights = () => {
  return (
    <section className="box-border size-auto border-2 p-4 rounded-xl mt-4">
      <h1 className="text-2xl mb-4 text-[#0A0E1F] pl-2 font-semibold">Most Running Application</h1>
      <div className="grid grid-cols-2 mt-4">
        <div className="box-border size-auto border-4 rounded-xl">
          {runningApps.map((app, index) => (
            <MostRunningApp
            key={index}
            appName={app.appName}
            usagePercentage={app.usagePercentage} />
          ))}
        </div>
        <div className="box-border size-auto border-4 p-4 rounded-xl ml-4">
          <h3 className="text-center font-semibold">Insights & Recommendation</h3>
          <p className="text-justify mt-4">Device anda masih termasuk dalam kondisi sehat,
            tetap pertahankan selama 1-2 tahun kedepan untuk
            mengurangi kontribusi limbah elektronik</p>
        </div>
      </div>
    </section>
  )
}

export default Insights;