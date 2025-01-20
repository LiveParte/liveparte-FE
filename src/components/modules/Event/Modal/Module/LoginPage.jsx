import React, { useEffect, useState } from "react";
import { LoginForm } from "../../Data";
import ButtonComp from "@/components/Ui/button";
import { FloatingLabelInput } from "@/components/Ui/TextInput";
import { useGoogleLogin } from "@react-oauth/google";
import { GoogleIcon } from "../../../../../../public/svg";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { setUserData } from "@/store/User";
import { ErrorNotification, eventLink } from "@/utils/reusableComponent";
import { useDispatch } from "react-redux";
import { accessTokenStorageName, encryptText, storage } from "@/utils/helper";

export default function LoginPage({
  Controller,
  control,
  handleSubmit,
  handleLogin,
  handleForgetPasswordToggle,
  isLoading,
  closeModal,
   onNext,
  openModal,
  isEvent,
  GoogleSignIn,
}) {

  const base_url = process.env.NEXT_PUBLIC_BASEURL
  const [userToken, setUserToken] = useState(null); // Store the Google access token

  const router = useRouter();
  const dispatch = useDispatch();

  const googleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      setUserToken(tokenResponse.access_token); // Save the access token
    },
    onError: () => {
      toast.error("Google login failed"); // Show error toast on login failure
    },
  });

   useEffect(() => {
    const authenticateUser = async () => {
      try {
        const responses = await fetch(
          `${base_url}auth/oauth/google/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              token: userToken, // Send the token to the backend
            }),
          }
        );

        if (!responses.ok) {
          throw new Error(`Error: ${responses.statusText}`);
        }

        const response = await responses.json();
        
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
        
        if (response?.error?.data?.statusCode) {
          // toast.error("Invalid credentials");
          return ErrorNotification({
            message: handleRegisterUser?.error?.data?.message,
          });
        }

        if (response?.user?._id) {
          dispatch(userApi.util.invalidateTags(["user"]));
          dispatch(setUserData(response?.user));
          dispatch(setCoins(response?.user?.totalCoin));

           storage.localStorage.set(
            accessTokenStorageName,
            encryptText(response?.accessToken)
          );
   
          // console.log(response?.user, "response?.user");
          SuccessNotification({ message: "You're in!" });

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
      
       
      } catch (error) {
        console.log(error)
        ErrorNotification({
          message: error?.message,
        })
      }
    };

    if (userToken) {
      authenticateUser();
      setUserToken(null); // Clear the token to prevent re-triggering
    }
  }, [userToken, GoogleSignIn]);

  // useEffect(() => {
  //   const authenticateUser = async () => {
  //     try {
  //       const response = await fetch(
  //         `${base_url}auth/oauth/google/login`,
  //         {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify({
  //             token: userToken, // Send the token to the backend
  //           }),
  //         }
  //       );

  //       if (!response.ok) {
  //         throw new Error(`Error: ${response.statusText}`);
  //       }

  //       const data = await response.json();

  //       if (data?.accessToken) {
  //         dispatch(setUserData(data?.user));
  //         storage.localStorage.set(
  //           accessTokenStorageName,
  //           encryptText(data?.accessToken)
  //         );
  //         SuccessNotification({ message: "You're in!" });
  //         router.push(eventLink);
  //         if (router?.pathname === "/") {
  //       return router.push(eventLink);
  //     }
  //     if (onNext) {
  //       return onNext(data?.user);
  //     }
  //       }
  //     } catch (error) {
  //       console.log(error)
  //       ErrorNotification({
  //       message: error?.message,
  //     })
  //     }
  //   };

  //   if (userToken) {
  //     authenticateUser();
  //     setUserToken(null); // Clear the token to prevent re-triggering
  //   }
  // }, [userToken, GoogleSignIn]);

  return (
    <form
      className="px-[15px] lg:px-[30px] flex flex-col  lg:pb-[0px]"
      autoComplete="off"
    >
      <div className="w-full ">
        <div className="">
          <ButtonComp
            onClick={(e) => {
              e.preventDefault();
              googleLogin(); // Trigger Google Sign-In
            }}
            className={`w-full text-[#060809] text-[13px] font500`}
            btnText={
              <div className="flex justify-center items-center gap-[12px]">
                <GoogleIcon />
                Log in with Google
              </div>
            }
          />
        </div>

        <div className="flex items-center text-[13px] text-white  py-[28px] ">
          <div className="bg-[#343F4B]  h-[1px] flex-grow-1"></div>
          <div className="px-[28px] tracking-[1.5px]"> Or</div>

          <div className="bg-[#343F4B]  h-[1px] flex-grow-1"></div>
        </div>
      </div>
      <div className="flex flex-col gap-[20px] mt-4">
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
      <div className="mt-[24px]">
        <ButtonComp
          btnText={isEvent ? "Login to Continue" : "Login"}
          className={`w-full text-[13px] font500   mb-[30px]`}
          onClick={handleSubmit(handleLogin)}
          isLoading={isLoading}
          isDisabled={isLoading}
        />

        <div className="flex justify-center">
          <button
            className="text-center underline text-[13px] text-white cursor-pointer "
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