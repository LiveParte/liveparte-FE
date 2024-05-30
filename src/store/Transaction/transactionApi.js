import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithRetry } from "../api";


const useQuestionMarkOrAnd= (itemA='',itemB='',itemC='')=>{
  let Symbol =itemA||itemB||itemC?'&':'?'
  return Symbol;
}

export const transactionApi = createApi({
  reducerPath: "transactionApi",
  baseQuery: baseQueryWithRetry,
  tagTypes:['coupon'],
  endpoints: (builder) => ({
   
    createPurchase: builder.mutation({
      query: (payload) => ({
        url: "/purchase",
        method: "POST",
        body: payload,
      }),
      invalidatesTags:['coupon']
    }),
    giftTicket: builder.mutation({
      query: (payload) => ({
        url: "/purchase/gift",
        method: "POST",
        body: payload,
      }),
      invalidatesTags:['coupon']
    }),
    getAllCoins: builder.query({
      query: () => ({
        url: "/coins?skip=0&limit=10",
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    purchaseCoins: builder.mutation({
      query: (payload) => ({
        url: `coins/${payload?.userId}/payment-successful`,
        method: "POST",
        body: {
          amountPaid:payload?.amountPaid
        },
      }),
      // invalidatesTags:['coupon']
    }),
    giftCoins: builder.mutation({
      query: (payload) => ({
        url: `coins/${payload?.userId}/gift/${payload?.eventId}`,
        method: "POST",
        body: {
          coins:payload?.coins
        },
      }),
      // invalidatesTags:['coupon']
    }),
    //globalservice/all-enums
    //admin/funding-history
    //admin/promo-beneficiary
    //admin/wallet-transfer-history
   //admin/coupon-management/:recordId
   //admin/promo-beneficiary?promoId=3
  }),
});

export const {
 
 useCreatePurchaseMutation,
 useGiftTicketMutation,
 useGetAllCoinsQuery,
 usePurchaseCoinsMutation,
 useGiftCoinsMutation

 
} = transactionApi;
