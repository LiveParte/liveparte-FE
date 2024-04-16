import React from "react";
import ProgressBar from "../Common/ProgressBar/progressBar";
import { ObjectProvider } from "@/Context/ObjectProvider";

function NoAuth({ children }) {
  return (
    
      <div className="min-h-[100vh] bg-[#000000] flex flex-col justify-end">{children}</div>
  )
}

export default NoAuth;
