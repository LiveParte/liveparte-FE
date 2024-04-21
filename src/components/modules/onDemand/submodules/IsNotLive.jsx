import CustomDropDown from "@/components/Common/CustomDropDown";
import { DropdownMenu } from "@/components/Common/DropDowns/ThreeDots";
import ButtonComp from "@/components/Ui/button";
import moment from "moment";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

export default function IsNotLive({
  HeroSectionEvent,
  handleGetTicketLearnMore,
  isLive,
  isOnDemand,
  showStatus,
  muted,
  giftTicket,
  openModalShareEvent
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
          btnText={isLive ? "Join The Event" : "Learn More"}
          onClick={handleGetTicketLearnMore}
        />
        <div className="relative ">
          {isOpen && (
            // <CustomDropDown setIsOpen={setIsOpen} ref={dropdownRef}>
             
              <DropdownMenu  giftTicket={giftTicket} openModalShareEvent={openModalShareEvent}/>
            // </CustomDropDown>
          )}
          <button onClick={() => setIsOpen(!isOpen)}>
            <Image
              src="/webp/dots.png"
              className="h-[44px] cursor-pointer"
              width={44}
              height={44}
              alt="dots"
            />
          </button>
        </div>
        <div className="">
          {!isLive ? (
            <div className="text-[13px] xl:text-[16px]  text-[#B4BECB] z-10 relative font500">
              {HeroSectionEvent?.event_date !== "Event Date"
                ? moment(HeroSectionEvent?.event_date).format("MMMM DD, YYYY")
                : `April 17, 2024`}{" "}
              - Watch lives
            </div>
          ) : (
            showStatus && (
              <>
                {isOnDemand ? (
                  <div className="   flex gap-[8px] items-center   ">
                    {/* <div className="h-[8px] w-[8px] rounded-full bg-[#c6616b]"></div> */}
                    <div className="text-[11px] lg:text-[13px]  text-white   font500">
                      On Demand
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-[8px] items-center   ">
                    <div className="h-[8px] w-[8px] rounded-full bg-[#FA4354]"></div>
                    <div className="text-[11px] lg:text-[13px]  text-white   font500">
                      Happening Now
                    </div>
                  </div>
                )}
              </>
            )
          )}
        </div>
      </div>
      <div className="text-center mt-[20px] lg:mt-[40px] lg:hidden mb-[42px] font500">
        <div className="mb-[24px]">
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
        <div className="relative ">
          {isOpen && (
            // <CustomDropDown setIsOpen={setIsOpen} ref={dropdownRef}>
             
              <DropdownMenu  giftTicket={giftTicket} openModalShareEvent={openModalShareEvent}/>
            // </CustomDropDown>
          )}
          <button onClick={() => setIsOpen(!isOpen)}>
            <Image
              src="/webp/dots.png"
              className="h-[44px] cursor-pointer"
              width={44}
              height={44}
              alt="dots"
            />
          </button>
        </div>
        <div>
          <ButtonComp
            className={`py-[12px] px-[57px] text-[13px] md:text-[15px] font500 `}
            btnText={isLive ? "Join The Event" : "Learn More"}
            onClick={handleGetTicketLearnMore}
          />
        </div>
      </div>
    </div>
  );
}
