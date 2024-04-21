import ButtonComp from "@/components/Ui/button";
import { isArray } from "@/utils/helper";
import React from "react";
import { DropdownMenu } from "react-bootstrap";
import { InfoIcon, MuteIcon, UnMuteIcon } from "../../../../../public/svg";
import { formatMoney } from "@/utils/formatMoney";
import moment from "moment";

export default function IsLiveButton({
  HeroSectionEvent,
  dropdownRef,
  openModal,
  eventIsPurchase,
  toggleMute,
  showStatus,
  isOpen,
  muted,
  isLive,
  isOnDemand
}) {
  return (
    <div className=" w-full relative ">
      <div ref={dropdownRef}>
        <div className="mb-[100px] hidden md:flex gap-[16px] items-center relative">
          {isOpen && <DropdownMenu />}
          {HeroSectionEvent?._id && (
            <ButtonComp
              isDisabled={eventIsPurchase}
              onClick={() => {
                if (eventIsPurchase) {
                  return;
                }
                openModal && openModal(HeroSectionEvent);
                // eventIsPurchase ? null : openModal(HeroSectionEvent)
              }}
              className={`py-[12px] px-[39px] text-[13px] xl:text-[15px] font500`}
              btnText={
                eventIsPurchase
                  ? `Ticket already purchased`
                  : `Get Ticket - ${
                      HeroSectionEvent?.ticket?.code ||
                      isArray(HeroSectionEvent?.tickets)
                        ? ""
                        : ""
                    } ₦${formatMoney(
                      HeroSectionEvent?.ticket?.price ||
                        (isArray(HeroSectionEvent?.tickets) &&
                          HeroSectionEvent?.tickets[0]?.price) ||
                        " ",
                      true
                    )}`
              }
            />
          )}
          <div
            className="cursor-pointer"
            onClick={() => openModal && openModal(HeroSectionEvent)}
          >
            <InfoIcon />
          </div>
          <div className=" cursor-pointer" onClick={toggleMute}>
            {/* <img
            src="/webp/dots.png"
            className="h-[44px] cursor-pointer"
          /> */}
            {!muted ? <UnMuteIcon /> : <MuteIcon />}
          </div>

          <div>
            {!isOnDemand ? (
              <div className="text-[13px] xl:text-[16px]  text-[#B4BECB] z-10 relative font500">
                {moment(HeroSectionEvent?.event_date).format("MMM DD, YYYY")} -
                Watch live
              </div>
            ) : (
              showStatus && (
                <div className="   flex gap-[8px] items-center   ">
                  {/* <div className="h-[8px] w-[8px] rounded-full bg-[#FA4354]"></div> */}
                  <div className="text-[11px] lg:text-[13px]  text-white  font500">
                    On Demand
                  </div>
                </div>
              )
            )}
          </div>
        </div>
        <div className="text-center mt-[40px] md:hidden mb-[42px] relative">
          {isOpen && <DropdownMenu />}
          <div className="text-[#B4BECB] text-[13px] md:text-[15px] z-10 relative mb-[24px] font500">
            {moment(HeroSectionEvent?.event_date).format("MMM DD, YYYY")} -
            Watch live
          </div>
          <div className="flex items-center justify-center gap-3">
            <ButtonComp
              isDisabled={eventIsPurchase}
              onClick={() => {
                if (eventIsPurchase) {
                  return;
                }
                openModal(HeroSectionEvent);
                // eventIsPurchase ? null : openModal(HeroSectionEvent)
              }}
              className={`py-[12px] px-[20px] md:px-[34px] lg:px-[57px] text-[13px] md:text-[15px] font500 `}
              btnText={
                eventIsPurchase
                  ? `Ticket already purchased`
                  : `Get Ticket - ${
                      HeroSectionEvent?.ticket?.code ||
                      isArray(HeroSectionEvent?.tickets)
                        ? ""
                        : ""
                    } ₦${formatMoney(
                      HeroSectionEvent?.ticket?.price ||
                        (isArray(HeroSectionEvent?.tickets) &&
                          HeroSectionEvent?.tickets[0]?.price) ||
                        " ",
                      true
                    )}`
              }
            />
            <div className="cursor-pointer" onClick={toggleMute}>
              {!muted ? <UnMuteIcon /> : <MuteIcon />}
              {/* <img
              src="/webp/dots.png"
              className="h-[44px] cursor-pointer"
            /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
