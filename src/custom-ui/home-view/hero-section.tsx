import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "../../components/Ui/ui/button";
import {
  ArrowRight,
  Play,
  Users,
  Calendar,
  MapPin,
  Volume2,
  VolumeX,
} from "lucide-react";

export default function HeroSection() {
  const [isHeroHovered, setIsHeroHovered] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isPreviewing, setIsPreviewing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const retryIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Background video data
  const backgroundVideo = {
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  };

  // Detect touch device
  useEffect(() => {
    const touchCapable =
      typeof window !== "undefined" &&
      ("ontouchstart" in window || navigator.maxTouchPoints > 0);
    setIsTouchDevice(!!touchCapable);
  }, []);

  // Observe visibility for autoplay on mobile
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setIsVisible(entry.isIntersecting);
        if (!entry.isIntersecting) {
          videoRef.current?.pause();
          setIsPreviewing(false);
        } else if (entry.isIntersecting && isTouchDevice) {
          setIsPreviewing(true);
        }
      },
      { root: null, threshold: 0.3 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [isTouchDevice]);

  // Handle video loading and playback (mobile uses visibility, desktop uses hover)
  useEffect(() => {
    const isActive = isTouchDevice ? isVisible && isPreviewing : isHeroHovered;
    if (isActive && videoRef.current && (!isTouchDevice || isVideoLoaded)) {
      try {
        videoRef.current.load();
      } catch {}
      const playOnce = () => videoRef.current?.play().catch(() => {});
      const timer = setTimeout(playOnce, 100);

      if (retryIntervalRef.current) clearInterval(retryIntervalRef.current);
      retryIntervalRef.current = setInterval(() => {
        const v = videoRef.current;
        if (!v) return;
        const shouldBePlaying = isTouchDevice
          ? isVisible && isPreviewing
          : isHeroHovered;
        if (!shouldBePlaying) {
          if (retryIntervalRef.current) clearInterval(retryIntervalRef.current);
          return;
        }
        if (v.paused) {
          v.play().catch(() => {});
        } else if (retryIntervalRef.current) {
          clearInterval(retryIntervalRef.current);
        }
      }, 600);
      return () => {
        clearTimeout(timer);
        if (retryIntervalRef.current) clearInterval(retryIntervalRef.current);
      };
    } else {
      videoRef.current?.pause();
    }
  }, [isHeroHovered, isTouchDevice, isVisible, isPreviewing, isVideoLoaded]);

  // Mobile: Force autoplay on mount if visible, bounce any errors
  useEffect(() => {
    if (!isTouchDevice) return;
    // On mobile, try to play as soon as possible if visible
    const attemptPlay = () => {
      if (videoRef.current) {
        try {
          videoRef.current.load();
        } catch {}
        videoRef.current.play && videoRef.current.play().catch(() => {});
      }
    };
    attemptPlay();
    // Some devices need a short retry
    const tryMore = setTimeout(attemptPlay, 350);
    return () => clearTimeout(tryMore);
  }, [isTouchDevice]);

  // Handle audio toggle
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = !isAudioEnabled;
    }
  }, [isAudioEnabled]);

  const toggleAudio = () => {
    setIsAudioEnabled(!isAudioEnabled);
  };

  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
  };

  return (
    <section
      className="relative min-h-screen flex items-center justify-start overflow-hidden"
      onMouseEnter={() => setIsHeroHovered(true)}
      onMouseLeave={() => setIsHeroHovered(false)}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat transition-opacity duration-1000"
        style={{
          backgroundImage: `url('${backgroundVideo.thumbnailUrl}')`,
          opacity: isHeroHovered && isVideoLoaded ? 0 : 1,
        }}
      />

      {/* Background Video */}
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0 }}
        animate={{
          opacity:
            (isTouchDevice ? isVisible && isPreviewing : isHeroHovered) &&
            isVideoLoaded
              ? 1
              : 0,
        }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="absolute inset-0 w-full h-full"
      >
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          loop
          playsInline
          preload="metadata"
          controls={false}
          muted={!isAudioEnabled}
          autoPlay={true}
          onLoadedData={handleVideoLoad}
        >
          <source src={backgroundVideo.videoUrl} type="video/mp4" />
        </video>

        {/* Audio Control Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity:
              (isTouchDevice ? isVisible && isPreviewing : isHeroHovered) &&
              isVideoLoaded
                ? 1
                : 0,
            scale:
              (isTouchDevice ? isVisible && isPreviewing : isHeroHovered) &&
              isVideoLoaded
                ? 1
                : 0.8,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          onClick={toggleAudio}
          className="absolute top-6 right-6 z-10 bg-black/70 backdrop-blur-sm border border-white/30 rounded-full p-3 hover:bg-black/80 hover:border-white/50 transition-all duration-300 group shadow-lg"
        >
          {isAudioEnabled ? (
            <Volume2 className="w-5 h-5 text-white" />
          ) : (
            <VolumeX className="w-5 h-5 text-white/80" />
          )}
        </motion.button>
      </motion.div>

      {/* Dark Overlay for better text readability */}
      <div className="absolute inset-0 bg-black-background/50" />
      {/* Gradient overlay for dramatic effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-black-background/90 via-black-background/60 to-transparent" />

      {/* Content */}
      <div className="relative z-10 w-full lg:w-1/2 px-[20px] sm:px-[40px] lg:px-[120px] py-24">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl"
        >
          {/* Event Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-white.200/10 backdrop-blur-sm border border-white.200/20 rounded-full px-4 py-2 mb-6"
          >
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="text-white.200/90 text-sm font-500">LIVE NOW</span>
          </motion.div>

          {/* Date and Time */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-white.200/90 text-sm md:text-base font-500 mb-4 tracking-wide flex items-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            DECEMBER 15, 2024 • 8:00 PM EST
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-white.200 text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
          >
            Festival Live Stream
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-white.200/90 text-lg md:text-xl mb-8 leading-relaxed max-w-lg"
          >
            Experience the biggest music festival from the comfort of your home
            with crystal clear 4K streaming and exclusive backstage access
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex items-center gap-6 mb-8"
          >
            <div className="flex items-center gap-2 text-white.200/80">
              <Users className="w-5 h-5" />
              <span className="text-sm font-500">2.5K Watching</span>
            </div>
            <div className="flex items-center gap-2 text-white.200/80">
              <MapPin className="w-5 h-5" />
              <span className="text-sm font-500">Madison Square Garden</span>
            </div>
          </motion.div>

          {/* Call to Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button
              className="bg-white.200 text-black.100 hover:bg-white.200/90 px-8 py-4 text-lg font-600 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 group"
              size="lg"
            >
              <Play className="mr-2 w-5 h-5" />
              Watch Live
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
            <Button
              variant="outline"
              className="border-white.200/30 text-white.200 hover:bg-white.200/10 px-8 py-4 text-lg font-600 rounded-lg backdrop-blur-sm transition-all duration-300"
              size="lg"
            >
              Get Tickets
            </Button>
          </motion.div>

          {/* Audio Control Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-6"
          >
            <button
              onClick={toggleAudio}
              className="inline-flex items-center gap-2 bg-white.200/10 backdrop-blur-sm border border-white.200/20 rounded-full px-4 py-2 hover:bg-white.200/20 hover:border-white.200/40 transition-all duration-300 group"
            >
              {isAudioEnabled ? (
                <Volume2 className="w-4 h-4 text-white.200" />
              ) : (
                <VolumeX className="w-4 h-4 text-white.200/70" />
              )}
              <span className="text-white.200/90 text-sm font-500">
                {isAudioEnabled ? "Audio On" : "Audio Off"}
              </span>
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
