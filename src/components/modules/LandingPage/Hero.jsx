import React, { useEffect, useRef, useState } from "react";
import { Daviod } from "../../../../public/svg";
import { MainContainer } from "@/utils/styleReuse";
import ButtonComp from "@/components/Ui/button";
import Header from "./submodules/Header";

export default function Hero({ notEvent = true,router,openModal,openModalLoginSignUp,giftTicket }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

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

  function DropdownMenu (){
    return   <div className=" absolute dropdownIII transform translate-x-0 -translate-y-[60px] z-50">
    <div className=" bg-[#1B1C20] border-[1px] text-left border-[#343F4B] text-[13px] md:text-[14px] text-white  rounded-[16px] md:w-[327px] w-[80vw]     px-[40px] py-[24px]">
      <div className="py-[12px] cursor-pointer " onClick={giftTicket}>Gift a ticket</div>
      <div className="py-[12px]">Share Event</div>
      <div className="py-[12px]">Add to Calendar</div>
    </div> 
   </div>
  }
    
  
  return (
    <div
      className={`relative font400  bg-[url('/webp/1.png')]  bg-cover  xl:bg-left ${MainContainer} `}
    >
      <div className="">
       <div className="absolute left-0 right-0">
       <Header openModal={openModalLoginSignUp||openModal}  className="absolute top-0 left-0 right-0" />
       </div>
        <div className="relative">
          <div className="  h-[100vh] relative flex flex-col justify-end  ">
            <div className="h-[20vh]" />
            
            <div
              className={`relative z-40  flex flex-col  md:justify-start items-center md:items-start  text-center  md:text-start`}
            >
            <div className="">
            <div className="font-1 text-[50px] md:text-[80px] lg:text-[112px] font-bold text-white uppercase mb-[8px] lg:mb-[16px] text-start leading-none md:leading-[110px] md:flex lg:gap-3 items-center">Never miss the <div className="text-[#FFC41B]">events</div></div>
             <div className="text-white lg:w-[37vw] mb-[40px] text-start md:text-[20px] font400">
             Get direct access to live and on-demand concert, performances by your award-winning artistes and comedians anywhere in the world from the comfort of your devices
             </div>

            <div className="flex mb-[40px] md:mb-[120px]">
            <ButtonComp
             btnText={`Browse Events`}
             className={`text-start text-[13px] font500  py-[12px] px-[31px]`}
             />
            </div>
            </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" absolute bottom-0 left-0 right-0 h-[50vh]   bg-contain xl:bg-cover !bg-no-repeat bg-gradient-to-t from-black"></div>
    </div>
  );
}
