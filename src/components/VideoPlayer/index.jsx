import React, { useEffect, useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "videojs-youtube";  // Make sure this plugin is imported

const VideoJS = ({ options, onReady }) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    if (videoRef.current && !playerRef.current) {
      const videoElement = document.createElement("video");
      videoElement.className = "video-js vjs-big-play-centered";
      videoRef.current.appendChild(videoElement);

      // Initialize the Video.js player
      const player = (playerRef.current = videojs(videoElement, options, () => {
        onReady && onReady(player);
      }));

      // Cleanup function
      return () => {
        if (playerRef.current) {
          playerRef.current.dispose();
          playerRef.current = null;
        }
      };
    } else if (playerRef.current) {
      // Update player options if they change
      const player = playerRef.current;
      player.autoplay(options.autoplay || false);
      player.src(options.sources || []);
      player.loop(options.loop || false);
      player.muted(options.muted || false);
      player.controls(options.controls || true);
    }
  }, [options, onReady]);

  return (
    <div className="h-full w-full flex justify-center items-center bg-black flex-1 flex-col overflow-hidden" data-vjs-player>
      <div className="h-full flex-1 w-full flex justify-center items-center" ref={videoRef} />
    </div>
  );
};

export default VideoJS;
