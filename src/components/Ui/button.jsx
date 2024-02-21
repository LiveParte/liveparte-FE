import React from "react";

export default function ButtonComp({ className,btnText,onClick }) {
  return <button onClick={onClick} className={` bg-[#FFFFFF] h-[45px] px-[16px] rounded-[8px] ${className} hover:scale-100 transition-transform duration-300 ease-in-out"`}>{btnText}</button>;
}
