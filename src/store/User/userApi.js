import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../api";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: baseQuery,
  tagTypes:['users','coupon','admin'],

  endpoints: (builder) => ({
    getUserProfile: builder.query({
      query: (body) => ({
        url: '/user/profile',
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
      providesTags:['users']
    }),
    
    loginApi: builder.mutation({
      query: (payload) => ({
        url: "authentication",
        method: "POST",
        body: payload,
      }),
    }),
      ChangeUserStatus: builder.mutation({
      query: ({
        id:id,status
      }) => ({
        url: `users/${id}`,
        method: "PATCH",
        body: {
          "isActive": status 
        },
      }),
      invalidatesTags:['users']
    }),
    getAllAdmin: builder.query({
      query: (payload) => ({
        url: "admin/admin-management",
        method: "GET",
        body: payload,
      }),
      providesTags:['admin']
    }),
    addAdminUser: builder.mutation({
      query: (payload) => ({
        url: "admin/admin-management",
        method: "POST",
        body: payload,
      }),
      invalidatesTags:['admin']
    }),
//users/35
    //company/manager/:userId/update
    //admin/admin-management
   
  }),
});

export const {
 useLoginApiMutation,
 useGetUsersQuery,
 useChangeUserStatusMutation,
 useGetAllAdminQuery,
 useAddAdminUserMutation
 
} = userApi;
