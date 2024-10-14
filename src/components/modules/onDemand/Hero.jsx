import React, { useEffect, useRef, useState } from "react";
import { MainContainer } from "@/utils/styleReuse";
import {
  checkDateStatus,
  checkEventStatusII,
  checkShowDuration,
} from "@/utils/reusableComponent";
import { isArray } from "@/utils/helper";
import { useSelector } from "react-redux";
import { selectCurrentUserData } from "@/store/User";
import { useCreatePurchaseMutation } from "@/store/Transaction/transactionApi";
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile,
} from "react-device-detect";

import EventButton from "./submodules/EventButton";
import { isPastDate, isSecondDay } from "@/utils/functions/checkIfItSecondDay";

export default function Hero({
  HeroSectionEvent,
  showTopGradient = false,
  isOnDemand = false,
  isLoading = false,
  isSingleEvent = false,
}) {
  const heroImage = isMobile
    ? HeroSectionEvent?.thumbnail_url_mobile
    : HeroSectionEvent?.thumbnail_url;

  const videoRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [muted, setMuted] = useState(true);
  const [backgroundImage, setBackgroundImage] = useState(heroImage);

  useEffect(() => {
    const img = new Image();
    img.src = heroImage;
    img.onload = () => setBackgroundImage(heroImage);
  }, [heroImage]);

  const EventStarted =
    HeroSectionEvent?.eventStarted &&
    checkShowDuration(
      HeroSectionEvent?.event_date,
      HeroSectionEvent?.event_length
    );
  const userData = useSelector(selectCurrentUserData) || {};
  const show = {
    ...HeroSectionEvent,
    ticket: isArray(HeroSectionEvent?.tickets)
      ? HeroSectionEvent?.tickets[0]
      : HeroSectionEvent?.ticket,
  };
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

  const toggleMute = () => {
    const video = videoRef.current;
    // console.log(video.muted,'video')
    if (video) {
      video.muted = !video.muted;
      setMuted(video.muted);
    }
  };

  const eventIsPast =
    checkEventStatusII(
      HeroSectionEvent?.event_date,
      HeroSectionEvent?.event_time,
      HeroSectionEvent?.event_length
    ) === "Past";
  // console.log(eventIsPast,'eventIsPasteventIsPast')
  const HappeningNow =
    HeroSectionEvent?.purchase?.id && HeroSectionEvent?.eventStarted;
  // EventStarted;

  console.log(HeroSectionEvent, HappeningNow, "HeroSectionEvent111");

  const buttonAction = () => {
    const ticket =
      Array.isArray(HeroSectionEvent?.tickets) && HeroSectionEvent?.tickets[0];
    // console.log(HeroSectionEvent,'tbuttonActionicket')
    if (
      isPastDate(HeroSectionEvent?.event_date) &&
      !HeroSectionEvent?.streaming_url &&
      !HeroSectionEvent?.rewatchAvailable
    ) {
      return "pastShow";
    }

    if (userData?._id) {
      if (HappeningNow || (HeroSectionEvent?.purchase?.id && isOnDemand)) {
        return "isPaidAndEventIsLive";
      }

      if (HeroSectionEvent?.purchase?.id && !EventStarted) {
        if (ticket?.price === 0 && !EventStarted) {
          return "FreeTicket";
        }
        return "isPaidAndEventNotLIve";
      }
    } else {
      if (ticket?.price === 0 && !EventStarted) {
        return "FreeTicket";
      }
    }

    //remove later  event_date

    //

    if (!HeroSectionEvent?.eventStarted && !EventStarted) {
      return "notPaidButIsLive";
    }

    //
    return "notPaidButIsLive";
  };

  // console.log(checkDateStatus(HeroSectionEvent?.event_date),'checkDateStatus')

  // console.log(isOnDemand, HeroSectionEvent ,'HeroSectionEventHeroSectionEvent')

  const TextType = () => {
    if (
      isPastDate(HeroSectionEvent?.event_date) &&
      !HeroSectionEvent?.streaming_url &&
      !HeroSectionEvent?.rewatchAvailable
    ) {
      return "eventNotAvailable";
    }
    // pastEvent
    if (eventIsPast) {
      return "pastEvent";
    }
    if (isOnDemand) {
      return "onDemand";
    }
    if (!isOnDemand && HeroSectionEvent?.eventStarted) {
      return "happeningNow";
    }
    return "justDate";
  };
  // console.log(HeroSectionEvent,EventStarted,'targetDatePlusDuration1')

  return (
    <div
      className={`relative font400   bg-cover bg-center  xl:bg-top ${MainContainer} h-[100dvh] md:h-[100vh]`}
    >
      {showTopGradient && (
        <div className=" absolute top-0 left-0 right-0 h-[20vh]  z-50  bg-contain xl:bg-cover !bg-no-repeat bg-gradient-to-b from-black"></div>
      )}
      {/* <img src={backgroundImage} alt="" loading="lazy"   
       className="absolute left-0 right-0 top-0 bottom-0  h-[90vh] md:h-[100vh] w-[100vw] object-cover"/>
      <iframe src={backgroundImage} loading="lazy"></iframe> */}
      <video
        // controls
        src={HeroSectionEvent?.promotional_url}
        ref={videoRef}
        autoPlay={isSingleEvent ? false : true}
        loop
        muted
        preload
        className="absolute left-0 right-0 top-0 bottom-0  h-[90vh] md:h-[100vh] w-[100vw] object-cover"
        poster={backgroundImage}
        style={{
          backgroundAttachment: "fixed",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
        }}
        playsInline
      >
        <source src={HeroSectionEvent?.promotional_url} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="">
        <div className="relative">
          <div className=" min-h-[100dvh] md:min-h-screen relative flex flex-col justify-end  ">
            <div
              className={`relative z-40  mt-[40vh] flex flex-col  md:justify-start items-center md:items-start  text-center  md:text-start`}
            >
              <div className="mt-[16px] text-[36px] lg:text-[92px] md:text-left font-1 text-white font-bold uppercase mb-[20px] lg:mb-[32px] leading-[40px] md:leading-[46px] lg:leading-[90px] lg:w-[80%] line-clamp-3">
                {HeroSectionEvent?.name}
              </div>
              {/*  */}
              <EventButton
                HeroSectionEvent={HeroSectionEvent}
                buttonAction={buttonAction}
                TextTypeAction={TextType}
                isDisabled={isLoading}
                HappeningNow={HappeningNow}
                toggleMute={toggleMute}
                show={show}
                muted={muted}
                isSingleEvent={isSingleEvent}
                isOnDemand={isOnDemand}
              />
            </div>
          </div>
        </div>
      </div>
      <div className=" absolute -bottom-1 left-0 right-0 h-[50vh]   bg-contain xl:bg-cover !bg-no-repeat bg-gradient-to-t from-black"></div>
    </div>
  );
}
