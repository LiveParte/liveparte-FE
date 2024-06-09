import React, { useRef, useState } from "react";
import Image from "next/image";
import ButtonComp from "../../Ui/button";
import { useRouter } from "next/router";
import Link from "next/link";
import GiftTicket from "../../modules/EventDetails/modal/GiftTicket";
import PurchasePaartyCoins from "../../modules/LiveStream/submodules/PurchasePaartyCoins";
import MyModal from "../../Ui/Modal";
import LoginSignUp from "../../modules/Event/Modal/Login&SignUp";
import CustomDropDown from "../CustomDropDown";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectCoins, setUserData } from "@/store/User";
import dynamic from "next/dynamic";
import UserProfile from "../UserProfile";
import { userApi } from "@/store/User/userApi";
import { eventApi } from "@/store/Event/eventApi";
import { transactionApi } from "@/store/Transaction/transactionApi";
import { HeaderOnSelect, LogoImage } from "@/utils/styleReuse";
import { eventLink, myShowLink, onDemandLink } from "@/utils/reusableComponent";
import { formatMoney } from "@/utils/formatMoney";
import { accessTokenStorageName, userDetailStorageName } from "@/utils/helper";
import { LiveParteCoins } from "../../../../public/svg";

const MenuDropdown = dynamic(() => import("./submodules/NavDropDown"), {
  ssr: false,
});

export default function AuthHeader({
  className,
  openModal,
  showNav = false,
  userInfo,
  userCoinsBalance
}) {
  const router = useRouter();
  const dispatch = useDispatch();
  // const coins = 
  const MainContainer = `px-[20px] md:px-[40px] lg:px-[80px] xl:[120px] relative`;
  const [dropDown, setDropDown] = useState(false);
  const coinsBalance = useSelector(selectCoins);
  const [modalName, setModalName] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenPC, setIsOpenPC] = useState(false);
  const dropdownRef = useRef(null);
  const purchaseCoinRef = useRef(null);
  const isMyShow = router?.pathname == myShowLink;
  const isOnDemand = router?.pathname == onDemandLink;
  const isEvent =
    router?.pathname === "/event" || router?.pathname == "/event/[id]";
  const isFocused = `hover:!bg-[#FFFFFF26] hover:rounded-[8px]  hover:border-[0px] hover:font500  hover:backdrop-blur-[60px]`;
  const isSelected = HeaderOnSelect;

  function handleCloseModal() {
    setModalName();
  }

  function handleLogOut() {
    dispatch(userApi.util.resetApiState());
    dispatch(setUserData({}))
    localStorage.removeItem(userDetailStorageName);
    localStorage.removeItem(accessTokenStorageName);

    if (router?.pathname === myShowLink || router?.pathname === "/setting") {
     
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
          containerStyle={`bg-[#1B1C20] w-full`}
          closeModal={handleCloseModal}
          onClose={handleCloseModal}
          
        />
      ),
    },
  ];

  function ProfileDropdown() {
    return (
      <CustomDropDown dropdownRef={dropdownRef} setIsOpen={setIsOpen}>
        <div className=" bg-[#1B1C20] border-[1px] text-left border-[#343F4B] font500 text-[13px] md:text-[14px] text-white  rounded-[16px] md:w-[230px]    px-[40px] py-[24px]">
          <Link
            href={"/setting"}
            className="py-[12px] cursor-pointer no-underline text-white "
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
          containerStyle={`bg-[#060809] !rounded-[16px]`}
        />
      </CustomDropDown>
    );
  }

  // console.log(userCoinsBalance,'userCoinsBalance')

  const blur = `backdrop-blur-[60px]`;
  return (
    <>
      {dropDown && (
        <MenuDropdown
          handleLogOut={handleLogOut}
          setDropDown={setDropDown}
          setModalName={setModalName}
          userInfo={userInfo}
          coinsBalance={coinsBalance}
        />
      )}
      {modalName && (
        <MyModal
          isOpen={modalName ? true : false}
          bodyComponent={
            modalComponent?.find((item) => item?.name === modalName)?.component
          }
          containerStyle={`bg-[#1B1C20] border-[1px] border-[#343F4B] rounded-[16px]  `}
          closeModal={handleCloseModal}
        />
      )}

      <div
        className={`py-[14px] lg:py-[16px] mb-[34px] lg:mb-[55px]  font400 ${MainContainer} ${className} `}
      >
        <div className="absolute left-0 right-0 top-0 bottom-0 bg-cover opacity-30  bg-[url('/webp/header.png')] z-80 text-black"></div>
        <div
          className="flex items-center justify-between z-50 relative cursor-pointer"
          style={{ zIndex: 90 }}
        >
          <LogoImage router={router} />

          {showNav && (
            <div className="flex items-center justify-between  xl:gap-[24px] !hover:scale-100">
              <ButtonComp
                btnText="Browse Events"
                className={` font-medium  hidden lg:block   !h-[32px] text-[13px] px-[16px] md:px-[32px] bg-transparent  gap-[10px]  !border-none  font500 text-white  ${isFocused} ${
                  isEvent && isSelected
                }`}
                onClick={() => router.push(eventLink)}
              />
              <ButtonComp
                btnText="On Demand"
                className={` font-medium  hidden lg:block   !h-[32px] text-[13px] px-[16px] md:px-[32px] bg-transparent  gap-[10px]  !border-none  font500 text-white  ${isFocused} ${
                  isOnDemand && isSelected
                }`}
                onClick={() => router.push(onDemandLink)}
              />
              <ButtonComp
                btnText="My Shows"
                className={`  text-[13px]   !h-[32px] font-medium  hidden lg:block  px-[16px] md:px-[32px]   gap-[10px]    font500 text-white  ${isFocused} ${
                  isMyShow ? isSelected : "bg-transparent"
                }`}
                onClick={() => router.push(myShowLink)}
              />
            </div>
          )}
         {showNav&& <div>
            <div className="flex items-center  gap-[18px]">
              <div className=" gap-[16px] items-center text-white font500 hidden lg:flex">
                <div className=" flex flex-col">
                  <div className="text-[10px] text-[#b4becb] mb-[3px]">
                    Coin Balance
                  </div>
                  <div className="text-[13px] flex items-center gap-[5px]">
                    <LiveParteCoins/>
                      
                    {formatMoney(userCoinsBalance|| "0", false)}{" "}
                    {userCoinsBalance > 1 ? "Coins" : "Coin"}
                  </div>
                </div>

                <div ref={purchaseCoinRef} className="relative">
                  {isOpenPC && <PurchasePaartyCoinsDropdown />}
                  <div className="">
                    <ButtonComp
                      btnText={`Add Coins`}
                      className={`!h-[32px] py-[6px] px-[17px] !bg-[#BACFF70A] rounded-[999px]  text-[10px] shadow-4`}
                      onClick={() => setIsOpenPC(!isOpenPC)}
                    />
                  </div>
                </div>
              </div>
              <div className="hidden lg:block">
                <div className="relative">
                  {isOpen && <ProfileDropdown />}
                  <UserProfile onClick={() => setIsOpen(!isOpen)} />
                </div>
              </div>
            </div>
            <div className="lg:hidden">
              <ButtonComp
                onClick={() => setDropDown(true)}
                btnText="Menu"
                className="text-[13px] font-medium !h-[30px]  lg:hidden  !px-[24px] gap-[10px] !bg-[#BAD6F70F] leading-none rounded-[999px] border-[#262C32] border-[1px] font500 text-white backdrop-blur-[60px] md:h-fit "
              />
            </div>
          </div>}
        </div>
      </div>
    </>
  );
}
