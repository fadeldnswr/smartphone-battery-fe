import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Define supabase API URL and key
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_API_URL!;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_API_KEY!;

const POST = async (request: Request) => {
  try{
    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
    const { data: {user}, error: userError } = await supabase.auth.getUser();

    // Check for user authentication
    if(userError || !user){
      return NextResponse.json(
        {error: "Unauthorized"},
        {status: 401}
      );
    }

    // Parse request body
    const {device_id, name} = await request.json();
    // Check for required fields
    if(!device_id){
      return NextResponse.json(
        {error: "Device ID is required"},
        {status: 400}
      )
    }

    // Upsert to device table
    const {error} = await supabase
    .from("devices")
    .upsert({
      user_id: user.id,
      device_id,
      name: name ?? null,
      is_default: true,
    }, {onConflict: "device_id"});

    // Check if error
    if(error){
      return NextResponse.json(
        {error: "Failed to register device"},
        {status: 500}
      );
    }
    return NextResponse.json({ok: true}, {status: 200});
  } catch(e: unknown){
    console.error("Unexpected error in /api/devices/register:", e);
    return NextResponse.json(
      {error: "Internal Server Error"},
      {status: 500}
    );
  }
}

export default POST;