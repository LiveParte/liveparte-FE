import React from "react";
import { usePaystackPayment } from "react-paystack";

const PaystackHookExample = () => {
  const config = {
    reference: new Date().getTime().toString(), // Ensure each transaction has a unique reference
    email: "user@example.com",
    amount: 20000, // Amount is in Kobo. 20000 Kobo = N200
    publicKey: "pk_test_9b34d7cad3b54108b6eb034c951d89366eadcc3d", // Replace with your Paystack public key
  };

  // Handle successful payment
  const onSuccess = (reference) => {
    // console.log('Payment successful, reference:', reference);
    // You can handle post-payment logic here, such as updating the UI or notifying the backend
  };

  // Handle dialog closure
  const onClose = () => {
    // console.log('Payment dialog closed');
    // Handle any action when the payment dialog is closed
  };

  const initializePayment = usePaystackPayment(config);

  return (
    <div>
      <button onClick={() => initializePayment(onSuccess, onClose)}>
        Pay with Paystack
      </button>
    </div>
  );
};

export default PaystackHookExample;
