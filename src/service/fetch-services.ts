/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  CancelTokenSource,
} from "axios";
import ToastAlert from "../helper/toast-alert";

// Create Axios instance with a base URL
const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL as string, // Ensure VITE_BASE_URL is correctly typed
});

// Define types for the handleError function
const handleError = async (error: AxiosError): Promise<any> => {
  if (error.response) {
    const { data, status } = error.response;
    const errorMessage =
      (data as { message?: string })?.message || "Something went wrong";

    console.log("Error status:", status);
    console.log("Error message:", errorMessage);

    if (status === 401) {
      localStorage.clear();
      window.location.href = "/";
      ToastAlert.warning("Session expired, please login again");
    } else {
      ToastAlert.error(errorMessage);
    }
  }
  return Promise.reject(error);
};

// Define types for handleFormData parameters and return type
const handleFormData = async (
  url: string,
  formData: FormData
): Promise<any> => {
  try {
    const source: CancelTokenSource = axios.CancelToken.source();
    const token = localStorage.getItem("userToken");
    if (!token) {
      localStorage.clear();
      throw new Error("No token found");
    }

    const config: AxiosRequestConfig = {
      method: "post",
      url,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        ...api.defaults.headers.common,
        Authorization: token,
      },
      cancelToken: source.token,
    };

    const response: AxiosResponse = await api(config);
    return response.data;
  } catch (error) {
    await handleError(error as AxiosError);
    throw error;
  }
};

// Define types for createHeaders parameters and return type
const createHeaders = async (
  useAuthToken: boolean = true
): Promise<Record<string, string>> => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (useAuthToken) {
    const token = localStorage.getItem("userToken");
    if (!token) {
      localStorage.clear();
      throw new Error("No token found");
    }

    headers.Authorization = token;
  }

  return { ...headers };
};

// Define a map to track ongoing requests
const requestsInProgress: Map<string, CancelTokenSource> = new Map();

// Define types for makeRequest parameters and return type
interface MakeRequestParams {
  method: "GET" | "POST" | "PUT" | "DELETE";
  url: string;
  data?: any;
  useAuthToken?: boolean;
  useAbortController?: boolean;
}

const makeRequest = async ({
  method,
  url,
  data = null,
  useAuthToken = true,
  useAbortController = true,
}: MakeRequestParams): Promise<any> => {
  const source: CancelTokenSource = axios.CancelToken.source();
  const requestKey = `${method}:${url}`;

  if (useAbortController && requestsInProgress.has(requestKey)) {
    requestsInProgress.get(requestKey)?.cancel("Duplicate request");
  }
  requestsInProgress.set(requestKey, source);

  const config: AxiosRequestConfig = {
    method,
    url,
    data,
    headers: await createHeaders(useAuthToken),
    cancelToken: source.token,
  };

  try {
    const response: AxiosResponse = await api(config);
    return response.data;
  } catch (error) {
    return await handleError(error as AxiosError);
  } finally {
    requestsInProgress.delete(requestKey);
  }
};

// Define utility functions for GET and POST requests with types
const postRequest = async (
  url: string,
  data: any = {},
  useAuthToken: boolean = true,
  useAbortController: boolean = true
): Promise<any> => {
  return makeRequest({
    method: "POST",
    url,
    data,
    useAuthToken,
    useAbortController,
  });
};

const getRequest = async (
  url: string,
  useAuthToken: boolean = true,
  useAbortController: boolean = true
): Promise<any> => {
  return makeRequest({
    method: "GET",
    url,
    useAuthToken,
    useAbortController,
  });
};

export { getRequest, handleFormData, makeRequest, postRequest };
