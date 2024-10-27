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
  activeConnection,
  setActiveConnection,
  isLive = false,
  liveStreamDetail,
  isLoading,
  userProfileData = {},
  lockOrientation,
  unlockOrientation,
  orientationLocked,
  ShareAndGiftDropdown,
}) {
  const dispatch = useDispatch();
  const playerRef = useRef(null);
  const durationRef = useRef(null);
  const currentTimeRef = useRef(0);
  const isPlayingRef = useRef(false);
  const isMutedRef = useRef(false);
  const [, forceUpdate] = React.useReducer((x) => x + 1, 0);

  const handlePlayerReady = useCallback((player) => {
    playerRef.current = player;

    player.on("play", () => {
      // console.log("Video started playing");
    });

    player.on("loadedmetadata", () => {
      durationRef.current = player.duration();
      forceUpdate();

      const savedTime = localStorage.getItem("video-current-time");
      if (savedTime) {
        player.currentTime(parseFloat(savedTime));
        playerRef.current.play();
      }
    });

    player.on("timeupdate", () => {
      if (playerRef.current) {
        currentTimeRef.current = player.currentTime();
        forceUpdate();
      }
    });

    const saveCurrentTime = () => {
      if (playerRef.current) {
        localStorage.setItem(
          "video-current-time",
          playerRef.current.currentTime().toString()
        );
      }
    };

    player.on("timeupdate", saveCurrentTime);

    player.on("waiting", () => {
      // console.log("Player is waiting");
    });

    player.on("dispose", () => {
      // console.log("Player will dispose");
    });

    isPlayingRef.current = player.paused();
    isMutedRef.current = !player.muted();
    playerRef.current.play();
    player.volume(100);
    forceUpdate();
  }, []);

  const togglePlayPause = () => {
    if (playerRef.current) {
      if (playerRef.current.paused()) {
        playerRef.current.play();
        isPlayingRef.current = true;
      } else {
        playerRef.current.pause();
        isPlayingRef.current = false;
      }
      forceUpdate();
    }
  };
  const handlePlayToggle = () => {
    if (playerRef.current) {
      const isPlaying = playerRef.current.getInternalPlayer().getPlayerState() === 1; // 1 indicates playing state for YouTube
      if (isPlaying) {
        playerRef.current.getInternalPlayer().pauseVideo();
      } else {
        playerRef.current.getInternalPlayer().playVideo();
      }
    }
  };

  const toggleMuteUnmute = () => {
    if (playerRef.current) {
      const isMuted = playerRef.current.muted();
      playerRef.current.muted(!isMuted);
      isMutedRef.current = !isMuted;
      forceUpdate();
    }
  };

  const handleRewind = () => {
    if (playerRef.current) {
      const newTime = Math.max(currentTimeRef.current - 10, 0);
      playerRef.current.currentTime(newTime);
    }
  };

  const handleForward = () => {
    if (playerRef.current) {
      const newTime = Math.min(currentTimeRef.current + 10, durationRef.current || 0);
      playerRef.current.currentTime(newTime);
    }
  };

  const handleMouseDown = (e) => {
    if (!durationRef.current || !playerRef.current) return;

    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const clickPosition = e.clientX - rect.left;
    const percentage = clickPosition / rect.width;
    const newTime = percentage * durationRef.current;

    playerRef.current.currentTime(newTime);
  };

  // const handle

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const progress = durationRef.current
    ? (currentTimeRef.current / durationRef.current) * 100
    : 0;
  const currentTime = formatTime(currentTimeRef.current);
  const duration =
    durationRef.current !== null && formatTime(durationRef.current);

  return (
    !isLoading && (
      <div className="w-full h-full flex-1 bg-cover lg:rounded-[16px] overflow-hidden flex flex-col">
        {!isLive && (
          <ChatOnCameraAndVideoControl
            liveStreamDetail={liveStreamDetail}
            userProfileData={userProfileData}
            calculateProgressPercentage={progress}
            isMuted={isMutedRef.current}
            toggleMute={toggleMuteUnmute}
            togglePlayPause={handlePlayToggle}
            isLive={isLive}
            isPlaying={isPlayingRef.current}
            rewind={handleRewind}
            fastForward={handleForward}
            currentTime={currentTime}
            duration={duration}
            handleMouseDown={handleMouseDown}
          />
        )}

        {!isLive ? (
          <Video
            handlePlayerReady={handlePlayerReady}
            currentTimeRef={currentTime}
            isPlaying={isPlayingRef.current}
            rewind={handleRewind}
            togglePlayPause={togglePlayPause}
            liveStreamDetail={liveStreamDetail}
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
