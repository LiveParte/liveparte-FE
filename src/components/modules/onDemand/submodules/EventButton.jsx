import CustomDropDown from "@/components/Common/CustomDropDown";
import { DropdownMenu } from "@/components/Common/DropDowns/ThreeDots";
import ButtonComp from "@/components/Ui/button";
import moment from "moment";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import {
  checkShowDuration,
  eventLink,
  liveStreamLink,
} from "@/utils/reusableComponent";
import {
  InfoIcon,
  MuteIcon,
  ThreeDot,
  UnMuteIcon,
} from "../../../../../public/svg";
import { isArray } from "@/utils/helper";
import { formatMoney } from "@/utils/formatMoney";
import CheckOut from "../../EventDetails/modal/CheckOut";
import GiftTicket from "../../EventDetails/modal/GiftTicket";
import LoginSignUp from "../../Event/Modal/Login&SignUp";
import { eventApi } from "@/store/Event/eventApi";
import { useDispatch, useSelector } from "react-redux";
import MyModal from "@/components/Ui/Modal";
import { selectCurrentUserData } from "@/store/User";
import ShareEvent from "../../EventDetails/modal/ShareEvent";
import { setLiveStreamEventData } from "@/store/Event";
import { useRouter } from "next/router";

export default function EventButton({
  HeroSectionEvent,
  // handleGetTicketLearnMore,
  // isLive,
  // isOnDemand,
  // showStatus,
  muted,
  // giftTicket,
  // openModalShareEvent,
  toggleMute,
  // openModal,
  // handleJoinEvent,
  buttonAction,
  eventIsPurchase = false,
  TextTypeAction,
  // handleGetTicket,
  isDisabled,
  HappeningNow,
  show,
  isSingleEvent = false,
}) {
  const router = useRouter();
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [openModal, setModal] = useState(false);
  const userData = useSelector(selectCurrentUserData) || {};
  const handleCloseModal = () => {
    setModal(null);
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
            handleCloseModal();
            //getAllEvent
            // userShowRefetch();
            setModal("checkout");
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
      return setModal("login/signup");
    }
    setModal("gift ticket");
  };

  const handleOpenGShareEvent = () => {
    setModal("share event");
  };
  const handleGetTicket = () => {
    if (!userData?._id) {
      return setModal("login/signup");
    }
    setModal("checkout");
  };

  const handleJoinEvent = () => {
    console.log(HeroSectionEvent,'HeroSectionEvent')
    dispatch(setLiveStreamEventData(HeroSectionEvent));
    if (buttonAction() === "isPaidAndEventIsLive") {
      // dispatch(setLiveStreamEventData(HeroSectionEvent));

      router.push({
        pathname: `${liveStreamLink}/${HeroSectionEvent?._id}`,
      });
    }

    return router.push({
      pathname: `${eventLink}/${HeroSectionEvent?._id}`,
    });
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

  function CallToActionIcon() {
    return (
      <div className="flex gap-x-2 md:gap-x-4 items-center h-[44px]">
        {!isSingleEvent && (
          <div className="cursor-pointer" onClick={handleJoinEvent}>
            <InfoIcon />
          </div>
        )}
        {(buttonAction() === "isPaidAndEventIsLive" || isSingleEvent) && (
          <div className="relative  leading-none">
            {isOpen && (
              <DropdownMenu
                giftTicket={handleOpenGiftTicket}
                openModalShareEvent={handleOpenGShareEvent}
                HeroSectionEvent={HeroSectionEvent}
                isSingleEvent={isSingleEvent}
                HappeningNow={HappeningNow}
              />
              // </CustomDropDown>
            )}
            <button
              className="leading-none flex items-center"
              onClick={() => setIsOpen(!isOpen)}
            >
              <ThreeDot />
            </button>
          </div>
        )}
        {isSingleEvent||buttonAction() !== "isPaidAndEventIsLive" && (
          <div className=" cursor-pointer" onClick={toggleMute}>
            {!muted ? <UnMuteIcon /> : <MuteIcon />}
          </div>
        )}
      </div>
    );
  }

  function ButtonActions(buttonType) {
    switch (buttonType) {
      case "isPaidAndEventIsLive":
        return (
          <div>
            <ButtonComp
              isDisabled={isDisabled}
              className={`py-[12px] px-[39px] text-[13px] xl:text-[15px] font500`}
              btnText={"Join The Event"}
              onClick={handleJoinEvent}
            />
          </div>
        );

      case "isPaidAndEventNotLIve":
        return (
          <div>
            <ButtonComp
              isDisabled={true}
              className={`py-[12px] px-[15px] md:px-[39px] text-[13px] xl:text-[15px] font500`}
              btnText={`Ticket already purchased`}
            />
          </div>
        );
      case "notPaidButIsLive":
        return (
          <div>
            <ButtonComp
              isDisabled={eventIsPurchase}
              onClick={() => {
                handleGetTicket && handleGetTicket();
              }}
              className={`py-[12px] px-[15px] md:px-[39px] text-[13px] xl:text-[15px] font500`}
              btnText={`Get Ticket - ${
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
              )}`}
            />
          </div>
        );

      default:
        break;
    }
  }

  function TextType(textType) {
    switch (textType) {
      case "onDemand":
        return (
          <div className="   flex gap-[8px] items-center justify-center md:justify-start">
            <div className="text-[11px] lg:text-[13px]  text-white   font500">
              On Demand
            </div>
          </div>
        );
      case "happeningNow":
        return (
          <div className="flex gap-[8px] items-center">
            <div className="h-[8px] w-[8px] rounded-full bg-[#FA4354]"></div>
            <div className="text-[11px] lg:text-[13px]  text-white  font500">
              Happening now
            </div>
          </div>
        );
      case "justDate":
        return (
          <div className="text-[#B4BECB] text-[13px] md:text-[15px] z-10 relative  font500">
            {moment(HeroSectionEvent?.event_date).format("MMM DD, YYYY")} -
            Watch live
          </div>
        );
      default:
        break;
    }
  }

  return (
    HeroSectionEvent?._id && (
      <>
        {openModal && (
          <MyModal
            bodyComponent={
              ModalList?.find((item, index) => item?.name == openModal)
                ?.component
            }
            containerStyle={`bg-[#1B1C20] border-[1px] border-[#343F4B] rounded-[16px]  !w-[486px]`}
            isOpen={openModal ? true : false}
            closeModal={() => setModal(null)}
            // openModal={()=>setCheckOut(true)}
          />
        )}
        <div
          className="hidden mb-[80px] md:flex  h-[44px] items-center gap-x-2 md:gap-x-4"
          ref={dropdownRef}
        >
          {ButtonActions(buttonAction())}
          <CallToActionIcon />
          {TextType(TextTypeAction())}
        </div>

        <div className="flex   flex-col mb-[5vh] items-center md:hidden">
          <div className="">{TextType(TextTypeAction())}</div>
          <div className="flex justify-center flex-wrap items-center gap-x-2 md:gap-x-4  gap-y-2 mt-4">
            {ButtonActions(buttonAction())}
            <CallToActionIcon />
          </div>
        </div>
      </>
    )
  );
}

