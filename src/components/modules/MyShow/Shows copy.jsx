import Carousel from "@/components/Common/Carousel";
import ShowsCard from "@/components/Common/MyShow/Shows";
import React from "react";
// import { dummyShowDataII } from "../Event/Data";
import ButtonComp from "@/components/Ui/button";

export default function Shows({ Data = [] }) {
  const container =
    "pl-[20px] pr-[20px] md:pl-[20px] md:pr-[20px] lg:px-[60px]";
  const isLength = Data?.length;
  return (
    <div className="pb-[150px] lg:pb-[300px]">
      <div className={container}>
        <div className="md:hidden">
          {isLength > 0 && (
            <Carousel
              Data={Data}
              renderItem={(item, i) => (
                <ShowsCard
                  // key={i}
                  id={item?.id}
                  name={item?.name}
                  venue={item?.venue}
                  showImage={item?.showImage.toString()}
                  isLive={false}
                />
              )}
            />
          )}
        </div>

        {isLength > 0 && (
          <div className="grid grid-cols-1  md:grid-cols-2  xl:grid-cols-4 gap-x-[40px] gap-y-[104px] pb-[100px] lg:pb-[247px] hidden md:block">
            {Data?.map((item, index) => (
              <ShowsCard
                key={index}
                id={item?.id}
                name={item?.name}
                venue={item?.venue}
                showImage={item?.showImage.toString()}
                isLive={false}
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
            />
          </div>
        )}
      </div>
    </div>
  );
}
