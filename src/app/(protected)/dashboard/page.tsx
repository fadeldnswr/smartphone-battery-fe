import RawMetrics from "@/layouts/RawMetrics";
import EnergyAnalysis from "@/layouts/EnergyAnalysis";
import BatteryImpactAnalysis from "@/layouts/BatteryImpactAnalysis";
import Insights from "@/layouts/Insights";
import Navbar from "@/layouts/Navbar";
import { createSupabaseRSC } from "@/lib/supabase/server-rsc";
import { redirect } from "next/navigation";

export default async function Home() {
  const supabase = createSupabaseRSC();

  // Check if user has logged in
  const { data: { user } } = await (await supabase).auth.getUser();
  if(!user) redirect("/login");

  const { data: devices } = await (await supabase)
    .from("devices")
    .select("device_id, is_default")
    .eq("user_id", user.id);

  if (!devices || devices.length === 0) {
    redirect("/setup-device");
  }

  // Check active devices
  const activeDevice = devices.find((device) => device.is_default) ?? devices[0];
  const deviceId = activeDevice.device_id;
  return (
    <div className="font-['Lexend'] p-4 bg-[#F9FAFB]">
      <Navbar device_id={deviceId} table_name="raw_metrics" />
      <RawMetrics device_id={deviceId} table_name="raw_metrics" />
      <EnergyAnalysis device_id={deviceId} />
      <BatteryImpactAnalysis device_id={deviceId} table_name="raw_metrics" />
      <Insights table_name="raw_metrics" device_id={deviceId} top_rank={4} />
    </div>
  );
}