import ButtonComp from "@/components/Ui/button";
import React, { useRef } from "react";
import { GiftTicketForm } from "../Data";
import { FloatingLabelInput } from "@/components/Ui/TextInput";
import { FloatingLabelTextArea } from "@/components/Ui/TextArea";
import { CountdownTimerII, SuccessNotification } from "@/utils/reusableComponent";
import { useRouter } from "next/router";
import { CloseII } from "../../../../../public/svg";
import { formatMoney } from "@/utils/formatMoney";


export default function ShareEvent({
  closeModal,
  Data
}) {
  const router = useRouter();
  const inputRef = useRef(null);
  const handleAction = () =>{
    // router.push('/event_time_out')
  }

  async function copyTextToClipboard(text) {
    if ('clipboard' in navigator) {
       await navigator.clipboard.writeText(text);
       return SuccessNotification({message: 'Text copied successfully'})

    } else {
      return document.execCommand('copy', true, text);
    }
    
  }
  const copyToClipboard = () => {
    inputRef.current.select();
    document.execCommand('copy');
    // alert('Text copied to clipboard');
  };
  return (
    <div className="bg-[#1B1C20] pb-[56px] px-[16px] lg:px-[56px] pt-[16px] lg:pt-[24px]">
      <nav className="flex justify-between items-center mb-[32px]">
        <div className="text-[18px]  text-white">Share event</div>
        <div className="text-[#63768D] text-[18px] flex items-center gap-[12px]">
          {/* <CountdownTimerII initialTime={5} onTimerEnd={handleAction}/> */}
        <div className="cursor-pointer absolute right-5 md:right-0" onClick={closeModal&&closeModal}> <CloseII /></div>
        </div>
      </nav>

      <main>
        <div className="flex items-center gap-[17px]  mb-[54px]">
          <div>
          <img
             src={Data?.
              thumbnail_url||"/webp/bg1.webp"}
              className="w-[89px] h-[89px] object-cover rounded-[8px]"
            />
          </div>
          <div>
            
            <div className="text-[14px] text-white font500 mb-[8px]">
              Timeless tour - Newyork
            </div>
            <div className="text-[#B4BECB] text-[15px] mb-[6px] flex items-center ">
            Apr 24 <div className="rounded-full h-[4px] w-[4px] bg-[#D9D9D9] mx-[8px] hidden md:block"></div> O2 Cinema Arena Concert
            </div>
            <div className="text-[14px] text-white font500">{Data?.ticket?.code} {formatMoney(Data?.ticket?.price,false||'0')} </div>
          </div>
        </div>

        <div className="flex items-center h-[50px] border-none rounded-[8px] bg-[#222428] border-[#343F4B] border-[1px]">
          <input className="flex-1 flex-grow-1 bg-transparent px-[16px] outline-none text-[#63768D] text-[13px]"
            ref={inputRef}
          value={`http://44.208.167.228:3005/event/${Data?._id}`}
          disabled
          />
          
        <ButtonComp
          btnText={`Copy link `}
          className={` text-[13px] font500 h-[34px] mr-[8px]`}
          onClick={()=>copyTextToClipboard(`http://44.208.167.228:3005/event/${Data?._id}`)}
        />
        </div>

       
      </main>
    </div>
  );
}
