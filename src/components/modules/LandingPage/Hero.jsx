import React, { useEffect, useRef, useState } from "react";
import { Daviod } from "../../../../public/svg";
import { MainContainer } from "@/utils/styleReuse";
import ButtonComp from "@/components/Ui/button";
import Header from "./submodules/Header";
import { motion, AnimatePresence } from "framer-motion";

export default function Hero({
  notEvent = true,
  router,
  openModal,
  openModalLoginSignUp,
  giftTicket,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  //
  const [textChange, setTextChange] = useState("Event");
  const words = ["Concerts", "Groove", "Parte", "Event"]; // Array of words to cycle through
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // Increment currentWordIndex to rotate through the words
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
      // Fade out the text and then update it after a delay
      setTimeout(() => {
        setTextChange(words[currentWordIndex]);
      }, 1000); // Adjust the delay time as needed
    }, 2000); // Change word every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [currentWordIndex, words]);

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


  return (
    <AnimatePresence>
      <div
        className={`relative font400  bg-[url('/webp/1.png')]  bg-cover  xl:bg-left ${MainContainer} `}
      >
        <div className="">
          <div className="absolute left-0 right-0">
            <Header
              openModal={openModalLoginSignUp || openModal}
              className="absolute top-0 left-0 right-0"
            />
          </div>
          <div className="relative">
            <div className="  min-h-[100vh] relative flex flex-col justify-center md:justify-end  ">
              <div className="h-[45vh] md:h-[20vh]" />

              <div
                className={`relative z-40  flex flex-col  md:justify-start items-center md:items-start   md:text-start`}
              >
                <div className="">
                  <div className="font-1 text-wrap flex-wrap text-[50px] md:text-[70px] lg:text-[112px] font-bold text-white uppercase mb-[20px] md:mb-[8px] lg:mb-[16px] md:text-start leading-none md:leading-[110px] flex gap-x-4 lg:gap-6 items-center ">
                    Never miss the{" "}
                    <span className="text-[#FFC41B]">
                      {/* HELEOEOEOEOEOEO */}
                      <motion.div
                        key={textChange}
                        className="text-[#FFC41B]"
                        initial={{ opacity: 0, y:50 }} // Initial position and opacity
                        animate={{ opacity: 1, y: 0 }} // Animation to fade in and move up
                        exit={{ opacity: 0, y: -100 }} // Animation to fade out
                        transition={{ duration: 0.5 }} // Duration of the animation
                        onPause={true}
                      >
                        {textChange}
                      </motion.div>
                    </span>
                  </div>
                  <div className="text-white lg:w-[37vw] mb-[40px] :-text-start md:text-start md:text-[20px] font400">
                    Get direct access to live and on-demand concert,
                    performances by your award-winning artistes and comedians
                    anywhere in the world from the comfort of your devices
                  </div>

                  <div className="hidden md:flex mb-[40px] md:mb-[120px] ">
                    <ButtonComp
                      btnText={`Browse Events`}
                      className={`text-start text-[13px] font500  py-[12px] px-[31px]`}
                      onClick={()=>router.push('/event')}
                    />
                  </div>
                  <div className=" md:hidden  md:mb-[120px] fixed left-0 right-0 -bottom-[2px]">
                    <ButtonComp
                      btnText={`Browse Events`}
                      className={` text-[15px] font500  py-[12px] px-[31px] w-full text-center h-[70px] rounded-none`}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" absolute bottom-0 left-0 right-0 h-[50vh]   bg-contain xl:bg-cover !bg-no-repeat bg-gradient-to-t from-black"></div>
      </div>
    </AnimatePresence>
  );
}
