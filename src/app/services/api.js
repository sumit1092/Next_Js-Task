import axios from "axios";
import { getStore } from "@/app/redux/storeInstance";
import { setLoading, showToast } from "@/app/redux/slices/uiSlice";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    const store = getStore();
    if (store) store.dispatch(setLoading(true));

    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    const store = getStore();
    if (store) store.dispatch(setLoading(false));
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    const store = getStore();
    if (store) store.dispatch(setLoading(false));
    return response;
  },
  (error) => {
    const store = getStore();
    if (store) {
      store.dispatch(setLoading(false));
      store.dispatch(
        showToast({
          type: "error",
          message:
            error?.response?.data?.message ||
            error.message ||
            "Something went wrong",
        })
      );
    }
    return Promise.reject(error);
  }
);

export default api;

