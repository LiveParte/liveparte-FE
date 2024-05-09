import { selectCurrentUserData } from "@/store/User";
import React from "react";
import { PaystackConsumer } from "react-paystack";
import { useSelector } from "react-redux";
import { useCreatePurchaseMutation } from "@/store/Transaction/transactionApi";
import { myShowLink } from "@/utils/reusableComponent";
import { useRouter } from "next/router";
import { isArray } from "@/utils/helper";

//customFunction: this is to make a call from the out, if this is available it wont read the next link

export default function PayStack({ showDetails, onNext, children,isDisabled,customFunction,proceed=true,amount,type}) {
  const userData = useSelector(selectCurrentUserData) || {};
  const router =useRouter();
  const [CreatePurchase, { isLoading: cpLoader }] = useCreatePurchaseMutation();

  // console.log(amount,'amount')
  const show={...showDetails,ticket:isArray(showDetails?.tickets)?showDetails?.tickets[0]:showDetails?.ticket};
//   console.log(show,showDetails,'hello')
  const config = {
    reference: new Date().getTime().toString(),
    email: userData?.email,
    amount:Number(amount * 100|| show?.ticket?.price * 100), //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
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
    if(customFunction){
      return customFunction()
    }
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
    // console.log("closed");
  };

  const componentProps = {
    ...config,
    text:type|| "Event Payment",
    onSuccess: (reference) => handleSuccess(reference),
    onClose: handleClose,
  };

  return (
    <PaystackConsumer {...componentProps}>
      {({ initializePayment }) => (

        <div className="w-full cursor-pointer" disabled={isDisabled} onClick={() =>proceed? initializePayment(handleSuccess, handleClose):{}}>
          {children}
        </div>
      )}
    </PaystackConsumer>
  );
}
