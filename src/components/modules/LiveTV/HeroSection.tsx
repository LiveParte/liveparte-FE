import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import EnhancedVideoControls from "./EnhancedVideoControls";

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
  streamingUrl?: string;
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
  const [isMuted, setIsMuted] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [hlsStats, setHlsStats] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isHlsLoaded, setIsHlsLoaded] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isFavorited, setIsFavorited] = useState(false);
  const [initAttempts, setInitAttempts] = useState(0);

  // Refs
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hlsRef = useRef<any>(null);

  // Memoize the stream URL
  const streamUrl = useMemo(() => {
    const url =
      selectedProgram?.streamingUrl ||
      "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8";
    console.log("Stream URL:", url);
    return url;
  }, [selectedProgram?.streamingUrl]);

  // Auto-start video when program is selected - FIXED ORDER
  useEffect(() => {
    if (selectedProgram) {
      console.log("Program selected, auto-starting video");
      // First reset states
      setIsVideoPlaying(false);
      setIsPlaying(false);
      setShowControls(true);
      setCurrentTime(0);
      setTotalTime(0);
      setProgress(0);
      setError(null);
      setHlsStats(null);
      setIsHlsLoaded(false);
      setInitAttempts(0);
      setIsMuted(true);
      setPlaybackRate(1);
      setIsFavorited(false);

      // Clean up existing HLS instance
      if (hlsRef.current) {
        console.log("Destroying existing HLS instance");
        hlsRef.current.destroy();
        hlsRef.current = null;
      }

      // Then start video after a small delay to ensure cleanup is complete
      setTimeout(() => {
        console.log("Starting video playback after cleanup");
        setIsVideoPlaying(true);
        setIsPlaying(true);
        setShowControls(true);
      }, 100);
    }
  }, [selectedProgram?.channelId, selectedProgram?.program.title]);

  // Auto-hide controls
  useEffect(() => {
    if (isPlaying && showControls && isVideoPlaying && !isDragging) {
      const timer = setTimeout(() => {
        setShowControls(false);
      }, 3000);
      controlsTimeoutRef.current = timer;
      return () => clearTimeout(timer);
    }
  }, [isPlaying, showControls, isVideoPlaying, isDragging]);

  // Update progress
  useEffect(() => {
    if (totalTime > 0) {
      setProgress((currentTime / totalTime) * 100);
    }
  }, [currentTime, totalTime]);

  // Initialize HLS on streamUrl change
  useEffect(() => {
    async function prepareAndStart() {
      setIsHlsLoaded(false);
      setError(null);
      setIsVideoPlaying(false);
      setIsPlaying(false);
      setShowControls(true);
      setCurrentTime(0);
      setTotalTime(0);
      setProgress(0);
      setHlsStats(null);
      setPlaybackRate(1);
      setIsFavorited(false);
      setIsMuted(true);

      if (hlsRef.current) {
        try {
          hlsRef.current.destroy();
        } catch (e) {}
        hlsRef.current = null;
      }
      await new Promise((res) => setTimeout(res, 100));
      setIsVideoPlaying(true);
    }
    prepareAndStart();
  }, [streamUrl, selectedProgram?.program.status]);

  // Actually start/attach HLS when isVideoPlaying true (as before)
  useEffect(() => {
    if (!isVideoPlaying) return;

    const initHLS = async () => {
      await new Promise((resolve) => setTimeout(resolve, 200));

      if (!videoRef.current) {
        console.log("Video ref not available, retrying...");
        setTimeout(initHLS, 200);
        return;
      }

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

          hls.on(Hls.Events.MEDIA_ATTACHED, () => {
            console.log("Media attached - attempting autoplay");
            if (videoRef.current) {
              videoRef.current.muted = true;
              videoRef.current.play().catch(() => {});
            }
          });

          hls.on(Hls.Events.MANIFEST_PARSED, () => {
            console.log("HLS manifest parsed successfully");
            setIsHlsLoaded(true);
            setError(null);
            if (videoRef.current) {
              videoRef.current.muted = true;
              videoRef.current.play().catch(() => {});
            }
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

          hls.on(Hls.Events.LEVEL_LOADED, () => {
            setIsHlsLoaded(true);
          });

          hls.on(Hls.Events.FRAG_LOADED, (event: any, data: any) => {
            setHlsStats({
              level: hls.currentLevel,
              levels: hls.levels?.length || 0,
              loadTime: data.stats?.loading?.end - data.stats?.loading?.start,
              fragUrl: data.frag?.url,
              bitrate: hls.levels?.[hls.currentLevel]?.bitrate,
            });
            setIsHlsLoaded(true);
          });

          console.log("Attaching media and loading HLS source:", streamUrl);
          hls.attachMedia(videoRef.current);
          hls.loadSource(streamUrl);
        } else if (
          videoRef.current?.canPlayType("application/vnd.apple.mpegurl")
        ) {
          console.log("Using native HLS support");
          const v = videoRef.current;
          v.src = streamUrl;
          // Mark loaded on canplay for native
          const nativeCanPlay = () => {
            setIsHlsLoaded(true);
            v.removeEventListener("canplay", nativeCanPlay);
          };
          v.addEventListener("canplay", nativeCanPlay);
          try {
            v.load();
            v.play().catch(() => {});
          } catch (_) {}
        } else {
          setError("HLS is not supported in this browser");
        }
      } catch (err) {
        console.error("HLS initialization error:", err);
        setError("Failed to initialize HLS player");
      }
    };

    initHLS();

    return () => {
      if (hlsRef.current) {
        try {
          console.log("Cleaning up HLS instance");
          hlsRef.current.destroy();
        } catch (_) {}
        hlsRef.current = null;
      }
    };
  }, [isVideoPlaying, streamUrl, selectedProgram?.program.status]);

  // Watchdog retry if HLS doesn't load in time
  useEffect(() => {
    if (!isVideoPlaying || isHlsLoaded || error) return;
    const timer = setTimeout(() => {
      if (!isHlsLoaded && !error) {
        if (initAttempts < 2) {
          console.warn("HLS init slow, retrying", {
            attempt: initAttempts + 1,
          });
          setInitAttempts((n) => n + 1);
          setIsVideoPlaying(false);
          setTimeout(() => setIsVideoPlaying(true), 150);
        } else {
          setError("Unable to load stream. Please try another program.");
        }
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, [isVideoPlaying, isHlsLoaded, error, initAttempts, streamUrl]);

  // Video event listeners - FIXED TO SYNC STATE PROPERLY
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
      console.log("Video PLAY event - setting isPlaying to true");
      setIsPlaying(true);
    };

    const handlePause = () => {
      console.log("Video PAUSE event - setting isPlaying to false");
      setIsPlaying(false);
    };

    const handleVolumeChange = () => {
      setIsMuted(video.muted);
    };

    const handleCanPlay = () => {
      console.log("Video can play");
    };

    const handleWaiting = () => {
      console.log("Video waiting");
    };

    const handlePlaying = () => {
      console.log("Video playing event - setting isPlaying to true");
      setIsPlaying(true);
    };

    const handleEnded = () => {
      console.log("Video ended - restarting loop");
      if (videoRef.current) {
        try {
          videoRef.current.currentTime = 0;
          // Attempt to play again for loop behavior
          videoRef.current.play().catch(() => {
            setIsPlaying(false);
          });
        } catch (_) {
          setIsPlaying(false);
        }
      } else {
        setIsPlaying(false);
      }
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);
    video.addEventListener("volumechange", handleVolumeChange);
    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("waiting", handleWaiting);
    video.addEventListener("playing", handlePlaying);
    video.addEventListener("ended", handleEnded);

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("volumechange", handleVolumeChange);
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("waiting", handleWaiting);
      video.removeEventListener("playing", handlePlaying);
      video.removeEventListener("ended", handleEnded);
    };
  }, [isVideoPlaying]);

  // FIXED: Play/pause handler with proper state sync
  const handlePlayPause = useCallback(() => {
    console.log("=== PLAY/PAUSE CLICKED ===");
    console.log("Current isPlaying state:", isPlaying);
    console.log("Video ref exists:", !!videoRef.current);

    if (videoRef.current) {
      console.log("Video paused state:", videoRef.current.paused);
      console.log("Video ready state:", videoRef.current.readyState);

      // Sync state with actual video state first
      const videoPaused = videoRef.current.paused;
      console.log("Video is actually paused:", videoPaused);

      if (videoPaused) {
        console.log("Video is paused, attempting to PLAY");
        videoRef.current
          .play()
          .then(() => {
            console.log("Play promise resolved - video should be playing");
          })
          .catch((err) => {
            console.error("Play promise rejected:", err);
          });
      } else {
        console.log("Video is playing, attempting to PAUSE");
        videoRef.current.pause();
        console.log("Pause command sent");
      }
    } else {
      console.error("Video ref is null!");
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

  const handleSeekForward = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.min(
        videoRef.current.currentTime + 10,
        videoRef.current.duration
      );
    }
    setShowControls(true);
  }, []);

  const handleSeekBackward = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.max(
        videoRef.current.currentTime - 10,
        0
      );
    }
    setShowControls(true);
  }, []);

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

  const handleFullscreen = useCallback(() => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      } else if ((videoRef.current as any).webkitRequestFullscreen) {
        (videoRef.current as any).webkitRequestFullscreen();
      } else if ((videoRef.current as any).msRequestFullscreen) {
        (videoRef.current as any).msRequestFullscreen();
      }
    }
    setShowControls(true);
  }, []);

  const handleShare = useCallback(() => {
    if (navigator.share) {
      navigator.share({
        title: selectedProgram?.program.title || "Live Stream",
        text: selectedProgram?.program.description || "Watch this live stream",
        url: window.location.href,
      });
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href);
    }
    setShowControls(true);
  }, [selectedProgram]);

  const handleSettings = useCallback(() => {
    console.log("Settings clicked");
    setShowControls(true);
  }, []);

  const handleSubtitles = useCallback(() => {
    console.log("Subtitles clicked");
    setShowControls(true);
  }, []);

  const handleAddToFavorites = useCallback(() => {
    setIsFavorited(!isFavorited);
    console.log("Add to favorites clicked:", !isFavorited);
    setShowControls(true);
  }, [isFavorited]);

  // Global mouse events for dragging
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

  // No program selected
  if (!selectedProgram) {
    return (
      <div className={`relative h-full w-full ${className}`}>
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/liveparte_banner.png')",
            filter: "brightness(0.4)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center px-[60px] md:px-[80px] lg:px-[120px] max-w-[800px]">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
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
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative h-full w-full ${className}`}>
      {/* Background Image - Only show while stream not loaded */}
      {!isHlsLoaded && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/liveparte_banner.png')",
            filter: "brightness(0.4)",
          }}
        />
      )}

      {/* Gradient Overlay - Only show while stream not loaded */}
      {!isHlsLoaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
      )}

      <AnimatePresence mode="wait">
        {selectedProgram ? (
          // Video Player View
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
              <div>Is Playing: {isPlaying ? "Yes" : "No"}</div>
              <div>Video Paused: {videoRef.current?.paused ? "Yes" : "No"}</div>
              <div>Stream URL: {streamUrl.substring(0, 50)}...</div>
              <div>Error: {error || "None"}</div>
            </div>

            {/* Video Element */}
            <video
              ref={videoRef}
              key={streamUrl}
              className="w-full h-full object-cover"
              controls={false}
              muted={isMuted}
              playsInline
              preload="auto"
              autoPlay={true}
              loop
            />

            {/* Floating Audio Control Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              onClick={handleMuteToggle}
              className="absolute top-6 right-6 z-20 bg-black/70 backdrop-blur-sm border border-white/30 rounded-full p-3 hover:bg-black/80 hover:border-white/50 transition-all duration-300 group shadow-lg"
            >
              {isMuted ? (
                <VolumeX className="w-5 h-5 text-white/80" />
              ) : (
                <Volume2 className="w-5 h-5 text-white" />
              )}
            </motion.button>

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

            {/* Program Info Overlay */}
            <motion.div
              className="absolute bottom-24 left-6 z-20 max-w-2xl"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: showControls ? 1 : 0, y: 0 }}
              transition={{ duration: 0.3 }}
            >
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
              <h1 className="text-white text-4xl md:text-5xl font-bold mb-3 leading-tight">
                {selectedProgram.program.title}
              </h1>
              <p className="text-gray-300 text-xl mb-4">
                {selectedProgram.program.genre}
              </p>
              <p className="text-gray-200 text-lg max-w-xl">
                {selectedProgram.program.description}
              </p>
            </motion.div>

            {/* Enhanced Video Controls */}
            <EnhancedVideoControls
              isPlaying={isPlaying}
              isMuted={isMuted}
              volume={volume}
              currentTime={currentTime}
              totalTime={totalTime}
              progress={progress}
              isDragging={isDragging}
              showControls={showControls}
              onPlayPause={handlePlayPause}
              onMuteToggle={handleMuteToggle}
              onVolumeChange={handleVolumeChange}
              onProgressClick={handleProgressClick}
              onProgressMouseDown={handleProgressMouseDown}
              onProgressMouseMove={handleProgressMouseMove}
              onProgressMouseUp={handleProgressMouseUp}
              onSeekForward={handleSeekForward}
              onSeekBackward={handleSeekBackward}
              onFullscreen={handleFullscreen}
              onShare={handleShare}
              onSettings={handleSettings}
              onSubtitles={handleSubtitles}
              onAddToFavorites={handleAddToFavorites}
              isFavorited={isFavorited}
              formatTime={formatTime}
              progressRef={progressRef}
            />

            {/* Click to show/hide controls overlay */}
            <div
              className="absolute inset-0 z-10"
              onClick={() => setShowControls(!showControls)}
            />

            {/* HLS Stats Overlay */}
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
        ) : null}
      </AnimatePresence>
    </div>
  );
};

export default HeroSection;
