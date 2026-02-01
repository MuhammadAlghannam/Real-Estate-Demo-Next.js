import { z } from "zod";

// Contact Us Schema
export function getContactUsSchema(t: (key: string) => string) {
  return z.object({
    name: z.string().min(1, { message: t("validation.name-required") }),
    email: z.string().email({ message: t("validation.email-invalid") }),
    subject: z.string().min(1, { message: t("validation.subject-required") }),
    message: z
      .string()
      .min(10, { message: t("validation.message-min") })
      .max(1000, { message: t("validation.message-max") }),
  });
}

// Type export
type ContactUsFields = z.infer<ReturnType<typeof getContactUsSchema>>;

export type { ContactUsFields };

