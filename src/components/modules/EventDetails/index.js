import { MainContainer } from "@/utils/styleReuse";
import React from "react";
import { EventIcon1, EventIcon2, EventIcon3 } from "../../../../public/svg";
import moment from "moment";

export default function EventDetails({
  HeroSectionEvent
}) {
  return (
    <div className={`${MainContainer}  bg-[#060809] pt-4`}>
      <div className=" bg-[#060809]">
        <div className="lg:w-[75%] text-white text-[20px] lg:text-[35px] font600 leading-[27px] lg:leading-[45px] pb-[53px] lg:pb-[101px]">
        Davido is going to shut down the event as usual with amazing performances, never failing to disappoint. Get your ticket now so you don’t miss out on the fun!
        </div>

        <div className="flex flex-wrap gap-[56px] lg:gap-[148px] items-center pb-[111px]">
        <div className="flex">
          <div className="flex gap-[12px] items-center">
            <div className="p-[18px] bg-[#343F4B] rounded-[8px]">
              <EventIcon1 />
            </div>
            <div>
              <div className="text-[#63768D] text-[15px]">{moment(HeroSectionEvent?.event_date).format('dddd')||`Wednesday`}</div>
              <div className="text-[#FFFFFF] text-[15px] font500">
                {moment(HeroSectionEvent?.event_date).format("MMM Do, YYYY") }
              </div>
            </div>
          </div>
        </div>
        {/*  */}
        <div className="flex">
          <div className="flex gap-[12px] items-center">
            <div className="p-[18px] bg-[#343F4B] rounded-[8px]">
              <EventIcon2 />
            </div>
            <div>
              {/* <div className="text-[#63768D] text-[15px]">Wednesday</div> */}
              <div className="text-[#FFFFFF] text-[15px] font500">
              Livestreamed
              </div>
            </div>
          </div>
        </div>
        {/*  */}
        <div className="flex">
          <div className="flex gap-[12px] items-center">
            <div className="p-[18px] bg-[#343F4B] rounded-[8px]">
              <EventIcon3 />
            </div>
            <div>
              {/* <div className="text-[#63768D] text-[15px]">Wednesday</div> */}
              <div className="text-[#FFFFFF] text-[15px] font500">
              Rewatch is available after<br/> the event
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
