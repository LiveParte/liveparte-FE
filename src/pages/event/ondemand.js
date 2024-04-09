import dynamic from 'next/dynamic';
import NoAuth from '@/components/Layout/NoAuth'
import React from 'react'
// import Hero from "@/components/modules/onDemand/Hero";
import { useGetEventOnDemandQuery } from '@/store/Event/eventApi';
import { useRouter } from 'next/router';
import OnDemandList from '@/components/modules/onDemand/OndemandList';
import withLazyLoad from '@/components/Common/LazyLoading/lazyLoading';

const OnDemandListLazyLoad = withLazyLoad(OnDemandList);
const Hero = dynamic(() => import('@/components/modules/onDemand/Hero'), {
  ssr: false
});
const Footer = dynamic(() => import('@/components/Common/Footer'), {
    ssr: false
  });
export default function OnDemandEvent() {
    const {data:onDemandEvent,isLoading:onDemandEventLoader}=useGetEventOnDemandQuery();
    const OnDemandEvent =onDemandEvent?.event;
    const HeroSectionEvent =onDemandEvent?.event[1];
    const router = useRouter();

  return (
    <NoAuth>
    <Hero HeroSectionEvent={HeroSectionEvent}  router={router} notEvent={false} />
    <OnDemandListLazyLoad OnDemandEvent={OnDemandEvent} HeroSectionEvent={HeroSectionEvent} />
    {/* <Happening events={HappeningNow} upComingEvent={filteredEvents}  OnDemandEvent={OnDemandEvent}/> */}
    <Footer />
   
  </NoAuth>
  )
}
