import React from "react";
import { Button } from "../../components/Ui/ui/button";
import { ChevronRight } from "lucide-react";

export default function LiveTVInfo() {
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
          {/* Left Column - News Coverage */}
          <div className="space-y-6">
            <div className="relative h-[600px] rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                alt="News coverage background"
                className="w-full h-full object-cover"
              />
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/50"></div>

              {/* Content overlay */}
              <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-3 h-3 bg-red.100 rounded-full animate-pulse"></div>
                  <span className="text-sm font-500">Live • 1 hour ago</span>
                </div>
                <h3 className="text-2xl font-bold mb-3 leading-tight">
                  Hong Kong (CNN) China has reported no new locally transmitted
                  coronavirus cases for the first time since the pandemic began
                </h3>
                <p className="text-base text-white/90 mb-2">
                  The coronavirus pandemic began in China. Today, it reported no
                  new infections for the first time
                </p>
                <div className="flex items-center space-x-2 text-sm text-white/70">
                  <span>CNN</span>
                  <span>•</span>
                  <span>1 hour ago</span>
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
              {/* BBC World Channel Card */}
              <div className="bg-grey.300/20 rounded-lg p-4 hover:bg-grey.300/30 transition-colors cursor-pointer">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {/* Channel Logo */}
                    <div className="w-12 h-12 bg-grey.300/40 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm font-bold">BBC</span>
                    </div>

                    {/* Channel Info */}
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="text-white.200 font-bold text-base">
                          BBC World
                        </h4>
                        <div className="w-2 h-2 bg-red.100 rounded-full"></div>
                      </div>
                      <p className="text-grey.200 text-sm mb-1">
                        World Business Report
                      </p>
                      <p className="text-grey.200/70 text-xs">
                        10:00 PM - 10:30 PM
                      </p>
                    </div>
                  </div>

                  {/* Right Arrow */}
                  <ChevronRight className="w-5 h-5 text-grey.200" />
                </div>
              </div>

              {/* Discovery Channel Card */}
              <div className="bg-grey.300/20 rounded-lg p-4 hover:bg-grey.300/30 transition-colors cursor-pointer">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {/* Channel Logo */}
                    <div className="w-12 h-12 bg-grey.300/40 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm font-bold">DSC</span>
                    </div>

                    {/* Channel Info */}
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="text-white.200 font-bold text-base">
                          Discovery Channel
                        </h4>
                        <div className="w-2 h-2 bg-red.100 rounded-full"></div>
                      </div>
                      <p className="text-grey.200 text-sm mb-1">
                        Planet Earth III
                      </p>
                      <p className="text-grey.200/70 text-xs">
                        10:30 PM - 11:00 PM
                      </p>
                    </div>
                  </div>

                  {/* Right Arrow */}
                  <ChevronRight className="w-5 h-5 text-grey.200" />
                </div>
              </div>
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
