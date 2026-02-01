"use client";

import VerifyOtpForm from "@/components/features/auth/VerifyOtpForm";
import { useState } from "react";
import LoginForm from "./LoginForm";

export default function LoginLayout() {
  // State
  const [step, setStep] = useState<number>(0);
  const [email, setEmail] = useState<string>("");

  return (
    <>
      {/* Login Form */}
      {step === 0 && (
        <LoginForm
          handleDisabledAccount={(userEmail) => {
            setEmail(userEmail);
            setStep(1);
          }}
        />
      )}

      {/* Verify OTP Form */}
      {step === 1 && (
        <VerifyOtpForm
          email={email}
          handleSuccess={() => {
            // Reset back to login form after successful verification
            setStep(0);
            setEmail("");
          }}
        />
      )}
    </>
  )
}

