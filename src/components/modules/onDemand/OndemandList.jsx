import ShowsCard from "@/components/Common/MyShow/Shows";
import React from "react";
// import Hero from "./Hero";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { eventLink } from "@/utils/reusableComponent";
import withLazyLoad from "@/components/Common/LazyLoading/lazyLoading";

const ShowCardLazy = withLazyLoad(ShowsCard);

const Hero = dynamic(() => import("./Hero"), {
  ssr: false,
});
export default function OnDemandList({ OnDemandEvent = [], HeroSectionEvent }) {
  const container = "pl-[20px] pr-[20px] lg:px-[60px]";
  const router = useRouter();
  // console.log(OnDemandEvent[0], "onDemandList");

  return (
    <div className={` pt-[32px] mb-[100px] bg-black`}>
      <div
        className={`grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-x-[24px] gap-y-[40px] md:gap-y-[104px] ${container}`}
      >
        {OnDemandEvent?.slice(0, 8)?.map((item, i) => (
          <ShowCardLazy
            onDemand={true}
            key={i}
            item={item}
            showVideo={item?.promotional_url ? true : false}
          />
        ))}
      </div>

      <div className="my-10">
        {OnDemandEvent?.length >= 9 && (
          <Hero
            HeroSectionEvent={HeroSectionEvent}
            showTopGradient={true}
            notEvent={false}
            showHeader={false}
            showStatus={false}
            openModal={(item) => {
              router.push(`${eventLink}/${item?._id}`);
            }}
          />
        )}
      </div>
      <div
        className={`grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-x-[24px] gap-y-[40px] md:gap-y-[104px] ${container}`}
      >
        {OnDemandEvent?.slice(8, OnDemandEvent?.length)?.map((item, i) => (
          <ShowCardLazy
            key={i}
            onDemand={true}
            item={item}
            showVideo={item?.promotional_url ? true : false}
          />
        ))}
      </div>
    </div>
  );
}
