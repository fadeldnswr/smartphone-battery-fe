import RawMetrics from "@/layouts/RawMetrics";
import EnergyAnalysis from "@/layouts/EnergyAnalysis";
import BatteryImpactAnalysis from "@/layouts/BatteryImpactAnalysis";
import Insights from "@/layouts/Insights";
import Navbar from "@/layouts/Navbar";

export default function Home() {
  return (
    <div className="font-['Lexend'] p-4 bg-[#F9FAFB]">
      <Navbar />
      <RawMetrics device_id="SM-S931B-57bc0e2d9eac7750" table_name="raw_metrics" />
      <EnergyAnalysis device_id="SM-S931B-57bc0e2d9eac7750" />
      <BatteryImpactAnalysis device_id="SM-S931B-57bc0e2d9eac7750" table_name="raw_metrics" />
      <Insights table_name="raw_metrics" device_id="SM-S931B-57bc0e2d9eac7750" top_rank={4} />
    </div>
  );
}