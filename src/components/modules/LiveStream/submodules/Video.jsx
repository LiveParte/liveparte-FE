import React from "react";
import ReactPlayer from "react-player";
import { isMobile } from "react-device-detect";
import { useObject } from "@/Context/ObjectProvider";
import { MuteIcon, VideoIsMute } from "../../../../../public/svg";
import ReactPlayerJS from "@/components/VideoPlayer/ReactPlayerJs";
import VideoJsPlayer from "@/components/VideoPlayer/VideoJsPlayer";

const AppVideo = ({ liveStreamDetail, isYoutubeVideo }) => {
  const {
    isPlaying,
    isMuted,
    // togglePlayPause,
    toggleMute,
    playerRef,
    // handleFastForward,
    // handleRewind,
    handleProgress,
    handleDuration,
    // progressRef,
    // isDragging,
    // handleMouseDown,
    // handleMouseMove,
    // handleMouseUp,
    // formatTime,
    // playedSeconds,
    // duration,
    // isUserPause,
    // isYoutubeVideo
  } = useObject();

  const handlePlay = (e) => {
    // playerRef.current?.getInternalPlayer().play();
    playerRef.current.seekTo(parseFloat(e.target.value));
  };

  //!playerRef?.current?.player?.isPlaying

  return (
    <div className="flex-1 h-full w-full flex justify-center items-center videoplayer relative ">
      {isYoutubeVideo ? (
        <ReactPlayerJS liveStreamDetail={liveStreamDetail} />
      ) : (
        <VideoJsPlayer liveStreamDetail={liveStreamDetail}  />
      )}
      <div
        className={`absolute left-0 right-0 top-0 z-30 bg-gradient-to-b h-[6vh] md:h-[18vh] lg:h-[12vh] xl:h-[12vh] ${
          isYoutubeVideo ? "bg-black" : " xl:h-[52vh] lg:h-[32vh]"
        }  items-start from-[#060809]`}
      ></div>
     
    </div>
  );
};

export default React.memo(AppVideo);
