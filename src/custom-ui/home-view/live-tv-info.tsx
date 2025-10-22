import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { Button } from "../../components/Ui/ui/button";
import { ChevronRight, Volume2, VolumeX } from "lucide-react";

// (KEEP your full channelData exactly as you had it)
const channelData = {
  bbc: {
    name: "BBC World",
    logo: "BBC",
    programs: {
      "08:00": {
        program: "BBC Breakfast",
        time: "8:00 AM - 9:00 AM",
        videoUrl:
          "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        thumbnailUrl:
          "https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
        content: {
          title: "BBC Breakfast: Morning news and current affairs",
          description:
            "Start your day with the latest news, weather, and current affairs from around the world",
          source: "BBC World",
          timeAgo: "2 hours ago",
        },
      },
      "08:30": {
        program: "BBC News",
        time: "8:30 AM - 9:00 AM",
        videoUrl:
          "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        thumbnailUrl:
          "https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
        content: {
          title: "BBC News: Breaking news and analysis",
          description:
            "Comprehensive coverage of breaking news and in-depth analysis",
          source: "BBC World",
          timeAgo: "1.5 hours ago",
        },
      },
      "09:00": {
        program: "World Business Report",
        time: "9:00 AM - 9:30 AM",
        videoUrl:
          "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        thumbnailUrl:
          "https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
        content: {
          title: "World Business Report: Global markets and economy",
          description:
            "Analysis of global markets, economic trends, and business news",
          source: "BBC World",
          timeAgo: "1 hour ago",
        },
      },
      "09:30": {
        program: "BBC News Special",
        time: "9:30 AM - 10:00 AM",
        videoUrl:
          "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        thumbnailUrl:
          "https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
        content: {
          title: "BBC News Special: In-depth coverage",
          description: "Special reports and in-depth coverage of major stories",
          source: "BBC World",
          timeAgo: "30 minutes ago",
        },
      },
      "10:00": {
        program: "BBC World News",
        time: "10:00 AM - 10:30 AM",
        videoUrl:
          "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        thumbnailUrl:
          "https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
        content: {
          title: "BBC World News: International coverage",
          description:
            "Comprehensive international news coverage from BBC correspondents worldwide",
          source: "BBC World",
          timeAgo: "Live now",
        },
      },
    },
  },
  discovery: {
    name: "Discovery Channel",
    logo: "DSC",
    programs: {
      "08:00": {
        program: "Planet Earth III",
        time: "8:00 AM - 9:00 AM",
        videoUrl:
          "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        thumbnailUrl:
          "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
        content: {
          title: "Planet Earth III: The most ambitious natural history series",
          description:
            "Discover the incredible diversity of life on Earth through stunning cinematography",
          source: "Discovery",
          timeAgo: "2 hours ago",
        },
      },
      "08:30": {
        program: "MythBusters",
        time: "8:30 AM - 9:00 AM",
        videoUrl:
          "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        thumbnailUrl:
          "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
        content: {
          title: "MythBusters: Testing urban legends",
          description:
            "The team tests the validity of various myths and urban legends",
          source: "Discovery",
          timeAgo: "1.5 hours ago",
        },
      },
      "09:00": {
        program: "How It's Made",
        time: "9:00 AM - 9:30 AM",
        videoUrl:
          "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        thumbnailUrl:
          "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
        content: {
          title: "How It's Made: Manufacturing processes revealed",
          description:
            "Behind-the-scenes look at how everyday items are manufactured",
          source: "Discovery",
          timeAgo: "1 hour ago",
        },
      },
      "09:30": {
        program: "Deadliest Catch",
        time: "9:30 AM - 10:00 AM",
        videoUrl:
          "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        thumbnailUrl:
          "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
        content: {
          title: "Deadliest Catch: Alaskan crab fishing",
          description:
            "Follow crab fishermen in the dangerous waters of the Bering Sea",
          source: "Discovery",
          timeAgo: "30 minutes ago",
        },
      },
      "10:00": {
        program: "Shark Week Special",
        time: "10:00 AM - 10:30 AM",
        videoUrl:
          "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        thumbnailUrl:
          "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
        content: {
          title: "Shark Week Special: Ocean predators",
          description:
            "Explore the fascinating world of sharks and ocean predators",
          source: "Discovery",
          timeAgo: "Live now",
        },
      },
    },
  },
  "national-geographic": {
    name: "National Geographic",
    logo: "NG",
    programs: {
      "08:00": {
        program: "Wildlife Documentary",
        time: "8:00 AM - 9:00 AM",
        videoUrl:
          "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        thumbnailUrl:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
        content: {
          title: "Wildlife Documentary: The Secret Life of Big Cats",
          description:
            "Follow the lives of majestic big cats in their natural habitats",
          source: "National Geographic",
          timeAgo: "2 hours ago",
        },
      },
      "08:30": {
        program: "Explorer",
        time: "8:30 AM - 9:00 AM",
        videoUrl:
          "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        thumbnailUrl:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
        content: {
          title: "Explorer: Adventure and discovery",
          description:
            "Join explorers as they venture into uncharted territories",
          source: "National Geographic",
          timeAgo: "1.5 hours ago",
        },
      },
      "09:00": {
        program: "Earth from Space",
        time: "9:00 AM - 9:30 AM",
        videoUrl:
          "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        thumbnailUrl:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
        content: {
          title: "Earth from Space: Our planet from above",
          description:
            "Stunning satellite imagery reveals Earth's beauty and fragility",
          source: "National Geographic",
          timeAgo: "1 hour ago",
        },
      },
      "09:30": {
        program: "Nat Geo Wild",
        time: "9:30 AM - 10:00 AM",
        videoUrl:
          "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        thumbnailUrl:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
        content: {
          title: "Nat Geo Wild: Untamed nature",
          description:
            "Raw and unfiltered wildlife encounters from around the world",
          source: "National Geographic",
          timeAgo: "30 minutes ago",
        },
      },
      "10:00": {
        program: "Cosmos: A Spacetime Odyssey",
        time: "10:00 AM - 10:30 AM",
        videoUrl:
          "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        thumbnailUrl:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
        content: {
          title: "Cosmos: A Spacetime Odyssey - The universe revealed",
          description: "Journey through space and time to explore the cosmos",
          source: "National Geographic",
          timeAgo: "Live now",
        },
      },
    },
  },
};

