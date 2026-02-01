"use client";

import CustomeBtn from "@/components/shared/CustomeBtn";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ContactUsFields, getContactUsSchema } from "@/lib/schemas/contact-us.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { Controller, useForm } from "react-hook-form";
import useContactUs from "../_hooks/use-contact-us";

export default function ContactUsForm() {
  // Translation
  const t = useTranslations("ContactUsPage.contact-us-form");
  // Mutation
  const { isPending, contactUs } = useContactUs();

  // Form
  const form = useForm<ContactUsFields>({
    resolver: zodResolver(getContactUsSchema(t)),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
    mode: "onBlur",
  });

  function onSubmit(values: ContactUsFields) {
    contactUs(values, {
      onSuccess: () => {
        // Reset form after successful submission
        form.reset();
      },
    });
  }

  return (
    <form
      id="form-contact-us"
      onSubmit={form.handleSubmit(onSubmit)}
      className="w-full space-y-6"
    >
      <FieldGroup className="gap-6">
        <div className="flex items-center justify-between gap-4">
          {/* Name */}
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <Label htmlFor="contact-name" className="text-h6-semibold text-black">
                  {t("labels.name")}
                </Label>
                <Input
                  id="contact-name"
                  type="text"
                  placeholder={t("placeholders.name")}
                  aria-invalid={fieldState.invalid}
                  {...field}
                />
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
                <Label htmlFor="contact-email" className="text-h6-semibold text-black">
                  {t("labels.email-address")}
                </Label>
                <Input
                  id="contact-email"
                  type="email"
                  placeholder={t("placeholders.email-address")}
                  aria-invalid={fieldState.invalid}
                  {...field}
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </div>

        {/* Subject */}
        <Controller
          name="subject"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <Label htmlFor="contact-subject" className="text-h6-semibold text-black">
                {t("labels.subject")}
              </Label>
              <Input
                id="contact-subject"
                type="text"
                placeholder={t("placeholders.subject")}
                aria-invalid={fieldState.invalid}
                {...field}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Message */}
        <Controller
          name="message"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <Label htmlFor="contact-message" className="text-h6-semibold text-black">
                {t("labels.message")}
              </Label>
              <Textarea
                id="contact-message"
                placeholder={t("placeholders.message")}
                rows={6}
                className="resize-none"
                aria-invalid={fieldState.invalid}
                {...field}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <div className="pt-3">
          <CustomeBtn
            type="submit"
            className="w-full"
            disabled={
              isPending ||
              (form.formState.isSubmitted && !form.formState.isValid)
            }
          >
            {isPending ? <LoadingSpinner /> : t("send-message")}
          </CustomeBtn>
        </div>
      </FieldGroup>
    </form>
  );
}
