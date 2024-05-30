import ButtonComp from "@/components/Ui/button";
import React from "react";
import { GiftTicketForm } from "../Data";
import { FloatingLabelInput } from "@/components/Ui/TextInput";
import { FloatingLabelTextArea } from "@/components/Ui/TextArea";
import { CountdownTimerII, ErrorNotification, SuccessNotification } from "@/utils/reusableComponent";
import { useRouter } from "next/router";
import { CloseII } from "../../../../../public/svg";
import { formatMoney } from "@/utils/formatMoney";
import Image from "next/image";
import PayStack from "@/components/PayStack/payStack";
import { useGiftTicketMutation } from "@/store/Transaction/transactionApi";
import { Controller, useForm } from "react-hook-form";
import { isArray } from "@/utils/helper";

export default function GiftTicket({ closeModal, Data, show }) {
  const [giftTicket, { isLoading }] = useGiftTicketMutation();
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
  const router = useRouter();
  const handleAction = () => {
    router.push("/event_time_out");
  };
  const handleValidation = (data) => {
    handleGiftTicket(data);
  };

  // console.log(Data, "Data");

  const handleGiftTicket = async (data) => {
    const payload = {
      event_id: Data?._id,
      ticket_id: Data?.ticket?._id|| Data?.ticket?.id,
      message:getValues()?.message,
      recipient_email:getValues()?.recipient_email,
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
    if(response?.data?.message==="Ticket has been succesfully gifted") {
      closeModal()
      return SuccessNotification({
        message:response?.data?.message
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
              :formatMoney(Data?.ticket?.price, false || "0")}
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
                required:item?.required&& `${item?.label} is required`,
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
        {console.log(Data?.ticket?.price,'DataDataData')}
        {Data?.ticket?.price==0?
        <ButtonComp
        isDisabled={isLoading||!isValid}
        isLoading={isLoading}
          btnText={`Proceed To Make Payment
           ${Data?.ticket?.price === 0?'':
            Data?.ticket?.code || ""
          } ${Data?.ticket?.price === 0?'':formatMoney(Data?.ticket?.price || "0", false || "0")} `}
          className={`w-full text-[13px] font500] h-[44px] mt-[20px]`}
          onClick={handleSubmit(handleValidation)}
        />
       : 
        <PayStack
          showDetails={Data}
          proceed={isLoading?false:isValid}
          customFunction={handleGiftTicket}
        >
          <ButtonComp
          isDisabled={isLoading||!isValid}
          isLoading={isLoading}
            btnText={`Proceed To Make Payment ${Data?.ticket?.price === 0?'':
              Data?.ticket?.code || ""
            } ${formatMoney(Data?.ticket?.price || "0", false || "0")} `}
            className={`w-full text-[13px] font500] h-[44px] mt-[20px]`}
            onClick={handleSubmit(handleValidation)}
          />
        </PayStack>}
      </main>
    </div>
  );
}
