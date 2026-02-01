"use client";

import CustomeBtn from "@/components/shared/CustomeBtn";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DeleteAccountFields, getDeleteAccountSchema } from "@/lib/schemas/profile.schema";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import useDeleteAccount from "../_hooks/use-delete-account";

export default function DeleteAccountForm() {
  // Translation
  const t = useTranslations("DeleteAccountPage.delete-account-form");
  const locale = useLocale();
  const isArabic = locale === "ar";

  // State
  const [showPassword, setShowPassword] = useState(false);

  // Mutation
  const { isPending, deleteAccount } = useDeleteAccount();

  // Form
  const form = useForm<DeleteAccountFields>({
    resolver: zodResolver(getDeleteAccountSchema(t)),
    defaultValues: {
      password: "",
    },
    mode: "onBlur",
  });

  function onSubmit(values: DeleteAccountFields) {
    deleteAccount(values);
  }

  return (
    <form
      id="form-delete-account"
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-6"
    >
      <FieldGroup className="gap-6">
        {/* Current Password */}
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <Label htmlFor="delete-current-password" className="text-h6-semibold text-black">
                {t("password.label")}
              </Label>
              <div className="relative">
                <Input
                  id="delete-current-password"
                  type={showPassword ? "text" : "password"}
                  placeholder={t("password.placeholder")}
                  aria-invalid={fieldState.invalid}
                  className={cn(isArabic ? "pl-12" : "pr-12")}
                  {...field}
                />
                <button
                  type="button"
                  className={cn("absolute top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700", isArabic ? "left-3" : "right-3")}
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? t("password.hide-password") : t("password.show-password")}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <div className="pt-4">
          <CustomeBtn
            type="submit"
            className="w-full"
            disabled={isPending || (form.formState.isSubmitted && !form.formState.isValid)}
          >
            {isPending ? (
              <>
                <LoadingSpinner /> {t("deleting")}
              </>
            ) : (
              t("delete")
            )}
          </CustomeBtn>
        </div>
      </FieldGroup>
    </form>
  );
}
