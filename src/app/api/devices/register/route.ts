import { NextResponse } from "next/server";
import { createSupabaseRoute } from "@/lib/supabase/server-route";

export async function POST(request: Request) {
  try{
    const supabase = createSupabaseRoute()
    const { data: {user}, error: userError } = await (await supabase).auth.getUser();

    // Check for user authentication
    if(userError || !user){
      return NextResponse.json(
        {error: "Unauthorized"},
        {status: 401}
      );
    }

    // Parse request body
    const body = await request.json();
    const { device_id, name } = body;

    // Check for device_id
    if(!device_id){
      return NextResponse.json(
        {error: "Device ID is required"},
        {status: 400}
      );
    }

    const { error } = await (await supabase)
    .from("devices")
    .upsert({
      user_id: user.id,
      device_id,
      name: name ?? null,
      is_default: true,
    }, { onConflict: "device_id" })

    if(error){
      console.error("Supabase error in /api/devices/register:", error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { ok: true },
      { status: 200 }
    )
  } catch(e: unknown){
    console.error("Unexpected error in /api/devices/register:", e);
    return NextResponse.json(
      {error: "Internal Server Error"},
      {status: 500}
    );
  }
}