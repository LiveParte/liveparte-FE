import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SelectedProgram {
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
}

interface HeroSectionProps {
  className?: string;
  selectedProgram?: SelectedProgram | null;
  onVideoPlay?: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ className = "", selectedProgram, onVideoPlay }) => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [currentTime, setCurrentTime] = useState("49:28");
  const [totalTime, setTotalTime] = useState("1:59:21");
  const [progress, setProgress] = useState(25); // 25% progress

  // Reset video state when program changes
  useEffect(() => {
    setIsVideoPlaying(false);
    setIsPlaying(false);
    setShowControls(true);
  }, [selectedProgram]);

  // Auto-hide controls after 3 seconds
  useEffect(() => {
    if (isPlaying && showControls && isVideoPlaying) {
      const timer = setTimeout(() => {
        setShowControls(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isPlaying, showControls, isVideoPlaying]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    setShowControls(true);
  };

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
  };

  const handleWatchLive = () => {
    setIsVideoPlaying(true);
    setIsPlaying(true);
    setShowControls(true);
  };

  const handleSetReminder = () => {
    // Handle set reminder functionality
    console.log('Set reminder for program');
  };

  // If no program is selected, show the selection prompt
  if (!selectedProgram) {
    return (
      <div className={`relative h-[500px] md:h-[600px] w-full ${className}`}>
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/liveparte_banner.png')",
            filter: 'brightness(0.4)'
          }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
        
        {/* Content */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center px-[60px] md:px-[80px] lg:px-[120px] max-w-[800px]">
            {/* Main prompt */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {/* Icon */}
              <motion.div
                className="mx-auto mb-8 w-20 h-20 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.3, duration: 0.6, type: "spring", stiffness: 200 }}
              >
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
              </motion.div>

              {/* Title */}
              <motion.h1 
                className="text-white text-[48px] md:text-[64px] font-bold mb-6 leading-[0.9]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                Choose Your Program
              </motion.h1>
              
              {/* Subtitle */}
              <motion.p 
                className="text-gray-200 text-[20px] md:text-[24px] mb-8 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                Select any program from the guide below to start watching
              </motion.p>

              {/* Features */}
              <motion.div 
                className="flex flex-wrap justify-center gap-6 mb-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <div className="flex items-center gap-2 text-gray-300">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-[16px]">Live Programs</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-[16px]">Breaking News</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-[16px]">Upcoming Shows</span>
                </div>
              </motion.div>

              {/* Scroll indicator */}
              <motion.div
                className="flex flex-col items-center gap-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <span className="text-gray-400 text-[14px] font-medium">Scroll down to browse programs</span>
                <motion.div
                  className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center"
                  animate={{ 
                    y: [0, 8, 0],
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <motion.div
                    className="w-1 h-3 bg-gray-400 rounded-full mt-2"
                    animate={{ 
                      y: [0, 12, 0],
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  // Show program details first, then video player when "Watch Live" is clicked
  return (
    <div className={`relative h-[500px] md:h-[600px] w-full ${className}`}>
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/liveparte_banner.png')",
          filter: isVideoPlaying ? 'brightness(0.6)' : 'brightness(0.4)'
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
      
      <AnimatePresence mode="wait">
        {!isVideoPlaying ? (
          // Program Details View
          <motion.div
            key="program-details"
            className="relative z-10 h-full flex items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="px-[60px] md:px-[80px] lg:px-[120px] max-w-[800px]">
              {/* Channel Info - Dynamic channel logo and LIVE indicator */}
              <motion.div 
                className="flex items-center gap-[16px] mb-[24px]"
                key={`channel-${selectedProgram.channelName}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <div className="bg-red-600 text-white px-[16px] py-[8px] rounded-[6px] text-[16px] font-bold">
                  {selectedProgram.channelLogo}
                </div>
                <div className="flex items-center gap-[8px]">
                  <div className="w-[6px] h-[6px] bg-red-500 rounded-full"></div>
                  <span className="text-white text-[16px] font-medium">
                    {selectedProgram.program.status === "live" ? "LIVE NOW" : "UPCOMING"}
                  </span>
                </div>
                {selectedProgram.program.breaking && (
                  <motion.div
                    className="bg-blue-600 text-white px-[12px] py-[4px] rounded-[4px] text-[12px] font-bold"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                  >
                    BREAKING
                  </motion.div>
                )}
              </motion.div>
              
              {/* Title - Dynamic with animation */}
              <motion.h1 
                className="text-white text-[56px] md:text-[72px] font-bold mb-[24px] leading-[0.9] whitespace-nowrap"
                key={`title-${selectedProgram.program.title}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                {selectedProgram.program.title}
              </motion.h1>
              
              {/* Description - Dynamic with animation */}
              <motion.p 
                className="text-gray-200 text-[20px] md:text-[22px] mb-[32px] leading-relaxed max-w-[600px]"
                key={`description-${selectedProgram.program.description}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                {selectedProgram.program.description}
              </motion.p>
              
              {/* Metadata - Dynamic with animation */}
              <motion.div 
                className="flex flex-wrap gap-[20px] mb-[40px]"
                key={`metadata-${selectedProgram.program.time}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <span className="text-gray-300 text-[16px]">Started {selectedProgram.program.time.split(' - ')[0]}</span>
                <span className="text-gray-300 text-[16px]">•</span>
                <span className="text-gray-300 text-[16px]">{selectedProgram.program.genre}</span>
                <span className="text-gray-300 text-[16px]">•</span>
                <span className="text-gray-300 text-[16px]">TV-14</span>
                {selectedProgram.program.timeLeft && (
                  <>
                    <span className="text-gray-300 text-[16px]">•</span>
                    <span className="text-gray-300 text-[16px]">{selectedProgram.program.timeLeft}</span>
                  </>
                )}
              </motion.div>
              
              {/* Action Buttons */}
              <motion.div 
                className="flex gap-[20px]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <button 
                  onClick={handleWatchLive}
                  className="bg-white text-black px-[32px] py-[16px] rounded-[8px] font-semibold text-[16px] flex items-center gap-[12px] hover:bg-gray-100 transition-colors border-2 border-black"
                >
                  <svg className="w-[20px] h-[20px]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                  {selectedProgram.program.status === "live" ? "Watch Live" : "Set Reminder"}
                </button>
                <button 
                  onClick={handleSetReminder}
                  className="bg-gray-600 text-white px-[32px] py-[16px] rounded-[8px] font-medium text-[16px] flex items-center gap-[12px] hover:bg-gray-500 transition-colors"
                >
                  <svg className="w-[20px] h-[20px]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                  Add Channel To Favorites
                </button>
              </motion.div>
            </div>
          </motion.div>
        ) : (
          // Video Player View
          <motion.div
            key="video-player"
            className="relative z-10 h-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Program Info Overlay - Bottom Left */}
            <div className="absolute bottom-20 left-6 z-20">
              {/* Title */}
              <h1 className="text-white text-2xl md:text-3xl font-bold mb-2">
                {selectedProgram.program.title}
              </h1>
              
              {/* Genre */}
              <p className="text-gray-300 text-lg">
                {selectedProgram.program.genre}
              </p>
            </div>

            {/* Progress Bar - Bottom */}
            <div className="absolute bottom-16 left-0 right-0 z-20">
              <div className="w-full bg-gray-600 h-1">
                <motion.div
                  className="bg-white h-1"
                  initial={{ width: 0 }}
                  animate={{ width: `${selectedProgram.program.progress || 0}%` }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                />
              </div>
              
              {/* Time Display - Bottom Right */}
              <div className="absolute bottom-2 right-6 text-white text-sm font-mono">
                {currentTime} / {totalTime}
              </div>
            </div>

            {/* Player Controls - Bottom Bar */}
            <div className="absolute bottom-0 left-0 right-0 z-20 bg-black/50 backdrop-blur-sm">
              <div className="flex items-center justify-between px-6 py-4">
                {/* Left Side Controls */}
                <div className="flex items-center gap-4">
                  <button
                    onClick={handlePlayPause}
                    className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                  >
                    {isPlaying ? (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 00-1 1v2a1 1 0 002 0V9a1 1 0 00-1-1zm4 0a1 1 0 00-1 1v2a1 1 0 102 0V9a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>

                  <button
                    onClick={handleMuteToggle}
                    className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                  >
                    {isMuted ? (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.816L4.617 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.617l3.766-3.816a1 1 0 011.617.816zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.816L4.617 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.617l3.766-3.816a1 1 0 011.617.816zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>

                  <button className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors">
                    <span className="text-sm font-medium">CC</span>
                  </button>
                </div>

                {/* Right Side Controls */}
                <div className="flex items-center gap-3">
                  <button className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>

                  <button 
                    onClick={() => setIsVideoPlaying(false)}
                    className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 11-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12z" clipRule="evenodd" />
                    </svg>
                  </button>

                  <button className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                    </svg>
                  </button>

                  <button className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Click to show/hide controls overlay */}
            <div
              className="absolute inset-0 z-10"
              onClick={() => setShowControls(!showControls)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HeroSection;
