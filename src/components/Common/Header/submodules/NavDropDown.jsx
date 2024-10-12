import { formatMoney } from "@/utils/formatMoney";
import { LogoImage } from "@/utils/styleReuse";
// import { cookies } from "next/headers";
import Link from "next/link";
import React from "react";
import { LiveParteCoins } from "../../../../../public/svg";
import { useRouter } from "next/router";

const { default: ButtonComp } = require("@/components/Ui/button");
const {
  eventLink,
  onDemandLink,
  myShowLink,
} = require("@/utils/reusableComponent");
const { default: Image } = require("next/image");

export default function MenuDropdown({
  handleLogOut,
  setDropDown,
  setModalName,
  userInfo,
  coinsBalance,
  handleCloseModal
}) {

    const router = useRouter();

    function handleCloseNav(link){
        router.pathname ===link && setDropDown(false)
    }
  // cookies();
  // console.log(userInfo,'userInfo');

  return (
    <div className="  left-0 right-0 top-0 bottom-0 z-[999]   pb-[20px] mb:pb-[0px]  justify-between lg:hidden  flex flex-col fixed overflow-y-scroll ">
      <div className="bg-[#1B1C20E5] navbar-background   px-[24px] py-[14px] ">
      <div className="justify-between lg:hidden flex-1  flex flex-col relative">
        <div className="flex justify-between items-center mb-[28px] ">
          <div>
            <LogoImage />
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
        <div className="text-[15px] text-white font500 flex-grow-1 flex flex-col justify-center items-center  mb-[66px]">
         <div/>
         <div className="pt-[30px]">
            <Link
              href={eventLink}
              className="  cursor-pointer text-white no-underline"
              onClick={()=>{
                // alert('hello world')
                handleCloseNav(eventLink)
              }}
            >
              Browse Events
            </Link>
          </div>
          <div className="pt-[30px]">
            <Link
              href={onDemandLink}
              className={`py-[30px]  cursor-pointer no-underline text-white mb-2 `}
              onClick={()=>{
                // alert('hello world')
                handleCloseNav(onDemandLink)
              }}
            >
              On Demand
            </Link>
          </div>
          {/* <div className="py-[15px]  cursor-pointer ">On demand</div> */}
          <div className="pt-[30px]">
            <Link
              href={myShowLink}
              className={`py-[30px]  cursor-pointer no-underline text-white mb-2 `}
              onClick={()=>{
                // alert('hello world')
                handleCloseNav(myShowLink)
              }}
            >
              My Shows
            </Link>
          </div>

          <div className="flex justify-between items-center py-[30px] w-full">
            <div className="text-[13px] flex items-center gap-[5px] w-full justify-between">
              <div>
              <ButtonComp
              // onClick={() => setModalName(`purchaseCoin`)}
              btnText={`Add Coins`}
              className={`h-[30px] !bg-[#BACFF70A] shadow-1 shadow-2 shadow-3 text-[13px] rounded-[999px] border-[#BACFF70A] border-[0.5px] invisible`}
            />
              </div>
              <div className="flex items-center gap-[5px] text-[14px] font500">
              <Image
                src={`/svg/Liveparte coin.svg`}
                width={24}
                height={24}
                alt="coins"
              />
              {formatMoney(coinsBalance || "0", false)}{" "}
              {coinsBalance > 1 ? "Coins" : "Coin"}
              </div>
           
            <ButtonComp
              onClick={() => setModalName(`purchaseCoin`)}
              btnText={`Add Coins`}
              className={`h-[30px] !bg-[#BACFF70A] shadow-1 shadow-2 shadow-3 text-[13px] rounded-[999px] border-[#BACFF70A] border-[0.5px]`}
            />
             </div>
          </div>
         <div/>
        </div>

        <div>
          <div className="text-[15px] text-white font500 flex-1  flex flex-col items-center justify-center">
            <Link
              href="/setting"
              className="py-[15px]  cursor-pointer text-white no-underline"
            >
              Settings
            </Link>
            <div onClick={handleLogOut} className="py-[15px] cursor-pointer">
              Log out
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
