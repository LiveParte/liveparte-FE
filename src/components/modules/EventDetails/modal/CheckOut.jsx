import ButtonComp from "@/components/Ui/button";
import {  CountdownTimerII } from "@/utils/reusableComponent";
import { useRouter } from "next/router";
import React from "react";
import { CloseII } from "../../../../../public/svg";

export default function CheckOut({
  closeModal
}) {
  const router = useRouter();
  const handleAction = () =>{
    router.push('/event_time_out')
  }
  // Start the countdown timer with 354 seconds (5:54)

  return (
    <div className="bg-[#1B1C20] pb-[56px] px-[16px] lg:px-[56px] pt-[16px] lg:pt-[24px]">
      <nav className="flex justify-between items-center mb-[32px]">
        <div className="text-[18px]  text-white">Checkout</div>
        <div className="text-[#63768D] text-[18px] flex gap-[20px]" ><CountdownTimerII initialTime={5} onTimerEnd={handleAction}/> 
        <span className="cursor-pointer" onClick={closeModal}> <CloseII /></span>
       </div>
      </nav>

      <main>
        <div className="flex items-center gap-[17px]  mb-[56px]">
          <div>
            <img
              src="/webp/bg1.webp"
              className="w-[89px] h-[89px] object-cover rounded-[8px]"
            />
          </div>
          <div>
            <div className="text-[#63768D] text-[13px] mb-[5px]">
              Livestream ticket
            </div>
            <div className="text-[14px] text-white font500 mb-[5px]">
              Timeless tour - Newyork
            </div>
            <div className="text-[14px] text-white font500">₦48,000 </div>
          </div>
        </div>

        <ButtonComp
          btnText={`Proceed To Make Payment ₦48,000 `}
          className={`w-full text-[13px] font500] h-[44px] hover:scale-105`}
        />
      </main>
    </div>
  );
}
