import React from "react";
import { Play } from "../../../public/svg";
import moment from "moment";
import { useRouter } from "next/router";
import { useObject } from "@/Context/ObjectProvider";
import Image from "next/image";

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
}) {
  const backgroundImage = `https://res.cloudinary.com/dammymoses/image/upload/v1710175667/LiveParte/a7_zeemus.png`;
  const router = useRouter();
  const { setMyObject } = useObject();

  const backUrl =
    id == 1
      ? `bg-[url('https://res.cloudinary.com/dammymoses/image/upload/v1710175667/LiveParte/a7_zeemus.png')]`
      : `bg-[url('/webp/show2.png')]`;
  console.log(showImage, "showImage");
  // ` relative h-[35vh] md:h-[40vh] lg:h-[55vh] rounded-[8px] lg:rounded-[20px] ${backUrl} bg-cover bg-center bg-gradient-to-b from-black to-transparent  overflow-hidden`
  return (
    <div
      className={` relative h-[35vh] md:h-[40vh] lg:h-[55vh] rounded-[8px] lg:rounded-[20px] ${backUrl} bg-cover bg-center bg-gradient-to-b from-black to-transparent  overflow-hidden`}
      // style={{ backgroundImage: `url(${showImage || backgroundImage})` }}
    >
      <Image
        src={showImage || backgroundImage}
        blurDataURL={showImage || backgroundImage}
        className="absolute left-0 right-0 top-0 bottom-0"
        // width={'100%'}
        // height={'100%'}
        alt="Your Image"
        layout="fill"
        objectFit="cover"
        placeholder="blur"
      />
      <div className="h-full">
        <div className=" flex flex-col h-full relative">
          <div className="flex-1">
            {showHeader && (
              <span className="flex-1">
                {isLive ? (
                  <div className="mt-[8px] lg:mt-[22px] ml-[8px] lg:ml-[16px] rounded-[9px] flex gap-[8px] items-center px-[5px] lg:px-[10px] py-[6px] bg-[#06080933] backdrop-blur-[60px] w-fit ">
                    <div className="h-[8px] w-[8px] rounded-full bg-[#FA4354]"></div>
                    <div className="text-[11px] lg:text-[13px] xl:text-[15px] text-white ">
                      Happening now
                    </div>
                  </div>
                ) : (
                  <div className="bg-[#06080933] w-fit text-white px-[9px] py-[6px] mt-[8px] lg:mt-[22px] ml-[8px] lg:ml-[16px] rounded-[9px] text-[11px] lg:text-[13px] xl:text-[15px]">
                    {eventDate === "Event Date"
                      ? "  March 24  "
                      : moment(eventDate).format("MMMM DD")}
                  </div>
                )}
              </span>
            )}
          </div>
          <div
            className="flex-[1] flex justify-center items-center absolute left-0 right-0 -top-[50px] md:-top-[70px] lg:-top-[100px] bottom-0  bg-gradient-to-t from-[#00000079]"
            onClick={() => {
              if (onNext) {
                // console.log(item)
                return onNext(item);
              }

              setMyObject(item);
              router.push({
                pathname: `event/${id}`,
              });
              //id
            }}
          >
            <Play />
          </div>

          <div className="text-center  px-1 relative">
            <div className="font-1 text-[35px] md:text-[80px] tallI:text-[60px] font-medium text-white mb-[4px]  md:mb-[27px] tall:leading-[32px] leading-[38px] md:leading-[68px] line-clamp-2  ">
              {name}
            </div>
            <div className="text-[#B4BECB] text-[10px] md:text-[13px] mb-[16px] mb:mb-[25px] font-medium font500 whitespace-nowrap overflow-hidden text-ellipsis px-[10px]">
              {venue}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
