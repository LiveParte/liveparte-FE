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
import { useDispatch, useSelector } from "react-redux";
import { logout, selectCoins, setUserData } from "@/store/User";
import dynamic from "next/dynamic";
import UserProfile from "../UserProfile";
import { userApi } from "@/store/User/userApi";
import { eventApi } from "@/store/Event/eventApi";
import { HeaderOnSelect, LogoImage } from "@/utils/styleReuse";
import { entertainersLink, eventLink, myShowLink, onDemandLink } from "@/utils/reusableComponent";
import { formatMoney } from "@/utils/formatMoney";
import { accessTokenStorageName, userDetailStorageName } from "@/utils/helper";
import { LiveParteCoins } from "../../../../public/svg";
import { useObject } from "@/Context/ObjectProvider";

const MenuDropdown = dynamic(() => import("./submodules/NavDropDown"), {
  ssr: false,
});

export default function AuthHeader({
  className,
  openModal,
  showNav = false,
  userInfo,
  userCoinsBalance,
}) {
  const router = useRouter();
  const dispatch = useDispatch();
  const {handlePreventScroll} =useObject();
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
  const isEntertainer =router?.pathname ==entertainersLink;
  const isEvent =
    router?.pathname === "/event" || router?.pathname == "/event/[id]";
  const isFocused = `hover:!bg-[#FFFFFF26] hover:rounded-[8px]  hover:border-[0px] hover:font500  hover:backdrop-blur-[60px]`;
  const isSelected = HeaderOnSelect;

  function handleCloseModal() {
    setModalName();
  }

  useEffect(() => {
    if(!dropDown){
      handlePreventScroll(false);
    }
    if(dropDown){
      handlePreventScroll(true);
    }
   
  }, [dropDown,handlePreventScroll])

  function handleLogOut() {
    dispatch(userApi.util.resetApiState());
    dispatch(eventApi.util.resetApiState());
    dispatch(setUserData({}));
    dispatch(logout({}));
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

  // console.log( router.pathname===onDemandLink,'onDemandLink')

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
          handleCloseModal={()=>{
            handleCloseModal()

          }}
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
            <div className="flex items-center justify-between gap-[1px] lg:gap-[0px]  xl:gap-[24px]  !hover:scale-100">
              <ButtonComp
                btnText="Browse Events"
                className={` font-medium  hidden lg:block   !h-[32px] text-[13px]  bg-transparent  gap-[10px]  !border-none  font500 text-white  ${isFocused}  ${
                  isEvent && isSelected
                }`}
                onClick={() => router.push(eventLink)}
              />
              
              <ButtonComp
                btnText="On Demand"
                className={` font-medium  hidden lg:block   !h-[32px] text-[13px]  bg-transparent  gap-[10px]  !border-none  font500 text-white  ${isFocused}  ${
                  isOnDemand && isSelected
                }`}
                onClick={() => {
                  // console.log( router.pathname,onDemandLink,'onDemandLink')
                  router.pathname === onDemandLink && handleCloseModal();
                  router.push(onDemandLink);
                }}
              />
              <ButtonComp
                btnText="My Shows"
                className={`  text-[13px]   !h-[32px] font-medium  hidden lg:block    gap-[10px]    font500 text-white  ${isFocused}   ${
                  isMyShow ? isSelected : "bg-transparent  px-[16px]"
                }`}
                onClick={() => router.push(myShowLink)}
              />
              {/* <ButtonComp
                btnText="Entertainers"
                className={`  text-[13px]   !h-[32px] font-medium  hidden lg:block    gap-[10px]    font500 text-white  ${isFocused} ${
                  isEntertainer ? isSelected : "bg-transparent px-[16px]"
                }`}
                onClick={() => router.push(entertainersLink)}
              /> */}
              <Link
                href={entertainersLink}
                target="_blank"
                rel="noopener noreferrer"
                // className="flex items-center gap-1 text-white no-underline"
                className={` no-underline text-[13px]   !h-[32px] font-medium  hidden lg:flex lg:items-center  gap-[10px]    font500 text-white  ${isFocused} ${
                  isEntertainer ? isSelected : "bg-transparent px-[16px]"
                }`}
              >
                Entertainers
                <svg
                  width="9"
                  height="9"
                  viewBox="0 0 9 9"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M2.37498 0.833252C2.37498 0.419038 2.71077 0.083252 3.12498 0.083252H8.16665C8.58086 0.083252 8.91665 0.419038 8.91665 0.833252V5.87492C8.91665 6.28913 8.58086 6.62492 8.16665 6.62492C7.75243 6.62492 7.41665 6.28913 7.41665 5.87492V2.64391L1.36364 8.69692C1.07075 8.98981 0.595876 8.98981 0.302983 8.69692C0.0100897 8.40402 0.0100897 7.92915 0.302983 7.63626L6.35599 1.58325H3.12498C2.71077 1.58325 2.37498 1.24747 2.37498 0.833252Z"
                    fill="white"
                  />
                </svg>
              </Link>
            </div>
          )}
          {showNav && (
            <div>
              <div className="flex items-center  gap-[18px]">
                <div className=" gap-[16px] items-center text-white font500 hidden lg:flex">
                  <div className=" flex flex-col">
                    <div className="text-[10px] text-[#b4becb] mb-[3px]">
                      Coin Balance
                    </div>
                    <div className="text-[13px] flex items-center gap-[5px]">
                      <LiveParteCoins />
                      {formatMoney(userCoinsBalance || "0", false)}{" "}
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
                  className="text-[13px] font-medium !h-[30px]  lg:hidden  !px-[24px] gap-[10px] !bg-[#BAD6F70F] leading-none rounded-[999px] border-[white] border-[1px] font500 text-white backdrop-blur-[60px] md:h-fit "
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
