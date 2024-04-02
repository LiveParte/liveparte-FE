import React from "react";
import { FloatingLabelInput } from "@/components/Ui/TextInput";
import { useRegisterApiMutation } from "@/store/User/userApi";
import { useForm, Controller } from "react-hook-form";
import {
  ForgetPasswordForm,
  SignUpForm,
} from "@/components/modules/Event/Data";
import ButtonComp from "@/components/Ui/button";
export default function EnterEmail({onNext}) {
  const { control, handleSubmit, getValues } = useForm({
    defaultValues: {
      email: "",
      username: "",
      password: "",
      phoneNumber: "",
      fullName: "",
    },
  });
  return (
    <div className="text-white px-[20px]">
      <div className="text-center mb-[48px]">
        <div className=" text-[18px] font-medium mb-[8px]">
          Recover Password
        </div>
        <div className="text-[13px] text-[#63768D]">
          A link will be sent to your email address to recover your password
        </div>
      </div>

      <form>
        {ForgetPasswordForm()?.map((item, index) => (
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
            btnText={"Recover Password"}
            className={`w-full text-[13px] font500 !bg-[#fff] !text-[#060809] mb-[30px]`}
            onClick={(e)=>{
                e.preventDefault();
                onNext();
                // handleSubmit(setSelectPage)
            }}
          />
        </div>
      </form>
    </div>
  );
}
