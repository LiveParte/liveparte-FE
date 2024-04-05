import Carousel from "@/components/Common/Carousel";
import ShowsCard from "@/components/Common/MyShow/Shows";
import { MainContainer } from "@/utils/styleReuse";

export default function HappeningNow({ events = [] }) {
  const container = "pl-[20px] pr-[20px] lg:px-[60px]";

  return (
    <div className={` py-[30px] pb-[42px] lg:pb-[150px]`}>
      <div
        className={`text-[20px] font500 text-white ${MainContainer} mb-[40px]`}
      >
        Happening Now
      </div>

      <div className={container}>
        <Carousel
          Data={events}
          renderItem={(item) => (
            <ShowsCard
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
  );
}
