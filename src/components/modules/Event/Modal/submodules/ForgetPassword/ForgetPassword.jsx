import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { CloseModal, } from "../../../../../../../public/svg";

import { useForgetPasswordMutation, useRegisterApiMutation } from "@/store/User/userApi";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import EnterEmail from "./modules/EnterEmail";
import EmailSent from "./modules/EmailSent";
import EnterPassword from "./modules/EnterPassword";
import IsSuccessPage from "./modules/IsSuccessPage";
import { ErrorNotification, SuccessNotification } from "@/utils/reusableComponent";

export default function ForgetPassword({
  closeModal,
  pageName = "Login",
  className,
  openModal
}) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [selectPage,setSelectPage] =useState('EnterEmail')
  const [forgetPassword,{isLoading,}]=useForgetPasswordMutation();
  const { control, handleSubmit, getValues } = useForm({
    defaultValues: {
      email: "",
   
    },
  });

  const handleForgetPassword = async(data)=>{
    console.log(data)
    const responses = await forgetPassword(data);
    console.log(responses)
    if(responses?.data){
      return SuccessNotification({message:responses?.data?.message})
    }
    return ErrorNotification({message:'Something went wrong'})
    // setSelectPage('MailSent')

  }

  const ForgetPasswordPage = [
    {
      name:'EnterEmail',
      component:<EnterEmail control={control} isLoading={isLoading} handleSubmit={handleSubmit} onNext={(item)=>{
        handleForgetPassword(item)
      }}/>
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
      className={`bg-[#1B1C20] relative pb-[48px] px-[16px] pt-[16px] lg:pt-[16px] ${className}  overflow-y-scroll customScrollHorizontal`}
    >
      <div className="flex justify-between items-center mb-[0px]">
        <div></div>
       
        <div className="flex justify-end pb-[10px]  cursor-pointer" onClick={closeModal}>
          <CloseModal />
        </div>
      </div>
      {ForgetPasswordPage?.find((item, index) =>item?.name===selectPage)?.component}
    
    </div>
  );
}
