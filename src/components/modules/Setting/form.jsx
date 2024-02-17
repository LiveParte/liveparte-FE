import React from "react";
import { LoginForm } from "../EventDetails/Data";
import { FloatingLabelInput } from "@/components/Ui/TextInput";
import ButtonComp from "@/components/Ui/button";
import { SecurityFormLabel, SettingFormLabel } from "../MyShow/Data";
import { NoProfile } from "../../../../public/svg";

export default function SettingForm({ isActive }) {
  return (
    <div className="px-[20px] lg:px-[120px] md:w-[60vw] xl:w-[40vw]">
     {isActive == "Profile" && <div className="mb-[29px] flex items-center gap-[12px] text-white">
        <div className="h-[48px] w-[48px]">
        <NoProfile />
        </div>
        <div className="text-[12px] leading-[20px] ">
          Upload your profile photo, it should be a maximum{" "}
          <br className="hidden md:block" /> size of 5 MB.
          <span className="ml-2 text-[#FA4354] cursor-pointer">
            Change my photo
          </span>
        </div>
      </div>}

      <form
        className="lg:pb-[92px]"
        autoComplete={`false`}
      >
        {isActive == "Profile" && (
          <div className="flex flex-col gap-[20px] ">
            {SettingFormLabel()?.map((item, index) => (
              <FloatingLabelInput
                key={index}
                label={item?.label}
                type={item?.type}
              />
            ))}
            <div className="mt-[40px] lg:mt-[122px]">
              <ButtonComp
                btnText={"Save Changes"}
                className={`w-full text-[13px] font500`}
              />
            </div>
          </div>
        )}
        {isActive == "Security" &&   <div className="flex flex-col gap-[20px] ">
          {SecurityFormLabel()?.map((item, index) => (
            <FloatingLabelInput
              key={index}
              label={item?.label}
              type={item?.type}
            />
          ))}
         <div className="mt-[40px] lg:mt-[122px]">
            <ButtonComp
              btnText={"Save Changes"}
              className={`w-full text-[13px] font500`}
            />
          </div>
        </div>}
      </form>
    </div>
  );
}
