// import Carousel from "@/components/Common/Carousel";
import ShowsCard from "@/components/Common/MyShow/Shows";
import { MainContainer } from "@/utils/styleReuse";
import { ArrowLeft, ArrowRight } from "../../../../../public/svg";
import dynamic from "next/dynamic";
// import withLazyLoad from "@/components/Common/LazyLoading/lazyLoading";


import Image from "next/image";
import withLazyLoad from "@/components/Common/LazyLoading/lazyLoading";
// import withLazyLoad from "@/components/Common/LazyLoading/lazyLoading";
const Carousel = dynamic(() => import("@/components/Common/Carousel"), {
  ssr: false,
});
const SingleShowCard = withLazyLoad(ShowsCard);



export default function HappeningNow({ events = [],title }) {
  
  const container = "pl-[20px] pr-[20px] lg:px-[60px]";
  return (
    <div className={` py-[30px] pb-[42px] lg:pb-[77px] relative`}>
    {title&&  <div
        className={`flex justify-between items-center ${MainContainer}  mb-[40px]`}
      >
        <div className={`text-[20px] font500 text-white `}>{title||`Happening Now`}</div>
        <div className="flex items-center gap-[16px]">
          <div className="hidden md:flex items-center gap-[16px] ">
            <button className="button-next relative">
              <Image src={'/icons/arrowLeft.png'} alt="rightArrow" width={30} height={30}/>
            {/* <div className="border py-[6px] px-[9px] bg-red-700"><i class="arrow right"></i></div>  <div className="bg-transparent absolute left-0 right-0 top-0 bottom-0 z-10"></div> */}
            </button>
            <button className="button-prev relative">
            <Image src={'/icons/arrowRight.png'} alt="LeftArrow" width={30} height={30}/>

            </button>
          </div>
        </div>
      </div>}

      <div className={container}>
        <Carousel
          Data={events}
          leftBtnName=".button-prev"
          rightBtnName=".button-next"
          renderItem={(item) => (
            <SingleShowCard
              id={item?._id}
              name={item?.name}
              venue={item?.address}
              showImage={item?.thumbnail_url?.toString()}
              isLive={true}
              eventDate={item?.event_date}
              item={item}
              showVideo={false}
            />
          )}
        />
      </div>
    </div>
  );
}
