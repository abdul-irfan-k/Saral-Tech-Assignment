import axios from "axios";

export const axiosAuthInstance = axios.create({
  baseURL: "http://localhost:8000/api/auth/",
  withCredentials: true,
});

export const axiosUserInstance = axios.create({
  baseURL: "http://localhost:8000/api/user",
  withCredentials: true,
});
