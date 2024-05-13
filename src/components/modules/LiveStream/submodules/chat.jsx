import ButtonComp from "@/components/Ui/button";
import React, { useState } from "react";
import Image from "next/image";
import GiftingCoins from "./giftingCoins";
import PurchasePaartyCoins from "./PurchasePaartyCoins";
import {
  CommentIcon,
  LiveParteCoins,
  LiveParteCoinsII,
  SendButton,
} from "../../../../../public/svg";
import { formatMoney } from "@/utils/formatMoney";
export default function Chat({ onLeave, liveStreamDetail, userProfileData }) {
  // console.log(userProfileData, "userProfileData");
  const [payFlow, setPayFlow] = useState();
  const paymentFlow = [
    {
      name: "giftCoins",
      component: (
        <GiftingCoins
          eventId={liveStreamDetail}
          onNext={() => setPayFlow("purchasePartyCoins")}
          onClose={() => setPayFlow()}
        />
      ),
    },
    {
      name: "purchasePartyCoins",
      component: (
        <PurchasePaartyCoins
          onBack={() => setPayFlow("giftCoins")}
          onClose={() => setPayFlow()}
          containerStyle={`!w-full`}
        />
      ),
    },
  ];

  const ChatList = () => {
    return (
      <div className="pb-[16px] flex items-center gap-[8px] w-[90%] lg:w-full">
        <Image
          src={`/webp/profile.png`}
          width={30}
          height={30}
          className="object-cover h-[30px] w-[30px]"
          alt="profile-image-user"
        />
        <div>
          <div className="text-[#B4BECB] text-[11px] font500 leading-[14px] font500">
            Anitajoseph
          </div>
          <div className="text-[#FFFFFF] text-[10px] leading-[14px] -tracking-[0.12px]  font400">
            This performance is fire, Thank you livepaarty for making this
            possible
          </div>
        </div>
      </div>
    );
  };

  const GiftCoin = () => {
    return (
      <div className=" absolute dropdownIII transform translate-x-1 -translate-y-[60px] w-full  lg:-translate-y-[40px] z-50 bg-black   rounded-[16px] overflow-hidden">
        {paymentFlow?.find((item) => item?.name === payFlow)?.component}
      </div>
    );
  };
  return (
    <div className=" flex flex-col flex-1">
      <div className="flex justify-between items-center px-[15px] border-b-[1px] border-b-[#343F4B]  pb-[16px] mb-2">
        <div className="py-[7px]  lg:pt-[16px] px-[16px] flex-1 ">
          <div className="lg:hidden  line-clamp-1 text-[15px] text-white font-1 font-bold uppercase mb-[8px] leading-[20px]">
            {liveStreamDetail?.name}
          </div>
          <div className=" font-1 text-[13px] lg:text-[22px] text-white uppercase font-bold  ">
            Chat
          </div>
        </div>

        <ButtonComp
          onClick={onLeave && onLeave}
          className={`!h-[30px] text-[13px] !bg-[#BAD6F70F] text-white px-[24px] rounded-full font500 border-[1px] border-[#262C32] leading-none items-center py-[10px] block lg:hidden`}
          btnText={"Leave"}
        />
      </div>
      <div className=" h-full flex flex-col flex-1">
        <div className=" px-[16px] flex-1 flex-col  flex  items-end relative">
          <div className="flex-grow-1 flex flex-col justify-center items-center h-full w-full lg:mt-10">
            <div className="mb-[17px]">
              <CommentIcon />
            </div>
            <div className=" text-[13px] text-[#788AA1] px-[33px] text-center">
              There are no comments yet, be the first to comment
            </div>
          </div>
          <div className="flex-1 lg:w-full overflow-y-scroll    font400  customScrollHorizontal relative">
            {/* <ChatList />
          <ChatList />
          <ChatList />
          <ChatList />
          <ChatList />

          <ChatList />
          <ChatList />
          <ChatList />
          <ChatList />
          <ChatList />
          <ChatList /> */}
          </div>
          <div>
            <div className="lg:hidden  flex flex-col items-end gap-[16px] pb-[16px] absolute right-[16px] bottom-[2px]">
              <Image
                src={`/svg/reaction1.svg`}
                width={32}
                height={32}
                alt="reaction1  "
              />
              <Image
                src={`/svg/reaction2.svg`}
                width={32}
                height={32}
                alt="reaction2  "
              />
              <Image
                src={`/svg/reaction3.svg`}
                width={32}
                height={32}
                alt="reaction3  "
              />
            </div>
          </div>
        </div>
        <div className="px-[16px]  pt-[18px] border-t-[1px] border-t-[#343F4B]">
          <div className="flex items-center gap-[10px] lg:mb-[13px]">
            <input
              className="h-[40px] lg:h-[35px] w-[23px] border-[1px] border-[#343F4B] rounded-[8px] bg-transparent flex-1 placeholder:text-[#495969] placeholder:text-[13px] px-[17px] text-white outline-none "
              placeholder="Comment here..."
            />
            <div
              onClick={() => setPayFlow("giftCoins")}
              className=" lg:hidden text-white flex flex-col  items-center"
            >
              {/* <LiveParteCoins size={24} /> */}
              <Image
                  src={`/svg/Liveparte coin.svg`}
                  width={24}
                  height={24}
                  alt="coins"
                />
              <div className="text-[10px]">
              {/* <LiveParteCoins size={24} /> */}
                {formatMoney(userProfileData?.totalCoin || "0", false)}
              </div>
            </div>
            <button
              className={`!h-[35px] rounded-[8px] !bg-[#FA4354] !w-[43px] hidden lg:flex justify-center items-center`}
            >
              <SendButton />
            </button>
          </div>
          <div className="flex justify-between items-center mb-[16px] relative">
            {payFlow&&<GiftCoin />}
            <div className="relative text-white">
              <div
                className=" p-[4px] pr-[10px] rounded-[96px] hidden lg:flex gap-[9px] text-white text-[10px] md:text-[11px] font500 items-center  shadow-1 shadow-2 shadow-3 bg-[#BACFF70A] cursor-pointer relative w-fit"
                onClick={() => setPayFlow("giftCoins")}
              >
               
                 <LiveParteCoins/>
                <div>
                  {formatMoney(userProfileData?.totalCoin || "0", false)}{" "}
                  {userProfileData?.totalCoin > 1 ? "Coins" : "Coin"}
                </div>
                <div
                  className=" py-[4px] px-[9px] rounded-[96px] hidden lg:flex gap-[9px] text-white text-[10px] font500 items-center  shadow-1 shadow-2 shadow-3 bg-[#BACFF70A] cursor-pointer relative w-fit"
                  onClick={() => setPayFlow("giftCoins")}
                >
                  <div className=""> Send</div>
                </div>
              </div>
            </div>
            <div className="relative text-white">
              <div
                className=" px-[17px] h-[32px]  rounded-[96px] hidden lg:flex gap-[9px] text-white text-[10px] lg:text-[11px] font500 items-center  shadow-1 shadow-2 shadow-3 bg-[#BACFF70A] cursor-pointer relative w-fit"
                onClick={() => setPayFlow("purchasePartyCoins")}
              >
                <div>Add Coins</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
