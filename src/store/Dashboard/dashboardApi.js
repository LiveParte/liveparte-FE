import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../api";

export const dashboardApi = createApi({
  reducerPath: "dashboardApi",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getDashBoardMetrics: builder.query({
      query: (body) => ({
        url: '/admin/dashboard-data',
        method: "GET",
        body,
      }),
    }),
   
    loginApi: builder.mutation({
      query: (payload) => ({
        url: "authentication",
        method: "POST",
        body: payload,
      }),
    }),

    //company/manager/:userId/update
   
  }),
});

export const {
 useGetDashBoardMetricsQuery
 
} = dashboardApi;
