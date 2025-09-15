import React from "react";
import { useRouter } from "next/router";
import NoAuth from "@/components/Layout/NoAuth";
import { useGetAllEventQuery } from "@/store/Event/eventApi";
import { Event } from "@/types";
import { checkShowDuration } from "@/utils/reusableComponent";
import { isArray } from "@/utils/helper";
import Footer from "../entertainers/Footer";

const LiveTv: React.FC = () => {
  const router = useRouter();
  
  // Get all events and filter for live events
  const { data, isLoading } = useGetAllEventQuery({});
  
  // Filter events that are currently live
  const liveEvents: Event[] = Array.isArray(data?.event)
    ? data.event.filter((event: Event) => 
        event.isLiveStreamed && 
        checkShowDuration(event?.event_date, event?.name === "Artiste radar live" ? 0 : event?.event_length)
      )
    : [];

  return (
    <div className="min-h-[100vh] bg-black-background">
      <NoAuth>
        <div className="px-[20px] md:px-[40px] lg:px-[120px] py-[40px]">
          <div className="mb-[40px]">
            <h1 className="text-white text-[32px] md:text-[48px] font-bold mb-[16px]">
              Live TV
            </h1>
            <p className="text-gray-400 text-[16px] md:text-[18px]">
              Watch live concerts and performances happening right now
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-[400px]">
              <div className="text-white text-[18px]">Loading live events...</div>
            </div>
          ) : liveEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px]">
              {liveEvents.map((event: Event) => (
                <div
                  key={event._id}
                  className="bg-[#1B1C20] rounded-[16px] overflow-hidden border border-[#343F4B] hover:border-[#4A5568] transition-all duration-300 cursor-pointer"
                  onClick={() => router.push(`/livestream/${event.name?.replace(/\s+/g, '-').toLowerCase()}/${event._id}`)}
                >
                  <div className="relative">
                    {event.image ? (
                      <img
                        src={event.image}
                        alt={event.name}
                        className="w-full h-[200px] object-cover"
                      />
                    ) : (
                      <div className="w-full h-[200px] bg-[#2D3748] flex items-center justify-center">
                        <span className="text-gray-400 text-[14px]">No Image</span>
                      </div>
                    )}
                    <div className="absolute top-[12px] left-[12px]">
                      <span className="bg-red-600 text-white px-[8px] py-[4px] rounded-[4px] text-[12px] font-medium">
                        LIVE
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-[20px]">
                    <h3 className="text-white text-[18px] font-semibold mb-[8px] line-clamp-2">
                      {event.name}
                    </h3>
                    <p className="text-gray-400 text-[14px] mb-[12px] line-clamp-2">
                      {event.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-[#4A90E2] text-[14px] font-medium">
                        Watch Now
                      </span>
                      <span className="text-gray-500 text-[12px]">
                        {event.event_length} min
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-[400px] text-center">
              <div className="w-[120px] h-[120px] bg-[#2D3748] rounded-full flex items-center justify-center mb-[24px]">
                <svg className="w-[48px] h-[48px] text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-white text-[24px] font-semibold mb-[12px]">
                No Live Events
              </h3>
              <p className="text-gray-400 text-[16px] max-w-[400px]">
                There are currently no live events. Check back later or browse our upcoming events.
              </p>
              <button
                onClick={() => router.push('/event')}
                className="mt-[24px] bg-[#4A90E2] text-white px-[24px] py-[12px] rounded-[8px] font-medium hover:bg-[#357ABD] transition-colors"
              >
                Browse Events
              </button>
            </div>
          )}
        </div>
        
        <Footer />
      </NoAuth>
    </div>
  );
};

export default LiveTv;
