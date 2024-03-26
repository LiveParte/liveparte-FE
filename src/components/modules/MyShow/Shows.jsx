import Carousel from "@/components/Common/Carousel";
import ShowsCard from "@/components/Common/Shows";
import React from "react";
import { dummyShowDataII } from "../Event/Data";
import ButtonComp from "@/components/Ui/button";
import { useRouter } from "next/router";

export default function Shows({
  Data=[]
}) {
  const router = useRouter();
  const container =
    "px-[20px] md:px-[40px] lg:px-[120px] ";
  const isLength = Data?.length;
  return (
    <div className="pb-[50px] lg:pb-[10px]">
      <div className={container}>
        {isLength > 0 && (
          <div className=" grid-cols-2  md:grid-cols-2  xl:grid-cols-4 gap-[20px] lg:gap-x-[40px] gap-y-[40px] lg:gap-y-[104px] pb-[100px] lg:pb-[247px]  grid">
            {Data?.map((item, index) => (
              <ShowsCard
                key={index}
                id={item?.id}
                name={item?.name}
                venue={item?.venue}
                showImage={item?.thumbnail_url.toString()}
                isLive={false}
                item={item}
                onNext={(item)=>{
                  router.push('/livestream')
                  console.log(item,'item')
                }}  
              />
            ))}
          </div>
        )}

        {/* No SHow */}
        {isLength === 0 && (
          <div className="pb-[100px] lg:pb-[247px] h-[60vh] flex flex-col justify-center items-center">
            <div className="text-[24px] font600 text-[#FFFFFF] mb-[36px]">
              You don’t have any event ticket purchased
            </div>
            <ButtonComp
              btnText={`Browse Events`}
              className={`text-[13px] text-[#000000] font500 h-[44px] rounded-[8px] px-[16px] py-[12px]`}
              onClick={()=>{
                router.push('/event')
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
