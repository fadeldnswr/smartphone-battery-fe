import { createSupabaseRSC } from "@/lib/supabase/server-rsc";
import { redirect } from "next/navigation";
import DeviceForm from "./DeviceForm";


const SetupDevicePage = async () => {
  const supabase = createSupabaseRSC();

  // Check if user has logged in
  const { data: { user } } = await (await supabase).auth.getUser();
  if(!user){
    redirect("/login");
  }

  // Check if user has registered a device
  const {data: devices} = await (await supabase)
  .from("devices")
  .select("*")
  .eq("user_id", user.id);
  
  if (devices && devices.length > 0){
    redirect("/dashboard");
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#F9FAFB]">
      <DeviceForm /> 
    </main>
  )
}

export default SetupDevicePage;