import React from "react";
import Image from "next/image";
import ButtonComp from "@/components/Ui/button";
import LiveStreamHeader from "./LiveStreamHeader";
export default function PurchasePaartyCoins({
    onClose,
    onBack,
    containerStyle,
    path
}) {
  return (
    <div className={`px-[34px] pt-[16px] bg-[#060809] w-full  ${containerStyle}`}>
      <LiveStreamHeader path={path} title={`Purchase Parte Coins`} onClose={onClose} onBack={onBack} />
      <div className=" relative flex overflow-hidden  h-[35px] mb-[16px] rounded-[8px] px-[12px] border-[#343F4B] border-[1px]">
        <input className="flex-1 bg-transparent outline-none mr-20  text-white border-none" 
        type="number"
        style={{boxShadow:'none'}}
        />
        <div className="flex items-center  bg-[#343F4B] h-full absolute right-0 pr-[12px] pl-[8px]">
          <Image src={`/svg/coin1.svg`} alt="coins" width={16} height={16} />
          <div className="text-[#FFFFFF] text-[12px]">12000</div>
        </div>
      </div>
      <div className="pb-[54px]">
        <ButtonComp
          btnText={`Purchase Coins`}
          className={`h-[30px] text-[#060809] w-full text-[13px] py-[5px]`}
        />
      </div>
    </div>
  );
}
