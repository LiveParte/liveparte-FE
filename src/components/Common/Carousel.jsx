// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Navigation, Pagination } from "swiper/modules";

export default function Carousel({
  renderItem,
  Data = [],
  rightBtnName = "",
  leftBtnName = "",
}) {
  return (
    <>
      <Swiper
        modules={[Navigation]}
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
      </Swiper>
    </>
  );
}
