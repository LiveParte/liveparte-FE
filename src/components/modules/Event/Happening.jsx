import dynamic from "next/dynamic";
import React from "react";
// import LazyLoadComponent from "@/components/Common/LazyComponent";
import Upcoming from "./submodules/Upcoming";
import withLazyLoad from "@/components/Common/LazyLoading/lazyLoading";
// import HappeningNow from "./submodules/HappeningNow";
const HappeningNow = dynamic(() => import("./submodules/HappeningNow"), {
  ssr: false,
});
const UpcomingComp = dynamic(() => import("./submodules/Upcoming"), {
  ssr: false,
});

// const HappeningNowLazyLoading = withLazyLoad(HappeningNow);

export default function Happening({ events = [], upComingEvent = [] }) {
  // const container = "pl-[20px] pr-[20px] lg:px-[60px]";
  return (
    <div className="bg-[#060809]  relative pt-[0px] md:pt-[100px] pb-[50px] md:pb-[100px]">
      <div className=" absolute top-0 left-0 right-0 h-[20vh]   bg-contain xl:bg-cover !bg-no-repeat bg-gradient-to-b from-black"></div>

      {/* <LazyLoadComponent> */}
      {events?.length > 0 && <HappeningNow events={events} />}
      {/* </LazyLoadComponent> */}

      {upComingEvent?.length > 0 && (
        <UpcomingComp upComingEvent={upComingEvent} />
      )}

      {/* <div className="h-[40vh]"></div> */}
    </div>
  );
}
