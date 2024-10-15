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
            btnText={`Sign Up`}
            className={`text-[13px] font500 mb-[16px]  w-full`}
          />
          <ButtonComp
            onClick={() => openModal(`Login`)}
            btnText={`Login`}
            className={`text-[13px] font500 mb-[25px]  w-full !bg-[#27292E] text-white`}
          />
        </div>
      </div>
    );
  };
  return (
    <>
      {dropDown && <MenuDropdown />}

      <div
        className={`pt-[14px]  lg:pt-[16px] pb-[16px]  font400 ${className} ${MainContainer} relative z-50`}
      >
        <div className="absolute left-0 right-0 top-0 bottom-0 bg-cover  bg-[url('/webp/header.png')] z-30 opacity-25 pointer-events-none"></div>
        {/* <LogoWhite/> */}
        <div
          className="flex justify-between   cursor-pointer relative  z-90 items-center"
          style={{ zIndex: 90 }}
        >
          <LogoImage router={router} />
          {/* <LogoImage router={router}/> */}

          <div className="flex items-center justify-between lg:gap-[24px]">
            <ButtonComp
              btnText="Browse Events"
              className={` font-medium  hidden lg:block  px-[16px] bg-transparent  gap-[10px]  !border-none  font500 text-white  ${isFocused} ${
                isEvent && isSelected
              }  text-[13px]   !h-[32px]`}
              onClick={() => {
                router.push(eventLink);
              }}
            />
            <ButtonComp
              btnText="On Demand"
              className={` font-medium  hidden lg:block !py-[11px]  gap-[10px] !bg-transparent   font500 text-white ${isFocused}   text-[13px] ${
                isOnDemand && isSelected
              }  !h-[32px]`}
              onClick={() => {
                router.push(onDemandLink);
              }}
            />
            <ButtonComp
              btnText="For Entertainers"
              className={` font-medium  hidden lg:block !py-[11px]  gap-[10px] !bg-transparent    font500 text-white ${isFocused}   text-[13px] ${
                isOnDemand && isSelected
              }  !h-[32px]`}
              onClick={() => {
                router.push(entertainersLink);
              }}
            />
            {/* <Link href="/entertainers" className={`font-mattersq font-semibold text-[15px] leading-[14px] tracking-[-0.12px] ${isActive('/entertainers') ? 'text-red.300' : ''}`}>
                        <div className='font-mattersq font-semibold text-[15px] leading-[14px] tracking-[-0.12px]'>For Entertainers</div>
                    </Link> */}
          </div>
          <div>
            <div className="hidden lg:flex  gap-x-[40px] items-center">
              <ButtonComp
                onClick={() => openModal("Login")}
                btnText="Log In"
                className="text-[13px] font-medium font500 bg-transparent px-0 text-white font500"
              />
              <ButtonComp
                onClick={() => openModal("SignUp")}
                btnText="Sign Up"
                className="text-[13px] font-medium font500 px-[40px] py-[12px] text-black"
              />
            </div>
            <ButtonComp
              onClick={() => {
                setDropDown(true);
                // handlePreventScroll(true);
              }}
              btnText="Menu"
              className="text-[13px] font-medium  lg:hidden !h-[30px] !px-[24px] gap-[10px] !bg-[#BAD6F70F] rounded-[999px] border-[white] border-[1px] font500 text-white backdrop-blur-[60px] md:h-fit "
            />
          </div>
        </div>
      </div>
    </>
  );
}
