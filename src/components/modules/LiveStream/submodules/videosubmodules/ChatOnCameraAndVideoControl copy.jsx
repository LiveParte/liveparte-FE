import React from "react";
import { IsDesktopMobileChat, IsDesktopMobileChatChangeName } from "../../style";
import Chat from "../chat";

export default function ChatOnCameraAndVideoControl({
  liveStreamDetail,
  userProfileData,
}) {
  return (
    <div className={`${IsDesktopMobileChat} bg-red-600  px-[80px]`}>
     <div className="flex gap-5  align-bottom z-30 justify-end">
        <div className="flex-1 items-end justify-end flex">
            <div className="h-[20px] w-full bg-red-600"></div>
        </div>
      <div className={`${IsDesktopMobileChatChangeName} `}>
        <Chat
          liveStreamDetail={liveStreamDetail}
          userProfileData={userProfileData}
          onLeave={() => {
            // setActiveConnection(false);
            // router.push(myShowLink);
          }}
        />
      </div>
    </div>
   </div>
  );
}
