import React from "react";
import Image from "next/image";
import ButtonComp from "@/components/Ui/button";
import LiveStreamHeader from "./LiveStreamHeader";
export default function PurchasePaartyCoins({
    onClose,
    onBack
}) {
  return (
    <div className="px-[34px] pt-[16px] bg-[#060809] w-full">
      <LiveStreamHeader title={`Purchase Paarty Coins`} onClose={onClose} onBack={onBack} />
      <div className=" relative flex overflow-hidden  h-[35px] mb-[16px] rounded-[8px] px-[12px] border-[#343F4B] border-[1px]">
        <input className="flex-1 bg-transparent border-none outline-none mr-20 " />
        <div className="flex items-center  bg-[#343F4B] h-full absolute right-0 pr-[12px] pl-[8px]">
          <Image src={`/svg/coins.svg`} width={16} height={16} />
          <div className="text-[#FFFFFF] text-[12px]">1200000</div>
        </div>
      </div>
      <div className="mb-[54px]">
        <ButtonComp
          btnText={`Purchase Coins`}
          className={`h-[30px] text-[#060809] w-full text-[13px] py-[5px]`}
        />
      </div>
    </div>
  );
}
