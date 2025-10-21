import axios from 'axios'

export const AUTH_API = axios.create({
  baseURL: import.meta.env.VITE_AUTH_BACKEND,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

/**
 * API HELPERS
 */
export const requestOtp = async (email, password) => {
  return AUTH_API.post("/api/login", { email, password });
};

export const register = async (credentails) => {
  return AUTH_API.post("/api/register-customer", { credentails });
};

export const verifyOtp = async (email, otp) => {
  return AUTH_API.post("/api/otp/verify", { email, otp });
};

export const resendOtp = async (email) => {
  return AUTH_API.post("/api/otp/resend", { email });
};

export const fetchUser = async () => {
  return AUTH_API.get("/api/user");
};

export const logout = async () => {
  return AUTH_API.post("/api/logout");
};

export default AUTH_API
