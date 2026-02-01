
"use client";

import CustomeBtn from "@/components/shared/CustomeBtn";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ScheduleVisitFields, getScheduleVisitSchema } from "@/lib/schemas/schedule-visit.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { Controller, useForm } from "react-hook-form";
import useScheduleVisit from "../_hooks/use-schedule-visit";

interface ScheduleAVisitformProps {
  onClose?: () => void;
  slug: string;
}

export default function ScheduleAVisitform({ onClose, slug }: ScheduleAVisitformProps) {
  // Mutation
  const { isPending, scheduleVisit } = useScheduleVisit();
  const t = useTranslations("PropertySinglePage.schedule-visit.form");

  // Form
  const form = useForm<ScheduleVisitFields>({
    resolver: zodResolver(getScheduleVisitSchema(t)),
    defaultValues: {
      description: "",
      phone: "",
      title: "",
      slug: slug,
    },
    mode: "onBlur",
  });

  function onSubmit(values: ScheduleVisitFields) {
    scheduleVisit(values, {
      onSuccess: () => {
        // Reset form after successful submission
        form.reset({
          description: "",
          phone: "",
          title: "",
          slug: slug,
        });
        // Call onClose callback (closes modal)
        onClose?.();
      },
    });
  }

  return (
    <form
      id="form-schedule-visit"
      onSubmit={form.handleSubmit(onSubmit)}
      className="w-full space-y-6"
    >
      <FieldGroup className="gap-6">
        {/* Title */}
        <Controller
          name="title"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <Label htmlFor="visit-title" className="text-h6-semibold text-black">
                {t("title.label")}
              </Label>
              <Input
                id="visit-title"
                type="text"
                placeholder={t("title.placeholder")}
                aria-invalid={fieldState.invalid}
                {...field}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Phone */}
        <Controller
          name="phone"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <Label htmlFor="visit-phone" className="text-h6-semibold text-black">
                {t("phone.label")}
              </Label>
              <Input
                id="visit-phone"
                type="tel"
                placeholder={t("phone.placeholder")}
                aria-invalid={fieldState.invalid}
                {...field}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Description */}
        <Controller
          name="description"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <Label htmlFor="visit-description" className="text-h6-semibold text-black">
                {t("description.label")}
              </Label>
              <Textarea
                id="visit-description"
                placeholder={t("description.placeholder")}
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
            {isPending ? <LoadingSpinner /> : t("submit")}
          </CustomeBtn>
        </div>
      </FieldGroup>
    </form>
  );
}
