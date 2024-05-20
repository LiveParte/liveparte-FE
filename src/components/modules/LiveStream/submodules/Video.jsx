import React, { useRef, useState } from "react";

export default function Video({ liveStreamDetail }) {
  const videoRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const updateTime = () => {
    if (!isDragging) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const updateDuration = () => {
    setDuration(videoRef.current.duration);
  };

  const calculateProgressPercentage = () => {
    return (currentTime / duration) * 100;
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    updateCurrentTime(e);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      updateCurrentTime(e);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const updateCurrentTime = (e) => {
    const progressBar = e.currentTarget;
    const clickPositionX = e.clientX - progressBar.getBoundingClientRect().left;
    const progressBarWidth = progressBar.offsetWidth;
    const percentageClicked = (clickPositionX / progressBarWidth) * 100;
    const timeToSeek = (percentageClicked / 100) * duration;

    if (videoRef.current) {
      videoRef.current.currentTime = timeToSeek;
      setCurrentTime(timeToSeek);
    }
  };

  return (
    <div className="border-9">
      <video
        ref={videoRef}
        controls={false}
        onTimeUpdate={updateTime}
        onLoadedMetadata={updateDuration}
        autoPlay
        className="absolute left-0 right-0 top-0 bottom-0 object-contain md:object-contain h-full w-full z-20"
        poster={
          liveStreamDetail?.promotional_url || liveStreamDetail?.streaming_url
        }
      >
        <source
          src={
            liveStreamDetail?.promotional_url || liveStreamDetail?.streaming_url
          }
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
      <div className="z-20 absolute bottom-5 text-white left-0 right-0">
        <div
          className="px-[16px] flex items-center gap-[16px] cursor-pointer"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp} // Ensures dragging stops when the mouse leaves the progress bar
        >
          <div className="flex-1 bg-[#CCEDEB] h-[2px] rounded-[30px] relative">
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
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
        </div>
      </div>
    </div>
  );
}
