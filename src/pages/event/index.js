import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import {
  useGetAllEventQuery,
  useGetEventOnDemandQuery,
} from "@/store/Event/eventApi";
import moment from "moment";
import { isArray, storage, userDetailStorageName } from "@/utils/helper";

// Dynamic imports
const Hero = dynamic(() => import("@/components/modules/onDemand/Hero"), {
  ssr: false,
});
const Happening = dynamic(
  () => import("@/components/modules/Event/Happening"),
  { ssr: false }
);
const Footer = dynamic(() => import("@/components/Common/Footer"), {
  ssr: false,
});
import NoAuth from "@/components/Layout/NoAuth";
import {
  checkShowDuration,
  checkShowDurationAfter,
  eventLink,
  isJSON,
  randomBetweenOneAndTen,
  singleEventLink,
} from "@/utils/reusableComponent";
import { useEffect } from "react";
import { selectCurrentUserData } from "@/store/User";
import { useSelector } from "react-redux";
import ButtonComp from "@/components/Ui/button";
const userData = storage.localStorage.get(userDetailStorageName);
const CheckUser = isJSON(userData) && JSON.parse(userData);
export default function Home() {
  const router = useRouter();
  const user = useSelector(selectCurrentUserData) || {};
  // Queries
  const {
    data,
    isLoading,
    isError,
    refetch: getAllEventRefetch,
  } = useGetAllEventQuery();
  const {
    data: onDemandEvent,
    isLoading: onDemandEventLoader,
    refetch: onDemandRefresh,
  } = useGetEventOnDemandQuery();

  // Data processing
  const happeningNowEvents = data?.event?.filter(
    (item) => item?.eventStarted === true
  );
  const onDemandEvents = onDemandEvent?.event;
  const filteredEvents = Array.isArray(data?.event)
    ? data?.event.filter((event) =>
        checkShowDuration(
          event?.event_date,
          event?.name === "Artiste radar live" ? 0 : event?.event_length
        )
      )
    : [];
  const filteredEventsHero = data?.event?.filter((event) =>
    checkShowDurationAfter(
      event?.event_date,
      event?.name === "Artiste radar live" ? 300000 : event?.event_length
    )
  );

  // console.log(filteredEventsHero, "filteredHeroShows");

  const filteredUpcoming = isArray(data?.event)
    ? data?.event.filter((event) => !event?.isLiveStreamed)
    : [];

  const heroEvent = isArray(filteredEventsHero)
    ? filteredEventsHero[randomBetweenOneAndTen(filteredEventsHero?.length)]
    : {};
    

  // console.log(data,'ArrayLengh')
  return (
    <div className="min-h-[100vh] bg-black over">
      {/* <ButtonComp> */}
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
