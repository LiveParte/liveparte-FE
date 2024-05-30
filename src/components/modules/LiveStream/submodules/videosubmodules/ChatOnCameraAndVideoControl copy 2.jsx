import React from "react";
import { IsDesktopMobileChat } from "../../style";
import Chat from "../chat";

export default function ChatOnCameraAndVideoControl({
  liveStreamDetail,
  userProfileData,
}) {
  return (
    <div className="flex gap-5  align-bottom">
      <div className={`${IsDesktopMobileChat}`}>
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
  );
}
