import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../../components/Ui/ui/button";
import {
  X,
  Play,
  Calendar,
  MapPin,
  Clock,
  Users,
  Music,
  Star,
} from "lucide-react";

// Comprehensive event data
const eventData = {
  "jazz-apollo": {
    id: "jazz-apollo",
    title: "Jazz at the Apollo",
    description: "An intimate evening of smooth jazz",
    fullDescription:
      "Experience the magic of jazz in the historic Apollo Theater. This exclusive event features world-renowned jazz musicians performing classic and contemporary pieces in an intimate setting. From smooth ballads to upbeat swing, this evening promises to be unforgettable.",
    image:
      "https://images.unsplash.com/photo-1511192336575-5a79af67a629?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    date: "Dec 19",
    fullDate: "December 19, 2024",
    time: "8:00 PM - 11:00 PM",
    venue: "Apollo Theater, New York",
    price: "$75 - $150",
    genre: "Jazz",
    rating: 4.8,
    capacity: "1,500",
    featured: true,
  },
  "rock-revolution": {
    id: "rock-revolution",
    title: "Rock Revolution",
    description: "Heavy guitars and thunderous drums",
    fullDescription:
      "Get ready for the ultimate rock experience! Rock Revolution brings together legendary bands and rising stars for an explosive night of classic and modern rock hits. From hard rock to alternative, this festival celebrates the power and energy of rock music.",
    image:
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    date: "Dec 21",
    fullDate: "December 21, 2024",
    time: "7:00 PM - 12:00 AM",
    venue: "Madison Square Garden, New York",
    price: "$95 - $200",
    genre: "Rock",
    rating: 4.9,
    capacity: "20,000",
    featured: true,
  },
  "indie-spotlight": {
    id: "indie-spotlight",
    title: "Indie Spotlight Session",
    description: "Discover the next generation of artists",
    fullDescription:
      "Join us for an intimate showcase of emerging indie artists. This special event features fresh sounds, raw talent, and authentic performances from the next generation of musicians. Discover your new favorite artists in this unique underground venue.",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    date: "Dec 22",
    fullDate: "December 22, 2024",
    time: "9:00 PM - 1:00 AM",
    venue: "The Bowery Ballroom, New York",
    price: "$35 - $65",
    genre: "Indie",
    rating: 4.6,
    capacity: "500",
    featured: false,
  },
  "classical-crossover": {
    id: "classical-crossover",
    title: "Classical Crossover",
    description: "Where classical meets contemporary",
    fullDescription:
      "Experience the beautiful fusion of classical and contemporary music. This unique event features renowned classical musicians performing modern arrangements and original compositions that bridge the gap between traditional and contemporary sounds.",
    image:
      "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
    date: "Dec 25",
    fullDate: "December 25, 2024",
    time: "7:30 PM - 10:30 PM",
    venue: "Carnegie Hall, New York",
    price: "$120 - $300",
    genre: "Classical",
    rating: 4.9,
    capacity: "2,800",
    featured: true,
  },
};

