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
}) {
  const [CreatePurchase, { isLoading: cpLoader }] = useCreatePurchaseMutation();

  const videoRef = useRef(null);
  const dispatch = useDispatch();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [openCheckOut, setCheckOut] = useState(false);
  const dropdownRef = useRef(null);
  const [muted, setMuted] = useState(true);

  const eventIsPurchase = HeroSectionEvent?.purchase?.id;
  const isLive = HeroSectionEvent?.isLiveStreamed ? true : false;
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
    if (video) {
      video.muted = !video.muted;
      setMuted(video.muted);
    }
  };

  const handleGetTicketLearnMore = () => {
    dispatch(
      setEventData({
        ...{
          ...HeroSectionEvent,
          ticket:
            isArray(HeroSectionEvent?.tickets) && HeroSectionEvent?.tickets[0],
        },
      })
    );

    router.push({
      pathname: `${eventLink}/${HeroSectionEvent?._id}`,
    });
  };

  const handleJoinEvent = () => {
    dispatch(
      setLiveStreamEventData(HeroSectionEvent)
    );

    router.push({
      pathname: `${liveStreamLink}/`,
    });
  };

  const handleNavigate = (event) => {
    event.preventDefault();
    openModal(HeroSectionEvent);
  };
  const handleSuccessPayment = () => {
    router.push(myShowLink);
  };

  const handleCloseModal = () => {
    setCheckOut(null);
    // implementation for  whatever you want to do when the Paystack dialog closed.
  };

  const ModalList = [
    {
      name: "checkout",
      component: (
        <CheckOut
          Data={show}
          closeModal={handleCloseModal}
          IsBought={false}
          // onNext={refetch}
        />
      ),
    },
    {
      name: "gift ticket",
      component: <GiftTicket Data={show} />,
    },
    {
      name: "login/signup",
      component: (
        <LoginSignUp
          // closeModal={handleCloseModal}
          onNext={(userDetail) => {
            // dispatch(eventApi.endpoints.userShows.initiate(userDetail?._id, {forceRefetch: true}));
            dispatch(
              eventApi.endpoints.getAllEvent.initiate(undefined, {
                forceRefetch: true,
              })
            );
            handleCloseModal();
            //getAllEvent
            // userShowRefetch();
            setIsOpen("checkout");
          }}
        />
      ),
    },
    {
      name: "share event",
      component: <ShareEvent Data={show} closeModal={handleCloseModal} />,
    },
  ];

  const handleOpenGiftTicket = () => {
    if (!userData?._id) {
      return setCheckOut("login/signup");
    }
    setCheckOut("gift ticket");
  };

  const handleOpenGShareEvent = () => {
    setCheckOut("share event");
  };
  const handleGetTicket = () => {
    if (!userData?._id) {
      return setCheckOut("login/signup");
    }
    setCheckOut("checkout");
  };
  
  const  buttonAction = () => {
    if(userData?._id) {
      if(HeroSectionEvent?.purchase?.id &&HeroSectionEvent?.eventStarted){
        return 'isPaidAndEventIsLive'
      }
      if(HeroSectionEvent?.purchase?.id &&!HeroSectionEvent?.eventStarted){
        return 'isPaidAndEventNotLIve'
      }
      
  }
  if(!HeroSectionEvent?.eventStarted){
    return 'notPaidButIsLive'
  }
  return 'notPaidButIsLive'
}

const TextType= ()=>{
  if(isOnDemand){
    return 'onDemand'
  }
  if(!isOnDemand &&HeroSectionEvent?.eventStarted){
    return 'happeningNow'
  }
}
console.log(HeroSectionEvent,'targetDatePlusDuration1')


  return (
    <div
      className={`relative font400   bg-cover bg-center  xl:bg-top ${MainContainer} h-[100dvh] md:h-[100vh]`}
    >
      {openCheckOut && (
        <MyModal
          bodyComponent={
            ModalList?.find((item, index) => item?.name == openCheckOut)
              ?.component
          }
          containerStyle={`bg-[#1B1C20] border-[1px] border-[#343F4B] rounded-[16px]  !w-[486px]`}
          isOpen={openCheckOut ? true : false}
          closeModal={() => setCheckOut(null)}
          // openModal={()=>setCheckOut(true)}
        />
      )}

      {showTopGradient && (
        <div className=" absolute top-0 left-0 right-0 h-[20vh]  z-50  bg-contain xl:bg-cover !bg-no-repeat bg-gradient-to-b from-black"></div>
      )}
      <video
        // controls
        src={HeroSectionEvent?.promotional_url}
        ref={videoRef}
        autoPlay
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
              <div className="mt-[16px] text-[36px] lg:text-[92px] md:text-left font-1 text-white font-bold uppercase lg:mb-[32px] leading-[40px] md:leading-[46px] lg:leading-[90px] lg:w-[80%] line-clamp-3">
                {HeroSectionEvent?.name}
              </div>
              {/*  */}
              <EventButton
              HeroSectionEvent={HeroSectionEvent}
              buttonAction={buttonAction}
              TextTypeAction={TextType}
              />
              {/* {EventStarted ? (
                <IsLive
                  HeroSectionEvent={HeroSectionEvent}
                  handleGetTicketLearnMore={handleGetTicketLearnMore}
                  isLive={EventStarted}
                  isOnDemand={isOnDemand}
                  showStatus={showStatus}
                  muted={muted}
                  giftTicket={handleOpenGiftTicket}
                  openModalShareEvent={handleOpenGShareEvent}
                  toggleMute={toggleMute}
                  openModal={openModal}
                  handleJoinEvent={handleJoinEvent}
                />
              ) : (
                <IsNoLiveButton
                  HeroSectionEvent={HeroSectionEvent}
                  dropdownRef={dropdownRef}
                  eventIsPurchase={eventIsPurchase}
                  handleGetTicket ={handleGetTicket}
                  openModal={openModal }
                  showStatus={showStatus}
                  toggleMute={toggleMute}
                  isOpen={isOpen}
                  muted={muted}
                  isLive={isLive}
                  isOnDemand={isOnDemand}
                  
                />
              )} */}
            </div>
          </div>
        </div>
      </div>
      <div className=" absolute -bottom-1 left-0 right-0 h-[50vh]   bg-contain xl:bg-cover !bg-no-repeat bg-gradient-to-t from-black"></div>
    </div>
  );
}
