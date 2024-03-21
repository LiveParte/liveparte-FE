import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../api";


const useQuestionMarkOrAnd= (itemA='',itemB='',itemC='')=>{
  let Symbol =itemA||itemB||itemC?'&':'?'
  return Symbol;
}

export const eventApi = createApi({
  reducerPath: "eventApi",
  baseQuery: baseQuery,
  tagTypes:['coupon'],
  endpoints: (builder) => ({
   
    getAllEvent: builder.query({
      query: (id='') => ({
        url: `/event?skip=0&limit=20`,
        method: "GET",
        // body,
      }),
      
    }),
    getEventStream: builder.query({
      query: (id='') => ({
        url: `/event/stream?skip=0&limit=10`,
        method: "GET",
        // body,
      }),
      
    }),
    getEventOnDemand: builder.query({
      query: (id='') => ({
        url: `/event/ondemand?skip=0&limit=10`,
        method: "GET",
        // body,
      }),
      
    }),
    getEventViaId: builder.query({
      query: (id='') => ({
        url: `/event/${id}`,
        method: "GET",
        // body,
      }),
      
    }),
    getEventDetailViaId: builder.query({
      query: (id='') => ({
        url: `/event/details/${id}`,
        method: "GET",
        // body,
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
useGetAllEventQuery,
useGetEventOnDemandQuery,
useGetEventStreamQuery,
useGetEventViaIdQuery,
useGetEventDetailViaIdQuery
 
} = eventApi;
