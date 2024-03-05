import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { CloseModal, GoogleIcon } from "../../../../../../../public/svg";
import ButtonComp from "@/components/Ui/button";
import { FloatingLabelInput } from "@/components/Ui/TextInput";
import { LoginForm, SignUpForm } from "../../../Data";
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
import LoginPage from "../../Module/LoginPage";
import SignUpPage from "../../Module/SignUp";
import EnterEmail from "./modules/EnterEmail";
import EmailSent from "./modules/EmailSent";
import EnterPassword from "./modules/EnterPassword";
import IsSuccessPage from "./modules/IsSuccessPage";

export default function ForgetPassword({
  closeModal,
  pageName = "Login",
  className,
  openModal
}) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [selectPage,setSelectPage] =useState('EnterEmail')

  const ForgetPasswordPage = [
    {
      name:'EnterEmail',
      component:<EnterEmail onNext={()=>setSelectPage('MailSent')}/>
    },
    {
      name:'MailSent',
      component:<EmailSent onNext={()=>setSelectPage('EnterPassword')}/>
    },
    {
      name:'EnterPassword',
      component:<EnterPassword onNext={()=>setSelectPage('IsSuccessPage')}/>
    },
    {
      name:'IsSuccessPage',
      component:<IsSuccessPage onNext={()=>openModal('Login')}/>
    }
  ]
 

  return (
    <div
      className={`bg-[#1B1C20] relative pb-[48px] px-[16px] pt-[16px] lg:pt-[16px] ${className}  overflow-y-scroll`}
    >
      <div className="flex justify-between items-center mb-[0px]">
        <div></div>
       
        <div className="flex justify-end pb-[10px] " onClick={closeModal}>
          <CloseModal />
        </div>
      </div>
      {ForgetPasswordPage?.find((item, index) =>item?.name===selectPage)?.component}
    
    </div>
  );
}
