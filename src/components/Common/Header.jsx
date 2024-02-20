import React, { useState } from "react";
import Image from "next/image";
import ButtonComp from "../Ui/button";
import { useRouter } from "next/router";
import Link from 'next/link'
export default function Header({ className, openModal }) {
  const router = useRouter();
  const isHome =router?.pathname==="/"
  const MainContainer = `px-[20px] md:px-[40px] lg:px-[120px] relative`;
  const [dropDown, setDropDown] = useState(false);
  const isFocused =` hover:!bg-[#BAD6F70F] hover:rounded-[999px] hover:border-[#262C32] hover:border-[1px] hover:font500  hover:backdrop-blur-[60px]`

  const handleCheckIfITHome = () =>{
    isHome&&setDropDown(false)
  }

  const MenuDropdown = () => {
    return (
      <div className="bg-[#1B1C20]  left-0 right-0 top-0 bottom-0 z-[99] px-[24px] py-[14px] lg:py-[30px] overflow-hidden h-[100vh]  flex flex-col fixed">
        <div className="flex justify-between items-center mb-[28px] ">
          <div>
            {" "}
            <Image
              onClick={() => router.push("/")}
              src="/svg/logo.svg"
              width={148}
              height={23}
              alt="Picture of the author"
            />
          </div>
          <div>
            <ButtonComp
              btnText={`close`}
              className={`px-[24px] py-[8px] text-[13px] font500 h-fit border-[#262C32] border-[1px] !bg-[#25272d] !text-white !rounded-full`}
              onClick={() => setDropDown(false)}
            />
          </div>
        </div>
        <div className="text-[15px] text-white font500 flex-1 flex flex-col">
          <Link onClick={handleCheckIfITHome} href={'/'} className="py-[12px]  cursor-pointer no-underline text-white">Browse events</Link>
          <Link onClick={handleCheckIfITHome} href={'/'} className="py-[12px]  cursor-pointer no-underline text-white">On demand</Link>
        </div>

        <ButtonComp
          onClick={()=>openModal('SignUp')}
          btnText={`Log In/Sign Up`}
          className={`text-[13px] font500 mb-[32px] `}
        />
      </div>
    );
  };
  return (
    <>
      {dropDown && <MenuDropdown />}

      <div
        className={`pt-[14px]  lg:pt-[43px] pb-[98px]  font400 ${className} ${MainContainer}`}
      >
        <div className="absolute left-0 right-0 top-0 bottom-0 bg-cover  bg-[url('/webp/header.png')] z-30"></div>
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
              btnText="Browse event"
              className={`text-[15px] font-medium  hidden lg:block !py-11px] !px-[32px] gap-[10px] !bg-[#BAD6F70F]  rounded-[999px] border-[#262C32] border-[1px] font500 text-white backdrop-blur-[60px]  focus:${isFocused}`}
            />
            <ButtonComp
              btnText="On demand"
              className={`text-[15px] font-medium  hidden lg:block !py-11px] !px-[32px] gap-[10px] !bg-transparent rounded-[999px]   font500 text-white ${isFocused} `}
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
              className="text-[13px] font-medium  lg:hidden !py-[8px] !px-[24px] gap-[10px] !bg-[#BAD6F70F] rounded-[999px] border-[#262C32] border-[1px] font500 text-white backdrop-blur-[60px] h-fit"
            />
          </div>
        </div>
      </div>
    </>
  );
}
