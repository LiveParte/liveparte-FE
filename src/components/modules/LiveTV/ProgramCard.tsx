"use client";
import React from "react";
import { motion } from "framer-motion";

interface Program {
  title: string;
  time: string;
  status: "live" | "upcoming";
  description: string;
  genre: string;
  timeLeft?: string | null;
  breaking?: boolean;
  progress?: number;
}

interface ProgramCardProps {
  program: Program;
  channelId: string;
  index: number;
  isSelected: boolean;
  onSelect: (channelId: string, index: number) => void;
}

// Live Program Card Component
const LiveProgramCard: React.FC<{
  program: Program;
  channelId: string;
  index: number;
  onSelect: (channelId: string, index: number) => void;
}> = ({ program, channelId, index, onSelect }) => {
  return (
    <motion.div
      className="min-w-[17.75rem] h-[5.375em] flex flex-col justify-between rounded-[12px] border-gray-900 bg-gray-900 text-gray-300 hover:bg-gray-700 cursor-pointer transition-all relative px-4 py-2"
      whileHover={{
        scale: 1.05,
        y: -2,
        transition: { type: "spring", stiffness: 300 },
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
      <div className="flex justify-between">
        <h4 className="text-[16px] font-semibold text-white">
          {program.title}
        </h4>

        {/* Bell icon for upcoming programs */}
        <motion.div
          className="text-gray-400"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 + index * 0.1 }}
        >
          <svg
            className="w-[18px] h-[18px]"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
          </svg>
        </motion.div>
      </div>

      <div className="flex items-center space-x-3">
        <span className="text-[12px] text-gray-400">{program.timeLeft}</span>
        {/* Progress bar for live programs */}
        <div className="w-[10.75rem] bg-gray-600 rounded-full h-[5px] overflow-hidden">
          <motion.div
            className="bg-white h-[5px] rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${program.progress}%` }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>
    </motion.div>
  );
};

// Normal Program Card Component
const NormalProgramCard: React.FC<{
  program: Program;
  channelId: string;
  index: number;
  onSelect: (channelId: string, index: number) => void;
}> = ({ program, channelId, index, onSelect }) => {
  return (
    <motion.div
      className="min-w-[17.75rem] h-[5.375em] flex flex-col justify-between rounded-[12px] border-gray-900 bg-gray-900 text-gray-300 hover:bg-gray-700 cursor-pointer transition-all relative px-4 py-2"
      whileHover={{
        scale: 1.05,
        y: -2,
        transition: { type: "spring", stiffness: 300 },
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
      <div className="flex justify-between">
        <h4 className="text-[16px] font-semibold text-white">
          {program.title}
        </h4>

        {/* Bell icon for upcoming programs */}
        <motion.div
          className="text-gray-400"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 + index * 0.1 }}
        >
          <svg
            className="w-[18px] h-[18px]"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
          </svg>
        </motion.div>
      </div>

      <div className="flex items-center">
        <span className="text-[12px] text-gray-400">{program.time}</span>
        {program.timeLeft && (
          <span className="text-[12px] font-medium text-gray-400">
            {program.timeLeft}
          </span>
        )}
      </div>
    </motion.div>
  );
};

const SelectedProgramCard: React.FC<{
  program: Program;
  channelId: string;
  index: number;
  onSelect: (channelId: string, index: number) => void;
}> = ({ program, channelId, index, onSelect }) => {
  return (
    <motion.div
      className="min-w-[300px] flex-shrink-0 rounded-[12px] border bg-gray-900 border-gray-900 text-white cursor-pointer transition-all relative p-[16px]"
      whileHover={{
        scale: 1.05,
        y: -2,
        transition: { type: "spring", stiffness: 300 },
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
      {/* LIVE badge */}
      <motion.div
        className="absolute top-[12px] right-[12px] bg-red-600 text-white px-[8px] py-[3px] rounded-[4px] text-[11px] font-bold"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
      >
        LIVE
      </motion.div>

      {/* BREAKING NEWS badge */}
      {program.breaking && (
        <motion.div
          className="bg-blue-600 text-white px-[8px] py-[3px] rounded-[4px] text-[11px] font-bold mb-[12px] inline-block"
          initial={{ opacity: 0, scale: 0.8, x: -20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
        >
          BREAKING NEWS
        </motion.div>
      )}

      <div className="mb-[12px]">
        <h4 className="text-[16px] font-semibold text-white">
          {program.title}
        </h4>
      </div>

      <div className="text-[13px] mb-[6px] text-gray-300">{program.genre}</div>

      <p className="text-[13px] mb-[8px] leading-relaxed text-gray-300">
        {program.description}
      </p>

      <div className="flex items-center justify-between mb-[12px]">
        <span className="text-[13px] text-gray-300">{program.time}</span>
        {program.timeLeft && (
          <span className="text-[13px] font-medium text-gray-300">
            {program.timeLeft}
          </span>
        )}
      </div>

      {/* Progress bar for live programs */}
      <div className="w-full bg-gray-600 rounded-full h-[6px] overflow-hidden">
        <motion.div
          className="bg-red-600 h-[6px] rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${program.progress}%` }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  );
};

// Main Program Card Component
const ProgramCard: React.FC<ProgramCardProps> = React.memo(
  ({ program, channelId, index, isSelected, onSelect }) => {
    // Don't render if selected (this logic might need adjustment based on your requirements)
    if (isSelected) {
      return (
        <SelectedProgramCard
          program={program}
          channelId={channelId}
          index={index}
          onSelect={onSelect}
        />
      );
    }

    // Determine which component to render based on program status
    if (program.status === "live") {
      return (
        <LiveProgramCard
          program={program}
          channelId={channelId}
          index={index}
          onSelect={onSelect}
        />
      );
    }

    // Default to normal program card for upcoming programs
    return (
      <NormalProgramCard
        program={program}
        channelId={channelId}
        index={index}
        onSelect={onSelect}
      />
    );
  }
);

ProgramCard.displayName = "ProgramCard";

export default ProgramCard;
