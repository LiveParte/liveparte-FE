"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FullscreenVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  programData: {
    program: {
      title: string;
      time: string;
      status: "live" | "upcoming";
      description: string;
      genre: string;
      timeLeft?: string | null;
      breaking?: boolean;
      progress?: number;
    };
    channelId: string;
    index: number;
    channelName: string;
    channelLogo: string;
  };
}

const FullscreenVideoModal: React.FC<FullscreenVideoModalProps> = ({ isOpen, onClose, programData }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [currentTime, setCurrentTime] = useState("49:28");
  const [totalTime, setTotalTime] = useState("1:59:21");
  const [progress, setProgress] = useState(25);
  const [volume, setVolume] = useState(80);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { program, channelName, channelLogo } = programData;

  // Auto-hide controls after 3 seconds
  useEffect(() => {
    if (isPlaying && showControls) {
      const timer = setTimeout(() => {
        setShowControls(false);
      }, 3000);
      controlsTimeoutRef.current = timer;
      return () => clearTimeout(timer);
    }
  }, [isPlaying, showControls]);

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    setShowControls(true);
  };

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
    setShowControls(true);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
    setShowControls(true);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newProgress = (clickX / rect.width) * 100;
    setProgress(newProgress);
    setShowControls(true);
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black z-[9999] flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onMouseMove={handleMouseMove}
      >
        {/* Video Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/liveparte_banner.png')",
            filter: 'brightness(0.7)'
          }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />

        {/* Close Button */}
        <motion.button
          className="absolute top-6 right-6 z-50 w-12 h-12 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
          onClick={onClose}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: showControls ? 1 : 0, scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </motion.button>

        {/* Program Info Overlay - Moved higher up to avoid clustering */}
        <motion.div
          className="absolute bottom-32 left-6 z-40 max-w-2xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: showControls ? 1 : 0, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Channel and Status */}
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-red-600 text-white px-4 py-2 rounded text-lg font-bold">
              {channelLogo}
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-white text-lg font-medium">LIVE NOW</span>
            </div>
            {program.breaking && (
              <div className="bg-blue-600 text-white px-3 py-1 rounded text-sm font-bold">
                BREAKING
              </div>
            )}
          </div>

          {/* Title */}
          <h1 className="text-white text-4xl md:text-5xl font-bold mb-3 leading-tight">
            {program.title}
          </h1>

          {/* Genre */}
          <p className="text-gray-300 text-xl mb-4">
            {program.genre}
          </p>

          {/* Description */}
          <p className="text-gray-200 text-lg max-w-xl">
            {program.description}
          </p>
        </motion.div>

        {/* Video Controls - Bottom */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 z-40"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: showControls ? 1 : 0, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Progress Bar */}
          <div className="w-full bg-black/30 px-6 py-3">
            <div 
              className="w-full bg-gray-600 h-2 rounded-full cursor-pointer group"
              onClick={handleProgressClick}
            >
              <div className="relative h-full">
                <motion.div
                  className="bg-white h-2 rounded-full"
                  style={{ width: `${progress}%` }}
                  transition={{ duration: 0.1 }}
                />
                {/* Progress handle */}
                <div 
                  className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                  style={{ left: `${progress}%`, transform: 'translate(-50%, -50%)' }}
                />
              </div>
            </div>
          </div>

          {/* Main Controls Bar */}
          <div className="bg-gradient-to-t from-black/90 to-black/60 px-8 py-6">
            <div className="flex items-center justify-between">
              {/* Left Side - Play Controls */}
              <div className="flex items-center gap-6">
                {/* Play/Pause Button */}
                <button
                  onClick={handlePlayPause}
                  className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-200 hover:scale-105"
                >
                  {isPlaying ? (
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 00-1 1v2a1 1 0 002 0V9a1 1 0 00-1-1zm4 0a1 1 0 00-1 1v2a1 1 0 102 0V9a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>

                {/* Time Display */}
                <div className="text-white text-lg font-mono min-w-[120px]">
                  {currentTime} / {totalTime}
                </div>

                {/* Volume Control */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleMuteToggle}
                    className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-200"
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
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="w-32 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
                    style={{
                      background: `linear-gradient(to right, #fff 0%, #fff ${isMuted ? 0 : volume}%, #4b5563 ${isMuted ? 0 : volume}%, #4b5563 100%)`
                    }}
                  />
                </div>

                {/* Closed Captions */}
                <button className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-200">
                  <span className="text-lg font-medium">CC</span>
                </button>
              </div>

              {/* Right Side - Action Controls */}
              <div className="flex items-center gap-4">
                {/* Share */}
                <button className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-200 hover:scale-105">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.314l4.94 2.47A3 3 0 1015 12a3 3 0 00-2.473-1.12l-4.94-2.47a3 3 0 000-1.764l4.94-2.47A3 3 0 0015 8z" />
                  </svg>
                </button>

                {/* Settings */}
                <button className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-200 hover:scale-105">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Click to show/hide controls overlay */}
        <div
          className="absolute inset-0 z-30"
          onClick={() => setShowControls(!showControls)}
        />

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
        `}</style>
      </motion.div>
    </AnimatePresence>
  );
};

export default FullscreenVideoModal;
