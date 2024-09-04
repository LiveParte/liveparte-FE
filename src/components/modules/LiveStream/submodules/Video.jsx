import dynamic from 'next/dynamic';

import React, { useRef, useMemo, useEffect, useCallback, memo } from "react";
// import VideoJS from "@/components/video";
import videojs from "video.js";
// import { videoUrl } from "../../../utils/constants";
import VideoJS from "@/components/VideoPlayer";
import { videoUrl } from "@/utils/functions/deleteLater";
import {isMobile} from 'react-device-detect';
import ReactPlayer from "react-player";
import "videojs-youtube";
// import OnStreamVideo from "./videosubmodules/onStreamVideo";

const OnStreamVideo = dynamic(() => import("./videosubmodules/onStreamVideo"),{ssr:false});
const AppVideo = ({ liveStreamDetail, handlePlayerReady,playerRef }) => {
  // console.log(liveStreamDetail?.streaming_url,'liveStreamDetail')
//liveStreamDetail?.promotional_url||liveStreamDetail?.promotional_url
 // 'https://res.cloudinary.com/dipc6jvcc/video/upload/v1725441078/Shortest_Video_on_Youtube_znanmv.mp4'||
            // videoUrl ||
            // liveStreamDetail?.streaming_url ||
            // liveStreamDetail?.promotional_url ||



  const videoJsOptions = useMemo(
    () => ({
      techOrder: ['youtube'],
      autoplay: true,
      controls:isMobile ? true : false,
      responsive: true,
      fluid: true,
      loop: true,
      muted: true,
      playsinline: true,
      preload: "auto", // Options: 'auto', 'metadata', 'none'
      playbackRates: [0.5, 1, 1.5, 2],
      sources: [
        {
          src:liveStreamDetail?.streaming_url,
          type: "video/youtube",
        },
      ],
    }),
    []
  );

  return (true&&
    <div  className=" flex-1 h-full w-full flex justify-center items-center videoplayer">
      {/* <ReactPlayer
      ref={playerRef}
        style={{
          width: '100vw',
          height: '100%',
          objectFit:'contain'
        }}
        height={'100vh'}
        width={'100vw'}
        url="https://youtu.be/W36KOlQFTd8?si=UkOF9Ye77-uthnJu"
        playing={true}
        controls={false}
      /> */}
      <OnStreamVideo 
      handlePlayerReady={handlePlayerReady}
       videoJsOptions={videoJsOptions}
      />
      {/* <VideoJS options={videoJsOptions} onReady={handlePlayerReady} /> */}
    </div>
  );
};

export default memo(AppVideo);
