import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

const ObjectContext = createContext();

export const ObjectProvider = ({ children }) => {
  const [stopScrolling,setStopScrolling] =useState(false);
  const [myObject, setMyObject] = useState({});
  const [liveStreamShow, setLiveStreamShow] = useState(null);
  const [routerLoader, setRouterLoader] = useState(null);
  const [isPlaying, setIsPlaying] = useState(true); // Start in playing state
  const [userPause,isUserPause]=useState(true);
  const [isMuted, setIsMuted] = useState(true); // Start muted to allow autoplay
  const [hasUnmutedAutomatically, setHasUnmutedAutomatically] = useState(false); // Track if video has been unmuted automatically
  const [duration, setDuration] = useState(0); // Total video duration
  const [playedSeconds, setPlayedSeconds] = useState(0); // Current time played
  const playerRef = useRef(null); // Reference to the video player
  const progressRef = useRef(null); // Reference for the progress bar
  const [isDragging, setIsDragging] = useState(false); // Track dragging state

  


  // console.log(playerRef,'playerRef')

  // Automatically unmute after a delay when autoplay works, only once
  // useEffect(() => {
  //   if (!playerRef?.current?.player?.isPlaying) {
  //     const timer = setTimeout(() => {
  //       setIsMuted(false);
        
  //       if (playerRef.current ) {
  //         setIsPlaying(true);
  //         setIsMuted(false);
  //       }
  //       // setHasUnmutedAutomatically(true); // Mark that the video has been unmuted automatically
  //     }, 1000); // 1 second delay before unmuting

  //     return () => clearTimeout(timer); // Cleanup timer on unmount or change
  //   }
  // }, [isMuted, hasUnmutedAutomatically,playerRef?.current?.player?.isPlaying,userPause]);


  // Toggle play/pause
  const togglePlayPause = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  // Toggle mute/unmute
  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
  }, []);

  // Handle fast forward by 10 seconds
  const handleFastForward = () => {
    if (playerRef.current) {
      const newTime = Math.min(playedSeconds + 10, duration); // Ensure it doesn't exceed duration
      playerRef.current.seekTo(newTime);
    }
  };

  // Handle rewind by 10 seconds
  const handleRewind = () => {
    if (playerRef.current) {
      const newTime = Math.max(playedSeconds - 10, 0); // Ensure it doesn't go below 0
      playerRef.current.seekTo(newTime);
    }
  };

  // Handle progress updates
  const handleProgress = (state) => {
    setPlayedSeconds(state.playedSeconds); // Update current time
  };

  // Handle video duration load
  const handleDuration = (duration) => {
    setDuration(duration); // Set total duration
  };

  // Format seconds to mm:ss format
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds}`;
  };

  // Handle seeking via progress bar
  const handleSeek = (event) => {
    const rect = progressRef.current.getBoundingClientRect();
    const clickX = event.clientX - rect.left; // X position relative to the progress bar
    const newTime = (clickX / rect.width) * duration; // Calculate time based on click position
    playerRef.current.seekTo(newTime);
    setPlayedSeconds(newTime);
  };

  // Handle mouse down event on the progress bar to start dragging
  const handleMouseDown = (event) => {
    setIsDragging(true);
    handleSeek(event);
  };

  // Handle mouse move event during dragging
  const handleMouseMove = (event) => {
    if (isDragging) {
      handleSeek(event);
    }
  };

  // Handle mouse up event to stop dragging
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handlePreventScroll = (state) =>{
    setStopScrolling(state)
  }

  return (
    <ObjectContext.Provider
      value={{
        myObject,
        setMyObject,
        liveStreamShow,
        setLiveStreamShow,
        routerLoader,
        setRouterLoader,
        playerRef,
        progressRef,
        isPlaying,
        isMuted,
        playedSeconds,
        duration,
        isDragging,
        togglePlayPause,
        toggleMute,
        handleFastForward,
        handleRewind,
        handleProgress,
        handleDuration,
        formatTime,
        handleMouseDown,
        handleMouseMove,
        handleMouseUp,
        stopScrolling,
        handlePreventScroll,
        isUserPause
      }}
    >
      {children}
    </ObjectContext.Provider>
  );
};

export const useObject = () => {
  const context = useContext(ObjectContext);

  if (!context) {
    throw new Error("useObject must be used within an ObjectProvider");
  }

  return context;
};
