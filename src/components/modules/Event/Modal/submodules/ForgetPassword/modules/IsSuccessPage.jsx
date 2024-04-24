import React from "react";
import { useForm, } from "react-hook-form";
import ButtonComp from "@/components/Ui/button";
import Image from "next/image";
export default function IsSuccessPage({onNext}) {
 
  return (
    <div className="text-white px-[5vw]">
        {/* <EmailSentIcon/> */}
        <Image
        src={`/svg/success.svg`}
        // classNameMain={'flex justify-center mb-[32px] max-h-[87] max-w-[97'}
         width={97}
        height={87}
        alt="success"
      
        />
      <div className="text-center mb-[38px]">
        <div className=" text-[18px] font-medium mb-[8px]">
        Password reset successful
        </div>
        <div className="text-[13px] text-[#63768D]">
        You’re all set! Log in to Liveparte with your new password
        </div>
      </div>

      <div>
      

        <div className="mt-[32px] px-[2vw]">
          <ButtonComp
            btnText={"Log In with your new password"}
            className={`w-full text-[13px] font500 !bg-[#fff] !text-[#060809] mb-[30px]`}
            onClick={onNext}
          />
        </div>
      </div>
    </div>
  );
}
