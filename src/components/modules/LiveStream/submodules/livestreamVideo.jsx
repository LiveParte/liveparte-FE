// components/LiveStreamVideo.js
import React, { useRef, useState } from "react";
import dynamic from "next/dynamic";
import Video from "./Video";
import Chat from "./chat";
import { IsDesktopMobileChat } from "../style";
import ChatOnCameraAndVideoControl from "./videosubmodules/ChatOnCameraAndVideoControl";
import { FullScreenIcon } from "../../../../../public/svg";

const JoinAudience = dynamic(() => import("@/components/Agora/JoinAudience"), {
  ssr: false,
});

export default function LiveStreamVideo({
  activeConnection,
  setActiveConnection,
  isLive = false,
  liveStreamDetail,
  isLoading,
  userProfileData = {},
}) {
  const divRef = useRef(null);
  const videoRef = useRef(null);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const currentTimeRef = useRef(0);
  const durationRef = useRef(0);
  const isDraggingRef = useRef(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [, forceUpdate] = useState(0); // Used to force re-render for display updates

  const updateTime = () => {
    if (!isDraggingRef.current) {
      currentTimeRef.current = videoRef.current.currentTime;
      // forceUpdate(n => n + 1); // Force update to trigger re-render for display update
    }
  };

 
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const updateDuration = () => {
    durationRef.current = videoRef.current.duration;
    // forceUpdate(n => n + 1); // Force update to trigger re-render for display update
  };

  const calculateProgressPercentage = () => {
    return (currentTimeRef.current / durationRef.current) * 100;
  };

  const handleMouseDown = (e) => {
    isDraggingRef.current = true;
    // updateCurrentTime(e);
  };

  const handleMouseMove = (e) => {
    if (isDraggingRef.current) {
      // updateCurrentTime(e);
    }
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const handleFullScreenToggle = () => {
    if (!isFullScreen) {
      if (divRef.current.requestFullscreen) {
        divRef.current.requestFullscreen().then(() => setIsFullScreen(true));
      } else if (divRef.current.mozRequestFullScreen) {
        divRef.current.mozRequestFullScreen().then(() => setIsFullScreen(true));
      } else if (divRef.current.webkitRequestFullscreen) {
        divRef.current.webkitRequestFullscreen().then(() => setIsFullScreen(true));
      } else if (divRef.current.msRequestFullscreen) {
        divRef.current.msRequestFullscreen().then(() => setIsFullScreen(true));
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().then(() => setIsFullScreen(false));
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen().then(() => setIsFullScreen(false));
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen().then(() => setIsFullScreen(false));
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen().then(() => setIsFullScreen(false));
      }
    }
  };

  const updateCurrentTime = (e) => {
    const progressBar = e.currentTarget;
    const clickPositionX = e.clientX - progressBar.getBoundingClientRect().left;
    const progressBarWidth = progressBar.offsetWidth;
    const percentageClicked = (clickPositionX / progressBarWidth) * 100;
    const timeToSeek = (percentageClicked / 100) * durationRef.current;

    if (videoRef.current) {
      videoRef.current.currentTime = timeToSeek;
      currentTimeRef.current = timeToSeek;
      // forceUpdate(n => n + 1); 
      // Force update to trigger re-render for display update
    }
  };

  const togglePlayPause = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const fastForward = () => {
    videoRef.current.currentTime = Math.min(videoRef.current.currentTime + 10, durationRef.current);
    currentTimeRef.current = videoRef.current.currentTime;
    // forceUpdate(n => n + 1);
  };

  const rewind = () => {
    videoRef.current.currentTime = Math.max(videoRef.current.currentTime - 10, 0);
    currentTimeRef.current = videoRef.current.currentTime;
    // forceUpdate(n => n + 1);
  };
  // console.log(isLive,'')
  return (
    !isLoading && (
      <div ref={divRef} className={`w-full h-full flex-1 bg-cover lg:rounded-[16px] overflow-hidden  ${isFullScreen?'rotate-180':''} `}>
        <div className=" ">
          <ChatOnCameraAndVideoControl
            liveStreamDetail={liveStreamDetail}
            userProfileData={userProfileData}
            calculateProgressPercentage={calculateProgressPercentage}
           currentTimeRef={currentTimeRef}
           durationRef={durationRef}
           fastForward={fastForward}
           formatTime={formatTime}
           handleMouseDown={handleMouseDown}
           handleMouseMove={handleMouseMove}
           handleMouseUp={handleMouseUp}
           isMuted={isMuted}
           isPlaying={isPlaying}
           rewind={rewind}
           toggleMute={toggleMute}
           togglePlayPause={togglePlayPause}

            isLive={!isLive}
          />
        </div>

        {!isLive ? (
          <Video
          videoRef={videoRef}
          updateTime={updateTime}
          updateDuration={updateDuration}
          liveStreamDetail={liveStreamDetail}
          divRef={divRef}
          calculateProgressPercentage={calculateProgressPercentage}
          currentTimeRef={currentTimeRef}
          durationRef={durationRef}
          fastForward={fastForward}
          formatTime={formatTime}
          handleMouseDown={handleMouseDown}
          handleMouseMove={handleMouseMove}
          handleMouseUp={handleMouseUp}
          isMuted={isMuted}
          isPlaying={isPlaying}
          rewind={rewind}
          toggleMute={toggleMute}
          togglePlayPause={togglePlayPause}
          />
         
        ) : (
          <div id="" className="h-full w-full relative agroa-video">
            <JoinAudience eventId={liveStreamDetail?._id} />
          </div>
        )}
        <div
            className="absolute   z-50 flex lg:hidden gap-2 text-[12px] left-5 bottom-5 items-center text-white"
                    onClick={() => handleFullScreenToggle()}
                  >
                    <FullScreenIcon />
                    {isFullScreen ? 'Exit Fullscreen' : 'Fullscreen'}
                  </div>
        {/* <button onClick={handleFullScreen} className="absolute left-0 bottom-0 border z-50">FullScreen</button> */}
      </div>
    )
  );
}
