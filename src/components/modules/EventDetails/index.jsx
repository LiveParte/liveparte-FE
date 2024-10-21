import { MainContainer } from "@/utils/styleReuse";
import React from "react";
import {
  EventDateIcon,
  EventIcon1,
  EventIcon2,
  EventIcon3,
} from "../../../../public/svg";
import moment from "moment";
import { isPastDate } from "@/utils/functions/checkIfItSecondDay";

export default function EventDetails({ HeroSectionEvent }) {
  const reWatchIsNotAvailable =
    isPastDate(HeroSectionEvent?.event_date) &&
    !HeroSectionEvent?.streaming_url &&
    !HeroSectionEvent?.rewatchAvailable;

  // console.log(
  //   reWatchIsNotAvailable,'reWatchIsNotAvailable'
  // )
  return (
    <div className={`${MainContainer}  bg-[#060809] pt-4`}>
      <div className=" bg-[#060809]">
        <div
          dangerouslySetInnerHTML={{ __html: HeroSectionEvent?.description }}
          className="lg:w-[75%] text-white text-[20px] font400 lg:text-[30px]  leading-[27px] lg:leading-[45px] pb-[53px] lg:pb-[101px]"
        >
          {/* { } */}
        </div>
        {/* grid sm:grid-cols-1 lg:grid-cols-3 xl:grid-cols-5 */}
        {/* flex justify-between flex-wrap lg:flex-nowrap */}
        <div className=" flex flex-wrap w-[100%] lg:w-[90%] gap-[56px] lg:gap-[148px] items-center pb-[111px]">
          <div className="flex">
            <div className="flex gap-[12px] items-center">
              <div className="p-[18px] bg-[#343F4B] rounded-[8px]">
                <EventIcon1 />
              </div>
              <div>
                <div className="text-[#63768D] text-[15px]">
                  {moment(HeroSectionEvent?.event_date).format("dddd") ||
                    `Wednesday`}
                </div>
                <div className="text-[#FFFFFF] text-[15px] font500">
                  {moment(HeroSectionEvent?.event_date).format("MMM Do, YYYY")}
                </div>
              </div>
            </div>
          </div>
          {/*  */}
          <div className="flex">
            <div className="flex gap-[12px] items-center">
              <div className="p-[18px] bg-[#343F4B] rounded-[8px]">
                <EventDateIcon />
              </div>
              <div>
                <div className="text-[#63768D] text-[15px]">Time</div>
                <div className="text-[#FFFFFF] text-[15px] font500">
                  {HeroSectionEvent?.event_time}
                  {/* {moment(HeroSectionEvent?.event_date).format('h:mm a')} */}
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
          <div className="flex col-span-1 xl:col-span-2">
            <div className="flex gap-[12px] items-center">
              <div className="p-[18px] bg-[#343F4B] rounded-[8px]">
                <EventIcon3 />
              </div>
              <div>
                {/* <div className="text-[#63768D] text-[15px]">Wednesday</div> */}
                <div className="text-[#FFFFFF] text-[15px] font500">
                  Rewatch is {reWatchIsNotAvailable && "not"} available after
                  <br /> {reWatchIsNotAvailable ? "this" : "the"} event
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
