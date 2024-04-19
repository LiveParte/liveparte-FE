import Image from "next/image";
import React from "react";

export default function ImageOrVideo({ videoRef, image, isPlaying, item }) {
  return (
    <>
      <div className="flex-[1] flex justify-center items-center absolute left-0 right-0 top-[0px] bottom-0  bg-gradient-to-t from-[#00000079] z-50"></div>
      {true ? (
        <Image
          src={item?.thumbnail_url}
          blurDataURL={item?.thumbnail_url}
          className={`  ${
            !isPlaying ? "z-30" : "z-0"
          }`}
          // width={'100%'}
          // height={'100%'}
          alt="Your Image"
          layout= "fill"
          objectFit="cover"
          placeholder="blur"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
          loading="lazy"
          width={0}
          height={0}
        />
      ) : (
        <video
          // ref={videoRef}
          autoPlay
          loop
          muted
          className={`absolute left-0 right-0 top-0 bottom-0 object-cover h-full w-full z-20 ${
            isPlaying ? "z-20" : "z-10"
          }`}
          poster={item?.thumbnail_url}
          // onMouseEnter={handleMouseEnter}
          // onMouseLeave={handleMouseLeave}
        >
          <source src={item?.promotional_url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
    </>
  );
}
