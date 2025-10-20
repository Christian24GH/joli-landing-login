import './index.css'
import React from 'react';
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import { Toaster } from "@/components/ui/sonner"
import { AuthProvider } from './context/AuthProvider.jsx';
import { ThemeProvider } from "./context/theme-provider"
import LandingPage from './main/landing'
import BookingPage from './main/booking.jsx';
import LoginPage from './main/login';
import Supplier from './main/Supplier';
import NotFound from './main/not-found';
import Supplier from './main/Supplier';

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
<<<<<<< HEAD:frontend/src/main.jsx
          <Route path="/booking" element={<BookingPage/>}/>
          <Route path="/login" index element={<LoginPage/>}/>
          <Route path="/supplier" element={<Supplier/>}/>
=======
          <Route path="/login" element={<GuestRoute/>}>
            <Route index element={<LoginPage/>}/>
          </Route>
          <Route path="/supplier" element={<Supplier/>}/>

>>>>>>> 8164badce463fd0b06561ba914f63c014f12f448:landing/src/main.jsx
          {/**NOT FOUND PAGE AS LAST CHILD OF ROUTES */}
          <Route path='*' element={<NotFound/>}/>
        </Routes>
      </ThemeProvider>
    </AuthProvider>
  </BrowserRouter>
)
