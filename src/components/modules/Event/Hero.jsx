import Header from "@/components/Common/Header/Header";
import React, { useEffect, useRef, useState } from "react";
import { Daviod } from "../../../../public/svg";
import { MainContainer } from "@/utils/styleReuse";
import ButtonComp from "@/components/Ui/button";
import IfHeaderIsAuth from "@/components/Common/Header/IfHeaderIsAuth";
import moment from "moment";
import { useObject } from "@/Context/ObjectProvider";
import { formatMoney } from "@/utils/formatMoney";
import { GetTransformedImageUrl } from "@/utils/reusableComponent";

export default function Hero({
  notEvent = true,
  router,
  openModal,
  openModalLoginSignUp,
  giftTicket,
  openModalShareEvent,
  HeroSectionEvent,
  makePayment,
  IsBought,
  myShowLoader,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { setMyObject } = useObject();
  const [event, setEvent] = useState();
  const { myObject } = useObject();

  console.log(HeroSectionEvent,'HeroSectionEvent')

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

  function DropdownMenu() {
    return (
      <div className=" absolute dropdownIII transform translate-x-0 -translate-y-[60px] z-50">
        <div className=" bg-[#1B1C20] border-[1px] text-left border-[#343F4B] text-[13px] md:text-[14px] text-white  rounded-[16px] md:w-[327px] w-[80vw]     px-[40px] py-[24px]">
          <div className="py-[12px] cursor-pointer " onClick={giftTicket}>
            Gift ticket
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
              href={`https://calendar.google.com/calendar/r/eventedit?text=${HeroSectionEvent?.name}&dates=${HeroSectionEvent?.event_date}&details=<b>${HeroSectionEvent?.name}</b>
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
              <b>Time:</b>${ moment(HeroSectionEvent?.event_date).format('h:mm')}
              &location=${HeroSectionEvent?.address}&sf=true&output=xml`}
            >
              Set Reminder
            </a>
          </div>
        </div>
      </div>
    );
  }

  // console.log(HeroSectionEvent,'HeroSectionEvent')
  //bg-[url('/webp/bg1.webp')]
  return (
    <div
      className={`relative font400   bg-cover bg-center  xl:bg-top ${MainContainer} `}
      style={{
        backgroundImage:
          HeroSectionEvent?.thumbnail_url &&
          `url(${GetTransformedImageUrl(
            HeroSectionEvent?.thumbnail_url,
            1140,
            1830
          )})`,
        backgroundAttachment: "fixed",
      }}
    >
      <div className="">
        <div className="absolute left-0 right-0">
          <IfHeaderIsAuth
            openModal={openModalLoginSignUp || openModal}
            className="absolute top-0 left-0 right-0"
          />
        </div>
        <div className="relative">
          <div className=" min-h-[100dvh] md:min-h-screen relative flex flex-col justify-end  ">
            {/* <div className="h-[100vh]" /> */}

            <div
              className={`relative z-40  mt-[40vh] flex flex-col  md:justify-start items-center md:items-start  text-center  md:text-start`}
            >
              <div className="hidden md:block">
              <Daviod />
              </div>
              <div className="block md:hidden">
              <Daviod width="77" height="35" />
              </div>
              <div className="mt-[16px] text-[36px] lg:text-[92px] md:text-left font-1 text-white font-bold uppercase lg:mb-[32px] leading-[40px] md:leading-[46px] lg:leading-[90px] lg:w-[75%] line-clamp-3">
                {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam odit vitae repudiandae voluptate ea deleniti ex eligendi sapiente modi. Beatae quidem magnam quis labore atque sit placeat quae itaque ullam! */}
                {HeroSectionEvent?.address}
              </div>
              {/*  */}
              {notEvent ? (
                <div>
                  <div className="mb-[100px] hidden lg:flex gap-[16px] items-center ">
                    <ButtonComp
                      className={`py-[12px] px-[39px] text-[13px] xl:text-[15px] font500`}
                      btnText={"Learn More"}
                      onClick={() => {
                        setMyObject(HeroSectionEvent);
                        router.push({
                          pathname: `event/${HeroSectionEvent?._id}`,
                        });
                      }}
                    />
                    <div className="text-[13px] xl:text-[16px]  text-[#B4BECB] z-10 relative font500">
                      {HeroSectionEvent?.event_date !== "Event Date"
                        ? moment(HeroSectionEvent?.event_date).format(
                            "MMMM DD, YYYY"
                          )
                        : `April 17, 2024`}{" "}
                      - Watch live
                    </div>
                  </div>
                  <div className="text-center mt-[20px] lg:mt-[40px] lg:hidden mb-[42px] font500">
                    <div className="text-[#B4BECB] text-[13px] md:text-[15px] z-10 relative mb-[24px] font500">
                      April 17, 2024 - Watch live
                    </div>

                    <div>
                      <ButtonComp
                        className={`py-[12px] px-[57px] text-[13px] md:text-[15px] font500 `}
                        btnText={"Learn More"}
                        onClick={() => router.push("/event/1")}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className=" w-full relative ">
                  <div ref={dropdownRef}>
                    <div className="mb-[100px] hidden md:flex gap-[16px] items-center relative">
                      {isOpen && <DropdownMenu />}
                      <ButtonComp
                        isDisabled={
                          !HeroSectionEvent?.ticket?.code ||
                          IsBought ||
                          myShowLoader
                        }
                        onClick={
                          IsBought ? console.log("purchase Alery") : openModal
                        }
                        className={`py-[12px] px-[39px] text-[13px] xl:text-[15px] font500`}
                        btnText={
                          IsBought
                            ? `Ticket already purchased`
                            : `Get Ticket - ${
                                HeroSectionEvent?.ticket?.code || ""
                              } ${formatMoney(
                                HeroSectionEvent?.ticket?.price || " ",
                                true
                              )}`
                        }
                      />
                      <div className="" onClick={() => setIsOpen(!isOpen)}>
                        <img
                          src="/webp/dots.png"
                          className="h-[44px] cursor-pointer"
                        />
                      </div>

                      <div className="text-[13px] xl:text-[16px]  text-[#B4BECB] z-10 relative font500">
                        April 17, 2024 - Watch live
                      </div>
                    </div>
                    <div className="text-center mt-[40px] md:hidden mb-[42px] relative">
                      {isOpen && <DropdownMenu />}
                      <div className="text-[#B4BECB] text-[13px] md:text-[15px] z-10 relative mb-[24px] font500">
                        April 17, 2024 - Watch live
                      </div>
                      <div className="flex items-center justify-center gap-3">
                        <ButtonComp
                          isDisabled={
                            !HeroSectionEvent?.ticket?.code ||
                            IsBought ||
                            myShowLoader
                          }
                          onClick={openModal}
                          className={`py-[12px] px-[20px] md:px-[34px] lg:px-[57px] text-[13px] md:text-[15px] font500 `}
                          btnText={
                            IsBought
                              ? `Ticket already purchased`
                              : `Get Ticket - ${
                                  HeroSectionEvent?.ticket?.code || ""
                                } ${formatMoney(
                                  HeroSectionEvent?.ticket?.price || " ",
                                  true
                                )}`
                          }
                        />
                        <div onClick={() => setIsOpen(!isOpen)}>
                          <img
                            src="/webp/dots.png"
                            className="h-[44px] cursor-pointer"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className=" absolute bottom-0 left-0 right-0 h-[50vh]   bg-contain xl:bg-cover !bg-no-repeat bg-gradient-to-t from-black"></div>
    </div>
  );
}
