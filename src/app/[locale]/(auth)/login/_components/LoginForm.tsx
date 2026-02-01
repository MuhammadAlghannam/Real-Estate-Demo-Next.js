"use client"

import CustomeBtn from "@/components/shared/CustomeBtn"
import LoadingSpinner from "@/components/shared/LoadingSpinner"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
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
import { Separator } from "@/components/ui/separator"
import useResendRegisterOtp from "@/hooks/use-resend-register-otp"
import { Link } from "@/i18n/navigation"
import { getLoginSchema, type LoginFields } from "@/lib/schemas/auth.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { AlertCircle, Eye, EyeOff, Lock, Mail } from "lucide-react"
import { useTranslations } from "next-intl"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import useLogin from "../_hooks/useLogin"

interface LoginFormProps {
  handleDisabledAccount: (email: string) => void;
}

export default function LoginForm({ handleDisabledAccount }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const t = useTranslations("LoginPage.form");

  // Mutation
  const { isPending, error, login } = useLogin();
  const { isPending: isResending, resendOtp } = useResendRegisterOtp();

  const form = useForm<LoginFields>({
    resolver: zodResolver(getLoginSchema(t)),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  })

  function onSubmit(values: LoginFields) {
    login(values);
  }

  interface LoginError extends Error {
    email?: string;
  }

  const isDisabledAccount = error?.message === "Disabled Account";
  // Get email from error object or form values
  const disabledAccountEmail = isDisabledAccount
    ? ((error as LoginError)?.email || form.getValues("email"))
    : null;

  const handleResendOtp = () => {
    if (disabledAccountEmail) {
      resendOtp(disabledAccountEmail, {
        onSuccess: () => {
          // Switch to OTP form after resending
          handleDisabledAccount(disabledAccountEmail);
        },
      });
    }
  };

  return (
    <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)} className="w-full mt-3 z-10">
      {/* Disabled Account Alert */}
      {isDisabledAccount && (
        <Alert variant="destructive" className="mb-3">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>{t("disabled-account.title")}</AlertTitle>
          <AlertDescription className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <span>{t("disabled-account.description")}</span>
            <CustomeBtn
              type="button"
              onClick={handleResendOtp}
              disabled={isResending}
              className="sm:ml-auto shrink-0"
              size="sm"
            >
              {isResending ? <LoadingSpinner /> : t("disabled-account.resend-otp")}
            </CustomeBtn>
          </AlertDescription>
        </Alert>
      )}

      {/* Error Message (for other errors) */}
      {error && !isDisabledAccount && <p className="text-destructive text-h7-regular mb-2">{error.message}</p>}

      <FieldGroup className="gap-3">
        {/* Email */}
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <InputGroup className="h-12 py-3">
                <InputGroupAddon>
                  <Mail className="w-6 h-6 text-black" />
                </InputGroupAddon>
                <Separator orientation="vertical" className="ml-3 bg-black" />
                <InputGroupInput
                  id="login-email"
                  type="email"
                  placeholder={t("email.placeholder")}
                  aria-invalid={fieldState.invalid}
                  {...field}
                />
              </InputGroup>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

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
                  id="login-password"
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

        <div className="text-right">
          <Link href="/forget-password" className="text-h8-regular text-primary">{t("forgot-password")}</Link>
        </div>

        <div className="pt-3 z-10">
          <CustomeBtn
            type="submit"
            disabled={isPending || form.formState.isSubmitted && !form.formState.isValid}
            className="bg-primary py-6 mt-2 text-h8-regular text-white text-center w-full"
          >
            {isPending ? <LoadingSpinner /> : t("submit")}
          </CustomeBtn>
        </div>
      </FieldGroup>
    </form>
  )
}
