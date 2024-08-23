import React, { useEffect, useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

const VideoJS = ({ options, onReady }) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    if (videoRef.current && !playerRef.current) {
      const videoElement = document.createElement("video");

      videoElement.className = "video-js vjs-big-play-centered";
      videoRef.current.appendChild(videoElement);

      const player = (playerRef.current = videojs(videoElement, options, () => {
        onReady && onReady(player);
      }));

      return () => {
        if (playerRef.current) {
          playerRef.current.dispose();
          playerRef.current = null;
        }
      };
    } else {
      const player = playerRef.current;

      if (player) {
        player.autoplay(options.autoplay || false);
        player.src(options.sources || []);

        // Handle additional updates to player options if needed
        // Example: player.loop(options.loop);
      }
    }
  }, [options, onReady]);

  return (
    <div className="h-full w-full  flex justify-center items-center bg-black flex-1 flex-col " data-vjs-player>
      <div className="h-full flex-1 w-full flex justify-center items-center" ref={videoRef} />
    </div>
  );
};

export default VideoJS;
