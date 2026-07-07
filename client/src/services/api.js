import axios from "axios";

const API = axios.create({
  baseURL: "https://intellmeet-y3e2.onrender.com"
});

// Automatically attach token to every request
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Send Connection Request
export const sendConnectionRequest = (mentorId) => {
  return API.post("/connections/send", {
    mentorId,
  });
};

export default API;