import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    const supabase = createRouteHandlerClient({ cookies });

    // STEP 1: Exchange OAuth code for a session
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.exchangeCodeForSession(code);

    if (sessionError) {
      console.error("Session error:", sessionError);
    }

    const user = session?.user;

    if (user) {
      console.log("User attributes:", user);

      // STEP 2: Insert or update seller profile
      const { error: insertError } = await supabase.from("profiles").upsert({
        id: user.id, // match auth.users.id
        name: user.user_metadata.full_name,
        email: user.email,
        role:"seller",
  
      });
    }
  }
  return NextResponse.redirect(new URL("/dashboards/seller", requestUrl.origin));
}
