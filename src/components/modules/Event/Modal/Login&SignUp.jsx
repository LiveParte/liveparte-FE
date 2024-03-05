import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { CloseModal, GoogleIcon } from "../../../../../public/svg";
import ButtonComp from "@/components/Ui/button";
import { FloatingLabelInput } from "@/components/Ui/TextInput";
import { LoginForm, SignUpForm } from "../Data";
import { useRegisterApiMutation } from "@/store/User/userApi";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import {
  CheckIfArray,
  accessTokenStorageName,
  encryptObject,
  encryptText,
  storage,
  userDetailStorageName,
} from "@/utils/helper";
import { useDispatch } from "react-redux";
import { setUserData } from "@/store/User";
import LoginPage from "./Module/LoginPage";
import SignUpPage from "./Module/SignUp";

export default function LoginSignUp({
  closeModal,
  pageName = "Login",
  className,
  handleForgetPasswordToggle
}) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState("Login");
  const isActive = `text-white border-[1px] border-[#48515d]  rounded-[999px] bg-[#2e3239] px-[30px] lg:px-[50px] cursor-pointer `;
  const notActive = `text-[#495969] px-[30px] lg:px-[50px] cursor-pointer `;
  const [
    RegisterUser,
    { isLoading: registerLoader, isError: registerIsError },
  ] = useRegisterApiMutation();

  const { control, handleSubmit, getValues } = useForm({
    defaultValues: {
      email: "test@gmail4.com",
      username: "dammymoses4",
      password: "Password@4",
      phoneNumber: "0814409584848",
      fullName: "Test Name",
    },
  });

  console.log(getValues(), "getValues");

  useEffect(() => {
    if (pageName) {
      setToggle(pageName);
    }
  }, [pageName]);

  async function handleLogin(e) {
    // e.preventDefault();
    const payload = {
      ...e,
      username: e.phoneNumber,
    };
    const handleRegisterUser = await RegisterUser(payload);
    const response = handleRegisterUser?.data;

    const UserString = JSON.stringify(response?.user);
    // console.log(handleRegisterUser, UserString, "handleRegisterUser");
    // toast('Hello! RegisterUser')
    if (response?.statusCode && response?.statusCode !== 200) {
      CheckIfArray(response?.message)
        ? toast.error(response?.message[0])
        : toast.error(response?.message);
    }
    if (response?.user?.createdAt) {
      toast.success(`User Successfully Logged in`);
      // storage.localStorage.set('accessTokenLiveParte1',response?.accessToken);
      storage.localStorage.set(
        accessTokenStorageName,
        encryptText(response?.accessToken)
      );
      storage.localStorage.set(
        userDetailStorageName,
        encryptObject(response?.user)
      );
      dispatch(setUserData(response?.user));
      // router.push("/my_shows");
    }
  }

  return (
    <div
      className={`bg-[#1B1C20] relative pb-[48px] px-[16px] pt-[16px] lg:pt-[16px] ${className} min-h-[75vh] md:h-auto overflow-y-scroll`}
    >
      <div className="flex justify-between items-center mb-[45px]">
        <div></div>
        <div className="flex border-[#343F4B] border-[1px] justify-center items-center rounded-[999px] bg-[#25272d] text-[14px] font500 h-[40px] ">
          <div
            onClick={() => setToggle("Login")}
            className={` h-[40px] flex justify-center items-center   ${
              toggle === "Login" ? isActive : notActive
            }`}
          >
            Log In
          </div>
          <div
            onClick={() => setToggle("SignUp")}
            className={` h-[40px] flex justify-center items-center ${
              toggle !== "Login" ? isActive : notActive
            }`}
          >
            Sign Up
          </div>
        </div>
        <div className="flex justify-end pb-[10px] " onClick={closeModal}>
          <CloseModal />
        </div>
      </div>
      {toggle === "Login" && (
        <LoginPage
        handleLogin={handleLogin}
        handleSubmit={handleSubmit}
        Controller={Controller}
        control={control}
        handleForgetPasswordToggle={handleForgetPasswordToggle}

        />
      )}

      {toggle !== "Login" && (
       <SignUpPage
       handleLogin={handleLogin}
       handleSubmit={handleSubmit}
       Controller={Controller}
       control={control}
       registerLoader={registerLoader}
       />
      )}
    </div>
  );
}
