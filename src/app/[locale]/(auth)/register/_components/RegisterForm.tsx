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
import { Separator } from "@/components/ui/separator"
import { getRegisterSchema, type RegisterFields } from "@/lib/schemas/auth.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react"
import { useTranslations } from "next-intl"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import useRegister from "../_hooks/use-register"

interface RegisterFormProps {
  handleSuccess: (email: string) => void;
}

export default function RegisterForm({ handleSuccess }: RegisterFormProps) {
  // State
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const t = useTranslations("RegisterPage.form");

  // Mutation
  const { isPending, register } = useRegister();

  // Form
  const form = useForm<RegisterFields>({
    resolver: zodResolver(getRegisterSchema(t)),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
    mode: "onBlur",
  })

  function onSubmit(values: RegisterFields) {
    register(values, {
      onSuccess: () => {
        handleSuccess(values.email)
      }
      ,
      onError: (err) => {
        // Surface server error under the email field
        // This will render via FieldError tied to this field
        form.setError("email", { type: "server", message: err.message })
      }
    })
  }

  return (
    <form id="form-rhf-register" onSubmit={form.handleSubmit(onSubmit)} className="w-full mt-3 z-10">
      <FieldGroup className="gap-3">
        {/* Name */}
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <InputGroup className="h-12 py-3">
                <InputGroupAddon>
                  <User className="w-6 h-6 text-black" />
                </InputGroupAddon>
                <Separator orientation="vertical" className="ml-3 bg-black" />
                <InputGroupInput
                  id="register-name"
                  type="text"
                  placeholder={t("name.placeholder")}
                  aria-invalid={fieldState.invalid}
                  {...field}
                />
              </InputGroup>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

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
                  id="register-email"
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
                  id="register-password"
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
                  id="register-password-confirmation"
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
