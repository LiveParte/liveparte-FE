import dynamic from "next/dynamic";
import React from "react";
const HappeningNow = dynamic(() => import("./submodules/HappeningNow"), {
  ssr: false,
});
const UpcomingComp = dynamic(() => import("./submodules/Upcoming"), {
  ssr: false,
});


export default function Happening({ events = [], upComingEvent = [] }) {
  return ((events?.length>0||upComingEvent?.length>0)&&
    <div className="bg-[#060809]  relative pt-[0px] md:pt-[100px] pb-[50px] md:pb-[100px]">
      <div className=" absolute top-0 left-0 right-0 h-[10vh]   bg-contain xl:bg-cover !bg-no-repeat bg-gradient-to-b from-black"></div>

      {/* <LazyLoadComponent> */}
      {events?.length > 0 && <HappeningNow events={events} />}
      {/* </LazyLoadComponent> */}

      {upComingEvent?.length > 0 && (
        <UpcomingComp upComingEvent={upComingEvent} />
      )}

{/* {events?.length > 0 && <HappeningNow events={events}  title={`Past`}/>} */}

      {/* <div className="h-[40vh]"></div> */}
    </div>
  );
}
