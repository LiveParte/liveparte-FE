"use client";
import React, { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import ProgramCard from "./ProgramCard";

interface ProgramGuideProps {
  className?: string;
  onProgramSelect?: (programData: {
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
  }) => void;
}

// Move HorizontalScrollView outside to prevent recreation
const HorizontalScrollView = React.memo(
  ({
    children,
    className = "",
  }: {
    children: React.ReactNode;
    className?: string;
  }) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);

    return (
      <div className={`relative w-full ${className}`}>
        {/* Scrollable container with drag functionality */}
        <div
          ref={containerRef}
          className="overflow-x-auto overflow-y-hidden scrollbar-hide scroll-smooth"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            touchAction: "pan-x",
            overscrollBehavior: "contain",
          }}
        >
          <motion.div
            ref={scrollRef}
            className="flex gap-4 py-2 items-start"
            style={{ width: "max-content" }}
            drag="x"
            dragConstraints={containerRef}
            dragElastic={0.1}
            dragMomentum={true}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={() => setIsDragging(false)}
            whileDrag={{
              cursor: "grabbing",
              scale: 0.98,
            }}
            animate={{
              cursor: isDragging ? "grabbing" : "grab",
              scale: isDragging ? 0.98 : 1,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
          >
            {children}
          </motion.div>
        </div>
      </div>
    );
  }
);

