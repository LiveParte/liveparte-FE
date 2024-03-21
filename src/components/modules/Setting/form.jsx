import React, { useEffect } from "react";
import { FloatingLabelInput } from "@/components/Ui/TextInput";
import ButtonComp from "@/components/Ui/button";
import { SecurityFormLabel, SettingFormLabel } from "../MyShow/Data";
import { NoProfile } from "../../../../public/svg";
import {
  useChangePasswordMutation,
  useGetUserProfileQuery,
  useUpdateProfileMutation,
} from "@/store/User/userApi";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { CheckIfArray } from "@/utils/helper";

export default function SettingForm({ isActive }) {
  const { data, isLoading, isError } = useGetUserProfileQuery();
  const [UpdatePassword, { isLoading: updatePasswordLoader }] =
    useChangePasswordMutation();
  const [UpdateUser, { isLoading: updateUserLoader }] =
    useUpdateProfileMutation();

  const { control, handleSubmit, setValue, watch, setError,reset } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      country: "Nigeria",
      state: "Lagos",
      address: "No 4. olawunmi street, Lagos, Nigeria",
      id: "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  // console.log(data,'datadata')

  useEffect(() => {
    setValue("email", data?.email);
    setValue("id", data?._id);
    setValue("phone", data?.phone);
    setValue("fullName", data?.fullName);
  }, [data?._id]);

  const confirmPassword = watch("confirmPassword");

  async function handleUpdateUser(data) {
    const payload = {
      ...data,
    };
    const handleRegisterUser = await UpdateUser(payload);
    const response = handleRegisterUser?.data;

    // console.log(handleRegisterUser, "responseresponseresponse");

    const UserString = JSON.stringify(response?.user);

    if (response?.statusCode && response?.statusCode !== 200) {
      CheckIfArray(response?.message)
        ? toast.error(response?.message[0])
        : toast.error(response?.message);
    }
    if (response?.updatedUser?._id) {
      toast.success(response?.message);
      // storage.localStorage.set('accessTokenLiveParte1',response?.accessToken);

      // dispatch(setUserData(response?.user));
      //  router.push("/my_shows");
    }
  }

  async function handleUpdatePassword(data) {
    const payload = {
      ...data,
    };

    console.log(payload);
    if (payload?.newPassword !== payload?.confirmPassword) {
      return setError("confirmPassword", {
        type: "custom",
        message: "Confirm New Password must be the same as New Password ",
      });
    }
    const handleRegisterUser = await UpdatePassword(payload);
    const response = handleRegisterUser?.data;

    // console.log(handleRegisterUser, "responseresponseresponse");

    if (response?.statusCode && response?.statusCode !== 200) {
      if (CheckIfArray(response?.message)) {
        toast.error(response?.message[0]);
      } else {
        if(response?.message==="Current password is incorrect"){
          return setError("currentPassword", {
            type: "custom",
            message: response?.message,
          });
        }
        toast.error(response?.message);
      }
    }
    if (response?.message==="Password changed successfully") {
      reset()
      setValue("email", data?.email);
      setValue("id", data?._id);
      setValue("phone", data?.phone);
      setValue("fullName", data?.fullName);
     return toast.success(response?.message);
    }
  }

  return (
    <div className="px-[20px] lg:px-[120px] md:w-[60vw] xl:w-[40vw]">
      {isActive == "Profile" && (
        <div className="mb-[29px] flex items-center gap-[12px] text-white">
          <div className="h-[48px] w-[48px]">
            <NoProfile />
          </div>
          <div className="text-[12px] leading-[20px] ">
            Upload your profile photo, it should be a maximum{" "}
            <br className="hidden md:block" /> size of 5 MB.
            <span className="ml-2 text-[#FA4354] cursor-pointer">
              Change my photo
            </span>
          </div>
        </div>
      )}

      <div className="lg:pb-[92px]" autoComplete={`false`}>
        {isActive == "Profile" && (
          <div className="flex flex-col gap-[20px] ">
            {SettingFormLabel()?.map((item, index) => (
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
            <div className="mt-[40px] lg:mt-[32px]">
              <ButtonComp
                btnText={"Save Changes"}
                className={`w-full text-[13px] font500`}
                onClick={handleSubmit(handleUpdateUser)}
                isLoading={updateUserLoader}
                isDisabled={isLoading}
              />
            </div>
          </div>
        )}
        {isActive == "Security" && (
          <div className="flex flex-col gap-[20px] ">
            {SecurityFormLabel(confirmPassword)?.map((item, index) => (
              <Controller
                control={control}
                name={item?.name}
                rules={{
                  required: `${item?.label} is required`,
                  pattern: item?.pattern,
                  // validate:value=>console.log(value,confirmPassword)
                  // validate:value=>item?.handlePasswordValidate?item?.handlePasswordValidate(value):{}
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
            <div className="mt-[40px] lg:mt-[32px]">
              <ButtonComp
                btnText={"Save Changes"}
                className={`w-full text-[13px] font500`}
                onClick={handleSubmit(handleUpdatePassword)}
                isLoading={updatePasswordLoader}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
