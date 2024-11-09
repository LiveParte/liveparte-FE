import React, { memo, useCallback, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import ChatOnCameraAndVideoControl from "./videosubmodules/ChatOnCameraAndVideoControl";
import { useDispatch } from "react-redux";
import Video from "./Video";
import { isMobile } from "react-device-detect";

const JoinAudience = dynamic(() => import("@/components/Agora/JoinAudience"), {
  ssr: false,
});

function LiveStreamVideo({
 
  isLive = false,
  liveStreamDetail,
  isLoading,
 
  isYoutubeVideo
}) {
  
  return (
    !isLoading && (
      <div className="w-full  flex-1 bg-cover lg:rounded-[16px] overflow-hidden flex flex-col h-[95vh]">
        {!isLive && (
          <ChatOnCameraAndVideoControl
            liveStreamDetail={liveStreamDetail}
           
            isLive={isLive}
           
            isYoutubeVideo={isYoutubeVideo}
          />
        )}

        {!isLive ? (
          <Video
            liveStreamDetail={liveStreamDetail}
            isYoutubeVideo={isYoutubeVideo}
          />
        ) : (
          <div className="w-full relative agroa-video h-[40dvh] md:h-[100vh]">
            <JoinAudience
              liveStreamDetail={liveStreamDetail}
              eventId={liveStreamDetail?._id}
            />
          </div>
        )}
      </div>
    )
  );
}

export default memo(LiveStreamVideo);
