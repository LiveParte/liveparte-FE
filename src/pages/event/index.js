import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import {
  useGetAllEventQuery,
  useGetEventHappingTodayQuery,
  useGetEventOnDemandQuery,
  useGetEventUpcomingQuery,
} from "@/store/Event/eventApi";
import moment from "moment";
import { isArray, storage, userDetailStorageName } from "@/utils/helper";
import { useEffect, useMemo } from "react";
import { selectCurrentUserData } from "@/store/User";
import { useSelector } from "react-redux";

// Dynamic imports
const Hero = dynamic(() => import("@/components/modules/onDemand/Hero"), {
  ssr: false,
});
const Happening = dynamic(
  () => import("@/components/modules/Event/Happening"),
  { ssr: false }
);
import NoAuth from "@/components/Layout/NoAuth";
import {
  checkShowDuration,
  checkShowDurationAfter,
  isJSON,
  randomBetweenOneAndTen,
} from "@/utils/reusableComponent";
import Footer from "../entertainers/Footer";

const userData = storage.localStorage.get(userDetailStorageName);
const CheckUser = isJSON(userData) && JSON.parse(userData);

export default function Home() {
  const router = useRouter();
  const user = useSelector(selectCurrentUserData) || {};
  
  // Queries
  const { data, isLoading } = useGetAllEventQuery();
  const { data: onDemandEvent, isLoading: onDemandEventLoader } = useGetEventOnDemandQuery();
  const { data: upcomingEvents } = useGetEventUpcomingQuery();
  const { data: happeningNowEvents } = useGetEventHappingTodayQuery();

  const happeningNowData = happeningNowEvents?.event;
  const upcomingNowData = upcomingEvents?.event;

  // Data processing
  const filteredEvents = Array.isArray(data?.event)
    ? data.event.filter((event) =>
        checkShowDuration(event?.event_date, event?.name === "Artiste radar live" ? 0 : event?.event_length)
      )
    : [];
  
  const filteredUpcoming = isArray(data?.event)
    ? data.event.filter((event) => !event.isLiveStreamed)
    : [];
  
  const onDemandEvents = onDemandEvent?.event;


  const today = new Date();


  //filter events to all return event with 
  const filteredOnDemandEvents = onDemandEvents?.filter((item) => {
  const hasStreamingUrl = !!item?.streaming_url;
  // const isPurchased = item?.purchase?.id ?? item?.purchase?._id;
  const eventDate = new Date(item?.event_date);
  const isFutureEvent = eventDate > today;

  // Include items where all conditions are true
  return hasStreamingUrl || isFutureEvent 
  // && !isPurchased;
});
    // Memoize the heroEvent to prevent re-evaluation on re-renders
    const heroEvent = useMemo(() => {
      if (!onDemandEventLoader && filteredOnDemandEvents?.length) {
        return filteredOnDemandEvents[randomBetweenOneAndTen(filteredOnDemandEvents.length)];
      }
      return null;
    }, [onDemandEventLoader, filteredOnDemandEvents]);
  
  

  console.log(filteredOnDemandEvents,'onDemandEvents')

  return (
    <div className="min-h-[100vh] bg-black over">
      <NoAuth>
        {heroEvent ? (
          <Hero
            isOnDemand={false}
            HeroSectionEvent={heroEvent}
            router={router}
            notEvent={true}
            isLoading={isLoading}
          />
        ) : (
          <div className="h-[100vh]"></div>
        )}
        <Happening
          events={filteredEvents}
          upComingEvent={filteredUpcoming}
          OnDemandEvent={onDemandEvents}
        />
        <Footer />
      </NoAuth>
    </div>
  );
}

