import { Event } from "@/types";

// Mock live events data for demonstration
export const mockLiveEvents: Event[] = [
  {
    _id: "1",
    name: "Afrobeat Night Live",
    description: "Join us for an electrifying night of Afrobeat music featuring top artists from across Africa. Experience the rhythm and energy of contemporary African music.",
    event_date: new Date().toISOString(),
    event_length: 120,
    streaming_url: "https://example.com/stream1",
    isLiveStreamed: true,
    eventStarted: true,
    price: 25.00,
    currency: "USD",
    image: "/images/liveparte_banner.png",
    thumbnail: "/images/liveparte_banner.png",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: "2", 
    name: "Comedy Central Live",
    description: "Laugh out loud with our top comedians in this live comedy show. Fresh jokes, hilarious skits, and interactive audience participation.",
    event_date: new Date().toISOString(),
    event_length: 90,
    streaming_url: "https://example.com/stream2",
    isLiveStreamed: true,
    eventStarted: true,
    price: 15.00,
    currency: "USD",
    image: "/images/liveparte_banner.png",
    thumbnail: "/images/liveparte_banner.png",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: "3",
    name: "Jazz Fusion Experience",
    description: "An intimate jazz performance featuring world-renowned musicians. Experience the smooth sounds of contemporary jazz fusion.",
    event_date: new Date().toISOString(),
    event_length: 150,
    streaming_url: "https://example.com/stream3",
    isLiveStreamed: true,
    eventStarted: true,
    price: 35.00,
    currency: "USD",
    image: "/images/liveparte_banner.png",
    thumbnail: "/images/liveparte_banner.png",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: "4",
    name: "Electronic Dance Night",
    description: "Get ready to dance with our live electronic music performance. High-energy beats and stunning visual effects.",
    event_date: new Date().toISOString(),
    event_length: 180,
    streaming_url: "https://example.com/stream4",
    isLiveStreamed: true,
    eventStarted: true,
    price: 20.00,
    currency: "USD",
    image: "/images/liveparte_banner.png",
    thumbnail: "/images/liveparte_banner.png",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: "5",
    name: "Acoustic Sessions",
    description: "Intimate acoustic performances by singer-songwriters. Raw, emotional, and beautifully crafted music.",
    event_date: new Date().toISOString(),
    event_length: 75,
    streaming_url: "https://example.com/stream5",
    isLiveStreamed: true,
    eventStarted: true,
    price: 18.00,
    currency: "USD",
    image: "/images/liveparte_banner.png",
    thumbnail: "/images/liveparte_banner.png",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: "6",
    name: "Hip Hop Cypher Live",
    description: "Live hip hop performances and freestyle sessions. Watch talented artists showcase their skills in real-time.",
    event_date: new Date().toISOString(),
    event_length: 100,
    streaming_url: "https://example.com/stream6",
    isLiveStreamed: true,
    eventStarted: true,
    price: 22.00,
    currency: "USD",
    image: "/images/liveparte_banner.png",
    thumbnail: "/images/liveparte_banner.png",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// Mock data for empty state demonstration
export const mockEmptyEvents: Event[] = [];
