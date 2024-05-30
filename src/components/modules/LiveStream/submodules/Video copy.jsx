import React, { useRef, useState } from "react";

export default function Video({ liveStreamDetail, 
  videoRef,
  updateTime,
  updateDuration,
  handleVideoEnded
}) {
 

  return (
    <div className="border-9 ">
      <video
        ref={videoRef}
        controls={false}
        onTimeUpdate={updateTime}
        onLoadedMetadata={updateDuration}
        onEnded={handleVideoEnded}
        autoPlay={true}
        className="absolute left-0 right-0 top-0 bottom-0 object-contain md:object-cover h-full w-full z-10"
        poster={liveStreamDetail?.thumbnail_url}
      >
        <source
          src={`https://res.cloudinary.com/dnvwcmqhw/video/upload/v1713949269/onDemandVideo/Screen_Recording_2024-04-22_at_14.37.28_nezabk.mp4` || liveStreamDetail?.streaming_url || liveStreamDetail?.promotional_url}
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
      
    </div>
  );
}
