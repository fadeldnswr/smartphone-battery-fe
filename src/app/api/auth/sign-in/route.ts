import { NextResponse } from "next/server";
import { createSupabaseRoute } from "@/lib/supabase/server-route";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  const supabase = createSupabaseRoute()
  const { error } = await (await supabase).auth.signInWithPassword({
    email, password
  })

  // Handle errors and responses
  if(error) {
    return NextResponse.json({ error: error.message }, {status: 400});
  }

  return NextResponse.json({ message: "Sign-in successful" }, {status: 200});
}