// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';


// import required modules
import { Pagination } from 'swiper/modules';

export default function Carousel({
    renderItem,
    Data=[]
}) {
  return (
    <>
      <Swiper
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
        modules={[]}
        className="mySwiper text-white"
      >
        {Data?.map((item, index) =>
          <SwiperSlide>{renderItem(item)}</SwiperSlide>
        )}
      
        
      </Swiper>
    </>
  );
}
