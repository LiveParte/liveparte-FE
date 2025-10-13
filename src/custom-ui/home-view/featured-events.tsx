import React from "react";
import { Button } from "../../components/Ui/ui/button";

export default function FeaturedEvents() {
  const events = [
    {
      title: "Jazz at the Apollo",
      description: "An intimate evening of smooth jazz",
      image:
        "https://images.unsplash.com/photo-1511192336575-5a79af67a629?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      date: "Dec 19",
    },
    {
      title: "Rock Revolution",
      description: "Heavy guitars and thunderous drums",
      image:
        "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      date: "Dec 21",
    },
    {
      title: "Indie Spotlight Session",
      description: "Discover the next generation of artists",
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      date: "Dec 22",
    },
    {
      title: "Classical Crossover",
      description: "Where classical meets contemporary",
      image:
        "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      date: "Dec 25",
    },
  ];

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
          {events.map((event, index) => (
            <div key={index} className="group cursor-pointer">
              {/* Event Image */}
              <div className="relative rounded-xl overflow-hidden mb-4">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Date Badge */}
                {event.date && (
                  <div className="absolute top-3 right-3 bg-grey.300/80 px-3 py-1 rounded-lg">
                    <span className="text-white text-sm font-500">
                      {event.date}
                    </span>
                  </div>
                )}
              </div>

              {/* Event Info */}
              <div>
                <h3 className="text-white.200 font-bold text-lg mb-2 group-hover:text-blue-400 transition-colors">
                  {event.title}
                </h3>
                <p className="text-grey.200 text-sm leading-relaxed">
                  {event.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
