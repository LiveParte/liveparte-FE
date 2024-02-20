import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import ButtonComp from "../Ui/button";
import { useRouter } from "next/router";
import Link from "next/link";
import Login from "../modules/Home/Modal/submodules/Login";
import GiftTicket from "../modules/EventDetails/modal/GiftTicket";
import PurchasePaartyCoins from "../modules/LiveStream/submodules/PurchasePaartyCoins";
import MyModal from "../Ui/Modal";
import LoginSignUp from "../modules/Home/Modal/Login&SignUp";
import CustomDropDown from "./CustomDropDown";

export default function AuthHeader({ className, openModal, showNav = false }) {
  const router = useRouter();
  const MainContainer = `px-[20px] md:px-[40px] lg:px-[120px] relative`;
  const [dropDown, setDropDown] = useState(false);
  const [modalName, setModalName] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenPC, setIsOpenPC] = useState(false);
  const dropdownRef = useRef(null);
  const purchaseCoinRef = useRef(null);
  // useEffect(() => {
  //   function handleClickOutside(event) {
  //     if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
  //       // Clicked outside the dropdown, so close it
  //       setIsOpen(false);
  //     }
  //   }

  //   // Bind the event listener
  //   document.addEventListener("mousedown", handleClickOutside);

  //   // Unbind the event listener on component unmount
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);
  function handleCloseModal() {
    setModalName();
  }

  const modalComponent = [
    {
      name: "Login/Signup",
      component: <LoginSignUp closeModal={handleCloseModal} />,
    },
    {
      name: "Signup",
      component: (
        <LoginSignUp pageName="SignUp" closeModal={handleCloseModal} />
      ),
    },
    {
      name: "gift",
      component: <GiftTicket closeModal={handleCloseModal} />,
    },
    {
      name: "purchaseCoin",
      component: (
        <PurchasePaartyCoins
        path={2}
          containerStyle={`bg-[#1B1C20]`}
          closeModal={handleCloseModal}
          onClose={handleCloseModal}
        />
      ),
    },
  ];

  const MenuDropdown = () => {
    return (
      <div className="bg-[#1B1C20]  left-0 right-0 top-0 bottom-0 z-[99] px-[24px] py-[14px] overflow-hidden h-[100vh] justify-between  flex flex-col fixed overflow-y-scroll">
        <div className="flex justify-between items-center mb-[28px] ">
          <div>
            {" "}
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
            className="md:hidden"
          />
          </div>
          <div>
            <ButtonComp
              btnText={`close`}
              className={`px-[24px] py-[8px] text-[13px] font500 h-fit border-[#262C32] rounded-[999px] border-[1px] !bg-[#25272d] !text-white`}
              onClick={() => setDropDown(false)}
            />
          </div>
        </div>
        {/*  */}
        <div className="text-[15px] text-white font500 flex-1  mb-[60px]">
          <Link
            href={"/"}
            className="py-[12px]  cursor-pointer text-white no-underline"
          >
            Browse events
          </Link>
          <div className="py-[12px]  cursor-pointer ">On demand</div>
          <Link
            href={"/my_shows"}
            className="py-[12px]  cursor-pointer no-underline text-white mb-2"
          >
            My Show
          </Link>
          <div className="flex justify-between items-center py-[15px]">
            <div className="text-[13px] flex items-center gap-[5px] ">
              <Image src={`/svg/coin1.svg`} width={24} height={24} /> 100 Coins
            </div>
            <ButtonComp
              onClick={() => setModalName(`purchaseCoin`)}
              btnText={`Add Coins`}
              className={`h-[30px] !bg-[#BACFF70A] shadow-1 shadow-2 shadow-3 text-[13px] rounded-[999px]`}
            />
          </div>
        </div>

        <div>
          <div className="text-[15px] text-white font500 flex-1  mb-[16px]">
            <Link
              href="/setting"
              className="py-[12px]  cursor-pointer text-white no-underline"
            >
              Settings
            </Link>
            <div className="py-[12px] cursor-pointer">Log out</div>
          </div>

          <ButtonComp
            onClick={() => setModalName("Signup")}
            btnText={`Sign Up`}
            className={`text-[13px] font500 mb-[16px]  w-full`}
          />
          <ButtonComp
            onClick={() => setModalName(`Login/Signup`)}
            btnText={`Login`}
            className={`text-[13px] font500 mb-[28px]  w-full !bg-[#27292e] text-white`}
          />
          <div></div>
        </div>
      </div>
    );
  };

  function ProfileDropdown() {
    return (
      <CustomDropDown  dropdownRef={dropdownRef} setIsOpen={setIsOpen}>
        <div className=" bg-[#1B1C20] border-[1px] text-left border-[#343F4B] font500 text-[13px] md:text-[14px] text-white  rounded-[16px] md:w-[230px]    px-[40px] py-[24px]">
          <Link
            href={"/setting"}
            className="py-[12px] cursor-pointer no-underline text-white "
          >
            Settings
          </Link>
          <div className="py-[12px]">Log out</div>
          {/* <div className="py-[12px]">Add to Calendar</div> */}
        </div>
      </CustomDropDown>
    );
  }
  function PurchasePaartyCoinsDropdown() {
    return (
      <CustomDropDown
      
      dropdownRef={purchaseCoinRef} setIsOpen={setIsOpenPC}>
        <PurchasePaartyCoins
        path={2}
        onClose={()=>setIsOpenPC(false)}
        containerStyle={`bg-[#1B1C20] !rounded-[16px]`}
        />
      </CustomDropDown>
    );
  }
  // border-[#262C32] border-[1px]
  return (
    <>
      <MyModal
        isOpen={modalName ? true : false}
        bodyComponent={
          modalComponent?.find((item) => item?.name === modalName)?.component
        }
        containerStyle={`bg-[#1B1C20] border-[1px] border-[#343F4B] rounded-[16px]  !w-[586px]`}
        closeModal={handleCloseModal}
      />
      {dropDown && <MenuDropdown />}

      <div
        className={`py-[14px] lg:py-[32px] mb-[34px] lg:mb-[75px]  font400 ${MainContainer} ${className} `}
      >
        <div className="absolute left-0 right-0 top-0 bottom-0 bg-cover  bg-[url('/webp/header.png')] z-30"></div>
        {/* <LogoWhite/> */}
        <div className="flex items-center justify-between z-50 relative cursor-pointer">
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
            className="md:hidden"
          />

          {showNav && (
            <div className="flex items-center  lg:gap-[18px] xl:gap-[24px] !hover:scale-100">
              <ButtonComp
                btnText="Browse event"
                className="text-[15px] font-medium  hidden lg:block !py-[11px] px-[5px] xl:px-[32px]  gap-[10px] !bg-transparent rounded-[999px]   font500 text-white backdrop-blur-[60px]"
                onClick={() => router.push("/")}
              />
              <ButtonComp
                btnText="On demand"
                className="text-[15px] font-medium  hidden lg:block !py-[11px] px-[5px] xl:px-[32px] gap-[10px] !bg-transparent rounded-[999px]   font500 text-white backdrop-blur-[60px]"
                // onClick={() => router.push("/")}
              />
              <ButtonComp
                btnText="My shows"
                className="text-[15px] font-medium  hidden lg:block !py-[11px] px-[5px] xl:px-[32px] gap-[10px] !bg-transparent rounded-[999px]   font500 text-white backdrop-blur-[60px]"
                onClick={() => router.push("/my_shows")}
              />
            </div>
          )}
          <div>
            <div className="flex items-center  gap-[18px]">
              <div className=" gap-[16px] items-center text-white font500 hidden lg:flex">
                <div className="text-[13px] flex items-center gap-[5px]">
                  <Image src={`/svg/coins.svg`} width={24} height={24} /> 100
                  Coins
                </div>
                <div ref={purchaseCoinRef} className="relative">
              {isOpenPC &&<PurchasePaartyCoinsDropdown/>}
                  <ButtonComp
                    btnText={`Add Coins`}
                    className={`!h-[32px] py-[6px] px-[17px] !bg-[#BACFF70A] rounded-[999px] shadow-1 shadow-2 shadow-3 text-[10px]`}
                  onClick={()=>setIsOpenPC(!isOpenPC)}
                  />
                </div>
              </div>
              <div className="hidden md:block">
                <div className="relative">
                  {isOpen && <ProfileDropdown />}
                  <Image
                    src={`/webp/profile.png`}
                    width={40}
                    height={40}
                    onClick={() => setIsOpen(!isOpen)}
                    // placeholder="blur"
                    // blurDataURL=""
                  />
                </div>
              </div>
            </div>
            <div className="md:hidden">
              <ButtonComp
                onClick={() => setDropDown(true)}
                btnText="Menu"
                className="text-[13px] font-medium  lg:hidden !py-[8px] !px-[24px] gap-[10px] !bg-[#BAD6F70F] rounded-[999px] border-[#262C32] border-[1px] font500 text-white backdrop-blur-[60px] h-fit"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
