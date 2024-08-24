import React, { memo, useRef, useState, useMemo } from "react";
import LiveStreamVideo from "./submodules/livestreamVideo";
import Chat from "./submodules/chat";
import { useRouter } from "next/router";
import { handleCloseModalAll, myShowLink } from "@/utils/reusableComponent";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectOrientationLocked } from "@/store/User";
import LiveStreamHeaderIndexComp from "@/components/Common/Header/LiveStreamHeader";
import CustomDropDown from "@/components/Common/CustomDropDown";
import Link from "next/link";
import ScreenOrientationLayout from "@/components/Layout/ScreenRotateLayout/screenLayout";
import { isMobile } from "react-device-detect";
import { selectSize } from "@/store/settings";

function LiveStream({
  liveStreamDetail,
  isLive = false,
  userProfileData,
  handleOpenModal,
  isLoading,
}) {
  const [fullScreenModal, setFullScreenModal] = useState(false);
  const router = useRouter();
  const mobileSize = useSelector(selectSize);
  const [isOpen, setIsOpen] = useState(false);
  const orientationLocked = useSelector(selectOrientationLocked);
  const IsMobileLiveStream = `relative lg:static flex  flex-1 flex-col bg-[#27292E] pt-[0px] lg:pt-[0px] lg:px-[0px] lg:rounded-[16px] lg:h-[100vh]  ${isMobile === "fullscreen" ? 'h-[100dvh]' : 'h-[40dvh]'} `;
  const IsMobileChat = `lg:hidden flex flex-col lg:rounded-[26px] bg-[#222428] h-[60vh] max-h-[60dvh] lg:mb-3 `;
  
  const [isOpenII, setIsOpenII] = useState(false);
  const dispatch = useDispatch();
  const [activeConnection, setActiveConnection] = useState(true);
  const dropdownRef = useRef(null);
  const ShareAndGiftDropdownRef = useRef(null);

  function handleLogOut() {
    dispatch(userApi.util.resetApiState());
    dispatch(eventApi.util.resetApiState());
    dispatch(transactionApi.util.resetApiState());
    dispatch(logout());

    if (router?.pathname === myShowLink || router?.pathname === "/setting") {
      return router.push("/");
    }
  }

  function ShareAndGiftDropdown() {
    return (
      <div className="w-[218px] lg bg-[#1B1C20] border-[1px] text-left border-[#343F4B] font500 text-[13px] md:text-[14px] text-white rounded-[16px] md:w-[218px] px-[24px] py-[15px]">
        <div
          onClick={() => handleOpenModal(`giftTicket`)}
          className="py-[6px] mb-[13px] cursor-pointer no-underline text-white"
        >
          Gift Ticket
        </div>
        <div
          onClick={() => handleOpenModal(`shareEvent`)}
          className="py-[6px] cursor-pointer"
        >
          Share Event
        </div>
      </div>
    );
  }

  function ProfileDropdown() {
    return (
      <CustomDropDown dropdownRef={dropdownRef} setIsOpen={setIsOpen}>
        <div className="bg-[#1B1C20] border-[1px] text-left border-[#343F4B] font500 text-[13px] md:text-[14px] text-white rounded-[16px] md:w-[230px] px-[40px] py-[24px]">
          <Link href={"/setting"} className="py-[12px] cursor-pointer no-underline text-white">
            Settings
          </Link>
          <div onClick={handleLogOut} className="py-[12px] cursor-pointer">
            Log out
          </div>
        </div>
      </CustomDropDown>
    );
  }

  // console.log(liveStreamDetail,'liveStreamDetailliveStreamDetail')

  const Container = useMemo(() => {
    return function Container({ lockOrientation, unlockOrientation, orientation }) {
      return (
        <div className="relative flex-1 flex flex-col h-full w-full">
          <div className="absolute z-30 top-0 left-0 right-0 lg:h-[40vh] md:h-[20vh] bg-contain xl:bg-cover !bg-no-repeat bg-gradient-to-b from-black"></div>
          <div className={`${IsMobileLiveStream} `}>
            <LiveStreamVideo
              setActiveConnection={setActiveConnection}
              activeConnection={activeConnection}
              isLive={isLive}
              liveStreamDetail={liveStreamDetail}
              isLoading={isLoading}
              userProfileData={userProfileData}
              lockOrientation={lockOrientation}
              unlockOrientation={unlockOrientation}
              orientationLocked={orientation}
              ShareAndGiftDropdown={ShareAndGiftDropdown}
            />
          </div>
          {orientation && (
            <div className={IsMobileChat}>
              <Chat
                liveStreamDetail={liveStreamDetail}
                userProfileData={userProfileData}
                onLeave={() => router.back()}
              />
            </div>
          )}
        </div>
      );
    };
  }, [IsMobileLiveStream, IsMobileChat, activeConnection, isLive, liveStreamDetail, isLoading, userProfileData]);

  return (
    <main ref={dropdownRef} className="flex flex-col overflow-hidden flex-1">
      <div className="flex-1 flex flex-col relative">
        <div className="flex-1 flex flex-col bg-black">
          <LiveStreamHeaderIndexComp
            ProfileDropdown={ProfileDropdown}
            handleOpenModal={handleOpenModal}
            setIsOpen={setIsOpen}
            isOpen={isOpen}
            setActiveConnection={setActiveConnection}
            ShareAndGiftDropdown={ShareAndGiftDropdown}
            handleOpenModalAll={handleCloseModalAll}
            isOpenII={isOpenII}
            setFullScreenModal={setFullScreenModal}
            setIsOpenII={setIsOpenII}
            isLive={isLive}
            isLoading={isLoading}
            liveStreamDetail={liveStreamDetail}
          />
          <ScreenOrientationLayout>
            <Container />
          </ScreenOrientationLayout>
        </div>
      </div>
    </main>
  );
}

export default memo(LiveStream);
