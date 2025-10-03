"use client";
import React, {
  useRef,
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";

// Dynamic import for HLS.js to avoid ES module issues
let Hls: any = null;

const HLSPlayer = forwardRef<any, any>(
  (
    {
      src,
      autoPlay = false,
      muted = false,
      controls = true,
      className = "",
      onPlay,
      onPause,
      onTimeUpdate,
      onLoadedMetadata,
      onError,
      onHlsStats,
      isLive = false,
      debug = false,
    },
    ref
  ) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const hlsRef = useRef<any>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(muted);
    const [error, setError] = useState<string | null>(null);
    const [hlsLoaded, setHlsLoaded] = useState(false);

    // Load HLS.js dynamically
    useEffect(() => {
      const loadHls = async () => {
        try {
          const hlsModule = await import("hls.js");
          Hls = hlsModule.default;
          setHlsLoaded(true);
        } catch (err) {
          console.error("Failed to load HLS.js:", err);
          setError("Failed to load HLS.js library");
        }
      };
      loadHls();
    }, []);

    // Expose methods to parent component
    useImperativeHandle(ref, () => ({
      play: () => {
        if (videoRef.current) {
          videoRef.current.play();
        }
      },
      pause: () => {
        if (videoRef.current) {
          videoRef.current.pause();
        }
      },
      seek: (time: number) => {
        if (videoRef.current) {
          videoRef.current.currentTime = time;
        }
      },
      setVolume: (vol: number) => {
        setVolume(vol);
        if (videoRef.current) {
          videoRef.current.volume = vol;
        }
      },
      setMuted: (mute: boolean) => {
        setIsMuted(mute);
        if (videoRef.current) {
          videoRef.current.muted = mute;
        }
      },
      getCurrentTime: () => currentTime,
      getDuration: () => duration,
      getHlsInstance: () => hlsRef.current,
    }));

    // Initialize HLS
    useEffect(() => {
      if (!src || !videoRef.current || !hlsLoaded || !Hls) return;

      const video = videoRef.current;

      // Clean up previous HLS instance
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }

      if (Hls.isSupported()) {
        const hls = new Hls({
          debug: debug,
          // enableWorker: true,
          lowLatencyMode: isLive,
          backBufferLength: isLive ? 30 : 90,
          maxBufferLength: isLive ? 10 : 30,
          maxMaxBufferLength: isLive ? 30 : 600,
          liveSyncDurationCount: isLive ? 1 : 3,
          liveMaxLatencyDurationCount: isLive ? 2 : 5,
          startLevel: -1,
          capLevelToPlayerSize: true,
          maxLoadingDelay: 4,
          maxBufferHole: 0.5,
          highBufferWatchdogPeriod: 2,
          nudgeOffset: 0.1,
          nudgeMaxRetry: 3,
          maxFragLookUpTolerance: 0.25,
          liveBackBufferLength: 0,
          maxLiveSyncPlaybackRate: 1.2,
          liveDurationInfinity: true,
          maxBufferSize: 60 * 1000 * 1000,
          enableWorker: true,
          enableSoftwareAES: true,
          manifestLoadingTimeOut: 10000,
          manifestLoadingMaxRetry: 1,
          manifestLoadingRetryDelay: 1000,
          levelLoadingTimeOut: 10000,
          levelLoadingMaxRetry: 4,
          levelLoadingRetryDelay: 1000,
          fragLoadingTimeOut: 20000,
          fragLoadingMaxRetry: 6,
          fragLoadingRetryDelay: 1000,
          startFragPrefetch: true,
          testBandwidth: true,
          progressive: false,
        });

        hlsRef.current = hls;

        // HLS Event Listeners
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          console.log("HLS manifest parsed");
          if (autoPlay) {
            video.play().catch(console.error);
          }
        });

        hls.on(Hls.Events.ERROR, (event: any, data: any) => {
          console.error("HLS Error:", data);
          const errorMessage = `HLS Error: ${data.type} - ${data.details}`;
          setError(errorMessage);
          onError?.(errorMessage);
        });

        hls.on(Hls.Events.LEVEL_SWITCHED, (event: any, data: any) => {
          console.log("Quality switched to:", data.level);
          if (onHlsStats) {
            onHlsStats({
              level: data.level,
              levels: hls.levels?.length || 0,
              bitrate: hls.levels?.[data.level]?.bitrate,
              width: hls.levels?.[data.level]?.width,
              height: hls.levels?.[data.level]?.height,
            });
          }
        });

        hls.on(Hls.Events.FRAG_LOADED, (event: any, data: any) => {
          if (onHlsStats) {
            onHlsStats({
              level: hls.currentLevel,
              levels: hls.levels?.length || 0,
              loadTime: data.stats?.loading?.end - data.stats?.loading?.start,
              fragUrl: data.frag?.url,
              bitrate: hls.levels?.[hls.currentLevel]?.bitrate,
            });
          }
        });

        hls.loadSource(src);
        hls.attachMedia(video);
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        // Native HLS support (Safari)
        video.src = src;
        if (autoPlay) {
          video.play().catch(console.error);
        }
      } else {
        const errorMessage = "HLS is not supported in this browser";
        setError(errorMessage);
        onError?.(errorMessage);
      }

      // Video event listeners
      const handleLoadedMetadata = () => {
        setDuration(video.duration);
        onLoadedMetadata?.(video.duration);
      };

      const handleTimeUpdate = () => {
        setCurrentTime(video.currentTime);
        onTimeUpdate?.(video.currentTime);
      };

      const handlePlay = () => {
        setIsPlaying(true);
        onPlay?.();
      };

      const handlePause = () => {
        setIsPlaying(false);
        onPause?.();
      };

      const handleVolumeChange = () => {
        setIsMuted(video.muted);
        setVolume(video.volume);
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

        if (hlsRef.current) {
          hlsRef.current.destroy();
          hlsRef.current = null;
        }
      };
    }, [
      src,
      autoPlay,
      isLive,
      debug,
      onPlay,
      onPause,
      onTimeUpdate,
      onLoadedMetadata,
      onError,
      onHlsStats,
      hlsLoaded,
    ]);

    // Update video properties when props change
    useEffect(() => {
      if (videoRef.current) {
        videoRef.current.muted = isMuted;
        videoRef.current.volume = volume;
      }
    }, [isMuted, volume]);

    if (error) {
      return (
        <div
          className={`flex items-center justify-center bg-red-900/20 border border-red-500/30 rounded-lg p-8 ${className}`}
        >
          <div className="text-center">
            <div className="text-red-400 text-lg font-semibold mb-2">
              HLS Error
            </div>
            <p className="text-red-200 text-sm">{error}</p>
          </div>
        </div>
      );
    }

    if (!hlsLoaded) {
      return (
        <div
          className={`flex items-center justify-center bg-gray-800 rounded-lg p-8 ${className}`}
        >
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
            <p className="text-gray-300">Loading HLS player...</p>
          </div>
        </div>
      );
    }

    return (
      <video
        ref={videoRef}
        className={`w-full h-full object-contain ${className}`}
        controls={controls}
        muted={isMuted}
        // volume={volume}
        playsInline
        preload="metadata"
      />
    );
  }
);

HLSPlayer.displayName = "HLSPlayer";

export default HLSPlayer;
