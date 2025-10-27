import LiveStreamVideo from "@/components/modules/LiveStream/submodules/livestreamVideo copy";
import React, { useRef, useState } from "react";
// import LiveStreamHeader from "../liveStreamHeader";
import HeaderMd from "./headerMd";
import LiveStreamHeader from "./liveStreamHeaderComp";
import { MainContainer } from "@/utils/styleReuse";
import MyModal from "@/components/Ui/Modal";
import GiftTicket from "@/components/modules/EventDetails/modal/GiftTicket";
import ShareEvent from "@/components/modules/EventDetails/modal/ShareEvent";

export default function LiveStreamHeaderIndexComp({
  // handleOpenModal,
  ProfileDropdown,
  // setIsOpen,
  // isOpen,
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
  const modalRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const handleCloseModal = () => {
    setIsOpen(null);
    // forceUpdate();
  };

  const handleOpenModal = (modalName) => {
    setIsOpen(modalName);
    // modalRef.current = modalName;
    // forceUpdate();
  };

  const ModalList = [
    {
      name: "giftTicket",
      component: (
        <GiftTicket Data={liveStreamDetail} closeModal={handleCloseModal} />
      ),
    },
    {
      name: "shareEvent",
      component: (
        <ShareEvent Data={liveStreamDetail} closeModal={handleCloseModal} />
      ),
    },
    {
      name: "shareEvent",
      component: (
        <ShareEvent Data={liveStreamDetail} closeModal={handleCloseModal} />
      ),
    },
  ];

  return (
    <div
      className={`${MainContainer}  absolute left-0 right-0 lg:top-2 bg-[#060809]  `}
    >
      {isOpen && (
        <MyModal
          bodyComponent={
            ModalList?.find((item, index) => item?.name === isOpen)?.component
          }
          containerStyle={`bg-[#1B1C20] border-[1px] border-[#343F4B] rounded-[16px] !w-full sm:!w-[486px]`}
          isOpen={isOpen ? true : false}
          closeModal={handleCloseModal}
        />
      )}

      <div className="hidden lg:block">
        <LiveStreamHeader
          liveStreamDetail={liveStreamDetail}
          handleOpenModal={handleOpenModal}
          setActiveConnection={setActiveConnection}
        />
      </div>
      <div className="block lg:hidden ">
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
