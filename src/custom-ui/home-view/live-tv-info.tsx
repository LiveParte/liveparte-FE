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
          {/* Left Column - International Desk */}
          <div className="relative">
            <div className="relative h-96 rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1571266028243-e4734c7f5c8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                alt="International Desk background"
                className="w-full h-full object-cover"
              />
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/50"></div>

              {/* Content overlay */}
              <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-3 h-3 bg-red.100 rounded-full animate-pulse"></div>
                  <span className="text-sm font-500">
                    8:00 PM - 9:00 PM • News
                  </span>
                </div>
                <h3 className="text-3xl font-bold mb-2">International Desk</h3>
                <p className="text-lg text-white/90">
                  Live coverage of today's most important stories
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Popular Channels */}
          <div className="bg-grey.300/5 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white.200 mb-8">
              Popular Channels
            </h3>

            {/* Simple vertical list of channels - Only 2 channels */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-4 p-2 rounded-lg hover:bg-grey.300/10 transition-colors cursor-pointer">
                <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-base font-bold">B</span>
                </div>
                <div>
                  <p className="text-white.200 font-500 text-base">BBC World</p>
                  <p className="text-grey.200 text-sm">News</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-2 rounded-lg hover:bg-grey.300/10 transition-colors cursor-pointer">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-base font-bold">D</span>
                </div>
                <div>
                  <p className="text-white.200 font-500 text-base">Discovery</p>
                  <p className="text-grey.200 text-sm">Documentary</p>
                </div>
              </div>
            </div>

            {/* View All Button */}
            <Button className="w-full bg-white.200 text-black.100 hover:bg-white.200/90 font-500">
              View all 50+ channels
              <ChevronRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
