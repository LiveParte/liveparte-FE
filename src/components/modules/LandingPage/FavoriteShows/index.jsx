import React from "react";
import { BannerIcon, BannerIcon2, BannerSmall1 } from "../../../../../public/svg";
import Image from "next/image";

export default function FavoriteShow() {
  return (
    <div className=" md:pt-[56px] bg-[#060809]  pb-[80px] lg:pb-[112px]">
        <div className="flex justify-start mb-1 lg:hidden">
        <BannerSmall1/>
        </div>
      <div className="px-[30px] lg:px-[96px] flex  justify-center lg:justify-between items-center mb-[40px] md:mb-[80px] lg:mb-[119px]">
        <div  className="hidden lg:block">
          <BannerIcon />
        </div>
        <div className="font-1 text-[28px] md:text-[35px] lg:text-[45px] font-bold uppercase text-white text-center md:leading-[56px]">
          Watch your favourite celebrity perform
          <br  className="hidden md:block"/> live from any device
        </div>
        <div style={{visibility:'hidden'}} className=" hidden lg:block">
          <BannerIcon />
        </div>
      </div>

      <div className="flex justify-center gap-[51px] items-start px-[30px] lg:px-[104px] ">
        <div className="w-[166px] hidden lg:block" style={{visibility:'hidden'}}>
          <BannerIcon2 />
        </div>
        <div className="flex justify-center items-center text-center ">
          <Image
            src={`/webp/2.webp`}
            // width={'80%'}
            className={`w-[80%]`}
            classNameMain={`flex justify-center`}
            width={838}
            height={400}
            alt="scenes"
          />
        </div>
        <div className="hidden lg:block mt-5" >
          <BannerIcon2 />
        </div>
      </div>
    </div>
  );
}
