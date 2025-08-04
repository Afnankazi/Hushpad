import axios, { type InternalAxiosRequestConfig } from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_SERVERBASE_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token: string | null = localStorage.getItem("JWT_TOKEN");
    let csrf: string | null = localStorage.getItem("CSRF_TOKEN");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (!csrf) {
      try {
        const response = await axios.get("/csrf_token");
        csrf = response.data.token;
        localStorage.setItem("CSRF_TOKEN", csrf || "");
      } catch (error) {
        console.log(error);
      }
    }
     if (csrf) {
      config.headers["X-XSRF-TOKEN"] = csrf; 
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
