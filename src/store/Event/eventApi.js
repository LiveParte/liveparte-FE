import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithRetry } from "../api";


// const useQuestionMarkOrAnd= (itemA='',itemB='',itemC='')=>{
//   let Symbol =itemA||itemB||itemC?'&':'?'
//   return Symbol;
// }

export const eventApi = createApi({
  reducerPath: "eventApi",
  baseQuery: baseQueryWithRetry,
  refetchOnReconnect:true,
  refetchOnFocus:true,
  tagTypes:['event','singleEvent','ondemand','eventStream'],
  endpoints: (builder) => ({
   
    getAllEvent: builder.query({
      query: (id='') => ({
        url: `/event?skip=0&limit=20`,
        method: "GET",
        // body,
      }),
      providesTags:['event']
      
    }),
    getEventStream: builder.query({
      query: (id='') => ({
        url: `/event/stream?skip=0&limit=10`,
        method: "GET",
        // body,
      }),
      providesTags:['eventStream']
      
    }),
    getEventOnDemand: builder.query({
      query: (id='') => ({
        url: `/event/ondemand?skip=0&limit=10`,
        method: "GET",
        // body,
      }),
      providesTags:['ondemand']
      
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
      invalidatesTags:['singleEvent']
      
    }),
    userShows: builder.query({
      query: (userId='') => ({
        url: `/event/myevents/${userId}?skip=0&limit=30`,
        method: "GET",
        // body,
      }),
      
    }),
    loginApi: builder.mutation({
      query: (payload) => ({
        url: "/auth/login",
        method: "POST",
        body: payload,
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
useGetEventDetailViaIdQuery,
useUserShowsQuery,
useLazyUserShowsQuery,
useLoginApiMutation
 
} = eventApi;
