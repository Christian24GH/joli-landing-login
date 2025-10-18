import './index.css'
import React from 'react';
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import { Toaster } from "@/components/ui/sonner"
import { AuthProvider } from './context/AuthProvider.jsx';
import { ThemeProvider } from "./context/theme-provider"
import AuthLayout from './layout/AuthLayout.jsx'
import LandingPage from './main/landing'
import LoginPage from './main/login';
import OtpPage from './main/otp.jsx';
import NotFound from './main/not-found';

createRoot(document.getElementById('root')).render(
  // basename = baseUrl jsut like base value inside vite.config.js
  // Tells BrowserRouter that this is the base URL
  <BrowserRouter>
    <AuthProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Toaster richColors />
        <Routes>
          
          {/** Main Routes */}
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/login" element={<AuthLayout/>}>
            <Route index element={<LoginPage/>}/>
          </Route>

          <Route path="/otp" element={<AuthLayout/>}>
            <Route index element={<OtpPage/>}/>
          </Route>


          {/**NOT FOUND PAGE AS LAST CHILD OF ROUTES */}
          <Route path='*' element={<NotFound/>}/>
        </Routes>
      </ThemeProvider>
    </AuthProvider>
  </BrowserRouter>
)
