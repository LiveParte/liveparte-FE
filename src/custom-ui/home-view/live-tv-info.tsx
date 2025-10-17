import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "../../components/Ui/ui/button";
import { ChevronRight } from "lucide-react";

// Channel data
const channels = [
  {
    id: "bbc",
    name: "BBC World",
    logo: "BBC",
    program: "World Business Report",
    time: "10:00 PM - 10:30 PM",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    content: {
      title:
        "Hong Kong (CNN) China has reported no new locally transmitted coronavirus cases for the first time since the pandemic began",
      description:
        "The coronavirus pandemic began in China. Today, it reported no new infections for the first time",
      source: "CNN",
      timeAgo: "1 hour ago",
    },
  },
  {
    id: "discovery",
    name: "Discovery Channel",
    logo: "DSC",
    program: "Planet Earth III",
    time: "10:30 PM - 11:00 PM",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    content: {
      title:
        "Planet Earth III: The most ambitious natural history series ever made",
      description:
        "Discover the incredible diversity of life on Earth through stunning cinematography and groundbreaking technology",
      source: "Discovery",
      timeAgo: "30 minutes ago",
    },
  },
  {
    id: "national-geographic",
    name: "National Geographic",
    logo: "NG",
    program: "Wildlife Documentary",
    time: "11:00 PM - 11:30 PM",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    content: {
      title: "Wildlife Documentary: The Secret Life of Big Cats",
      description:
        "Follow the lives of majestic big cats in their natural habitats across Africa and Asia",
      source: "National Geographic",
      timeAgo: "15 minutes ago",
    },
  },
];

