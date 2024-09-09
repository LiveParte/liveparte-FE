import { logout, selectCurrentUserData } from "@/store/User";
import React from "react";
import { PaystackConsumer } from "react-paystack";
import { useDispatch, useSelector } from "react-redux";
import { useCreatePurchaseMutation } from "@/store/Transaction/transactionApi";
import { myShowLink } from "@/utils/reusableComponent";
import { useRouter } from "next/router";
import { isArray } from "@/utils/helper";
import {
  useGetUserProfileQuery,
  useLazyGetUserProfileQuery,
} from "@/store/User/userApi";
import { eventApi } from "@/store/Event/eventApi";
import { payStack } from "@/store/baseApi/baseUrl";

//customFunction: this is to make a call from the out, if this is available it wont read the next link

export default function PayStack({
  showDetails,
  onNext,
  children,
  isDisabled,
  customFunction,
  proceed = true,
  amount,
  type,
}) {
  const userData = useSelector(selectCurrentUserData) || {};
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const [CreatePurchase, { isLoading: cpLoader }] = useCreatePurchaseMutation();
  const [checkProfile, { isLoading: cpLoading }] = useLazyGetUserProfileQuery();

  const {
    data: userProfileData,
    isLoading: userProfileLoader,
    isSuccess,
  } = useGetUserProfileQuery(undefined, {
    skip: !userData?._id,
  });
  // console.log(amount,'amount')
  const show = {
    ...showDetails,
    ticket: isArray(showDetails?.tickets)
      ? showDetails?.tickets[0]
      : showDetails?.ticket,
  };
  // console.log(userData,'DataDataData')
  const config = {
    reference: new Date().getTime().toString(),
    email: userData?.email,
    amount: Number(amount * 100 || show?.ticket?.price * 100), //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
    publicKey: payStack,
    // publicKey: "pk_test_9b34d7cad3b54108b6eb034c951d89366eadcc3d",

    metadata: {
      custom_fields: [
        {
          event_id: show?._id,
          ticket_id: show?.ticket?._id,
          purchase_date: new Date(),
        },
        // To pass extra metadata, add an object with the same fields as above
      ],
    },
  };

  const handleSuccess = async (reference) => {
    if (customFunction) {
      return customFunction();
    }
    // Implementation for whatever you want to do with reference and after success call.
    // console.log(reference);
    const payload = {
      event_id: show?._id,
      ticket_id: show?.ticket?.id || show?.ticket?._id,
      user_id: userData?._id,
      purchase_date: new Date(),
      recipient_email: userData?.email,
      is_gift: false,
    };
    const response = await CreatePurchase(payload);
    // console.log(response,'CreatePurchase')
    if (response?.data?.createdPurchase?._id) {
      dispatch(
        eventApi.util.invalidateTags(["ondemand", "event", "eventStream"])
      );
      onNext && onNext();
      router.push(myShowLink);
    }
  };

  // you can call this function anything
  const handleClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    // console.log("closed");
  };

  const componentProps = {
    ...config,
    text: type || "Event Payment",
    onSuccess: (reference) => handleSuccess(reference),
    onClose: handleClose,
  };

  const handelCheckIfUserTokenIsValid = async () => {
    // if (proceed && isSuccess) {
    //   const response = await checkProfile();
    //   console.log(response?.data, "responseresponse");
    //   return true;
    // }
    // dispatch(logout());
    return true;
  };

  return (
    <PaystackConsumer {...componentProps}>
      {({ initializePayment }) => (
        <div
          className="w-full cursor-pointer"
          disabled={isDisabled}
          onClick={() =>
            handelCheckIfUserTokenIsValid()
              ? initializePayment(handleSuccess, handleClose)
              : {}
          }
        >
          {children}
        </div>
      )}
    </PaystackConsumer>
  );
}
