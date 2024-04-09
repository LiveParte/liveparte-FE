import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from 'next/link'
import ButtonComp from "@/components/Ui/button";
import  { HeaderOnSelect, MainContainer } from "@/utils/styleReuse";
import { eventLink, myShow, myShowLink, onDemandLink, singleEventLink } from "@/utils/reusableComponent";
import LogoImage2 from "@/utils/LogoImage";
export default function Header({ className, openModal }) {
  const router = useRouter();
  const isHome =router?.pathname==="/";
  const isEvents =router?.pathname===eventLink;
  // const MainContainer = `px-[20px] md:px-[40px] lg:px-[120px] relative`;
  const [dropDown, setDropDown] = useState(false);
  const isMyShow =router?.pathname==myShow
  const isEvent =router?.pathname===eventLink || router?.pathname==singleEventLink
  const isOnDemand =router?.pathname===onDemandLink
  const isFocused =`hover:!bg-[#FFFFFF26] hover:rounded-[8px]  hover:border-[0px] hover:font500  hover:backdrop-blur-[60px]`
  const isSelected =HeaderOnSelect
  const handleCheckIfITHome = () =>{
    isHome&&setDropDown(false)
  }

  const MenuDropdown = () => {
    return (
      <div className="bg-[#1B1C20]  left-0 right-0 top-0 bottom-0 z-[99] px-[24px] py-[14px] lg:py-[30px] overflow-hidden  flex flex-col fixed ">
        <div className="flex justify-between items-center mb-[28px] ">
          <div className="text-white">
            {" "}
            <LogoImage2 router={router}/>
            {/* <MyPage router={router}/> */}
            {/* Logo */}
          </div>
          <div>
            <ButtonComp
              btnText={`Close`}
              className={`px-[24px] !h-[30px] text-[13px] font500 md:h-fit border-[#262C32] border-[1px] !bg-[#25272d] !text-white !rounded-full`}
              onClick={() => setDropDown(false)}
            />
          </div>
        </div>
        <div className="text-[15px] text-white font500 flex-1 flex flex-col">
          <Link onClick={handleCheckIfITHome} href={eventLink} className="py-[25px]  cursor-pointer no-underline text-white">Browse Events</Link>
          <Link onClick={handleCheckIfITHome} href={eventLink} className="py-[12px]  cursor-pointer no-underline text-white">On Demand</Link>
        </div>

        {/* <ButtonComp
          onClick={()=>openModal('SignUp')}
          btnText={`Log In/Sign Up`}
          className={`text-[13px] font500  `}
        /> */}
         <ButtonComp
            onClick={() => openModal("SignUp")}
            btnText={`Sign Up`}
            className={`text-[13px] font500 mb-[16px]  w-full`}
          />
          <ButtonComp
            onClick={() => openModal(`Login`)}
            btnText={`Login`}
            className={`text-[13px] font500 mb-[0px]  w-full !bg-[#27292e] text-white`}
          />
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
        <div className="flex justify-between   cursor-pointer relative  z-90" style={{zIndex:90}}>
          <LogoImage2/>
        {/* <LogoImage router={router}/> */}

          <div className="flex items-center gap-[24px]">
            <ButtonComp
              btnText="Browse Events"
              className={` font-medium  hidden lg:block  px-[16px] md:px-[32px] bg-transparent  gap-[10px]  !border-none  font500 text-white  ${isFocused} ${isEvent &&isSelected}  text-[13px]   !h-[32px]`}
              onClick={() => router.push(eventLink)}
            />
            <ButtonComp
              btnText="On Demand"
              className={` font-medium  hidden lg:block !py-11px] !px-[32px] gap-[10px] !bg-transparent    font500 text-white ${isFocused}   text-[13px] ${isOnDemand &&isSelected}  !h-[32px]`}
              onClick={() => router.push(onDemandLink)}
            />
          </div>
          <div>
            <div className="hidden lg:flex  gap-x-[40px] items-center">
            <ButtonComp
              onClick={()=>openModal('Login')}
              btnText="Log In"
              className="text-[13px] font-medium font500 bg-transparent px-0 text-white font500"
            />
            <ButtonComp
                onClick={()=>openModal('SignUp')}
              btnText="Sign Up"
              className="text-[13px] font-medium font500 px-[40px] py-[12px]"
            />
            </div>
            <ButtonComp
              onClick={() => setDropDown(true)}
              btnText="Menu"
              className="text-[13px] font-medium  lg:hidden !h-[30px] !px-[24px] gap-[10px] !bg-[#BAD6F70F] rounded-[999px] border-[#262C32] border-[1px] font500 text-white backdrop-blur-[60px] md:h-fit "
            />
          </div>
        </div>
      </div>
    </>
  );
}
