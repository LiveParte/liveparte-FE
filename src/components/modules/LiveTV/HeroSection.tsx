import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import EnhancedVideoControls from './EnhancedVideoControls';

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

const HeroSection: React.FC<HeroSectionProps> = ({ className = "", selectedProgram, onVideoPlay }) => {
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
  const [playbackRate, setPlaybackRate] = useState(1);

  // Refs
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hlsRef = useRef<any>(null);

  // Memoize the stream URL
  const streamUrl = useMemo(() => {
    const url = selectedProgram?.streamingUrl || "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8";
    console.log('Stream URL:', url);
    return url;
  }, [selectedProgram?.streamingUrl]);

  // Reset video state when program changes
  useEffect(() => {
    console.log('Program changed, resetting video state');
    setIsVideoPlaying(false);
    setIsPlaying(false);
    setShowControls(true);
    setCurrentTime(0);
    setTotalTime(0);
    setProgress(0);
    setError(null);
    setHlsStats(null);
    setIsHlsLoaded(false);
    setPlaybackRate(1);
    
    if (hlsRef.current) {
      console.log('Destroying existing HLS instance');
      hlsRef.current.destroy();
      hlsRef.current = null;
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

  // Initialize HLS
  useEffect(() => {
    if (!isVideoPlaying) {
      console.log('Not video playing, skipping HLS init');
      return;
    }

    const initHLS = async () => {
      await new Promise(resolve => setTimeout(resolve, 100));
      
      if (!videoRef.current) {
        console.log('Video ref not available, retrying...');
        setTimeout(initHLS, 200);
        return;
      }

      try {
        console.log('Starting HLS initialization...');
        setError(null);
        
        const Hls = (await import('hls.js')).default;
        console.log('HLS.js loaded successfully');
        
        if (Hls.isSupported()) {
          console.log('HLS.js is supported, creating instance');
          const hls = new Hls({
            debug: true,
            enableWorker: true,
            lowLatencyMode: selectedProgram?.program.status === "live",
            backBufferLength: selectedProgram?.program.status === "live" ? 30 : 90,
            maxBufferLength: selectedProgram?.program.status === "live" ? 10 : 30,
            startLevel: -1,
            capLevelToPlayerSize: true,
          });

          hlsRef.current = hls;

          hls.on(Hls.Events.MANIFEST_PARSED, () => {
            console.log('HLS manifest parsed successfully');
            setIsHlsLoaded(true);
            setError(null);
          });

          hls.on(Hls.Events.ERROR, (event: any, data: any) => {
            console.error('HLS Error:', data);
            if (data.fatal) {
              setError(`HLS Error: ${data.type} - ${data.details}`);
              setIsHlsLoaded(false);
            }
          });

          hls.on(Hls.Events.LEVEL_SWITCHED, (event: any, data: any) => {
            console.log('Quality switched to:', data.level);
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
              bitrate: hls.levels?.[hls.currentLevel]?.bitrate
            });
          });

          console.log('Loading HLS source:', streamUrl);
          hls.loadSource(streamUrl);
          hls.attachMedia(videoRef.current);

        } else if (videoRef.current?.canPlayType('application/vnd.apple.mpegurl')) {
          console.log('Using native HLS support');
          videoRef.current.src = streamUrl;
          setIsHlsLoaded(true);
        } else {
          setError('HLS is not supported in this browser');
        }
      } catch (err) {
        console.error('HLS initialization error:', err);
        setError('Failed to initialize HLS player');
      }
    };

    initHLS();

    return () => {
      if (!isVideoPlaying && hlsRef.current) {
        console.log('Cleaning up HLS instance');
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [isVideoPlaying, streamUrl, selectedProgram?.program.status]);

  // Video event listeners
  useEffect(() => {
    if (!videoRef.current || !isVideoPlaying) return;

    const video = videoRef.current;

    const handleLoadedMetadata = () => {
      console.log('Video metadata loaded');
      setTotalTime(video.duration);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
    };

    const handlePlay = () => {
      console.log('Video started playing');
      setIsPlaying(true);
    };

    const handlePause = () => {
      console.log('Video paused');
      setIsPlaying(false);
    };

    const handleVolumeChange = () => {
      setIsMuted(video.muted);
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('volumechange', handleVolumeChange);

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('volumechange', handleVolumeChange);
    };
  }, [isVideoPlaying]);

  // Enhanced control handlers
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

  const handleVolumeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
    setIsMuted(newVolume === 0);
    setShowControls(true);
  }, []);

  const handleSeekForward = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.min(videoRef.current.currentTime + 10, videoRef.current.duration);
    }
    setShowControls(true);
  }, []);

  const handleSeekBackward = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.max(videoRef.current.currentTime - 10, 0);
    }
    setShowControls(true);
  }, []);

  const handleProgressClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging || !videoRef.current || totalTime === 0) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * totalTime;
    videoRef.current.currentTime = newTime;
    setShowControls(true);
  }, [isDragging, totalTime]);

  const handleProgressMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setShowControls(true);
    
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * totalTime;
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
    }
  }, [totalTime]);

  const handleProgressMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * totalTime;
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
    }
  }, [isDragging, totalTime]);

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
        title: selectedProgram?.program.title || 'Live Stream',
        text: selectedProgram?.program.description || 'Watch this live stream',
        url: window.location.href
      });
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href);
    }
    setShowControls(true);
  }, [selectedProgram]);

  const handleSettings = useCallback(() => {
    console.log('Settings clicked');
    setShowControls(true);
  }, []);

  const handleSubtitles = useCallback(() => {
    console.log('Subtitles clicked');
    setShowControls(true);
  }, []);

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
      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDragging, totalTime]);

  const handleWatchLive = useCallback(() => {
    console.log('Watch Live clicked, starting video playback');
    setIsVideoPlaying(true);
    setIsPlaying(true);
    setShowControls(true);
  }, []);

  const handleSetReminder = useCallback(() => {
    console.log('Set reminder for program');
  }, []);

  const handleMaximize = useCallback(() => {
    console.log('Maximize clicked - opening fullscreen');
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
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }, []);

  // No program selected
  if (!selectedProgram) {
    return (
      <div className={`relative h-[500px] md:h-[600px] w-full ${className}`}>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/liveparte_banner.png')",
            filter: 'brightness(0.4)'
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
                transition={{ delay: 0.3, duration: 0.6, type: "spring", stiffness: 200 }}
              >
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
              </motion.div>
              <motion.h1 
                className="text-white text-[48px] md:text-[64px] font-bold mb-6 leading-[0.9]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                Choose Your Program
              </motion.h1>
              <motion.p 
                className="text-gray-200 text-[20px] md:text-[24px] mb-8 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
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
    <div className={`relative h-[500px] md:h-[600px] w-full ${className}`}>
      {/* Background Image - Only show when video is NOT playing or NOT loaded */}
      {(!isVideoPlaying || !isHlsLoaded) && (
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/liveparte_banner.png')",
            filter: isVideoPlaying ? 'brightness(0.6)' : 'brightness(0.4)'
          }}
        />
      )}
      
      {/* Gradient Overlay - Only show when video is NOT playing or NOT loaded */}
      {(!isVideoPlaying || !isHlsLoaded) && (
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
      )}
      
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
                    {selectedProgram.program.status === "live" ? "LIVE NOW" : "UPCOMING"}
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
              
              <motion.h1 
                className="text-white text-[56px] md:text-[72px] font-bold mb-[24px] leading-[0.9] whitespace-nowrap"
                key={`title-${selectedProgram.program.title}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                {selectedProgram.program.title}
              </motion.h1>
              
              <motion.p 
                className="text-gray-200 text-[20px] md:text-[22px] mb-[32px] leading-relaxed max-w-[600px]"
                key={`description-${selectedProgram.program.description}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                {selectedProgram.program.description}
              </motion.p>
              
              <motion.div 
                className="flex flex-wrap gap-[20px] mb-[40px]"
                key={`metadata-${selectedProgram.program.time}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <span className="text-gray-300 text-[16px]">Started {selectedProgram.program.time.split(' - ')[0]}</span>
                <span className="text-gray-300 text-[16px]">•</span>
                <span className="text-gray-300 text-[16px]">{selectedProgram.program.genre}</span>
                <span className="text-gray-300 text-[16px]">•</span>
                <span className="text-gray-300 text-[16px]">TV-14</span>
                {selectedProgram.program.timeLeft && (
                  <>
                    <span className="text-gray-300 text-[16px]">•</span>
                    <span className="text-gray-300 text-[16px]">{selectedProgram.program.timeLeft}</span>
                  </>
                )}
              </motion.div>
              
              <motion.div 
                className="flex gap-[20px]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <button 
                  onClick={handleWatchLive}
                  className="bg-white text-black px-[32px] py-[16px] rounded-[8px] font-semibold text-[16px] flex items-center gap-[12px] hover:bg-gray-100 transition-colors border-2 border-black"
                >
                  <svg className="w-[20px] h-[20px]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                  {selectedProgram.program.status === "live" ? "Watch Live" : "Set Reminder"}
                </button>
                <button 
                  onClick={handleSetReminder}
                  className="bg-gray-600 text-white px-[32px] py-[16px] rounded-[8px] font-medium text-[16px] flex items-center gap-[12px] hover:bg-gray-500 transition-colors"
                >
                  <svg className="w-[20px] h-[20px]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                  Add Channel To Favorites
                </button>
              </motion.div>
            </div>
          </motion.div>
        ) : (
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
              <div>Video Playing: {isVideoPlaying ? 'Yes' : 'No'}</div>
              <div>HLS Loaded: {isHlsLoaded ? 'Yes' : 'No'}</div>
              <div>Stream URL: {streamUrl.substring(0, 50)}...</div>
              <div>Error: {error || 'None'}</div>
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
            {isVideoPlaying && !isHlsLoaded && !error && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                  <p className="text-gray-300 text-lg">Loading stream...</p>
                  <p className="text-gray-400 text-sm mt-2">Please wait while we prepare your video</p>
                </div>
              </div>
            )}

            {/* Error Overlay */}
            {error && (
              <div className="absolute inset-0 flex items-center justify-center bg-red-900/80 z-20">
                <div className="text-center p-6 bg-black/50 rounded-lg">
                  <div className="text-red-400 text-lg font-semibold mb-2">Stream Error</div>
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
                  <span className="text-white text-lg font-medium">LIVE NOW</span>
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
                    <div>Bitrate: {Math.round(hlsStats.bitrate / 1000)}kbps</div>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HeroSection;