export default function LiveTVInfo() {
  const router = useRouter();
  const [selectedChannelId, setSelectedChannelId] =
    useState<keyof typeof channelData>("bbc");
  const [isHovered, setIsHovered] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<Date | null>(null);
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const previewTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const instanceIdRef = useRef<string>(Math.random().toString(36).slice(2));

  // Get current channel data
  const selectedChannel = channelData[selectedChannelId];

  // Get current program based on selected time slot
  const getCurrentProgram = () => {
    if (!selectedTimeSlot) return null;

    // make timeKey match "08:00" keys
    const timeKey = selectedTimeSlot
      .toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
      .slice(0, 5); // "08:00"

    const programTimes = Object.keys(selectedChannel.programs).sort();
    let closestProgram = null;

    // exact match
    if (
      selectedChannel.programs[timeKey as keyof typeof selectedChannel.programs]
    ) {
      closestProgram =
        selectedChannel.programs[
          timeKey as keyof typeof selectedChannel.programs
        ];
    } else {
      for (let i = programTimes.length - 1; i >= 0; i--) {
        if (programTimes[i] <= timeKey) {
          closestProgram =
            selectedChannel.programs[
              programTimes[i] as keyof typeof selectedChannel.programs
            ];
          break;
        }
      }
    }

    return (
      closestProgram ||
      selectedChannel.programs[
        programTimes[0] as keyof typeof selectedChannel.programs
      ]
    );
  };

  // Set default time selection to 8:00 AM to match our program data
  useEffect(() => {
    const defaultTime = new Date();
    defaultTime.setHours(8, 0, 0, 0);
    setSelectedTimeSlot(defaultTime);
  }, []);

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute
    return () => clearInterval(timer);
  }, []);

  // Detect touch device
  useEffect(() => {
    const touchCapable =
      typeof window !== "undefined" &&
      ("ontouchstart" in window || navigator.maxTouchPoints > 0);
    setIsTouchDevice(!!touchCapable);
  }, []);

  // --------------------------
  // IntersectionObserver: play on scroll (REPLACED)
  // --------------------------
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        const nowVisible = entry.isIntersecting;
        setIsVisible(nowVisible);

        const v = videoRef.current;
        if (!v) return;

        // Ensure muted before trying to autoplay (mobile requirement)
        v.muted = true;

        if (nowVisible) {
          // Try to play; if blocked, add one-time gesture listeners
          v.play()
            .then(() => {
              // success — nothing else to do
            })
            .catch(() => {
              // autoplay blocked — add fallbacks that run once
              const resume = () => {
                v.play().catch(() => {});
                window.removeEventListener("touchstart", resume);
                window.removeEventListener("scroll", resume);
              };
              window.addEventListener("touchstart", resume, { once: true });
              window.addEventListener("scroll", resume, { once: true });
            });
        } else {
          // Pause when not visible
          try {
            v.pause();
          } catch {}
          setIsPreviewing(false);
        }
      },
      {
        root: null,
        threshold: 0.1, // play when 10% visible
      }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Load video when component mounts, channel changes, or time slot changes
  useEffect(() => {
    if (videoRef.current) {
      const currentProgram = getCurrentProgram();
      if (currentProgram) {
        // only change src by replacing <source> and calling load if needed
        const v = videoRef.current;
        const newSrc =
          currentProgram.videoUrl || selectedChannel.programs["08:00"].videoUrl;
        if (v.currentSrc !== newSrc) {
          // change src via source element to remain compatible
          const sourceEl = v.querySelector("source");
          if (sourceEl) {
            (sourceEl as HTMLSourceElement).src = newSrc;
            try {
              v.load();
            } catch {}
            setIsVideoLoaded(false);
          } else {
            // fallback: set src directly
            v.src = newSrc;
            try {
              v.load();
            } catch {}
            setIsVideoLoaded(false);
          }
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedChannelId, selectedTimeSlot]);

  // Handle video loading and playback (hover/preview logic preserved)
  useEffect(() => {
    const isActive = (isTouchDevice ? isPreviewing : isHovered) && isVisible;
    const v = videoRef.current;
    if (isActive && v) {
      try {
        window.dispatchEvent(
          new CustomEvent("lp-preview-start", {
            detail: { id: instanceIdRef.current },
          })
        );
      } catch {}

      if (isTouchDevice) {
        if (previewTimeoutRef.current) clearTimeout(previewTimeoutRef.current);
        previewTimeoutRef.current = setTimeout(() => {
          setIsPreviewing(false);
        }, 6000);
      }

      // Attempt to play (muted to satisfy mobile)
      v.muted = true;
      const t = setTimeout(() => {
        v.play().catch((error) => {
          console.error("Video play error:", error);
        });
      }, 100);

      // retry loop
      const retry = setInterval(() => {
        if (!v) return;
        const should = (isTouchDevice ? isPreviewing : isHovered) && isVisible;
        if (!should) {
          clearInterval(retry);
          return;
        }
        if (v.paused) {
          v.play().catch(() => {});
        } else {
          clearInterval(retry);
        }
      }, 600);

      return () => {
        clearTimeout(t);
        clearInterval(retry);
      };
    } else if (!isActive && v) {
      v.pause();
    }
  }, [isHovered, isVideoLoaded, isTouchDevice, isPreviewing, isVisible]);

  // Listen for other previews to stop this one
  useEffect(() => {
    const handlePreviewStart = (e: Event) => {
      const ev = e as CustomEvent<{ id: string } | undefined>;
      if (ev.detail && ev.detail.id !== instanceIdRef.current) {
        setIsPreviewing(false);
      }
    };
    window.addEventListener(
      "lp-preview-start",
      handlePreviewStart as EventListener
    );
    return () => {
      window.removeEventListener(
        "lp-preview-start",
        handlePreviewStart as EventListener
      );
    };
  }, []);

  // Cleanup preview timeout on unmount
  useEffect(() => {
    return () => {
      if (previewTimeoutRef.current) clearTimeout(previewTimeoutRef.current);
    };
  }, []);

  // Mobile: attempt quick play on mount if touch device
  useEffect(() => {
    if (!isTouchDevice) return;
    const attemptPlay = () => {
      const v = videoRef.current;
      if (!v) return;
      v.muted = true;
      v.play && v.play().catch(() => {});
    };
    attemptPlay();
    const t = setTimeout(attemptPlay, 350);
    return () => clearTimeout(t);
  }, [isTouchDevice]);

  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
  };

  const handleVideoError = (error: any) => {
    console.error("Video error:", error);
    setTimeout(() => {
      if (videoRef.current) {
        try {
          videoRef.current.load();
        } catch {}
      }
    }, 1000);
  };

  const toggleAudio = () => {
    if (videoRef.current) {
      // Unmute only if currently muted; the video may be autoplay-muted.
      const newAudioEnabled = !isAudioEnabled;
      setIsAudioEnabled(newAudioEnabled);
      videoRef.current.muted = !newAudioEnabled;
    }
  };

  // Generate time slots etc (unchanged)
  const generateTimeSlots = () => {
    const slots: Date[] = [];
    const now = new Date();
    const startTime = new Date(now);
    startTime.setHours(8, 0, 0, 0);
    for (let i = 0; i < 8; i++) {
      const slotTime = new Date(startTime.getTime() + i * 30 * 60 * 1000);
      slots.push(slotTime);
    }
    return slots;
  };

  const formatTime = (date: Date) =>
    date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

  const isCurrentSlot = (slotTime: Date) => {
    const now = new Date();
    return Math.abs(now.getTime() - slotTime.getTime()) < 15 * 60 * 1000;
  };

  const isSelectedSlot = (slotTime: Date) => {
    if (!selectedTimeSlot) return false;
    return slotTime.getTime() === selectedTimeSlot.getTime();
  };

  const handleTimeSlotSelect = (slotTime: Date) => {
    setSelectedTimeSlot(slotTime);
  };

  const handleChannelSelect = (channelId: keyof typeof channelData) => {
    setSelectedChannelId(channelId);
    setIsVideoLoaded(false);
    setIsHovered(false);
  };

  const handleViewAllChannels = () => {
    router.push("/livetv");
  };

  // --- Render (kept exactly as in your design) ---
  return (
    <>
      <style jsx global>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      <section className="py-24 px-[20px] sm:px-[40px] lg:px-[120px] bg-black-background">
        <div className="w-full">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-16">
            <div className="lg:max-w-2xl mb-8 lg:mb-0">
              <h2 className="text-white.200 text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Live TV
              </h2>
              <p className="text-grey.200 text-lg md:text-xl leading-relaxed mb-8">
                Watch live news, documentaries, and exclusive content from
                premium channels.
              </p>
            </div>

            <Button
              className="bg-white.200 text-black.100 hover:bg-white.200/90 px-6 py-3 rounded-lg font-600 shadow-lg hover:shadow-xl transition-all duration-300 group self-start"
              onClick={handleViewAllChannels}
            >
              View Full TV Guide
              <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[60%_1fr] gap-8 lg:gap-12">
            <div className="space-y-6">
              <div
                ref={containerRef}
                className="relative h-[600px] rounded-2xl overflow-hidden cursor-pointer"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                {/* Background image */}
                <img
                  src={
                    getCurrentProgram()?.thumbnailUrl ||
                    selectedChannel.programs["08:00"].thumbnailUrl
                  }
                  alt={`${selectedChannel.name} background`}
                  className="w-full h-full object-cover transition-opacity duration-1000"
                  style={{
                    opacity: isTouchDevice
                      ? isVisible
                        ? 0
                        : 1
                      : isHovered && isVideoLoaded
                      ? 0
                      : 1,
                  }}
                />

                {/* Video wrapper */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: isTouchDevice
                      ? isVisible
                        ? 1
                        : 0
                      : isHovered && isVideoLoaded
                      ? 1
                      : 0,
                  }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="absolute inset-0 w-full h-full"
                  style={{
                    backgroundColor: isHovered
                      ? "rgba(255,0,0,0.1)"
                      : "transparent",
                  }}
                >
                  <video
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    muted={!isAudioEnabled} // we control mute in code before autoplay attempts
                    loop
                    playsInline
                    preload="auto"
                    // remove autoPlay attribute to avoid conflicting direct control;
                    // we'll call play() from the observer/effects
                    onLoadedData={handleVideoLoad}
                    onError={handleVideoError}
                  >
                    <source
                      src={
                        getCurrentProgram()?.videoUrl ||
                        selectedChannel.programs["08:00"].videoUrl
                      }
                      type="video/mp4"
                    />
                  </video>

                  {/* Audio Control */}
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                      opacity: isTouchDevice
                        ? isVisible
                          ? 1
                          : 0
                        : isHovered && isVideoLoaded
                        ? 1
                        : 0,
                      scale: isTouchDevice
                        ? isVisible
                          ? 1
                          : 0.8
                        : isHovered && isVideoLoaded
                        ? 1
                        : 0.8,
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleAudio();
                    }}
                    className="absolute top-6 right-6 z-10 bg-black/70 backdrop-blur-sm border border-white/30 rounded-full p-3 hover:bg-black/80 hover:border-white/50 transition-all duration-300 group shadow-lg"
                  >
                    {isAudioEnabled ? (
                      <Volume2 className="w-5 h-5 text-white" />
                    ) : (
                      <VolumeX className="w-5 h-5 text-white/80" />
                    )}
                  </motion.button>
                </motion.div>

                <div className="absolute inset-0 bg-black/50"></div>

                <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
                  {isHovered && (
                    <div className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded text-xs">
                      HOVERED! Video loaded: {isVideoLoaded ? "Yes" : "No"}
                    </div>
                  )}

                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-3 h-3 bg-red.100 rounded-full animate-pulse"></div>
                    <span className="text-sm font-500">
                      Live • {getCurrentProgram()?.content.timeAgo || "Now"}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold mb-3 leading-tight">
                    {getCurrentProgram()?.content.title || "Loading..."}
                  </h3>
                  <p className="text-base text-white/90 mb-2">
                    {getCurrentProgram()?.content.description ||
                      "Loading program details..."}
                  </p>
                  <div className="flex items-center space-x-2 text-sm text-white/70">
                    <span>
                      {getCurrentProgram()?.content.source ||
                        selectedChannel.name}
                    </span>
                    <span>•</span>
                    <span>{getCurrentProgram()?.content.timeAgo || "Now"}</span>
                  </div>
                </div>
              </div>

              {/* TV schedule (unchanged) */}
              <div className="bg-grey.300/10 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-white.200 text-xl font-bold">
                    TV Schedule
                  </h4>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-red.100 rounded-full animate-pulse"></div>
                    <span className="text-white.200 text-sm">
                      Current: {formatTime(currentTime)}
                    </span>
                  </div>
                </div>

                <div className="flex space-x-3 overflow-x-auto scrollbar-hide">
                  {generateTimeSlots().map((slotTime, index) => {
                    const isCurrent = isCurrentSlot(slotTime);
                    const isSelected = isSelectedSlot(slotTime);
                    return (
                      <motion.button
                        key={index}
                        className={`px-4 py-2 rounded-lg text-sm font-500 transition-all duration-300 whitespace-nowrap cursor-pointer ${
                          isSelected
                            ? "bg-white.200 text-black.100 shadow-lg border-2 border-white.200"
                            : isCurrent
                            ? "bg-grey.300/30 text-white.200 border border-grey.300/50"
                            : "bg-grey.300/20 text-white.200 hover:bg-grey.300/30 border border-transparent"
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleTimeSlotSelect(slotTime)}
                      >
                        {formatTime(slotTime)}
                        {isCurrent && !isSelected && (
                          <motion.div
                            className="w-1 h-1 bg-red.100 rounded-full ml-1 inline-block"
                            animate={{ opacity: [1, 0, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                          />
                        )}
                        {isSelected && (
                          <motion.div
                            className="w-1 h-1 bg-black.100 rounded-full ml-1 inline-block"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 0.5, repeat: Infinity }}
                          />
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right column unchanged (channels list) */}
            <div className="p-8 pt-0">
              <h3 className="text-2xl font-bold text-white.200 mb-8">
                Popular Channels
              </h3>

              <div className="space-y-4 mb-8">
                {Object.entries(channelData).map(([channelId, channel]) => {
                  const getChannelProgram = () => {
                    if (!selectedTimeSlot)
                      return Object.values(channel.programs)[0];
                    const timeKey = selectedTimeSlot
                      .toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                      })
                      .slice(0, 5);
                    if (
                      channel.programs[timeKey as keyof typeof channel.programs]
                    ) {
                      return channel.programs[
                        timeKey as keyof typeof channel.programs
                      ];
                    }
                    const programTimes = Object.keys(channel.programs).sort();
                    for (let i = programTimes.length - 1; i >= 0; i--) {
                      if (programTimes[i] <= timeKey) {
                        return channel.programs[
                          programTimes[i] as keyof typeof channel.programs
                        ];
                      }
                    }
                    return Object.values(channel.programs)[0];
                  };

                  const channelProgram = getChannelProgram();

                  return (
                    <motion.div
                      key={channelId}
                      className={`rounded-lg p-4 transition-all duration-300 cursor-pointer ${
                        selectedChannelId === channelId
                          ? "bg-white.200/20 border-2 border-white.200/50"
                          : "bg-grey.300/20 hover:bg-grey.300/30"
                      }`}
                      onClick={() =>
                        handleChannelSelect(
                          channelId as keyof typeof channelData
                        )
                      }
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-grey.300/40 rounded-lg flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-sm font-bold">
                              {channel.logo}
                            </span>
                          </div>
                          <div className="flex-1">
                            <div className="mb-1">
                              <h4 className="text-white.200 font-bold text-base leading-tight">
                                {channel.name}
                              </h4>
                            </div>
                            <p className="text-grey.200 text-sm mb-1">
                              {channelProgram?.program || "Loading..."}
                            </p>
                            <p className="text-grey.200/70 text-xs">
                              {channelProgram?.time || "Loading..."}
                            </p>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-grey.200" />
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  className="w-full bg-grey.300/20 text-white.200 hover:bg-grey.300/30 font-500 border border-white.200/80 justify-start rounded-lg py-4 text-base transition-all duration-300"
                  onClick={handleViewAllChannels}
                >
                  View All 50+ Channels
                  <motion.div
                    className="ml-2"
                    animate={{ x: [0, 4, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </motion.div>
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
