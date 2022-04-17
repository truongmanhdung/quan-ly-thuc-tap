import axios from "axios";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const axiosClient = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${cookies.get("access_token")}`,
  },
});
