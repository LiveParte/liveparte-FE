import dynamic from "next/dynamic";
import NoAuth from "@/components/Layout/NoAuth";
import React from "react";
import { useGetEventOnDemandQuery } from "@/store/Event/eventApi";
import { useRouter } from "next/router";
import { isArray } from "@/utils/helper";
import { eventLink, randomBetweenOneAndTen } from "@/utils/reusableComponent";
import EventEmptyState from "@/components/Common/EventEmptyState";
import Footer from "../entertainers/Footer";
// const OnDemandListLazyLoad = withLazyLoad(OnDemandList);
const Hero = dynamic(() => import("@/components/modules/onDemand/Hero"), {
  ssr: false,
});
const OnDemandListLazyLoad = dynamic(
  () => import("@/components/modules/onDemand/OndemandList"),
  {
    ssr: false,
  }
);
// const Footer = dynamic(() => import("@/components/Common/Footer"), {
//   ssr: false,
// });
export default function OnDemandEvent() {
  const { data: onDemandEvent, isLoading: onDemandEventLoader } =
    useGetEventOnDemandQuery();
  const OnDemandEvent = isArray(onDemandEvent?.event)
    ? onDemandEvent?.event
    : [];
  const HeroSectionEvent =
    isArray(onDemandEvent?.event) &&
    onDemandEvent?.event[randomBetweenOneAndTen(onDemandEvent?.event.length)];
  const HeroSectionEvent2 =
    isArray(onDemandEvent?.event) && onDemandEvent?.event[3];
  const router = useRouter();
  // console.log(onDemandEvent,'onDemandEventonDemandEvent')

  return (
    <div className="bg-black m-h-[100vh] ">
      <NoAuth>
        {(!onDemandEventLoader && HeroSectionEvent?.name) ? (
          <Hero
            HeroSectionEvent={HeroSectionEvent}
            router={router}
            isOnDemand={true}
            notEvent={false}
            isSingleEvent={false}
            openModal={(item) => {
              router.push(`${eventLink}/${item?._id}`);
            }}
          />
        ) : (
          !onDemandEventLoader && <EventEmptyState />
        )}

        {OnDemandEvent?.length > 0 && (
          <OnDemandListLazyLoad
            OnDemandEvent={OnDemandEvent}
            HeroSectionEvent={HeroSectionEvent2}
          />
        )}
        <Footer />
      </NoAuth>
    </div>
  );
}
