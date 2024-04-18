import ButtonComp from "@/components/Ui/button";
import React from "react";
import Image from "next/image";
import { CloseIcon } from "../../../../../public/svg";
import LiveStreamHeader from "./LiveStreamHeader";
export default function GiftingCoins({
    onNext,
    onClose
}) {
  return (
    <div className="px-[34px] py-[16px] bg-[#060809] w-full">
      <LiveStreamHeader title={`Gift Parte Coins`} onClose={onClose} />

      <div className="border-[#343F4B] border-[1px] bg-[#27292E]  flex items-center px-[12px] rounded-[8px] py-[7px] gap-[5px] mb-[16px] !h-[35px]">
        <Image src={`/svg/coins.svg`} width={16} height={16} alt="coins" className="w-[16px] g-[16px]" />

        <input 
        style={{boxShadow:'none'}}
        className=" w-full bg-transparent border-0 outline-none text-[18px] border-none  text-white" type="number" />
      </div>

      <div className="mb-[16px]">
        <ButtonComp
          btnText={`Send Coins`}
          className={`h-[30px] text-[#060809] w-full text-[13px] py-[5px]`}
          onClick={onClose}
        />
      </div>

      <div className="text-center md:hidden text-[#00A699] text-[13px] underline mb-[10px] cursor-pointer" onClick={onNext}>
        Purchase Parte Coins
      </div>
    </div>
  );
}
