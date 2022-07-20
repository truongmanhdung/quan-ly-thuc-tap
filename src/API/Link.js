import axios from "axios";
import { getLocal } from "../ultis/storage";
const token = getLocal();
export const axiosClient = axios.create({
  // Localhost
  baseURL: "http://localhost:8000/api",
  // DEV
  // baseURL: "http://hbgreen.com.vn/api",
  // Main
  // baseURL: "http://139.180.196.74:8000/api",
});
axiosClient.interceptors.request.use(req => {
  if (token) {
    req.headers['Authorization'] = 'Bearer ' + token.accessToken
  }
  req.headers['Content-Type'] = 'application/json';
  return req
})
