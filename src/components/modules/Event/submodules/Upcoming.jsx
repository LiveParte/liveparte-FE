import Carousel from '@/components/Common/Carousel'
import ShowsCard from '@/components/Common/MyShow/Shows'
import { MainContainer } from '@/utils/styleReuse'

export default function Upcoming({upComingEvent}) {
    const container = "pl-[20px] pr-[20px] lg:px-[60px]";

  return (
    <div className={`bg-[#060809]  py-[30px] pb-[42px] lg:pb-[150px]`}>
        <div
          className={`text-[20px] font500 text-white ${MainContainer} mb-[40px]`}
        >
          Upcoming
        </div>

    
        <div className={container}>
          <Carousel
            Data={upComingEvent}
            renderItem={(item, i) => (
              <ShowsCard
                id={item?.id}
                name={item?.name}
                venue={item?.address}
                showImage={item?.thumbnail_url?.toString()}
                eventDate={item?.event_date}
                isLive={false}
                showVideo={false}
                isPlayIcon={false}
              />
            )}
          />
        </div>
      </div>
  )
}
