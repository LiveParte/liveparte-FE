import ButtonComp from "@/components/Ui/button";
import React from "react";
import { GiftTicketForm } from "../Data";
import { FloatingLabelInput } from "@/components/Ui/TextInput";
import { FloatingLabelTextArea } from "@/components/Ui/TextArea";
import {
  CountdownTimerII,
  ErrorNotification,
  SuccessNotification,
} from "@/utils/reusableComponent";
import { useRouter } from "next/router";
import { CloseII } from "../../../../../public/svg";
import { formatMoney } from "@/utils/formatMoney";
import Image from "next/image";
import PayStack from "@/components/PayStack/payStack";
import { useGiftTicketMutation } from "@/store/Transaction/transactionApi";
import { Controller, useForm } from "react-hook-form";
import { isArray } from "@/utils/helper";
import { returnBothCurrencies } from "@/utils/functions/returnBothCurrencies";
import { selectCurrentUserData, setStripPaidEvent } from "@/store/User";
import { useDispatch, useSelector } from "react-redux";
import { useStripPaymentMutation } from "@/store/others/stripPayment";

export default function GiftTicket({ closeModal, Data, show }) {
  const [giftTicket, { isLoading }] = useGiftTicketMutation();
  const [payWithStrip, { isLoading:stripeLoader }] = useStripPaymentMutation();
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    watch,
    formState: { isValid },
    getValues,
  } = useForm({
    defaultValues: {
      recipient_email: "",
      recipient_name: "",
    },
  });

  console.log(Data,'liveStreamDetailliveStreamDetail')
  const userData = useSelector(selectCurrentUserData) || {};
  const location =userData?.countryInfo?.code==="NG"?'NGN':'USD';
  const checkIfNNigeria = userData?.countryInfo?.code === "NG" ? true : false;
  const stripAmount = returnBothCurrencies({
    HeroSectionEvent: Data,
    returnJustAmount: true,
    userData: userData,
    currencyCode: "USD",
  });
  const ticketPrice=  returnBothCurrencies({currencyCode:location,HeroSectionEvent:Data,userData:userData});
  const isValidateMain = watch("recipient_name") && watch("recipient_email");
  const router = useRouter();
  const handleAction = () => {
    router.push("/event_time_out");
  };
  const handleValidation = (data) => {
    handleGiftTicket(data);
  };
  const stripAmountTest =
    Array.isArray(Data?.tickets) &&
    (Data?.tickets?.find(
      (item) =>
        (item?.currency?.code  === "USD" || item?.code === "USD") &&
        (item?._id || item?.id)
    )?._id ||
      Data?.tickets?.find(
        (item) =>
          (item?.currency?.code === "USD" || item?.code === "USD") &&
          (item?._id || item?.id)
      )?.id);


  // console.log(Data, "Data");

  const handleStripPayment = async () => {
    const payload = {
      amount: stripAmount,
      currency: "usd",
      type: "event",
      eventId: Data?._id,
      ticket_id: stripAmountTest,
      is_gift: true,
      recipient_email: getValues()?.recipient_email,
      user_id: userData?._id,
    };

    const response = await payWithStrip(payload);
    // console.log(response?.data?.url, "responseresponse");
    dispatch(
      setStripPaidEvent({
        ...Data,
        payment: "isPending",
        // isHero: isHero,
        pathUrl: router?.pathname,
        done: false,
        paymentType:'gifting'
      })
    );
    response?.data?.url&&router.replace(response?.data?.url);
  };
  const handleGiftTicket = async (data) => {
    const payload = {
      event_id: Data?._id,
      ticket_id: stripAmountTest,
      message: getValues()?.message,
      recipient_email: getValues()?.recipient_email,
      recipient_name: getValues()?.recipient_name,

      
    };
    // console.log(data, "data");
    const response = await giftTicket(payload);
    // console.log(response, "handleGiftTicket");
    if (response?.data?.error) {
      return ErrorNotification({
        message: isArray(response.data?.message)
          ? response.data?.message[0]
          : response.data?.message,
      });
    }
    if (response?.data?.message === "Ticket has been succesfully gifted") {
      closeModal();
      return SuccessNotification({
        message: response?.data?.message,
      });
    }

    // console.log(response, "handleGiftTicket");
  };

  // console.log(Data, show, "showsshowsshowsshowsshows1");
  return (
    <div className="bg-[#1B1C20] pb-[35px] px-[16px] lg:px-[56px] pt-[16px] lg:pt-[24px] overflow-y-scroll customScrollHorizontal max-h-[90vh]">
      <nav className="flex justify-between items-center mb-[22px]">
        <div className="text-[18px]  text-white">Gift Ticket</div>
        <div className="text-[#63768D] text-[18px] flex items-center gap-[12px]">
          <CountdownTimerII initialTime={5} onTimerEnd={handleAction} />
          <span className="cursor-pointer" onClick={closeModal && closeModal}>
            {" "}
            <CloseII />
          </span>
        </div>
      </nav>

      <main>
        <div className="flex items-center gap-[17px]  mb-[54px]">
          <div>
            <Image
              src={Data?.thumbnail_url || "/webp/bg1.webp"}
              className="w-[89px] h-[89px] object-cover rounded-[8px]"
              width={89}
              height={89}
              alt="show-image"
            />
          </div>
          <div>
            <div className="text-[#63768D] text-[13px] mb-[5px]">
              {Data?.name}
            </div>
            <div className="text-[14px] text-white font500 mb-[5px] lg:w-[100%]">
              {Data?.address}
            </div>
            <div className="text-[14px] text-white font500">
              {/* {Data?.ticket?.code} ₦ */}
              {Data?.ticket?.price === 0
                ? "Ticket is Free"
                : ticketPrice}
            </div>
          </div>
        </div>

        <form className="flex flex-col gap-[16px]">
          {GiftTicketForm()?.map((item, i) => (
            <Controller
              key={i}
              control={control}
              name={item?.name}
              rules={{
                required: item?.required && `${item?.label} is required`,
                pattern: item?.pattern,
              }}
              render={({ field: { onChange, value }, formState: { errors } }) =>
                item?.type === "textarea" ? (
                  <FloatingLabelTextArea
                    label={item?.label}
                    type={item?.type}
                    name={item?.name}
                    value={value}
                    onChange={onChange}
                    error={errors[item?.name]?.message}
                    errors={errors}
                  />
                ) : (
                  <FloatingLabelInput
                    label={item?.label}
                    type={item?.type}
                    name={item?.name}
                    value={value}
                    onChange={onChange}
                    error={errors[item?.name]?.message}
                    errors={errors}
                  />
                )
              }
            />
          ))}
        </form>

        <div className="border-[#343F4B] border-[1px] rounded-[8px] py-[13px] px-[16px] flex flex-col gap-[7px] mb-[35px] mt-[64px]">
          <div className="flex items-center justify-between text-white">
            <div className="text-[13px] text-[#63768D]">Ticket Fee</div>
            <div className="text-[14px]  text-right">{ticketPrice}</div>
          </div>
          <div className="flex items-center justify-between text-white">
            <div className="text-[13px] text-[#63768D]">Service Fee</div>
            <div className="text-[14px]  text-right">0</div>
          </div>
          <div className="flex items-center justify-between text-white mt-[8px]">
            <div className="text-[14px] text-[#FFFFFF]">Total</div>
            <div className="text-[14px]  text-[#FFFFFF]">{ticketPrice}</div>
          </div>
        </div>
        {/* {console.log(Data?.ticket?.price,'DataDataData')} */}
        {Data?.ticket?.price == 0 ? (
          <ButtonComp
            isDisabled={isLoading || !isValidateMain}
            isLoading={isLoading}
            btnText={`Proceed To Make Payment
           ${Data?.ticket?.price === 0 ? "" : Data?.ticket?.code || ""} ${
              Data?.ticket?.price === 0
                ? ""
                : ticketPrice
            } `}
            className={`w-full text-[13px] font500] h-[44px] mt-[20px]`}
            onClick={handleSubmit(handleValidation)}
          />
        ) : (checkIfNNigeria?
          <PayStack
            showDetails={Data}
            proceed={isLoading ? false : isValid}
            customFunction={handleGiftTicket}
          >
            <ButtonComp
              isDisabled={isLoading || !isValid}
              isLoading={isLoading}
              btnText={`Proceed To Make Payment ${
                Data?.ticket?.price === 0 ? "" : Data?.ticket?.code || ""
              } ${ticketPrice} `}
              className={`w-full text-[13px] font500] h-[44px] mt-[20px]`}
              // onClick={handleSubmit(handleValidation)}
            />
          </PayStack>:
          <ButtonComp
          onClick={handleStripPayment}
          isDisabled={!isValid||stripeLoader}
          isLoading={isLoading}
          btnText={`Proceed To Make Payment ${
            Data?.ticket?.price === 0 ? "" : Data?.ticket?.code || ""
          } ${ticketPrice} `}
          className={`w-full text-[13px] font500] h-[44px] mt-[20px]`}
          // onClick={handleSubmit(handleValidation)}
        />
        )}
      </main>
    </div>
  );
}
