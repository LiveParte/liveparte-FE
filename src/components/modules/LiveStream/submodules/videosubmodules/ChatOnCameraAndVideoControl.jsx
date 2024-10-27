import React, { memo, useState, useCallback } from "react";
import { IsDesktopMobileChat } from "../../style";
import Chat from "../chat";
import {
  VideoMuteIcon,
  VideoNextBy10secIcon,
  VideoPauseIcon,
  VideoPlayIcon,
  VideoPrevBy10secIcon,
  VideoUnMuteIcon,
} from "../../../../../../public/svg";
import Image from "next/image";
import { formatMoney } from "@/utils/formatMoney";
import { useSelector } from "react-redux";
import { selectCoins } from "@/store/User";
import { useRouter } from "next/router";
import { useObject } from "@/Context/ObjectProvider";

const MemoizedChat = memo(Chat);

function ChatOnCameraAndVideoControl({
  liveStreamDetail,
  userProfileData,
  calculateProgressPercentage,
  // handleMouseDown,
  // handleMouseMove,
  // handleMouseUp,
  // formatTime,
  currentTimeRef,
  durationRef,
  // isPlaying,
  // isMuted,
  isLive,
  // togglePlayPause,
  rewind,
  // toggleMute,
  fastForward,
  currentTime,
  // duration,
}) {
  const {isPlaying,isMuted,togglePlayPause,toggleMute,playerRef, handleFastForward,
    handleRewind,
    isDragging,
    handleProgress,
    handleDuration,
    formatTime, playedSeconds,
    duration, handleMouseDown,
    handleMouseUp,
    progressRef,
    handleMouseMove} =useObject()
  const router = useRouter();
  const userCoinsBalance = useSelector(selectCoins);
  const [isOpenGiftCoins, setIsOpenGiftCoins] = useState(false);
  const [isOpenBuyCoins, setIsOpenBuyCoins] = useState(false);

  const handleLeave = useCallback(() => {
    router.back();
  }, [router]);

  const ChatComp = useCallback(() => {
    return (
      <div className={`lg:mr-[80px] flex flex-col min-h-[80vh]`}>
        <MemoizedChat liveStreamDetail={liveStreamDetail} onLeave={handleLeave} />
      </div>
    );
  }, [liveStreamDetail, handleLeave]);

  const SendCoinsComp = () => (
    <div className="relative text-white element rounded-[98px] p-[4px]">
      <div
        className="p-[4px] pr-[10px] rounded-[96px] hidden lg:flex gap-[9px] text-white text-[10px] md:text-[13px] font500 items-center bg-[#BACFF70A] cursor-pointer relative w-fit"
      >
        <Image
          src={`/svg/Liveparte coin.svg`}
          width={24}
          height={24}
          alt="coins"
        />
        <div>
          {formatMoney(userCoinsBalance || "0", false)}{" "}
          {userCoinsBalance > 1 ? "Coins" : "Coin"}
        </div>
        <div
          className="py-[4px] px-[9px] rounded-[96px] hidden lg:flex gap-[9px] text-white text-[13px] font500 items-center shadow-1 shadow-2 shadow-3 bg-[#BACFF70A] cursor-pointer relative w-fit"
        >
          <div className="">Send</div>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`${IsDesktopMobileChat} left-0 bg-red-600 flex lg:mb-0`}>
      <div className="flex align-bottom flex-1 justify-end overflow-hidden linear-gradient">
        <div className="flex-1 items-end justify-end flex">
          {/* Custom Video Controls */}
          {!isLive && (
            <div className="z-50 pb-[27px] text-white w-full pt-8 pl-[80px] pr-[45px]">
              <div
                className="flex items-center gap-[16px] cursor-pointer"
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
              >
                {/* Progress Bar */}
                <div
                  onMouseDown={handleMouseDown} // Start dragging
                  onMouseMove={handleMouseMove} // Dragging
                  className="flex-1 bg-[#CCEDEB] h-[5px] rounded-[30px] relative"
                  ref={progressRef}
                >
                  <div
                    className="h-[5px] rounded-[30px] flex items-center"
                    style={{
                      width: `${(playedSeconds / duration) * 100}%`, // Progress width based on played time

                    }}
                  >
                    <div className="flex-1 bg-[#00A699] h-[2px] w-[2px]"></div>
                    <div className="h-[12px] w-[12px] rounded-full flex justify-center items-center bg-white">
                      <div className="h-[8px] w-[8px] bg-[#02A59A] rounded-full"></div>
                    </div>
                  </div>
                </div>
                <span className="text-[10px]">
                {formatTime(playedSeconds)}  / {formatTime(duration)}
                </span>
              </div>
              <div className="px-[16px] flex items-center gap-[32px] mt-[23px] justify-center">
                {/* Play/Pause Button */}
                <button onClick={togglePlayPause}>
                  {playerRef?.current?.player?.isPlaying  ? <VideoPauseIcon /> : <VideoPlayIcon />}
                </button>
                {/* Mute/Unmute Button */}
                <button onClick={toggleMute}>
                  {isMuted ? <VideoUnMuteIcon /> : <VideoMuteIcon />}
                </button>
                {/* Rewind Button */}
                <button onClick={handleRewind}>
                  <VideoPrevBy10secIcon />
                </button>
                {/* Fast Forward Button */}
                <button onClick={handleFastForward}>
                  <VideoNextBy10secIcon />
                </button>
              </div>
            </div>
          )}
        </div>
        {/* Chat Component */}
        <ChatComp />
      </div>
    </div>
  );
}

export default memo(ChatOnCameraAndVideoControl);
