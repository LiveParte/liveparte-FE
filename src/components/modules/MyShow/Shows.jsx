import Carousel from "@/components/Common/Carousel";
import React from "react";
import { dummyShowDataII } from "../Event/Data";
import ButtonComp from "@/components/Ui/button";
import { useRouter } from "next/router";
import ShowsCard from "@/components/Common/MyShow/Shows";
import { ErrorNotification, eventLink, liveStreamLink, onDemandLink } from "@/utils/reusableComponent";
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
    // alert(item?.eventStarted)
    if(item?.eventStarted){
      return router.push(`${liveStreamLink}/${item?._id}`)
    }
    else{
      return ErrorNotification({ message: 'Event not live yet'});
      // return router.push(`${liveStreamLink}/${item?._id}`)

    }
    // console.log(item,'setLiveStreamEventData')
    // 
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
               key={index}
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
             
            ))}
          </div>
        )}

        {/* No SHow */}
        {!isLoading&&isLength === 0 && (
          <div className="pb-[100px] lg:pb-[247px] h-[60vh] flex flex-col justify-center items-center">
            <div className="text-[16px] md:text-[24px] text-center md:text-left font600 text-[#FFFFFF] mb-[36px]">
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
