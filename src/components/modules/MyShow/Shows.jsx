import Carousel from "@/components/Common/Carousel";
import React from "react";
import { dummyShowDataII } from "../Event/Data";
import ButtonComp from "@/components/Ui/button";
import { useRouter } from "next/router";
import ShowsCard from "@/components/Common/MyShow/Shows";
import { eventLink, liveStreamLink, onDemandLink } from "@/utils/reusableComponent";
import UserShowsCard from "@/components/Common/MyShowUser/Shows";
import { useDispatch } from "react-redux";
import { setLiveStreamEventData } from "@/store/Event";
import { MainContainer } from "@/utils/styleReuse";
// import UserShowsCard from "@/components/UserShow";

export default function Shows({
  Data=[],
  isLoading,
  isActive,
  OnDemandData=[]
}) {
  const router = useRouter();
  const dispatch =useDispatch()
  const container =
    "px-[20px] md:px-[40px] lg:px-[120px] ";
  const isLength = Data?.length;

  const handleOnClick = (item) =>{
    dispatch(setLiveStreamEventData(item))
    router.push(`${liveStreamLink}/${item?._id}`)
  }
  return (
    <>
    { isActive=="Upcoming"&&
    <div className="pb-[50px] lg:pb-[10px]">
      <div className={MainContainer}>
        {isLength > 0 && (
          <div className=" grid-cols-2  md:grid-cols-2  xl:grid-cols-4 gap-[20px] lg:gap-x-[40px] gap-y-[40px] lg:gap-y-[104px] pb-[100px] lg:pb-[247px]  grid">
            {!isLoading&&Data?.map((item, index) => (
               <ShowsCard
               id={item?._id}
               name={item?.name}
               venue={item?.address}
               showImage={item?.thumbnail_url?.toString()}
               isLive={false}
               eventDate={item?.event_date}
               item={item}
               showHeader={false}
               showVideo={false}
               onNext={(item)=>handleOnClick(item)}
             />
              // <UserShowsCard
              //   key={index}
              //   id={item?.id}
              //   name={item?.name}
              //   venue={item?.venue||item?.address}
              //   showImage={item?.thumbnail_url.toString()}
              //   isLive={false}
              //   showVideo={false}
              //   item={item}
              //   onNext={(item)=>handleOnClick(item)}  
              // />
            ))}
          </div>
        )}

        {/* No SHow */}
        {!isLoading&&isLength === 0 && (
          <div className="pb-[100px] lg:pb-[247px] h-[60vh] flex flex-col justify-center items-center">
            <div className="text-[24px] text-center md:text-left font600 text-[#FFFFFF] mb-[36px]">
              You don’t have any event ticket purchased
            </div>
            <ButtonComp
              btnText={`Browse Events`}
              className={`text-[13px] text-[#000000] font500 h-[44px] rounded-[8px] px-[16px] py-[12px]`}
              onClick={()=>{
                router.push(eventLink)
              }}
            />
          </div>
        )}
      </div>
    </div>}

   
    </>
   
  );
}
