import BlurryImage from "@/components/Common/LazyLoader";
import React from "react";
import Marquee from "react-fast-marquee";
import { ArtistData } from "./Data";
export default function ArtistList() {
  return (
    <div className="bg-[#060809] pb-[100px] md:pb-[199px]">
      <Marquee>
        {/* <div className="flex"></div> */}
        {ArtistData?.map((item, i) => (
          <BlurryImage key={i} src={item} className={`h-[125px] md:h-[178px] mr-[16px] object-cover`} />
        ))}
      </Marquee>
    </div>
  );
}
