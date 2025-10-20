import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {

    const supabase = createRouteHandlerClient({ cookies });
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.exchangeCodeForSession(code);

    console.log("Session exchange result:", { session });
    if (session?.user) {
      // Check if profile exists
      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .single();

      // If profile doesn't exist, create one with default role
      if (!profile) {
        const { error: profileError } = await supabase.from("profiles").insert([
          {
            id: session.user.id,
            email: session.user.email,
            name:
              session.user.user_metadata.full_name ||
              session.user.email?.split("@")[0],
            role: "buyer", // Set default role to buyer
          },
        ]);

        if (profileError) {
          console.error("Error creating profile:", profileError);
        }
      }
    }
  }

  // Redirect to home page after sign in
  return NextResponse.redirect(new URL("/", requestUrl.origin));
}
