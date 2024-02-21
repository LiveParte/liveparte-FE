import BlurryImage from "@/components/Common/LazyLoader";
import React from "react";
import Marquee from "react-fast-marquee";
export default function ArtistList() {
  return (
    <div className="bg-[#060809] pb-[100px] md:pb-[199px]">
      <Marquee>
        <BlurryImage src={`/webp/3.png`} className={`h-[178px]`} />
      </Marquee>
    </div>
  );
}
