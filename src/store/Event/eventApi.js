import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithRetry } from "../api";

export const eventApi = createApi({
  reducerPath: "eventApi",
  baseQuery: baseQueryWithRetry,
  tagTypes: ['event', 'singleEvent', 'ondemand', 'eventStream'],
  refetchOnReconnect: true,
  refetchOnFocus: true,
  endpoints: (builder) => ({
    getAllEvent: builder.query({
      query: () => ({
        url: `/event?skip=0&limit=20`,
        method: "GET",
      }),
      providesTags: ['event']
    }),
    getEventStream: builder.query({
      query: () => ({
        url: `/event/stream?skip=0&limit=10`,
        method: "GET",
      }),
      providesTags: ['eventStream']
    }),
    getEventOnDemand: builder.query({
      query: () => ({
        url: `/event/ondemand?skip=0&limit=10`,
        method: "GET",
      }),
      providesTags: ['ondemand']
    }),
    getEventViaId: builder.query({
      query: (id) => ({
        url: `/event/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: 'singleEvent', id }]
    }),
    getEventDetailViaId: builder.query({
      query: (id) => ({
        url: `/event/details/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: 'singleEvent', id }]
    }),
    userShows: builder.query({
      query: (userId) => ({
        url: `/event/myevents/${userId}?skip=0&limit=30`,
        method: "GET",
      }),
      providesTags: (result, error, userId) => [{ type: 'event', userId }]
    }),
    loginApi: builder.mutation({
      query: (payload) => ({
        url: "/auth/login",
        method: "POST",
        body: payload,
      }),
    }),
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
