import React from "react";
import ReactPlayer from "react-player";
import { isMobile } from "react-device-detect";
import { useObject } from "@/Context/ObjectProvider";
import { MuteIcon, VideoIsMute } from "../../../../../public/svg";

const AppVideo = ({ liveStreamDetail,isYoutubeVideo }) => {
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
    <div className="flex-1 h-full w-full flex justify-center items-center videoplayer relative border">
      
      {/* <video controls   autoPlay width="100%">
        <source
          src={liveStreamDetail?.streaming_url}
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video> */}
      <ReactPlayer
        ref={playerRef}
        style={{
          width: "100vw",
          height: "100%",
          objectFit: "contain",
        }}
        height={isMobile ? "40dvh" : "100%"}
        width={"100vw"}
        url={liveStreamDetail?.streaming_url}
        playing={isPlaying} // Auto play video on load
        controls={false} // Show controls on mobile
        muted={isMuted}
        autoPlay={true} // Ensure the video plays automatically
        onProgress={handleProgress} // Track progress
        onDuration={handleDuration} // Set total duration
        config={{
          youtube: {
            playerVars: {
              modestbranding: 1,
              rel: 0,
              showinfo: 0,
              disablekb: 1,
              fs: 0,
            },
          },
        }}
      />
      {isMuted && (
        <div className="absolute left-0 right-0 top-0 bottom-0 text-[24px]  flex justify-center items-center " onClick={()=>{
          toggleMute();
          // handlePlay()
        }}>
          <div className="relative text-white py-[16px] px-[32px] flex gap-[16px] rounded-[30px] justify-center items-center bg-[#333D4780] cursor-pointer z-50 font500">
            <VideoIsMute />
            <span>Unmute</span>
          </div>
        </div>
      )}
      <div className={`absolute left-0 right-0 top-0 z-30 bg-gradient-to-b h-[6vh] md:h-[18vh] lg:h-[12vh] xl:h-[12vh] ${isYoutubeVideo?'bg-black':' xl:h-[52vh] lg:h-[32vh]'}  items-start from-[#060809]`}></div>
      {/* Custom Controls */}
      {/* <div
        className={`absolute left-0 right-0 px-4 bottom-[-2px] md:py-4 flex justify-between text-white z-30 bg-gradient-to-t h-[5vh] lg:h-[10vh] items-start from-black  ${
          !isPlaying||!playerRef?.current?.player?.isPlaying ? "bg-black " : "bg-[#000000a6]"
        } lg:rounded-[16px] `}
      >
       
      </div> */}
    </div>
  );
};

export default React.memo(AppVideo);
