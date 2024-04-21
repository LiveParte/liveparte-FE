import { selectCurrentUserData } from "@/store/User";
import React from "react";
import { PaystackConsumer } from "react-paystack";
import { useSelector } from "react-redux";
import { useCreatePurchaseMutation } from "@/store/Transaction/transactionApi";
import { myShowLink } from "@/utils/reusableComponent";
import { useRouter } from "next/router";
import { isArray } from "@/utils/helper";

export default function PayStack({ showDetails, onNext, children,isDisabled }) {
  const userData = useSelector(selectCurrentUserData) || {};
  const router =useRouter();
  const [CreatePurchase, { isLoading: cpLoader }] = useCreatePurchaseMutation();
  const show={...showDetails,ticket:isArray(showDetails?.tickets)?showDetails?.tickets[0]:showDetails?.ticket};
//   console.log(show,showDetails,'hello')
  const config = {
    reference: new Date().getTime().toString(),
    email: userData?.email,
    amount: show?.ticket?.price * 100, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
    publicKey: "pk_test_9b34d7cad3b54108b6eb034c951d89366eadcc3d",
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

  // console.log(show,showDetails,'config')
  // you can call this function anything
  const handleSuccess = async (reference) => {
    // Implementation for whatever you want to do with reference and after success call.
    // console.log(reference);
    const payload = {
      event_id: show?._id,
      ticket_id: show?.ticket?._id,
      user_id: userData?._id,
      purchase_date: new Date(),
    };
    const response = await CreatePurchase(payload);
    if (response?.data?.createdPurchase?._id) {
      onNext && onNext();
      router.push(myShowLink);
    }
  };

  // you can call this function anything
  const handleClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log("closed");
  };

  const componentProps = {
    ...config,
    text: "Event Payment",
    onSuccess: (reference) => handleSuccess(reference),
    onClose: handleClose,
  };

  return (
    <PaystackConsumer {...componentProps}>
      {({ initializePayment }) => (

        <button className="w-full" disabled={isDisabled} onClick={() => initializePayment(handleSuccess, handleClose)}>
          {children}
        </button>
      )}
    </PaystackConsumer>
  );
}
