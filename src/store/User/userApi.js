import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../api";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: baseQuery,
  tagTypes: ["user"],

  endpoints: (builder) => ({
    getUserProfile: builder.query({
      query: (body) => ({
        url: "/auth/profile",
        method: "GET",
        body,
      }),
      providesTags: ["user"],
    }),
    updateProfile: builder.mutation({
      query: (payload) => ({
        url: `/users/${payload?.id}`,
        method: "PATCH",
        body: payload,
        // body,
      }),
      invalidatesTags: ["user"],
      // providesTags:['users']
    }),
    //auth/register
    registerApi: builder.mutation({
      query: (payload) => ({
        url: "/auth/register",
        method: "POST",
        body: payload,
      }),
    }),
    loginApi: builder.mutation({
      query: (payload) => ({
        url: "auth/login",
        method: "POST",
        body: payload,
      }),
    }),
    changePassword: builder.mutation({
      query: (payload) => ({
        url: "auth/change-password",
        method: "POST",
        body: payload,
      }),
      // invalidatesTags: ["user"],
    }),
    restPassword: builder.mutation({
      query: (payload) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: payload,
      }),
      // invalidatesTags: ["user"],
    }),
    forgetPassword: builder.mutation({
      query: (payload) => ({
        url: "auth/forgot-password",
        method: "POST",
        body: payload,
      }),
      // invalidatesTags: ["user"],
    }),
    //users/35
    //company/manager/:userId/update
    //admin/admin-management
    //auth/change-password
  }),
});

export const {
  useLoginApiMutation,
  useUpdateProfileMutation,
  useRegisterApiMutation,
  useGetUserProfileQuery,
  useChangePasswordMutation,
  useForgetPasswordMutation,
  useRestPasswordMutation

} = userApi;
