import { NextResponse } from "next/server";
import { createSupabaseRoute } from "@/lib/supabase/server-route";

export async function POST() {
  const supabase = createSupabaseRoute();
  await (await supabase).auth.signOut();
  return NextResponse.redirect(new URL("/login", process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"));
}