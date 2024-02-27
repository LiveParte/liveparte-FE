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
    getTransactionViaId: builder.query({
      query: ({id='',transactionType="",transactionStatus="",startDate="",endDate=""}) => ({
        //transactionType transactionStatus=Successful
        url: `admin/transaction-history${id?`?userId=${id}`:''}${transactionType?`${useQuestionMarkOrAnd(id)}transactionType=${transactionType}`:''}${transactionStatus?`${useQuestionMarkOrAnd(transactionType,id)}transactionStatus=${transactionStatus}`:''}${startDate?`${useQuestionMarkOrAnd(transactionStatus,id,transactionType)}startDate=${startDate}`:''}${endDate?`${useQuestionMarkOrAnd(startDate)}endDate=${endDate}`:''}`,
        method: "GET",
        // body,
      }),
    }),
    getFundHistory: builder.query({
      query: ({
        paymentMethod='',
        transactionStatus='',
        startDate="",
        endDate=""
      }) => ({
        url: `admin/funding-history${paymentMethod?`?paymentMethod=${paymentMethod}`:''}${transactionStatus?`${useQuestionMarkOrAnd(paymentMethod)}transactionStatus=${transactionStatus}`:''}${startDate?`${useQuestionMarkOrAnd(transactionStatus,paymentMethod)}startDate=${startDate}`:''}${endDate?`${useQuestionMarkOrAnd(startDate)}endDate=${endDate}`:''}`,
        method: "GET",
        // body,
      }),
    }),
    getWalletTransfer: builder.query({
      query: ({id='',startDate='',endDate="",transactionStatus=""}) => ({
        url: `admin/wallet-transfer-history${transactionStatus?`?transactionStatus=${transactionStatus}`:''}${startDate?`${useQuestionMarkOrAnd(transactionStatus)}startDate=${startDate}`:''}${endDate?`?endDate=${endDate}`:''}`,
        method: "GET",
        // body,
      }),
    }),
    getPromo: builder.query({
      query: (id='') => ({
        url: `admin/coupon-management`,
        method: "GET",
        // body,
      }),
      providesTags:['coupon']
    }),
    getAllEnum: builder.query({
      query: (id='') => ({
        url: `globalservice/all-enums`,
        method: "GET",
        // body,
      }),
    }),
    addPromoCode: builder.mutation({
      query: (payload) => ({
        url: "admin/coupon-management",
        method: "POST",
        body: payload,
      }),
      invalidatesTags:['coupon']
    }),
    EditPromoCode: builder.mutation({
      query: (payload) => ({
        url: `admin/coupon-management/${payload.id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags:['coupon']
    }),
    getCouponBeneficiary: builder.query({
      query: (id) => ({
        url: `admin/promo-beneficiary?promoId=${id}`,
        method: "GET",
        // body: payload,
      }),
   
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
 useGetTransactionViaIdQuery,
 useGetFundHistoryQuery,
 useGetWalletTransferQuery,
 useGetPromoQuery,
 useGetAllEnumQuery,
 useAddPromoCodeMutation,
 useEditPromoCodeMutation,
 useGetCouponBeneficiaryQuery
 
} = transactionApi;
