import React, { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Chat from "./chat";
import { IsDesktopMobileChat } from "../style";
import ChatOnCameraAndVideoControl from "./videosubmodules/ChatOnCameraAndVideoControl";
import { FullScreenIcon, HostLeftIcon } from "../../../../../public/svg";
import { checkShowDurationAfter } from "@/utils/reusableComponent";
import { useDispatch } from "react-redux";
import { lockOrientation, unlockOrientation } from "@/store/User";
import MobilePlayer from "./MobilePlayer";
import FullScreenChatAction from "./FullScreenChatAction";
import Video from "./Video";
import Header from "./LandScapeComp/header";
import { isMobile } from 'react-device-detect';

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
  lockOrientation,
  unlockOrientation,
  orientationLocked,
  ShareAndGiftDropdown
}) {
  const playerRef = useRef(null);
  const durationRef = useRef(null);
  const currentTimeRef = useRef(0);
  const isPlayingRef = useRef(false);
  const isMutedRef = useRef(false);
  const [, forceUpdate] = React.useReducer((x) => x + 1, 0);
  const checkIfOrientedAndMobile = isMobile && !orientationLocked;

  const handlePlayerReady = useCallback((player) => {
    playerRef.current = player;

    // Set the duration once the player is ready
    player.on("loadedmetadata", () => {
      durationRef.current = player.duration();
      forceUpdate();

      // Set the video to start from the saved time
      const savedTime = localStorage.getItem('video-current-time');
      if (savedTime) {
        player.currentTime(parseFloat(savedTime));
      }
    });

    // Update current time as the video plays
    player.on("timeupdate", () => {
      if (playerRef.current) {
        currentTimeRef.current = player.currentTime();
        forceUpdate();
      }
    });

    // Save the current time periodically
    const saveCurrentTime = () => {
      if (playerRef.current) {
        localStorage.setItem('video-current-time', playerRef.current.currentTime().toString());
      }
    };
    player.on('timeupdate', saveCurrentTime);

    // You can handle other player events here, for example:
    player.on("waiting", () => {
      videojs.log("player is waiting");
    });

    player.on("dispose", () => {
      videojs.log("player will dispose");
    });

    // Set initial play/pause state
    isPlayingRef.current = player.paused();
    isMutedRef.current = player.muted();

    forceUpdate();
  }, []);

  const PlayState = !isPlayingRef?.current;
  const MuteState = isMutedRef?.current;

  const togglePlayPause = () => {
    if( playerRef.current){
    if (playerRef.current?.paused()) {
      playerRef.current.play();
      isPlayingRef.current = true;
    } else {
      playerRef.current.pause();
      isPlayingRef.current = false;
    }
    forceUpdate();
  }
  };

  const handleRewind = () => {
    const newTime = Math.max(currentTimeRef.current - 10, 0);
    if (playerRef.current) {
      playerRef.current.currentTime(newTime);
    }
  };

  useEffect(() => {
    // Save the current time when the component unmounts
    return () => {
      if (playerRef.current && typeof playerRef.current.currentTime === 'function') {
        const currentTime =  playerRef.current.currentTime&&playerRef.current?.currentTime();
        if (currentTime !== undefined) {
          localStorage.setItem('video-current-time', currentTime.toString());
        }
      }
    };
  }, []);

  const toggleMuteUnmute = () => {
    if (playerRef.current?.muted()) {
      playerRef.current.muted(false);
      isMutedRef.current = false;
    } else {
      playerRef.current.muted(true);
      isMutedRef.current = true;
    }
    forceUpdate();
  };

  const handleForward = () => {
    const newTime = Math.min(
      currentTimeRef.current + 10,
      durationRef.current || 0
    );
    if (playerRef.current) {
      playerRef.current.currentTime(newTime);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const progress = durationRef.current
    ? (currentTimeRef.current / durationRef.current) * 100
    : 0;
  const currentTime = formatTime(currentTimeRef.current);
  const duration=durationRef.current !== null && formatTime(durationRef.current);

  return (
    !isLoading && (
      <div
        className={`w-full h-full flex-1 bg-cover lg:rounded-[16px] overflow-hidden`}
      >
        <div className="absolute z-30 bottom-0 left-0 right-0 lg:h-[40vh] md:h-[20vh]   bg-contain xl:bg-cover !bg-no-repeat bg-gradient-to-b from-black"></div>
        <div>
          <ChatOnCameraAndVideoControl
            liveStreamDetail={liveStreamDetail}
            userProfileData={userProfileData}
            calculateProgressPercentage={progress}
            isMuted={MuteState}
            toggleMute={toggleMuteUnmute}
            togglePlayPause={togglePlayPause}
            isLive={!isLive}
            isPlaying={PlayState}
            rewind={handleRewind}
            fastForward={handleForward}
            currentTime={currentTime}
            duration={duration}
          />
        </div>

        {!isLive ? (
          <Video
            handlePlayerReady={handlePlayerReady}
            currentTimeRef={currentTime}
            isPlaying={PlayState}
            rewind={handleRewind}
            togglePlayPause={togglePlayPause}
           
          />
        ) : (
          <div className="h-full w-full relative agroa-video">
            <JoinAudience
              liveStreamDetail={liveStreamDetail}
              eventId={liveStreamDetail?._id}
            />
          </div>
        )}

        {checkIfOrientedAndMobile && <Header ShareAndGiftDropdown={ShareAndGiftDropdown} />}
        <div>
          <MobilePlayer
            orientationLocked={!orientationLocked}
            toggleMute={toggleMuteUnmute}
            togglePlayPause={togglePlayPause}
            isPlaying={PlayState}
            rewind={handleRewind}
            calculateProgressPercentage={progress}
            fastForward={handleForward}
            currentTime={currentTime}
          />


          {orientationLocked && (
            <div className="">
   <button
              className="absolute z-10 flex lg:hidden gap-2 text-[12px] left-5 bottom-5 items-center text-white"
              onClick={() =>
                orientationLocked ? lockOrientation() : unlockOrientation()
              }
            >
              <FullScreenIcon />
              {!orientationLocked ? "Exit Fullscreen" : "Fullscreen"}
            </button>
            </div>
            //  absolute z-30 top-0 left-0 right-0 lg:h-[40vh] md:h-[20vh]   bg-contain xl:bg-cover !bg-no-repeat bg-gradient-to-b from-black
         
          )}
          {checkIfOrientedAndMobile && (
            <FullScreenChatAction
              orientationLocked={!orientationLocked}
              unlockOrientation={unlockOrientation}
            />
          )}
        </div>
      </div>
    )
  );
}
