import { CountdownTimerII, CountdownTimerIII } from "@/utils/reusableComponent";
import React from "react";

export default function CountDown({date,onBack}) {

  function calculateTimeLeft(targetDate) {
    const currentDate = new Date();
  const targetDateTime = new Date(targetDate);

  // Set targetDateTime to midnight UTC of the target date
  targetDateTime.setUTCHours(0, 0, 0, 0);

  // Calculate the difference in milliseconds between target date and current date
  const difference = targetDateTime.getTime() - currentDate.getTime();

  if (difference <= 0) {
    // If target date has passed or is equal to current date, return all zeros
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  // Convert milliseconds difference into days, hours, minutes, and seconds
  let seconds = Math.floor(difference / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  hours %= 24;
  minutes %= 60;
  seconds %= 60;

  return { days, hours, minutes, seconds };
  }

  console.log(date,'Hello')
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
     {/* {date&&console.log(calculateTimeLeft(date),"hello2")} */}
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
