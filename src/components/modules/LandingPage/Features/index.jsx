import React from "react";
import { Feature1Icon } from "../../../../../public/svg";
import { FeatureData } from "../Data";

export default function Features() {
  return (
    <div className="px-[40px] md:px-[80px] lg:px-[158px] bg-[#060809] pb-[100px] md:pb-[164px]">
      <div className="grid grid-cols-1 gap-[35px]  md:grid-cols-1 md:gap-10 lg:grid-cols-3 xl:gap-x-[112px]">
        {FeatureData?.map((item, i) => (
          <div
            className={`flex flex-col justify-start items-center ${item?.color}`}
            key={i}
          >
            <div className="mb-[20px] lg:mb-[40px]">
              {item?.icon}
            </div>
            <div className="font-1 text-[20px] md:text-[24px] font-bold lg:mb-[16px]" dangerouslySetInnerHTML={{__html:item?.name}} >
            
            </div>
            <div className="md:text-[20px] leading-normal md:leading-[28px] text-center  font400" dangerouslySetInnerHTML={{__html:item?.dec}}>
              {/* {item?.dec} */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
