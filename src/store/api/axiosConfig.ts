import axios from "axios";

const BASE_URL = import.meta.env.VITE_URL_AUTH;

const api = axios.create({
  baseURL: `${BASE_URL}/auth`,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const setAuthToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    try {
      localStorage.setItem("token", token);
    } catch (e) {}
  } else {
    delete api.defaults.headers.common["Authorization"];
    try {
      localStorage.removeItem("token");
    } catch (e) {}
  }
};

try {
  const storedToken = localStorage.getItem("token");
  if (storedToken) setAuthToken(storedToken);
} catch (e) {}

export default api;
