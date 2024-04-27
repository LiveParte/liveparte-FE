import React, { useEffect, useRef, useState } from "react";
import { MainContainer } from "@/utils/styleReuse";
import {
  checkShowDuration,
  convertDateTime,
  CopyEventLink,
  eventLink,
  GetTransformedImageUrl,
  liveStreamLink,
  myShowLink,
} from "@/utils/reusableComponent";
import { useRouter } from "next/router";
import { isArray } from "@/utils/helper";
import { useDispatch, useSelector } from "react-redux";
import { setEventData, setLiveStreamEventData } from "@/store/Event";

import MyModal from "@/components/Ui/Modal";
import CheckOut from "../EventDetails/modal/CheckOut";
import { selectCurrentUserData } from "@/store/User";
import { useCreatePurchaseMutation } from "@/store/Transaction/transactionApi";
import GiftTicket from "../EventDetails/modal/GiftTicket";
import LoginSignUp from "../Event/Modal/Login&SignUp";
import ShareEvent from "../EventDetails/modal/ShareEvent";
import { eventApi } from "@/store/Event/eventApi";

import EventButton from "./submodules/EventButton";

export default function Hero({
  notEvent = true,
  // router,
  openModal,
  // openModalLoginSignUp,
  giftTicket,
  openModalShareEvent,
  HeroSectionEvent,
  showStatus = true,
  showTopGradient = false,
  isOnDemand = false,
  isLoading = false,
  isSingleEvent=false
}) {
  const [CreatePurchase, { isLoading: cpLoader }] = useCreatePurchaseMutation();

  const videoRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [muted, setMuted] = useState(true);

  const EventStarted =
    HeroSectionEvent?.eventStarted &&
    checkShowDuration(
      HeroSectionEvent?.event_date,
      HeroSectionEvent?.event_length
    );
  const userData = useSelector(selectCurrentUserData) || {};
  const show = {
    ...HeroSectionEvent,
    ticket: isArray(HeroSectionEvent?.tickets) && HeroSectionEvent?.tickets[0],
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

  const HappeningNow =
    HeroSectionEvent?.purchase?.id &&
    HeroSectionEvent?.eventStarted &&
    EventStarted;

  const buttonAction = () => {
    if (userData?._id) {
      if (HappeningNow) {
        return "isPaidAndEventIsLive";
      }
      if (
        HeroSectionEvent?.purchase?.id &&
        // !HeroSectionEvent?.eventStarted &&
        !EventStarted
      ) {
        return "isPaidAndEventNotLIve";
      }
    }
    if (!HeroSectionEvent?.eventStarted && !EventStarted) {
      return "notPaidButIsLive";
    }
    return "notPaidButIsLive";
  };

  const TextType = () => {
    if (isOnDemand) {
      return "onDemand";
    }
    if (!isOnDemand && HeroSectionEvent?.eventStarted && EventStarted) {
      return "happeningNow";
    }
    return "justDate";
  };
  // console.log(HeroSectionEvent,'targetDatePlusDuration1')

  return (
    <div
      className={`relative font400   bg-cover bg-center  xl:bg-top ${MainContainer} h-[100dvh] md:h-[100vh]`}
    >
      {showTopGradient && (
        <div className=" absolute top-0 left-0 right-0 h-[20vh]  z-50  bg-contain xl:bg-cover !bg-no-repeat bg-gradient-to-b from-black"></div>
      )}
      <video
        // controls
        src={HeroSectionEvent?.promotional_url}
        ref={videoRef}
        autoPlay={isSingleEvent?false:true}
        loop
        muted
        className="absolute left-0 right-0 top-0 bottom-0  h-[90vh] md:h-[100vh] w-[100vw] object-cover"
        poster={HeroSectionEvent?.thumbnail_url}
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
              />
              
            </div>
          </div>
        </div>
      </div>
      <div className=" absolute -bottom-1 left-0 right-0 h-[50vh]   bg-contain xl:bg-cover !bg-no-repeat bg-gradient-to-t from-black"></div>
    </div>
  );
}
