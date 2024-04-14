// Import Swiper React components
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import withLazyLoad from "@/components/Common/LazyLoading/lazyLoading";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Navigation, Pagination,A11y } from "swiper/modules";
import { ArrowLeft } from "../../../public/svg";

// import RenderItem =withLazyLoad()
export default function Carousel({
  renderItem,
  Data = [],
  rightBtnName = "",
  leftBtnName = "",
}) {
  const swiper =useSwiper();
  return (
    <>
      <Swiper
        modules={[Navigation,Pagination,A11y]}
        navigation={{
          prevEl: rightBtnName,
          nextEl: leftBtnName,
        }}
        slidesPerView={2}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          // 1024: {
          //   slidesPerView: 3,
          //   spaceBetween: 20,
          // },
          1124: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1224: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
        }}
        className="mySwiper text-white"
      >
        {Data?.map((item, index) => (
          <SwiperSlide key={index}>{renderItem(item)}</SwiperSlide>
        ))}

        {/* <div>
        <div className="swiper-btn" onClick={()=>swiper.slideNext()}><ArrowLeft/></div>

        </div> */}
      </Swiper>
    </>
  );
}
