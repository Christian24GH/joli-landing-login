import { useForm } from "react-hook-form";
import { useState, useContext, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useNavigate } from "react-router";
import AuthContext from "../context/AuthProvider";

export function OTPForm(props) {
  const { handleSubmit, setValue, formState: { isSubmitting } } = useForm();
  const { verifyLoginOtp, resendOtpCode, resendingOtp, cooldownOtp} = useContext(AuthContext);

  const onSubmit = async (credentials) => {
    if (!credentials?.otp) return;
    await verifyLoginOtp(credentials.otp);
  };

  const handleResend = async () => {
    await resendOtpCode();
  }

  return (
    <Card {...props} className="w-full">
      <CardHeader>
        <CardTitle>Enter verification code</CardTitle>
        <CardDescription>We sent a 6-digit code to your email.</CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="otp">Verification code</FieldLabel>

              <div className="flex justify-center w-full">
                <InputOTP
                  maxLength={6}
                  minLength={6}
                  id="otp"
                  required
                  onChange={(value) => setValue("otp", value)}
                >
                  <InputOTPGroup className="gap-2.5 *:data-[slot=input-otp-slot]:rounded-md *:data-[slot=input-otp-slot]:border">
                    {[0, 1, 2, 3, 4, 5].map((i) => (
                      <InputOTPSlot key={i} index={i} />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              </div>

              <FieldDescription>
                Enter the 6-digit code sent to your email.
              </FieldDescription>
            </Field>

            <FieldGroup className="mt-4">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Verifying..." : "Verify"}
              </Button>

              <FieldDescription className="text-center mt-2">
                Didn&apos;t receive the code?{" "}
                <span className="cursor-pointer underline underline-offset-4 hover:text-pink-500" 
                  onClick={() => handleResend()}>{
                    resendingOtp
                      ? "Sending..."
                      : cooldownOtp > 0
                      ? `Resend OTP (${cooldownOtp}s)`
                      : "Resend OTP"
                    }
                </span>
              </FieldDescription>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
