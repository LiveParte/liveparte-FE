import { convertAndAddOneHour, convertDateTime, CopyEventLink, replaceAmpersandWithAnd } from '@/utils/reusableComponent';
import moment from 'moment';
import React from 'react'
  


export function DropdownMenu({
    openModalShareEvent,
    giftTicket,
    HeroSectionEvent,
    isSingleEvent,
    HappeningNow
}) {
    return (
      <div className=" absolute dropdownIII transform translate-x-[-250px] lg:translate-x-[-200px] -translate-y-[60px] z-30">
        <div className=" bg-[#1B1C20] border-[1px] text-left border-[#343F4B] text-[13px] md:text-[14px] text-white  rounded-[16px] md:w-[327px] w-[80vw]     px-[40px] py-[24px]">
          <div className="py-[12px] cursor-pointer " onClick={giftTicket}>
            Gift Ticket
          </div>
          <div
            className="my-[12px] cursor-pointer"
            onClick={openModalShareEvent}
          >
            Share Event
          </div>
          {/* https://calendar.google.com/calendar/u/0/r/eventedit?text=test+add+calendar+event&location&details=test+add+calendar+event&dates=20210510/20210511 */}
       {!HappeningNow &&   <div className="py-[12px]">
            <a
              target="_blank"
              className=" text-white no-underline  "
              href={`https://calendar.google.com/calendar/r/eventedit?text=${
                replaceAmpersandWithAnd(HeroSectionEvent?.name)
              }&dates=${convertDateTime(HeroSectionEvent?.event_date)}/${convertAndAddOneHour(HeroSectionEvent?.event_date)}&details=<b>${replaceAmpersandWithAnd(HeroSectionEvent?.name)}</b><br/><br/><b>Location:</b>${replaceAmpersandWithAnd(HeroSectionEvent?.country)}
              <br/>
              <br/>
              <b>Description:</b>${replaceAmpersandWithAnd(HeroSectionEvent?.description)}
              <br/>
              <br/>
              <b>Event Details:</b>
              <br/>
              <b>Venue:</b>${replaceAmpersandWithAnd(HeroSectionEvent?.address)}
              <br/>
              <b>Date:</b>${replaceAmpersandWithAnd(HeroSectionEvent?.event_date)}
              <br/>
              <b>Time:</b>${moment(HeroSectionEvent?.event_date).format("h:mm")}
              &location=${CopyEventLink({
                link: replaceAmpersandWithAnd(HeroSectionEvent?._id),
              })}&sf=true&output=xml`}
            >
              Set Reminder
            </a>
          </div>}
        </div>
      </div>
    );
  }
