import axios from 'axios';
import { isDev } from './helper';
const { io } = require("socket.io-client");

export const HOST = isDev() ? 'http://localhost:5000/api' : 'https://order-server-nine.vercel.app/api';
export const socket = io(HOST);

//TODO: fix url
export const axiosClient = axios.create({
  baseURL: isDev() ? 'http://localhost:5000/api' : 'https://order-server-nine.vercel.app/api',
  withCredentials: true
});

export const setCookie = (cookie: string) => {
  document.cookie = `token=${cookie};path=/`;
};

export const removeCookie = () => {
  document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC';
};

export const getCookieValue = (name: string) => {
  return document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() || '';
};

export const setAuthToken = (token: string | null) => {
  if (token) {
    axiosClient.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete axiosClient.defaults.headers.common.Authorization;
  }
};

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error.response.data)
);

export default axiosClient;
