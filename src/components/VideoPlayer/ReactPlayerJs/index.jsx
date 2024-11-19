import { useObject } from "@/Context/ObjectProvider";
import React from "react";
import ReactPlayer from "react-player";
import { VideoIsMute } from "../../../../public/svg";
import { isMobile } from "react-device-detect";

export default function ReactPlayerJS({ liveStreamDetail }) {
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
  } = useObject();
  return (
    <>
    <ReactPlayer
      ref={playerRef}
      style={{
        width: "100vw",
        height: "100%",
        objectFit: "contain",
      }}
      height={isMobile ? "40dvh" : "100vh"}
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
        <div
          className="absolute left-0 right-0 top-0 bottom-0 text-[24px]  flex justify-center items-center "
          onClick={() => {
            toggleMute();
            // handlePlay()
          }}
        >
          <div className="relative text-white py-[16px] px-[32px] flex gap-[16px] rounded-[30px] justify-center items-center bg-[#333D4780] cursor-pointer z-50 font500">
            <VideoIsMute />
            <span>Unmute</span>
          </div>
        </div>
      )}
    </>
  );
}
