import { createContext, useState, useEffect } from "react";
import AUTHAPI, { login as apiLogin, logout as apiLogout } from "../api/axios";
import { toast } from "sonner";
import { useNavigate } from "react-router";

const AuthContext = createContext({})
export const AuthProvider = ({ children }) => {
  const env = import.meta.env.VITE_AUTH_BACKEND
  //console.log("AuthProvider using backend: " + env)
  const [auth, setAuth] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  // always fetch user from backend if cookie exists
  const fetchUser = async () => {
    try {
      const response = await AUTHAPI.get("/api/user", { withCredentials: true })
      setAuth(response.data)
      return response.data
    } catch (error) {
      setAuth(null)
      return null
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUser()
  }, [])

  const login = async (credentials) => {
    try {
      await apiLogin(credentials) // cookie set
      const user = await fetchUser() // now fetch actual user object

      if (user) {
        toast.success('Login successful, redirecting...', { position: "top-center" })
        roleAccess(user, navigate)
      } else {
        toast.error('Login failed: unable to fetch user', { position: "top-center" })
      }
    } catch (error) {
      if (error.response) {
        if ([401, 422].includes(error.response.status)) {
          toast.error('Invalid credentials', { position: "top-center" })
        } else if (error.response.status === 500) {
          toast.error('Server error. Please try again later.', { position: "top-center" })
        } else {
          toast.error(`Login failed (${error.response.status})`, { position: "top-center" })
        }
      } else {
        toast.error('Network error. Please check your connection.', { position: "top-center" })
      }
      console.error(error)
    }
  }

  /* ===ROLES===
    'HR1 Admin',                          
    'HR2 Admin', 'Trainer', 'Employee',  
    'HR3 Admin',                          
    'HR4 Admin',                      
    'Payroll Specialist',
    'LogisticsI Admin', 'Manager', 'Staff',
    'Fleet Manager', 'Driver',
    'Facility Admin', 'Legal Admin', 'Front Desk Admin', 'Super Admin'
   */
  const roleAccess = (user, navigate) => {
    switch (user?.role) {
      // HR1 Admin
      case 'HR1 Admin':
        window.location.href = import.meta.env.VITE_HR1_FRONTEND
        break
      // HR2 Admin, Trainer, Employee
      case 'HR2 Admin':
      case 'Trainer':
      case 'Employee':
        window.location.href = import.meta.env.VITE_HR2_FRONTEND
        break
      // HR3 Admin
      case 'HR3 Admin':
        window.location.href = import.meta.env.VITE_HR3_FRONTEND
        break
      // HR4 Admin
      case 'HR4 Admin':
      case 'Payroll Specialist':
        window.location.href = import.meta.env.VITE_HR4_FRONTEND
        break
      // LogisticsI Admin, Manager, Staff
      case 'LogisticsI Admin':
      case 'Manager':
      case 'Staff':
        window.location.href = import.meta.env.VITE_LOGISTICSI_FRONTEND
        break
      // Fleet Manager, Driver
      case 'Fleet Manager':
      case 'Driver':
        window.location.href = import.meta.env.VITE_FLEET_FRONTEND
        break
      // Facility Admin, Legal Admin, Front Desk Admin
      case 'Facility Admin':
      case 'Legal Admin':
      case 'Front Desk Admin':
        window.location.href = import.meta.env.VITE_FACILITY_FRONTEND
        break
      // Super Admin
      case 'Super Admin':
        navigate('/login')
        break
      default:
        navigate('/login')
    }
  }

  const logout = async () => {
    try {
      await apiLogout()
    } catch (_) {
      // ignore errors
    } finally {
      setAuth(null)
      navigate('/login')
    }
  }

  return (
    <AuthContext.Provider value={{ auth, setAuth, login, loading, roleAccess, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
