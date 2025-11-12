import './index.css'
import React from 'react';
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import { Toaster } from "@/components/ui/sonner"
import { AuthProvider } from './context/AuthProvider.jsx';
import { ThemeProvider } from "./context/theme-provider"
import LandingPage from './main/landing'
<<<<<<< HEAD:landing/src/main.jsx
import LoginPage from './main/login';
=======
import BookingPage from './main/booking.jsx';
import LoginPage from './main/login.jsx';
import RegisterPage from './main/register.jsx';
>>>>>>> f2c4eded3096587357deda9514a12225abe0a755:frontend/src/main.jsx
import Supplier from './main/Supplier';
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
<<<<<<< HEAD:landing/src/main.jsx
          <Route path="/login" element={<GuestRoute/>}>
            <Route index element={<LoginPage/>}/>
          </Route>
          <Route path="/supplier" element={<Supplier/>}/>

=======
          <Route path="/booking" element={<BookingPage/>}/>
          <Route path="/login" index element={<LoginPage/>}/>
          <Route path="/register" index element={<RegisterPage/>}/>
          <Route path="/supplier" element={<Supplier/>}/>
>>>>>>> f2c4eded3096587357deda9514a12225abe0a755:frontend/src/main.jsx
          {/**NOT FOUND PAGE AS LAST CHILD OF ROUTES */}
          <Route path='*' element={<NotFound/>}/>
        </Routes>
      </ThemeProvider>
    </AuthProvider>
  </BrowserRouter>
)
