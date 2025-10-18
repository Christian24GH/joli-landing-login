import { OTPForm } from "../components/otp-form"
import { motion } from "motion/react";
export default function OtpPage(){
    return (
        <>
            {/* Larger Login Form */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-sm sm:max-w-sm md:max-w-md lg:max-w-lg scale-110"
            >
                <OTPForm />
            </motion.div>
        </>
    )
}