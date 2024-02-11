import Header from "@/components/Common/Header";
import React from "react";
import { Daviod } from "../../../../public/svg";
import { MainContainer } from "@/utils/styleReuse";
import ButtonComp from "@/components/Ui/button";
import { HiDotsHorizontal } from "react-icons/hi";

export default function Hero({ notEvent = true,router,openModal,openModalLoginSignUp }) {
  return (
    <div
      className={`relative font400  bg-[url('/webp/bg1.png')] bg-center bg-cover  xl:bg-left ${MainContainer} `}
    >
      <div className="">
       <div className="absolute left-0 right-0">
       <Header openModal={openModalLoginSignUp||openModal}  className="absolute top-0 left-0 right-0" />
       </div>
        <div className="relative">
          <div className="  h-[100vh] relative flex flex-col justify-end  ">
            <div className="h-[20vh]" />
             {/* dots Modal */}
             {/* <div className="absolute bg-[#1B1C20] border-[1px] border-[#343F4B] text-[14px] text-white bottom-[12vh] lg:bottom-[17vh] md:w-[450px] rounded-[16px] z-[90]  left-[0] right-0 text-left  px-[40px] py-[24px]">
                    <div className="py-[12px]">Gift a ticket</div>
                    <div className="py-[12px]">Share Event</div>
                    <div className="py-[12px]">Add to Calendar</div>
                  </div> */}
                  {/*  */}
            <div
              className={`relative z-40  flex flex-col  justify-start items-center lg:items-start  text-center  lg:text-start`}
            >
              <Daviod />
              <div className="mt-[16px] text-[45px] lg:text-[92px]  font-1 text-white font-bold uppercase mb-[32px] leading-[46px] lg:leading-[90px]">
                Timeless tour - Newyork
              </div>
              {/*  */}
              {notEvent ? (
                <div>
                  <div className="mb-[100px] hidden lg:flex gap-[16px] items-center ">
                    <ButtonComp
                      className={`py-[12px] px-[39px] text-[13px] xl:text-[15px] font500`}
                      btnText={"Learn More"}
                      onClick={() => router.push('/event/1')}
                    />
                    <div className="text-[13px] xl:text-[16px]  text-[#B4BECB] z-10 relative">
                      April 17, 2024 - Watch live
                    </div>
                  </div>
                  <div className="text-center mt-[40px] lg:hidden mb-[42px]">
                    <div className="text-[#B4BECB] text-[13px] md:text-[15px] z-10 relative mb-[24px] font500">
                      April 17, 2024 - Watch live
                    </div>
                 
                    <ButtonComp
                      className={`py-[12px] px-[57px] text-[13px] md:text-[15px] font500 `}
                      btnText={"Learn More"}
                      onClick={() => router.push('/event/1')}
                    />
                  </div>
                </div>
              ) : (
                <div className="relative">
                 
                  <div className="mb-[100px] hidden lg:flex gap-[16px] items-center ">
                    <ButtonComp
                    onClick={openModal}
                      className={`py-[12px] px-[39px] text-[13px] xl:text-[15px] font500`}
                      btnText={"Get Ticket ₦24,000"}
                    />
                    <div>
                      <img src="/webp/dots.png" className="h-[44px] cursor-pointer"/>
                    </div>
                       {/* <div className="border py-[12px] px-[12px] rounded-[8px] cursor-pointer shadow-inner bg-[#5b5e">
                       <HiDotsHorizontal size={20} color="white"/>
                       </div> */}
                    <div className="text-[13px] xl:text-[16px]  text-[#B4BECB] z-10 relative">
                      April 17, 2024 - Watch live
                    </div>
                  </div>
                  <div className="text-center mt-[40px] lg:hidden mb-[42px]">
                    <div className="text-[#B4BECB] text-[13px] md:text-[15px] z-10 relative mb-[24px] font500">
                      April 17, 2024 - Watch live
                    </div>
                    <div className="flex items-center gap-3">
                    <ButtonComp
                      onClick={openModal}
                      className={`py-[12px] px-[20px] md:px-[34px] lg:px-[57px] text-[13px] md:text-[15px] font500 `}
                      btnText={"Get Ticket ₦24,000"}
                    />
                    <div>
                      <img src="/webp/dots.png" className="h-[44px] cursor-pointer"/>
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
