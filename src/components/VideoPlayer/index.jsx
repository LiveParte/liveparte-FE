import React from 'react';
import VideoJS from './VideoJS';

export const VideoPlayer = ({src,videoRef}) => {
  const playerRef = React.useRef(null);

  const videoJsOptions = {
    autoplay: true,
    controls: false,
    responsive: false,
    fluid: true,
    muted: true, // Mute the video to allow autoplay
    sources: [{
      src: src||'https://res.cloudinary.com/dnvwcmqhw/video/upload/v1713949269/onDemandVideo/Screen_Recording_2024-04-22_at_14.37.28_nezabk.mp4',
      type: 'video/mp4'
    }]
  };

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    player.on('waiting', () => {
      videojs.log('player is waiting');
    });

    player.on('dispose', () => {
      videojs.log('player will dispose');
    });
  };

  const handlePlayPause = () => {
    if (playerRef.current) {
      if (playerRef.current.paused()) {
        playerRef.current.play();
      } else {
        playerRef.current.pause();
      }
    }
  };

  return (
    <>
      <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
      <div className="mt-4 flex justify-center">
        <button
          onClick={handlePlayPause}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Play/Pause
        </button>
      </div>
    </>
  );
};
