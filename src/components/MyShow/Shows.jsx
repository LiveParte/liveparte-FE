import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Play } from "../../../../public/svg";
import { useRouter } from "next/router";

const ImageOrVideo = dynamic(() => import("./ImageOrVideo"), { ssr: false });
const ShowDetails = dynamic(() => import("./ShowDetails"), { ssr: false });

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
  isPlayIcon=true,
  showVideo = true,
}) {
  const backgroundImage = `https://res.cloudinary.com/dammymoses/image/upload/v1710175667/LiveParte/a7_zeemus.png`;
  const router = useRouter();
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
      className={` relative h-[35vh] md:h-[40vh] lg:h-[55vh] rounded-[8px] lg:rounded-[20px] ${backUrl} bg-cover bg-center bg-gradient-to-b from-black to-transparent  overflow-hidden group cursor-pointer duration-300 ease-in-out group-hover:opacity-100 `}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleMouseEnter}
      onTouchEnd={handleMouseLeave}
    >
      <ImageOrVideo
        image={showImage || backgroundImage}
        isPlaying={showVideo?isPlaying:false}
        videoRef={showVideo ?videoRef:noVideoRef}
      />

      <div
        className="flex items-center justify-center absolute inset-0 z-50"
        // onMouseLeave={handleMouseLeave}
      >
      {isPlayIcon &&  <div className=" hidden group-hover:block transition-all group-hover:duration-300 group-hover:ease-in-out">
          <Play />
        </div>
}
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
