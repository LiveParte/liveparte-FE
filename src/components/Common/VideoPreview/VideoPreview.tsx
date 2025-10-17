import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface VideoPreviewProps {
  videoUrl: string;
  thumbnailUrl?: string;
  isVisible: boolean;
  className?: string;
}

export default function VideoPreview({
  videoUrl,
  thumbnailUrl,
  isVisible,
  className = "",
}: VideoPreviewProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isVisible && videoRef.current) {
      // Small delay to ensure smooth transition
      const timer = setTimeout(() => {
        setIsPlaying(true);
        videoRef.current?.play().catch(console.error);
      }, 200);

      return () => clearTimeout(timer);
    } else {
      setIsPlaying(false);
      videoRef.current?.pause();
    }
  }, [isVisible]);

  const handleVideoLoad = () => {
    setIsLoaded(true);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
            duration: 0.4,
          }}
          className={`relative overflow-hidden rounded-lg shadow-2xl ${className}`}
        >
          {/* Video Container */}
          <div className="relative w-full h-full">
            {/* Thumbnail Overlay (shown while video loads) */}
            {thumbnailUrl && !isLoaded && (
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${thumbnailUrl})` }}
              />
            )}

            {/* Video Element */}
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              muted
              loop
              playsInline
              preload="metadata"
              onLoadedData={handleVideoLoad}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            >
              <source src={videoUrl} type="video/mp4" />
            </video>

            {/* Loading Overlay */}
            {!isLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              </div>
            )}

            {/* Play Button Overlay */}
            {isLoaded && !isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg"
                >
                  <svg
                    className="w-6 h-6 text-black ml-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </motion.div>
              </div>
            )}

            {/* Subtle Border Glow */}
            <div className="absolute inset-0 rounded-lg ring-2 ring-white/20 ring-inset" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
