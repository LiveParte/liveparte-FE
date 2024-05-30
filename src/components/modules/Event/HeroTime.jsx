// import Header from "@/components/Common/Header";
import React from "react";
// import { Daviod } from "../../../../public/svg";
import { MainContainer } from "@/utils/styleReuse";
import ButtonComp from "@/components/Ui/button";
import { useSelector } from "react-redux";
import { selectEvent } from "@/store/User";

export default function HeroTime({ notEvent = true,router,onClick }) {
  const eventSelected =useSelector(selectEvent);
  console.log(eventSelected,'eventSelected')
  return (
    <div
      className={`relative font400  bg-[url('/webp/bg1.png')] bg-cover bg-center  xl:bg-left ${MainContainer} grayscale flex-1`}
      style={{backgroundImage: `url('${eventSelected?.thumbnail_url}')`,
      backgroundAttachment: "fixed", }}
    >
      <div className="h-full">
        
        <div className="relative z-40 h-full">
          <div className=" relative flex flex-col justify-center items-center h-full">
            {/* <div className="h-[20vh]" /> */}
            <div className="text-[92px] font-1 font-bold text-white uppercase mb-[16px] leading-none text-center">Time’s up</div>
            <div className="text-[#B4BECB] text-[13px] mb-[48px]">Go back to the event details and try again</div>
            <ButtonComp
            onClick={onClick}
            btnText={'Back To Event'}
            className={`text-[13px] lg:text-[15px] font500 bg-white px-[32px] py-[12px]`}
            />
          </div>
        </div>
      </div>
      <div className=" absolute -bottom-1 left-0 right-0 h-[100vh]   bg-contain xl:bg-cover !bg-no-repeat bg-gradient-to-t from-black"></div>
    </div>
  );
}
