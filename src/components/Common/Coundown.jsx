import { CountdownTimerII, CountdownTimerIII } from "@/utils/reusableComponent";
import React from "react";

export default function CountDown({date,onBack}) {
  return (
    <div className="bg-[#1B1C20] py-[43px] rounded-[16px] text-center text-white relative">
      <div onClick={onBack} className="absolute right-4 top-4  cursor-pointer">
        <svg
          width="27"
          height="27"
          viewBox="0 0 27 27"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="13.5" cy="13.5" r="13.5" fill="#2F3239" />
          <path
            d="M16.6768 10L10.3239 16.9456"
            stroke="white"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M10.3239 10L16.6768 16.9456"
            stroke="white"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
      <div className=" text-[24px] mb-[23px] uppercase font-1 font-bold">
        Not started yet
      </div>
      <div className="text-[13px] text-[#63768D] font400 mb-[68px] leading-[17px]">
        Artiste radar live haven’t started yet, below is
        <br /> the count down to when the event will start
      </div>
     {date&& <CountdownTimerIII targetDate={date}/>}
      {/* <CountdownTimerII
      onNext={()=>{
        <div className="flex  justify-center text-[64px] text-[#FFFFFF] font-1">
        <div className="flex flex-col justify-center items-center relative">
          00
          <div className="text-[#63768D] text-[13px] font400 absolute -bottom-[10px]">
            Days
          </div>
        </div>
        :
        <div className="flex flex-col justify-center items-center relative">
          00
          <div className="text-[#63768D] text-[13px] font400 absolute -bottom-[10px]">
            Hours
          </div>
        </div>
        :
        <div className="flex flex-col justify-center items-center relative">
          00
          <div className="text-[#63768D] text-[13px] font400 absolute -bottom-[10px]">
            Minutes
          </div>
        </div>
        :
        <div className="flex flex-col justify-center items-center relative">
          00
          <div className="text-[#63768D] text-[13px] font400 absolute -bottom-[10px]">
            Seconds
          </div>
        </div>
      </div>
      }}
      /> */}
    
    </div>
  );
}
