import React, { useRef, useState, useEffect } from "react";

export default function Video({ liveStreamDetail,videoRef,
  updateTime,
  updateDuration,
  divRef,
  calculateProgressPercentage,
  handleMouseDown,
  handleMouseMove,
  handleMouseUp,
  formatTime,
  currentTimeRef,
  durationRef,
  isPlaying,
  isMuted,
  isLive,
  togglePlayPause,
  rewind,
  toggleMute,
  fastForward
 }) {





    useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.addEventListener('timeupdate', updateTime);
      video.addEventListener('loadedmetadata', updateDuration);
      return () => {
        video.removeEventListener('timeupdate', updateTime);
        video.removeEventListener('loadedmetadata', updateDuration);
      };
    }
  }, []);

  return (
    <div  className="border-9">
      <video
        ref={videoRef}
        controls={false}
        autoPlay={true}
        className="absolute left-0 right-0 top-0 bottom-0 object-contain md:object-cover h-full w-full z-10"
        poster={liveStreamDetail?.thumbnail_url}
        controlsList="nodownload" 
        preload="none"
      >
        <source
          src={`https://res.cloudinary.com/dnvwcmqhw/video/upload/v1713949269/onDemandVideo/Screen_Recording_2024-04-22_at_14.37.28_nezabk.mp4` || liveStreamDetail?.streaming_url || liveStreamDetail?.promotional_url}
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
      {/* <div className="z-50 absolute bottom-5 text-white left-0 right-0">
        <div className="px-[16px] flex items-center gap-[16px] cursor-pointer">
          <div
            className="flex-1 bg-[#CCEDEB] h-[2px] rounded-[30px] relative"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp} // Ensures dragging stops when the mouse leaves the progress bar
          >
            <div
              className=" h-[2px] rounded-[30px] flex items-center"
              style={{ width: `${calculateProgressPercentage()}%` }}
            >
              <div className="flex-1 bg-[#00A699] h-[2px]"></div>
              <div className="h-[6px] w-[6px] rounded-full flex justify-center items-center bg-white">
                <div className="h-[4px] w-[4px] bg-[#02A59A] rounded-full"></div>
              </div>
            </div>
          </div>
          <span className="text-[10px]">
            {formatTime(currentTimeRef.current)} / {formatTime(durationRef.current)}
          </span>
        </div>
        <div className="flex justify-center mt-4">
          <button onClick={togglePlayPause} className="mx-2 px-4 py-2 bg-blue-500 text-white rounded">
            {isPlaying ? 'Pause' : 'Play'}
          </button>
          <button onClick={rewind} className="mx-2 px-4 py-2 bg-blue-500 text-white rounded">
            Rewind 10s
          </button>
          <button onClick={fastForward} className="mx-2 px-4 py-2 bg-blue-500 text-white rounded">
            Fast Forward 10s
          </button>
          <button onClick={toggleMute} className="mx-2 px-4 py-2 bg-blue-500 text-white rounded">
            {isMuted ? 'Unmute' : 'Mute'}
          </button>
        </div>
      </div> */}
    </div>
  );
}
