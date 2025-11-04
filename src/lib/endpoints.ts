function normalizeBaseUrl(raw?: string): string {
  if (!raw) return "";
  let url = raw.trim();
  if (!/^https?:\/\//i.test(url)) {
    url = `http://${url}`;
  }
  if (url.endsWith("/")) url = url.slice(0, -1);
  return url;
}

export const API_BASE_URL = normalizeBaseUrl(process.env.NEXT_PUBLIC_BASEURL);

export const endpoints = {
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    refresh: "/auth/refresh",
    me: "/auth/me",
    logout: "/auth/logout",
  },
};

export function buildUrl(path: string): string {
  if (!API_BASE_URL) return path;
  return `${API_BASE_URL}${path}`;
}
