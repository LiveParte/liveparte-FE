import React, { useRef, useMemo, useEffect, useCallback, memo } from "react";
// import VideoJS from "@/components/video";
import videojs from "video.js";
// import { videoUrl } from "../../../utils/constants";
import VideoJS from "@/components/VideoPlayer";

const AppVideo = ({ liveStreamDetail, handlePlayerReady }) => {
  const playerRef = useRef(null);
  const durationRef = useRef(null);
  const currentTimeRef = useRef(0);
  const [, forceUpdate] = React.useReducer((x) => x + 1, 0);

  const videoJsOptions = useMemo(
    () => ({
      autoplay: true,
      controls: false,
      responsive: true,
      fluid: true,
      loop: true,
      muted: false,
      playsinline: true,
      sources: [
        {
          src:
            `https://res.cloudinary.com/dnvwcmqhw/video/upload/v1713949269/onDemandVideo/Screen_Recording_2024-04-22_at_14.37.28_nezabk.mp4` ||
            liveStreamDetail?.streaming_url ||
            liveStreamDetail?.promotional_url,
          type: "video/mp4",
        },
      ],
    }),
    []
  );

  return (
    <>
      <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />

      {/* <div className="p-4">
        <div className="relative h-2 bg-gray-300 rounded-full">
          <div
            className="absolute top-0 left-0 h-2 bg-blue-500 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="mt-2">
          Current Time: {formatTime(currentTimeRef.current)} / Duration:{" "}
          {durationRef.current !== null
            ? formatTime(durationRef.current)
            : "Loading..."}
        </div>
      </div> */}
    </>
  );
};

export default memo(AppVideo);
