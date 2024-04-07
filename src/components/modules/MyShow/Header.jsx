import React from "react";
import { HeaderOnSelect, IsHover } from "@/utils/styleReuse";

const Header = React.memo(
  ({
    Data = [],
    title,
    containerStyle,
    isActive,
    setIsActive,
  }) => {
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
          <div className="flex items-center  justify-start gap-[10px] lg:gap-[24px] text-white   md:hidden  ">
            {Data?.map((item, i) => (
              <div
                key={i}
                onClick={() => setIsActive && setIsActive(item?.name)}
                className={`text-[14px] font500 cursor-pointer px-[15px] md:px-[25px] customScrollVertical  flex justify-center items-center leading-none  text-nowrap lg:px-[32px] h-[36px] ${
                  isActive === item?.name
                    ? ` rounded-[8px]  ${HeaderOnSelect} ]`
                    : ""
                }  ${IsHover}`}
              >
                {item?.name}
              </div>
            ))}
          </div>
          <div className=" items-center  justify-start gap-[10px] lg:gap-[24px] text-white  hidden md:flex ">
            {Data?.map((item, i) => (
              <div
                key={i}
                onClick={() => setIsActive && setIsActive(item?.name)}
                className={`lg:px-[32px] px-[18px] py-[11px] rounded-[8px]  customScrollVertical ${
                  isActive === item?.name
                    ? `${HeaderOnSelect}`
                    : ""
                } text-[18px] font500 cursor-pointer text-nowrap  ${IsHover}`}
              >
                {item?.name}
              </div>
            ))}
          </div>
        </main>
      </div>
    );
  }
);

export default Header;
