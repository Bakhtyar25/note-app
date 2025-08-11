import axios from "axios";

const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers,
});

// Add a request interceptor
api.interceptors.request.use(
  async function (config) {
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  function (response) {
    // Handle 2xx responses
    return response;
  },
  function (error) {
    // Handle errors
    return Promise.reject(error);
  }
);

export default api;
