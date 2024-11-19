import { useObject } from '@/Context/VideoJsContext';
import React, { useEffect } from 'react';
import videojs from "video.js";
import "video.js/dist/video-js.css";
import { VideoIsMute } from '../../../public/svg';
import VideoJsControl from '../modules/LiveStream/submodules/videosubmodules/modules/players/videoJsControl';

export default function Test() {
  const {
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
    videoNodeRef
  } = useObject();

  useEffect(() => {
    if (typeof window !== "undefined" && !playerRef.current) {
      // Initialize Video.js player only if it hasn’t been initialized yet
      playerRef.current = videojs(videoRef.current, {
        sources: [
          {
            src: "https://liveparte-s3-bucket.s3.us-east-1.amazonaws.com/hls/DT_THERAPY_HYPEMAN_AARE_20241105130400/DT_THERAPY_HYPEMAN_AARE.m3u8",
            type: "application/x-mpegURL"
          }
        ],
        controls: false,
        autoplay: true,
        preload: "auto",
        muted: true,
      });

      playerRef.current.on('loadeddata', () => {
        setDuration(playerRef.current.duration());
      });

      playerRef.current.on('timeupdate', () => {
        setCurrentTime(playerRef.current.currentTime());
      });

      playerRef.current.on('play', () => setIsPlaying(true));
      playerRef.current.on('pause', () => setIsPlaying(false));
      playerRef.current.on('volumechange', () => setIsMuted(playerRef.current.muted()));
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null; // Reset ref after disposing
      }
    };
  }, [setCurrentTime, setDuration, setIsMuted, setIsPlaying, videoRef, playerRef]);

  return (
    <div className="w-full !h-full overflow-hidden">
      {isMuted && (
        <div
          className="absolute left-0 right-0 top-0 bottom-0 text-[24px] flex justify-center items-center"
          onClick={handleMuteUnmute}
        >
          <div className="relative text-white py-[16px] px-[32px] flex gap-[16px] rounded-[30px] justify-center items-center bg-[#333D4780] cursor-pointer z-50 font500">
            <VideoIsMute />
            <span>Unmute</span>
          </div>
        </div>
      )}

<div className='hidden'>
      <VideoJsControl/>
      </div>
      
      <video ref={videoRef} className="video-js vjs-default-skin !h-[100vh] !w-[100vw]" />
    </div>
  );
}
