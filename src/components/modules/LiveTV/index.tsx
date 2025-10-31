import React, { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
// Lazy import motion value utilities to avoid TS type issues with older framer-motion versions
// @ts-ignore
import { useMotionValue, useSpring } from "framer-motion";
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
  streamingUrl?: string;
}

const LiveTV: React.FC<LiveTVProps> = ({ className = "" }) => {
  const [selectedProgram, setSelectedProgram] =
    useState<SelectedProgram | null>(null);
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [sheetRatio, setSheetRatio] = useState<number>(0.25); // 0.25 or 0.7
  const [viewportH, setViewportH] = useState<number>(
    typeof window !== "undefined" ? window.innerHeight : 0
  );
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const dragOffsetRef = useRef<number>(0);
  const dragStartRatioRef = useRef<number>(0.25);
  const sheetHeightMv = useMotionValue(0);
  const sheetHeight = useSpring(sheetHeightMv, {
    stiffness: 380,
    damping: 36,
    mass: 0.25,
  });
  const isExpanded = sheetRatio > 0.25;

  // Handle hover with delay for better UX - only when NO video is playing
  const handleMouseEnter = useCallback(() => {
    // Only show slide-in when there's NO program selected
    if (!selectedProgram) {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
      setSheetRatio(0.25);
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

  // Viewport height listener for responsive snap heights
  React.useEffect(() => {
    const onResize = () => setViewportH(window.innerHeight);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  React.useEffect(() => {
    const next = Math.round((viewportH || 0) * sheetRatio);
    if (!Number.isNaN(next)) sheetHeightMv.set(next);
  }, [viewportH, sheetRatio]);

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
      setSheetRatio(0.25);
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

  // Auto-select a default program on mount so video starts playing
  React.useEffect(() => {
    if (!selectedProgram) {
      setSelectedProgram({
        program: {
          title: "Live News Stream",
          time: "Now - 24/7",
          status: "live",
          description: "Continuous live news coverage.",
          genre: "News",
          timeLeft: null,
          breaking: false,
          progress: 0,
        },
        channelId: "cnn",
        index: 0,
        channelName: "CNN",
        channelLogo: "CNN",
        streamingUrl:
          "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8",
      });
    }
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
          <>
            {/* Backdrop - visual only (no click-to-close) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm z-40 pointer-events-none"
            />
            <motion.div
              initial={false}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-0 left-0 right-0 z-50 bg-[#0b0c0e]/90 backdrop-blur-md pointer-events-auto rounded-t-2xl shadow-2xl flex flex-col"
              style={{ height: sheetHeight, transform: "translateY(0px)" }}
              onMouseEnter={handleContentMouseEnter}
              drag="y"
              dragElastic={0}
              dragMomentum={false}
              dragConstraints={{ top: 0, bottom: 0 }}
              onPanStart={() => {
                dragStartRatioRef.current = sheetRatio;
                dragOffsetRef.current = 0;
              }}
              onPan={(e, info) => {
                // @ts-ignore - framer-motion PanInfo
                const currentOffset = info.offset?.y ?? 0;
                dragOffsetRef.current = currentOffset;
                const deltaRatio = currentOffset / viewportH;
                let nextRatio = dragStartRatioRef.current - deltaRatio;
                // Clamp between 0.2 and 0.9
                nextRatio = Math.max(0.2, Math.min(0.9, nextRatio));
                sheetHeightMv.set(Math.round(nextRatio * viewportH));
              }}
              onPanEnd={() => {
                const current = sheetHeightMv.get();
                const ratio = (current || 0) / (viewportH || 1);
                const delta = dragOffsetRef.current;
                // Close only if dragged significantly down
                if (delta > 180 || ratio <= 0.16) {
                  setIsHovered(false);
                  sheetHeightMv.set(Math.round(viewportH * 0.25));
                  setSheetRatio(0.25);
                  return;
                }
                // Snap to closest: 25% or 70%
                const target = ratio >= 0.475 ? 0.7 : 0.25;
                sheetHeightMv.set(Math.round(viewportH * target));
                setSheetRatio(target);
              }}
            >
              {/* Drag Handle + Close */}
              <div className="absolute left-0 right-0 top-0 pt-2 pb-1 flex items-center justify-center">
                <div
                  className="flex items-center justify-center gap-2 px-3 h-10 w-full cursor-grab active:cursor-grabbing"
                  onClick={() => setSheetRatio((r) => (r > 0.25 ? 0.25 : 0.7))}
                >
                  <div className="w-12 h-1.5 rounded-full bg-white/30" />
                </div>
                <button
                  onClick={() => setIsHovered(false)}
                  className="absolute right-4 top-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-full p-2 transition-all duration-300 group"
                  aria-label="Close program guide"
                >
                  <X className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                </button>
              </div>

              <div
                className={`flex-1 min-h-0 overflow-y-auto px-[20px] md:px-[40px] lg:px-[120px] ${
                  isExpanded ? "pt-14 md:pt-14" : "pt-20 md:pt-8"
                } pb-8 flex flex-col lg:flex-row gap-[24px]`}
                style={{ maxHeight: "100%" }}
              >
                {/* Mobile: Categories tabs at top */}
                <div className="md:hidden -mx-[20px] px-[20px] pt-2 pb-4 border-b border-white/10">
                  <CategoriesSidebar />
                </div>

                {/* Desktop: Categories Sidebar */}
                <div className="hidden md:block relative flex-shrink-0">
                  <CategoriesSidebar />
                  {/* Faint vertical separator line */}
                  <div className="hidden lg:block absolute top-0 right-0 w-[1px] h-full bg-white/10" />
                </div>

                {/* Program Guide */}
                <div className="flex-1 min-w-0">
                  <ProgramGuide onProgramSelect={handleProgramSelect} />
                </div>
              </div>
            </motion.div>
          </>
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
