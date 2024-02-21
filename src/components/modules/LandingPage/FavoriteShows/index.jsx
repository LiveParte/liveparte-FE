import React from "react";
import { BannerIcon, BannerIcon2 } from "../../../../../public/svg";
import BlurryImage from "@/components/Common/LazyLoader";

export default function FavoriteShow() {
  return (
    <div className="pt-[56px] bg-[#060809]  pb-[80px] lg:pb-[112px]">
      <div className="px-[30px] lg:px-[96px] flex justify-between items-center mb-[40px] md:mb-[80px] lg:mb-[119px]">
        <div className="hidden lg:block">
          <BannerIcon />
        </div>
        <div className="font-1 text-[28px] md:text-[35px] lg:text-[45px] font-bold uppercase text-white text-center md:leading-[56px]">
          Watch your favourite celebrity perform
          <br  className="hidden lg:block"/> live from any device
        </div>
        <div className="w-[195px] hidden lg:block">
          <BannerIcon />
        </div>
      </div>

      <div className="flex justify-center gap-[51px] items-center">
        <div className="w-[166px] hidden lg:block">
          <BannerIcon2 />
        </div>
        <div className="flex justify-center items-center text-center ">
          <BlurryImage
            src={`/webp/2.png`}
            // width={'80%'}
            className={`w-[80%]`}
            classNameMain={`flex justify-center`}
          />
        </div>
        <div className="hidden lg:block">
          <BannerIcon2 />
        </div>
      </div>
    </div>
  );
}
