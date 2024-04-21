import Header from "@/components/Common/Header/Header";
import React, { useEffect, useRef, useState } from "react";
import { MuteIcon, UnMuteIcon } from "../../../../public/svg";
import { MainContainer } from "@/utils/styleReuse";
import ButtonComp from "@/components/Ui/button";
import IfHeaderIsAuth from "@/components/Common/Header/IfHeaderIsAuth";
import moment from "moment";
import { usePaystackPayment } from "react-paystack";
import {
  convertDateTime,
  CopyEventLink,
  eventLink,
  GetTransformedImageUrl,
} from "@/utils/reusableComponent";
import { useRouter } from "next/router";
import { isArray } from "@/utils/helper";
import { useDispatch, useSelector } from "react-redux";
import { setEventData } from "@/store/Event";
import IsLiveButton from "./submodules/IsLiveButton";
import IsNotLive from "./submodules/IsNotLive";
import MyModal from "@/components/Ui/Modal";
import CheckOut from "../EventDetails/modal/CheckOut";
import { selectCurrentUserData } from "@/store/User";
import { useCreatePurchaseMutation } from "@/store/Transaction/transactionApi";

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
  isOnDemand = true,
}) {
  const [CreatePurchase, { isLoading: cpLoader }] = useCreatePurchaseMutation();

  const videoRef = useRef(null);
  const dispatch = useDispatch();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [openCheckOut,setCheckOut] =useState(true);
  const dropdownRef = useRef(null);
  const [muted, setMuted] = useState(true);

  const eventIsPurchase = HeroSectionEvent?.pruchase?.id;
  const isLive = HeroSectionEvent?.isLiveStreamed ? true : false;
  const EventStarted = HeroSectionEvent?.eventStarted;
  const userData =useSelector(selectCurrentUserData)||{}
  const show={...HeroSectionEvent,ticket:isArray(HeroSectionEvent?.tickets)&&HeroSectionEvent?.tickets[0]}
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

  console.log(show, "hello");

  function DropdownMenu() {
    return (
      <div className=" absolute dropdownIII transform translate-x-0 -translate-y-[60px] z-50">
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
          <div className="py-[12px]">
            <a
              target="_blank"
              className=" text-white no-underline  "
              href={`https://calendar.google.com/calendar/r/eventedit?text=${
                HeroSectionEvent?.name
              }&dates=${convertDateTime(
                HeroSectionEvent?.event_date
              )}&details=<b>${HeroSectionEvent?.name}</b>
              <br/>
              <br/>
              <b>Location:</b>${HeroSectionEvent?.country}
              <br/>
              <br/>
              <b>Description:</b>${HeroSectionEvent?.description}
              <br/>
              <br/>
              <b>Event Details:</b>
              <br/>
              <b>Venue:</b>${HeroSectionEvent?.address}
              <br/>
              <b>Date:</b>${HeroSectionEvent?.event_date}
              
              <br/>
              <b>Time:</b>${moment(HeroSectionEvent?.event_date).format("h:mm")}
              &location=${CopyEventLink({
                link: HeroSectionEvent?._id,
              })}&sf=true&output=xml`}
            >
              Set Reminder
            </a>
          </div>
        </div>
      </div>
    );
  }

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

  const handleNavigate = (event) => {
    event.preventDefault();
    openModal(HeroSectionEvent);
  };

  const config = {
    reference: new Date().getTime().toString(),
    email: userData?.email || "user@example.com",
    amount: show?.ticket?.price * 100, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
    publicKey: "pk_test_9b34d7cad3b54108b6eb034c951d89366eadcc3d",
    metadata: {
      custom_fields: [
        {
          event_id: show?._id,
          ticket_id: show?.ticket?._id,
          purchase_date: new Date(),
        },
        // To pass extra metadata, add an object with the same fields as above
      ],
    },
  };

   // you can call this function anything
   const handleClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
  };
  const handleSuccess = async (reference) => {
    // Implementation for whatever you want to do with reference and after success call.
    const payload = {
      event_id: show?._id,
      ticket_id: show?.ticket?.id,
      user_id: userData?._id,
      purchase_date: new Date(),
    };
    const response = await CreatePurchase(payload);
    if (response?.data?.createdPurchase?._id) {
      closeModal();
      router.push(myShowLink);
    }
  };

  
  function closeModal() {
    setCheckOut(false);
  }


  const componentProps = {
    ...config,
    text: "Paystack Button Implementation",
    onSuccess: (reference) => handleSuccess(reference),
    onClose: handleClose,
  };
 

  const initializePayment = usePaystackPayment(config);
 

 

  //bg-[url('/webp/bg1.webp')]
  return (
    <div
      className={`relative font400   bg-cover bg-center  xl:bg-top ${MainContainer} h-[100dvh] md:h-[100vh]`}
    >
      <MyModal
      bodyComponent={<CheckOut 
        Data={show}
        makePayment={() => initializePayment(handleSuccess, handleClose)}
        componentProps={componentProps}
        handleSuccess={handleSuccess}
        handleClose={handleClose}
        closeModal={closeModal}
        IsBought={false}
        />}
      isOpen={openCheckOut}
      closeModal={closeModal}
      containerStyle={`bg-[#1B1C20] border-[1px] border-[#343F4B] rounded-[16px]  !w-[486px]`}

      />
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
        {/* {showHeader && (
          <div className="absolute left-0 right-0  ">
            <IfHeaderIsAuth
              openModal={openModalLoginSignUp || openModal}
              className="absolute top-0 left-0 right-0"
            />
          </div>
        )} */}
        <div className="relative">
          <div className=" min-h-[100dvh] md:min-h-screen relative flex flex-col justify-end  ">
            {/* <div className="h-[100vh]" /> */}

            <div
              className={`relative z-40  mt-[40vh] flex flex-col  md:justify-start items-center md:items-start  text-center  md:text-start`}
            >
              <div className="mt-[16px] text-[36px] lg:text-[92px] md:text-left font-1 text-white font-bold uppercase lg:mb-[32px] leading-[40px] md:leading-[46px] lg:leading-[90px] lg:w-[80%] line-clamp-3">
                {HeroSectionEvent?.name}
              </div>
              {/*  */}
              {false ? (
                <IsNotLive
                  HeroSectionEvent={HeroSectionEvent}
                  handleGetTicketLearnMore={handleGetTicketLearnMore}
                  isLive={isLive}
                  isOnDemand={isOnDemand}
                  showStatus={showStatus}
                  muted={muted}
                />
              ) : (
                <IsLiveButton
                  HeroSectionEvent={HeroSectionEvent}
                  dropdownRef={dropdownRef}
                  eventIsPurchase={eventIsPurchase}
                  openModal={openModal}
                  showStatus={showStatus}
                  toggleMute={toggleMute}
                  isOpen={isOpen}
                  muted={muted}
                  isLive={isLive}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className=" absolute -bottom-1 left-0 right-0 h-[50vh]   bg-contain xl:bg-cover !bg-no-repeat bg-gradient-to-t from-black"></div>
    </div>
  );
}
