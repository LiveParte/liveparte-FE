import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { baseQuery } from "../api";



export const otherApi = createApi({
  reducerPath: "otherApi",
  // baseQuery: baseQuery,
  baseQuery: fetchBaseQuery({ baseUrl: 'https://ipapi.co/json' }),
  endpoints: (builder) => ({
   
    getUserLocation: builder.query({
      query: () => ({
        url: "/",
        method: "GET",
        // body: payload,
      }),
    }),
  
    
  }),
});

export const {
 useGetUserLocationQuery

 
} = otherApi;
