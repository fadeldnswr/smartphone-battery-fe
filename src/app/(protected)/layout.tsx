import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { createSupabaseRSC } from "@/lib/supabase/server-rsc";

export default async function ProtectedLayout({ children }: { children: ReactNode }) {
  const supabase = createSupabaseRSC();
  const {data: { user }} = await (await supabase).auth.getUser();

  // Direct user to login first
  if(!user) redirect("/login");
  return (
    <>
      {children}
    </>
  )
}
