import { fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "./baseApi/baseUrl";
import { isValidJson, storage } from "../utils/helper";


// Create our baseQuery instance
export const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token =  storage["localStorage"].get('RechargeMater_accessToken');
   
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
  validateStatus: (status) => {
    if (status.status === 401) {
      storage["localStorage"].remove("RechargeMater_accessToken");
      // storage["localStorage"].remove("user_type");
      storage["localStorage"].remove("RechargeMater_User");
     
      setTimeout(() => {
      }, 2000);
    
      throw new Error("Unauthorized");
    }
    return status;
    // return status >= 200 && status < 300;
  },
});

export const baseQueryWithRetry = retry(baseQuery, { maxRetries: 1 });
