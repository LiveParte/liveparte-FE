import { LogoImage } from "@/utils/styleReuse";
import React from "react";
import UserProfile from "../../UserProfile";
import { FullScreenIcon, ThreeDotSmall } from "../../../../../public/svg";

export default function HeaderMd({
  setIsOpen,
  isOpen,
  ProfileDropdown,
  isLoading = false,
  isLive = false,
  setIsOpenII,
  isOpenII,
  ShareAndGiftDropdown,
  handleOpenModalAll,
  setFullScreenModal,
}) {
  return (
    <div>
 <div className=" items-center justify-between  hidden md:flex">
     <div className="pt-[12px] lg:pt-[32px] pb-[27px] ">
       <LogoImage />
     </div>
     {isOpen && <ProfileDropdown />}
     <UserProfile onClick={() => setIsOpen(!isOpen)} />
   </div>
    <div className="md:hidden">
      <div className="absolute  left-0 right-0 px-[16px] lg:px-[18px] top-0 py-[17px] flex justify-between text-white z-30 bg-gradient-to-b h-[100px] items-start from-black lg:rounded-[16px]">
        {!isLoading && (
          <div className="flex justify-between items-center w-full">
            {isLive ? (
              <div className="flex items-center gap-[8px]">
                <div className="h-[8px] w-[8px] rounded-full bg-[#FA4354]"></div>
                <div className="font500 text-[13px] tracking-[0.48px] leading-none ">
                  Live
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-[8px]">
                <div className="h-[8px] w-[8px] rounded-full bg-black"></div>
                <div className="font500 text-[13px] tracking-[0.48px] leading-none ">
                  On Demand
                </div>
              </div>
            )}
            {/* <div>Hello</div> */}
            <div className=" " onClick={() => setIsOpenII(!isOpenII)}>
              {isOpenII && <ShareAndGiftDropdown />}
              <ThreeDotSmall/>
            </div>
            <div
              className="text-[13px]  gap-[8px] items-center hidden lg:flex cursor-pointer"
              onClick={() => handleOpenModalAll(setFullScreenModal)}
            >
              <FullScreenIcon />
              Fullscreen
            </div>
          </div>
        )}
      </div>
    </div>
    </div>
  
  );
}
