import { z } from "zod";

// Schedule Visit Schema
export function getScheduleVisitSchema(t: (key: string) => string) {
  return z.object({
    description: z.string().min(1, { message: t("validation.description-required") }),
    phone: z
      .string()
      .min(1, { message: t("validation.phone-required") })
      .regex(/^\+?\d[\d\s\-()]{7,}$/, {
        message: t("validation.phone-invalid"),
      }),
    title: z.string().min(1, { message: t("validation.title-required") }),
    slug: z.string().min(1, { message: t("validation.slug-required") }),
  });
}

// Type export
type ScheduleVisitFields = z.infer<ReturnType<typeof getScheduleVisitSchema>>;

export type { ScheduleVisitFields };

