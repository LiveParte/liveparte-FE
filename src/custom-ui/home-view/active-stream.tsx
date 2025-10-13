import React from "react";
import { Button } from "../../components/Ui/ui/button";

export default function ActiveStream() {
  const upcomingStreams = [
    {
      title: "Jazz Lounge",
      time: "9:30 PM",
      viewers: "2.1K",
    },
    {
      title: "Rock Revival",
      time: "10:15 PM",
      viewers: "4.8K",
    },
    {
      title: "Indie Showcase",
      time: "11:00 PM",
      viewers: "1.9K",
    },
  ];

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
            <div className="relative rounded-2xl overflow-hidden max-h-[800px]">
              <img
                src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                alt="Summer Music Festival"
                className="w-full h-full object-cover"
              />

              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/30"></div>

              {/* Live indicator */}
              <div className="absolute top-4 left-4 bg-red.100 px-3 py-1 rounded-full">
                <span className="text-white text-sm font-500">
                  Live • 12.3K viewers
                </span>
              </div>

              {/* Stream info */}
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                <div>
                  <h3 className="text-white.200 text-3xl font-bold mb-2">
                    Summer Music Festival
                  </h3>
                  <p className="text-grey.200 text-lg">
                    Main Stage • Electronic
                  </p>
                </div>

                {/* Watch Now Button */}
                <Button className="bg-white.200 text-black.100 hover:bg-white.200/90 px-6 py-3 rounded-lg font-600">
                  Watch Now
                </Button>
              </div>
            </div>
          </div>

          {/* Right Column - Coming Up Next */}
          <div className="pt-[74px]">
            <h3 className="text-white.200 text-2xl font-bold mb-6">
              Coming Up Next
            </h3>

            <div className="space-y-4">
              {upcomingStreams.map((stream, index) => (
                <div
                  key={index}
                  className="bg-grey.300/10 rounded-xl p-4 hover:bg-grey.300/20 transition-colors cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-white.200 font-bold text-lg mb-1">
                        {stream.title}
                      </h4>
                      <p className="text-grey.200 text-sm">{stream.time}</p>
                    </div>
                    <span className="text-white.200 font-500 text-sm">
                      {stream.viewers}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
