import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../api";


const useQuestionMarkOrAnd= (itemA='',itemB='',itemC='')=>{
  let Symbol =itemA||itemB||itemC?'&':'?'
  return Symbol;
}

export const transactionApi = createApi({
  reducerPath: "transactionApi",
  baseQuery: baseQuery,
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

 
} = transactionApi;
