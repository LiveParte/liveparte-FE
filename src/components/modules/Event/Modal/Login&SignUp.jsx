import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { CloseModal, NoProfile } from "../../../../../public/svg";
import {
  useLoginApiMutation,
  userApi,
  useRegisterApiMutation,
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
import { setUserData } from "@/store/User";
import LoginPage from "./Module/LoginPage";
import SignUpPage from "./Module/SignUp";
import {
  ErrorNotification,
  SuccessNotification,
  eventLink,
  randomBetweenOneAndTen,
  replaceSpaceWithDash,
  singleEventLink,
} from "@/utils/reusableComponent";
import { eventApi } from "@/store/Event/eventApi";
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
  // console.log(router, "routerrouter");
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
  const checkIfNonImageExist = storage.localStorage.get("noUserProfileImage");
  // console.log(checkIfNonImageExist,'checkIfNonImageExist')
  const { control, handleSubmit, getValues, reset, setError } = useForm({
    defaultValues: {
      email: "",
      username: "",
      password: "",
      phoneNumber: "",
      fullName: "",
      confirmPassword: "",
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

  // console.log(pageName, "pageName");

  useEffect(() => {
    if (pageName) {
      setToggle(pageName);
    }
  }, [pageName]);

  async function handleRegister(e) {
    // if (e?.password !== e?.confirmPassword) {
    //   return setError("confirmPassword", {
    //     type: "custom",
    //     message:
    //       "The password and confirm password do not match. Please make sure they are the same.",
    //   });
    // }
    // e.preventDefault();
    const payload = {
      ...e,
      username: e.fullName,
      fullName: e?.fullName,
    };
    const handleRegisterUser = await RegisterUser(payload);
    const response = handleRegisterUser?.data;

    const UserString = JSON.stringify(response?.user);
    // console.log(handleRegisterUser, UserString, "handleRegisterUser");
    // toast('Hello! RegisterUser')
    if (response?.statusCode && response?.statusCode !== 200) {
      if (response?.message === "Email is already in use") {
        return setError2("email", {
          type: "custom",
          message: "Email is already in use",
        });
      }

      if (response?.message === "Username is already in use") {
        return setError2("fullName", {
          type: "custom",
          message: " Username is already in use",
        });
      }

      // response?.message[0],'hehehehe')
      if (
        response?.message[0] ==
        "Password should have 1 upper case, lowcase letter along with a number and special character."
      ) {
        return setError2("password", {
          type: "custom",
          message:
            "Password must have lowercase letters, one uppercase, a number, and a special character.",
        });
      }
      if (
        response?.message[0] ==
        "Username must be alphanumeric and without special characters"
      ) {
        return setError2("fullName", {
          type: "custom",
          message:
            "Username must be alphanumeric and without special characters",
        });
      }
      //
      CheckIfArray(response?.message)
        ? ErrorNotification(response?.message[0])
        : ErrorNotification(response?.message);
    }
    if (response?.user?.createdAt) {
      // const userData = JSON.parse(response?.user);
      const UserString = JSON.stringify(response?.user);

      storage.localStorage.set("noUserProfileImage", {
        id: response?.user?._id,
        nonProfileImage: randomBetweenOneAndTen(),
      });
      SuccessNotification({ message: `User Register Successfully in` });
      // toast.success(`User Register Successfully in`);
      reset2();
      setToggle("Login");
      // storage.localStorage.set('accessTokenLiveParte1',response?.accessToken);
      storage.localStorage.set(
        accessTokenStorageName,
        encryptText(response?.accessToken)
      );

      // store.dispatch(setUserData(userData));

      storage.localStorage.set(userDetailStorageName, UserString);
      dispatch(setUserData(response?.user));
      // dispatch(baseApi.util.resetApiState());

      // console.log()
      if (router?.pathname === "/") {
        return router.push(eventLink);
      }
      if (onNext) {
        return onNext();
      }
      closeModal();
      // router.push("/my_shows");
    }
  }

  async function handleLogin(e) {
    dispatch(userApi.util.resetApiState());
    dispatch(eventApi.util.resetApiState());
    dispatch(transactionApi.util.resetApiState());
    // e.preventDefault();
    const payload = {
      ...e,
      usernameOrEmail: e.email,
    };

    const handleRegisterUser = await LoginUser(payload);
    const response = handleRegisterUser?.data;
    const UserString = JSON.stringify(response?.user);

    // console.log(handleRegisterUser, UserString, "handleRegisterUser");
    // toast('Hello! RegisterUser')

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

    if (handleRegisterUser?.error?.message === "Unauthorized") {
      // toast.error("Invalid credentials");
      ErrorNotification({ message: "Invalid credentials" });
    }

    if (response?.user?.createdAt) {
      SuccessNotification({ message: "User Successfully Logged in" });
      dispatch(setUserData(response?.user));
      // dispatch(eventApi.utils.invalidateTags('singleEvent'))
      // dispatch(eventApi.util.invalidateTags(['singleEvent']));

      // toast.success(`User Successfully Logged in`);
      storage.localStorage.set(
        accessTokenStorageName,
        encryptText(response?.accessToken)
      );

      storage.localStorage.set(userDetailStorageName, UserString);
      // if(router?.pathname===singleEventLink){
      //   dispatch(eventApi.endpoints.getEventDetailViaId.initiate(id))

      // }
      if (router?.pathname === "/") {
        return router.push(eventLink);
      }
      if (onNext) {
        return onNext(response?.user);
      }
      closeModal();
    }
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
            handleSubmit={handleSubmit}
            Controller={Controller}
            control={control}
            handleForgetPasswordToggle={handleForgetPasswordToggle}
            isLoading={loginLoader}
            openModal={openModal}
            isEvent={isEvent}
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
          />
        )}
      </div>
    </div>
  );
}
