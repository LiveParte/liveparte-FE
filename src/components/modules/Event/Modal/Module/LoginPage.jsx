import React, { useEffect, useState } from "react";
import { LoginForm } from "../../Data";
import ButtonComp from "@/components/Ui/button";
import { FloatingLabelInput } from "@/components/Ui/TextInput";
import { useGoogleLogin } from "@react-oauth/google";
import { GoogleIcon } from "../../../../../../public/svg";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { accessTokenStorageName, encryptText, storage } from "@/utils/helper";
import { userApi } from "@/store/User/userApi";
import { setCoins, setLocation, setUserData } from "@/store/User";
import {
  ErrorNotification,
  SuccessNotification,
  eventLink,
  randomBetweenOneAndTen,
  singleEventLink,
} from "@/utils/reusableComponent";
import { eventApi, useLoginApiMutation } from "@/store/Event/eventApi";
import { transactionApi } from "@/store/Transaction/transactionApi";
import useGoogleAuth from "@/utils/useGoogleAuth";

export default function LoginPage({
  Controller,
  control,
  handleSubmit,
  onNext,
  closeModal,
  handleLogin,
  handleForgetPasswordToggle,
  isLoading,
  openModal,
  isEvent,
  GoogleSignIn,
}) {

  const googleLogin = useGoogleAuth({ onNext, closeModal, eventLink });

  return (
    <form
      className="px-[15px] lg:px-[30px] flex flex-col lg:pb-[0px]"
      autoComplete="off"
    >
      <div className="w-full ">
        <div className="">
          <ButtonComp
            onClick={(e) => {
              e.preventDefault();
              googleLogin(); // Trigger Google Sign-In
            }}
            className={`w-full text-[#060809] text-[11px] sm:text-[13px] font500`}
            btnText={
              <div className="flex justify-center items-center gap-[8px] sm:gap-[12px]">
                <GoogleIcon />
                Log in with Google
              </div>
            }
          />
        </div>

        <div className="flex items-center text-[11px] sm:text-[13px] text-white py-[20px] sm:py-[28px]">
          <div className="bg-[#343F4B] h-[1px] flex-grow-1"></div>
          <div className="px-[16px] sm:px-[28px] tracking-[1.5px]"> Or</div>

          <div className="bg-[#343F4B] h-[1px] flex-grow-1"></div>
        </div>
      </div>
      <div className="flex flex-col gap-[16px] sm:gap-[20px] mt-4">
        {LoginForm()?.map((item, index) => (
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
      </div>
      <div className="mt-[20px] sm:mt-[24px]">
        <ButtonComp
          btnText={isEvent ? "Login to Continue" : "Login"}
          className={`w-full text-[11px] sm:text-[13px] font500 mb-[24px] sm:mb-[30px]`}
          onClick={handleSubmit(handleLogin)}
          isLoading={isLoading}
          isDisabled={isLoading}
        />

        <div className="flex justify-center">
          <button
            className="text-center underline text-[11px] sm:text-[13px] text-white cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              handleForgetPasswordToggle && handleForgetPasswordToggle();
            }}
          >
            I forgot my password
          </button>
        </div>
      </div>
    </form>
  );
}