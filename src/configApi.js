import axios from "axios";
import { BASE_URL } from "./constants";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    // Authorization: ``,
  },
});

api.interceptors.request.use(
  function (config) {
    // Do something before request is sent

    const token = localStorage.getItem("token");

    if (token) {
      config.headers = {
        Authorization: `Bearer ${token}`,
      };
      // config.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      // config.headers['Authorization'] = `Bearer ${token}`
      // config.headers.common.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

/**
 *
 * client => request => server
 * client => intercepter => server: request
 * server => client: server => intercepter => client: response
 */

// Add a response interceptor

api.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data

    return response;
  },
  function (error) {
    console.log("error ======", error);
    if (error?.response?.status == 404) {
      alert("Lỗi rồi");
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default api;
