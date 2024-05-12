import React, { useEffect, useRef, useState } from "react";
import { FloatingLabelInput } from "@/components/Ui/TextInput";
import ButtonComp from "@/components/Ui/button";
import { SecurityFormLabel, SettingFormLabel } from "../MyShow/Data";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import {
  useChangePasswordMutation,
  useGetUserProfileQuery,
  useUpdateProfileMutation,
} from "@/store/User/userApi";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import {
  CheckIfArray,
  NoImageUser,
  storage,
  userDetailStorageName,
} from "@/utils/helper";
import { Avatar3 } from "../../../../public/svg/avatars";
import { selectCurrentUserData, setUserData } from "@/store/User";
import {
  ErrorNotification,
  replaceDashWithSpace,
  SuccessNotification,
} from "@/utils/reusableComponent";
import { MainContainer } from "@/utils/styleReuse";

export default function SettingForm({
  isActive,
  // CloudinaryUpload,
  imageUrl,
  isImageUrlLoading,
  setImageUrl
}) {
  const checkIfNonImageExist = storage.localStorage.get("noUserProfileImage");
  const [userProfile, setUserProfile] = useState();
  const userInfo = useSelector(selectCurrentUserData);
  const dispatch =useDispatch()
  const [isLoading, setIsLoading] = useState(false);
  const { control, handleSubmit, setValue, watch, setError, reset,getValues } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      country: "",
      state: "",
      address: "",
      id: "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  // let userInfo =storage["localStorage"]?.get(userDetailStorageName)

  // console.log(userInfo,'userProfile')

  useEffect(() => {
    setUserProfile(
      NoImageUser[checkIfNonImageExist?.nonProfileImage] || Avatar3
    );
  }, [checkIfNonImageExist?.nonProfileImage]);
  //upload Image
  
  const hiddenFileInput = useRef(null);

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };


  const CloudinaryUpload = (photo) => {
    setIsLoading(true);
   
    const data = new FormData();
    data.append("file", photo);
    data.append("upload_preset", "wnvzkduq");
    data.append("cloud_name", "dnvwcmqhw");
    fetch("https://api.cloudinary.com/v1_1/dnvwcmqhw/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data,'response1')
        setImageUrl(data?.secure_url);
        handleUpdateUser({
          ...getValues(),
          profile_image: data.secure_url,
        })
        // onChange()
        // scrollToBottom();
      })
      .catch((err) => {
      })
      .finally(() => {
        setIsLoading(false);
       
      });
  };

  const handleChange = (event) => {
    const fileUploaded = event.target.files[0];
   
    CloudinaryUpload(fileUploaded);
    // handleFile(fileUploaded);
  };

  //
  const { data, isLoading:profileLoader, isError } = useGetUserProfileQuery();
  const [UpdatePassword, { isLoading: updatePasswordLoader }] =
    useChangePasswordMutation();

  const [UpdateUser, { isLoading: updateUserLoader }] =
    useUpdateProfileMutation();



  useEffect(() => {
    setValue("email", data?.email || userInfo?.email);
    setValue("id", data?._id) || userInfo?._id;
    setValue("phone", data?.phone || userInfo?.phone);
    setValue("address", userInfo?.address);
    setValue("country", userInfo?.countryInfo?.name||'Nigeria');
    setValue("state", userInfo?.state);
    // setValue(
    //   "username",
    //   data?.fullName ||data?.username
    // );
    setValue(
      "fullName",
      data?.fullName 
    );
  }, [data?._id, data, userInfo,setValue]);

  const confirmPassword = watch("confirmPassword");

  async function handleUpdateUser(data) {
    const payload = {
      fullName:data?.fullName,
      profile_image: imageUrl,
      ...data,
     
    };
    const handleRegisterUser = await UpdateUser(payload);
    const response = handleRegisterUser?.data;
    const UserString = JSON.stringify(response?.updatedUser);
    // console.log(response,imageUrl,'response')
    dispatch(setUserData(response?.updatedUser))
    setValue('profile_image',response?.updatedUser?.profile_image)
    // storage.localStorage.set(userDetailStorageName, JSON.stringify(response?.updatedUser));
    response?.updatedUser?._id&& storage.localStorage.set(userDetailStorageName, UserString);
   

    if (response?.statusCode && response?.statusCode !== 200) {
      CheckIfArray(response?.message)
        ? ErrorNotification({ message: response?.message[0] })
        : ErrorNotification({ message: response?.message });
    }
    if (response?.updatedUser?._id) {
      SuccessNotification({ message: response?.message });
      setImageUrl()
      // toast.success(response?.message);
      // storage.localStorage.set('accessTokenLiveParte1',response?.accessToken);

      // dispatch(setUserData(response?.user));
      //  router.push("/my_shows");
    }
  }

  async function handleUpdatePassword(data) {
    const payload = {
      ...data,
    };

    if (payload?.newPassword !== payload?.confirmPassword) {
      return setError("confirmPassword", {
        type: "custom",
        message: "Confirm New Password must be the same as New Password ",
      });
    }
    const handleRegisterUser = await UpdatePassword(payload);
    const response = handleRegisterUser?.data;


    if (response?.statusCode && response?.statusCode !== 200) {
      if (CheckIfArray(response?.message)) {
        toast.error(response?.message[0]);
      } else {
        if (response?.message === "Current password is incorrect") {
          return setError("currentPassword", {
            type: "custom",
            message: response?.message,
          });
        }
        toast.error(response?.message);
      }
    }
    if (response?.message === "Password changed successfully") {
      reset();
      setValue("email", data?.email);
      setValue("id", data?._id);
      setValue("phone", data?.phone);
      setValue("fullName", data?.fullName);
      // setValue('profile_image',data?.profile_image)
      return toast.success(response?.message);
    }
  }



  function CheckPhoneNumber(){
    if(watch('phone')===data?.phone){
      return false
    }
    return true
  }


  function CheckUserName(){
    if(watch('fullName') ===data?.fullName){
      return false
    }
    // if(watch('username') ===data?.username){
    //   return false
    // }
    return true
  }

  
  const isChangedState =CheckPhoneNumber()||CheckUserName()||imageUrl;

  return (
    <div className={`md:w-[60vw] xl:w-[40vw] ${MainContainer}`}>
      {isActive == "Profile" && (
        <div className="mb-[29px] flex items-center gap-[12px] text-white ">
          <div className="h-[40px] w-[40px]">
            {/* <NoProfile /> */}
            <div className="h-[40px] w-[40px]">
              {imageUrl || userInfo?.profile_image||data?.profile_image ? (
                <Image
                  src={imageUrl || data?.profile_image||userInfo?.profile_image}
                  key={imageUrl || data?.profile_image}
                  width={40}
                  height={40}
                  // placeholder="blur"
                  // blurDataURL={imageUrl || data?.profile_image}
                  className="rounded-full object-cover h-[40px] w-[40px]"
                  alt="user-profile-image"
                />
              ) : (
                userProfile
                // <NoProfile />
              )}
            </div>
            <input
              type="file"
              onChange={handleChange}
              ref={hiddenFileInput}
              accept="image/*"
              style={{ display: "none" }} // Make the file input element invisible
            />
          </div>
          <div className="text-[12px] leading-[20px]  md:w-[60%]">
            Upload your profile photo, it should be a maximum size of{" "}
            <span className="text-nowrap">5 MB</span>.
            <span
              onClick={handleClick}
              className="ml-2 text-[#FA4354] cursor-pointer hover:underline"
            >
              Change my photo
            </span>
          </div>
        </div>
      )}

      <div className="lg:pb-[92px]" autoComplete={`false`}>
        {isActive == "Profile" && (
          <div className="flex flex-col gap-[20px] ">
            {SettingFormLabel(CheckPhoneNumber,CheckUserName)?.map((item, index) => (
              <div key={index} className="cursor-not-allowed">
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
                      disabled={item?.disabled}
                      onBlur={item?.onBlur}
                    />
                  )}
                />
              </div>
            ))}
            <div className="mt-[40px] lg:mt-[32px]">
              <ButtonComp
                btnText={"Save Changes"}
                className={`w-full text-[13px] font500`}
                onClick={handleSubmit(handleUpdateUser)}
                isLoading={ updateUserLoader}
                isDisabled={
                  isImageUrlLoading ||
                  profileLoader ||
                  !isChangedState
                }
              />
            </div>
          </div>
        )}
        {isActive == "Security" && (
          <div className="flex flex-col gap-[20px] ">
            {SecurityFormLabel(confirmPassword)?.map((item, index) => (
              <Controller
                key={index}
                control={control}
                name={item?.name}
                rules={{
                  required: `${item?.label} is required`,
                  pattern: item?.pattern,
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
                // isDisabled={}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
