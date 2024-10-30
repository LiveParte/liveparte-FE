import React from "react";
import Home from "./event";
import NoAuth from "@/components/Layout/NoAuth";

export default function index() {
  return (
    <div className="min-h-[100vh] bg-[#06080933] over ">
      <NoAuth>
      <Home/>
      </NoAuth>
    </div>
  );
}
