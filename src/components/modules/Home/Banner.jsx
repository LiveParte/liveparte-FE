import Image from "next/image";
import React from "react";
import banner from "../../../../public/images/liveparte_banner.webp";
import bannerMobile from "../../../../public/images/Subtract.webp";

const Banner = () => {
  return (
    <div className="w-[95%] mx-auto pt-24">
      <div className="relative">
        <Image
          className="w-full lg:h-[662px] h-[524px] hidden md:block"
          src={banner}
          alt="liveparte banner"
        />
        <Image
          className="w-full lg:h-[662px] h-[524px] md:hidden"
          src={bannerMobile}
          alt="liveparte banner"
        />

        <div className="absolute top-0 text-white.200 lg:h-[662px] h-[524px] w-full">
          <div className="flex flex-col justify-center items-center h-full">
            <h1 className="font-mdtest font-bold lg:text-[92px] text-[62px] lg:leading-[92px] leading-[62px] tracking-[0.48px] uppercase text-center px-4">
              Never miss the concert
            </h1>
            <p className="font-mattersq md:text-[20px] text-[13px] leading-[15.6px] md:leading-[28px] font-normal tracking-[-0.2px] lg:w-[38%] w-[75%] mt-3 text-center">
              Get up close and personal with your favorite artists through
              exclusive live events, festivals, and concerts from around the
              world
            </p>

            <button className="text-black.100 text-[13px] bg-white.200 mt-10 px-5 rounded-[8px] font-medium py-3 tracking-[-0.12px]">
              Browse Events
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
