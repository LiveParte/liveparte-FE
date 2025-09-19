import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SelectedProgram {
  program: {
    title: string;
    time: string;
    status: "live" | "upcoming";
    description: string;
    genre: string;
    timeLeft?: string | null;
    breaking?: boolean;
    progress?: number;
  };
  channelId: string;
  index: number;
  channelName: string;
  channelLogo: string;
  streamingUrl?: string; // Add streaming URL for HLS
}

interface HeroSectionProps {
  className?: string;
  selectedProgram?: SelectedProgram | null;
  onVideoPlay?: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  className = "",
  selectedProgram,
  onVideoPlay,
}) => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [hlsStats, setHlsStats] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isHlsLoaded, setIsHlsLoaded] = useState(false);

  // Refs
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hlsRef = useRef<any>(null);

  // Memoize the stream URL to prevent re-renders
  const streamUrl = useMemo(() => {
    const url =
      selectedProgram?.streamingUrl ||
      "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8";
    console.log("Stream URL:", url);
    return url;
  }, [selectedProgram?.streamingUrl]);

  // Reset video state when program changes
  useEffect(() => {
    console.log("Program changed, resetting video state");
    setIsVideoPlaying(false);
    setIsPlaying(false);
    setShowControls(true);
    setCurrentTime(0);
    setTotalTime(0);
    setProgress(0);
    setError(null);
    setHlsStats(null);
    setIsHlsLoaded(false);

    // Clean up existing HLS instance
    if (hlsRef.current) {
      console.log("Destroying existing HLS instance");
      hlsRef.current.destroy();
      hlsRef.current = null;
    }
  }, [selectedProgram?.channelId, selectedProgram?.program.title]);

  // Auto-hide controls after 3 seconds
  useEffect(() => {
    if (isPlaying && showControls && isVideoPlaying && !isDragging) {
      const timer = setTimeout(() => {
        setShowControls(false);
      }, 3000);
      controlsTimeoutRef.current = timer;
      return () => clearTimeout(timer);
    }
  }, [isPlaying, showControls, isVideoPlaying, isDragging]);

  // Update progress based on current time
  useEffect(() => {
    if (totalTime > 0) {
      setProgress((currentTime / totalTime) * 100);
    }
  }, [currentTime, totalTime]);

  // Initialize HLS when video starts playing - SIMPLIFIED LIKE HLS-TEST
  useEffect(() => {
    if (!isVideoPlaying || !videoRef.current) {
      console.log("Skipping HLS init - not ready:", {
        isVideoPlaying,
        hasVideo: !!videoRef.current,
      });
      return;
    }

    const initHLS = async () => {
      try {
        console.log("Starting HLS initialization...");
        setError(null);

        const Hls = (await import("hls.js")).default;
        console.log("HLS.js loaded successfully");

        if (Hls.isSupported()) {
          console.log("HLS.js is supported, creating instance");
          const hls = new Hls({
            debug: true,
            enableWorker: true,
            lowLatencyMode: selectedProgram?.program.status === "live",
            backBufferLength:
              selectedProgram?.program.status === "live" ? 30 : 90,
            maxBufferLength:
              selectedProgram?.program.status === "live" ? 10 : 30,
            startLevel: -1,
            capLevelToPlayerSize: true,
          });

          hlsRef.current = hls;

          hls.on(Hls.Events.MANIFEST_PARSED, () => {
            console.log("HLS manifest parsed successfully");
            setIsHlsLoaded(true);
            setError(null);
          });

          hls.on(Hls.Events.ERROR, (event: any, data: any) => {
            console.error("HLS Error:", data);
            if (data.fatal) {
              setError(`HLS Error: ${data.type} - ${data.details}`);
              setIsHlsLoaded(false);
            }
          });

          hls.on(Hls.Events.LEVEL_SWITCHED, (event: any, data: any) => {
            console.log("Quality switched to:", data.level);
            setHlsStats({
              level: data.level,
              levels: hls.levels?.length || 0,
              bitrate: hls.levels?.[data.level]?.bitrate,
            });
          });

          hls.on(Hls.Events.FRAG_LOADED, (event: any, data: any) => {
            setHlsStats({
              level: hls.currentLevel,
              levels: hls.levels?.length || 0,
              loadTime: data.stats?.loading?.end - data.stats?.loading?.start,
              fragUrl: data.frag?.url,
              bitrate: hls.levels?.[hls.currentLevel]?.bitrate,
            });
          });

          console.log("Loading HLS source:", streamUrl);
          hls.loadSource(streamUrl);
          hls.attachMedia(videoRef.current);
        } else if (
          videoRef.current?.canPlayType("application/vnd.apple.mpegurl")
        ) {
          // Native HLS support (Safari)
          console.log("Using native HLS support");
          videoRef.current.src = streamUrl;
          setIsHlsLoaded(true);
        } else {
          setError("HLS is not supported in this browser");
        }
      } catch (err) {
        console.error("HLS initialization error:", err);
        setError("Failed to initialize HLS player");
      }
    };

    initHLS();

    // Cleanup function
    return () => {
      if (hlsRef.current) {
        console.log("Cleaning up HLS instance");
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [isVideoPlaying, streamUrl, selectedProgram?.program.status]);

  // Video event listeners - SIMPLIFIED LIKE HLS-TEST
  useEffect(() => {
    if (!videoRef.current || !isVideoPlaying) return;

    const video = videoRef.current;

    const handleLoadedMetadata = () => {
      console.log("Video metadata loaded");
      setTotalTime(video.duration);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
    };

    const handlePlay = () => {
      console.log("Video started playing");
      setIsPlaying(true);
    };

    const handlePause = () => {
      console.log("Video paused");
      setIsPlaying(false);
    };

    const handleVolumeChange = () => {
      setIsMuted(video.muted);
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);
    video.addEventListener("volumechange", handleVolumeChange);

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("volumechange", handleVolumeChange);
    };
  }, [isVideoPlaying]);

  // Memoized callbacks to prevent re-renders
  const handlePlayPause = useCallback(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
    setShowControls(true);
  }, [isPlaying]);

  const handleMuteToggle = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
    setShowControls(true);
  }, [isMuted]);

  const handleVolumeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newVolume = parseFloat(e.target.value);
      setVolume(newVolume);
      if (videoRef.current) {
        videoRef.current.volume = newVolume;
      }
      setIsMuted(newVolume === 0);
      setShowControls(true);
    },
    []
  );

  const handleProgressClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isDragging || !videoRef.current || totalTime === 0) return;

      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const newTime = (clickX / rect.width) * totalTime;
      videoRef.current.currentTime = newTime;
      setShowControls(true);
    },
    [isDragging, totalTime]
  );

  const handleProgressMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      setIsDragging(true);
      setShowControls(true);

      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const newTime = (clickX / rect.width) * totalTime;
      if (videoRef.current) {
        videoRef.current.currentTime = newTime;
      }
    },
    [totalTime]
  );

  const handleProgressMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isDragging) return;

      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const newTime = (clickX / rect.width) * totalTime;
      if (videoRef.current) {
        videoRef.current.currentTime = newTime;
      }
    },
    [isDragging, totalTime]
  );

  const handleProgressMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Add global mouse events for dragging
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (isDragging && progressRef.current) {
        const rect = progressRef.current.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const newTime = (clickX / rect.width) * totalTime;
        if (videoRef.current) {
          videoRef.current.currentTime = newTime;
        }
      }
    };

    const handleGlobalMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleGlobalMouseMove);
      document.addEventListener("mouseup", handleGlobalMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleGlobalMouseMove);
      document.removeEventListener("mouseup", handleGlobalMouseUp);
    };
  }, [isDragging, totalTime]);

  const handleWatchLive = useCallback(() => {
    console.log("Watch Live clicked, starting video playback");
    setIsVideoPlaying(true);
    setIsPlaying(true);
    setShowControls(true);
  }, []);

  const handleSetReminder = useCallback(() => {
    // Handle set reminder functionality
    console.log("Set reminder for program");
  }, []);

  const handleMaximize = useCallback(() => {
    console.log("Maximize clicked - opening fullscreen");
    if (onVideoPlay) {
      onVideoPlay();
    }
  }, [onVideoPlay]);

  const handleMouseMove = useCallback(() => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);
  }, []);

  const formatTime = useCallback((time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }, []);

  // If no program is selected, show the selection prompt
  if (!selectedProgram) {
    return (
      <div className={`relative h-[500px] md:h-[600px] w-full ${className}`}>
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/liveparte_banner.png')",
            filter: "brightness(0.4)",
          }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />

        {/* Content */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center px-[60px] md:px-[80px] lg:px-[120px] max-w-[800px]">
            {/* Main prompt */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {/* Icon */}
              <motion.div
                className="mx-auto mb-8 w-20 h-20 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  delay: 0.3,
                  duration: 0.6,
                  type: "spring",
                  stiffness: 200,
                }}
              >
                <svg
                  className="w-10 h-10 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                    clipRule="evenodd"
                  />
                </svg>
              </motion.div>

              {/* Title */}
              <motion.h1
                className="text-white text-[48px] md:text-[64px] font-bold mb-6 leading-[0.9]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.4,
                  duration: 0.6,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                Choose Your Program
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                className="text-gray-200 text-[20px] md:text-[24px] mb-8 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.5,
                  duration: 0.6,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                Select any program from the guide below to start watching
              </motion.p>

              {/* Features */}
              <motion.div
                className="flex flex-wrap justify-center gap-6 mb-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.6,
                  duration: 0.6,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                <div className="flex items-center gap-2 text-gray-300">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-[16px]">Live Programs</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-[16px]">Breaking News</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-[16px]">Upcoming Shows</span>
                </div>
              </motion.div>

              {/* Scroll indicator */}
              <motion.div
                className="flex flex-col items-center gap-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.8,
                  duration: 0.6,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                <span className="text-gray-400 text-[14px] font-medium">
                  Scroll down to browse programs
                </span>
                <motion.div
                  className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center"
                  animate={{
                    y: [0, 8, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <motion.div
                    className="w-1 h-3 bg-gray-400 rounded-full mt-2"
                    animate={{
                      y: [0, 12, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  // Show program details first, then video player when "Watch Live" is clicked
  return (
    <div className={`relative h-[500px] md:h-[600px] w-full ${className}`}>
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/liveparte_banner.png')",
          filter: isVideoPlaying ? "brightness(0.6)" : "brightness(0.4)",
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />

      <AnimatePresence mode="wait">
        {!isVideoPlaying ? (
          // Program Details View
          <motion.div
            key="program-details"
            className="relative z-10 h-full flex items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="px-[60px] md:px-[80px] lg:px-[120px] max-w-[800px]">
              {/* Channel Info - Dynamic channel logo and LIVE indicator */}
              <motion.div
                className="flex items-center gap-[16px] mb-[24px]"
                key={`channel-${selectedProgram.channelName}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <div className="bg-red-600 text-white px-[16px] py-[8px] rounded-[6px] text-[16px] font-bold">
                  {selectedProgram.channelLogo}
                </div>
                <div className="flex items-center gap-[8px]">
                  <div className="w-[6px] h-[6px] bg-red-500 rounded-full"></div>
                  <span className="text-white text-[16px] font-medium">
                    {selectedProgram.program.status === "live"
                      ? "LIVE NOW"
                      : "UPCOMING"}
                  </span>
                </div>
                {selectedProgram.program.breaking && (
                  <motion.div
                    className="bg-blue-600 text-white px-[12px] py-[4px] rounded-[4px] text-[12px] font-bold"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                  >
                    BREAKING
                  </motion.div>
                )}
              </motion.div>

              {/* Title - Dynamic with animation */}
              <motion.h1
                className="text-white text-[56px] md:text-[72px] font-bold mb-[24px] leading-[0.9] whitespace-nowrap"
                key={`title-${selectedProgram.program.title}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                {selectedProgram.program.title}
              </motion.h1>

              {/* Description - Dynamic with animation */}
              <motion.p
                className="text-gray-200 text-[20px] md:text-[22px] mb-[32px] leading-relaxed max-w-[600px]"
                key={`description-${selectedProgram.program.description}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.2,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                {selectedProgram.program.description}
              </motion.p>

              {/* Metadata - Dynamic with animation */}
              <motion.div
                className="flex flex-wrap gap-[20px] mb-[40px]"
                key={`metadata-${selectedProgram.program.time}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.3,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                <span className="text-gray-300 text-[16px]">
                  Started {selectedProgram.program.time.split(" - ")[0]}
                </span>
                <span className="text-gray-300 text-[16px]">•</span>
                <span className="text-gray-300 text-[16px]">
                  {selectedProgram.program.genre}
                </span>
                <span className="text-gray-300 text-[16px]">•</span>
                <span className="text-gray-300 text-[16px]">TV-14</span>
                {selectedProgram.program.timeLeft && (
                  <>
                    <span className="text-gray-300 text-[16px]">•</span>
                    <span className="text-gray-300 text-[16px]">
                      {selectedProgram.program.timeLeft}
                    </span>
                  </>
                )}
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                className="flex gap-[20px]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.4,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                <button
                  onClick={handleWatchLive}
                  className="bg-white text-black px-[32px] py-[16px] rounded-[8px] font-semibold text-[16px] flex items-center gap-[12px] hover:bg-gray-100 transition-colors border-2 border-black"
                >
                  <svg
                    className="w-[20px] h-[20px]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {selectedProgram.program.status === "live"
                    ? "Watch Live"
                    : "Set Reminder"}
                </button>
                <button
                  onClick={handleSetReminder}
                  className="bg-gray-600 text-white px-[32px] py-[16px] rounded-[8px] font-medium text-[16px] flex items-center gap-[12px] hover:bg-gray-500 transition-colors"
                >
                  <svg
                    className="w-[20px] h-[20px]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Add Channel To Favorites
                </button>
              </motion.div>
            </div>
          </motion.div>
        ) : (
          // Video Player View with Direct HLS Integration
          <motion.div
            key="video-player"
            className="relative z-10 h-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            onMouseMove={handleMouseMove}
          >
            {/* Debug Info */}
            <div className="absolute top-4 left-4 z-50 bg-black/50 text-white p-2 rounded text-xs">
              <div>Video Playing: {isVideoPlaying ? "Yes" : "No"}</div>
              <div>HLS Loaded: {isHlsLoaded ? "Yes" : "No"}</div>
              <div>Stream URL: {streamUrl.substring(0, 50)}...</div>
              <div>Error: {error || "None"}</div>
            </div>

            {/* Video Element */}
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              controls={false}
              muted={isMuted}
              playsInline
              preload="metadata"
              autoPlay={true}
            />

            {/* Loading Overlay */}
            {!isHlsLoaded && !error && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                  <p className="text-gray-300 text-lg">Loading stream...</p>
                  <p className="text-gray-400 text-sm mt-2">
                    Please wait while we prepare your video
                  </p>
                </div>
              </div>
            )}

            {/* Error Overlay */}
            {error && (
              <div className="absolute inset-0 flex items-center justify-center bg-red-900/80 z-20">
                <div className="text-center p-6 bg-black/50 rounded-lg">
                  <div className="text-red-400 text-lg font-semibold mb-2">
                    Stream Error
                  </div>
                  <p className="text-red-200 mb-4">{error}</p>
                  <button
                    onClick={() => {
                      setError(null);
                      setIsHlsLoaded(false);
                      if (hlsRef.current) {
                        hlsRef.current.destroy();
                        hlsRef.current = null;
                      }
                    }}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
                  >
                    Retry
                  </button>
                </div>
              </div>
            )}

            {/* Program Info Overlay - Bottom Left */}
            <motion.div
              className="absolute bottom-24 left-6 z-20 max-w-2xl"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: showControls ? 1 : 0, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Channel and Status */}
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-red-600 text-white px-4 py-2 rounded text-lg font-bold">
                  {selectedProgram.channelLogo}
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-white text-lg font-medium">
                    LIVE NOW
                  </span>
                </div>
                {selectedProgram.program.breaking && (
                  <div className="bg-blue-600 text-white px-3 py-1 rounded text-sm font-bold">
                    BREAKING
                  </div>
                )}
              </div>

              {/* Title */}
              <h1 className="text-white text-4xl md:text-5xl font-bold mb-3 leading-tight">
                {selectedProgram.program.title}
              </h1>

              {/* Genre */}
              <p className="text-gray-300 text-xl mb-4">
                {selectedProgram.program.genre}
              </p>

              {/* Description */}
              <p className="text-gray-200 text-lg max-w-xl">
                {selectedProgram.program.description}
              </p>
            </motion.div>

            {/* Enhanced Video Controls - Bottom */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 z-30"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: showControls ? 1 : 0, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Progress Bar */}
              <div className="w-full bg-black/30 px-6 py-3">
                <div
                  ref={progressRef}
                  className="w-full bg-gray-600 h-2 rounded-full cursor-pointer group select-none"
                  onClick={handleProgressClick}
                  onMouseDown={handleProgressMouseDown}
                  onMouseMove={handleProgressMouseMove}
                  onMouseUp={handleProgressMouseUp}
                >
                  <div className="relative h-full">
                    <motion.div
                      className="bg-white h-2 rounded-full"
                      style={{ width: `${progress}%` }}
                      transition={{ duration: isDragging ? 0 : 0.1 }}
                    />
                    {/* Progress handle */}
                    <div
                      className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full transition-opacity shadow-lg ${
                        isDragging
                          ? "opacity-100"
                          : "opacity-0 group-hover:opacity-100"
                      }`}
                      style={{
                        left: `${progress}%`,
                        transform: "translate(-50%, -50%)",
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Main Controls Bar */}
              <div className="bg-gradient-to-t from-black/90 to-black/60 px-8 py-6">
                <div className="flex items-center justify-between">
                  {/* Left Side - Play Controls */}
                  <div className="flex items-center gap-6">
                    {/* Play/Pause Button */}
                    <button
                      onClick={handlePlayPause}
                      className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-200 hover:scale-105"
                    >
                      {isPlaying ? (
                        <svg
                          className="w-8 h-8"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 00-1 1v2a1 1 0 002 0V9a1 1 0 00-1-1zm4 0a1 1 0 00-1 1v2a1 1 0 102 0V9a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="w-8 h-8 ml-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </button>

                    {/* Time Display */}
                    <div className="text-white text-lg font-mono min-w-[120px]">
                      {formatTime(currentTime)} / {formatTime(totalTime)}
                    </div>

                    {/* Volume Control */}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={handleMuteToggle}
                        className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-200"
                      >
                        {isMuted || volume === 0 ? (
                          <svg
                            className="w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.816L4.617 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.617l3.766-3.816a1 1 0 011.617.816zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ) : (
                          <svg
                            className="w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.816L4.617 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.617l3.766-3.816a1 1 0 011.617.816zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </button>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={isMuted ? 0 : volume}
                        onChange={handleVolumeChange}
                        className="w-32 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
                        style={{
                          background: `linear-gradient(to right, #fff 0%, #fff ${
                            isMuted ? 0 : volume * 100
                          }%, #4b5563 ${
                            isMuted ? 0 : volume * 100
                          }%, #4b5563 100%)`,
                        }}
                      />
                    </div>

                    {/* Closed Captions */}
                    <button className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-200">
                      <span className="text-lg font-medium">CC</span>
                    </button>
                  </div>

                  {/* Right Side - Action Controls */}
                  <div className="flex items-center gap-4">
                    {/* Share */}
                    <button className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-200 hover:scale-105">
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.314l4.94 2.47A3 3 0 1015 12a3 3 0 00-2.473-1.12l-4.94-2.47a3 3 0 000-1.764l4.94-2.47A3 3 0 0015 8z" />
                      </svg>
                    </button>

                    {/* Settings */}
                    <button className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-200 hover:scale-105">
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Click to show/hide controls overlay */}
            <div
              className="absolute inset-0 z-10"
              onClick={() => setShowControls(!showControls)}
            />

            {/* HLS Stats Overlay - Top Right */}
            {hlsStats && (
              <motion.div
                className="absolute top-6 right-6 z-20 bg-black/50 backdrop-blur-sm rounded-lg p-4 text-white text-sm"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="font-semibold mb-2">HLS Stats</div>
                <div className="space-y-1">
                  <div>Quality: {hlsStats.level}</div>
                  <div>Available: {hlsStats.levels}</div>
                  {hlsStats.bitrate && (
                    <div>
                      Bitrate: {Math.round(hlsStats.bitrate / 1000)}kbps
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #ffffff;
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
        }
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #ffffff;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
        }
      `}</style>
    </div>
  );
};

export default HeroSection;
