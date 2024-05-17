import React, { useEffect, useState } from "react";
import { LoginForm } from "../../Data";
import ButtonComp from "@/components/Ui/button";
import { GoogleIcon } from "../../../../../../public/svg";
import { FloatingLabelInput } from "@/components/Ui/TextInput";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import { signIn } from "next-auth/react";
import axios from "axios";

export default function LoginPage({
  Controller,
  control,
  handleSubmit,
  handleLogin,
  handleForgetPasswordToggle,
  isLoading,
  openModal,
  isEvent,
  GoogleSignIn,
  // googleLogin
}) {

  const [ user, setUser ] = useState([]);

  useEffect(() => {
    if (user?.access_token) {
        fetch(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
            headers: {
                'Authorization': `Bearer ${user.access_token}`,
                'Accept': 'application/json'
            }
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then((data) => {
          const payload = {
          
            email: data?.email,
            password:`${data?.given_name}${data?.id}@`
          };
          GoogleSignIn(payload)
          setUser()
            console.log(data);
            // setProfile(data);
        })
        .catch((error) => {
          setUser()
            console.error('There has been a problem with your fetch operation:', error);
        });
    }
}, [user]);

  const googleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      setUser(tokenResponse);
        console.log(tokenResponse,'tokenResponse')
      // You can now use the tokenResponse to authenticate the user in your app
    },
    onError: () => {
      console.error('Google login failed');
      // Handle login errors here
    },
    // flow: 'auth-code', // Use 'auth-code' for the authorization code flow
  });
  
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
              // signIn('google')
              googleLogin();
              // GoogleSignIn();
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
      <div className="flex flex-col gap-[20px]">
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
