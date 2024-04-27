import Carousel from '@/components/Common/Carousel'
import ShowsCard from '@/components/Common/MyShow/Shows'
import { MainContainer } from '@/utils/styleReuse'
import Image from 'next/image';
import withLazyLoad from "@/components/Common/LazyLoading/lazyLoading";


const SingleShowCard = withLazyLoad(ShowsCard);

export default function Upcoming({upComingEvent}) {

    const container = "pl-[20px] pr-[20px] lg:px-[60px]";
  return (
    <div className={`bg-[#060809]  py-[30px] pb-[42px] lg:pb-[77px]`}>
        <div className={`flex justify-between items-center ${MainContainer}  mb-[40px]`}>
      <div
        className={`text-[20px] font500 text-white `}
      >
        Upcoming
      </div>
      <div className="hidden md:flex items-center gap-[16px]">
      <div className="hidden md:flex items-center gap-[16px] ">
            <button className="button-next1 relative">
              <Image src={'/icons/arrowLeft.png'} alt="rightArrow" width={30} height={30}/>
            {/* <div className="border py-[6px] px-[9px] bg-red-700"><i class="arrow right"></i></div>  <div className="bg-transparent absolute left-0 right-0 top-0 bottom-0 z-10"></div> */}
            </button>
            <button className="button-prev1 relative">
            <Image src={'/icons/arrowRight.png'} alt="LeftArrow" width={30} height={30}/>

            </button>
          </div>
      </div>
       
      </div>

    
        <div className={container}>
          <Carousel
          leftBtnName=".button-prev1"
          rightBtnName=".button-next1"
            Data={upComingEvent}
            renderItem={(item, i) => (
              <SingleShowCard
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
