import dynamic from "next/dynamic";
import NoAuth from "@/components/Layout/NoAuth";
import React from "react";
// import Hero from "@/components/modules/onDemand/Hero";
import { useGetEventOnDemandQuery } from "@/store/Event/eventApi";
import { useRouter } from "next/router";
import OnDemandList from "@/components/modules/onDemand/OndemandList";
import withLazyLoad from "@/components/Common/LazyLoading/lazyLoading";
import { isArray } from "@/utils/helper";
import { eventLink, singleEventLink } from "@/utils/reusableComponent";
import { useObject } from "@/Context/ObjectProvider";

const OnDemandListLazyLoad = withLazyLoad(OnDemandList);
const Hero = dynamic(() => import("@/components/modules/onDemand/Hero"), {
  ssr: false,
});
const Footer = dynamic(() => import("@/components/Common/Footer"), {
  ssr: false,
});
export default function OnDemandEvent() {
  const { setRouterLoader } = useObject();
  const { data: onDemandEvent, isLoading: onDemandEventLoader } =
    useGetEventOnDemandQuery();
  const OnDemandEvent = isArray(onDemandEvent?.event)
    ? onDemandEvent?.event
    : [];
  const HeroSectionEvent =
    isArray(onDemandEvent?.event) && onDemandEvent?.event[0];
  const HeroSectionEvent2 =
    isArray(onDemandEvent?.event) && onDemandEvent?.event[3];
  const router = useRouter();

  return (
    <NoAuth>
      <Hero
        HeroSectionEvent={HeroSectionEvent}
        router={router}
        notEvent={false}
        openModal={(item) => {
          console.log(item,'Hello');
          router.push(`${eventLink}/${item?._id}`);
          setRouterLoader(singleEventLink);
        }}
      />
      <OnDemandListLazyLoad
        OnDemandEvent={OnDemandEvent}
        HeroSectionEvent={HeroSectionEvent2}
      />
      {/* <Happening events={HappeningNow} upComingEvent={filteredEvents}  OnDemandEvent={OnDemandEvent}/> */}
      <Footer />
    </NoAuth>
  );
}
