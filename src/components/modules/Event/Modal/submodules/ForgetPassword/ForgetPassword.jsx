import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { CloseModal } from "../../../../../../../public/svg";

import {
  useForgetPasswordMutation,
  useRegisterApiMutation,
  useRestPasswordMutation,
} from "@/store/User/userApi";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import EnterEmail from "./modules/EnterEmail";
import EmailSent from "./modules/EmailSent";
import EnterPassword from "./modules/EnterPassword";
import IsSuccessPage from "./modules/IsSuccessPage";
import {
  ErrorNotification,
  GetEmailSearchUrl,
  SuccessNotification,
} from "@/utils/reusableComponent";

export default function ForgetPassword({
  closeModal,
  pageName = "Login",
  className,
  openModal,
  Path,
  token,
}) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [selectPage, setSelectPage] = useState("EnterEmail");
  const [forgetPassword, { isLoading }] = useForgetPasswordMutation();
  const [resetPassword, { isLoading: resetLoader }] = useRestPasswordMutation();
  const { control, handleSubmit, getValues, reset, setError } = useForm({
    defaultValues: {
      email: "",
    },
  });

  useEffect(() => {
    if (router?.pathname === "/reset-password" && Path) {
      setSelectPage(Path);
    }
  }, [Path,router?.pathname ]);

  const handleForgetPassword = async (data) => {
    // console.log(data);
    const responses = await forgetPassword(data);
    // console.log(responses);

    if (
      responses?.data?.message ==
      "Password reset token has been sent to your email"
    ) {
      return setSelectPage("MailSent");
      // return SuccessNotification({message:responses?.data?.message})
    }
    if (responses?.data?.statusCode !== 200) {
      if (responses?.data?.message === "User not found") {
        return setError("email", {
          type: "custom",
          message: responses?.data?.message,
        });
      }
      // return ErrorNotification({message:responses?.data?.message})
    }
  //  return setSelectPage("MailSent");
    return ErrorNotification({ message: "Something went wrong" });
    // setSelectPage('MailSent')
  };
  const handleResetPassword = async (data) => {
    // console.log(data);

    if (data?.confirmPassword !== data?.password) {
      return setError("confirmPassword", {
        type: "custom",
        message: "Confirm New Password must be the same as New Password",
      });
    }
    const payload = {
      token,
      newPassword: data?.password,
    };
    const responses = await resetPassword(payload);
    // console.log(responses, "responses");
    if (responses?.data?.message === "Password has been successfully reset") {
      router.push("/login");
      reset();
      return SuccessNotification({ message: responses?.data?.message });
    }
    if (responses?.data?.statusCode === 400) {
      // router.push('/login')
      return ErrorNotification({ message: responses?.data?.message });
    }

    return ErrorNotification({ message: "Something went wrong" });
    // setSelectPage('MailSent')
  };

  function redirectToEmail() {
    // Get the email address
    const email = getValues()?.email;
    // Assuming the user's email provider is Gmail, you can construct the URL to search for emails with the term 'party'
    // const searchQuery = encodeURIComponent('partylive762');
    const emailUrl = GetEmailSearchUrl(email);

    // Redirect the current browser window to the email URL
    window.open(emailUrl, "_blank");
    // window.location.href = emailUrl;
  }

  const ForgetPasswordPage = [
    {
      name: "EnterEmail",
      component: (
        <EnterEmail
          control={control}
          isLoading={isLoading}
          handleSubmit={handleSubmit}
          onNext={(item) => {
            handleForgetPassword(item);
          }}
        />
      ),
    },
    {
      name: "MailSent",
      component: <EmailSent onNext={redirectToEmail} />,
    },
    {
      name: "EnterPassword",
      component: (
        <EnterPassword
          isLoading={resetLoader}
          handleSubmit={handleSubmit}
          control={control}
          onNext={(data) => handleResetPassword(data)}
        />
      ),
    },
    {
      name: "IsSuccessPage",
      component: <IsSuccessPage onNext={() => openModal("Login")} />,
    },
  ];

  return (
    <div
      className={`bg-[#1B1C20] relative pb-[48px] px-[16px] pt-[16px] lg:pt-[16px] ${className}  overflow-y-scroll customScrollHorizontal`}
    >
      <div className="flex justify-between items-center mb-[0px]">
        <div></div>

        <div
          className="flex justify-end pb-[10px]  cursor-pointer"
          onClick={closeModal}
        >
          <CloseModal />
        </div>
      </div>
      {
        ForgetPasswordPage?.find((item, index) => item?.name === selectPage)
          ?.component
      }
    </div>
  );
}
