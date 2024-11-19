import React, { useEffect, useRef, useState } from 'react';
import videojs from "video.js";
import "video.js/dist/video-js.css";

export default function Test() {
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    playerRef.current = videojs(videoRef.current, {
      sources: [
        {
          src: "https://liveparte-s3-bucket.s3.us-east-1.amazonaws.com/hls/DT_THERAPY_HYPEMAN_AARE_20241105130400/DT_THERAPY_HYPEMAN_AARE_hls.m3u8",
          type: "application/x-mpegURL",
        },
      ],
      controls: false,
      autoplay: true,
      preload: "auto",
    });

    playerRef.current.on('loadedmetadata', () => {
      setDuration(playerRef.current.duration());
    });

    playerRef.current.on('timeupdate', () => {
      setCurrentTime(playerRef.current.currentTime());
    });

    playerRef.current.on('play', () => {
      setIsPlaying(true);
    });

    playerRef.current.on('pause', () => {
      setIsPlaying(false);
    });

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
      }
    };
  }, []);

  const handlePlayPause = () => {
    const player = playerRef.current;
    if (player.paused()) {
      player.play();
    } else {
      player.pause();
    }
  };

  const handleFastForward = () => {
    playerRef.current.currentTime(playerRef.current.currentTime() + 30);
  };

  const handleRewind = () => {
    playerRef.current.currentTime(playerRef.current.currentTime() - 30);
  };

  const handleMuteUnmute = () => {
    const player = playerRef.current;
    player.muted(!player.muted());
    setIsMuted(player.muted());
  };

  const handleSeek = (event) => {
    playerRef.current.currentTime(parseFloat(event.target.value));
  };

  return (
    <div className="border-red-400 w-full !h-full overflow-hidden">
      <div className="absolute top-4 left-4 flex gap-2 z-10">
        <button onClick={handlePlayPause} className="p-2 bg-blue-500 text-white rounded">
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <button onClick={handleFastForward} className="p-2 bg-blue-500 text-white rounded">
          Fast Forward 30s
        </button>
        <button onClick={handleRewind} className="p-2 bg-blue-500 text-white rounded">
          Rewind 30s
        </button>
        <button onClick={handleMuteUnmute} className="p-2 bg-blue-500 text-white rounded">
          {isMuted ? 'Unmute' : 'Mute'}
        </button>
        <input
          type="range"
          min="0"
          max={duration}
          step="1"
          value={currentTime}
          onChange={(e) => setCurrentTime(parseFloat(e.target.value))}
          onMouseUp={handleSeek}
          onTouchEnd={handleSeek}
          className="w-full"
        />
        <span className="text-white">
          {Math.floor(currentTime)} / {Math.floor(duration)}
        </span>
      </div>
      
      <video ref={videoRef} className="video-js vjs-default-skin !h-[100vh] w-[100vw]" />
    </div>
  );
}
