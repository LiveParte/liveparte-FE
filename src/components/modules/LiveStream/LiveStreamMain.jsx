import React, { useRef, useState } from "react";
import LiveStreamVideo from "./submodules/livestreamVideo";
import Chat from "./submodules/chat";
import { useRouter } from "next/router";
import { handleCloseModalAll, myShowLink } from "@/utils/reusableComponent";
import { useDispatch } from "react-redux";
import { logout } from "@/store/User";
import LiveStreamHeaderIndexComp from "@/components/Common/Header/LiveStreamHeader";
import CustomDropDown from "@/components/Common/CustomDropDown";
import Link from "next/link";
import { IsDesktopMobileChat, IsMobileChat, IsMobileLiveStream } from "./style";
// import LiveStreamHeader from './submodules/LiveStreamHeader';

export default function LiveStream({
  liveStreamDetail,
  isLive = false,
  userProfileData,
  handleOpenModal,
  isLoading,
}) {
  const [fullScreenModal, setFullScreenModal] = useState(false);
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
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
    // localStorage.removeItem(userDetailStorageName);
    // localStorage.removeItem(accessTokenStorageName);

    if (router?.pathname === myShowLink || router?.pathname === "/setting") {
      // window.location.reload();
      return router.push("/");
    }
  }
  function ShareAndGiftDropdown() {
    return (
      <CustomDropDown
        className={`dropdownIV`}
        dropdownRef={ShareAndGiftDropdownRef}
        setIsOpen={setIsOpenII}
      >
        <div className=" w-[60vw] bg-[#1B1C20] border-[1px] text-left border-[#343F4B] font500 text-[13px] md:text-[14px] text-white  rounded-[16px] md:w-[218px]    px-[24px] py-[15px]">
          <div
            onClick={() => handleOpenModal(`giftTicket`)}
            className="py-[6px] mb-[13px] cursor-pointer no-underline text-white "
          >
            Gift Ticket
          </div>
          <div
            onClick={() => handleOpenModal(`shareEvent`)}
            className="py-[6px] cursor-pointer"
          >
            Share Event
          </div>
          {/* <div className="py-[12px]">Add to Calendar</div> */}
        </div>
      </CustomDropDown>
    );
  }

  function ProfileDropdown() {
    return (
      <CustomDropDown dropdownRef={dropdownRef} setIsOpen={setIsOpen}>
        <div className=" bg-[#1B1C20] border-[1px] text-left border-[#343F4B] font500 text-[13px] md:text-[14px] text-white  rounded-[16px] md:w-[230px]    px-[40px] py-[24px]">
          <Link
            href={"/setting"}
            className="py-[12px] cursor-pointer no-underline text-white "
          >
            Settings
          </Link>
          <div onClick={handleLogOut} className="py-[12px] cursor-pointer">
            Log out
          </div>
          {/* <div className="py-[12px]">Add to Calendar</div> */}
        </div>
      </CustomDropDown>
    );
  }
 
  return (
    <main
      ref={dropdownRef}
      className={` flex flex-col   overflow-hidden flex-1 `}
    >
      <div className="flex-1 flex flex-col relative">
        <div className={`  flex-1 flex flex-col bg-black`}>
          <div className="">
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
          </div>
          <div className="relative  flex-1 flex flex-col">
            <div className=" absolute z-30 top-0 left-0 right-0 lg:h-[40vh] md:h-[20vh]   bg-contain xl:bg-cover !bg-no-repeat bg-gradient-to-b from-black"></div>

            <div className={IsMobileLiveStream}>
              <LiveStreamVideo
                setActiveConnection={setActiveConnection}
                activeConnection={activeConnection}
                isLive={isLive}
                liveStreamDetail={liveStreamDetail}
                isLoading={isLoading}
                userProfileData={userProfileData}
              />
            </div>

            <div className={`${IsMobileChat}`}>
              <Chat
                liveStreamDetail={liveStreamDetail}
                userProfileData={userProfileData}
                onLeave={() => {
                  // setActiveConnection(false);
                  router.push(myShowLink);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
