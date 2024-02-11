import React, { useState } from "react";
import Image from "next/image";
import ButtonComp from "../Ui/button";
import { useRouter } from "next/router";

export default function Header({ className, openModal }) {
  const router = useRouter();
  const MainContainer = `px-[20px] md:px-[60px] lg:px-[120px] relative`;
  const [dropDown,setDropDown]=useState(false)

  const MenuDropdown = () => {
    return (
      <div className="bg-[#1B1C20]  left-0 right-0 top-0 bottom-0 z-[99] px-[24px] py-[14px] overflow-hidden h-[100vh]  flex flex-col fixed">
        <div className="flex justify-between items-center mb-[28px] ">
          <div>
            {" "}
            <Image
              onClick={() => router.push("/")}
              src="/svg/Kommerce logo.svg"
              width={148}
              height={23}
              alt="Picture of the author"
            />
          </div>
          <div>
            <ButtonComp
              btnText={`close`}
              className={`px-[24px] py-[8px] text-[13px] font500 h-fit border-[#262C32] border-[1px] !bg-[#25272d] !text-white`}
              onClick={()=>setDropDown(false)}
            />
          </div>
        </div>
        <div className="text-[15px] text-white font500 flex-1 ">
          <div className="py-[12px]  cursor-pointer">Browse events</div>
          <div className="py-[12px]  cursor-pointer">On demand</div>
        </div>

        <ButtonComp
          onClick={openModal}
          btnText={`Log In/Sign Up`}
          className={`text-[13px] font500 mb-[32px] `}
        />
      </div>
    );
  };
  return (
    <>
     {dropDown&& <MenuDropdown />}

      <div
        className={`pt-[14px] md:pt-[30px] xl:pt-[55px] pb-[98px]  font400 ${className} ${MainContainer}`}
      >
         <div className="absolute left-0 right-0 top-0 bottom-0 header  z-30"></div>
        {/* <LogoWhite/> */}
        <div className="flex justify-between z-50 relative cursor-pointer">
          <Image
            onClick={() => router.push("/")}
            src="/svg/Kommerce logo.svg"
            width={148}
            height={23}
            alt="Picture of the author"
          />

          <div className="flex items-center gap-[24px]">
            <ButtonComp
              btnText="Browse event"
              className="text-[15px] font-medium  hidden lg:block !py-11px] !px-[32px] gap-[10px] !bg-[#BAD6F70F] rounded-[999px] border-[#262C32] border-[1px] font500 text-white backdrop-blur-[60px]"
            />
            <ButtonComp
              btnText="On demand"
              className="text-[15px] font-medium  hidden lg:block !py-11px] !px-[32px] gap-[10px] !bg-transparent rounded-[999px]   font500 text-white backdrop-blur-[60px]"
            />
          </div>
          <div>
            <ButtonComp
              onClick={openModal}
              btnText="Log In / Sign Up"
              className="text-[13px] font-medium hidden lg:block font500"
            />
            <ButtonComp
            onClick={()=>setDropDown(true)}
              btnText="Menu"
              className="text-[13px] font-medium  lg:hidden !py-[8px] !px-[24px] gap-[10px] !bg-[#BAD6F70F] rounded-[999px] border-[#262C32] border-[1px] font500 text-white backdrop-blur-[60px] h-fit"
            />
          </div>
        </div>
      </div>
    </>
  );
}
