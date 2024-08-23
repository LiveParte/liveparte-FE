import ButtonComp from "@/components/Ui/button";
import { CountdownTimerII, myShowLink } from "@/utils/reusableComponent";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { CloseII } from "../../../../../public/svg";
import { formatMoney } from "@/utils/formatMoney";
import { PaystackConsumer } from "react-paystack";
import Image from "next/image";
import PayStack from "@/components/PayStack/payStack";
import { useCreatePurchaseMutation } from "@/store/Transaction/transactionApi";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentUserData,
  selectStripPaidEvent,
  setStripPaidEvent,
} from "@/store/User";
import { eventApi } from "@/store/Event/eventApi";
import { useStripPaymentMutation } from "@/store/others/stripPayment";
import { returnBothCurrencies } from "@/utils/functions/returnBothCurrencies";

export default function CheckOut({
  closeModal,
  Data,
  makePayment,
  componentProps,
  handleClose,
  // handleSuccess,
  IsBought,
  onNext,
  isHero = true,
}) {
  const router = useRouter();
  const [CreatePurchase, { isLoading: cpLoader }] = useCreatePurchaseMutation();
  const [payWithStrip, { isLoading }] = useStripPaymentMutation();
  const dispatch = useDispatch();
  const userData = useSelector(selectCurrentUserData) || {};
  const location = userData?.countryInfo?.code === "NG" ? "NGN" : "USD";
  const ticketPrice = returnBothCurrencies({
    HeroSectionEvent: Data,
    userData: userData,
    currencyCode: location,
  });
  const stripAmount = returnBothCurrencies({
    HeroSectionEvent: Data,
    returnJustAmount: true,
    userData: userData,
    currencyCode: "USD",
  });
  const stripAmountTest =
    Array.isArray(Data?.tickets) &&
    Data?.tickets?.find((item) => item?.currency?.code === "USD")?._id;
  // useEffect(() => {
  //   if (getPayEvent?.payment === "success") {
  //     handleSuccess();
  //   }
  // }, [getPayEvent?.payment]);

  const handleSuccess = async (reference) => {
    const show = Data;

    const payload = {
      event_id: show?._id,
      ticket_id: show?.ticket?.id || show?.ticket?._id,
      user_id: userData?._id,
      purchase_date: new Date(),
      recipient_email: userData?.email,
      is_gift: false,
    };
    const response = await CreatePurchase(payload);
    if (response?.data?.createdPurchase?._id) {
      dispatch(
        eventApi.util.invalidateTags(["ondemand", "event", "eventStream"])
      );
      // dispatch(setStripPaidEvent(null));
      // onNext && onNext();
      router.push(myShowLink);
    }
  };

  // console.log(stripAmountTest,'stripAmountTeststripAmountTest')

  const handleStripPayment = async () => {
    const payload = {
      amount: stripAmount,
      currency: "usd",
      type: "event",
      event_id: Data?._id,
      ticket_id: stripAmountTest,
      is_gift: false,
      recipient_email: userData?.email,
      user_id: userData?._id,
    };
    const response = await payWithStrip(payload);
    // console.log(response?.data?.url, "responseresponse");
    dispatch(
      setStripPaidEvent({
        ...Data,
        payment: "isPending",
        isHero: isHero,
        pathUrl: router?.pathname,
        done: false,
      })
    );
    router.replace(response?.data?.url);
  };
  const handleAction = () => {
    router.push("/event_time_out");
  };

  // Start the countdown timer with 354 seconds (5:54)
  const eventIsPurchase =
    Data?.pruchase?.id || Data?.purchase?.id ? true : false;
  const checkIfNNigeria = userData?.countryInfo?.code === "NG" ? true : false;
  // console.log(Data,'config')
  //returnBothCurrencies('NGN',HeroSectionEvent)
  console.log(stripAmount, ticketPrice, "userDatauserDatauserDatauserData123");
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
        <div className="flex items-center gap-[17px]  mb-[57px]">
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
              {
                Data?.ticket?.price === 0 ? "Ticket is Free" : ticketPrice
                //  formatMoney(Data?.ticket?.price || "0", false || "0")
              }
            </div>
          </div>
        </div>
        <div className="border-[#343F4B] border-[1px] rounded-[8px] py-[13px] px-[16px] flex flex-col gap-[7px] mb-[35px]">
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
        {Data?.ticket?.price > 0 ? (
          checkIfNNigeria ? (
            <PayStack
              isDisabled={false || eventIsPurchase || !Data?.name}
              showDetails={Data}
              onNext={onNext}
            >
              <ButtonComp
                isLoading={cpLoader || isLoading}
                isDisabled={eventIsPurchase || !Data?.name}
                btnText={
                  eventIsPurchase
                    ? `Ticket already purchased`
                    : `Proceed To Make Payment  ${
                        Data?.ticket?.price > 0 ? "-" : ""
                      } ${Data?.ticket?.price ? ticketPrice : ""} `
                }
                className={`w-full text-[13px] font500] h-[44px] `}
                // onClick={() => initializePayment(handleSuccess, handleClose)}
              />
            </PayStack>
          ) : (
            <ButtonComp
              isDisabled={eventIsPurchase || !Data?.name}
              isLoading={cpLoader || isLoading}
              btnText={
                eventIsPurchase
                  ? `Ticket already purchased`
                  : `Proceed To Make Payment
           ${Data?.ticket?.price > 0 ? "- " : ""} ${
                      Data?.ticket?.price ? ticketPrice : ""
                    } `
              }
              className={`w-full text-[13px] font500] h-[44px] `}
              onClick={handleStripPayment}
            />
          )
        ) : (
          <ButtonComp
            isDisabled={eventIsPurchase || !Data?.name}
            isLoading={cpLoader || isLoading}
            btnText={
              eventIsPurchase
                ? `Ticket already purchased`
                : `Proceed To Make Payment
            ${Data?.ticket?.price > 0 ? "-" : ""} ${
                    Data?.ticket?.price ? ticketPrice : ""
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
