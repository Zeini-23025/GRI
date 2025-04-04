import { ACCESS_TOKEN, REFRESH_TOKEN } from "./constants";
import api from "./api";

export const login = async (username, password) => {
  try {
    const response = await api.post("/api/token/", { username, password });
    const { access, refresh } = response.data;
    
    localStorage.setItem(ACCESS_TOKEN, access);
    localStorage.setItem(REFRESH_TOKEN, refresh);
    
    return true;
  } catch (error) {
    return false;
  }
};

export const logout = () => {
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(REFRESH_TOKEN);
  window.location.href = '/login';
};

export const isAuthenticated = () => {
  const token = localStorage.getItem(ACCESS_TOKEN);
  return !!token;
}; 