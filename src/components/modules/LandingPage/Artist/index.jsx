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
          <div key={i} className="relative w-[139px] h-[158px] mr-[16px]">
            <Image 
            src={item}
          alt="Picture of the author"
          // width={500}
          height={0}
          width={0}
          priority={false}
          fill
          sizes="(min-width: 808px) 50vw, 100vw"
          />
          </div>
        ))}
      </Marquee>
    </div>
  );
}
