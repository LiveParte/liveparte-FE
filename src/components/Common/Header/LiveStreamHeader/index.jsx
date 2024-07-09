import LiveStreamVideo from "@/components/modules/LiveStream/submodules/livestreamVideo copy";
import React from "react";
// import LiveStreamHeader from "../liveStreamHeader";
import HeaderMd from "./headerMd";
import LiveStreamHeader from "./liveStreamHeaderComp";
import { MainContainer } from "@/utils/styleReuse";

export default function LiveStreamHeaderIndexComp({
  handleOpenModal,
  ProfileDropdown,
  setIsOpen,
  isOpen,
  setActiveConnection,
  isLoading = false,
  isLive = false,
  setIsOpenII,
  isOpenII,
  ShareAndGiftDropdown,
  handleOpenModalAll,
  setFullScreenModal,
  liveStreamDetail,
}) {
  return (
    <div
      className={`${MainContainer}  absolute left-0 right-0 lg:top-6 bg-black`}
    >
      <div className="hidden lg:block">
        <LiveStreamHeader
          liveStreamDetail={liveStreamDetail}
          handleOpenModal={handleOpenModal}
          setActiveConnection={setActiveConnection}
        />
      </div>
      <div className="block lg:hidden">
        <HeaderMd
          ProfileDropdown={ProfileDropdown}
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          isLoading={isLoading}
          isLive={isLive}
          setIsOpenII={setIsOpenII}
          isOpenII={isOpenII}
          ShareAndGiftDropdown={ShareAndGiftDropdown}
          handleOpenModalAll={ShareAndGiftDropdown}
          setFullScreenModal={ShareAndGiftDropdown}
        />
      </div>
    </div>
  );
}
