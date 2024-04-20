import React from "react";
import ProgressBar from "../Common/ProgressBar/progressBar";
import { ObjectProvider } from "@/Context/ObjectProvider";
import IfHeaderIsAuth from "../Common/Header/IfHeaderIsAuth";

function NoAuth({ children }) {
  return (
    <div className="min-h-[100vh] bg-[#000000] flex flex-col justify-end relative">
      <div className="absolute left-0 right-0 z-50 top-0">
        <IfHeaderIsAuth />
      </div>
      {children}
    </div>
  );
}

export default NoAuth;
