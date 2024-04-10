import ShowsCard from "@/components/Common/MyShow/Shows";
import React from "react";
// import Hero from "./Hero";
import dynamic from "next/dynamic";
const Hero = dynamic(() => import('./Hero'), {
  ssr: false
});
export default function OnDemandList({ OnDemandEvent = [],HeroSectionEvent }) {
  const container = "pl-[20px] pr-[20px] lg:px-[60px]";

  return (
    <div className={` mt-[32px] mb-[100px]`}>
      <div className={`grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-x-[24px] gap-y-[40px] md:gap-y-[104px] ${container}`}>
        {OnDemandEvent?.slice(0,8)?.map((item, i) => (
          <ShowsCard onDemand={true} key={i} item={item} />
        ))}
      </div>
     
      <div className="my-5">
      <Hero HeroSectionEvent={HeroSectionEvent}  notEvent={false} showHeader={false} showStatus={false}  />
      </div>
      <div className={`grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-x-[24px] gap-y-[40px] md:gap-y-[104px] ${container}`}>
        {OnDemandEvent?.slice(8,OnDemandEvent?.length)?.map((item, i) => (
          <ShowsCard key={i} onDemand={true} item={item} />
        ))}
      </div>
    </div>
  );
}
