import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../api";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: baseQuery,
  

  endpoints: (builder) => ({
    getUserProfile: builder.query({
      query: (body) => ({
        url: '/auth/profile',
        method: "GET",
        body,
      }),
    }),
    getUsers: builder.query({
      query: (status='') => ({
        url: `admin/fetch-users${status?`?userType=${status}`:''}`,
        method: "GET",
        // body,
      }),
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
        url: "authentication",
        method: "POST",
        body: payload,
      }),
    }),
    
    
//users/35
    //company/manager/:userId/update
    //admin/admin-management
   
  }),
});

export const {
 useLoginApiMutation,
 useGetUsersQuery,
 useRegisterApiMutation,
 useGetUserProfileQuery
 
} = userApi;
