import RawMetrics from "@/layouts/RawMetrics";
import EnergyAnalysis from "@/layouts/EnergyAnalysis";

export default function Home() {
  return (
    <div className="font-['Lexend'] p-4">
      <h1 className="text-3xl mb-4">Smartphone Dashboard Tracker</h1>
      <RawMetrics />
      <EnergyAnalysis />
    </div>
  );
}