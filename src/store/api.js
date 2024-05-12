import { fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "./baseApi/baseUrl";
import {
  accessTokenStorageName,
  decryptText,
  storage,
  userDetailStorageName,
} from "../utils/helper";

// Create our baseQuery instance
export const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = decryptText(storage.localStorage.get(accessTokenStorageName));

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
  validateStatus: (status) => {
    if (status.status === 420) {
      storage["localStorage"].remove(accessTokenStorageName);
      // storage["localStorage"].remove("user_type");
      storage["localStorage"].remove(userDetailStorageName);
      throw new Error("Unauthorized");
    }
    return status;
    // return status >= 200 && status < 300;
  },
});

export const baseQueryWithRetry = retry(baseQuery, { maxRetries: 1 });
