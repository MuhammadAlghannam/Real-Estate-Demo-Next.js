"use client"

import CustomeBtn from "@/components/shared/CustomeBtn"
import LoadingSpinner from "@/components/shared/LoadingSpinner"
import {
  Field,
  FieldError,
  FieldGroup
} from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { Separator } from "@/components/ui/separator"
import { useRouter } from "@/i18n/navigation"
import { getResetPasswordSchema, type ResetPasswordFields } from "@/lib/schemas/auth.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeOff, Lock } from "lucide-react"
import { useTranslations } from "next-intl"
import { useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import useForgetPassword from "../../forget-password/_hooks/use-forget-password"
import useResetPassword from "../_hooks/use-reset-password"

export default function ResetPasswordForm() {
  const router = useRouter()
  const t = useTranslations("ResetPasswordPage.form");

  // State
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [email, setEmail] = useState<string>("")
  const [resentTime, setResentTime] = useState(59)

  // Mutation
  const { isPending, resetPassword } = useResetPassword();
  const { isPending: isResending, forgetPassword } = useForgetPassword();

  // Form
  const form = useForm<ResetPasswordFields>({
    resolver: zodResolver(getResetPasswordSchema(t)),
    defaultValues: {
      token: "",
      password: "",
      password_confirmation: "",
    },
    mode: "onBlur",
  })

  // Get email from localStorage on component mount
  useEffect(() => {
    const savedEmail = localStorage.getItem("forget-password-email");
    if (savedEmail) {
      setEmail(savedEmail);
    } else {
      // Redirect to forget password if no email found
      router.push('/forget-password');
    }
  }, [router]);

  // Effect for resend timer
  useEffect(() => {
    if (resentTime > 0) {
      const interval = setInterval(() => {
        setResentTime((t) => t - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [resentTime]);

  function onSubmit(values: ResetPasswordFields) {
    if (!email) return;

    resetPassword({ ...values, email }, {
      onSuccess: () => {
        // Remove email from localStorage
        localStorage.removeItem("forget-password-email");

        // Redirect to login
        setTimeout(() => {
          router.push('/login');
        }, 1000);
      },
    })
  }

  const handleResend = () => {
    if (!email) return;

    forgetPassword({ email }, {
      onSuccess: () => {
        setResentTime(59);
      },
    });
  };

  return (
    <form id="form-rhf-reset-password" onSubmit={form.handleSubmit(onSubmit)} className="w-full mt-3 z-10">
      <FieldGroup className="gap-3">
        {/* Token */}
        <div className="flex items-center justify-center">
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

        {/* Password */}
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <InputGroup className="h-12 py-3">
                <InputGroupAddon>
                  <Lock className="w-6 h-6 text-black" />
                </InputGroupAddon>
                <Separator orientation="vertical" className="ml-3 bg-black" />
                <InputGroupInput
                  id="reset-password"
                  type={showPassword ? "text" : "password"}
                  placeholder={t("password.placeholder")}
                  aria-invalid={fieldState.invalid}
                  {...field}
                />
                <InputGroupAddon align="inline-end">
                  <InputGroupButton
                    type="button"
                    className="p-0 !bg-transparent"
                    aria-label={showPassword ? t("password.hide-password") : t("password.show-password")}
                    size="icon-xs"
                    onClick={() => setShowPassword((s) => !s)}
                  >
                    {showPassword ? <EyeOff className="w-6 h-6 text-black" /> : <Eye className="w-6 h-6 text-black" />}
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Confirm Password */}
        <Controller
          name="password_confirmation"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <InputGroup className="h-12 py-3">
                <InputGroupAddon>
                  <Lock className="w-6 h-6 text-black" />
                </InputGroupAddon>
                <Separator orientation="vertical" className="ml-3 bg-black" />
                <InputGroupInput
                  id="reset-password-confirmation"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder={t("password-confirmation.placeholder")}
                  aria-invalid={fieldState.invalid}
                  {...field}
                />
                <InputGroupAddon align="inline-end">
                  <InputGroupButton
                    type="button"
                    className="p-0 !bg-transparent"
                    aria-label={showConfirmPassword ? t("password-confirmation.hide-password") : t("password-confirmation.show-password")}
                    size="icon-xs"
                    onClick={() => setShowConfirmPassword((s) => !s)}
                  >
                    {showConfirmPassword ? <EyeOff className="w-6 h-6 text-black" /> : <Eye className="w-6 h-6 text-black" />}
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <div className="pt-3 z-10">
          <CustomeBtn
            type="submit"
            className="w-full"
            disabled={isPending || form.formState.isSubmitted && !form.formState.isValid}>
            {isPending ? <LoadingSpinner /> : t("submit")}
          </CustomeBtn>
        </div>
      </FieldGroup>
    </form>
  )
}
