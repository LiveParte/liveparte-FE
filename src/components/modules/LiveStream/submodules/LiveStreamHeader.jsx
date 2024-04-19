import React from "react";
import { BackArrowIcon, CloseII, CloseIcon } from "../../../../../public/svg";

export default function LiveStreamHeader({ title, onBack, onClose,path=1 }) {
  return (
    <div>
      <div className="flex items-center justify-between w-full mb-[45px]">
        <div className="md:invisible" onClick={onBack && onBack}><div>{onBack && <BackArrowIcon />}</div></div>
        <div className="text-[13px] font-1 font-bold text-white">{title}</div>
        <div  className="cursor-pointer"  onClick={onClose}>{onClose && path==1? <CloseIcon />: <CloseII/>}</div>
      </div>
    </div>
  );
}
