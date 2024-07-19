import Carousel from "@/components/Common/Carousel";
import React, { useState } from "react";
import { dummyShowDataII } from "../Event/Data";
import ButtonComp from "@/components/Ui/button";
import { useRouter } from "next/router";
import ShowsCard from "@/components/Common/MyShow/Shows";
import {
  ErrorNotification,
  eventLink,
  liveStreamLink,
  onDemandLink,
  replaceSpaceWithDashFunc,
} from "@/utils/reusableComponent";
import UserShowsCard from "@/components/Common/MyShowUser/Shows";
import { useDispatch } from "react-redux";
import { setLiveStreamEventData } from "@/store/Event";
import { MainContainer } from "@/utils/styleReuse";
import MyModal from "@/components/Ui/Modal";
import CountDown from "@/components/Common/Coundown";
import { useLazyGetEventDetailViaIdQuery } from "@/store/Event/eventApi";
import moment from "moment";
// import UserShowsCard from "@/components/UserShow";

export default function Shows({
  Data = [],
  isLoading,
  isActive,
  OnDemandData = [],
}) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [eventDate, setEventDate] = useState();
  const [getEventById,{isLoading:eventByIdLoader}]= useLazyGetEventDetailViaIdQuery()

  const container = "px-[20px] md:px-[40px] lg:px-[120px] ";
  const isLength = Data?.length;

  const handleOnClick = async(item) => {
    dispatch(setLiveStreamEventData(item));
    if (item?.eventStarted) {
      return router.push(
        `${liveStreamLink}/${replaceSpaceWithDashFunc(item?.name)}/${item?._id}`
      );
    } else {
      // console.log(item,'Hellloooo')
      const singleEvent =await getEventById(item?._id);
      // console.log(singleEvent?.data,'singleEventsingleEventsingleEvent')
      if(singleEvent?.data?.event_date){
          setEventDate(singleEvent?.data);
      setIsOpen(true);
      }
      // setEventDate(item?.event_date);
      // setIsOpen(true);
  
    }
   
  };

  // console.log(Data[0]?._id===eventDate?._id,Data,'eventDateeventDate')
  return (
    <>
      {isActive == "Upcoming" && (
        <div className="pb-[50px] lg:pb-[10px]">
          {isOpen && (
            <MyModal
              isOpen={isOpen}
              containerStyle={`!w-[543px]`}
              closeModal={() => setIsOpen(false)}
              bodyComponent={
                <CountDown date={moment(eventDate?.event_date).format('YYYY-MM-DD') } onBack={() => setIsOpen(false)} />
              }
            />
          )}

          <div className={MainContainer}>
            {isLength > 0 && (
              <div className=" grid-cols-2  md:grid-cols-2  xl:grid-cols-4 gap-[20px] lg:gap-x-[40px] gap-y-[40px] lg:gap-y-[104px] pb-[100px] lg:pb-[247px]  grid">
                {!isLoading &&
                  Data?.map((item, index) => (
                    <ShowsCard
                      countdownLoading={(item?._id === eventDate?._id )&&eventByIdLoader}
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
                      onNext={(item) => handleOnClick(item)}
                    />
                  ))}
              </div>
            )}

            {/* No SHow */}
            {!isLoading && isLength === 0 && (
              <div className="pb-[100px] lg:pb-[247px] h-[60vh] flex flex-col justify-center items-center">
                <div className="text-[16px] md:text-[24px] text-center md:text-left font600 text-[#FFFFFF] mb-[36px]">
                  You don’t have any event ticket purchased
                </div>
                <ButtonComp
                  btnText={`Browse Events`}
                  className={`text-[13px] text-[#000000] font500 h-[44px] rounded-[8px] px-[16px] py-[12px]`}
                  onClick={() => {
                    router.push(eventLink);
                  }}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
