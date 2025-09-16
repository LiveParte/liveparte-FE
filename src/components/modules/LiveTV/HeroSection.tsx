import React from 'react';
import { motion } from 'framer-motion';

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
}

const HeroSection: React.FC<HeroSectionProps> = ({ className = "", selectedProgram }) => {
  // Default program data when nothing is selected
  const defaultProgram = {
    title: "International Desk",
    description: "Experience the latest episode of this gripping series as secrets unfold and alliances shift in real-time.",
    genre: "Drama",
    channelName: "CNN",
    channelLogo: "CNN",
    status: "live" as const,
    time: "8:00 PM",
    timeLeft: "30m Left",
    breaking: false,
    progress: 70
  };

  // Use selected program or default
  const currentProgram = selectedProgram ? {
    title: selectedProgram.program.title,
    description: selectedProgram.program.description,
    genre: selectedProgram.program.genre,
    channelName: selectedProgram.channelName,
    channelLogo: selectedProgram.channelLogo,
    status: selectedProgram.program.status,
    time: selectedProgram.program.time.split(' - ')[0], // Extract start time
    timeLeft: selectedProgram.program.timeLeft,
    breaking: selectedProgram.program.breaking,
    progress: selectedProgram.program.progress || 0
  } : defaultProgram;

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

  // Show selected program content
  return (
    <div className={`relative h-[500px] md:h-[600px] w-full ${className}`}>
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/liveparte_banner.png')",
          filter: 'brightness(0.6)'
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
      
      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="px-[60px] md:px-[80px] lg:px-[120px] max-w-[800px]">
          {/* Channel Info - Dynamic channel logo and LIVE indicator */}
          <motion.div 
            className="flex items-center gap-[16px] mb-[24px]"
            key={`channel-${currentProgram.channelName}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="bg-red-600 text-white px-[16px] py-[8px] rounded-[6px] text-[16px] font-bold">
              {currentProgram.channelLogo}
            </div>
            <div className="flex items-center gap-[8px]">
              <div className="w-[6px] h-[6px] bg-red-500 rounded-full"></div>
              <span className="text-white text-[16px] font-medium">
                {currentProgram.status === "live" ? "LIVE NOW" : "UPCOMING"}
              </span>
            </div>
            {currentProgram.breaking && (
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
            key={`title-${currentProgram.title}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {currentProgram.title}
          </motion.h1>
          
          {/* Description - Dynamic with animation */}
          <motion.p 
            className="text-gray-200 text-[20px] md:text-[22px] mb-[32px] leading-relaxed max-w-[600px]"
            key={`description-${currentProgram.description}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {currentProgram.description}
          </motion.p>
          
          {/* Metadata - Dynamic with animation */}
          <motion.div 
            className="flex flex-wrap gap-[20px] mb-[40px]"
            key={`metadata-${currentProgram.time}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <span className="text-gray-300 text-[16px]">Started {currentProgram.time}</span>
            <span className="text-gray-300 text-[16px]">•</span>
            <span className="text-gray-300 text-[16px]">{currentProgram.genre}</span>
            <span className="text-gray-300 text-[16px]">•</span>
            <span className="text-gray-300 text-[16px]">TV-14</span>
            {currentProgram.timeLeft && (
              <>
                <span className="text-gray-300 text-[16px]">•</span>
                <span className="text-gray-300 text-[16px]">{currentProgram.timeLeft}</span>
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
            <button className="bg-white text-black px-[32px] py-[16px] rounded-[8px] font-semibold text-[16px] flex items-center gap-[12px] hover:bg-gray-100 transition-colors border-2 border-black">
              <svg className="w-[20px] h-[20px]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
              {currentProgram.status === "live" ? "Watch Live" : "Set Reminder"}
            </button>
            <button className="bg-gray-600 text-white px-[32px] py-[16px] rounded-[8px] font-medium text-[16px] flex items-center gap-[12px] hover:bg-gray-500 transition-colors">
              <svg className="w-[20px] h-[20px]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
              Add Channel To Favorites
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