const ProgramGuide: React.FC<ProgramGuideProps> = ({ className = "", onProgramSelect }) => {
  const timeSlots = [
    "20:00",
    "20:30",
    "21:00",
    "21:30",
    "22:00",
    "22:30",
    "23:00",
    "23:30",
    "00:00",
    "00:30",
    "01:00",
    "01:30",
    "02:00",
    "02:30",
    "03:00",
  ];
  const currentTime = "20:45";

  const channels = [
    {
      id: "cnn",
      name: "CNN",
      logo: "CNN",
      programs: [
        {
          title: "Breaking News Tonight",
          time: "20:00 - 21:00",
          status: "live" as const,
          description: "Live coverage of today's most important stories",
          genre: "TV-PG News",
          timeLeft: "30m Left",
          breaking: true,
          progress: 70,
        },
        {
          title: "Anderson Cooper 360",
          time: "21:00 - 22:00",
          status: "upcoming" as const,
          description: "In-depth analysis of current events",
          genre: "News",
          timeLeft: null,
          breaking: false,
          progress: 0,
        },
        {
          title: "CNN Tonight",
          time: "22:00 - 23:00",
          status: "upcoming" as const,
          description: "Late night news and commentary",
          genre: "News",
          timeLeft: null,
          breaking: false,
          progress: 0,
        },
        {
          title: "CNN Newsroom",
          time: "23:00 - 00:00",
          status: "upcoming" as const,
          description: "Overnight news coverage",
          genre: "News",
          timeLeft: null,
          breaking: false,
          progress: 0,
        },
        {
          title: "Early Start",
          time: "00:00 - 01:00",
          status: "upcoming" as const,
          description: "Early morning news program",
          genre: "News",
          timeLeft: null,
          breaking: false,
          progress: 0,
        },
        {
          title: "CNN This Morning",
          time: "01:00 - 02:00",
          status: "upcoming" as const,
          description: "Morning news and weather",
          genre: "News",
          timeLeft: null,
          breaking: false,
          progress: 0,
        },
        {
          title: "New Day",
          time: "02:00 - 03:00",
          status: "upcoming" as const,
          description: "Early morning news program",
          genre: "News",
          timeLeft: null,
          breaking: false,
          progress: 0,
        },
      ],
    },
    {
      id: "bbc",
      name: "BBC World",
      logo: "BBC",
      programs: [
        {
          title: "BBC World News",
          time: "20:00 - 21:00",
          status: "live" as const,
          description: "Global news and current affairs",
          genre: "News",
          timeLeft: "30m Left",
          breaking: false,
          progress: 0,
        },
        {
          title: "Hardtalk",
          time: "21:00 - 22:00",
          status: "upcoming" as const,
          description: "In-depth interviews with world leaders",
          genre: "News",
          timeLeft: null,
          breaking: false,
          progress: 0,
        },
        {
          title: "Newsday",
          time: "22:00 - 23:00",
          status: "upcoming" as const,
          description: "Morning news program",
          genre: "News",
          timeLeft: null,
          breaking: false,
          progress: 0,
        },
        {
          title: "BBC World News",
          time: "23:00 - 00:00",
          status: "upcoming" as const,
          description: "Late night global news",
          genre: "News",
          timeLeft: null,
          breaking: false,
          progress: 0,
        },
        {
          title: "World Business Report",
          time: "00:00 - 01:00",
          status: "upcoming" as const,
          description: "Global business and financial news",
          genre: "Business",
          timeLeft: null,
          breaking: false,
          progress: 0,
        },
        {
          title: "BBC News",
          time: "01:00 - 02:00",
          status: "upcoming" as const,
          description: "Overnight news coverage",
          genre: "News",
          timeLeft: null,
          breaking: false,
          progress: 0,
        },
        {
          title: "World News Today",
          time: "02:00 - 03:00",
          status: "upcoming" as const,
          description: "Global news and analysis",
          genre: "News",
          timeLeft: null,
          breaking: false,
          progress: 0,
        },
      ],
    },
  ];

  const [selectedProgram, setSelectedProgram] = useState<string | null>(null);

  // Enhanced click handler that passes program data to parent
  const handleProgramClick = useCallback((channelId: string, index: number) => {
    const programId = `${channelId}-${index}`;
    const channel = channels.find((c) => c.id === channelId);
    
    if (channel && channel.programs[index]) {
      const program = channel.programs[index];
      
      // Toggle selection
      const newSelection = selectedProgram === programId ? null : programId;
      setSelectedProgram(newSelection);
      
      // Pass program data to parent component
      if (onProgramSelect && newSelection) {
        onProgramSelect({
          program,
          channelId,
          index,
          channelName: channel.name,
          channelLogo: channel.logo,
        });
      }
    }
  }, [selectedProgram, onProgramSelect, channels]);

  // Get selected program details
  const getSelectedProgram = () => {
    if (!selectedProgram) return null;
    const [channelId, indexStr] = selectedProgram.split("-");
    const index = parseInt(indexStr);
    const channel = channels.find((c) => c.id === channelId);
    if (channel && channel.programs[index]) {
      return {
        program: channel.programs[index],
        channelId,
        index,
      };
    }
    return null;
  };

  const selectedProgramData = getSelectedProgram();

  return (
    <div className={`flex-1 ${className}`} style={{ overflow: "hidden" }}>
      {/* Header with current time */}
      <div className="flex justify-between items-center mb-[20px]">
        <h3 className="text-white text-[18px] font-bold">Program Guide</h3>
        <div className="flex items-center gap-[8px] text-gray-400">
          <svg
            className="w-[16px] h-[16px]"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-[14px] font-medium">{currentTime}</span>
        </div>
      </div>

      {/* Time slots header - horizontal scrollable starting from far left with no padding */}
      <div className="mb-[16px] -ml-0">
        <HorizontalScrollView>
          {timeSlots.map((time, index) => (
            <div
              key={`time-${index}`}
              className="text-center text-gray-400 text-[12px] font-medium py-[8px] min-w-[120px] flex-shrink-0"
            >
              {time}
            </div>
          ))}
        </HorizontalScrollView>
      </div>

      {/* Channels and programs */}
      <div className="space-y-[24px]">
        {channels.map((channel) => (
          <div key={channel.id} className="space-y-[12px]">
            {/* Channel logo and name - positioned absolutely to overlay the scroll */}
            <div className="relative border-b border-gray-600 pb-3">
              <div className="bg-black/80 backdrop-blur-sm px-2 py-1 rounded-r-md">
                <div className="flex items-center gap-[8px]">
                  <div className="bg-gray-800 text-white px-[8px] py-[4px] rounded-[4px] text-[12px] font-bold">
                    {channel.logo}
                  </div>
                  <span className="text-white text-[14px] font-medium">
                    {channel.name}
                  </span>
                </div>
              </div>
            </div>

            {/* Programs timeline - horizontal scrollable starting from far left with no padding */}
            <div className="-ml-0">
              <HorizontalScrollView>
                {channel.programs.map((program, index) => (
                  <ProgramCard
                    key={`${channel.id}-${program.title}-${index}`}
                    program={program}
                    channelId={channel.id}
                    index={index}
                    isSelected={selectedProgram === `${channel.id}-${index}`}
                    onSelect={handleProgramClick}
                  />
                ))}
              </HorizontalScrollView>
            </div>
          </div>
        ))}
      </div>

      <style jsx global>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default ProgramGuide;
