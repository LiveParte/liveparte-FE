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
export default function EmailSent({onNext}) {
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
    <div className="text-white px-[5vw]">
        {/* <EmailSentIcon/> */}
        <BlurryImage
        src={`/svg/mailsent.svg`}
        classNameMain={'flex justify-center mb-[32px]'}
        />
      <div className="text-center mb-[38px]">
        <div className=" text-[18px] font-medium mb-[8px]">
        Mail Sent
        </div>
        <div className="text-[13px] text-[#63768D]">
        We’ve sent you an email, kindly click on the link in the email to recover your password
        </div>
      </div>

      <div>
      

        <div className="mt-[32px] px-[2vw]">
          <ButtonComp
            btnText={"Check your mail app"}
            className={`w-full text-[13px] font500 !bg-[#fff] !text-[#060809] mb-[30px]`}
            onClick={onNext}
          />
        </div>
      </div>
    </div>
  );
}
