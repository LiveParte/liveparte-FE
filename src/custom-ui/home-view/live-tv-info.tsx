import React from "react";
import { Button } from "../../components/Ui/ui/button";
import { ChevronRight } from "lucide-react";

export default function LiveTVInfo() {
  return (
    <section className="py-24 px-[20px] sm:px-[40px] lg:px-[120px] bg-black-background">
      <div className="max-w-7xl mx-auto">
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
      </div>
    </section>
  );
}
