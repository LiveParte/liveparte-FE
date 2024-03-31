import { MainContainer } from "@/utils/styleReuse";
import React from "react";
// import ShowsCard from "@/components/Common/Shows";
import { dummyShowData } from "./Data";
import Carousel from "@/components/Common/Carousel";
import ShowsCard from "@/components/Common/MyShow/Shows";

export default function Happening({ events, upComingEvent, OnDemandEvent }) {
  const container = "pl-[20px] pr-[20px] lg:px-[60px]";
  return (
    <div className="bg-[#060809] ">
      <div className={` py-[30px] pb-[72px] lg:pb-[150px]`}>
        <div
          className={`text-[20px] font500 text-white ${MainContainer} mb-[40px]`}
        >
          Happening now
        </div>

        {/*  */}
        <div className={container}>
          <Carousel
            Data={events}
            renderItem={(item) => (
              <ShowsCard
                // key={i}
                id={item?._id}
                name={item?.name}
                venue={item?.address}
                showImage={item?.thumbnail_url?.toString()}
                isLive={item?.isLive}
                eventDate={item?.event_date}
                item={item}
              />
            )}
          />
          
        </div>
      </div>
      {/*  */}
      <div className={`bg-[#060809]  py-[30px] pb-[72px] lg:pb-[150px]`}>
        <div
          className={`text-[20px] font500 text-white ${MainContainer} mb-[40px]`}
        >
          Upcoming
        </div>

        {/*  */}
        <div className={container}>
          <Carousel
            Data={upComingEvent}
            renderItem={(item, i) => (
              <ShowsCard
                // key={i}
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

      <div className={`bg-[#060809]  py-[30px] pb-[25px] lg:pb-[150px]`}>
        <div
          className={`text-[20px] font500 text-white ${MainContainer} mb-[40px]`}
        >
          Watch On Demand
        </div>

        {/*  */}
        <div className={container}>
          <Carousel
            Data={OnDemandEvent}
            renderItem={(item, i) => (
              <ShowsCard
                // key={i}
                id={item?.id}
                name={item?.name}
                venue={item?.address}
                showImage={item?.thumbnail_url?.toString()}
                eventDate={item?.event_date}
                isLive={false}
              />
            )}
          />
          {/* <div className="grid grid-cols-1  md:grid-cols-2  xl:grid-cols-4 md:gap-[40px] ">
          {dummyShowData?.map(({ name, venue, showImage, isLive }, i) => (
            <ShowsCard
              key={i}
              name={name}
              venue={venue}
              showImage={showImage.toString()}
              isLive={isLive}
            />
          ))}
        </div> */}
        </div>
      </div>
    </div>
  );
}
