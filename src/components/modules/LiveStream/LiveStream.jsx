import ButtonComp from "@/components/Ui/button";
import React, { useState } from "react";
import ReactPlayer from "react-player";
import { Media, Video } from "@vidstack/player-react";
import Image from "next/image";
import Chat from "./submodules/chat";
import { useRouter } from "next/router";
import { LogoWhiteMobile } from "../../../../public/svg";
import AgoraRTC, { AgoraRTCProvider, useRTCClient } from "agora-rtc-react";
import LiveStreamVideo from "./submodules/livestreamVideo";
// Render a YouTube video player
export default function LiveStream() {
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
          <LogoWhiteMobile />
        </div>

        <div className="flex flex-col lg:flex-row gap-[16px] ">
          <div className="  flex-1 bg-[#27292E] lg:pt-[32px] lg:px-[24px] lg:rounded-[16px]">
            <div className="px-[5px]  items-center justify-between mb-[23px] hidden lg:flex">
              <div className="text-[23px] font-semibold font-1 text-[#FFFFFF] uppercase">
                Timeless tour - Newyork
              </div>
              <div>
                <ButtonComp
                  className={`!h-[33px] !bg-[#FA4354] text-white text-[13px] font500 px-[23px] py-[5px]`}
                  btnText={"Leave"}
                  onClick={() => {
                    setActiveConnection(false);
                    router.push("/my_shows");
                  }}
                />
              </div>
            </div>

            <div
              className="relative overflow-hidden lg:mb-[24px]
          "
            >
              <div className="absolute left-0 right-0 px-[16px] lg:px-[18px] top-0 py-[17px] flex justify-between text-white z-50 bg-gradient-to-b h-[100px] items-start from-black lg:rounded-[16px]">
                <div className="flex items-center gap-[8px]">
                  <div className="h-[8px] w-[8px] rounded-full bg-[#FA4354]"></div>
                  <div className="font500 text-[13px] tracking-[0.48px] ">
                    Live
                  </div>
                </div>
                <div className="text-[13px]  gap-[8px] items-center hidden lg:flex">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      opacity="0.12"
                      x="1.25"
                      y="1.25"
                      width="12.5"
                      height="12.5"
                      rx="4"
                      fill="white"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M4.6875 1.75C3.06516 1.75 1.75 3.06516 1.75 4.6875V5C1.75 5.27614 1.52614 5.5 1.25 5.5C0.973858 5.5 0.75 5.27614 0.75 5V4.6875C0.75 2.51288 2.51288 0.75 4.6875 0.75H5C5.27614 0.75 5.5 0.973858 5.5 1.25C5.5 1.52614 5.27614 1.75 5 1.75H4.6875ZM9.5 1.25C9.5 0.973858 9.72386 0.75 10 0.75H10.3125C12.4871 0.75 14.25 2.51288 14.25 4.6875V5C14.25 5.27614 14.0261 5.5 13.75 5.5C13.4739 5.5 13.25 5.27614 13.25 5V4.6875C13.25 3.06516 11.9348 1.75 10.3125 1.75H10C9.72386 1.75 9.5 1.52614 9.5 1.25ZM1.25 9.5C1.52614 9.5 1.75 9.72386 1.75 10V10.3125C1.75 11.9348 3.06516 13.25 4.6875 13.25H5C5.27614 13.25 5.5 13.4739 5.5 13.75C5.5 14.0261 5.27614 14.25 5 14.25H4.6875C2.51288 14.25 0.75 12.4871 0.75 10.3125V10C0.75 9.72386 0.973858 9.5 1.25 9.5ZM13.75 9.5C14.0261 9.5 14.25 9.72386 14.25 10V10.3125C14.25 12.4871 12.4871 14.25 10.3125 14.25H10C9.72386 14.25 9.5 14.0261 9.5 13.75C9.5 13.4739 9.72386 13.25 10 13.25H10.3125C11.9348 13.25 13.25 11.9348 13.25 10.3125V10C13.25 9.72386 13.4739 9.5 13.75 9.5Z"
                      fill="white"
                    />
                  </svg>
                  Fullscreen
                </div>
              </div>
              <div className="absolute left-0 right-0 px-[18px] bottom-0 py-[17px] flex justify-end text-white z-50 bg-gradient-to-t h-[100px] items-end from-black lg:rounded-[16px]">
                <div>
                  <div className="hidden lg:flex items-center gap-[16px]">
                    <Image src={`/svg/reaction1.svg`} width={32} height={32} />
                    <Image src={`/svg/reaction2.svg`} width={32} height={32} />
                    <Image src={`/svg/reaction3.svg`} width={32} height={32} />
                  </div>
                </div>
              </div>
              <LiveStreamVideo
                setActiveConnection={setActiveConnection}
                activeConnection={activeConnection}
              />
            </div>
          </div>
          <div className=" lg:w-[25%] lg:rounded-[26px] bg-[#222428]">
            <Chat />
          </div>
        </div>
      </main>
    </AgoraRTCProvider>
  );
}
