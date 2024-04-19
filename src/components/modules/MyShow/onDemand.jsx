import React from "react";
import ButtonComp from "@/components/Ui/button";
import { useRouter } from "next/router";
import {  liveStreamLink, onDemandLink } from "@/utils/reusableComponent";
import UserShowsCard from "@/components/Common/MyShowUser/Shows";
import { useDispatch } from "react-redux";
import { setLiveStreamEventData } from "@/store/Event";
import { MainContainer } from "@/utils/styleReuse";
// import UserShowsCard from "@/components/UserShow";

export default function OnDemand({
  Data=[],
  isLoading,
  isActive,
  OnDemandData=[]
}) {
  const router = useRouter();
  const dispatch =useDispatch()
  const container =MainContainer;
  const isLength = Data?.length;

  const handleOnClick = (item) =>{
    dispatch(setLiveStreamEventData(item))
    router.push(`${liveStreamLink}/${item?._id}`)
  }
  return (
    <>
    {
    <div className="pb-[50px] lg:pb-[10px]">
      <div className={MainContainer}>
        {isLength > 0 && (
          <div className=" grid-cols-2  md:grid-cols-2  xl:grid-cols-4 gap-[20px] lg:gap-x-[40px] gap-y-[40px] lg:gap-y-[104px] pb-[100px] lg:pb-[247px]  grid">
            {!isLoading&&Data?.map((item, index) => (
              <UserShowsCard
                key={index}
                id={item?.id}
                name={item?.name}
                venue={item?.venue||item?.address}
                showImage={item?.thumbnail_url.toString()}
                isLive={false}
                showVideo={false}
                item={item}
                onNext={(item)=>handleOnClick(item)}  
              />
            ))}
          </div>
        )}

        {/* No SHow */}
        {!isLoading&&isLength === 0 && (
          <div className="pb-[100px] lg:pb-[247px] h-[60vh] flex flex-col justify-center items-center">
            <div className="text-[24px] text-center md:text-left font600 text-[#FFFFFF] mb-[36px]">
            You don’t have any On Demand Show
            </div>
            <ButtonComp
              btnText={`Browse On Demand`}
              className={`text-[13px] text-[#000000] font500 h-[44px] rounded-[8px] px-[16px] py-[12px]`}
              onClick={()=>{
                router.push(onDemandLink)
              }}
            />
          </div>
        )}
      </div>
    </div>}

    
    </>
   
  );
}
