"use client";
import React, { useRef, useState, useCallback, useEffect } from "react";
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
    streamingUrl?: string;
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

const ProgramGuide: React.FC<ProgramGuideProps> = ({
  className = "",
  onProgramSelect,
}) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<Date | null>(null);

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  // Also update current time every second for more responsive updates
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Update every second

    return () => clearInterval(timer);
  }, []);

  // Generate dynamic time slots based on current time
  const generateTimeSlots = (baseTime: Date) => {
    const slots = [];
    const now = baseTime;

    // Start from 2 hours before current time, rounded to nearest 30 minutes
    const startTime = new Date(now.getTime() - 2 * 60 * 60 * 1000);
    startTime.setMinutes(Math.floor(startTime.getMinutes() / 30) * 30, 0, 0);

    // Generate 12 time slots (6 hours total)
    for (let i = 0; i < 12; i++) {
      const slotTime = new Date(startTime.getTime() + i * 30 * 60 * 1000);
      slots.push(slotTime);
    }

    return slots;
  };

  // Generate time slots based on current time - this will update when currentTime changes
  const timeSlots = generateTimeSlots(currentTime);

  // Format time for display
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  // Format current time for display
  const formatCurrentTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Check if a time slot is current (current time falls within this slot)
  const isCurrentSlot = (slotTime: Date) => {
    const now = new Date();
    const nextSlotIndex =
      timeSlots.findIndex((slot) => slot.getTime() === slotTime.getTime()) + 1;
    const nextSlot =
      nextSlotIndex < timeSlots.length ? timeSlots[nextSlotIndex] : null;

    if (!nextSlot) return false;

    // Current time is within this slot if it's >= slotTime and < nextSlot
    const isCurrent = now >= slotTime && now < nextSlot;

    return isCurrent;
  };

  // Check if a time slot is selected
  const isSelectedSlot = (slotTime: Date) => {
    if (!selectedTimeSlot) return false;
    return slotTime.getTime() === selectedTimeSlot.getTime();
  };

  // Handle time slot selection
  const handleTimeSlotSelect = (slotTime: Date) => {
    setSelectedTimeSlot(slotTime);
  };

  // Handle keyboard navigation for time slots
  const handleTimeSlotKeyDown = (e: React.KeyboardEvent, slotTime: Date) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleTimeSlotSelect(slotTime);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      e.preventDefault();
      const currentIndex = timeSlots.findIndex(
        (slot) => slot.getTime() === slotTime.getTime()
      );
      let newIndex;

      if (e.key === "ArrowLeft") {
        newIndex = currentIndex > 0 ? currentIndex - 1 : timeSlots.length - 1;
      } else {
        newIndex = currentIndex < timeSlots.length - 1 ? currentIndex + 1 : 0;
      }

      const newSlot = timeSlots[newIndex];
      if (newSlot) {
        handleTimeSlotSelect(newSlot);
        // Focus the new button
        const buttonElement = document.querySelector(
          `[data-time-slot="${newSlot.getTime()}"]`
        ) as HTMLButtonElement;
        if (buttonElement) {
          buttonElement.focus();
        }
      }
    }
  };

  // Set default time selection to current time
  useEffect(() => {
    const now = new Date();
    const roundedTime = new Date(now);
    roundedTime.setMinutes(Math.floor(now.getMinutes() / 30) * 30, 0, 0);
    setSelectedTimeSlot(roundedTime);
  }, []);

  // Auto-focus the selected time slot when it changes (only if no other element is focused)
  useEffect(() => {
    if (selectedTimeSlot) {
      const activeElement = document.activeElement;
      const isTimeSlotFocused = activeElement?.getAttribute("role") === "tab";

      if (!isTimeSlotFocused) {
        const buttonElement = document.querySelector(
          `[data-time-slot="${selectedTimeSlot.getTime()}"]`
        ) as HTMLButtonElement;
        if (buttonElement) {
          buttonElement.focus();
        }
      }
    }
  }, [selectedTimeSlot]);

  // Generate programs based on time slots
  const generateProgramsForChannel = (
    channelId: string,
    channelName: string
  ) => {
    const programs = [];
    const now = new Date();

    for (let i = 0; i < timeSlots.length - 1; i++) {
      const startTime = timeSlots[i];
      const endTime = timeSlots[i + 1];

      // Determine if this program is currently live
      const isLive = now >= startTime && now < endTime;
      const timeLeft = isLive
        ? `${Math.ceil(
            (endTime.getTime() - now.getTime()) / (1000 * 60)
          )}m Left`
        : null;
      const progress = isLive
        ? Math.floor(
            ((now.getTime() - startTime.getTime()) /
              (endTime.getTime() - startTime.getTime())) *
              100
          )
        : 0;

      // Generate program data based on channel and time
      let programData;
      if (channelId === "cnn") {
        const cnnPrograms = [
          "Breaking News Tonight",
          "Anderson Cooper 360",
          "CNN Tonight",
          "CNN Newsroom",
          "Early Start",
          "CNN This Morning",
          "New Day",
          "CNN News",
          "CNN International",
          "Inside Politics",
          "State of the Union",
          "Fareed Zakaria GPS",
        ];
        programData = {
          title: cnnPrograms[i % cnnPrograms.length],
          description: isLive
            ? "Live coverage of today's most important stories"
            : "In-depth analysis and news coverage",
          genre: "News",
          breaking: isLive && i === 0,
        };
      } else if (channelId === "bbc") {
        const bbcPrograms = [
          "BBC World News",
          "Hardtalk",
          "Newsday",
          "BBC World News",
          "World Business Report",
          "BBC News",
          "World News Today",
          "Global",
          "Impact",
          "The World This Week",
          "Dateline London",
          "Focus on Africa",
        ];
        programData = {
          title: bbcPrograms[i % bbcPrograms.length],
          description: isLive
            ? "Global news and current affairs"
            : "International news and analysis",
          genre: "News",
          breaking: false,
        };
      } else {
        // Default program data
        programData = {
          title: `${channelName} Program ${i + 1}`,
          description: "Live programming",
          genre: "General",
          breaking: false,
        };
      }

      programs.push({
        title: programData.title,
        time: `${formatTime(startTime)} - ${formatTime(endTime)}`,
        status: isLive ? ("live" as const) : ("upcoming" as const),
        description: programData.description,
        genre: programData.genre,
        timeLeft,
        breaking: programData.breaking,
        progress,
      });
    }

    return programs;
  };

  const channelStreamUrls: Record<string, string> = {
    cnn: "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8",
    bbc: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
    fox: "https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8",
    msnbc: "https://mojen.se/vod/test/test_format_2.m3u8",
  };

  const channels = [
    {
      id: "cnn",
      name: "CNN",
      logo: "CNN",
      programs: generateProgramsForChannel("cnn", "CNN"),
    },
    {
      id: "bbc",
      name: "BBC World",
      logo: "BBC",
      programs: generateProgramsForChannel("bbc", "BBC World"),
    },
    {
      id: "fox",
      name: "Fox News",
      logo: "FOX",
      programs: generateProgramsForChannel("fox", "Fox News"),
    },
    {
      id: "msnbc",
      name: "MSNBC",
      logo: "MSNBC",
      programs: generateProgramsForChannel("msnbc", "MSNBC"),
    },
  ];

  const [selectedProgram, setSelectedProgram] = useState<string | null>(null);

  // Enhanced click handler that passes program data to parent
  const handleProgramClick = useCallback(
    (channelId: string, index: number) => {
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
            streamingUrl: channelStreamUrls[channelId] || channelStreamUrls.cnn,
          });
        }
      }
    },
    [selectedProgram, onProgramSelect, channels]
  );

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
        <div>
          <h3 className="text-white text-[18px] font-bold">Program Guide</h3>
          <p className="text-gray-400 text-[12px] mt-1">
            Use arrow keys to navigate time slots, Enter or Space to select
          </p>
        </div>
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
          <span className="text-[14px] font-medium">
            {formatCurrentTime(currentTime)}
          </span>
        </div>
      </div>

      {/* Time slots header - horizontal scrollable starting from far left with no padding */}
      <div className="mb-[16px] -ml-0">
        <div
          role="tablist"
          aria-label="Time slots for program guide"
          className="rounded-lg"
        >
          <HorizontalScrollView>
            {timeSlots.map((time, index) => {
              const isCurrent = isCurrentSlot(time);
              const isSelected = isSelectedSlot(time);
              const timeString = formatTime(time);

              return (
                <motion.button
                  key={`time-${index}`}
                  className={`text-center text-[12px] font-medium py-[8px] px-3 min-w-[120px] flex-shrink-0 rounded-lg transition-all duration-300 cursor-pointer focus:outline-none ${
                    isSelected
                      ? "bg-white text-black shadow-lg border-2 border-white"
                      : isCurrent
                      ? "bg-red-600 text-white border-2 border-red-500 shadow-lg"
                      : "text-gray-400 hover:text-white hover:bg-gray-800/50 border border-transparent"
                  }`}
                  onClick={() => handleTimeSlotSelect(time)}
                  onKeyDown={(e) => handleTimeSlotKeyDown(e, time)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    cursor: "pointer",
                    userSelect: "none",
                  }}
                  tabIndex={0}
                  role="tab"
                  aria-selected={isSelected}
                  aria-label={`Time slot ${timeString}${
                    isCurrent ? " (current time)" : ""
                  }${isSelected ? " (selected)" : ""}`}
                  title={`Click to select ${timeString}${
                    isCurrent ? " - Current time" : ""
                  }. Use arrow keys to navigate.`}
                  data-time-slot={time.getTime()}
                  data-index={index}
                >
                  <div className="flex items-center justify-center space-x-1">
                    <span>{timeString}</span>
                    {isCurrent && !isSelected && (
                      <>
                        <motion.div
                          className="w-1 h-1 bg-white rounded-full"
                          animate={{ opacity: [1, 0, 1] }}
                          transition={{ duration: 1, repeat: Infinity }}
                          aria-hidden="true"
                        />
                        <span className="text-xs font-bold text-white">
                          LIVE
                        </span>
                      </>
                    )}
                    {isSelected && (
                      <motion.div
                        className="w-1 h-1 bg-black rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                        aria-hidden="true"
                      />
                    )}
                  </div>
                </motion.button>
              );
            })}
          </HorizontalScrollView>
        </div>
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
