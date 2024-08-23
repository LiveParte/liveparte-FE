import React, { useMemo, useState } from "react";
import Image from "next/image";
import ButtonComp from "@/components/Ui/button";
import LiveStreamHeader from "./LiveStreamHeader";
import { useDispatch, useSelector } from "react-redux";
import { selectCoins, selectCurrentUserData, setCoins } from "@/store/User";
import { isArray } from "@/utils/helper";
import { formatMoney } from "@/utils/formatMoney";
import PayStack from "@/components/PayStack/payStack";
import { usePurchaseCoinsMutation } from "@/store/Transaction/transactionApi";
import { SuccessNotification } from "@/utils/reusableComponent";
export default function PurchasePaartyCoins({
  onClose,
  onBack,
  containerStyle,
  path,
}) {
  const [purchaseCoins, { isLoading}] = usePurchaseCoinsMutation();
  const [coinsNeeded, setCoinsNeeded] = useState(0);
  const dispatch = useDispatch();
  const userInfo = useSelector(selectCurrentUserData)||{};
  const coinsList = useSelector(selectCoins);
  const FindTheCountyCoins =
    isArray(coinsList) &&
    coinsList?.find((item) => item?.country === userInfo?.countryInfo);
  let coinsAmount = userInfo?.coin?.amount || FindTheCountyCoins?.amount;
  let coinsPrice = userInfo?.coin?.price || FindTheCountyCoins?.price;

  function getCostPerCoin(totalPrice, amountOfCoins) {
    return totalPrice / amountOfCoins;
  }

  const totalCost = formatMoney(
    getCostPerCoin(coinsPrice, coinsAmount) * coinsNeeded,
    false
  );

  async function handlePurchaseCoins() {
    const coinsToPrice = getCostPerCoin(coinsPrice, coinsAmount) * coinsNeeded;
    const payload = {
      userId: userInfo?._id,
      amountPaid: coinsToPrice,
    };

    const responses = await purchaseCoins(payload);
    if (responses?.data?.message === "You successfully purchased Liveparte coins") {
      dispatch(setCoins(coinsList+coinsNeeded))
      onClose&&onClose();
      return SuccessNotification({ message: responses.data.message });
    }
  }

  const coinSelectionItems = useMemo(() => {
    return [10, 30, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500].map(
      (item, index) => (
        <div
          key={index}
          onClick={() => {
            // console.log('coinSelectionItems', item);
            setCoinsNeeded(item);
          
          }}
          className={`flex justify-center items-center gap-[2px] bg-[#343F4B] px-[14px] py-[11px] text-white rounded-[4px] cursor-pointer ${
            coinsNeeded === item && "border-[#FA4354]  border-[1px]border-[#FA4354]  border-[1px]"
          } `}
        >
          <div className="w-[16px] h-[16px]">
            <Image
              src={`/svg/Liveparte coin.svg`}
              width={24}
              height={24}
              alt="coins"
            />
          </div>
          <div className="text-[13px]">{item}</div>
        </div>
      )
    );
  }, [coinsNeeded]); 

  // console.log(coinsPrice,coinsAmount,coinsNeeded,'coinsNeeded')

  return (
    <div
      className={`px-[16px] pt-[16px] bg-[#060809] w-[200px] lg:w-max    max-w-max ${containerStyle} `}
    >
      <LiveStreamHeader
        path={path}
        title={`Purchase Parte Coins`}
        onClose={onClose}
        onBack={onBack}
      />
    <div className="grid grid-cols-4 gap-[8px] mb-4">
    {coinSelectionItems}
    </div>
      {/* */}
      <div className="pb-[26px]">
        <PayStack
          amount={getCostPerCoin(coinsPrice, coinsAmount) * coinsNeeded}
          type="Coins Purchase"
          customFunction={handlePurchaseCoins}
          isDisabled={isLoading || !coinsNeeded}
          proceed={coinsNeeded ? true : false}
        >
          <ButtonComp
            btnText={`Purchase Coins ${totalCost ? "₦" : ""} ${
              totalCost ? totalCost : ""
            }`}
            className={`h-[39px] text-[#060809] w-full text-[13px] py-[5px]`}
            isLoading={isLoading}
            isDisabled={!coinsNeeded}
          />
          {/* Purchase Coins ₦5,000 */}
        </PayStack>
      </div>
    </div>
  );
}

{
  /* <div className=" relative flex overflow-hidden  h-[35px] mb-[16px] rounded-[8px] px-[12px] border-[#343F4B] border-[1px] bg-[#27292E]">
        <Image src={`/svg/coin1.svg`} alt="coins" width={16} height={16} />

        <input
          className="flex-1 bg-transparent outline-none mr-20  text-white border-none ml-2 text-[14px]"
          value={coinsNeeded}
          placeholder="Enter Coins"
          type="number"
          style={{ boxShadow: "none" }}
          onChange={(e)=>setCoinsNeeded(e.target.value)}
        />
        <div className="flex items-center  bg-[#343F4B] h-full absolute right-0 pr-[44px] pl-[12px]">
          <div className="text-[#FFFFFF] text-[12px]">{formatMoney(getCostPerCoin(userInfo?.coin?.price||FindTheCountyCoins?.price,userInfo?.coin?.amount|| FindTheCountyCoins?.amount)*coinsNeeded||'0',false)}</div>
        </div>
      </div> */
}
