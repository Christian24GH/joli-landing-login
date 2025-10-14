import { Toaster } from "sonner"
import { LoginForm } from "../components/login-form"
import { Link } from "react-router";
import { Label } from '@/components/ui/label'
import { motion } from "motion/react";
import { ModeToggle } from "../components/theme-toggler";

import bg from '@/assets/ironpattern.png'
import logo from '@/assets/finallogo.avif'


export default function LoginPage(){
    return( 
       <>
        <title>JOLI - Login</title>
        <div className="flex min-h-svh w-full flex-col items-center p-6 md:p-10 relative">
            
            {/* Mode Toggle – top-right corner */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute top-6 right-6 md:top-8 md:right-8"
            >
                <ModeToggle />
            </motion.div>

            {/* Centered Logo */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-center mb-10 mt-10"
            >
                <Link to="/">
                    <img src={logo} className="w-40 md:w-64 scale-150" alt="Logo" />
                </Link>
            </motion.div>

            {/* Larger Login Form */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl scale-110"
            >
                <LoginForm />
            </motion.div>

            {/* Background */}
            <div
                className="absolute inset-0 -z-50 bg-repeat"
                style={{ backgroundImage: `url(${bg})` }}
            />
        </div>
    </>


    )
}