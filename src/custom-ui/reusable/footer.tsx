import React from "react";
import { Button } from "../../components/Ui/ui/button";
import { Globe, Music, Smartphone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black-background">
      {/* Top Separator */}
      <div className="border-t border-grey.400/20"></div>

      {/* Main Footer Content */}
      <div className="py-16 px-[20px] sm:px-[40px] lg:px-[120px]">
        <div className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Left Column - Liveparte Branding */}
            <div className="space-y-6">
              <div>
                <h2 className="text-white.200 text-4xl font-bold mb-4">
                  Liveparte
                </h2>
                <p className="text-grey.200 text-base leading-relaxed">
                  Experience live music like never before. Stream concerts,
                  festivals, and exclusive performances from the world's top
                  artists in stunning 4K quality.
                </p>
              </div>

              {/* Call-to-Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-white.200 text-black.100 hover:bg-white.200/90 px-6 py-3 rounded-lg font-500">
                  Join our Wishlist
                </Button>
                <Button className="bg-transparent border border-white.200/80 text-white.200 hover:bg-white.200 hover:text-black.100 px-6 py-3 rounded-lg font-500">
                  Learn More
                </Button>
              </div>
            </div>

            {/* Middle Column - Platform Links */}
            <div className="pl-0">
              <h3 className="text-white.200 text-lg font-bold mb-6">
                Platform
              </h3>
              <ul className="space-y-4 list-none pl-0">
                <li className="h-6">
                  <a
                    href="#"
                    className="text-grey.200 hover:text-white.200 transition-colors"
                  >
                    Browse Events
                  </a>
                </li>
                <li className="h-6">
                  <a
                    href="#"
                    className="text-grey.200 hover:text-white.200 transition-colors"
                  >
                    Live TV
                  </a>
                </li>
                <li className="h-6">
                  <a
                    href="#"
                    className="text-grey.200 hover:text-white.200 transition-colors"
                  >
                    Schedule
                  </a>
                </li>
                <li className="h-6">
                  <a
                    href="#"
                    className="text-grey.200 hover:text-white.200 transition-colors"
                  >
                    Genres
                  </a>
                </li>
                <li className="h-6">
                  <a
                    href="#"
                    className="text-grey.200 hover:text-white.200 transition-colors"
                  >
                    Artists
                  </a>
                </li>
              </ul>
            </div>

            {/* Right Column - Support Links */}
            <div className="pl-0">
              <h3 className="text-white.200 text-lg font-bold mb-6">Support</h3>
              <ul className="space-y-4 list-none pl-0">
                <li className="h-6">
                  <a
                    href="#"
                    className="text-grey.200 hover:text-white.200 transition-colors"
                  >
                    Help Center
                  </a>
                </li>
                <li className="h-6">
                  <a
                    href="#"
                    className="text-grey.200 hover:text-white.200 transition-colors"
                  >
                    Contact Us
                  </a>
                </li>
                <li className="h-6">
                  <a
                    href="#"
                    className="text-grey.200 hover:text-white.200 transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li className="h-6">
                  <a
                    href="#"
                    className="text-grey.200 hover:text-white.200 transition-colors"
                  >
                    Terms of Service
                  </a>
                </li>
                <li className="h-6">
                  <a
                    href="#"
                    className="text-grey.200 hover:text-white.200 transition-colors"
                  >
                    Accessibility
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Separator */}
      <div className="border-t border-grey.400/20"></div>

      {/* Bottom Section */}
      <div className="py-8 px-[20px] sm:px-[40px] lg:px-[120px]">
        <div className="w-full">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Left Side - Copyright */}
            <div className="text-grey.200 text-sm">
              © 2024 Event Streaming Platform. Minimal • Cinematic • Scalable
            </div>

            {/* Right Side - Features */}
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6">
              <div className="flex items-center space-x-2 text-grey.200 text-sm">
                <Globe className="w-4 h-4" />
                <span>Global Streaming</span>
              </div>
              <div className="flex items-center space-x-2 text-grey.200 text-sm">
                <Music className="w-4 h-4" />
                <span>4K Quality</span>
              </div>
              <div className="flex items-center space-x-2 text-grey.200 text-sm">
                <Smartphone className="w-4 h-4" />
                <span>Multi-Device</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
