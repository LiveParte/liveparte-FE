import React from "react";
import { Button } from "../../components/Ui/ui/button";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-start overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        {/* Background Image */}
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
          }}
        />
        {/* Dark Overlay for better text readability */}
        <div className="absolute inset-0 bg-black-background/40" />
        {/* Gradient overlay for dramatic effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-black-background/80 via-black-background/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-[20px] sm:px-[40px] lg:px-[120px] py-24">
        <div className="max-w-2xl">
          {/* Date and Time */}
          <div className="text-white.200/90 text-sm md:text-base font-500 mb-4 tracking-wide">
            DECEMBER 15, 2024 • 8:00 PM EST
          </div>

          {/* Main Title */}
          <h1 className="text-white.200 text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Festival Live Stream
          </h1>

          {/* Description */}
          <p className="text-white.200/90 text-lg md:text-xl mb-8 leading-relaxed max-w-lg">
            Experience the biggest music festival from the comfort of your home
            with crystal clear 4K streaming
          </p>

          {/* Call to Action Button */}
          <Button
            className="bg-white.200 text-black.100 hover:bg-white.200/90 px-8 py-4 text-lg font-600 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 group"
            size="lg"
          >
            Get Tickets
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/2 right-10 transform -translate-y-1/2 z-10 hidden lg:block">
        {/* Spotlight effect simulation */}
        <div className="w-32 h-32 rounded-full bg-white.200/10 blur-xl animate-pulse" />
      </div>
    </section>
  );
}
