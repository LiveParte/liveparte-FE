import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithRetry } from "../api";

export const eventApi = createApi({
  reducerPath: "eventApi",
  baseQuery: baseQueryWithRetry,
  tagTypes: ['event', 'singleEvent', 'ondemand', 'eventStream'],
  refetchOnReconnect: true,
  endpoints: (builder) => ({
    getAllEvent: builder.query({
      query: () => ({
        url: `/event?skip=0&limit=20`,
        method: "GET",
      }),
      providesTags: ['event'],
      refetchOnFocus: true // Enable refetch on focus for this query
    }),
    getEventStream: builder.query({
      query: () => ({
        url: `/event/stream?skip=0&limit=10`,
        method: "GET",
      }),
      providesTags: ['eventStream'],
      refetchOnFocus: false // Disable refetch on focus for this query
    }),
    getEventOnDemand: builder.query({
      query: () => ({
        url: `/event/ondemand?skip=0&limit=50`,
        method: "GET",
      }),
      providesTags: ['ondemand'],
      refetchOnFocus: true // Enable refetch on focus for this query
    }),
    getEventUpcoming: builder.query({
      query: () => ({
        url: `/event/upcoming?skip=0&limit=50`,
        method: "GET",
      }),
      // providesTags: ['ondemand'],
      refetchOnFocus: true // Enable refetch on focus for this query
    }),
    getEventHappingToday: builder.query({
      query: () => ({
        url: `/event/happening-today?skip=0&limit=50`,
        method: "GET",
      }),
      // providesTags: ['ondemand'],
      refetchOnFocus: true // Enable refetch on focus for this query
    }),
    //upcoming?skip=0&limit=10
    getEventViaId: builder.query({
      query: (id) => ({
        url: `/event/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: 'singleEvent', id }],
      refetchOnFocus: false // Disable refetch on focus for this query
    }),
    getEventDetailViaId: builder.query({
      query: (id) => ({
        url: `/event/details/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: 'singleEvent', id }],
      refetchOnFocus: false // Enable refetch on focus for this query
    }),
    userShows: builder.query({
      query: (userId) => ({
        url: `/event/myevents/${userId}?skip=0&limit=50`,
        method: "GET",
      }),
      providesTags: (result, error, userId) => [{ type: 'event', userId }],
      refetchOnFocus: false // Disable refetch on focus for this query
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
  useLazyGetEventDetailViaIdQuery,
  useLazyGetEventViaIdQuery,
  useGetEventDetailViaIdQuery,
  useUserShowsQuery,
  useLazyUserShowsQuery,
  useLoginApiMutation,
  useGetEventUpcomingQuery,
  useGetEventHappingTodayQuery
} = eventApi;
