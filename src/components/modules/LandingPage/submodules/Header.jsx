import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import ButtonComp from "@/components/Ui/button";
import { eventLink, liveTvLink, onDemandLink } from "@/utils/reusableComponent";
export default function Header({ className, openModal }) {
  const router = useRouter();
  const isHome = router?.pathname === "/";
  const MainContainer = `px-[20px] md:px-[40px] lg:px-[120px] relative`;
  const [dropDown, setDropDown] = useState(false);
  const isFocused = ` hover:!bg-[#BAD6F70F] hover:rounded-[999px] hover:border-[#262C32] hover:border-[0px] hover:font500  hover:backdrop-blur-[60px]`;
const isSelected=`border-[#262C32] border-[1px] backdrop-blur-[60px] !bg-[#BAD6F70F]  `
  const handleCheckIfITHome = () => {
    isHome && setDropDown(false);
  };

  const MenuDropdown = () => {
    return (
      <div className=" left-0 right-0 top-0 bottom-0 z-[99]   overflow-hidden  flex flex-col fixed  lg:hidden  backdrop-blur-[15px] ">
        <div className="bg-[#1B1C20E5] navbar-background px-[24px] py-[14px] lg:py-[30px] rounded-b-[12px]">
          <div className="flex justify-between items-center mb-[28px] ">
            <div className="text-white">
              {" "}
              <Image
                onClick={() => router.push("/")}
                src="/svg/logo.svg"
                width={87}
                height={16}
                alt="Picture of the author"
                className="md:hidden "
              />
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
              onClick={() => handleCheckIfITHome()}
              href={eventLink}
              className="py-[15px]  cursor-pointer no-underline text-white "
            >
              Browse Events
            </Link>
            
            <Link
              onClick={() => handleCheckIfITHome()}
              href={liveTvLink}
              className="py-[15px]  cursor-pointer no-underline text-white"
            >
              Live TV
            </Link>
            
            <Link
              onClick={() => handleCheckIfITHome()}
              href={onDemandLink}
              className="py-[15px]  cursor-pointer no-underline text-white"
            >
              On Demand
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

  // bg-[url('/webp/header.png')]
  return (
    <>
      {dropDown && <MenuDropdown />}

      <div
        className={`py-[16px] font400 ${className} ${MainContainer}`}
      >
        <div
          className="absolute left-0 right-0 top-0 bottom-0 bg-cover  
       
        bg-[#06080933]
        z-30  backdrop-blur-[10px]"
        ></div>
        {/* <LogoWhite/> */}
        <div className="flex justify-between z-50 relative cursor-pointer">
          <Image
            onClick={() => router.push("/")}
            src="/svg/logo.svg"
            width={148}
            height={23}
            alt="Picture of the author"
            className="hidden md:block"
          />
          <Image
            onClick={() => router.push("/")}
            src="/svg/logo.svg"
            width={87}
            height={16}
            alt="Picture of the author"
            className="md:hidden "
          />

          <div className="flex items-center gap-[24px]">
            <ButtonComp
              btnText="Browse Events"
              className={`text-[13px] font-medium  hidden lg:block !py-11px] !px-[32px] gap-[10px] bg-transparent rounded-[999px]  font500 text-white  focus:${isFocused}`}
              onClick={()=>router.push(eventLink)}
            />
            
            <ButtonComp
              btnText="Live TV"
              className={`text-[13px] font-medium  hidden lg:block !py-11px] !px-[32px] gap-[10px] !bg-transparent rounded-[999px]   font500 text-white ${isFocused} `}
              onClick={()=>router.push(liveTvLink)}
            />
            
            <ButtonComp
              btnText="On Demand"
              className={`text-[13px] font-medium  hidden lg:block !py-11px] !px-[32px] gap-[10px] !bg-transparent rounded-[999px]   font500 text-white ${isFocused} `}
              onClick={()=>router.push(onDemandLink)}
            />
          </div>
          <div>
            <div className="hidden lg:flex  gap-x-[40px] items-center ">
              <ButtonComp
                onClick={() => openModal("Login")}
                btnText="Login"
                className="px-[16px] !h-[32px]  text-[13px] font500 md:h-fit border-[#262C32] rounded-[999px] border-[1px] !bg-[#25272d] !text-white buttonClose"
              />
              <ButtonComp
                onClick={() => openModal("SignUp")}
                btnText="Sign Up"
                className="px-[16px] !h-[32px]  text-[13px] font500 md:h-fit border-[#262C32] rounded-[999px] border-[1px] !bg-[#25272d] !text-white buttonClose"
              />
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
      </div>
    </>
  );
}
