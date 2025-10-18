import { createContext, useState, useEffect } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { requestOtp, verifyOtp, fetchUser, logout as apiLogout, resendOtp } from "../api/axios";
import Cookies from "universal-cookie";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const cookies = new Cookies();
  const navigate = useNavigate();

  const [auth, setAuth] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pendingOtp, setPendingOtp] = useState(null);
  const [resendingOtp, setResendingOtp] = useState(false);
  const [cooldownOtp, setCooldownOtp]  = useState(0);    
  const getUser = async () => {
    try {
      const res = await fetchUser({ withCredentials: true });
      setAuth(res.data);
      return res.data;
    } catch (err) {
      setAuth(null);
      return null;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      const user = await getUser();

      if (!user) {
        // not logged in, check for OTP cookies
        const otp_email = cookies.get("otp_email");
        const otp_id = cookies.get("otp_id");

        if (otp_email && otp_id) {
          console.log("Restored OTP cookies:", { otp_email, otp_id });
          setPendingOtp({ email: otp_email, otp_id });
        } else {
          console.log("No OTP cookies found");
          setPendingOtp(null);
        }
      } else {
        // user logged in and verified
        setPendingOtp(null);
      }
    };

    initAuth();
  }, []);

  const login = async (credentials) => {
    try {
      const res = await requestOtp(credentials.email, credentials.password, { withCredentials: true });

      if (res.headers["x-otp-skipped"]) {
        toast.success("Welcome back! Already verified today", { position: "top-center" });

        const user = await getUser();
        if (user) roleAccess(user);
        return; // stop further execution
      }

      // Regular OTP flow
      toast.success(res.data.message, { position: "top-center" });

      if (res.data.otp_id && res.data.email) {
        setPendingOtp({ email: res.data.email, otp_id: res.data.otp_id });
        navigate("/otp");
      } else {
        // fallback (edge case)
        const user = await getUser();
        if (user) roleAccess(user);
      }
    } catch (error) {
      if (error.response) {
        const status = error.response.status;
        if (status === 401 || status === 422) {
          toast.error("Invalid email or password", { position: "top-center" });
        } else if (status === 429) {
          toast.error("Too many attempts. Try again later.", { position: "top-center" });
        } else {
          toast.error("Server error. Please try again.", { position: "top-center" });
        }
      } else {
        toast.error("Network error. Please check your connection.", { position: "top-center" });
      }
    }
  };

  const verifyLoginOtp = async (otp) => {
    try {
      const res = await verifyOtp(pendingOtp?.email, otp, { withCredentials: true });
      toast.success("OTP verified! Logging in...", { position: "top-center" });

      const user = await getUser();
      if (user) {
        roleAccess(user);
        setPendingOtp(null);
      } else {
        toast.error("Unable to fetch user info.", { position: "top-center" });
      }
    } catch (error) {
      if (error.response?.status === 422) {
        toast.error(error.response.data.message || "Invalid OTP", { position: "top-center" });
      } else {
        toast.error("Failed to verify OTP. Try again.", { position: "top-center" });
      }
    }
  };

  const resendOtpCode = async () => {
    if (!pendingOtp?.email) {
      toast.error("Missing email. Please log in again.", { position: "top-center" });
      return;
    }

    if (cooldownOtp > 0) {
      toast.info(`Please wait ${cooldownOtp}s before requesting again.`, { position: "top-center" });
      return;
    }

    try {
      setResendingOtp(true);

      const res = await resendOtp(pendingOtp?.email)

      toast.success(res.data.message, { position: "top-center" });

      // reset cooldown (60 seconds)
      setCooldownOtp(60);

      setPendingOtp({ email: res.data.email, otp_id: res.data.otp_id });

      // start countdown
      const interval = setInterval(() => {
        setCooldownOtp((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (err) {
      if (err.response?.status === 429) {
        toast.error(err.response.data.message || "Please wait before resending.", { position: "top-center" });
      } else {
        toast.error("Failed to resend OTP. Try again.", { position: "top-center" });
      }
    } finally {
      setResendingOtp(false);
    }
  };

  const roleAccess = (user) => {
    switch (user?.role) {
      case "HR1 Admin":
        window.location.href = import.meta.env.VITE_HR1_FRONTEND;
        break;
      case "HR2 Admin":
      case "Trainer":
      case "Employee":
        window.location.href = import.meta.env.VITE_HR2_FRONTEND;
        break;
      case "HR3 Admin":
        window.location.href = import.meta.env.VITE_HR3_FRONTEND;
        break;
      case "HR4 Admin":
      case "Payroll Specialist":
        window.location.href = import.meta.env.VITE_HR4_FRONTEND;
        break;
      case "LogisticsI Admin":
      case "Manager":
      case "Staff":
        window.location.href = import.meta.env.VITE_LOGISTICSI_FRONTEND;
        break;
      case "Fleet Manager":
      case "Driver":
        window.location.href = import.meta.env.VITE_FLEET_FRONTEND;
        break;
      case "Facility Admin":
      case "Legal Admin":
      case "Front Desk Admin":
      case "Super Admin":
        window.location.href = import.meta.env.VITE_ADM_FRONTEND;
        break;
      default:
        toast.error("Invalid role. Please contact support.", { position: "top-center" });
    }
  };

  
  const logout = async () => {
    try {
      await apiLogout({ withCredentials: true });
    } catch (_) {
      // ignore
    } finally {
      setAuth(null);
      setPendingOtp(null);
      navigate("/login");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        login,
        verifyLoginOtp,
        resendOtpCode,
        resendingOtp, 
        cooldownOtp,
        pendingOtp,
        loading,
        roleAccess,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
