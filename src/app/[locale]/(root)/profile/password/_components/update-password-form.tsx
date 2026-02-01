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
import { UpdatePasswordFields, getUpdatePasswordSchema } from "@/lib/schemas/profile.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeOff, Lock } from "lucide-react"
import { useTranslations } from "next-intl"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import useUpdatePassword from "../_hooks/use-update-password"


export default function UpdatePasswordForm() {
  // Translation
  const t = useTranslations("PasswordPage.update-password-form");

  // State
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // Mutation
  const { updatePassword, isPending } = useUpdatePassword()

  // Form
  const form = useForm<UpdatePasswordFields>({
    resolver: zodResolver(getUpdatePasswordSchema(t)),
    defaultValues: {
      current_password: "",
      password: "",
      password_confirmation: "",
    },
  })

  function onSubmit(values: UpdatePasswordFields) {
    updatePassword({ ...values }, {
      onSuccess: () => {
        form.reset()
      },
    })
  }

  return (
    <form id="form-rhf-update-password" onSubmit={form.handleSubmit(onSubmit)} className="w-full mt-3 z-10">
      <FieldGroup className="gap-3">

        {/* Current Password */}
        <Controller
          name="current_password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <InputGroup className="h-12 py-3">
                <InputGroupAddon>
                  <Lock className="w-6 h-6 text-black" />
                </InputGroupAddon>
                <Separator orientation="vertical" className="ml-3 bg-black" />
                <InputGroupInput
                  id="update-current-password"
                  type={showCurrentPassword ? "text" : "password"}
                  placeholder={t("current-password.placeholder")}
                  aria-invalid={fieldState.invalid}
                  {...field}
                />
                <InputGroupAddon align="inline-end">
                  <InputGroupButton
                    type="button"
                    className="p-0 !bg-transparent"
                    aria-label={showCurrentPassword ? t("current-password.hide-password") : t("current-password.show-password")}
                    size="icon-xs"
                    onClick={() => setShowCurrentPassword((s) => !s)}
                  >
                    {showCurrentPassword ? <EyeOff className="w-6 h-6 text-black" /> : <Eye className="w-6 h-6 text-black" />}
                  </InputGroupButton>
                </InputGroupAddon>
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
                  id="update-password"
                  type={showPassword ? "text" : "password"}
                  placeholder={t("new-password.placeholder")}
                  aria-invalid={fieldState.invalid}
                  {...field}
                />
                <InputGroupAddon align="inline-end">
                  <InputGroupButton
                    type="button"
                    className="p-0 !bg-transparent"
                    aria-label={showPassword ? t("new-password.hide-password") : t("new-password.show-password")}
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
                  placeholder={t("confirm-password.placeholder")}
                  aria-invalid={fieldState.invalid}
                  {...field}
                />
                <InputGroupAddon align="inline-end">
                  <InputGroupButton
                    type="button"
                    className="p-0 !bg-transparent"
                    aria-label={showConfirmPassword ? t("confirm-password.hide-password") : t("confirm-password.show-password")}
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
            {isPending ? <LoadingSpinner /> : t("update-password")}
          </CustomeBtn>
        </div>
      </FieldGroup>
    </form>
  )
}
