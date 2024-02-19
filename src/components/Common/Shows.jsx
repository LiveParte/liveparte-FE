import React from "react";
import { Play } from "../../../public/svg";

export default function ShowsCard({
  name,
  venue,
  isLive,
  showImage,
  id,
  showHeader = true,
}) {
  
  // alert(id)
  const backUrl =
    id == 1 ? `bg-[url('/webp/show.png')]` : `bg-[url('/webp/show2.png')]`;
  // console.log(showImage,'showImage')
  return (
    <div
      className={`relative h-[35vh] md:h-[40vh] lg:h-[55vh] rounded-[8px] lg:rounded-[20px] ${backUrl} bg-cover bg-center1`}
    >
      <div className="h-full">
        <div className=" flex flex-col h-full">
          {showHeader && (
            <span>
              {isLive ? (
                <div className="mt-[8px] lg:mt-[22px] ml-[8px] lg:ml-[16px] rounded-[9px] flex gap-[8px] items-center px-[5px] lg:px-[10px] py-[6px] bg-[#b3b2b4] w-fit ">
                  <div className="h-[8px] w-[8px] rounded-full bg-[#FA4354]"></div>
                  <div className="text-[11px] lg:text-[13px] xl:text-[15px] text-white">
                    Happening now
                  </div>
                </div>
              ) : (
                <div className="bg-[#263644] w-fit text-white px-[9px] py-[6px] mt-[8px] lg:mt-[22px] ml-[8px] lg:ml-[16px] rounded-[9px] text-[11px] lg:text-[13px] xl:text-[15px]">
                  March 24
                </div>
              )}
            </span>
          )}
          <div className="flex-[1] flex justify-center items-center">
            <Play />
          </div>

          <div className="text-center">
            <div className="font-1 text-[35px] md:text-[80px] font-medium text-white MB-[4px]  md:mb-[27px] leading-[38px] md:leading-[68px]">
              {name}
            </div>
            <div className="text-[#B4BECB] text-[10px] md:text-[13px] mb-[16px] mb:mb-[25px] font-medium font500 whitespace-nowrap overflow-hidden text-ellipsis px-[10px]">
              {venue}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
