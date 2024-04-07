import React from "react";

export default function ButtonComp({
  className,
  btnText,
  onClick,
  isLoading,
  isDisabled = false,
}) {
  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={` bg-[#FFFFFF] h-[45px] px-[16px] !leading-[0px]  rounded-[8px] outline-none  ${className} transition-transform duration-300 ease-in-out flex justify-center items-center gap-1 ${
        (isLoading) && "!bg-[#343F4B] !text-[#63768D]"
      }  `}
    >
      {isLoading && (
        <div
          className="inline-block h-4 w-4 animate-spin rounded-full border-3 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        >
          <span class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      )}
      {btnText}
    </button>
  );
}
