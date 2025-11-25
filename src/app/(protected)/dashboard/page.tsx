import DashboardClient from "@/layouts/DashboardClient";
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

  // Get soh_pred_pct and rul_months from predictions table
  const soh_pred_pct: number | null = null;
  const rul_months: number | null = null;
  return (
    <div className="font-['Lexend'] p-4 bg-[#F9FAFB]">
      <DashboardClient
      device_id={deviceId}
      soh_pred_pct={soh_pred_pct}
      rul_months={rul_months}
      />
    </div>
  );
}