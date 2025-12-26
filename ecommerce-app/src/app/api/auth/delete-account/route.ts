import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const supabaseAdminUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseAdminUrl || !supabaseServiceKey) {
      return NextResponse.json(
        { error: "Missing Supabase configuration" },
        { status: 500 }
      );
    }

    // Create admin client (server-side only)
    const supabaseAdmin = createClient(supabaseAdminUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    // Get the user ID from the request body
    const { userId } = await request.json();

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    console.log("Attempting to delete user:", userId);

    // Delete user using admin API
    const { error } = await supabaseAdmin.auth.admin.deleteUser(userId);

    if (error) {
      console.error("Delete user error:", error);
      throw error;
    }

    console.log("User deleted successfully:", userId);

    return NextResponse.json(
      { success: true, message: "Account deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Delete account API error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to delete account",
      },
      { status: 500 }
    );
  }
}
