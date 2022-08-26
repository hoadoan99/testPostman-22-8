import axios from "axios";
import { BASE_URL } from "./constants";

const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QxMjM0NTY3OEBnbWFpbC5jb20iLCJ1c2VybmFtZSI6InBvc3RlciIsImlhdCI6MTY2MTA5MTUxNSwiZXhwIjoxNjY2Mjc1NTE1fQ.GPMEFgD0vEpVygxYmjDOvHNRmMaXGZOZ1LpwSqL1EGY`;
export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});

axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent

    if (token) {
      config.headers.common.Authorization = `Bearer ${token}`;
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
axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data

    return response;
  },
  function (error) {
    console.log("error ======", error);
    if (error.statusCode || error.error.statusCode === 400) {
      alert("Lỗi rồi");
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);
