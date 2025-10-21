import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <h1>buyer dashboard </h1>
      {children}
    </div>
  );
};

export default layout;
