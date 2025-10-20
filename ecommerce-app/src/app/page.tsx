"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";
import { supabase } from "@/constant/supabase-client";

export default function Home() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    // Get the initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    // Cleanup subscription on unmount
    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="p-4">
      {session ? (
        <div>
          <h1 className="text-2xl font-bold mb-4">
            Welcome, {session.user.email}
          </h1>
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-lg font-semibold mb-2">Session Info:</h2>
            <p>
              <span className="font-medium">User ID:</span> {session.user.id}
            </p>
            <p>
              <span className="font-medium">Email:</span> {session.user.email}
            </p>
            <p>
              <span className="font-medium">Last Sign In:</span>{" "}
              {new Date(session.user.last_sign_in_at || "").toLocaleString()}
            </p>
          </div>
        </div>
      ) : (
        <p className="text-lg">
          Please sign in to view your session information.
        </p>
      )}
    </div>
  );
}
