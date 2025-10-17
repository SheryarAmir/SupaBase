"use client";

import { supabase } from "@/constant/supabase-client";
import React, { useEffect, useState } from "react";
import Main from "@/app/main/page";

const page = () => {
  const [Session, setSession] = useState<any>(null);

  const fetchSession = async () => {
    // this function is check for the
    // session , if the session  avabile then show the adduser page otherwise show the dashboard page.
    const currentSession = await supabase.auth.getSession();
    console.log(currentSession);
    setSession(currentSession.data.session);
  };

  useEffect(() => {
    fetchSession(); // run the function
  }, []);

  return (
    <div>
      {Session ? (
        <>
          <p>welcome </p>
        </>
      ) : (
        <Main />
      )}
    </div>
  );
};

export default page;
