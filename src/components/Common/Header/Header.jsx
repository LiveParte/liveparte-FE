import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import ButtonComp from "@/components/Ui/button";
import { HeaderOnSelect, LogoImage, MainContainer } from "@/utils/styleReuse";
import {
  entertainersLink,
  eventLink,
  myShowLink,
  onDemandLink,
  singleEventLink,
  liveTvLink,
} from "@/utils/reusableComponent";
import LogoImage2 from "@/utils/LogoImage";
import { useObject } from "@/Context/ObjectProvider";


export default function Header({ className, openModal }) {
  const router = useRouter();
  const {handlePreventScroll} =useObject();
  const isHome = router?.pathname === "/";
  const isEvents = router?.pathname === eventLink;
  // const MainContainer = `px-[20px] md:px-[40px] lg:px-[120px] relative`;
  const [dropDown, setDropDown] = useState(false);
  const isEvent =
    router?.pathname === eventLink || router?.pathname == singleEventLink;
  const isOnDemand = router?.pathname === onDemandLink;
  const isLiveTv = router?.pathname === liveTvLink;
  const isEntertainer = router?.pathname === entertainersLink;

  const isFocused = `hover:!bg-[#FFFFFF26] hover:rounded-[8px]  hover:border-[0px] hover:font500  hover:backdrop-blur-[60px]`;
  const isSelected = HeaderOnSelect;
  const handleCheckIfITHome = (link) => {
    router?.pathname === link && setDropDown(false);


    // isHome&&setDropDown(false)
  };

  useEffect(() => {
    if(!dropDown){
      handlePreventScroll(false);
    }
    if(dropDown){
      handlePreventScroll(true);
    }
   
  }, [dropDown,handlePreventScroll])

  useEffect(() => {
    if(!dropDown){
      handlePreventScroll(false);
    }
    if(dropDown){
      handlePreventScroll(true);
    }
   
  }, [dropDown,handlePreventScroll])

  const MenuDropdown = () => {
    return (
      <div className=" left-0 right-0 top-0 bottom-0 z-[99]   overflow-hidden  flex flex-col fixed  lg:hidden  backdrop-blur-[15px] ">
        <div className="bg-[#1B1C20E5] navbar-background px-[24px] py-[14px] lg:py-[30px] rounded-b-[12px]">
          <div className="flex justify-between items-center mb-[28px] ">
            <div className="text-white">
              {" "}
              <LogoImage router={router} />
              {/* <MyPage router={router}/> */}
              {/* Logo */}
            </div>
            <div>
              <ButtonComp
                btnText={`Close`}
                className={`px-[12px] !h-[27px]  text-[11px] font500 md:h-fit border-[#262C32] rounded-[999px] border-[1px] !bg-[#25272d] !text-white buttonClose`}
                onClick={() => {
                  setDropDown(false);
                  // handlePreventScroll(false);
                }}
              />
            </div>
          </div>
          <div className="text-[14px] text-white font500 flex-1 flex flex-col justify-center items-center mb-[45px]">
            <Link
              onClick={() => handleCheckIfITHome(eventLink)}
              href={eventLink}
              className="py-[15px]  cursor-pointer no-underline text-white "
            >
              Browse Events
            </Link>
            
            <Link
              onClick={() => handleCheckIfITHome(liveTvLink)}
              href={liveTvLink}
              className="py-[15px]  cursor-pointer no-underline text-white"
            >
              Live TV
            </Link>
            
            <Link
              onClick={() => handleCheckIfITHome(onDemandLink)}
              href={onDemandLink}
              className="py-[15px]  cursor-pointer no-underline text-white"
            >
              On Demand
            </Link>
            <Link
              onClick={() => handleCheckIfITHome(onDemandLink)}
              href={onDemandLink}
              className="py-[15px]  cursor-pointer no-underline text-white"
            >
              For Entertainers
            </Link>
          </div>

          <ButtonComp
            onClick={() => openModal("SignUp")}
            btnText="Sign Up"
            className="px-[24px] !h-[40px]  text-[14px] font500 md:h-fit border-[#262C32] rounded-[999px] border-[1px] !bg-[#25272d] !text-white buttonClose"
          />
        </div>
      </div>
    );
  };

  return (
    <>
      {dropDown && <MenuDropdown />}

      <div
        className={`bg-black-background pt-[14px]  lg:pt-[16px] pb-[16px]  font400 ${className} ${MainContainer} relative z-50`}
      >
        {/* Remove the background image overlay */}
        <div
          className="flex justify-between   cursor-pointer relative  z-90 items-center"
          style={{ zIndex: 90 }}
        >
          <LogoImage router={router} />
          {/* <LogoImage router={router}/> */}

          <div className="flex items-center justify-between lg:gap-[24px]">
            <div className="flex items-center justify-between lg:gap-[24px]">
              <ButtonComp
                btnText="Home"
                className={` font-medium  hidden lg:block  px-[16px] bg-transparent  gap-[10px]  !border-none  font500 text-white  ${isFocused} ${isHome && isSelected
                  }  text-[13px]   !h-[32px]`}
                onClick={() => {
                  router.push("/");
                }}
              />
              <ButtonComp
                btnText="Live TV"
                className={` font-medium  hidden lg:block !py-[11px]  gap-[10px] !bg-transparent   font500 text-white ${isFocused}   text-[13px] ${isLiveTv && isSelected
                  }  !h-[32px]`}
                onClick={() => {
                  router.push(liveTvLink);
                }}
              />
              <ButtonComp
                btnText="Movies"
                className={` font-medium  hidden lg:block !py-[11px]  gap-[10px] !bg-transparent   font500 text-white ${isFocused}   text-[13px]  !h-[32px]`}
                onClick={() => {
                  router.push("/movies");
                }}
              />
              <ButtonComp
                btnText="Series"
                className={` font-medium  hidden lg:block !py-[11px]  gap-[10px] !bg-transparent   font500 text-white ${isFocused}   text-[13px]  !h-[32px]`}
                onClick={() => {
                  router.push("/series");
                }}
              />
              <ButtonComp
                btnText="Sports"
                className={` font-medium  hidden lg:block !py-[11px]  gap-[10px] !bg-transparent   font500 text-white ${isFocused}   text-[13px]  !h-[32px]`}
                onClick={() => {
                  router.push("/sports");
                }}
              />
              <ButtonComp
                btnText="My List"
                className={` font-medium  hidden lg:block !py-[11px]  gap-[10px] !bg-transparent   font500 text-white ${isFocused}   text-[13px]  !h-[32px]`}
                onClick={() => {
                  router.push("/mylist");
                }}
              />
            </div>

            <div className="flex items-center gap-[16px]">
              {/* Search Icon */}
              <button className="text-white hover:text-gray-300 transition-colors">
                <svg className="w-[20px] h-[20px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              
              {/* Notifications Icon */}
              <button className="text-white hover:text-gray-300 transition-colors relative">
                <svg className="w-[20px] h-[20px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM9 12l2 2 4-4" />
                </svg>
                <div className="absolute -top-1 -right-1 w-[8px] h-[8px] bg-red-500 rounded-full"></div>
              </button>
              
              {/* Profile Dropdown */}
              <div className="flex items-center gap-[8px] cursor-pointer">
                <div className="w-[32px] h-[32px] bg-gray-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-[14px] font-medium">U</span>
                </div>
                <svg className="w-[12px] h-[12px] text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>

          <div className="lg:hidden">
            <ButtonComp
              btnText="Menu"
              className="px-[12px] !h-[27px]  text-[11px] font500 md:h-fit border-[#262C32] rounded-[999px] border-[1px] !bg-[#25272d] !text-white buttonClose"
              onClick={() => {
                setDropDown(true);
                // handlePreventScroll(true);
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
