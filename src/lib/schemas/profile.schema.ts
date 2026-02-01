import { z } from "zod";

// Profile Schema
export function getProfileSchema(t: (key: string) => string) {
  return z.object({
    name: z.string().min(1, { message: t("validation.name-required") }),
    email: z.string().email({ message: t("validation.email-invalid") }),
    phone: z
      .string()
      .min(1, { message: t("validation.phone-required") })
      .regex(/^\+?\d[\d\s\-()]{7,}$/, {
        message: t("validation.phone-invalid"),
      }),
    address: z.string().min(1, { message: t("validation.address-required") }),
    about_me: z.string().min(1, { message: t("validation.about-me-required") }),
    designation: z.string().min(1, { message: t("validation.designation-required") }),
    image: z
      .instanceof(File)
      .optional()
      .refine((file) => !file || file.size <= 5 * 1024 * 1024, {
        message: t("validation.file-size"),
      })
      .refine((file) => !file || ["image/jpeg", "image/png", "image/webp"].includes(file.type), {
        message: t("validation.file-type"),
      }),
  });
}

// Update Password Schema
export function getUpdatePasswordSchema(t: (key: string) => string) {
  return z
    .object({
      current_password: z
        .string()
        .min(8, { message: t("validation.password-min") })
        .refine((val) => /[A-Z]/.test(val), {
          message: t("validation.password-uppercase"),
        })
        .refine((val) => /[a-z]/.test(val), {
          message: t("validation.password-lowercase"),
        })
        .refine((val) => /\d/.test(val), { message: t("validation.password-number") })
        .refine((val) => /[^A-Za-z0-9]/.test(val), {
          message: t("validation.password-symbol"),
        }),
      password: z
        .string()
        .min(8, { message: t("validation.password-min") })
        .refine((val) => /[A-Z]/.test(val), {
          message: t("validation.password-uppercase"),
        })
        .refine((val) => /[a-z]/.test(val), {
          message: t("validation.password-lowercase"),
        })
        .refine((val) => /\d/.test(val), { message: t("validation.password-number") })
        .refine((val) => /[^A-Za-z0-9]/.test(val), {
          message: t("validation.password-symbol"),
        }),
      password_confirmation: z.string().min(1, {
        message: t("validation.password-confirmation-required"),
      }),
    })
    .refine((data) => data.password === data.password_confirmation, {
      message: t("validation.passwords-not-match"),
      path: ["password_confirmation"],
    });
}

// Delete Account Schema
export function getDeleteAccountSchema(t: (key: string) => string) {
  return z.object({
    password: z
      .string()
      .min(8, { message: t("validation.password-min") })
      .refine((val) => /[A-Z]/.test(val), {
        message: t("validation.password-uppercase"),
      })
      .refine((val) => /[a-z]/.test(val), {
        message: t("validation.password-lowercase"),
      })
      .refine((val) => /\d/.test(val), { message: t("validation.password-number") })
      .refine((val) => /[^A-Za-z0-9]/.test(val), {
        message: t("validation.password-symbol"),
      }),
  });
}

// Type export
type ProfileFields = z.infer<ReturnType<typeof getProfileSchema>>;
type UpdatePasswordFields = z.infer<ReturnType<typeof getUpdatePasswordSchema>>;
type DeleteAccountFields = z.infer<ReturnType<typeof getDeleteAccountSchema>>;

export type { DeleteAccountFields, ProfileFields, UpdatePasswordFields };

