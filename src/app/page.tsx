import RawMetrics from "@/layouts/RawMetrics";
import EnergyAnalysis from "@/layouts/EnergyAnalysis";
import BatteryImpactAnalysis from "@/layouts/BatteryImpactAnalysis";
import Insights from "@/layouts/Insights";
import Navbar from "@/layouts/Navbar";

export default function Home() {
  return (
    <div className="font-['Lexend'] p-4">
      <Navbar />
      <RawMetrics />
      <EnergyAnalysis />
      <BatteryImpactAnalysis />
      <Insights />
    </div>
  );
}