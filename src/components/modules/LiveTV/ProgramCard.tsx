"use client";
import React from 'react';
import { motion } from 'framer-motion';

interface ProgramCardProps {
  program: any;
  channelId: string;
  index: number;
  isSelected: boolean;
  onSelect: (channelId: string, index: number) => void;
}

const ProgramCard: React.FC<ProgramCardProps> = ({ 
  program, 
  channelId, 
  index, 
  isSelected, 
  onSelect 
}) => {
  const isLive = program.status === 'live';
  const isSelectedProgram = isSelected || isLive;

  return (
    <motion.div
      className={`min-w-[280px] flex-shrink-0 rounded-[8px] border cursor-pointer transition-all relative ${
        isSelectedProgram
          ? 'bg-gray-700 border-gray-600 text-white h-[120px]' // Matched height
          : 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700 h-[100px]' // Smaller height
      }`}
      whileHover={{ 
        scale: 1.02,
        y: -2,
        transition: { type: "spring", stiffness: 300 }
      }}
      whileTap={{ scale: 0.98 }}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(channelId, index);
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      {/* For selected/live programs - show image on left */}
      {isSelectedProgram && (
        <div className="flex h-full">
          {/* Left side - Image */}
          <div className="w-[60px] h-full bg-gray-600 rounded-l-[8px] flex items-center justify-center relative overflow-hidden">
            {/* Placeholder for program image */}
            <div className="w-full h-full bg-gradient-to-br from-gray-500 to-gray-700 flex items-center justify-center">
              <div className="text-white text-[10px] font-bold text-center px-1">
                {program.breaking ? 'BREAKING' : 'LIVE'}
              </div>
            </div>
            
            {/* Audio icon overlay */}
            <div className="absolute top-1 right-1">
              <svg className="w-[12px] h-[12px] text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
              </svg>
            </div>
          </div>

          {/* Right side - Content */}
          <div className="flex-1 p-[12px] flex flex-col justify-between min-w-0">
            {/* Top section */}
            <div className="min-w-0">
              {/* LIVE badge */}
              {isLive && (
                <motion.div 
                  className="absolute top-[8px] right-[8px] bg-red-600 text-white px-[6px] py-[2px] rounded-[4px] text-[10px] font-bold"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                >
                  LIVE
                </motion.div>
              )}

              {/* BREAKING NEWS badge */}
              {program.breaking && (
                <motion.div 
                  className="bg-blue-600 text-white px-[6px] py-[2px] rounded-[4px] text-[10px] font-bold mb-[6px] inline-block"
                  initial={{ opacity: 0, scale: 0.8, x: -20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
                >
                  BREAKING NEWS
                </motion.div>
              )}

              <h4 className="text-[14px] font-semibold text-white mb-[2px] truncate">
                {program.title}
              </h4>
              
              <div className="text-[11px] text-gray-300 mb-[2px] truncate">
                {program.genre}
              </div>
              
              <p className="text-[11px] text-gray-300 leading-tight line-clamp-2">
                {program.description}
              </p>
            </div>

            {/* Bottom section */}
            <div className="flex items-center justify-between mt-[4px]">
              <span className="text-[11px] text-gray-300 truncate">
                {program.time}
              </span>
              {program.timeLeft && (
                <span className="text-[11px] font-medium text-gray-300 truncate ml-2">
                  {program.timeLeft}
                </span>
              )}
            </div>

            {/* Progress bar for live programs */}
            {isLive && (
              <div className="w-full bg-gray-600 rounded-full h-[3px] overflow-hidden mt-[4px]">
                <motion.div 
                  className="bg-red-600 h-[3px] rounded-full" 
                  initial={{ width: 0 }}
                  animate={{ width: `${program.progress}%` }}
                  transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                />
              </div>
            )}
          </div>
        </div>
      )}

      {/* For non-selected programs - normal layout */}
      {!isSelectedProgram && (
        <div className="p-[12px] h-full flex flex-col justify-between min-w-0">
          {/* Bell icon for upcoming programs */}
          <motion.div 
            className="absolute top-[8px] right-[8px] text-gray-400"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + index * 0.1 }}
          >
            <svg className="w-[14px] h-[14px]" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
            </svg>
          </motion.div>

          <div className="mb-[8px] min-w-0">
            <h4 className="text-[14px] font-semibold text-white mb-[2px] truncate">
              {program.title}
            </h4>
          </div>
          
          <div className="text-[11px] mb-[4px] text-gray-400 truncate">
            {program.genre}
          </div>
          
          <p className="text-[11px] mb-[6px] leading-tight text-gray-400 line-clamp-2">
            {program.description}
          </p>
          
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-gray-400 truncate">
              {program.time}
            </span>
            {program.timeLeft && (
              <span className="text-[11px] font-medium text-gray-400 truncate ml-2">
                {program.timeLeft}
              </span>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ProgramCard;
