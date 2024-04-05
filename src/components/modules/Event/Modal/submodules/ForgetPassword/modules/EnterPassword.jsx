import React from "react";
import { FloatingLabelInput } from "@/components/Ui/TextInput";
import { useRegisterApiMutation } from "@/store/User/userApi";
import { useForm, Controller } from "react-hook-form";
import {
  ForgetPasswordForm,
  SecurityFormLabel,
  SignUpForm,
} from "@/components/modules/Event/Data";
import ButtonComp from "@/components/Ui/button";
export default function EnterPassword({onNext,control,handleSubmit,isLoading}) {
 
  return (
    <div className="text-white px-[20px]">
      <div className="text-center mb-[48px]">
        <div className=" text-[18px] font-medium mb-[8px]">
        Set New Password
        </div>
        <div className="text-[13px] text-[#63768D]">
        Set your new password and make sure it’s secured
        </div>
      </div>

      <form className="flex flex-col gap-[16px]">
        {SecurityFormLabel()?.map((item, index) => (
          <Controller
          key={index}
            control={control}
            name={item?.name}
            rules={{
              required: `${item?.label} is required`,
              pattern: item?.pattern,
            }}
            render={({ field: { onChange, value }, formState: { errors } }) => (
              <FloatingLabelInput
                key={index}
                label={item?.label}
                type={item?.type}
                name={item?.name}
                value={value}
                onChange={onChange}
                error={errors[item?.name]?.message}
                errors={errors}
              />
            )}
          />
        ))}

        <div className="mt-[32px]">
          <ButtonComp
            btnText={"Set new password"}
            className={`w-full text-[13px] font500 bg-[#fff] !text-[#060809] mb-[30px]`}
            onClick={handleSubmit(onNext)}
            isLoading={isLoading}
            isDisabled={isLoading}
          />
        </div>
      </form>
    </div>
  );
}
