import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQueryWithRetry } from "../api";
// import { baseQuery } from "../api";



export const stripPaymentApi = createApi({
  reducerPath: "stripPaymentApi",
  baseQuery: baseQueryWithRetry,
  // baseQuery: fetchBaseQuery({ baseUrl: 'https://ipapi.co/json' }),
  endpoints: (builder) => ({
    stripPayment: builder.mutation({
      query: (payload) => ({
        url: "payments/create-checkout-session",
        method: "POST",
        body: payload,
      }),
      // invalidatesTags:['coupon']
    }),
  
  }),
});

export const {
 useStripPaymentMutation

 
} = stripPaymentApi;
