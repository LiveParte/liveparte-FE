import React, { useState, useRef, useCallback, useEffect } from "react";
import ReactPlayer from "react-player";
import { isMobile } from "react-device-detect";
import { useObject } from "@/Context/ObjectProvider";

const AppVideo = ({ liveStreamDetail }) => {
  const {isPlaying,isMuted,togglePlayPause,toggleMute,playerRef, handleFastForward,
    handleRewind,
    isDragging,
    handleProgress,
    handleDuration,
    formatTime, playedSeconds,
    duration, handleMouseDown,
    handleMouseUp,
    progressRef,
    handleMouseMove} =useObject()

  return (
    <div className="flex-1 h-full w-full flex justify-center items-center videoplayer relative">
      <ReactPlayer
        ref={playerRef}
        style={{
          width: "100vw",
          height: "100%",
          objectFit: "contain",
        }}
        height={isMobile ? "40vh" : "90vh"}
        width={"100vw"}
        url={liveStreamDetail?.streaming_url}
        playing={isPlaying}
        controls={isMobile ?true:false} // Disable default controls
        muted={isMuted}
        autoPlay={true}
        onProgress={handleProgress} // Track progress
        onDuration={handleDuration} // Set total duration
        config={{
          youtube: {
            playerVars: {
              modestbranding: 0,
              rel: 0,
              showinfo: 0,
              disablekb: 1,
              fs: 0,
            },
          },
        }}
      />

      {/* Custom Controls */}
      <div className="absolute left-0 right-0 px-4 bottom-[0] py-4 flex justify-between text-white z-30 bg-gradient-to-t h-[50px] items-start from-black bg-[#000000a6] lg:rounded-[16px] ">
        {/* <button onClick={togglePlayPause} className="text-white">
          {isPlaying ? "Pause" : "Play"}
        </button>
        <button onClick={toggleMute} className="text-white">
          {isMuted ? "Unmute" : "Mute"}
        </button>
        <button onClick={handleRewind} className="text-white">
          Rewind 10s
        </button>
        <button onClick={handleFastForward} className="text-white">
          Fast Forward 10s
        </button> */}
         {/* Progress Bar */}
      {/* <div
        className="absolute bottom-16 left-4 right-4 h-2 bg-gray-500 rounded cursor-pointer"
        onMouseDown={handleMouseDown} // Start dragging
        onMouseMove={handleMouseMove} // Dragging
        onMouseUp={handleMouseUp} // Stop dragging
        ref={progressRef}
        style={{ width: "calc(100% - 2rem)" }}
      >
        <div
          className="bg-blue-500 h-full rounded"
          style={{
            width: `${(playedSeconds / duration) * 100}%`, // Progress width based on played time
          }}
        ></div>
      </div> */}

      {/* <div className="absolute bottom-4 left-4 text-white">
        {formatTime(playedSeconds)} / {formatTime(duration)}
      </div> */}
      </div>

     
    </div>
  );
};

export default React.memo(AppVideo);
