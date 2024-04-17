import React, { useEffect, useMemo, useRef, useState } from "react";
import { MainContainer } from "@/utils/styleReuse";
import ButtonComp from "@/components/Ui/button";
import dynamic from "next/dynamic";
import IfHeaderIsAuth from "@/components/Common/Header/IfHeaderIsAuth";
import Animate from "./submodules/Animate";
// const Animate =dynamic(()=>import('./submodules/Animate'),{ssr:false});
import { motion, AnimatePresence } from "framer-motion";
import { eventLink } from "@/utils/reusableComponent";
import { useRouter } from "next/router";

export default function Hero({
  // notEvent = true,
  // router,
  openModal,
  openModalLoginSignUp,
  // giftTicket,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const router =useRouter()

  //
  const [textChange, setTextChange] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  // const words = ["Concerts", "Groove", "Parte", "Event"];
  const words = useMemo(() => ["Concerts", "Groove", "Parte", "Event"], []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 4000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    setTextChange(words[currentIndex]);
  }, [currentIndex]);

  return (
    <div className="relative min-h-[90vh]  md:min-h-[100vh]">
      
      <div
        className={`absolute left-0 right-0 top-0 bottom-0 ${MainContainer}`}
      >
        {/* <div className="absolute left-0 right-0 z-50">
          <IfHeaderIsAuth
            openModal={openModal}
            openModalLoginSignUp={openModalLoginSignUp}
          />
        </div> */}
        <div className="relative">
          <div className="  min-h-[100dvh] md:min-h-screen relative flex flex-col justify-end md:justify-end  ">
            {/* <div className="h-[45vh] md:h-[20vh]" /> */}

            <div
              className={`relative z-40 mt-[20vh] flex flex-col  md:justify-start items-start md:items-start   md:text-start`}
            >
              <div className="">
                <div className="font-1 text-wrap flex-wrap text-[28px] sm:text-[35px]  md:text-[70px] lg:text-[100px] font-bold text-white uppercase mb-[15px] md:mb-[8px] lg:mb-[16px] md:text-start leading-none md:leading-[110px] flex   items-start ">
                  Never miss the{" "}
                  <span key={textChange} className="invisible">
                    .
                  </span>
                  <div className="text-[#FFC41B]">
                    {textChange}
                    {/* <span className="inline-block animate-bounce">Okay</span> */}

                    {/* <Animate textChange={textChange} /> */}
                  </div>
                </div>
                <div className="text-white w-[75vw] md:w-[65vw] lg:w-[45vw]  lg:tracking-normal  mb-[80px] md:mb-[60px] :-text-start md:text-start text-[13px] md:text-[20px] font400">
                  Get direct access to live and on-demand concert, performances
                  by your award-winning artistes and comedians anywhere in the
                  world from the comfort of your devices
                </div>

                <div className="hidden md:flex mb-[40px] md:mb-[70px] lg:mb-[80px] ">
                  <ButtonComp
                    btnText={`Browse Events`}
                    className={`text-start text-[13px] font500  py-[12px] px-[31px]`}
                    onClick={() => router.push(eventLink)}
                  />
                </div>
                <div className=" md:hidden  md:mb-[120px] fixed left-0 right-0 -bottom-[2px]">
                  <ButtonComp
                    btnText={`Browse Events`}
                    className={` text-[15px] font500  py-[12px] px-[31px] w-full text-center h-[70px] rounded-none`}
                    onClick={() => router.push(eventLink)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <AnimatePresence key={textChange}> */}

      <video
        autoPlay
        loop
        muted
        className="absolute left-0 right-0 top-0 bottom-0  h-[90vh] md:h-[100vh] w-[100vw] object-cover "
        poster="/webp/1.webp"
      >
        <source
          src={`https://res.cloudinary.com/dammymoses/video/upload/v1708675597/LiveParte/Screen_Recording_2024-02-18_at_19.05.07_wa31aj.mov`}
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      <div
        className={` font400  bg-[url('/webp/1.webp')]  bg-cover  xl:bg-left ${MainContainer} `}
      >
        <div className=" absolute  bottom-0 left-0 right-0 h-[60vh] md:h-[80vh]   bg-contain xl:bg-cover !bg-no-repeat bg-gradient-to-t from-black"></div>
      </div>
      {/* </AnimatePresence> */}
    </div>
  );
}
