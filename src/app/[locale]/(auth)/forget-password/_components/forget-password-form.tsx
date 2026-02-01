
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
  InputGroupInput,
} from "@/components/ui/input-group"
import { Separator } from "@/components/ui/separator"
import { useRouter } from "@/i18n/navigation"
import { getForgetPasswordSchema, type ForgetPasswordFields } from "@/lib/schemas/auth.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Mail } from "lucide-react"
import { useTranslations } from "next-intl"
import { Controller, useForm } from "react-hook-form"
import useForgetPassword from "../_hooks/use-forget-password"

export default function ForgetPasswordForm() {
  const router = useRouter()
  const t = useTranslations("ForgetPasswordPage.form");

  // Mutation
  const { isPending, forgetPassword } = useForgetPassword();

  // Form
  const form = useForm<ForgetPasswordFields>({
    resolver: zodResolver(getForgetPasswordSchema(t)),
    defaultValues: {
      email: "",
    },
    mode: "onBlur",
  })

  function onSubmit(values: ForgetPasswordFields) {
    forgetPassword(values, {
      onSuccess: () => {
        localStorage.setItem("forget-password-email", values.email)

        setTimeout(() => {
          router.push('/reset-password')
        }, 1000);
      },
      onError: (err) => {
        // Surface server error under the email field
        form.setError("email", { type: "server", message: err.message })
      }
    })
  }

  return (
    <form id="form-rhf-forget-password" onSubmit={form.handleSubmit(onSubmit)} className="w-full mt-3 z-10">
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
                  id="forget-password-email"
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
