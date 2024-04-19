import React from "react";
import Marquee from "react-fast-marquee";
import { ArtistData } from "./Data";
import Image from "next/image";
export default function ArtistList() {
  return (
    <div className="bg-[#060809] pb-[100px] md:pb-[199px]">
      <Marquee>
        {/* <div className="flex"></div> */}
        {ArtistData?.map((item, i) => (
          <Image width={178} height={125} blurDataURL={item} placeholder="blur" key={i} alt={`artist ${i}`} src={item} className={`h-auto rounded-md md:h-[178px] mr-[16px] object-cover`} />
        ))}
      </Marquee>
    </div>
  );
}
