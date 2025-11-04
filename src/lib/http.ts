import axios, { AxiosRequestHeaders } from "axios";
import Cookies from "js-cookie";
import { API_BASE_URL } from "./endpoints";

export const http = axios.create({
  baseURL: API_BASE_URL || undefined,
  withCredentials: true,
});

http.interceptors.request.use((config) => {
  const token = Cookies.get("access_token");
  if (token) {
    config.headers = config.headers || ({} as AxiosRequestHeaders);
    (config.headers as any)["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

http.interceptors.response.use(
  (res) => res,
  async (error) => {
    return Promise.reject(error);
  }
);
