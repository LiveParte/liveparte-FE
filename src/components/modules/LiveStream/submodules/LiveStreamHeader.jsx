import React from "react";
import { BackArrowIcon, CloseIcon } from "../../../../../public/svg";

export default function LiveStreamHeader({ title, onBack, onClose }) {
  return (
    <div>
      <div className="flex items-center justify-between w-full mb-[45px]">
        <div onClick={onBack && onBack}>{onBack && <BackArrowIcon />}</div>
        <div className="text-[13px] font-1 font-bold">{title}</div>
        <div  className="cursor-pointer"  onClick={onClose}>{onClose && <CloseIcon />}</div>
      </div>
    </div>
  );
}
