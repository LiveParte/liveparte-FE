import React, { useEffect } from 'react';

const cacheVideo = async (url) => {
  const cache = await caches.open('cloudinary-videos-cache');
  const response = await fetch(url);
  if (response.ok) {
    await cache.put(url, response);
  }
};

const VideoPlayer = ({ videoUrl }) => {
  useEffect(() => {
    if (videoUrl) {
      cacheVideo(videoUrl);
    }
  }, [videoUrl]);

  return (videoUrl&&
    <video controls width="600">
      <source src={videoUrl} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

export default VideoPlayer;
