import React from "react";
import Image from "next/image";
import ButtonComp from "@/components/Ui/button";
import LiveStreamHeader from "./LiveStreamHeader";
export default function PurchasePaartyCoins({
  onClose,
  onBack,
  containerStyle,
  path,
}) {
  return (
    <div
      className={`px-[34px] pt-[16px] bg-[#060809] w-full  ${containerStyle}`}
    >
      <LiveStreamHeader
        path={path}
        title={`Purchase Parte Coins`}
        onClose={onClose}
        onBack={onBack}
      />
      <div className=" relative flex overflow-hidden  h-[35px] mb-[16px] rounded-[8px] px-[12px] border-[#343F4B] border-[1px] bg-[#27292E]">
        <Image src={`/svg/coin1.svg`} alt="coins" width={16} height={16} />

        <input
          className="flex-1 bg-transparent outline-none mr-20  text-white border-none"
          type="number"
          style={{ boxShadow: "none" }}
        />
        <div className="flex items-center  bg-[#343F4B] h-full absolute right-0 pr-[44px] pl-[12px]">
          <div className="text-[#FFFFFF] text-[12px]">₦5000</div>
        </div>
      </div>
      <div className="pb-[26px]">
        <ButtonComp
          btnText={`Purchase Coins`}
          className={`h-[30px] text-[#060809] w-full text-[13px] py-[5px]`}
        />
      </div>
    </div>
  );
}
