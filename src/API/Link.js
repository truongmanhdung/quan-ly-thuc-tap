import axios from "axios";

export const axiosClient = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const setAuthHeader = (accessToken) => {
  axiosClient.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
}
