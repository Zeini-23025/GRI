import axios from "axios";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "./constants";

const api = axios.create({
  baseURL: "http://localhost:8000",
  headers: { "Content-Type": "application/json" },
});

// Interceptor to attach the access token to the request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor to handle errors globally (e.g., 401 unauthorized)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      // Optionally, use the refresh token to get a new access token
      const refreshToken = localStorage.getItem(REFRESH_TOKEN);
      if (refreshToken) {
        try {
          const response = await axios.post(
            "http://localhost:8000/api/token/refresh/",
            { refresh: refreshToken }
          );
          localStorage.setItem(ACCESS_TOKEN, response.data.access);
          return api(error.config); // Retry the original request with the new token
        } catch (err) {
          // If refresh fails, log the user out and clear tokens
          localStorage.removeItem(ACCESS_TOKEN);
          localStorage.removeItem(REFRESH_TOKEN);
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;
