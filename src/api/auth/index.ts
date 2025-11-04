import { http } from "@/lib/http";
import { buildUrl, endpoints } from "@/lib/endpoints";

export type LoginPayload = { email: string; password: string };
export type RegisterPayload = { email: string; password: string; name: string };

export async function login(payload: LoginPayload) {
  const { data } = await http.post(buildUrl(endpoints.auth.login), payload);
  return data;
}

export async function register(payload: RegisterPayload) {
  const { data } = await http.post(buildUrl(endpoints.auth.register), payload);
  return data;
}

export async function fetchMe() {
  const { data } = await http.get(buildUrl(endpoints.auth.me));
  return data;
}

export async function logout() {
  const { data } = await http.post(buildUrl(endpoints.auth.logout));
  return data;
}