// <div className="" ref={dropdownRef}>
//   <div className="mb-[100px] hidden lg:flex gap-[16px] items-center ">
//     <ButtonComp
//       className={`py-[12px] px-[39px] text-[13px] xl:text-[15px] font500`}
//       btnText={"Join The Event"}
//       onClick={handleJoinEvent}
//     />
//     <div
//       className="cursor-pointer"
//       onClick={() => openModal && openModal(HeroSectionEvent)}
//     >
//       <InfoIcon />
//     </div>
//     <div className="relative  leading-none">
//       {isOpen && (
//         // <CustomDropDown setIsOpen={setIsOpen} ref={dropdownRef}>

//         <DropdownMenu
//           giftTicket={giftTicket}
//           openModalShareEvent={openModalShareEvent}
//         />
//         // </CustomDropDown>
//       )}
//       <button
//         className="leading-none flex items-center"
//         onClick={() => setIsOpen(!isOpen)}
//       >
//         <ThreeDot />
//       </button>
//     </div>

//     <div className="leading-none">
//       <>
//         <div className="flex gap-[8px] items-center    leading-none">
//           <div className="h-[10px] w-[10px] rounded-full bg-[#FA4354] leading-none"></div>
//           <div className="text-[11px] lg:text-[13px]  text-white   font500 leading-tight">
//             Happening Now
//           </div>
//         </div>
//       </>
//     </div>
//   </div>
//   <div className="text-center mt-[20px] lg:mt-[40px] lg:hidden mb-[42px] font500">
//     <div className="mb-[24px] hidden xl:block">
//       {!isLive ? (
//         <div className="text-[#B4BECB] text-[13px] md:text-[15px] z-10 relative  font500">
//           {moment(HeroSectionEvent?.event_date).format("MMM DD, YYYY")} -
//           Watch live
//         </div>
//       ) : (
//         showStatus && (
//           <div className="   flex gap-[8px] items-center   justify-center md:justify-start">
//             {/* <div className="h-[8px] w-[8px] rounded-full bg-[#FA4354]"></div> */}
//             <div className="text-[11px] lg:text-[13px]  text-white   font500">
//               On Demand
//             </div>
//           </div>
//         )
//       )}
//     </div>

//     <div className="flex gap-3 items-center">
//       <ButtonComp
//         className={`py-[12px] px-[57px] text-[13px] md:text-[15px] font500 `}
//         btnText={"Join The Event"}
//         onClick={handleJoinEvent}
//       />
//       <div className="relative  leading-none">
//         {isOpen && (
//           // <CustomDropDown setIsOpen={setIsOpen} ref={dropdownRef}>

//           <DropdownMenu
//             giftTicket={giftTicket}
//             openModalShareEvent={openModalShareEvent}
//           />
//           // </CustomDropDown>
//         )}
//         <button onClick={() => setIsOpen(!isOpen)}>
//           <ThreeDot />
//         </button>
//       </div>
//     </div>
//   </div>
// </div>
