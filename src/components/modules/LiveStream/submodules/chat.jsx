import ButtonComp from "@/components/Ui/button";
import React, { useState } from "react";
import Image from "next/image";
import GiftingCoins from "./giftingCoins";
import PurchasePaartyCoins from "./PurchasePaartyCoins";
export default function Chat() {
    const [payFlow,setPayFlow]=useState();
    const paymentFlow = [
        {
            name:'giftCoins',
            component:<GiftingCoins 
            onNext={()=>setPayFlow('purchasePartyCoins')}
            onClose={()=>setPayFlow()}
            />
        },
        {
            name:'purchasePartyCoins',
            component:<PurchasePaartyCoins
            onBack={()=>setPayFlow('giftCoins')}
            onClose={()=>setPayFlow()}
            />
        }
    ]


  const ChatList = () => {
    return (
      <div className="pb-[16px] flex items-center gap-[8px] w-[90%] lg:w-full">
        <img
          src={`/webp/profile.png`}
          width={30}
          height={30}
          className="object-cover"
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
      <div className=" absolute dropdownIII transform translate-x-0 -translate-y-[60px]  lg:-translate-y-[40px] z-50 bg-black w-full  rounded-[16px] overflow-hidden">
       {paymentFlow?.find((item)=>item?.name===payFlow)?.component}
      </div>
    );
  };
  return (
    <div className=" h-full flex flex-col">
       <div className="py-[7px]  lg:pt-[16px] px-[16px] ">
       <div className="lg:hidden text-[15px] text-white font-1 font-bold uppercase mb-[8px] leading-[20px]">
        timeless tour - new york
        </div>
      <div className=" font-1 text-[13px] lg:text-[22px] text-white uppercase font-bold pb-[16px]  border-b-[1px] border-b-[#343F4B]">
        Chat
      </div>
       </div>
      <div className=" h-full flex flex-col">
        <div className=" px-[16px]   flex  items-end">
         <div className="flex-1 lg:w-full overflow-y-scroll h-[35vh] lg:h-[60vh]  customScrollHorizontal">
         <ChatList />
          <ChatList />
          <ChatList />
          <ChatList />
          <ChatList />

          <ChatList />
          <ChatList />
          <ChatList />
          <ChatList />
          <ChatList />
          <ChatList />
         </div>
         <div>
         <div className="lg:hidden  flex flex-col items-end gap-[16px] pb-[16px]">
                  <Image src={`/svg/reaction1.svg`} width={32} height={32} alt="reaction yarn " />
                  <Image src={`/svg/reaction2.svg`} width={32} height={32} />
                  <Image src={`/svg/reaction3.svg`} width={32} height={32} />
                </div>
         </div>
        </div>
        <div className="p-[16px] pt-[18px] border-t-[1px] border-t-[#343F4B]">
          <div className="flex items-center gap-[10px] mb-[13px]">
            <input className="h-[40px] lg:h-[35px] w-[23px] border-[1px] border-[#343F4B] rounded-[8px] bg-transparent flex-1 placeholder:text-[#495969] px-[17px] text-white outline-none"  placeholder="Comment here..."/>
            <div 
            onClick={()=>setPayFlow('giftCoins')}
             className="lg:hidden text-white flex flex-col  items-center">
            <Image src={`/svg/coins.svg`} width={24} height={24} className="mb-[2px]" />
              <div className="text-[10px]">500</div>
            </div>
            <button
              className={`!h-[35px] rounded-[8px] !bg-[#FA4354] !w-[43px] hidden lg:flex justify-center items-center`}
            >
              <svg
                width="17"
                height="17"
                viewBox="0 0 17 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M11.4323 3.04824C12.3424 2.79343 12.975 2.61708 13.4578 2.52846C13.9457 2.43892 14.1556 2.4658 14.2664 2.50776C14.6014 2.63461 14.8658 2.89906 14.9927 3.23401C15.0346 3.3448 15.0615 3.55479 14.972 4.04265C14.8833 4.52547 14.707 5.15807 14.4522 6.06811L13.0357 11.1269C12.6405 12.5383 12.3564 13.5505 12.0915 14.2647C11.8108 15.0216 11.6182 15.2397 11.5274 15.2961C11.1591 15.5251 10.6984 15.5468 10.3101 15.3534C10.2145 15.3058 10.0022 15.1068 9.65158 14.3796C9.32073 13.6935 8.94276 12.7124 8.41664 11.3445L8.38907 11.2727L8.38907 11.2727C8.27507 10.9757 8.17853 10.7243 8.05937 10.5017L10.1137 8.44743C10.4066 8.15454 10.4066 7.67967 10.1137 7.38677C9.82079 7.09388 9.34591 7.09388 9.05302 7.38677L6.99872 9.44108C6.7762 9.32192 6.52473 9.22537 6.22779 9.11137L6.15602 9.0838C4.78798 8.55764 3.80692 8.17964 3.12076 7.84877C2.39353 7.4981 2.19456 7.28583 2.14691 7.19016C1.95359 6.80195 1.97529 6.34127 2.20427 5.97296C2.2607 5.88219 2.47874 5.68957 3.23571 5.40884C3.94994 5.14395 4.9622 4.85987 6.37364 4.46467L11.4323 3.04824ZM14.7977 1.10499C14.2938 0.914152 13.7486 0.950035 13.187 1.05311C12.6283 1.15565 11.9292 1.35141 11.0647 1.59347L11.0279 1.60379L5.9692 3.02022L5.93225 3.03057L5.93224 3.03057C4.5656 3.41322 3.49337 3.71344 2.71413 4.00244C1.97061 4.27819 1.28447 4.61144 0.930375 5.181C0.426632 5.99128 0.37888 7.00477 0.804203 7.85883C1.10317 8.45916 1.75495 8.85545 2.46924 9.19989C3.21786 9.56087 4.25711 9.96058 5.58171 10.47L5.61755 10.4838C6.136 10.6832 6.27267 10.7415 6.38208 10.8188C6.49823 10.9009 6.59953 11.0022 6.68161 11.1184C6.75891 11.2278 6.81721 11.3644 7.01661 11.8829L7.03037 11.9187L7.03038 11.9187C7.5398 13.2433 7.93948 14.2825 8.30045 15.0311C8.64485 15.7454 9.04111 16.3971 9.64141 16.6961C10.4955 17.1215 11.5091 17.0738 12.3194 16.57C12.8889 16.2159 13.2222 15.5298 13.4979 14.7863C13.7869 14.0071 14.0871 12.9349 14.4697 11.5684L14.4697 11.5684L14.4801 11.5313L15.8966 6.47257L15.907 6.43559C16.149 5.57118 16.3448 4.87211 16.4473 4.31345C16.5504 3.75187 16.5863 3.20664 16.3954 2.70275C16.1164 1.96585 15.5346 1.38407 14.7977 1.10499Z"
                  fill="white"
                />
              </svg>
            </button>
          </div>
          <div className="relative text-white">
            <GiftCoin />
            <div className="mb-[16px] p-[4px] pr-[10px] rounded-[96px] hidden lg:flex gap-[9px] text-white text-[10px] font500 items-center  shadow-1 shadow-2 shadow-3 bg-[#BACFF70A] cursor-pointer relative w-fit" onClick={()=>setPayFlow('giftCoins')}>
              <Image src={`/svg/coins.svg`} width={24} height={24} />
              <div>0 Coin</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
