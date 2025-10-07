"use client";

import { supabase } from "@/constant/supabase-client";
import React, { useEffect, useState } from "react";
import Dashboard from "@/components/dashboard/page";
import Adduser from "@/components/adduser/page";
import { useSignOut } from "@/hooks/useAuth.hook";
const page = () => {
  const [Session, setSession] = useState<any>(null);

  const { mutate } = useSignOut();

  const fetchSession = async () => {
    const currentSession = await supabase.auth.getSession();
    console.log(currentSession);
    setSession(currentSession.data.session);
  };

  useEffect(() => {
    fetchSession();
  }, []);

  const handlerLogOut = () => {
    mutate();
  };

  return (
    <div>
      {" "}
      {Session ? (
        <>
          <button onClick={handlerLogOut}>logout</button>
          <Adduser />{" "}
        </>
      ) : (
        <Dashboard />
      )}{" "}
    </div>
  );
};

export default page;
