import React, { memo, useState } from "react";
import {
  IsDesktopMobileChat,
  IsDesktopMobileChatChangeName,
} from "../../style";
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
import DropDown from "@/components/Ui/DropDown";
import GiftingCoins from "../giftingCoins";
import { useSelector } from "react-redux";
import { selectCoins } from "@/store/User";
import PurchasePaartyCoins from "../PurchasePaartyCoins";
import { useRouter } from "next/router";

function ChatOnCameraAndVideoControl({
  liveStreamDetail,
  userProfileData,
  calculateProgressPercentage,
  handleMouseDown,
  handleMouseMove,
  handleMouseUp,
  formatTime,
  currentTimeRef,
  durationRef,
  isPlaying,
  isMuted,
  isLive,
  togglePlayPause,
  rewind,
  toggleMute,
  fastForward,
  currentTime,
  duration,
  // userCoinsBalance=0
}) {
  const router = useRouter();
  const userCoinsBalance = useSelector(selectCoins);
  const [isOpenGiftCoins, setIsOpenGiftCoins] = useState(false);
  const [isOpenBuyCoins, setIsOpenBuyCoins] = useState(false);

  // console.log(isOpenGiftCoins,isOpenBuyCoins, "userCoinsBalance");

  //  bg-gradient-to-l from-[#0000000f] to-[#0000000a]

  const SendCoinsComp = () => (
    <div className="relative text-white element rounded-[98px] p-[4px]">
      <div
        className="p-[4px] pr-[10px] rounded-[96px] hidden lg:flex gap-[9px] text-white text-[10px] md:text-[13px] font500 items-center bg-[#BACFF70A] cursor-pointer relative w-fit"
        // onClick={() => setPayFlow("giftCoins")}
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
          // onClick={() => setPayFlow("giftCoins")}
        >
          <div className=""> Send</div>
        </div>
      </div>
    </div>
  );

  return (
    <div
      className={`${IsDesktopMobileChat} left-0 bg-red-600   flex   lg:mb-0  `}
    >
      <div className="flex   align-bottom flex-1 justify-end overflow-hidden linear-gradient">
        <div className="flex-1 items-end justify-end flex ">
          {isLive && (
            <div className="z-50  pb-5 text-white w-full  pt-8   pl-[80px] pr-[45px]">
              <div
                className=" flex items-center gap-[16px] cursor-pointer"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                // Ensures dragging stops when the mouse leaves the progress bar
              >
                <div className="flex-1 bg-[#CCEDEB] h-[5px] rounded-[30px] relative">
                  <div
                    className=" h-[5px] rounded-[30px] flex items-center"
                    style={{
                      width: `${
                        calculateProgressPercentage &&
                        calculateProgressPercentage
                      }%`,
                    }}
                  >
                    <div className="flex-1 bg-[#00A699] h-[2px]"></div>
                    <div className="h-[12px] w-[12px] rounded-full flex justify-center items-center bg-white">
                      <div className="h-[8px] w-[8px] bg-[#02A59A] rounded-full"></div>
                    </div>
                  </div>
                </div>
                <span className="text-[10px]">
                  {currentTime}/ {duration}
                </span>
              </div>
              <div className="px-[16px] flex items-center gap-[32px] mt-[23px] justify-center">
                <button onClick={togglePlayPause} className="">
                  {isPlaying ? <VideoPauseIcon /> : <VideoPlayIcon />}
                </button>
                <button onClick={toggleMute} className="">
                  {isMuted ? <VideoUnMuteIcon /> : <VideoMuteIcon />}
                </button>
                <button onClick={rewind} className="">
                  <VideoPrevBy10secIcon />
                </button>
                <button onClick={fastForward} className="">
                  <VideoNextBy10secIcon />
                </button>
              </div>
            </div>
          )}
        </div>
        <div className={`lg:mr-[80px] flex flex-col `}>
          <Chat
            liveStreamDetail={liveStreamDetail}
            userProfileData={userProfileData}
            onLeave={() => {
              // router.back()
              // setActiveConnection(false);
              // router.push(myShowLink);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default memo(ChatOnCameraAndVideoControl);
