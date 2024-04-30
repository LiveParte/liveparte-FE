import React from 'react'
import { LoginForm, SignUpForm } from '../../Data'
import ButtonComp from '@/components/Ui/button'
import { GoogleIcon } from '../../../../../../public/svg'
import { FloatingLabelInput } from '@/components/Ui/TextInput'
import Link from 'next/link'
import { PolicyUrl, termsUrl } from '@/utils/reusableComponent'

export default function SignUpPage({
    Controller,control,handleSubmit,handleLogin,
    registerLoader,
    isEvent
}) {
  // const termsUrl=`https://liveparte.notion.site/Terms-of-service-d531fa1d585346dba3205ae490f5fbb4`
  return (
    <form
    className="px-[15px] lg:px-[30px] flex flex-col  lg:pb-[0px]"
    autoComplete="off"
  >
    <div className="w-full ">
      <div className="">
        <ButtonComp
        onClick={(e)=>{
          e.preventDefault();
        }}
          className={`w-full text-[#060809] text-[13px] font500`}
          btnText={
            <div className="flex justify-center items-center gap-[12px]">
              <GoogleIcon />
              Sign up with Google
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
    <div className='flex flex-col gap-[20px]'>

    {SignUpForm()?.map((item, index) => (
      <Controller
      key={index}
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
    </div>
    <div className="mt-[24px]">
      <ButtonComp
        btnText={isEvent?"Sign up to Continue":"Sign Up"}
        className={`w-full text-[13px] font500 `}
        onClick={handleSubmit(handleLogin)}
        isLoading={registerLoader}
      />
    </div>
    <div className='text-[#63768d] text-[13px] text-center px-[10px] mt-[19px] '>By continuing, you agree and accept the <Link target='_blank' href={termsUrl} className='underline text-white' >Terms of Service</Link> and <Link target='_blank' href={PolicyUrl} className='underline text-white'>Privacy Policy</Link> in the use of Liveparte</div>
  </form>
  )
}
