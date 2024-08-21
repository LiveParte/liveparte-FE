import ButtonComp from "@/components/Ui/button";
import { CountdownTimerII, myShowLink } from "@/utils/reusableComponent";
import { useRouter } from "next/router";
import React from "react";
import { CloseII } from "../../../../../public/svg";
import { formatMoney } from "@/utils/formatMoney";
import { PaystackConsumer } from "react-paystack";
import Image from "next/image";
import PayStack from "@/components/PayStack/payStack";
import { useCreatePurchaseMutation } from "@/store/Transaction/transactionApi";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUserData } from "@/store/User";
import { eventApi } from "@/store/Event/eventApi";

export default function CheckOut({
  closeModal,
  Data,
  makePayment,
  componentProps,
  handleClose,
  // handleSuccess,
  IsBought,
  onNext,
}) {
  const router = useRouter()
  const [CreatePurchase, { isLoading: cpLoader }] = useCreatePurchaseMutation();
  const dispatch = useDispatch();
  const userData = useSelector(selectCurrentUserData) || {};

  const handleSuccess = async (reference) => {
    const show =Data;
  
    const payload = {
      event_id: show?._id,
      ticket_id: show?.ticket?.id || show?.ticket?._id,
      user_id: userData?._id,
      purchase_date: new Date(),
    };
    const response = await CreatePurchase(payload);
    if (response?.data?.createdPurchase?._id) {
      dispatch(
        eventApi.util.invalidateTags(["ondemand", "event", "eventStream"])
      );
      // onNext && onNext();
      router.push(myShowLink);
    }
  };
  const handleAction = () => {
    router.push("/event_time_out");
  };

  // Start the countdown timer with 354 seconds (5:54)
  const eventIsPurchase =
    Data?.pruchase?.id || Data?.purchase?.id ? true : false;
  // console.log(Data,'config')

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
            <Image
              src={Data?.thumbnail_url_mobile}
              className="w-[89px] h-[89px] object-cover rounded-[8px]"
              alt="web"
              width={89}
              height={89}
            />
          </div>
          <div>
            <div className="text-[#63768D] text-[13px] mb-[5px] font400">
              {/* {Data?.name} */}
              Livestream ticket
            </div>
            <div className="text-[14px] text-white font500 mb-[5px] capitalize">
              {Data?.name}
            </div>
            <div className="text-[14px] text-white font500">
              {/* {Data?.ticket?.code}{" "} */}
              {Data?.ticket?.price === 0
                ? "Ticket is Free"
                : formatMoney(Data?.ticket?.price || "0", false || "0")}
            </div>
          </div>
        </div>
        {Data?.ticket?.price > 0 ? (
          <PayStack
            isDisabled={eventIsPurchase || !Data?.name}
            showDetails={Data}
            onNext={onNext}
          >
            <ButtonComp
              isDisabled={eventIsPurchase || !Data?.name}
              btnText={
                eventIsPurchase
                  ? `Ticket already purchased`
                  : `Proceed To Make Payment  ${
                      Data?.ticket?.price > 0 ? "- ₦" : ""
                    } ${
                      Data?.ticket?.price
                        ? formatMoney(Data?.ticket?.price || "", false || "0")
                        : ""
                    } `
              }
              className={`w-full text-[13px] font500] h-[44px] `}
              // onClick={() => initializePayment(handleSuccess, handleClose)}
            />
          </PayStack>
        ) : (
          <ButtonComp
            isDisabled={eventIsPurchase || !Data?.name}
            isLoading={cpLoader}
            btnText={
              eventIsPurchase
                ? `Ticket already purchased`
                : `Proceed To Make Payment
            ${Data?.ticket?.price > 0 ? "- ₦" : ""} ${
                    Data?.ticket?.price
                      ? formatMoney(Data?.ticket?.price || "", false || "0")
                      : ""
                  } `
            }
            className={`w-full text-[13px] font500] h-[44px] `}
            onClick={handleSuccess}
          />
        )}
      </main>
    </div>
  );
}
