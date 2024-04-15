import ButtonComp from "@/components/Ui/button";
import React, { useState } from "react";
import ReactPlayer from "react-player";
import Image from "next/image";
import Chat from "./submodules/chat";
import { useRouter } from "next/router";
import { FullScreenIcon, LogoWhiteMobile } from "../../../../public/svg";
import AgoraRTC, { AgoraRTCProvider, useRTCClient } from "agora-rtc-react";
import LiveStreamVideo from "./submodules/livestreamVideo";
import { myShowLink } from "@/utils/reusableComponent";
import { LogoImage } from "@/utils/styleReuse";
// Render a YouTube video player
export default function LiveStream({
  isLive=false
}) {
  const [activeConnection, setActiveConnection] = useState(true);
  

  const agoraClient = useRTCClient(
    AgoraRTC.createClient({ codec: "vp8", mode: "rtc" })
  ); // Initialize Agora Client
  const MainContainer = `lg:px-[20px] lg:px-[60px] lg:px-[120px] relative`;
  const router = useRouter();
  return (
    <AgoraRTCProvider client={agoraClient}>
      <main className={`${MainContainer}`}>
        <div className="pt-[32px] pb-[27px] hidden lg:block">
          {/* <LogoWhiteMobile /> */}
          <LogoImage router={router}/>
        </div>

        <div className="flex flex-col lg:flex-row gap-[16px] ">
          <div className="  flex-1 bg-[#27292E] lg:pt-[32px] lg:px-[24px] lg:rounded-[16px]">
            <div className="px-[5px]  items-center justify-between mb-[23px] hidden lg:flex">
              <div className="text-[23px] font-semibold font-1 text-[#FFFFFF] uppercase">
                Timeless tour - Newyork
              </div>
              <div className="">
                <ButtonComp
                  className={`!h-[33px] !bg-[#FA4354] text-white text-[13px] font500 px-[23px] py-[5px]`}
                  btnText={"Leave"}
                  onClick={() => {
                    setActiveConnection(false);
                    router.push(myShowLink);
                  }}
                />
              </div>
            </div>

            <div
              className="relative overflow-hidden lg:mb-[24px]
          "
            >
              <div className="absolute left-0 right-0 px-[16px] lg:px-[18px] top-0 py-[17px] flex justify-between text-white z-50 bg-gradient-to-b h-[100px] items-start from-black lg:rounded-[16px]">
                {isLive?<div className="flex items-center gap-[8px]">
                  <div className="h-[8px] w-[8px] rounded-full bg-[#FA4354]"></div>
                  <div className="font500 text-[13px] tracking-[0.48px] leading-none ">
                    Live
                  </div>
                </div>:
                <div className="flex items-center gap-[8px]">
                <div className="h-[8px] w-[8px] rounded-full bg-[#979797]"></div>
                <div className="font500 text-[13px] tracking-[0.48px] leading-none ">
                  on Demand
                </div>
              </div>
}
                <div className="text-[13px]  gap-[8px] items-center hidden lg:flex">
                 <FullScreenIcon/>
                  Fullscreen
                </div>
              </div>
          {isLive &&    <div className="absolute left-0 right-0 px-[18px] -bottom-[5px] py-[17px] flex justify-end text-white z-50 bg-gradient-to-t h-[100px] items-end from-black lg:rounded-[16px]">
                <div>
                  <div className="hidden lg:flex items-center gap-[16px]">
                    <Image src={`/svg/reaction1.svg`} width={32} height={32} alt="reaction1" />
                    <Image src={`/svg/reaction2.svg`} width={32} height={32} alt="reaction2"  />
                    <Image src={`/svg/reaction3.svg`} width={32} height={32} alt="reaction3"  />
                  </div>
                </div>
              </div>}
              <LiveStreamVideo
                setActiveConnection={setActiveConnection}
                activeConnection={activeConnection}
                isLive={isLive}
              />
            </div>
          </div>
          <div className=" lg:w-[25%] lg:rounded-[26px] bg-[#222428]">
            <Chat onLeave={()=>{
               setActiveConnection(false);
               router.push(myShowLink);
            }} />
          </div>
        </div>
      </main>
    </AgoraRTCProvider>
  );
}
