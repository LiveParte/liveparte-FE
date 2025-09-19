"use client";
import React, { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";

// Dynamic imports to avoid ES module issues
const ReactHlsPlayer = dynamic(() => import("react-hls-player"), {
  ssr: false,
});

interface HLSStream {
  id: string;
  name: string;
  url: string;
  description: string;
  type: "live" | "vod";
}

const HLSStreams: HLSStream[] = [
  {
    id: "1",
    name: "Sample HLS Stream 1",
    // url: "https://devstreaming-cdn.apple.com/videos/streaming/examples/img_bipbop_adv_example_fmp4/master.m3u8",
    url: "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8",
    description: "Your existing HLS stream",
    type: "vod",
  },
  {
    id: "2",
    name: "Big Buck Bunny (Test Stream)",
    url: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
    description: "Popular test HLS stream for development",
    type: "vod",
  },
  {
    id: "3",
    name: "Apple HLS Sample",
    url: "https://devstreaming-cdn.apple.com/videos/streaming/examples/img_bipbop_adv_example_fmp4/master.m3u8",
    description: "Apple's official HLS sample stream",
    type: "vod",
  },
  {
    id: "4",
    name: "Live Stream Test",
    url: "https://cph-p2p-msl.akamaized.net/hls/live/2000341/test/master.m3u8",
    description: "Live HLS stream for testing",
    type: "live",
  },
];

const HLSTestPage: React.FC = () => {
  const [selectedStream, setSelectedStream] = useState<HLSStream>(
    HLSStreams[0]
  );
  const [playerType, setPlayerType] = useState<
    "hlsjs" | "react-hls" | "videojs"
  >("hlsjs");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [hlsStats, setHlsStats] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hlsLoaded, setHlsLoaded] = useState(false);

  // Refs
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<any>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  // Load HLS.js dynamically
  useEffect(() => {
    const loadHls = async () => {
      try {
        const hlsModule = await import("hls.js");
        setHlsLoaded(true);
      } catch (err) {
        console.error("Failed to load HLS.js:", err);
        setError("Failed to load HLS.js library");
      }
    };
    loadHls();
  }, []);

  // HLS.js implementation
  useEffect(() => {
    if (playerType === "hlsjs" && videoRef.current && hlsLoaded) {
      const video = videoRef.current;

      // Clean up previous HLS instance
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }

      // Dynamic import and initialization
      const initHls = async () => {
        try {
          const Hls = (await import("hls.js")).default;

          if (Hls.isSupported()) {
            const hls = new Hls({
              debug: true,
              enableWorker: true,
              lowLatencyMode: selectedStream.type === "live",
              backBufferLength: 90,
              maxBufferLength: 30,
              maxMaxBufferLength: 600,
              liveSyncDurationCount: 3,
              liveMaxLatencyDurationCount: 5,
            });

            hlsRef.current = hls;

            hls.on(Hls.Events.MANIFEST_PARSED, () => {
              console.log("HLS manifest parsed");
              setIsLoading(false);
              setError(null);
            });

            hls.on(Hls.Events.ERROR, (event: any, data: any) => {
              console.error("HLS Error:", data);
              setError(`HLS Error: ${data.type} - ${data.details}`);
              setIsLoading(false);
            });

            hls.on(Hls.Events.LEVEL_SWITCHED, (event: any, data: any) => {
              console.log("Quality switched to:", data.level);
            });

            hls.on(Hls.Events.FRAG_LOADED, (event: any, data: any) => {
              setHlsStats({
                level: hls.currentLevel,
                levels: hls.levels?.length || 0,
                loadTime: data.stats?.loading?.end - data.stats?.loading?.start,
                fragUrl: data.frag?.url,
              });
            });

            hls.loadSource(selectedStream.url);
            hls.attachMedia(video);

            // Video event listeners
            video.addEventListener("loadedmetadata", () => {
              setDuration(video.duration);
            });

            video.addEventListener("timeupdate", () => {
              setCurrentTime(video.currentTime);
            });

            video.addEventListener("play", () => setIsPlaying(true));
            video.addEventListener("pause", () => setIsPlaying(false));
            video.addEventListener("volumechange", () =>
              setIsMuted(video.muted)
            );
          } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
            // Native HLS support (Safari)
            video.src = selectedStream.url;
            video.addEventListener("loadedmetadata", () => {
              setDuration(video.duration);
            });
            video.addEventListener("timeupdate", () => {
              setCurrentTime(video.currentTime);
            });
            video.addEventListener("play", () => setIsPlaying(true));
            video.addEventListener("pause", () => setIsPlaying(false));
            video.addEventListener("volumechange", () =>
              setIsMuted(video.muted)
            );
          } else {
            setError("HLS is not supported in this browser");
          }
        } catch (err) {
          console.error("HLS initialization error:", err);
          setError("Failed to initialize HLS player");
        }
      };

      initHls();
    }

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [selectedStream, playerType, hlsLoaded]);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
  };

  const handleMuteToggle = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current && progressRef.current) {
      const rect = progressRef.current.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const newTime = (clickX / rect.width) * duration;
      videoRef.current.currentTime = newTime;
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleStreamChange = (stream: HLSStream) => {
    setSelectedStream(stream);
    setIsLoading(true);
    setError(null);
    setCurrentTime(0);
    setDuration(0);
  };

  const handlePlayerTypeChange = (type: "hlsjs" | "react-hls" | "videojs") => {
    setPlayerType(type);
    setIsLoading(true);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">
          HLS Stream Test Demo
        </h1>

        {/* Stream Selection */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Select Stream</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {HLSStreams.map((stream) => (
              <button
                key={stream.id}
                onClick={() => handleStreamChange(stream)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedStream.id === stream.id
                    ? "border-blue-500 bg-blue-500/20"
                    : "border-gray-600 hover:border-gray-400"
                }`}
              >
                <h3 className="font-semibold mb-2">{stream.name}</h3>
                <p className="text-sm text-gray-300 mb-2">
                  {stream.description}
                </p>
                <span
                  className={`px-2 py-1 rounded text-xs ${
                    stream.type === "live" ? "bg-red-500" : "bg-green-500"
                  }`}
                >
                  {stream.type.toUpperCase()}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Player Type Selection */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Player Type</h2>
          <div className="flex gap-4">
            {[
              {
                id: "hlsjs",
                name: "HLS.js (Native)",
                desc: "Direct HLS.js implementation",
              },
              {
                id: "react-hls",
                name: "React HLS Player",
                desc: "React wrapper for HLS.js",
              },
              {
                id: "videojs",
                name: "Video.js",
                desc: "Video.js with HLS support",
              },
            ].map((type) => (
              <button
                key={type.id}
                onClick={() => handlePlayerTypeChange(type.id as any)}
                className={`px-6 py-3 rounded-lg border-2 transition-all ${
                  playerType === type.id
                    ? "border-blue-500 bg-blue-500/20"
                    : "border-gray-600 hover:border-gray-400"
                }`}
              >
                <div className="font-semibold">{type.name}</div>
                <div className="text-sm text-gray-300">{type.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Video Player */}
        <div className="mb-8">
          <div className="bg-black rounded-lg overflow-hidden relative">
            {playerType === "hlsjs" && (
              <video
                ref={videoRef}
                className="w-full h-96 object-contain"
                controls={false}
                muted={isMuted}
                volume={volume}
              />
            )}

            {playerType === "react-hls" && (
              <ReactHlsPlayer
                src={selectedStream.url}
                autoPlay={false}
                controls={false}
                width="100%"
                height="384"
                hlsConfig={{
                  debug: true,
                  enableWorker: true,
                  lowLatencyMode: selectedStream.type === "live",
                }}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onTimeUpdate={(e: any) => setCurrentTime(e.target.currentTime)}
                onLoadedMetadata={(e: any) => setDuration(e.target.duration)}
                onVolumeChange={(e: any) => setIsMuted(e.target.muted)}
              />
            )}

            {playerType === "videojs" && (
              <div className="w-full h-96">
                <video
                  ref={videoRef}
                  className="video-js vjs-default-skin w-full h-full"
                  controls
                  data-setup='{"fluid": true}'
                >
                  <source
                    src={selectedStream.url}
                    type="application/x-mpegURL"
                  />
                </video>
              </div>
            )}

            {/* Loading Overlay */}
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                  <p>Loading stream...</p>
                </div>
              </div>
            )}

            {/* Error Overlay */}
            {error && (
              <div className="absolute inset-0 flex items-center justify-center bg-red-900/50">
                <div className="text-center p-4">
                  <div className="text-red-400 text-lg font-semibold mb-2">
                    Error
                  </div>
                  <p className="text-red-200">{error}</p>
                </div>
              </div>
            )}
          </div>

          {/* Custom Controls */}
          {playerType !== "videojs" && (
            <div className="bg-gray-800 p-4 rounded-b-lg">
              <div className="flex items-center gap-4 mb-4">
                <button
                  onClick={handlePlayPause}
                  className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                >
                  {isPlaying ? (
                    <svg
                      className="w-6 h-6"
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
                      className="w-6 h-6 ml-1"
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

                <div className="text-sm font-mono">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </div>

                <button
                  onClick={handleMuteToggle}
                  className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
                >
                  {isMuted ? (
                    <svg
                      className="w-5 h-5"
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
                      className="w-5 h-5"
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

                <div className="flex items-center gap-2">
                  <span className="text-sm">Volume:</span>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-20"
                  />
                </div>
              </div>

              {/* Progress Bar */}
              <div
                ref={progressRef}
                className="w-full bg-gray-600 h-2 rounded-full cursor-pointer"
                onClick={handleSeek}
              >
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all"
                  style={{
                    width: `${duration ? (currentTime / duration) * 100 : 0}%`,
                  }}
                />
              </div>
            </div>
          )}
        </div>

        {/* HLS Stats */}
        {hlsStats && playerType === "hlsjs" && (
          <div className="bg-gray-800 p-4 rounded-lg mb-8">
            <h3 className="text-lg font-semibold mb-4">HLS Statistics</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-gray-400">Current Level:</span>
                <span className="ml-2">{hlsStats.level}</span>
              </div>
              <div>
                <span className="text-gray-400">Available Levels:</span>
                <span className="ml-2">{hlsStats.levels}</span>
              </div>
              <div>
                <span className="text-gray-400">Load Time:</span>
                <span className="ml-2">
                  {hlsStats.loadTime ? `${hlsStats.loadTime}ms` : "N/A"}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Stream Information */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">
            Current Stream Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="text-gray-400">Stream Name:</span>
              <span className="ml-2 font-medium">{selectedStream.name}</span>
            </div>
            <div>
              <span className="text-gray-400">Type:</span>
              <span
                className={`ml-2 px-2 py-1 rounded text-xs ${
                  selectedStream.type === "live" ? "bg-red-500" : "bg-green-500"
                }`}
              >
                {selectedStream.type.toUpperCase()}
              </span>
            </div>
            <div className="md:col-span-2">
              <span className="text-gray-400">URL:</span>
              <span className="ml-2 font-mono text-sm break-all">
                {selectedStream.url}
              </span>
            </div>
            <div className="md:col-span-2">
              <span className="text-gray-400">Description:</span>
              <span className="ml-2">{selectedStream.description}</span>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-blue-900/20 border border-blue-500/30 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4 text-blue-300">
            How to Use
          </h3>
          <ul className="space-y-2 text-sm text-blue-100">
            <li>• Select different HLS streams from the grid above</li>
            <li>
              • Try different player implementations (HLS.js, React HLS Player,
              Video.js)
            </li>
            <li>
              • Use the custom controls to play, pause, seek, and adjust volume
            </li>
            <li>• Monitor HLS statistics when using the HLS.js player</li>
            <li>
              • Check browser console for detailed HLS.js debug information
            </li>
            <li>• Test with both VOD (Video on Demand) and Live streams</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HLSTestPage;
