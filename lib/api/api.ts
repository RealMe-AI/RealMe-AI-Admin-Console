import { baseUrl } from "./baseUrl";
import axios from "axios";
import { useAuthStore } from "@/store/authStore";
import { API_ROUTES } from "@/lib/api/routes";

type RequestData = object | FormData | undefined;

interface ApiResponseError {
  message?: string | string[];
  error?: string;
}

const getHeaders = (data?: RequestData | unknown) => {
  const token = useAuthStore.getState().accessToken;
  const headers: Record<string, string> = {
    Accept: "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const isFormData =
    data &&
    typeof data === "object" &&
    (data instanceof FormData ||
      data.constructor?.name === "FormData" ||
      Object.prototype.toString.call(data) === "[object FormData]");

  if (!isFormData) {
    headers["Content-Type"] = "application/json";
  }

  return headers;
};

const apiClient = axios.create({
  timeout: 60000,
});

const isAuthRoute = (url?: string) => {
  if (!url) return false;
  return url.includes(API_ROUTES.auth.login);
};

const hardRedirectToLogin = () => {
  if (typeof window !== "undefined") {
    window.location.assign("/login");
  }
};

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (!axios.isAxiosError(error)) throw error;

    const status = error.response?.status;
    const originalRequest = error.config;

    if (!originalRequest || status !== 401) throw error;
    if (isAuthRoute(originalRequest.url)) throw error;

    useAuthStore.getState().clearAuth();
    hardRedirectToLogin();
    throw error;
  },
);

const getUrl = (route: string) => {
  const cleanBase = baseUrl?.endsWith("/")
    ? baseUrl.slice(0, -1)
    : baseUrl || "";
  const cleanRoute = route.startsWith("/") ? route : `/${route}`;
  return `${cleanBase}${cleanRoute}`;
};

export const GetRequest = async <T = unknown>(
  route: string,
  params?: Record<string, unknown>
) => {
  const response = await apiClient.get<T>(getUrl(route), {
    headers: getHeaders(),
    params,
  });
  return response.data;
};

export const PostRequest = async <T = unknown>(
  route: string,
  data: RequestData
) => {
  const response = await apiClient.post<T>(getUrl(route), data, {
    headers: getHeaders(data),
  });
  return response.data;
};

export const PostFormData = async <T = unknown>(
  route: string,
  data: FormData
) => {
  const url = getUrl(route);
  const headers = getHeaders(data);

  const response = await fetch(url, {
    method: "POST",
    headers,
    body: data,
  });

  const responseText = await response.text();

  if (!response.ok) {
    let message = `Request failed with status ${response.status}`;
    try {
      const errorJson = JSON.parse(responseText) as ApiResponseError;
      if (errorJson.message) {
        message = Array.isArray(errorJson.message)
          ? errorJson.message.join(", ")
          : errorJson.message;
      } else if (errorJson.error) {
        message = errorJson.error;
      }
    } catch {
      if (responseText) message = responseText;
    }
    throw new Error(message);
  }

  try {
    return JSON.parse(responseText) as T;
  } catch {
    return responseText as unknown as T;
  }
};

export const PatchRequest = async <T = unknown>(
  route: string,
  data: RequestData
) => {
  const response = await apiClient.patch<T>(getUrl(route), data, {
    headers: getHeaders(data),
  });
  return response.data;
};

export const UploadRequest = async <T = unknown>(
  route: string,
  data: FormData
) => {
  const headers: Record<string, string> = {
    Accept: "application/json",
  };
  const response = await apiClient.post<T>(getUrl(route), data, {
    headers,
    transformRequest: [(formData) => formData],
  });
  return response.data;
};

export const DeleteRequest = async <T = unknown>(
  route: string,
  data?: RequestData
) => {
  const response = await apiClient.delete<T>(getUrl(route), {
    headers: getHeaders(data),
    data,
  });
  return response.data;
};

export const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as ApiResponseError | undefined;
    if (data && typeof data === "object") {
      const message = data.message;
      if (Array.isArray(message)) {
        return message.join(", ");
      }
      if (typeof message === "string") {
        return message;
      }
    }
    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === "string") {
    return error;
  }

  return "An unexpected error occurred";
};
