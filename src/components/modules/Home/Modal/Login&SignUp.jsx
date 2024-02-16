import React, { useState } from "react";
import { CloseModal } from "../../../../../public/svg";
import ButtonComp from "@/components/Ui/button";
import { FloatingLabelInput } from "@/components/Ui/TextInput";
import { LoginForm ,SignUpForm} from "../Data";

export default function LoginSignUp({
  closeModal
}) {
  const [toggle, setToggle] = useState("Login");
  const isActive = `text-white border-[1px] border-[#48515d  rounded-[999px] bg-[#2e3239] px-[30px] lg:px-[50px] cursor-pointer `;
  const notActive = `text-[#495969] px-[30px] lg:px-[50px] cursor-pointer `;
  return (
    <div className="bg-[#1B1C20] pb-[48px] px-[16px] pt-[16px] lg:pt-[18px]">
      <div className="flex justify-end pb-[10px]" onClick={closeModal}>
        <CloseModal  />
      </div>

      <div className="flex justify-center items-center mb-[72px]">
        <div className="flex justify-center items-center rounded-[999px] bg-[#25272d] text-[14px] font500 h-[40px] ">
          <div
            onClick={() => setToggle("Login")}
            className={` h-[36px] flex justify-center items-center   ${
              toggle === "Login" ? isActive : notActive
            }`}
          >
            Log In
          </div>
          <div
            onClick={() => setToggle("SignUp")}
            className={` h-[36px] flex justify-center items-center ${
              toggle !== "Login" ? isActive : notActive
            }`}
          >
            Sign Up
          </div>
        </div>
      </div>

      {toggle==="Login" &&<form className="px-[15px] lg:px-[50px] flex flex-col gap-[20px] lg:pb-[92px]" autoComplete="off">
        {LoginForm()?.map((item, index) => (
          <FloatingLabelInput key={index} label={item?.label} type={item?.type} />
        ))}
        <div className="mt-[122px] lg:mt-[24px]">
          <ButtonComp
            btnText={"Log In and Continue"}
            className={`w-full text-[13px] font500`}
          />
        </div>
      </form>}

      {toggle!=="Login" &&<form className="px-[15px] lg:px-[50px] flex flex-col gap-[20px] lg:pb-[92px]" autoComplete="off">
        {SignUpForm()?.map((item, index) => (
          <FloatingLabelInput key={index} label={item?.label} type={item?.type} />
        ))}
        <div className="mt-[122px] lg:mt-[24px]">
          <ButtonComp
            btnText={ "Sign Up and Continue"}
            className={`w-full text-[13px] font500`}
          />
        </div>
      </form>}
    </div>
  );
}
