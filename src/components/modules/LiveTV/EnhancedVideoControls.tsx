import React, { useState, useCallback, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface EnhancedVideoControlsProps {
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
  currentTime: number;
  totalTime: number;
  progress: number;
  isDragging: boolean;
  showControls: boolean;
  onPlayPause: () => void;
  onMuteToggle: () => void;
  onVolumeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onProgressClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  onProgressMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void;
  onProgressMouseMove: (e: React.MouseEvent<HTMLDivElement>) => void;
  onProgressMouseUp: () => void;
  onSeekForward: () => void;
  onSeekBackward: () => void;
  onFullscreen: () => void;
  onShare: () => void;
  onSettings: () => void;
  onSubtitles: () => void;
  onAddToFavorites: () => void;
  isFavorited: boolean;
  formatTime: (time: number) => string;
  progressRef: React.RefObject<HTMLDivElement>;
}

const EnhancedVideoControls: React.FC<EnhancedVideoControlsProps> = ({
  isPlaying,
  isMuted,
  volume,
  currentTime,
  totalTime,
  progress,
  isDragging,
  showControls,
  onPlayPause,
  onMuteToggle,
  onVolumeChange,
  onProgressClick,
  onProgressMouseDown,
  onProgressMouseMove,
  onProgressMouseUp,
  onSeekForward,
  onSeekBackward,
  onFullscreen,
  onShare,
  onSettings,
  onSubtitles,
  onAddToFavorites,
  isFavorited,
  formatTime,
  progressRef
}) => {
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);

  const speedOptions = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

  // Debug logging for isPlaying state
  useEffect(() => {
    console.log('EnhancedVideoControls - isPlaying changed to:', isPlaying);
  }, [isPlaying]);

  const handleSpeedChange = useCallback((speed: number) => {
    setPlaybackRate(speed);
    setShowSpeedMenu(false);
    // This would be passed as a prop to control video playback rate
  }, []);

  return (
    <motion.div
      className="absolute bottom-0 left-0 right-0 z-30"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: showControls ? 1 : 0, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Progress Bar */}
      <div className="w-full bg-black/30 px-6 py-3">
        <div 
          ref={progressRef}
          className="w-full bg-gray-600 h-2 rounded-full cursor-pointer group select-none"
          onClick={onProgressClick}
          onMouseDown={onProgressMouseDown}
          onMouseMove={onProgressMouseMove}
          onMouseUp={onProgressMouseUp}
        >
          <div className="relative h-full">
            <motion.div
              className="bg-white h-2 rounded-full"
              style={{ width: `${progress}%` }}
              transition={{ duration: isDragging ? 0 : 0.1 }}
            />
            <div 
              className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full transition-opacity shadow-lg ${isDragging ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
              style={{ left: `${progress}%`, transform: 'translate(-50%, -50%)' }}
            />
          </div>
        </div>
      </div>

      {/* Main Controls Bar */}
      <div className="bg-gradient-to-t from-black/90 to-black/60 px-8 py-6">
        <div className="flex items-center justify-between">
          {/* Left Side - Play Controls */}
          <div className="flex items-center gap-4">
            {/* Seek Backward */}
            <button
              onClick={onSeekBackward}
              className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-200 hover:scale-105"
              title="Seek backward 10s"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.445 14.832A1 1 0 0010 14v-2.798l5.445 3.63A1 1 0 0017 14V6a1 1 0 00-1.555-.832L10 8.798V6a1 1 0 00-1.555-.832l-6 4a1 1 0 000 1.664l6 4z" clipRule="evenodd" />
              </svg>
            </button>

            {/* Play/Pause Button - ENHANCED WITH DEBUGGING */}
            <button
              onClick={() => {
                console.log('Play/Pause button clicked - current isPlaying:', isPlaying);
                onPlayPause();
              }}
              className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-200 hover:scale-105"
              title={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                // Pause Icon - Two vertical bars
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 00-1 1v2a1 1 0 002 0V9a1 1 0 00-1-1zm4 0a1 1 0 00-1 1v2a1 1 0 102 0V9a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              ) : (
                // Play Icon - Triangle pointing right
                <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
              )}
            </button>

            {/* Seek Forward */}
            <button
              onClick={onSeekForward}
              className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-200 hover:scale-105"
              title="Seek forward 10s"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.555 5.168A1 1 0 003 6v8a1 1 0 001.555.832L10 11.202V14a1 1 0 001.555.832l6-4a1 1 0 000-1.664l-6-4A1 1 0 0010 6v2.798l-5.445-3.63z" clipRule="evenodd" />
              </svg>
            </button>

            {/* Time Display */}
            <div className="text-white text-lg font-mono min-w-[120px] ml-4">
              {formatTime(currentTime)} / {formatTime(totalTime)}
            </div>

            {/* Volume Control */}
            <div className="flex items-center gap-2 relative">
              <button
                onClick={onMuteToggle}
                onMouseEnter={() => setShowVolumeSlider(true)}
                onMouseLeave={() => setShowVolumeSlider(false)}
                className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-200"
                title={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted || volume === 0 ? (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.816L4.617 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.617l3.766-3.816a1 1 0 011.617.816zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.816L4.617 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.617l3.766-3.816a1 1 0 011.617.816zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
              
              {/* Volume Slider - Shows on hover */}
              <motion.div
                className="absolute left-14 bg-black/80 rounded-lg p-3"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: showVolumeSlider ? 1 : 0, 
                  scale: showVolumeSlider ? 1 : 0.8 
                }}
                transition={{ duration: 0.2 }}
                onMouseEnter={() => setShowVolumeSlider(true)}
                onMouseLeave={() => setShowVolumeSlider(false)}
              >
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={isMuted ? 0 : volume}
                  onChange={onVolumeChange}
                  className="w-32 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider vertical-slider"
                  style={{
                    background: `linear-gradient(to right, #fff 0%, #fff ${isMuted ? 0 : volume * 100}%, #4b5563 ${isMuted ? 0 : volume * 100}%, #4b5563 100%)`
                  }}
                />
                <div className="text-white text-xs text-center mt-1">
                  {Math.round((isMuted ? 0 : volume) * 100)}%
                </div>
              </motion.div>
            </div>

            {/* Playback Speed */}
            <div className="relative">
              <button
                onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-200"
                title="Playback Speed"
              >
                <span className="text-sm font-medium">{playbackRate}x</span>
              </button>
              
              {showSpeedMenu && (
                <motion.div
                  className="absolute bottom-14 left-0 bg-black/80 rounded-lg p-2 min-w-[100px]"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {speedOptions.map((speed) => (
                    <button
                      key={speed}
                      onClick={() => handleSpeedChange(speed)}
                      className={`w-full text-left px-3 py-2 text-sm rounded hover:bg-white/20 transition-colors ${
                        playbackRate === speed ? 'text-white bg-white/20' : 'text-gray-300'
                      }`}
                    >
                      {speed}x
                    </button>
                  ))}
                </motion.div>
              )}
            </div>

            {/* Subtitles */}
            <button
              onClick={onSubtitles}
              className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-200"
              title="Subtitles"
            >
              <span className="text-lg font-medium">CC</span>
            </button>
          </div>

          {/* Right Side - Action Controls */}
          <div className="flex items-center gap-4">
            {/* Add to Favorites */}
            <button 
              onClick={onAddToFavorites}
              className={`w-12 h-12 rounded-full flex items-center justify-center text-white hover:scale-105 transition-all duration-200 ${
                isFavorited 
                  ? 'bg-red-500 hover:bg-red-600' 
                  : 'bg-white/20 hover:bg-white/30'
              }`}
              title={isFavorited ? "Remove from Favorites" : "Add to Favorites"}
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
            </button>

            {/* Share */}
            <button 
              onClick={onShare}
              className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-200 hover:scale-105"
              title="Share"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.314l4.94 2.47A3 3 0 1015 12a3 3 0 00-2.473-1.12l-4.94-2.47a3 3 0 000-1.764l4.94-2.47A3 3 0 0015 8z" />
              </svg>
            </button>

            {/* Fullscreen */}
            <button 
              onClick={onFullscreen}
              className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-200 hover:scale-105"
              title="Fullscreen"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 11-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414 1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15 13.586V12a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
            </button>

            {/* Settings */}
            <button 
              onClick={onSettings}
              className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-200 hover:scale-105"
              title="Settings"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #ffffff;
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
        }
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #ffffff;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
        }
        .vertical-slider {
          transform: rotate(-90deg);
          transform-origin: center;
        }
      `}</style>
    </motion.div>
  );
};

export default EnhancedVideoControls;