export default function FeaturedEvents() {
  const [selectedEvent, setSelectedEvent] = useState<
    keyof typeof eventData | null
  >(null);
  const [hoveredEvent, setHoveredEvent] = useState<
    keyof typeof eventData | null
  >(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Handle video loading and playback
  useEffect(() => {
    if (hoveredEvent && videoRef.current) {
      const timer = setTimeout(() => {
        videoRef.current?.play().catch(console.error);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      videoRef.current?.pause();
    }
  }, [hoveredEvent]);

  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
  };

  const handleEventClick = (eventId: keyof typeof eventData) => {
    setSelectedEvent(eventId);
    console.log("Opening event modal:", eventData[eventId].title);
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
  };

  return (
    <section className="py-24 px-[20px] sm:px-[40px] lg:px-[120px] bg-black-background">
      <div className="w-full">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-8">
          <div className="mb-6 lg:mb-0">
            <h2 className="text-white.200 text-4xl md:text-5xl font-bold mb-3">
              Featured Events
            </h2>
            <p className="text-grey.200 text-lg">
              Don't miss these incredible live performances
            </p>
          </div>

          <Button className="bg-transparent border border-white.200/80 text-white.200 hover:bg-white.200 hover:text-black.100 px-6 py-3 rounded-lg font-500 self-start">
            View All
          </Button>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.entries(eventData).map(([eventId, event]) => (
            <motion.div
              key={eventId}
              className="group cursor-pointer"
              onMouseEnter={() =>
                setHoveredEvent(eventId as keyof typeof eventData)
              }
              onMouseLeave={() => setHoveredEvent(null)}
              onClick={() =>
                handleEventClick(eventId as keyof typeof eventData)
              }
              whileHover={{ y: -8 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Event Image Container */}
              <div className="relative rounded-xl overflow-hidden mb-4 h-64">
                {/* Background Image */}
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover transition-opacity duration-500"
                  style={{
                    opacity: hoveredEvent === eventId && isVideoLoaded ? 0 : 1,
                  }}
                />

                {/* Background Video */}
                {hoveredEvent === eventId && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isVideoLoaded ? 1 : 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="absolute inset-0 w-full h-full"
                  >
                    <video
                      ref={videoRef}
                      className="w-full h-full object-cover"
                      muted
                      loop
                      playsInline
                      preload="auto"
                      onLoadedData={handleVideoLoad}
                    >
                      <source src={event.videoUrl} type="video/mp4" />
                    </video>
                  </motion.div>
                )}

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />

                {/* Date Badge */}
                <div className="absolute top-3 right-3 bg-grey.300/90 backdrop-blur-sm px-3 py-1 rounded-lg">
                  <span className="text-white text-sm font-500">
                    {event.date}
                  </span>
                </div>

                {/* Featured Badge */}
                {event.featured && (
                  <div className="absolute top-3 left-3 bg-red.100 px-3 py-1 rounded-lg">
                    <span className="text-white text-sm font-500 flex items-center space-x-1">
                      <Star className="w-3 h-3" />
                      <span>Featured</span>
                    </span>
                  </div>
                )}

                {/* Play Icon Overlay */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredEvent === eventId ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                    <Play className="w-8 h-8 text-white" />
                  </div>
                </motion.div>
              </div>

              {/* Event Info */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-white.200 font-bold text-lg group-hover:text-blue-400 transition-colors">
                    {event.title}
                  </h3>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-grey.200 text-sm">
                      {event.rating}
                    </span>
                  </div>
                </div>
                <p className="text-grey.200 text-sm leading-relaxed mb-2">
                  {event.description}
                </p>
                <div className="flex items-center justify-between text-xs text-grey.200">
                  <div className="flex items-center space-x-1">
                    <Music className="w-3 h-3" />
                    <span>{event.genre}</span>
                  </div>
                  <span className="font-500 text-white.200">{event.price}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Full-Screen Event Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
            />

            {/* Modal Content */}
            <motion.div
              className="relative bg-grey.300/10 backdrop-blur-xl border border-white.200/20 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              {/* Close Button */}
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 z-10 bg-grey.300/20 hover:bg-grey.300/30 rounded-full p-2 transition-colors"
              >
                <X className="w-5 h-5 text-white.200" />
              </button>

              {/* Event Content */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
                {/* Left Column - Image/Video */}
                <div className="relative rounded-xl overflow-hidden h-80 lg:h-96">
                  <img
                    src={eventData[selectedEvent].image}
                    alt={eventData[selectedEvent].title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30" />

                  {/* Featured Badge */}
                  {eventData[selectedEvent].featured && (
                    <div className="absolute top-4 left-4 bg-red.100 px-3 py-1 rounded-lg">
                      <span className="text-white text-sm font-500 flex items-center space-x-1">
                        <Star className="w-3 h-3" />
                        <span>Featured Event</span>
                      </span>
                    </div>
                  )}

                  {/* Date Badge */}
                  <div className="absolute top-4 right-4 bg-grey.300/90 backdrop-blur-sm px-3 py-1 rounded-lg">
                    <span className="text-white text-sm font-500">
                      {eventData[selectedEvent].date}
                    </span>
                  </div>
                </div>

                {/* Right Column - Event Details */}
                <div className="space-y-6">
                  {/* Title and Rating */}
                  <div>
                    <h2 className="text-white.200 text-3xl font-bold mb-2">
                      {eventData[selectedEvent].title}
                    </h2>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Star className="w-5 h-5 text-yellow-400 fill-current" />
                        <span className="text-white.200 text-lg font-500">
                          {eventData[selectedEvent].rating}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Music className="w-4 h-4 text-grey.200" />
                        <span className="text-grey.200">
                          {eventData[selectedEvent].genre}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <h3 className="text-white.200 text-xl font-bold mb-3">
                      About This Event
                    </h3>
                    <p className="text-grey.200 leading-relaxed">
                      {eventData[selectedEvent].fullDescription}
                    </p>
                  </div>

                  {/* Event Details */}
                  <div className="space-y-4">
                    <h3 className="text-white.200 text-xl font-bold">
                      Event Details
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-3">
                        <Calendar className="w-5 h-5 text-blue-400" />
                        <div>
                          <p className="text-grey.200 text-sm">Date</p>
                          <p className="text-white.200 font-500">
                            {eventData[selectedEvent].fullDate}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <Clock className="w-5 h-5 text-green-400" />
                        <div>
                          <p className="text-grey.200 text-sm">Time</p>
                          <p className="text-white.200 font-500">
                            {eventData[selectedEvent].time}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <MapPin className="w-5 h-5 text-red-400" />
                        <div>
                          <p className="text-grey.200 text-sm">Venue</p>
                          <p className="text-white.200 font-500">
                            {eventData[selectedEvent].venue}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <Users className="w-5 h-5 text-purple-400" />
                        <div>
                          <p className="text-grey.200 text-sm">Capacity</p>
                          <p className="text-white.200 font-500">
                            {eventData[selectedEvent].capacity}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Price and Actions */}
                  <div className="flex items-center justify-between pt-6 border-t border-grey.300/20">
                    <div>
                      <p className="text-grey.200 text-sm">Starting from</p>
                      <p className="text-white.200 text-2xl font-bold">
                        {eventData[selectedEvent].price}
                      </p>
                    </div>

                    <div className="flex space-x-3">
                      <Button className="bg-transparent border border-white.200/80 text-white.200 hover:bg-white.200 hover:text-black.100 px-6 py-3 rounded-lg font-500">
                        Add to Calendar
                      </Button>
                      <Button className="bg-white.200 text-black.100 hover:bg-white.200/90 px-6 py-3 rounded-lg font-600">
                        Get Tickets
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
