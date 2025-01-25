import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { CloseModal, NoProfile } from "../../../../../public/svg";
import {
  userApi,
  // useLoginApiMutation,
  useRegisterApiMutation,
  useSignInWithGoogleMutation,
} from "@/store/User/userApi";
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
import { setCoins, setUserData } from "@/store/User";
import LoginPage from "./Module/LoginPage";
import SignUpPage from "./Module/SignUp";
import {
  ErrorNotification,
  SuccessNotification,
  eventLink,
  randomBetweenOneAndTen,
  singleEventLink,
} from "@/utils/reusableComponent";
import { eventApi, useLoginApiMutation } from "@/store/Event/eventApi";
import { transactionApi } from "@/store/Transaction/transactionApi";

export default function LoginSignUp({
  closeModal,
  pageName = "",
  className,
  handleForgetPasswordToggle,
  onNext,
  openModal,
}) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = router?.query;
  const [toggle, setToggle] = useState("Login");
  const isActive = `text-white border-[1px] border-[#48515d]  rounded-[999px] bg-[#2e3239] px-[30px] lg:px-[20px] cursor-pointer `;
  const notActive = `text-[#495969] px-[30px] lg:px-[20px] cursor-pointer `;
  const isEvent = router?.pathname === singleEventLink;
  const [
    RegisterUser,
    { isLoading: registerLoader, isError: registerIsError },
  ] = useRegisterApiMutation();

  const [LoginUser, { isLoading: loginLoader, isError: loginIsError }] =
    useLoginApiMutation();
  const [GoogleSignIn, { isLoading }] = useSignInWithGoogleMutation();
  const checkIfNonImageExist = storage.localStorage.get("noUserProfileImage");
  const { control, handleSubmit, getValues, reset, setError } = useForm({
    defaultValues: {
      // email: "",
      // username: "",
      // password: "",
      // phoneNumber: "",
      // fullName: "",
      // confirmPassword: "",
    },
  });

  const {
    control: control2,
    handleSubmit: handleSubmit2,
    getValues: getValues2,
    reset: reset2,
    setError: setError2,
  } = useForm({
    defaultValues: {
      email: "",
      username: "",
      password: "",
      phoneNumber: "",
      fullName: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    if (pageName) {
      setToggle(pageName);
    }
  }, [pageName]);

  async function handleRegister(e) {
    // "email": "string",
    // "username": "string",
    // "fullName": "string",
    // "password": "string"

    // return console.log(e , 'handleRegister');
    

    const payload = {
      // ...e,
      username: e.fullName,
      fullName: e?.fullName,
      gender : e?.gender,
      ageBracket : e?.age,
      email : e?.email,
      password : e?.password
    };


    const handleRegisterUser = await RegisterUser(payload);
    const response = handleRegisterUser;

    const UserString = JSON?.stringify(response?.user);

    // console.log(response,'UserStringUserString')

    if (
      response?.error?.data?.statusCode &&
      response?.error?.data?.statusCode !== 200
    ) {
      if (response?.error?.data?.message === "Email is already in use") {
        return setError2("email", {
          type: "custom",
          message: "Email is already in use",
        });
      }

      if (response?.error?.data?.message === "Username is already in use") {
        return setError2("fullName", {
          type: "custom",
          message: response?.error?.data?.message,
        });
      }

      // response?.message[0],'hehehehe')
      if (
        Array.isArray(response?.error?.data?.message) &&
        response?.error?.data?.message[0] ==
          "Password should have 1 upper case, lowcase letter along with a number and special character."
      ) {
        return setError2("password", {
          type: "custom",
          message:
            "Password must have lowercase letters, one uppercase, a number, and a special character.",
        });
      }
      if (
        Array.isArray(response?.error?.data?.message) &&
        response?.error?.data?.message[0] ==
          "Username must be alphanumeric and without special characters"
      ) {
        return setError2("fullName", {
          type: "custom",
          message:
            "Username must be alphanumeric and without special characters",
        });
      }
      //

      return console.log(response.message);
      
      (CheckIfArray(response?.message) && response.message.length>0)
        ? ErrorNotification(response?.message[0])
        : ErrorNotification(response?.message);
      
        
    }

    if (response?.data?.user?._id) {
      // const userData = JSON.parse(response?.user);

      storage.localStorage.set("noUserProfileImage", {
        id: response?.data?.user?._id,
        nonProfileImage: randomBetweenOneAndTen(),
      });
      SuccessNotification({ message: `Your registration was successful` });
      // toast.success(`User Register Successfully in`);
      reset2();
      setToggle("Login");
      // storage.localStorage.set('accessTokenLiveParte1',response?.accessToken);
      storage.localStorage.set(
        accessTokenStorageName,
        encryptText(response?.data?.accessToken)
      );
      dispatch(setCoins(response?.data?.user?.totalCoin));
      dispatch(setUserData(response?.data?.user));
      dispatch(userApi.util.resetApiState());
      dispatch(eventApi.util.resetApiState());
      dispatch(transactionApi.util.resetApiState());
      // dispatch(userApi.util.invalidateTags(["user"]));
      // dispatch(baseApi.util.resetApiState());

      if (router?.pathname === "/") {
        return router.push(eventLink);
      }
      if (onNext) {
        return onNext();
      }
      closeModal();
      // router.push("/my_shows");
    }
    dispatch(eventApi.util.invalidateTags(["event", "ondemand"]));
  }



  async function handleLogin(e) {
    const payload = {
      //
      usernameOrEmail: e.email,
      isGoogle: false,
      password: e?.password,
      ...e,
    };

    const handleRegisterUser = await LoginUser(payload);
    const response = handleRegisterUser?.data;
    console.log(response)
    const UserString = JSON.stringify(response?.user);
    if (!checkIfNonImageExist?.id) {
      storage.localStorage.set("noUserProfileImage", {
        id: response?.user?._id,
        nonProfileImage: randomBetweenOneAndTen(),
      });
    } else {
      if (response?.user?._id !== checkIfNonImageExist?.id) {
        storage.localStorage.set("noUserProfileImage", {
          id: response?.user?._id,
          nonProfileImage: randomBetweenOneAndTen(),
        });
      }
    }
    // Toddo:

    // console.log(handleRegisterUser,'handleRegisterUser')

    if (handleRegisterUser?.error?.data?.statusCode) {
      // toast.error("Invalid credentials");
      return ErrorNotification({
        message: handleRegisterUser?.error?.data?.message,
      });
    }
    if (response?.user?._id) {
      // dispatch(userApi.util.invalidateTags(["user"]));
      dispatch(setUserData(response?.user));
      dispatch(setCoins(response?.user?.totalCoin));
   
      // console.log(response?.user, "response?.user");
      SuccessNotification({ message: "You're in!" });

      storage.localStorage.set(
        accessTokenStorageName,
        encryptText(response?.accessToken)
      );

      if (router?.pathname === "/") {
        return router.push(eventLink);
      }
      if (onNext) {
        return onNext(response?.user);
      }
      closeModal && closeModal();
    }
    dispatch(userApi.util.resetApiState());
    dispatch(eventApi.util.resetApiState());
    dispatch(transactionApi.util.resetApiState());
    dispatch(eventApi.util.invalidateTags(["event", "ondemand"]));
  }

  async function handleSignWithGoogle() {
    const response = await GoogleSignIn();
    // console.log(response,'response')
  }

  return (
    <div className="flex flex-col flex-grow-1 overflow-y-scroll customScrollHorizontal relative">
      <div
        className={`bg-[#1B1C20] relative pb-[48px] px-[16px] py-[30px] lg:py-[30px]  h-full  max-h-[75vh] md:max-h-[90vh] overflow-y-scroll customScrollHorizontal ${className}  md:h-auto `}
      >
        <div className="flex justify-center items-center mb-[35px]">
          {/* <div className="pb-[10px] w-[27px]"></div> */}
          <div className="flex border-[#343F4B] border-[1px] justify-center items-center rounded-[999px] bg-[#25272d] text-[14px] font500 h-[33px] ">
            <div
              onClick={() => setToggle("Login")}
              className={` h-[30px] flex justify-center items-center   ${
                toggle === "Login" ? isActive : notActive
              }`}
            >
              Log In
            </div>
            <div
              // onClick={testNot ification}
              onClick={() => setToggle("SignUp")}
              className={` h-[30px] flex justify-center items-center ${
                toggle !== "Login" ? isActive : notActive
              }`}
            >
              Sign Up
            </div>
          </div>
          <div
            className="flex justify-end pb-[10px]  cursor-pointer fixed right-5 top-5"
            onClick={closeModal}
          >
            <CloseModal />
          </div>
        </div>
        {toggle === "Login" && (
          <LoginPage
            handleLogin={handleLogin}
            onNext={onNext}
            closeModal={closeModal}
            handleSubmit={handleSubmit}
            Controller={Controller}
            control={control}
            handleForgetPasswordToggle={handleForgetPasswordToggle}
            isLoading={loginLoader}
            openModal={openModal}
            isEvent={isEvent}
            GoogleSignIn={handleLogin}
            // loginWithGoogle={googleLogin}
          />
        )}

        {toggle !== "Login" && (
          <SignUpPage
            handleLogin={handleRegister}
            handleSubmit={handleSubmit2}
            Controller={Controller}
            control={control2}
            registerLoader={registerLoader}
            isEvent={isEvent}
            GoogleSignUp={handleRegister}
          />
        )}
      </div>
    </div>
  );
}
