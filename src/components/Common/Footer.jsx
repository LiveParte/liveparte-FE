import React from "react";

export default function Footer() {
  const container = `px-[20px] lg:px-[40px] font-2 text-[13px] lg:text-[15px] border-[#262626] border-t-[1px] bg-[#000000] py-[25px] lg:py-[37px] text-[#495969]`;
  return (
    <div className={container}>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-[9px] md:gap-[23px]">
          <div>Terms</div>
          <div>Privacy</div>
          <div className="hidden md:block">Customer Service</div>
        </div>
        <div>© 2024, liveparty Inc.</div>
      </div>
    </div>
  );
}
