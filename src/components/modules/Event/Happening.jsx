import dynamic from 'next/dynamic'
import { MainContainer } from "@/utils/styleReuse";
import React from "react";
// import ShowsCard from "@/components/Common/Shows";
import { dummyShowData } from "./Data";
// import Carousel from "@/components/Common/Carousel";
import LazyLoadComponent from "@/components/Common/LazyComponent";
import Upcoming from './submodules/Upcoming';
import ShowsCard from '@/components/Common/MyShow/Shows';
import withLazyLoad from '@/components/Common/LazyLoading/lazyLoading';
import HappeningNow from './submodules/HappeningNow';
// import ShowsCard from "@/components/Common/MyShow/Shows";
const Carousel = dynamic(() => import("@/components/Common/Carousel"), {
  ssr: false
});

// const ShowsCard = dynamic(() => import("@/components/Common/MyShow/Shows"), {
//   ssr: false
// });
const LazyComponentWithLazyLoad = withLazyLoad(Upcoming);
const HappeningNowLazyLoading = withLazyLoad(HappeningNow);

export default function Happening({ events, upComingEvent, OnDemandEvent }) {
  const container = "pl-[20px] pr-[20px] lg:px-[60px]";
  return (
    <div className="bg-[#060809] ">
      {/* <LazyLoadComponent> */}
      <HappeningNowLazyLoading events={events}/>
      {/* </LazyLoadComponent> */}
      
     <LazyComponentWithLazyLoad  upComingEvent={upComingEvent}/>

      <div className={`bg-[#060809]  py-[30px] pb-[25px] lg:pb-[150px]`}>
        <div
          className={`text-[20px] font500 text-white ${MainContainer} mb-[40px]`}
        >
          Watch On Demand
        </div>

       
        <div className={container}>
          <Carousel
            Data={OnDemandEvent}
            renderItem={(item, i) => (
              <ShowsCard
           
                id={item?.id}
                name={item?.name}
                venue={item?.address}
                showImage={item?.thumbnail_url?.toString()}
                eventDate={item?.event_date}
                isLive={false}
              />
            )}
          />
         
        </div>
      </div>
    </div>
  );
}
