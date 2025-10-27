import React, { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

  // Handle hover with delay for better UX
  const handleMouseEnter = useCallback(() => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    // Add a small delay before hiding to prevent flickering
    hoverTimeoutRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 200);
  }, []);

  // Callback to handle program selection from ProgramGuide
  const handleProgramSelect = useCallback((programData: SelectedProgram) => {
    setSelectedProgram(programData);
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
    >
      {/* Hero Section - Full viewport, directly below navigation */}
      <div className="h-[calc(100vh-96px)] w-full">
        <HeroSection
          selectedProgram={selectedProgram}
          onVideoPlay={handleVideoMaximize}
        />
      </div>

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
            className="absolute bottom-0 left-0 right-0 px-[20px] md:px-[40px] lg:px-[120px] py-[40px] z-50 bg-black/60 backdrop-blur-md"
          >
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
