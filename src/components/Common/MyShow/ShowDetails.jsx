import { useObject } from "@/Context/ObjectProvider";
import { formatMoney } from "@/utils/formatMoney";
import moment from "moment";
import { useRouter } from "next/router";
import React from "react";
import { BsDot } from "react-icons/bs";

export default function ShowDetails({ onNext,item, id }) {
  const { setMyObject } = useObject();
  const router = useRouter();
  console.log(item, "item");

  return (
    <div className=" z-50 relative">
      <div className=" flex flex-col  relative">
        <div
          onClick={() => {
            if (onNext) {
              return onNext(item);
            }

            setMyObject(item);
            router.push({
              pathname: `event/${id}`,
            });
          }}
        ></div>

        <div className="text-start  px-1 relative text-white">
          <div className="font-1 text-[24px] md:text-[24px] tallI:text-[60px] font-medium text-white mb-[4px]  md:mb-[8px] tall:leading-[32px] leading-[38px] md:leading-[28px] line-clamp-2   uppercase">
            {item?.name}
          </div>
          <div className="text-[#B4BECB] text-[14px] md:text-[15px] mb-[4px] mb:mb-[8px] font-medium font500 whitespace-nowrap overflow-hidden text-ellipsis  flex items-center">
            {moment(item?.event_date).format("MMM DD")}
            <BsDot size={20} /> 
            {moment(item?.event_date).format('h:mm a')}
          </div>
          <div className="text-[#B4BECB] text-[14px] md:text-[15px] mb-[10px] md:mb-[24px]  font-medium font500 whitespace-nowrap overflow-hidden text-ellipsis ">
            {item?.address}
          </div>
          <div>₦ {formatMoney(10000, false)}</div>
        </div>
      </div>
    </div>
  );
}
