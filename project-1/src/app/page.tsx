"use client";

import { supabase } from "@/constant/supabase-client";
import React, { useEffect, useState } from "react";
import Dashboard from "@/components/dashboard/page";
import Adduser from "@/components/adduser/page";

const page = () => {
  const [Session, setSession] = useState<any>(null);

  const fetchSession = async () => {
    const currentSession = await supabase.auth.getSession();
    console.log(currentSession);
  };

  useEffect(() => {
    fetchSession();
  }, []);

  return (
    <div>
      <Dashboard />
      <Adduser />
    </div>
  );
};

export default page;
