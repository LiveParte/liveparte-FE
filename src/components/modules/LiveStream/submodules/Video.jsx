import React, { useRef, useMemo, useEffect, useCallback, memo } from "react";
// import VideoJS from "@/components/video";
import videojs from "video.js";
// import { videoUrl } from "../../../utils/constants";
import VideoJS from "@/components/VideoPlayer";
import { videoUrl } from "@/utils/functions/deleteLater";
import {isMobile} from 'react-device-detect';

const AppVideo = ({ liveStreamDetail, handlePlayerReady }) => {
  // console.log(liveStreamDetail?.streaming_url,'liveStreamDetail')

  const videoJsOptions = useMemo(
    () => ({
      autoplay: true,
      controls:isMobile? true:false,
      responsive: true,
      fluid: true,
      loop: true,
      muted: true,
      playsinline: true,
      preload: "auto", // Options: 'auto', 'metadata', 'none'
      playbackRates: [0.5, 1, 1.5, 2],
      sources: [
        {
          src:
            videoUrl ||
            liveStreamDetail?.streaming_url ||
            liveStreamDetail?.promotional_url ||
            `https://res.cloudinary.com/dnvwcmqhw/video/upload/v1713949269/onDemandVideo/Screen_Recording_2024-04-22_at_14.37.28_nezabk.mp4`,
          type: "video/mp4",
        },
      ],
    }),
    []
  );

  return (
    <>
      <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
    </>
  );
};

export default memo(AppVideo);
