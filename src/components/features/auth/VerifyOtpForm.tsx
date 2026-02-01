import CustomeBtn from "@/components/shared/CustomeBtn";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import useResendRegisterOtp from "@/hooks/use-resend-register-otp";
import useVerifyOTP from "@/hooks/use-verify-otp";
import { useRouter } from "@/i18n/navigation";
import { getUserVerificationTokenSchema, UserVerificationTokenFields } from "@/lib/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

interface StepOneProps {
  email: string;
  handleSuccess: () => void;
}

export default function VerifyOtpForm({ email, handleSuccess }: StepOneProps) {
  // State
  const [resentTime, setResentTime] = useState(59);
  const router = useRouter();
  const t = useTranslations("OtpVerificationPage.form");

  // Mutation
  const { isPending: isVerifing, verifyOTP } = useVerifyOTP();
  const { isPending: isResending, resendOtp } = useResendRegisterOtp();

  // Form
  const form = useForm<UserVerificationTokenFields>({
    resolver: zodResolver(getUserVerificationTokenSchema(t)),
    defaultValues: {
      token: "",
    },
    mode: "onBlur",
  })

  async function onSubmit(values: UserVerificationTokenFields) {
    await verifyOTP({ email, token: values.token } as unknown as UserVerificationTokenFields, {
      onSuccess: () => {
        handleSuccess();
        router.push("/login");
      },
    });
  }

  function onReset() {
    form.reset();
    form.clearErrors();
  }

  const handleResend = () => {
    resendOtp(email, {
      onSuccess: () => {
        setResentTime(59);
      },
    });
  };

  // Effect
  useEffect(() => {
    if (resentTime > 0) {
      const interval = setInterval(() => {
        setResentTime((t) => t - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [resentTime]);

  return (
    <form id="form-rhf-register" onSubmit={form.handleSubmit(onSubmit)} onReset={onReset} className="w-full mt-5 z-10">
      <FieldGroup className="gap-3">

        <div className="flex items-center justify-center">
          {/* OTP */}
          <Controller
            name="token"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <InputOTP
                  maxLength={6}
                  aria-invalid={fieldState.invalid}
                  {...field}
                  onChange={field.onChange}
                  value={field.value || ""}
                >
                  <InputOTPGroup className="gap-2">
                    {[...Array(6)].map((_, i) => (
                      <InputOTPSlot key={i} index={i} className="h-12 w-12 text-lg rounded-lg" />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          {/* Resend Button */}
          <CustomeBtn
            type="button"
            onClick={handleResend}
            disabled={isResending || resentTime > 0}
            className="rounded-lg"
          >
            {resentTime > 0 ? `${resentTime}` : t("resend")}
          </CustomeBtn>
        </div>

        {/* submit */}
        <div className="pt-3 z-10">
          <CustomeBtn
            type="submit"
            className="w-full"
            disabled={isVerifing || form.formState.isSubmitted && !form.formState.isValid}>
            {isVerifing ? <LoadingSpinner /> : t("submit")}
          </CustomeBtn>
        </div>
      </FieldGroup>
    </form>
  )
}
