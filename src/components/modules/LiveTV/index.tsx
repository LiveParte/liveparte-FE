import React, { useState, useCallback } from "react";
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

  return (
    <div className={`${className}`}>
      {/* Hero Section - Full width, directly below navigation with proper spacing */}
      <div className="mt-[80px]">
        <HeroSection
          selectedProgram={selectedProgram}
          onVideoPlay={handleVideoMaximize}
        />
      </div>

      {/* Bottom Section - Categories and Program Guide with padding */}
      <div className="px-[20px] md:px-[40px] lg:px-[120px] py-[40px]">
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
      </div>

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
