import { useObject } from '@/Context/VideoJsContext';
import { VideoMuteIcon, VideoPlayIcon, VideoPauseIcon, VideoUnMuteIcon, VideoNextBy10secIcon, VideoPrevBy10secIcon } from "../../../../../../../../public/svg";

export default function VideoJsControl() {
  const {
    isPlaying,
    isMuted,
    handlePlayPause,
    handleMuteUnmute,
    handleFastForward,
    handleRewind,
    formatTime,
    currentTime,
    duration,
    setCurrentTime,
    handleSeek
  } = useObject();

  return (
    <div className='w-full'>
      <div className="flex-1 items-end justify-end flex">
        <div className="z-50 pb-[27px] text-white w-full pt-8 pl-[80px] pr-[45px]">
          <div className="flex items-center gap-[16px] cursor-pointer">
            <span className="text-[10px]">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>
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
          <div className="px-[16px] flex items-center gap-[32px] mt-[23px] justify-center">
            <button onClick={handlePlayPause}>
              {isPlaying ? <VideoPauseIcon /> : <VideoPlayIcon />}
            </button>
            <button onClick={handleMuteUnmute}>
              {isMuted ? <VideoUnMuteIcon /> : <VideoMuteIcon />}
            </button>
            <button onClick={handleRewind}>
              <VideoPrevBy10secIcon />
            </button>
            <button onClick={handleFastForward}>
              <VideoNextBy10secIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
