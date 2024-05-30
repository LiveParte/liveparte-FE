import ButtonComp from "@/components/Ui/button";
import { LogoImage } from "@/utils/styleReuse";
import React from "react";
import { GiftIcon, MicroPhoneIcon } from "../../../../../public/svg";
import { myShowLink } from "@/utils/reusableComponent";
import { useRouter } from "next/router";

export default function liveStreamHeaderComp({
  handleOpenModal,
  setActiveConnection,
  liveStreamDetail
}) {
  const router =useRouter();
  return (
    <div className={``}>
      <div className="flex justify-between items-center relative z-40">
        <div className="flex gap-14 items-center">
          <LogoImage />
          <div className="text-white text-[22px] font-bold uppercase font-1 line-clamp-1 w-[20vw]">
          {liveStreamDetail?.name}
          </div>
        </div>
        <div>
          <div className=" flex items-center gap-3">
            <ButtonComp
              className={`!h-[33px]  text-white text-[13px] font500 px-[12px] py-[6px] rounded-[8px]  border-[0px] font500  !bg-[#BACFF70A] element`}
              btnText={
                <div className="flex items-center gap-2">
                  <GiftIcon />
                  Gift Ticket
                </div>
              }
              onClick={() => {
                handleOpenModal(`giftTicket`);
                // router.push(myShowLink);
              }}
            />
            <ButtonComp
              className={`!h-[33px]  text-white text-[13px] font500 px-[12px] py-[6px] rounded-[8px]  border-[0px] font500  !bg-[#BACFF70A] element`}
              btnText={
                <div className="flex items-center gap-2">
                  <MicroPhoneIcon />
                  Share Event
                </div>
              }
              onClick={() => {
                handleOpenModal(`shareEvent`);
                // router.push(myShowLink);
              }}
            />
            <ButtonComp
              className={`!h-[33px] !bg-[#FA4354] text-white text-[13px] font500 px-[23px] py-[5px]`}
              btnText={"Leave"}
              onClick={() => {
                // leaveChannel()
                setActiveConnection(false);
                router.push(myShowLink);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
