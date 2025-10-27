import React, { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, X } from "lucide-react";
import HeroSection from "./HeroSection";
import CategoriesSidebar from "./CategoriesSidebar";
import ProgramGuide from "./ProgramGuide";
import FullscreenVideoModal from "./FullscreenVideoModal";

interface LiveTVProps {
  className?: string;
}

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

const LiveTV: React.FC<LiveTVProps> = ({ className = "" }) => {
  const [selectedProgram, setSelectedProgram] =
    useState<SelectedProgram | null>(null);
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Handle hover with delay for better UX - only when NO video is playing
  const handleMouseEnter = useCallback(() => {
    // Only show slide-in when there's NO program selected
    if (!selectedProgram) {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
      setIsHovered(true);
    }
  }, [selectedProgram]);

  const handleMouseLeave = useCallback(() => {
    // Only hide when there's NO program selected
    if (!selectedProgram) {
      // Add a small delay before hiding to prevent flickering
      hoverTimeoutRef.current = setTimeout(() => {
        setIsHovered(false);
      }, 200);
    }
  }, [selectedProgram]);

  // Track mouse position to only show animation near the downward icon (only when video is playing)
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      // Only apply mouse tracking when video is playing
      if (!selectedProgram) return;

      const container = e.currentTarget;
      const rect = container.getBoundingClientRect();
      const mouseY = e.clientY - rect.top;
      const mouseX = e.clientX - rect.left;
      const containerHeight = rect.height;
      const containerWidth = rect.width;

      // Only show animation when hovering near the center-bottom icon (80px radius from center, bottom 120px)
      const isNearBottom = mouseY > containerHeight - 120;
      const iconX = containerWidth / 2;
      const distanceFromCenter = Math.abs(mouseX - iconX);
      const isNearCenter = distanceFromCenter < 80;
      const isNearIcon = isNearBottom && isNearCenter;

      if (isNearIcon && !isHovered) {
        if (hoverTimeoutRef.current) {
          clearTimeout(hoverTimeoutRef.current);
        }
        setIsHovered(true);
      }
      // Removed the else clause - once open, it stays open until mouse leaves the container
    },
    [isHovered, selectedProgram]
  );

  // Keep animation open when mouse is over the animated content itself
  const handleContentMouseEnter = useCallback(() => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
  }, []);

  const handleContentMouseLeave = useCallback(() => {
    // Small delay before hiding to prevent flickering
    hoverTimeoutRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 300);
  }, []);

  // Callback to handle program selection from ProgramGuide
  const handleProgramSelect = useCallback((programData: SelectedProgram) => {
    setSelectedProgram(programData);
    setIsHovered(false); // Hide the slide-in when program is selected
  }, []);

  // Handle fullscreen video open/close
  const handleVideoMaximize = useCallback(() => {
    if (selectedProgram) {
      console.log(
        "Opening fullscreen video for:",
        selectedProgram.program.title
      );
      setIsFullscreenOpen(true);
    }
  }, [selectedProgram]);

  const handleCloseFullscreen = useCallback(() => {
    // console.log('Closing fullscreen video');
    setIsFullscreenOpen(false);
  }, []);

  // Hide slide-in when program is selected
  React.useEffect(() => {
    if (selectedProgram) {
      setIsHovered(false);
    }
  }, [selectedProgram]);

  // Cleanup timeout on unmount
  React.useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      className={`${className} relative`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      {/* Hero Section - Full viewport, directly below navigation */}
      <div className="h-[calc(100vh-96px)] w-full">
        <HeroSection
          selectedProgram={selectedProgram}
          onVideoPlay={handleVideoMaximize}
        />
      </div>

      {/* Scroll Indicator - Show when video is playing */}
      {selectedProgram && (
        <div
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-40 pointer-events-auto cursor-pointer"
          onClick={() => setIsHovered(!isHovered)}
        >
          <motion.div
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="bg-black/60 backdrop-blur-sm rounded-full p-3 border border-white/20"
            >
              <ChevronDown className="w-6 h-6 text-white" />
            </motion.div>
          </motion.div>
        </div>
      )}

      {/* Bottom Section - Categories and Program Guide with smooth animation */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{
              duration: 0.6,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="absolute bottom-0 left-0 right-0 px-[20px] md:px-[40px] lg:px-[120px] py-[40px] z-50 bg-black/60 backdrop-blur-md pointer-events-auto"
            onMouseEnter={handleContentMouseEnter}
            onMouseLeave={handleContentMouseLeave}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsHovered(false)}
              className="absolute top-4 right-4 md:top-6 md:right-6 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-full p-2 transition-all duration-300 group z-10"
              aria-label="Close program guide"
            >
              <X className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
            </button>

            <div className="flex flex-col lg:flex-row gap-[32px]">
              {/* Categories Sidebar */}
              <div className="relative">
                <CategoriesSidebar />
                {/* Faint vertical separator line */}
                <div className="hidden lg:block absolute top-0 right-0 w-[1px] h-full bg-white/10" />
              </div>

              {/* Program Guide */}
              <ProgramGuide onProgramSelect={handleProgramSelect} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fullscreen Video Modal */}
      {selectedProgram && (
        <FullscreenVideoModal
          isOpen={isFullscreenOpen}
          onClose={handleCloseFullscreen}
          programData={selectedProgram}
        />
      )}
    </div>
  );
};

export default LiveTV;