export default function LiveTVInfo() {
  const [selectedChannel, setSelectedChannel] = useState(channels[0]);
  const [isHovered, setIsHovered] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Load video when component mounts or channel changes
  useEffect(() => {
    if (videoRef.current) {
      console.log("Loading video for channel:", selectedChannel.name);
      videoRef.current.load();
    }
  }, [selectedChannel]);

  // Handle video loading and playback
  useEffect(() => {
    console.log("Hover state changed:", isHovered);
    console.log("Video loaded:", isVideoLoaded);
    console.log("Video ref:", videoRef.current);

    if (isHovered && videoRef.current && isVideoLoaded) {
      console.log("Attempting to play video");
      const timer = setTimeout(() => {
        videoRef.current?.play().catch((error) => {
          console.error("Video play error:", error);
        });
      }, 300);
      return () => clearTimeout(timer);
    } else if (!isHovered && videoRef.current) {
      console.log("Pausing video");
      videoRef.current?.pause();
    }
  }, [isHovered, isVideoLoaded]);

  const handleVideoLoad = () => {
    console.log("Video loaded successfully");
    setIsVideoLoaded(true);
  };

  const handleVideoError = (error: any) => {
    console.error("Video error:", error);
    // Try to reload the video after a short delay
    setTimeout(() => {
      if (videoRef.current) {
        console.log("Retrying video load...");
        videoRef.current.load();
      }
    }, 1000);
  };

  const handleChannelSelect = (channel: (typeof channels)[0]) => {
    console.log("Switching to channel:", channel.name);
    setSelectedChannel(channel);
    setIsVideoLoaded(false); // Reset video load state when switching channels
    setIsHovered(false); // Reset hover state when switching channels
  };

  return (
    <section className="py-24 px-[20px] sm:px-[40px] lg:px-[120px] bg-black-background">
      <div className="w-full">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-16">
          <div className="lg:max-w-2xl mb-8 lg:mb-0">
            <h2 className="text-white.200 text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Live TV
            </h2>
            <p className="text-grey.200 text-lg md:text-xl leading-relaxed mb-8">
              Watch live news, documentaries, and exclusive content from premium
              channels. Access full TV guide and personalized recommendations.
            </p>
          </div>

          <Button className="bg-white.200 text-black.100 hover:bg-white.200/90 px-6 py-3 rounded-lg font-600 shadow-lg hover:shadow-xl transition-all duration-300 group self-start">
            View Full TV Guide
            <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[60%_1fr] gap-8 lg:gap-12">
          {/* Left Column - Dynamic Content */}
          <div className="space-y-6">
            <div
              className="relative h-[600px] rounded-2xl overflow-hidden cursor-pointer"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Background Image */}
              <img
                src={selectedChannel.thumbnailUrl}
                alt={`${selectedChannel.name} background`}
                className="w-full h-full object-cover transition-opacity duration-1000"
                style={{
                  opacity: isHovered && isVideoLoaded ? 0 : 1,
                }}
              />

              {/* Background Video */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered && isVideoLoaded ? 1 : 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full"
                style={{
                  backgroundColor: isHovered
                    ? "rgba(255, 0, 0, 0.1)"
                    : "transparent",
                }}
              >
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  muted
                  loop
                  playsInline
                  preload="auto"
                  onLoadedData={handleVideoLoad}
                  onError={handleVideoError}
                  onCanPlay={() => console.log("Video can play")}
                >
                  <source src={selectedChannel.videoUrl} type="video/mp4" />
                </video>
              </motion.div>

              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/50"></div>

              {/* Content overlay */}
              <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
                {/* Debug indicator */}
                {isHovered && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded text-xs">
                    HOVERED! Video loaded: {isVideoLoaded ? "Yes" : "No"}
                  </div>
                )}

                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-3 h-3 bg-red.100 rounded-full animate-pulse"></div>
                  <span className="text-sm font-500">
                    Live • {selectedChannel.content.timeAgo}
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-3 leading-tight">
                  {selectedChannel.content.title}
                </h3>
                <p className="text-base text-white/90 mb-2">
                  {selectedChannel.content.description}
                </p>
                <div className="flex items-center space-x-2 text-sm text-white/70">
                  <span>{selectedChannel.content.source}</span>
                  <span>•</span>
                  <span>{selectedChannel.content.timeAgo}</span>
                </div>
              </div>
            </div>

            {/* TV Schedule Section - Below Left Column Only */}
            <div className="bg-grey.300/10 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-white.200 text-xl font-bold">
                  TV Schedule
                </h4>
                <span className="text-white.200 text-sm">Current: 09:06</span>
              </div>

              {/* Time Slots */}
              <div className="flex space-x-3">
                <button className="px-4 py-2 bg-grey.300/20 text-white.200 rounded-lg text-sm hover:bg-grey.300/30 transition-colors">
                  7:00 PM
                </button>
                <button className="px-4 py-2 bg-grey.300/20 text-white.200 rounded-lg text-sm hover:bg-grey.300/30 transition-colors">
                  7:30 PM
                </button>
                <button className="px-4 py-2 bg-white.200 text-black.100 rounded-lg text-sm font-500">
                  8:00 PM
                </button>
                <button className="px-4 py-2 bg-grey.300/20 text-white.200 rounded-lg text-sm hover:bg-grey.300/30 transition-colors">
                  8:30 PM
                </button>
                <button className="px-4 py-2 bg-grey.300/20 text-white.200 rounded-lg text-sm hover:bg-grey.300/30 transition-colors">
                  9:00 PM
                </button>
                <button className="px-4 py-2 bg-grey.300/20 text-white.200 rounded-lg text-sm hover:bg-grey.300/30 transition-colors">
                  9:30 PM
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Popular Channels */}
          <div className="p-8 pt-0">
            <h3 className="text-2xl font-bold text-white.200 mb-8">
              Popular Channels
            </h3>

            {/* Channel Cards */}
            <div className="space-y-4 mb-8">
              {channels.map((channel) => (
                <motion.div
                  key={channel.id}
                  className={`rounded-lg p-4 transition-all duration-300 cursor-pointer ${
                    selectedChannel.id === channel.id
                      ? "bg-white.200/20 border-2 border-white.200/50"
                      : "bg-grey.300/20 hover:bg-grey.300/30"
                  }`}
                  onClick={() => handleChannelSelect(channel)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {/* Channel Logo */}
                      <div className="w-12 h-12 bg-grey.300/40 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-sm font-bold">
                          {channel.logo}
                        </span>
                      </div>

                      {/* Channel Info */}
                      <div className="flex-1">
                        <div className="mb-1">
                          <h4 className="text-white.200 font-bold text-base leading-tight">
                            {channel.name}
                          </h4>
                        </div>
                        <p className="text-grey.200 text-sm mb-1">
                          {channel.program}
                        </p>
                        <p className="text-grey.200/70 text-xs">
                          {channel.time}
                        </p>
                      </div>
                    </div>

                    {/* Right Arrow */}
                    <ChevronRight className="w-5 h-5 text-grey.200" />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* View All Button */}
            <Button className="w-full bg-grey.300/20 text-white.200 hover:bg-grey.300/30 font-500 border border-white.200/80 justify-start rounded-lg py-4 text-base">
              View All 50+ Channels
              <ChevronRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
