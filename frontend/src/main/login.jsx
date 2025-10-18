import { LoginForm } from "../components/login-form"
import { motion } from "motion/react";

export default function LoginPage(){
    return (
        <>
            {/* Larger Login Form */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl scale-110"
            >
                <LoginForm />
            </motion.div>
        </>
    )
}