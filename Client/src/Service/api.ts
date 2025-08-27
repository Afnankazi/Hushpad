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
    // Prevent the interceptor from running for the CSRF fetch itself
    if (config.url?.includes("/csrf-token")) {
      return config;
    }

    const token: string | null = localStorage.getItem("JWT_TOKEN");
    let csrf: string | null = localStorage.getItem("CSRF_TOKEN");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Fetch CSRF token only if it's missing entirely
    // if (!csrf) {
      try {
        // Use a separate, clean axios instance to avoid an infinite loop
        const response = await axios.get(`${import.meta.env.VITE_SERVERBASE_URL}/api/csrf-token`);
        csrf = response.data.token;
        localStorage.setItem("CSRF_TOKEN", csrf || "");
      } catch (error) {
        console.error("Failed to fetch initial CSRF token:", error);
      }
    // }

    if (csrf) {
      config.headers["X-XSRF-TOKEN"] = csrf;
    }

    return config;
  },
  (error) => Promise.reject(error)
);


// 2. RESPONSE Interceptor: Updates the CSRF token after a successful request
api.interceptors.response.use(
  (response) => {
    console.log("hit from csrf response");
    
    // Check for a new CSRF token in the response headers
    const newCsrfToken = response.headers['x-xsrf-token']; // Note: headers are lowercase
    console.log("new"+ newCsrfToken);
    
    if (newCsrfToken) {
      // Update the token in localStorage for the next request
      console.log(newCsrfToken);
      
      localStorage.setItem("CSRF_TOKEN", newCsrfToken);
    }

    // Return the successful response to the original caller
    return response;
  },
  (error) => {
    // Handle errors
    return Promise.reject(error);
  }
);

export default api;