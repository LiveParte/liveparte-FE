import React from 'react'
import { LoginForm, SignUpForm } from '../../Data'
import ButtonComp from '@/components/Ui/button'
import { GoogleIcon } from '../../../../../../public/svg'
import { FloatingLabelInput } from '@/components/Ui/TextInput'

export default function SignUpPage({
    Controller,control,handleSubmit,handleLogin,
    registerLoader
}) {
  return (
    <form
    className="px-[15px] lg:px-[50px] flex flex-col gap-[20px] lg:pb-[0px]"
    autoComplete="off"
  >
    <div className="w-full ">
      <div className="mb-[28px] ">
        <ButtonComp
          className={`w-full text-[#060809] text-[13px] font500`}
          btnText={
            <div className="flex justify-center items-center gap-[12px]">
              <GoogleIcon />
              Sign up with Google
            </div>
          }
        />
      </div>

      <div className="flex items-center text-[13px] text-white  py-[10px] mb-[29px]">
        <div className="bg-[#343F4B]  h-[1px] flex-grow-1"></div>
        <div className="px-[38px]"> Or you can</div>

        <div className="bg-[#343F4B]  h-[1px] flex-grow-1"></div>
      </div>
    </div>
    {SignUpForm()?.map((item, index) => (
      <Controller
        control={control}
        name={item?.name}
        rules={{
          required: `${item?.label} is required`,
          pattern: item?.pattern,
        }}
        render={({
          field: { onChange, value },
          formState: { errors },
        }) => (
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
    <div className="mt-[24px]">
      <ButtonComp
        btnText={"Sign Up and Continue"}
        className={`w-full text-[13px] font500 !bg-[#343F4B] !text-[#63768D]`}
        onClick={handleSubmit(handleLogin)}
        isLoading={registerLoader}
      />
    </div>
  </form>
  )
}
