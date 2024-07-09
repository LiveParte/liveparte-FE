import React, { useEffect, useState } from "react";
import {
  VideoNextBy10secIcon,
  VideoNextBy10secIconII,
  VideoPauseIcon,
  VideoPlayIcon,
  VideoPlayIconII,
  VideoPrevBy10secIcon,
  VideoPrevBy10secIconII,
} from "../../../../../public/svg";
import { SendCoinsComp } from "./chatsubmodules/sendCoins";
import Chat from "./chat";

export default function MobilePlayer({
  orientationLocked,
  calculateProgressPercentage,
  togglePlayPause,
  isPlaying,
  rewind,
  fastForward,
  currentTime,
}) {
  const [isVisible, setIsVisible] = useState(true);

  const prevIcon = orientationLocked ? (
    <VideoPrevBy10secIconII />
  ) : (
    <VideoPrevBy10secIcon />
  );
  const playIcon = orientationLocked ? <VideoPlayIconII /> : <VideoPlayIcon />;
  const nextIcon = orientationLocked ? (
    <VideoNextBy10secIconII />
  ) : (
    <VideoNextBy10secIcon />
  );

  useEffect(() => {
    let timer;
    if (isVisible) {
      timer = setTimeout(() => {
        setIsVisible(false);
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [isVisible]);

  const handleClick = () => {
    setIsVisible(true);
  };
  return (
    <div
      // onMouseEnter={() => setIsHoveredOrTouched(true)}
      // onMouseLeave={() => setIsHoveredOrTouched(false)}
      onTouchStart={() => setIsVisible(true)}
      // onTouchEnd={() => setIsHoveredOrTouched(false)}
      onClick={() => setIsVisible(true)}
      className={` lg:hidden absolute top-0 left-0 right-0 bottom-0 z-10 group pb-[10px] ${
        orientationLocked && "pb-[60px]"
      }`}
    >
      {isVisible && (
        <div className=" flex-1 h-full  flex flex-col">
          <div className="flex-1   flex justify-center items-center pt-[40px]">
            <div
              className={`bg-black/30 backdrop-blur-[8px]  flex justify-center items-center  gap-[40px] rounded-[30px] px-[16px] py-[12px]  group-hover:visible ${
                orientationLocked ? "px-[32px] py-[14px]" : ""
              }`}
            >
              <span onClick={rewind}> {prevIcon}</span>

              <span onClick={togglePlayPause}>
                {isPlaying ? playIcon : <VideoPauseIcon />}
              </span>
              <span onClick={fastForward}> {nextIcon}</span>
            </div>
          </div>{" "}
          <div
            className={`px-[16px] flex items-center gap-[23px] text-[11px] text-white ${
              orientationLocked && "px-[56px]"
            }`}
          >
            <div className="flex-1 bg-[#CCEDEB] h-[2px] rounded-[30px] relative">
              <div
                className=" h-[2px] rounded-[30px] flex items-center"
                style={{ width: `${calculateProgressPercentage}%` }}
              >
                <div className="flex-1  h-[2px]"></div>
                <div className="h-[10px] w-[10px] rounded-full flex justify-center items-center bg-white">
                  <div className="h-[7px] w-[7px] bg-[#02A59A] rounded-full"></div>
                </div>
              </div>
            </div>
            <span>{currentTime}</span>
          </div>
          {/* <div className="h-[17px]"></div> */}
        </div>
      )}

      {/* <div className="flex">
      <SendCoinsComp/>
      </div> */}
    </div>
  );
}
