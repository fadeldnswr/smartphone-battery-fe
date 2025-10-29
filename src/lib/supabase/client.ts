"use client";

import { createBrowserClient } from "@supabase/ssr";

const supabaseBrowser = () => {
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_API_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_API_KEY!
  )
}

export default supabaseBrowser;