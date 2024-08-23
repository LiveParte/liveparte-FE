import React, { useState } from "react";
import GiftingCoins from "../giftingCoins";
import ChatBody from "../Chat/chatbody/chatBody";
import Image from "next/image";
import { SendCoinsComp } from "../chatsubmodules/sendCoins";
import ButtonComp from "@/components/Ui/button";

export default function FullScreenChatAction({
  setShowComment,
  unlockOrientation,
  orientationLocked,
}) {
  const [chatMessages, setChatMessages] = useState([
    {
      name: "Bola",
      message: "Please Wait for me to join",
    },
    {
      name: "Bola",
      message: "Please Wait for me to join",
    },
    {
      name: "Bola",
      message: "Please Wait for me to join",
    },
    {
      name: "Bola",
      message: "Please Wait for me to join",
    },
    {
      name: "Bola",
      message: "Please Wait for me to join",
    },
    {
      name: "Bola",
      message: "Please Wait for me to join",
    },
    {
      name: "Bola",
      message: "Please Wait for me to join",
    },
    {
      name: "Bola",
      message: "Please Wait for me to join",
    },
    {
      name: "Bola",
      message: "Please Wait for me to join",
    },
    {
      name: "Bola",
      message: "Please Wait for me to join",
    },
    {
      name: "Bola",
      message: "Please Wait for me to join",
    },
    {
      name: "Bola",
      message: "Please Wait for me to join",
    },
    {
      name: "Bola",
      message: "Please Wait for me to join",
    },
    {
      name: "Bola",
      message: "Please Wait for me to join",
    },
    {
      name: "Bola",
      message: "Please Wait for me to join",
    },
    {
      name: "Bola",
      message: "Please Wait for me to join",
    },
  ]);
  const [hideChat, setHideChat] = useState(false);
  return (
    <div className="lg:hidden left-0 right-0 bottom-[0px] pb-[10px] px-[56px] z-50 text-white absolute    bg-gradient-to-t from-black  ">
              {/* <div className="absolute z-30 bottom-0 left-0 right-0 lg:h-[40vh] md:h-[20vh]   bg-contain xl:bg-cover !bg-no-repeat bg-gradient-to-b from-black"></div> */}

      <div className="  grid grid-cols-3 relative">
        <div className="flex w-full  flex-1 items-center gap-[30px] ">
          <SendCoinsComp
            userCoinsBalance={200}
            isChange={true}
            setPayFlow={() => {
              unlockOrientation();
            }}
          />
          <div className="relative flex text-white element rounded-[96px]">
            <div
              className="px-[17px]  h-[32px] button-with-shadow bg-[#BACFF70A]  rounded-[96px] py-[10px] flex gap-[9px] text-white min-w-max text-[10px] lg:text-[11px] font500 items-center  cursor-pointer relative w-fit"
              onClick={ ()=>unlockOrientation()}
              // onClick={() => setPayFlow("purchasePartyCoins")}
            >
              <div >Add Coins</div>
            </div>
          </div>
        </div>
        <div></div>
        <div className="flex flex-col items-end justify-center  lg:px-[0px]   h-full lg:h-full  w-full lg:w-[356px] relative  rounded-sm">
          {!hideChat && (
            <ButtonComp
              onClick={() => setHideChat(true)}
              className={
                "py-[10px] px-[26px] max-w-max rounded-[98px] !h-[32px]  font500 text-[10px] button-with-shadow !bg-[#BACFF70A]"
              }
              btnText={"Show comments"}
            />
          )}

          <ChatBody
            isOrientation={orientationLocked}
            showComment={hideChat}
            setShowComment={setHideChat}
            data={chatMessages}
          />
        </div>
      </div>
    </div>
  );
}
