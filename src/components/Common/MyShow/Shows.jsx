import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Play } from "../../../../public/svg";
import moment from "moment";
import { useRouter } from "next/router";
import { eventLink, singleEventLink } from "@/utils/reusableComponent";
import { isArray } from "@/utils/helper";
import { useDispatch } from "react-redux";
import { setEventData } from "@/store/Event";
import ShowDetails from "./ShowDetails";
// import ImageOrVideo from "";
const ImageOrVideo = dynamic(() => import("./ImageOrVideo"), { ssr: false });
// const ShowDetails = dynamic(() => import("./ShowDetails"));

export default function ShowsCard({
  name,
  venue,
  isLive,
  showImage,
  id,
  showHeader = true,
  eventDate,
  item,
  onNext,
  isPlayIcon = true,
  showVideo = true,
  onDemand=false
  
}) {
  const backgroundImage = `https://res.cloudinary.com/dammymoses/image/upload/v1710175667/LiveParte/a7_zeemus.png`;
  const router = useRouter();
  const dispatch = useDispatch();

  const [isPlaying, setIsPlaying] = useState(false);
  const [posterImage, setPosterImage] = useState();
  useEffect(() => {
    setPosterImage(showImage || backgroundImage);
  }, [showImage, backgroundImage]);

  const videoRef = useRef(null);
  const noVideoRef = useRef(null);
  const backUrl =
    id == 1
      ? `bg-[url('https://res.cloudinary.com/dammymoses/image/upload/v1710175667/LiveParte/a7_zeemus.png')]`
      : `bg-[url('/webp/show2.png')]`;

  const handleMouseEnter = () => {
    setIsPlaying(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0; // Set the current time to 0
      videoRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    setIsPlaying(false);

    if (videoRef.current) {
      videoRef.current.pause();
    }
  };


  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleMouseEnter}
      onTouchEnd={handleMouseLeave}
      className="cursor-pointer"
      onClick={()=>{
        if (onNext) {
          return onNext(item);
        }
        dispatch(setEventData({...item,ticket:isArray(item?.tickets)&&item?.tickets[0]}));
        router.push({
          pathname: `${eventLink}/${item?._id}`,
        });
      }}
    >
      <div
        className={` relative h-[25vh] md:h-[27vh] lg:h-[45vh] xl:h-[27vh] rounded-[8px] lg:rounded-[20px] ${backUrl} bg-cover bg-center bg-gradient-to-b from-black to-transparent  overflow-hidden group cursor-pointer duration-300 ease-in-out group-hover:opacity-100 relative mb-[16px]`}
      >
        <div>
          <ImageOrVideo
            image={showImage || backgroundImage}
            isPlaying={showVideo ? isPlaying : false}
            videoRef={showVideo ? videoRef : noVideoRef}
            item={item}
          />
          <div className="flex-1 absolute left-0 top-0 z-50">
            {showHeader && (
              <span className="flex-1">
                {isLive||onDemand ? (
                  <div className="mt-[8px] lg:mt-[12px] ml-[8px] lg:ml-[14px] rounded-[9px] flex gap-[8px] items-center px-[5px] lg:px-[10px] py-[6px] bg-[#06080933] backdrop-blur-[60px] w-fit ">
                    <div className="h-[8px] w-[8px] rounded-full bg-[#FA4354]"></div>
                    <div className="text-[11px] lg:text-[13px]  text-white  " style={{letterSpacing:'0.5px'}}>
                      {onDemand?'On Demand':'Happening Now'}
                    </div>
                  </div>
                ) : (
                  <div className="bg-[#06080933] w-fit text-white px-[9px] py-[6px] mt-[8px] lg:mt-[12px] ml-[8px] lg:ml-[14px] rounded-[9px] text-[11px] lg:text-[13px] xl:text-[15px]">
                    {eventDate === "Event Date"
                      ? "  March 24  "
                      : moment(eventDate).format("MMMM DD")}
                  </div>
                )}
              </span>
            )}
          </div>
          <div
            className="flex items-center justify-center absolute inset-0 z-50"
            // onMouseLeave={handleMouseLeave}
          >
            {isPlayIcon && (
              <div className=" hidden group-hover:block transition-all group-hover:duration-300 group-hover:ease-in-out">
                <Play />
              </div>
            )}
          </div>
        </div>
      </div>
      <ShowDetails
        eventDate={eventDate}
        name={name}
        onNext={onNext}
        venue={venue}
        showHeader={showHeader}
        isLive={isLive}
        item={item}
        id={id}
      />
    </div>
  );
}
