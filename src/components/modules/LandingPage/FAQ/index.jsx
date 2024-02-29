import React, { useEffect, useRef, useState } from "react";
import { FAQData } from "../Data";
import useMultilineCheck from "@/components/Common/CheckTextLine";

export default function FAQ() {
  const divRef = useRef(null);
  // const divRef = useRef(null);

  // console.log(isMultiline,'isMultiline')
  return (
    <div className="px-[20px] md:px-[72px] bg-[#060809]">
      <div className="md:text-center font-1 font-bold text-white text-[25px] md:text-[54px] mb-[40px] md:mb-[64px] leading-normal md:leading-[67px]">
        Frequently Asked Questions
      </div>
    
      <div className=" bg-[#060809] pb-[50px] lg:pb-[164px]">
        <div className="grid grid-cols-1 gap-y-9 :-gap-4  md:grid-cols-1 md:gap-6 xl:grid-cols-3 lg:gap-x-[178px] text-white">
          {FAQData?.map((item, i) => {
            const isMultiline = true;

            // console.log(isMultiline, "isMultiline");

            return (
              <div
                className={`flex flex-col justify-start class-1 `}
                key={i}
              >
                <div
                  ref={divRef}
                  className={`font-1 lg:h-[9vh] text-[18px] md:text-[27px] font-bold mb-[10px]  md:mb-[24px]  class-${
                    i + 1
                  } ${isMultiline ? "multiline-style" : ""}`}
                >
                  {item?.name}
                </div>
                <div
                  className="text-[14px] md:text-[18px] leading-[28px] font400"
                  dangerouslySetInnerHTML={{ __html: item?.desc }}
                ></div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
