import { PolicyUrl, termsUrl } from "@/utils/reusableComponent";
import Link from "next/link";
import React from "react";

export default function Footer() {
  const container = `px-[20px] lg:px-[40px] font-2 text-[13px] lg:text-[15px] border-[#262626] border-t-[1px] bg-[#000000] py-[25px] lg:py-[37px] text-[#495969]`;
  return (
    <div className={container}>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-[9px] md:gap-[23px]">
          <Link className=" text-[#495969] no-underline hover:text-white" href={termsUrl} target="_blank">Terms</Link>
          <Link className=" text-[#495969] no-underline hover:text-white" href={PolicyUrl} target="_blank">Privacy</Link>
          <div className="hidden md:block">Contact Us</div>
        </div>
        <div>© 2024, Liveparte</div>
      </div>
    </div>
  );
}
