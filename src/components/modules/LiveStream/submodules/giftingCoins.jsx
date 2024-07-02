import ButtonComp from "@/components/Ui/button";
import React from "react";
import Image from "next/image";
import {
  CloseIcon,
  LiveParteCoins,
  LiveParteCoinsII,
} from "../../../../../public/svg";
import LiveStreamHeader from "./LiveStreamHeader";
import { useGiftCoinsMutation } from "@/store/Transaction/transactionApi";
import { useDispatch, useSelector } from "react-redux";
import { selectCoins, selectCurrentUserData, setCoins, setUserData } from "@/store/User";
import { SuccessNotification } from "@/utils/reusableComponent";
import { REGEX_PATTERNS } from "@/utils/constants/errors";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useLazyGetUserProfileQuery, userApi } from "@/store/User/userApi";
export default function GiftingCoins({ onNext, onClose, eventId,usersCoinsBalance,containerStyle }) {
  const router = useRouter();
  const [checkProfile, { isLoading: cpLoading }] = useLazyGetUserProfileQuery();
  const { showId } = router?.query;
  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      coins: "",
    },
  });

  const userInfo = useSelector(selectCurrentUserData);
  const userCoinsBalance = useSelector(selectCoins);
  const [giftCoins, { isLoading }] = useGiftCoinsMutation();
  const dispatch = useDispatch();
  // console.log(eventId?._id,userInfo?._id, "eventId");

  async function handleGiftCoins(data) {
    const payload = {
      eventId: showId || eventId?._id,
      userId: userInfo?._id,
      coins: data?.coins,
    };

   
    const response = await giftCoins(payload);
    if (response?.data?.message === "Coins gifted successfully") {
      dispatch(setCoins(userCoinsBalance-data?.coins))
      
      dispatch(userApi.util.invalidateTags(["user"]));
      reset()
      onClose();
      return SuccessNotification({ message: response.data.message });
    }
  }

  return (
    <div className={`px-[34px] py-[16px] bg-[#060809] w-[280px] ${containerStyle}`}>
      <LiveStreamHeader title={`Gift Parte Coins`} onClose={onClose} />

      <div className="mb-[16px]">
        <div className="border-[#343F4B] border-[1px] bg-[#27292E]  flex items-center px-[12px] rounded-[8px] py-[7px] gap-[5px]  !h-[35px]">
          

          {/* <LiveParteCoins size={16} /> */}
          <Image
              src={`/svg/Liveparte coin.svg`}
              width={16}
              height={16}
              alt="coins"
            />

          <Controller
            // key={index}
            control={control}
            name={"coins"}
            rules={{
              required: `coins is required`,
              pattern: REGEX_PATTERNS?.NUMBER,
              validate:(value)=>value>usersCoinsBalance?'Insufficient Coins':true
            }}
            render={({ field: { onChange, value }, formState: { errors } }) => (
              <>
                <input
                  style={{ boxShadow: "none" }}
                  className=" w-full bg-transparent border-0 outline-none  border-none  text-white text-[14px]"
                  type="number"
                  value={value}
                  onChange={onChange}
                />
              </>
            )}
          />
        </div>
        {errors?.coins?.message && (
          <div className="text-red-600 font400 text-[12px] mt-1">
            {errors?.coins?.message}
          </div>
        )}
      </div>
      <div className="mb-[16px]">
        <ButtonComp
          btnText={`Send Coins`}
          className={`h-[30px] text-[#060809] w-full text-[13px] py-[5px]`}
          onClick={handleSubmit(handleGiftCoins)}
          isLoading={isLoading}
          isDisabled={!watch('coins')||isLoading}
        />
      </div>

      <div
        className="text-center lg:hidden text-[#00A699] text-[13px] underline mb-[10px] cursor-pointer"
        onClick={onNext}
      >
        Purchase Parte Coins
      </div>
    </div>
  );
}
