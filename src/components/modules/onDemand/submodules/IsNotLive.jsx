import CustomDropDown from "@/components/Common/CustomDropDown";
import { DropdownMenu } from "@/components/Common/DropDowns/ThreeDots";
import ButtonComp from "@/components/Ui/button";
import moment from "moment";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { InfoIcon, MuteIcon, ThreeDot, UnMuteIcon } from "../../../../../public/svg";

export default function IsNotLive({
  HeroSectionEvent,
  handleGetTicketLearnMore,
  isLive,
  isOnDemand,
  showStatus,
  muted,
  giftTicket,
  openModalShareEvent,
  toggleMute,
  openModal,
  handleJoinEvent
}) {
  const dropdownRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        // Clicked outside the dropdown, so close it
        setIsOpen(false);
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    // Unbind the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  return (
    <div className="" ref={dropdownRef}>
      <div className="mb-[100px] hidden lg:flex gap-[16px] items-center ">
        <ButtonComp
          className={`py-[12px] px-[39px] text-[13px] xl:text-[15px] font500`}
          btnText={ "Join The Event"}
          onClick={handleJoinEvent}
        />
         <div
            className="cursor-pointer"
            onClick={() => openModal && openModal(HeroSectionEvent)}
          >
            <InfoIcon />
          </div>
        <div className="relative  leading-none">
          {isOpen && (
            // <CustomDropDown setIsOpen={setIsOpen} ref={dropdownRef}>
             
              <DropdownMenu  giftTicket={giftTicket} openModalShareEvent={openModalShareEvent}/>
            // </CustomDropDown>
          )}
          <button className='leading-none flex items-center' onClick={() => setIsOpen(!isOpen)}>
           <ThreeDot/>
          </button>
        </div>
        
        <div className="leading-none">
        <>
               
                  <div className="flex gap-[8px] items-center    leading-none">
                    <div className="h-[10px] w-[10px] rounded-full bg-[#FA4354] leading-none"></div>
                    <div className="text-[11px] lg:text-[13px]  text-white   font500 leading-tight">
                      Happening Now
                    </div>
                  </div>
                
              </>
        </div>
      </div>
      <div className="text-center mt-[20px] lg:mt-[40px] lg:hidden mb-[42px] font500">
        <div className="mb-[24px] hidden xl:block">
          {!isLive ? (
            <div className="text-[#B4BECB] text-[13px] md:text-[15px] z-10 relative  font500">
              {moment(HeroSectionEvent?.event_date).format("MMM DD, YYYY")} -
              Watch live
            </div>
          ) : (
            showStatus && (
              <div className="   flex gap-[8px] items-center   justify-center md:justify-start">
                {/* <div className="h-[8px] w-[8px] rounded-full bg-[#FA4354]"></div> */}
                <div className="text-[11px] lg:text-[13px]  text-white   font500">
                  On Demand
                </div>
              </div>
            )
          )}
        </div>
        
        <div className="flex gap-3 items-center">
          <ButtonComp
            className={`py-[12px] px-[57px] text-[13px] md:text-[15px] font500 `}
            btnText={ "Join The Event"}
            onClick={handleJoinEvent}
          />
          <div className="relative  leading-none">
          {isOpen && (
            // <CustomDropDown setIsOpen={setIsOpen} ref={dropdownRef}>
             
              <DropdownMenu  giftTicket={giftTicket} openModalShareEvent={openModalShareEvent}/>
            // </CustomDropDown>
          )}
          <button onClick={() => setIsOpen(!isOpen)}>
            <ThreeDot/>
          </button>
        </div>
        </div>
      </div>
    </div>
  );
}
