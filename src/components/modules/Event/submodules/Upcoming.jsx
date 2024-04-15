import Carousel from '@/components/Common/Carousel'
import ShowsCard from '@/components/Common/MyShow/Shows'
import { MainContainer } from '@/utils/styleReuse'
import { useSwiper } from 'swiper/react';
import { ArrowLeft, ArrowRight } from '../../../../../public/svg';

export default function Upcoming({upComingEvent}) {
  const swiper = useSwiper();

    const container = "pl-[20px] pr-[20px] lg:px-[60px]";
console.log(upComingEvent,'upComingEvent')
  return (
    <div className={`bg-[#060809]  py-[30px] pb-[42px] lg:pb-[77px]`}>
        <div className={`flex justify-between items-center ${MainContainer}  mb-[40px]`}>
      <div
        className={`text-[20px] font500 text-white `}
      >
        Upcoming
      </div>
      <div className="flex items-center gap-[16px]">
      <div className="flex items-center gap-[16px]">
        <div className="button-prev1 relative">
          <ArrowLeft/>
          <div className="bg-transparent absolute left-0 right-0 top-0 bottom-0 z-10"></div>
        </div>
        <div className="button-next1 relative" >
        <ArrowRight/>
          <div className="bg-transparent absolute left-0 right-0 top-0 bottom-0 z-10"></div>
        </div>
      </div>
      </div>
       
      </div>

    
        <div className={container}>
          <Carousel
          leftBtnName=".button-prev1"
          rightBtnName=".button-next1"
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
                item={item}
              />
            )}
          />
        </div>
      </div>
  )
}
