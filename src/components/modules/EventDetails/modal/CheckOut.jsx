import ButtonComp from "@/components/Ui/button";
import { CountdownTimerII } from "@/utils/reusableComponent";
import { useRouter } from "next/router";
import React from "react";
import { CloseII } from "../../../../../public/svg";
import { formatMoney } from "@/utils/formatMoney";
import { PaystackConsumer } from "react-paystack";

export default function CheckOut({
  closeModal,
  Data,
  makePayment,
  componentProps,
  handleClose,
  handleSuccess,
}) {
  const router = useRouter();
  const handleAction = () => {
    router.push("/event_time_out");
  };

  // console.log(Data,'Data')
  // Start the countdown timer with 354 seconds (5:54)

  return (
    <div className="bg-[#1B1C20] pb-[56px] px-[16px] lg:px-[56px] pt-[16px] lg:pt-[24px]">
      <nav className="flex justify-between items-center mb-[32px]">
        <div className="text-[18px]  text-white">Checkout</div>
        <div className="text-[#63768D] text-[18px] flex gap-[20px]">
          <CountdownTimerII initialTime={5} onTimerEnd={handleAction} />
          <span className="cursor-pointer" onClick={closeModal}>
            {" "}
            <CloseII />
          </span>
        </div>
      </nav>

      <main>
        <div className="flex items-center gap-[17px]  mb-[56px]">
          <div>
            <img
              src={Data?.thumbnail_url || "/webp/bg1.webp"}
              className="w-[89px] h-[89px] object-cover rounded-[8px]"
            />
          </div>
          <div>
            <div className="text-[#63768D] text-[13px] mb-[5px]">
              Livestream ticket
            </div>
            <div className="text-[14px] text-white font500 mb-[5px]">
              {Data?.address}
            </div>
            <div className="text-[14px] text-white font500">
              {Data?.ticket?.code}{" "}
              {formatMoney(Data?.ticket?.price, false || "0")}{" "}
            </div>
          </div>
        </div>
        <PaystackConsumer {...componentProps} >
          {({initializePayment}) =>
           <ButtonComp
              btnText={`Proceed To Make Payment ${
                Data?.ticket?.code
              } ${formatMoney(Data?.ticket?.price, false || "0")} `}
              className={`w-full text-[13px] font500] h-[44px] `}
              onClick={() => initializePayment(handleSuccess, handleClose)}
            />
          //  <button onClick={() => initializePayment(handleSuccess, handleClose)}>Paystack Consumer Implementation</button>
          }
        </PaystackConsumer>
        {/* <PaystackConsumer {...componentProps}>
          {({ initializePayment }) => (
            <button onClick={() => initializePayment(handleSuccess, handleClose)}>Paystack Consumer Implementation</button>
            // <ButtonComp
            //   btnText={`Proceed To Make Payment ${
            //     Data?.ticket?.code
            //   } ${formatMoney(Data?.ticket?.price, false || "0")} `}
            //   className={`w-full text-[13px] font500] h-[44px] `}
            //   onClick={() => initializePayment(handleSuccess, handleClose)}
            // />
          )}{" "}
        </PaystackConsumer> */}
      </main>
    </div>
  );
}
