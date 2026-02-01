"use client";

import VerifyOtpForm from "@/components/features/auth/VerifyOtpForm";
import { useState } from "react";
import RegisterForm from "./RegisterForm";

export default function RegisterLayout() {
  // State
  const [step, setStep] = useState<number>(0);
  const [email, setEmail] = useState<string>("");

  return (
    <>
      {/* Register Form */}
      {step === 0 && (
        <RegisterForm
          handleSuccess={(userEmail) => {
            setEmail(userEmail);
            setStep(1);
          }}
        />
      )}

      {/* Verify OTP Form */}
      {step === 1 && (
        <VerifyOtpForm
          email={email}
          handleSuccess={() => { /* redirect handled inside form */ }}
        />
      )}
    </>
  )
}
