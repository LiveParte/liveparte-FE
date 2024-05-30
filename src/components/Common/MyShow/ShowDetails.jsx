import { formatMoney } from "@/utils/formatMoney";
import { isArray } from "@/utils/helper";
import moment from "moment";
import { useRouter } from "next/router";
import React from "react";
import { BsDot } from "react-icons/bs";

export default function ShowDetails({ onNext, item, id }) {
  const router = useRouter();
  const ItemIsArray=Array.isArray(item?.tickets)?item?.tickets[0]:[]

  return (
    <div className=" z-30 relative">
      <div className=" flex flex-col  relative">
        <div
          onClick={() => {
            if (onNext) {
              return onNext(item);
            }

           
            router.push({
              pathname: `event/${id}`,
            });
          }}
        ></div>

        <div className="text-start  px-1 relative text-white">
          <div className="font-1 text-[18px] md:text-[24px]  font-medium text-white mb-[4px]  md:mb-[8px]   line-clamp-1 lg:line-clamp-1   uppercase">
            {item?.name}
          </div>
          <div className="text-[#B4BECB] text-[14px] md:text-[15px] mb-[4px] mb:mb-[8px] font-medium font500 whitespace-nowrap overflow-hidden text-ellipsis  flex items-center font400">
            {moment(item?.event_date).format("MMM DD")}
            <BsDot size={20} />
            {moment(item?.event_date).format("h:mm a")}
          </div>
          <div className="text-[#B4BECB] text-[14px] md:text-[15px] mb-[10px] md:mb-[24px]  font-medium font500 whitespace-nowrap overflow-hidden text-ellipsis  font400">
            {item?.address}
          </div>
        { ( isArray(item?.tickets) &&ItemIsArray?.price )  ?<div className="font500 font-medium">
            ₦ {formatMoney(
              isArray(item?.tickets) && ItemIsArray?.price,
              false
            )}
            
          </div>:ItemIsArray?.price===0?'Free':null
}
        </div>
      </div>
    </div>
  );
}
