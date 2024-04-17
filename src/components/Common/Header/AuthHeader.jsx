import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import ButtonComp from "../../Ui/button";
import { useRouter } from "next/router";
import Link from "next/link";
import GiftTicket from "../../modules/EventDetails/modal/GiftTicket";
import PurchasePaartyCoins from "../../modules/LiveStream/submodules/PurchasePaartyCoins";
import MyModal from "../../Ui/Modal";
import LoginSignUp from "../../modules/Event/Modal/Login&SignUp";
import CustomDropDown from "../CustomDropDown";
import { storage } from "@/utils/helper";
import { useDispatch } from "react-redux";
import { logout, setUserData } from "@/store/User";
// import dynamic from "next/dynamic";
// import { Avatar1 } from "../../../public/svg/avatars";
import UserProfile from "../UserProfile";
import { baseQuery } from "@/store/api";
import { userApi } from "@/store/User/userApi";
import { eventApi } from "@/store/Event/eventApi";
import { transactionApi } from "@/store/Transaction/transactionApi";
import { HeaderOnSelect, LogoImage } from "@/utils/styleReuse";
import { eventLink, myShowLink } from "@/utils/reusableComponent";
// const UserProfile =dynamic(()=>import('./UserProfile'),{src:false})

export default function AuthHeader({ className, openModal, showNav = false }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const MainContainer = `px-[20px] md:px-[40px] lg:px-[120px] relative`;
  const [dropDown, setDropDown] = useState(false);
  const [modalName, setModalName] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenPC, setIsOpenPC] = useState(false);
  const dropdownRef = useRef(null);
  const purchaseCoinRef = useRef(null);
  const isMyShow = router?.pathname == myShowLink;
  const isEvent =
    router?.pathname === "/event" || router?.pathname == "/event/[id]";
  const isFocused = `hover:!bg-[#FFFFFF26] hover:rounded-[8px]  hover:border-[0px] hover:font500  hover:backdrop-blur-[60px]`;
  const isSelected = HeaderOnSelect;
  function handleCloseModal() {
    setModalName();
  }

  // console.log(isMyShow&&isSelected,router?.pathname,'router?.pathname')

  function handleLogOut() {
    dispatch(userApi.util.resetApiState());
    dispatch(eventApi.util.resetApiState());
    dispatch(transactionApi.util.resetApiState());
    dispatch(logout());
    // localStorage.removeItem(userDetailStorageName);
    // localStorage.removeItem(accessTokenStorageName);

    if (router?.pathname === myShowLink || router?.pathname === "/setting") {
      dispatch(userApi.util.invalidateTags());
      dispatch(eventApi.util.invalidateTags());
      dispatch(transactionApi.util.invalidateTags());
      dispatch(
        userApi.endpoints.getUserProfile.initiate({ forceRefetch: true })
      );

      // window.location.reload();
      return router.push("/");
    }
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
      <div className="bg-[#1B1C20]   left-0 right-0 top-0 bottom-0 z-[99] px-[24px] py-[14px] overflow-hidden  pb-[20px] mb:pb-[0px]  justify-between lg:hidden  flex flex-col fixed overflow-y-scroll ">
        <div className="flex justify-between items-center mb-[28px] ">
          <div>
            {" "}
            <LogoImage router={router} />
          </div>
          <div>
            <ButtonComp
              btnText={`Close`}
              className={`px-[24px] !h-[30px]  text-[13px] font500 md:h-fit border-[#262C32] rounded-[999px] border-[1px] !bg-[#25272d] !text-white`}
              onClick={() => setDropDown(false)}
            />
          </div>
        </div>
        {/*  */}
        <div className="text-[15px] text-white font500 flex-1  mb-[60px]">
          <div className="py-[25px]">
            <Link
              href={eventLink}
              className="  cursor-pointer text-white no-underline"
              as={eventLink}
            >
              Browse Events
            </Link>
          </div>
          {/* <div className="py-[15px]  cursor-pointer ">On demand</div> */}
          <Link
            href={myShowLink}
            className={`py-[25px]  cursor-pointer no-underline text-white mb-2 `}
            as={myShowLink}
          >
            My Shows
          </Link>
          <div className="flex justify-between items-center py-[25px]">
            <div className="text-[13px] flex items-center gap-[5px] ">
              <Image src={`/svg/coin1.svg`} width={24} height={24} alt="coin" />{" "}
              100 Coins
            </div>
            <ButtonComp
              onClick={() => setModalName(`purchaseCoin`)}
              btnText={`Add Coins`}
              className={`h-[30px] !bg-[#BACFF70A] shadow-1 shadow-2 shadow-3 text-[13px] rounded-[999px] border-[#BACFF70A] border-[0.5px]`}
            />
          </div>
        </div>

        <div>
          <div className="text-[15px] text-white font500 flex-1  ">
            <Link
              href="/setting"
              className="py-[25px]  cursor-pointer text-white no-underline"
              as="/setting"
            >
              Settings
            </Link>
            <div onClick={handleLogOut} className="py-[25px] cursor-pointer">
              Log out
            </div>
          </div>
          {/* 
          <ButtonComp
            onClick={() => setModalName("Signup")}
            btnText={`Sign Up`}
            className={`text-[13px] font500 mb-[16px]  w-full`}
          />
          <ButtonComp
            onClick={() => setModalName(`Login/Signup`)}
            btnText={`Login`}
            className={`text-[13px] font500 mb-[28px]  w-full !bg-[#27292e] text-white`}
          /> */}
        </div>
      </div>
    );
  };

  function ProfileDropdown() {
    return (
      <CustomDropDown dropdownRef={dropdownRef} setIsOpen={setIsOpen}>
        <div className=" bg-[#1B1C20] border-[1px] text-left border-[#343F4B] font500 text-[13px] md:text-[14px] text-white  rounded-[16px] md:w-[230px]    px-[40px] py-[24px]">
          <Link
            href={"/setting"}
            className="py-[12px] cursor-pointer no-underline text-white "
            as={"/setting"}
          >
            Settings
          </Link>
          <div onClick={handleLogOut} className="py-[12px] cursor-pointer">
            Log out
          </div>
          {/* <div className="py-[12px]">Add to Calendar</div> */}
        </div>
      </CustomDropDown>
    );
  }

  function PurchasePaartyCoinsDropdown() {
    return (
      <CustomDropDown dropdownRef={purchaseCoinRef} setIsOpen={setIsOpenPC}>
        <PurchasePaartyCoins
          path={2}
          onClose={() => setIsOpenPC(false)}
          containerStyle={`bg-[#1B1C20] !rounded-[16px]`}
        />
      </CustomDropDown>
    );
  }
  // border-[#262C32] border-[1px]
  const blur = `backdrop-blur-[60px]`;
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
        className={`py-[14px] lg:py-[16px] mb-[34px] lg:mb-[75px]  font400 ${MainContainer} ${className} `}
      >
        <div className="absolute left-0 right-0 top-0 bottom-0 bg-cover opacity-30  bg-[url('/webp/header.png')] z-80 text-black"></div>
        {/* <LogoWhite/> */}
        <div
          className="flex items-center justify-between z-50 relative cursor-pointer"
          style={{ zIndex: 90 }}
        >
          <LogoImage router={router} />

          {showNav && (
            <div className="flex items-center  lg:gap-[18px] xl:gap-[24px] !hover:scale-100">
              <ButtonComp
                btnText="Browse Events"
                className={` font-medium  hidden lg:block   !h-[32px] text-[13px] px-[16px] md:px-[32px] bg-transparent  gap-[10px]  !border-none  font500 text-white  ${isFocused} ${
                  isEvent && isSelected
                }`}
                onClick={() => router.push(eventLink)}
              />
              {/* <ButtonComp
                btnText="On demand"
                className="text-[15px] font-medium  hidden lg:block !py-[11px] px-[5px] xl:px-[32px] gap-[10px] !bg-transparent rounded-[999px]   font500 text-white "
                onClick={() => router.push("/event")}
              /> */}
              <ButtonComp
                btnText="My Shows"
                className={`  text-[13px]   !h-[32px] font-medium  hidden lg:block  px-[16px] md:px-[32px]   gap-[10px]    font500 text-white  ${isFocused} ${
                  isMyShow ? isSelected : "bg-transparent"
                }`}
                onClick={() => router.push(myShowLink)}
              />
            </div>
          )}
          <div>
            <div className="flex items-center  gap-[18px]">
              <div className=" gap-[16px] items-center text-white font500 hidden lg:flex">
                <div className="text-[13px] flex items-center gap-[5px]">
                  <Image
                    src={`/svg/coins.svg`}
                    width={24}
                    height={24}
                    alt="coins"
                  />{" "}
                  100 Coins
                </div>
                <div ref={purchaseCoinRef} className="relative">
                  {isOpenPC && <PurchasePaartyCoinsDropdown />}
                  <ButtonComp
                    btnText={`Add Coins`}
                    className={`!h-[32px] py-[6px] px-[17px] !bg-[#BACFF70A] rounded-[999px]  text-[10px] shadow-4`}
                    onClick={() => setIsOpenPC(!isOpenPC)}
                  />
                </div>
              </div>
              <div className="hidden md:block">
                <div className="relative">
                  {isOpen && <ProfileDropdown />}
                  <UserProfile onClick={() => setIsOpen(!isOpen)} />
                  {/* <Avatar1/> */}
                  {/* <Image
                    src={`/webp/profile.png`}
                    width={40}
                    height={40}
                    onClick={() => setIsOpen(!isOpen)}
                    alt="profile"
                    // placeholder="blur"
                    // blurDataURL=""
                  /> */}
                </div>
              </div>
            </div>
            <div className="md:hidden">
              <ButtonComp
                onClick={() => setDropDown(true)}
                btnText="Menu"
                className="text-[13px] font-medium !h-[30px]  lg:hidden  !px-[24px] gap-[10px] !bg-[#BAD6F70F] leading-none rounded-[999px] border-[#262C32] border-[1px] font500 text-white backdrop-blur-[60px] md:h-fit "
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
