// src/lib/supabase/server-rsc.ts
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createSupabaseRSC() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_API_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_API_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      } as {
        get(name: string): string | undefined;
        set?: (name: string, value: string, options: CookieOptions) => void;
        remove?: (name: string, options: CookieOptions) => void;
      },
    }
  );
}
