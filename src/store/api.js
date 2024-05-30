import { fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "./baseApi/baseUrl";
import {
  accessTokenStorageName,
  decryptText,
  storage,
  userDetailStorageName,
} from "../utils/helper";
import { logout } from "./User";

// Create our baseQuery instance
 const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  
  prepareHeaders: (headers, { getState }) => {
    const token = decryptText(storage.localStorage.get(accessTokenStorageName));

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },

});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
 
  if (result.error && result.error.status === 401) {
    api.dispatch(logout());
    storage["localStorage"].remove(accessTokenStorageName);
    storage["localStorage"].remove(userDetailStorageName);
  
  }

  return result;
};

export const baseQueryWithRetry = retry(baseQueryWithReauth, { maxRetries: 0 });
