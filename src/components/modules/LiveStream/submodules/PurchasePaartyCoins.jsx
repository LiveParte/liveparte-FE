import React, { useState } from "react";
import Image from "next/image";
import ButtonComp from "@/components/Ui/button";
import LiveStreamHeader from "./LiveStreamHeader";
import { useSelector } from "react-redux";
import { selectCoins, selectCurrentUserData } from "@/store/User";
import { isArray } from "@/utils/helper";
import { formatMoney } from "@/utils/formatMoney";
export default function PurchasePaartyCoins({
  onClose,
  onBack,
  containerStyle,
  path,
}) {
  const [coinsNeeded,setCoinsNeeded]=useState(0)
  const userInfo = useSelector(selectCurrentUserData);
  const coinsList =useSelector(selectCoins);
  const FindTheCountyCoins=isArray(coinsList)&&coinsList?.find((item)=>item?.country === userInfo?.countryInfo)

  // console.log(coinsList,userInfo,FindTheCountyCoins,'Makes a purchase')
  function getCostPerCoin(totalPrice, amountOfCoins) {
    return totalPrice / amountOfCoins;
}
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
          className="flex-1 bg-transparent outline-none mr-20  text-white border-none ml-2"
          type="number"
          style={{ boxShadow: "none" }}
          onChange={(e)=>setCoinsNeeded(e.target.value)}
        />
        <div className="flex items-center  bg-[#343F4B] h-full absolute right-0 pr-[44px] pl-[12px]">
          <div className="text-[#FFFFFF] text-[12px]">{formatMoney(getCostPerCoin(FindTheCountyCoins?.price, FindTheCountyCoins?.amount)*coinsNeeded||'0',false)}</div>
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
