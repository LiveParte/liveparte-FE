import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "../../components/Ui/ui/button";
import { Play, Users, Clock, Music, Volume2, VolumeX } from "lucide-react";

// Comprehensive stream data
const streamData = {
  "summer-festival": {
    id: "summer-festival",
    title: "Summer Music Festival",
    subtitle: "Main Stage • Electronic",
    viewers: "12.3K",
    isLive: true,
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    description:
      "Experience the biggest electronic music festival with world-class DJs and stunning visual effects. Join thousands of music lovers for an unforgettable night of beats and energy.",
    genre: "Electronic",
    duration: "3 hours",
    startTime: "8:00 PM",
    endTime: "11:00 PM",
  },
  "jazz-lounge": {
    id: "jazz-lounge",
    title: "Jazz Lounge",
    subtitle: "Intimate Venue • Jazz",
    viewers: "2.1K",
    isLive: false,
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    description:
      "Smooth jazz in an intimate setting. Enjoy the finest jazz musicians performing classic and contemporary pieces in a cozy lounge atmosphere.",
    genre: "Jazz",
    duration: "2 hours",
    startTime: "9:30 PM",
    endTime: "11:30 PM",
  },
  "rock-revival": {
    id: "rock-revival",
    title: "Rock Revival",
    subtitle: "Arena • Rock",
    viewers: "4.8K",
    isLive: false,
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    description:
      "The ultimate rock experience featuring legendary bands and rising stars. Get ready for an explosive night of classic and modern rock hits.",
    genre: "Rock",
    duration: "2.5 hours",
    startTime: "10:15 PM",
    endTime: "12:45 AM",
  },
  "indie-showcase": {
    id: "indie-showcase",
    title: "Indie Showcase",
    subtitle: "Underground Venue • Indie",
    viewers: "1.9K",
    isLive: false,
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    description:
      "Discover the next generation of indie artists in this intimate showcase. Fresh sounds, raw talent, and authentic performances await.",
    genre: "Indie",
    duration: "1.5 hours",
    startTime: "11:00 PM",
    endTime: "12:30 AM",
  },
};

export default function ActiveStream() {
  const [selectedStream, setSelectedStream] =
    useState<keyof typeof streamData>("summer-festival");
  const [isHovered, setIsHovered] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Get current stream data
  const currentStream = streamData[selectedStream];

  // Handle video loading and playback
  useEffect(() => {
    if (isHovered && videoRef.current) {
      const timer = setTimeout(() => {
        videoRef.current?.play().catch(console.error);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      videoRef.current?.pause();
    }
  }, [isHovered]);

  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
  };

  const handleStreamSelect = (streamId: keyof typeof streamData) => {
    console.log("Selecting stream:", streamData[streamId].title);
    setSelectedStream(streamId);
    setIsVideoLoaded(false);
  };

  const toggleAudio = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isAudioEnabled;
      setIsAudioEnabled(!isAudioEnabled);
    }
  };

  return (
    <section className="py-24 px-[20px] sm:px-[40px] lg:px-[120px] bg-grey.300/5">
      <div className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[65%_1fr] gap-8 lg:gap-12">
          {/* Left Column - Live Now */}
          <div>
            <div className="flex items-center space-x-4 mb-6">
              <h2 className="text-white.200 text-4xl md:text-5xl font-bold">
                Live Now
              </h2>
              <div className="bg-red.100 px-4 py-1 rounded-full">
                <span className="text-white text-sm font-500">
                  3 Active Streams
                </span>
              </div>
            </div>

            {/* Main Live Stream Card */}
            <div
              className="relative rounded-2xl overflow-hidden max-h-[800px] cursor-pointer"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Background Image */}
              <img
                src={currentStream.thumbnailUrl}
                alt={currentStream.title}
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
              >
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  muted={!isAudioEnabled}
                  loop
                  playsInline
                  preload="auto"
                  onLoadedData={handleVideoLoad}
                >
                  <source src={currentStream.videoUrl} type="video/mp4" />
                </video>

                {/* Audio Control Button */}
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: isHovered && isVideoLoaded ? 1 : 0,
                    scale: isHovered && isVideoLoaded ? 1 : 0.8,
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

              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/30"></div>

              {/* Live indicator */}
              <div className="absolute top-4 left-4 bg-red.100 px-3 py-1 rounded-full">
                <div className="flex items-center space-x-2">
                  <motion.div
                    className="w-2 h-2 bg-white rounded-full"
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                  <span className="text-white text-sm font-500">
                    {currentStream.isLive ? "Live" : "Upcoming"} •{" "}
                    {currentStream.viewers} viewers
                  </span>
                </div>
              </div>

              {/* Stream info */}
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                <div>
                  <h3 className="text-white.200 text-3xl font-bold mb-2">
                    {currentStream.title}
                  </h3>
                  <p className="text-grey.200 text-lg mb-3">
                    {currentStream.subtitle}
                  </p>
                  <p className="text-white.200/90 text-base max-w-md">
                    {currentStream.description}
                  </p>
                </div>

                {/* Watch Now Button */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button className="bg-white.200 text-black.100 hover:bg-white.200/90 px-6 py-3 rounded-lg font-600 flex items-center space-x-2">
                    <Play className="w-4 h-4" />
                    <span>
                      {currentStream.isLive ? "Watch Now" : "Set Reminder"}
                    </span>
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Right Column - Coming Up Next */}
          <div className="pt-[74px]">
            <h3 className="text-white.200 text-2xl font-bold mb-6">
              Coming Up Next
            </h3>

            <div className="space-y-4">
              {Object.entries(streamData).map(([streamId, stream]) => (
                <motion.div
                  key={streamId}
                  className={`rounded-xl p-4 transition-all duration-300 cursor-pointer ${
                    selectedStream === streamId
                      ? "bg-white.200/20 border-2 border-white.200/50"
                      : "bg-grey.300/10 hover:bg-grey.300/20"
                  }`}
                  onClick={() =>
                    handleStreamSelect(streamId as keyof typeof streamData)
                  }
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="text-white.200 font-bold text-lg">
                          {stream.title}
                        </h4>
                        {stream.isLive && (
                          <motion.div
                            className="flex items-center space-x-1"
                            animate={{ opacity: [1, 0.5, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            <div className="w-2 h-2 bg-red.100 rounded-full" />
                            <span className="text-red.100 text-xs font-bold">
                              LIVE
                            </span>
                          </motion.div>
                        )}
                      </div>
                      <p className="text-grey.200 text-sm mb-2">
                        {stream.subtitle}
                      </p>
                      <div className="flex items-center space-x-4 text-xs text-grey.200">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{stream.startTime}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Music className="w-3 h-3" />
                          <span>{stream.genre}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-1 text-white.200 font-500 text-sm mb-1">
                        <Users className="w-3 h-3" />
                        <span>{stream.viewers}</span>
                      </div>
                      <div className="text-grey.200 text-xs">
                        {stream.duration}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
