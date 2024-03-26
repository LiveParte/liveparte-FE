import React from "react";

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
      className={`px-[20px] md:px-[40px] lg:px-[120px] mb-[40px] xl:mb-[63px] ${containerStyle}`}
    >
      <main>
        <div className="font-1 text-[35px] font-bold text-[#FFFFFF] mb-[35px]">
          {title}
        </div>
        <div className="flex items-center  justify-start md:gap-[10px] lg:gap-[24px] text-white  overflow-x-scroll md:hidden  ">
          {Data?.map((item, i) => (
            <div
              key={i}
              onClick={() => setIsActive && setIsActive(item?.name)}
              className={`${
                isActive === item?.name
                  ? "border-[1px] border-[#262C32] rounded-[999px] px-[18px] lg:px-[32px] py-[11px] bg-[#BAD6F70F]"
                  : "px-[15px] lg:px-[32px]"
              } text-[18px] font500 cursor-pointer px-[15px] py-[11px] text-nowrap `}
            >
              {item?.name}
            </div>
          ))}
        </div>
        <div className=" items-center  justify-start md:gap-[10px] lg:gap-[24px] text-white  hidden md:flex ">
          {Data?.map((item, i) => (
            <div
              key={i}
              onClick={() => setIsActive && setIsActive(item?.name)}
              className={`${
                isActive === item?.name
                  ? "border-[1px] border-[#262C32] rounded-[999px] px-[18px] lg:px-[32px] py-[11px] bg-[#BAD6F70F]"
                  : "px-[15px] lg:px-[32px]"
              } text-[18px] font500 cursor-pointer px-[15px] py-[11px] text-nowrap `}
            >
              {item?.name}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
