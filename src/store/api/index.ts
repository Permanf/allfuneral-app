import axios from "axios";
import { IDeleteApi, IGetApi, IPostApi, IUpdateApi, IUploadApi } from "./api.interface";
import { API_BASE_URL } from "../../utils/constants";
import { GetCookie, SetCookie } from "../../utils/cookie";

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
    Authorization: null,
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && error.response.data === "Unauthorized" || !GetCookie("token")) {
      const config = {
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        withCredentials: true,
      };
      return axiosInstance
        .get("/auth?user=USERNAME", config)
        .then((response) => {
          let string = response.headers['authorization'] || response.headers['x-auth-token'];
          const token = string.split(" ")[1];
          axiosInstance.defaults.headers.Authorization = `Bearer ${token}`;
          originalRequest.headers.Authorization = `Bearer ${token}`;
          SetCookie("token", token);
          return axiosInstance(originalRequest);
        })
        .catch(() => {
          axiosInstance.defaults.headers.Authorization = null;
          originalRequest.headers.Authorization = null;
          return Promise.reject(error);
        });
    } else {
      axiosInstance.defaults.headers.Authorization = null;
      originalRequest.headers.Authorization = null;
      return Promise.reject(error);
    }
  }
);

export const api = {
  get: async ({ url } : IGetApi ) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: `Bearer ${GetCookie("token")}`,
      },
    };
    return await axiosInstance.get(url, config);
  },
  post: async ({ url, params, method } : IPostApi ) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: `Bearer ${GetCookie("token")}`, 
      },
    };
    return method == "POST" ? await axiosInstance.post(url, params, config) 
          : method == "PATCH" ? await axiosInstance.patch(url, params, config) 
          : method == "DELETE" ? await axiosInstance.post(url, {}, config) 
          : await axiosInstance.put(url, params, config);
  },
  update: async ({ url, params } : IUpdateApi ) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: `Bearer ${GetCookie("token")}`,
      },
    };
    return await axiosInstance.put(url, params, config);
  },
  delete: async ({ url} : IDeleteApi) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: `Bearer ${GetCookie("token")}`,
      },
      // data: id,
    };
    return await axiosInstance.delete(url, config);
  },
  upload: async ({ url, formData } : IUploadApi ) => {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${GetCookie("token")}`,
      },
    };
    return await axiosInstance.post(url, formData, config);
  },
};
