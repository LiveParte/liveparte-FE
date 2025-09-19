"use client";
import React, { useRef, useEffect, useState, forwardRef, useImperativeHandle, useCallback } from 'react';

// Simple HLS player without complex state management
const SimpleHLSPlayer = forwardRef<any, any>(({
  src,
  autoPlay = false,
  muted = false,
  controls = true,
  className = '',
  onPlay,
  onPause,
  onTimeUpdate,
  onLoadedMetadata,
  onError,
  onHlsStats,
  isLive = false,
  debug = false
}, ref) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('Loading stream...');

  // Expose methods to parent component
  useImperativeHandle(ref, () => ({
    play: () => {
      if (videoRef.current) {
        videoRef.current.play().catch(console.error);
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
      if (videoRef.current) {
        videoRef.current.volume = vol;
      }
    },
    setMuted: (mute: boolean) => {
      if (videoRef.current) {
        videoRef.current.muted = mute;
      }
    },
    getCurrentTime: () => videoRef.current?.currentTime || 0,
    getDuration: () => videoRef.current?.duration || 0,
    getHlsInstance: () => hlsRef.current
  }));

  // Initialize HLS
  useEffect(() => {
    if (!src || !videoRef.current || isInitialized) return;

    const video = videoRef.current;
    let hls: any = null;

    const initHLS = async () => {
      try {
        console.log('Initializing HLS for:', src);
        setLoadingMessage('Loading HLS library...');
        
        // Dynamic import HLS.js
        const Hls = (await import('hls.js')).default;
        
        if (Hls.isSupported()) {
          console.log('HLS.js is supported, creating instance');
          setLoadingMessage('Initializing HLS player...');
          
          hls = new Hls({
            debug: debug,
            enableWorker: true,
            lowLatencyMode: isLive,
            backBufferLength: isLive ? 30 : 90,
            maxBufferLength: isLive ? 10 : 30,
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

          hls.on(Hls.Events.MANIFEST_PARSED, () => {
            console.log('HLS manifest parsed successfully');
            setLoadingMessage('Stream ready!');
            setIsLoaded(true);
            setError(null);
            setIsInitialized(true);
            
            if (autoPlay) {
              console.log('Auto-playing video');
              video.play().catch(console.error);
            }
          });

          hls.on(Hls.Events.ERROR, (event: any, data: any) => {
            console.error('HLS Error:', data);
            
            if (data.fatal) {
              let errorMessage = '';
              switch (data.type) {
                case Hls.ErrorTypes.NETWORK_ERROR:
                  errorMessage = 'Network error occurred while loading the stream';
                  break;
                case Hls.ErrorTypes.MEDIA_ERROR:
                  errorMessage = 'Media error occurred while playing the stream';
                  break;
                default:
                  errorMessage = `HLS Error: ${data.type} - ${data.details}`;
                  break;
              }
              
              setError(errorMessage);
              onError?.(errorMessage);
              hls.destroy();
            }
          });

          hls.on(Hls.Events.LEVEL_SWITCHED, (event: any, data: any) => {
            console.log('Quality switched to:', data.level);
            if (onHlsStats) {
              onHlsStats({
                level: data.level,
                levels: hls.levels?.length || 0,
                bitrate: hls.levels?.[data.level]?.bitrate,
                width: hls.levels?.[data.level]?.width,
                height: hls.levels?.[data.level]?.height
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
                bitrate: hls.levels?.[hls.currentLevel]?.bitrate
              });
            }
          });

          console.log('Loading HLS source:', src);
          setLoadingMessage('Loading stream...');
          hls.loadSource(src);
          hls.attachMedia(video);

        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
          // Native HLS support (Safari)
          console.log('Using native HLS support');
          setLoadingMessage('Loading native HLS...');
          video.src = src;
          setIsLoaded(true);
          setIsInitialized(true);
          
          if (autoPlay) {
            video.play().catch(console.error);
          }
        } else {
          const errorMessage = 'HLS is not supported in this browser';
          console.error(errorMessage);
          setError(errorMessage);
          onError?.(errorMessage);
        }
      } catch (err) {
        console.error('HLS initialization error:', err);
        const errorMessage = 'Failed to initialize HLS player';
        setError(errorMessage);
        onError?.(errorMessage);
      }
    };

    initHLS();

    // Video event listeners
    const handleLoadedMetadata = () => {
      console.log('Video metadata loaded');
      onLoadedMetadata?.(video.duration);
    };

    const handleTimeUpdate = () => {
      onTimeUpdate?.(video.currentTime);
    };

    const handlePlay = () => {
      console.log('Video started playing');
      onPlay?.();
    };

    const handlePause = () => {
      console.log('Video paused');
      onPause?.();
    };

    const handleCanPlay = () => {
      console.log('Video can play - setting loaded state');
      setIsLoaded(true);
      setLoadingMessage('Stream ready!');
    };

    const handleLoadedData = () => {
      console.log('Video data loaded - setting loaded state');
      setIsLoaded(true);
      setLoadingMessage('Stream ready!');
    };

    const handleError = (e: any) => {
      console.error('Video error:', e);
      const errorMessage = 'Video playback error';
      setError(errorMessage);
      onError?.(errorMessage);
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('error', handleError);

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('error', handleError);
      
      if (hls) {
        console.log('Destroying HLS instance');
        hls.destroy();
        hls = null;
      }
    };
  }, [src, autoPlay, isLive, debug, onPlay, onPause, onTimeUpdate, onLoadedMetadata, onError, onHlsStats, isInitialized]);

  // Update video properties when props change
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = muted;
    }
  }, [muted]);

  // Reset initialization state when src changes
  useEffect(() => {
    console.log('Source changed, resetting states');
    setIsInitialized(false);
    setIsLoaded(false);
    setError(null);
    setLoadingMessage('Loading stream...');
  }, [src]);

  if (error) {
    return (
      <div className={`flex items-center justify-center bg-red-900/20 border border-red-500/30 rounded-lg p-8 ${className}`}>
        <div className="text-center">
          <div className="text-red-400 text-lg font-semibold mb-2">Stream Error</div>
          <p className="text-red-200 text-sm">{error}</p>
          <button
            onClick={() => {
              setError(null);
              setIsInitialized(false);
              setIsLoaded(false);
              setLoadingMessage('Loading stream...');
            }}
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className={`flex items-center justify-center bg-gray-800 rounded-lg ${className}`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-gray-300 text-lg">{loadingMessage}</p>
          <p className="text-gray-400 text-sm mt-2">Please wait while we prepare your video</p>
          <div className="mt-4 text-xs text-gray-500">
            <div>Initialized: {isInitialized ? 'Yes' : 'No'}</div>
            <div>Loaded: {isLoaded ? 'Yes' : 'No'}</div>
            <div>Source: {src ? 'Set' : 'None'}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <video
      ref={videoRef}
      className={`w-full h-full object-cover ${className}`}
      controls={controls}
      muted={muted}
      playsInline
      preload="metadata"
      autoPlay={autoPlay}
    />
  );
});

SimpleHLSPlayer.displayName = 'SimpleHLSPlayer';

export default SimpleHLSPlayer;
