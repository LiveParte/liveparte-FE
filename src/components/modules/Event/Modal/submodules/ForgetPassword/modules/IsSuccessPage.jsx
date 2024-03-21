import React from "react";
import { FloatingLabelInput } from "@/components/Ui/TextInput";
import { useRegisterApiMutation } from "@/store/User/userApi";
import { useForm, Controller } from "react-hook-form";
import {
  ForgetPasswordForm,
  SignUpForm,
} from "@/components/modules/Event/Data";
import ButtonComp from "@/components/Ui/button";
import { EmailSentIcon } from "../../../../../../../../public/svg";
import BlurryImage from "@/components/Common/LazyLoader";
export default function IsSuccessPage({onNext}) {
  const { control, handleSubmit, getValues } = useForm({
    defaultValues: {
      email: "test@gmail4.com",
      username: "dammymoses4",
      password: "Password@4",
      phoneNumber: "0814409584848",
      fullName: "Test Name",
    },
  });
  return (
    <div className="text-white px-[5vw]">
        {/* <EmailSentIcon/> */}
        <BlurryImage
        src={`/svg/success.svg`}
        classNameMain={'flex justify-center mb-[32px]'}
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
