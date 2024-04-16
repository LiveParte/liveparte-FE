// import Carousel from "@/components/Common/Carousel";
import ShowsCard from "@/components/Common/MyShow/Shows";
import { MainContainer } from "@/utils/styleReuse";
import { ArrowLeft, ArrowRight } from "../../../../../public/svg";
import dynamic from "next/dynamic";
import { useSwiper } from "swiper/react";
const Carousel = dynamic(() => import("@/components/Common/Carousel"), {
  ssr: false,
});
export default function HappeningNow({ events = [] }) {
  const container = "pl-[20px] pr-[20px] lg:px-[60px]";
  return (
    <div className={` py-[30px] pb-[42px] lg:pb-[77px]`}>
      <div
        className={`flex justify-between items-center ${MainContainer}  mb-[40px]`}
      >
        <div className={`text-[20px] font500 text-white `}>Happening Now</div>
        <div className="flex items-center gap-[16px]">
          <div className="flex items-center gap-[16px]">
            <div className="button-next relative">
              <ArrowLeft />
              <div className="bg-transparent absolute left-0 right-0 top-0 bottom-0 z-10"></div>
            </div>
            <div className="button-prev relative">
              <ArrowRight />
              <div className="bg-transparent absolute left-0 right-0 top-0 bottom-0 z-10"></div>
            </div>
          </div>
        </div>
      </div>

      <div className={container}>
        <Carousel
          Data={events}
          leftBtnName=".button-prev"
          rightBtnName=".button-next"
          renderItem={(item) => (
            <ShowsCard
              id={item?._id}
              name={item?.name}
              venue={item?.address}
              showImage={item?.thumbnail_url?.toString()}
              isLive={true}
              eventDate={item?.event_date}
              item={item}
            />
          )}
        />
      </div>
    </div>
  );
}
