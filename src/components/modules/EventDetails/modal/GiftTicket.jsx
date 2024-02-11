import ButtonComp from "@/components/Ui/button";
import React from "react";
import { GiftTicketForm } from "../Data";
import { FloatingLabelInput } from "@/components/Ui/TextInput";
import { FloatingLabelTextArea } from "@/components/Ui/TextArea";

export default function GiftTicket() {
  return (
    <div className="bg-[#1B1C20] pb-[56px] px-[16px] lg:px-[56px] pt-[16px] lg:pt-[24px]">
      <nav className="flex justify-between items-center mb-[32px]">
        <div className="text-[18px]  text-white">Gift Ticket</div>
        <div className="text-[#63768D] text-[18px]">05:45</div>
      </nav>

      <main>
        <div className="flex items-center gap-[17px]  mb-[54px]">
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

        <form className="flex flex-col gap-[16px]">
          {GiftTicketForm()?.map((item,i)=>item?.type==="textarea"?
           <FloatingLabelTextArea
           key={i}
           label={item?.label}
           />
           :
          <FloatingLabelInput
          key={i}
          label={item?.label}
          />
         
          )}
        </form>

        <ButtonComp
          btnText={`Proceed To Make Payment ₦48,000 `}
          className={`w-full text-[13px] font500] h-[44px] mt-[54px]`}
        />
      </main>
    </div>
  );
}
