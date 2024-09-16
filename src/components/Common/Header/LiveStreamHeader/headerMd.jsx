import { LogoImage } from "@/utils/styleReuse";
import React, { memo, useState } from "react";
import UserProfile from "../../UserProfile";
import { FullScreenIcon, ThreeDotSmall } from "../../../../../public/svg";
import { Dropdown, DropdownButton } from "react-bootstrap";

 function HeaderMd({
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

  const [showDropDown,setShowDropDown] =useState(false)
  return (
    <div className="  z-50">
      <div className="absolute  left-0 right-0 px-[16px] lg:px-[18px] top-0 py-[17px] flex justify-between text-white z-30 bg-gradient-to-b h-[8vh] sm:h-[30vh] items-start from-[#060809]  lg:rounded-[16px]">
      <div className="pt-[12px] lg:pt-[32px] pb-[27px]  hidden sm:block">
       <LogoImage />
     </div>
    <div className="hidden md:block">
    {isOpenII && <ProfileDropdown />}
    <UserProfile onClick={() => setIsOpenII(!isOpenII)} />
    </div>
   </div>
    <div className="md:hidden">
      <div className="absolute  left-0 right-0 px-[16px] lg:px-[18px] top-0 py-[17px] flex justify-between text-white z-30 bg-gradient-to-b h-[10vh] sm:h-[30vh] items-start from-[#060809]  lg:rounded-[16px]">
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
                <div className="h-[8px] w-[8px] rounded-full bg-[#FFC41B]"></div>
                <div className="font500 text-[13px] tracking-[0.48px] leading-none ">
                  On Demand
                </div>
              </div>
            )}
            {/* <div>Hello</div> */}
            {/* <DropdownButton
            id="dropdown-basic-button"
            title={
              <div className="#333D474D">
                <ThreeDotSmall />
              </div>
            }
          >
            <Dropdown.Item href="#/action-1" className="p-0 m-0  bg-transparent">
            
            <ShareAndGiftDropdown />
            </Dropdown.Item>
            
          </DropdownButton> */}
            {/* <div className=" " onClick={() => setIsOpenII(!isOpenII)}>
              {isOpenII && <ShareAndGiftDropdown />}
              <ThreeDotSmall/>
            </div> */}
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


export default memo(HeaderMd);