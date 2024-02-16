import React, { useEffect, useState } from "react";

export default function Header({
  Data = [],
  title,
  containerStyle,
  isActive,
  setIsActive,
}) {
  // useEffect(() => {
  //   setIsActive(Data[0]?.name);
  // }, [Data]);

  return (
    <div
      className={`px-[20px] lg:px-[120px] mb-[40px] xl:mb-[63px] ${containerStyle}`}
    >
      <main>
        <div className="font-1 text-[35px] font-bold text-[#FFFFFF] mb-[35px]">
          {title}
        </div>
        <div className="flex items-center gap-[10px] lg:gap-[24px] text-white ">
          {Data?.map((item, i) => (
            <div
              onClick={() => setIsActive&& setIsActive(item?.name)}
              className={`${
                isActive === item?.name
                  ? "border-[1px] border-[#262C32] rounded-[999px] px-[32px] py-[11px] bg-[#BAD6F70F]"
                  : "px-[32px]"
              } text-[15px] font500 cursor-pointer`}
            >
              {item?.name}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
