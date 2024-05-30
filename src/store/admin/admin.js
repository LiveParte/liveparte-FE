import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../api/baseUrl";
import { baseQueryWithRetry } from "../api";

export const adminApi = createApi({
  reducerPath: "adminApi",
  // baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  baseQuery: baseQueryWithRetry,
  endpoints: (builder) => ({
    getAdmin: builder.query({
      query: (body) => ({
        url: "/admin/get/all",
        method: "GET",
        body,
      }),
    }),

    addNewAdmin: builder.mutation({
      query: (payload) => ({
        url: "/admin/create",
        method: "POST",
        body: payload,
      }),
      transformResponse: (response) => response.data,
    }),

    updateAdmin: builder.mutation({
      query: (payload) => ({
        url: "/admin/update",
        method: "POST",
        body: payload,
      }),
      transformResponse: (response) => response.data,
    }),


    getSingleAdmin: builder.mutation({
      query: (payload) => ({
        url: `/admin/get`,
        method: "POST",
        body: payload,
      }),
      transformResponse: (response) => response.data,
     
    }),
    
  }),
});

export const { useGetAdminQuery, useAddNewAdminMutation,useGetSingleAdminMutation,useUpdateAdminMutation } = adminApi;
