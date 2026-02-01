import { z } from "zod";

// Verify Agent Schema
export function getVerifyAgentSchema(t: (key: string) => string) {
  return z.object({
    phone: z
      .string()
      .min(1, { message: t("validation.phone-required") })
      .regex(/^\+?\d[\d\s\-()]{7,}$/, {
        message: t("validation.phone-invalid"),
      }),
  });
}

// Type export
type VerifyAgentFields = z.infer<ReturnType<typeof getVerifyAgentSchema>>;

export type { VerifyAgentFields };

