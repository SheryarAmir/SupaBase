import React from "react";
import Link from "next/link";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <h1>Seller Dashboard</h1>
      {children}
    </div>
  );
};

export default layout;
