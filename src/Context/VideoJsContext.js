import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

const ObjectContext = createContext();

export const VideoJSProvider = ({ children }) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoNodeRef = useRef(null); // Ref for the video DOM element

 
  const attemptPlay = async () => {
    try {
      await playerRef.current.play();
      setIsPlaying(true);
    } catch (error) {
      console.error("Autoplay failed:", error);
    }
  };

  const handlePlayPause = () => {
    if (playerRef.current.paused()) {
      playerRef.current.play();
      setIsPlaying(true);
    } else {
      playerRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleFastForward = () => {
    playerRef.current.currentTime(playerRef.current.currentTime() + 30);
  };

  const handleRewind = () => {
    playerRef.current.currentTime(playerRef.current.currentTime() - 30);
  };

  const handleMuteUnmute = () => {
    if (playerRef.current) { // Check if the player exists
      const isCurrentlyMuted = playerRef.current.muted();
      playerRef.current.muted(!isCurrentlyMuted);
      setIsMuted(!isCurrentlyMuted);
    }
  };

  const handleSeek = (event) => {
    playerRef.current.currentTime(parseFloat(event.target.value));
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, "0");
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <ObjectContext.Provider
      value={{
        videoRef,
        playerRef,
        duration,
        currentTime,
        isPlaying,
        isMuted,
        setDuration,
        setCurrentTime,
        handleFastForward,
        handleRewind,
        handleMuteUnmute,
        handleSeek,
        setIsPlaying,
        setIsMuted,
        formatTime,
        handlePlayPause,
        attemptPlay,
        videoNodeRef
      }}
    >
      {children}
    </ObjectContext.Provider>
  );
};

export const useObject = () => {
  const context = useContext(ObjectContext);
  if (!context) {
    throw new Error("useObject must be used within a VideoJSProvider");
  }
  return context;
};
