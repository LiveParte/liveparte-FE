// import dynamic from "next/dynamic";
import { MainContainer } from "@/utils/styleReuse";
import React from "react";
// import LazyLoadComponent from "@/components/Common/LazyComponent";
import Upcoming from "./submodules/Upcoming";
import withLazyLoad from "@/components/Common/LazyLoading/lazyLoading";
import HappeningNow from "./submodules/HappeningNow";
import WatchOnDemand from "./submodules/WatchOnDemand";

const LazyComponentWithLazyLoad = withLazyLoad(Upcoming);
const HappeningNowLazyLoading = withLazyLoad(HappeningNow);
const WatchOnDemandLazyLoading = withLazyLoad(WatchOnDemand);

export default function Happening({
  events = [],
  upComingEvent = [],
  OnDemandEvent = [],
}) {
  const container = "pl-[20px] pr-[20px] lg:px-[60px]";
  return (
    <div className="bg-[#060809] ">
      {/* <LazyLoadComponent> */}
      {events?.length > 0 && <HappeningNowLazyLoading events={events} />}
      {/* </LazyLoadComponent> */}

      {upComingEvent?.length > 0 && (
        <LazyComponentWithLazyLoad upComingEvent={upComingEvent} />
      )}
      {upComingEvent?.length >= 0 && (
        <WatchOnDemandLazyLoading OnDemandEvent={upComingEvent} />
      )}
    </div>
  );
}
