import { z } from "zod";

// Login
export function getLoginSchema(t: (key: string) => string) {
  return z.object({
    email: z.string().email({ message: t("validation.email-invalid") }),
    password: z.string().min(8, { message: t("validation.password-min") }),
  });
}

// Sign Up
export function getRegisterSchema(t: (key: string) => string) {
  return z
    .object({
      name: z.string().min(1, { message: t("validation.name-required") }),
      email: z.string().email({ message: t("validation.email-invalid") }),
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

// User Verification Token
export function getUserVerificationTokenSchema(t: (key: string) => string) {
  return z
    .object({
      token: z.string()
        .min(6, { message: t("validation.token-min") })
        .max(6, { message: t("validation.token-max") })
        .regex(/^\d{6}$/, { message: t("validation.token-digits-only") })
        .trim(),
    });
}

// Forget Password
export function getForgetPasswordSchema(t: (key: string) => string) {
  return z.object({
    email: z.string().email({ message: t("validation.email-invalid") }),
  });
}


// Reset Password
export function getResetPasswordSchema(t: (key: string) => string) {
  return z
    .object({
      token: z.string()
        .min(6, { message: t("validation.token-min") })
        .max(6, { message: t("validation.token-max") })
        .regex(/^\d{6}$/, { message: t("validation.token-digits-only") })
        .trim(),
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

// Type export
type LoginFields = z.infer<ReturnType<typeof getLoginSchema>>;
type RegisterFields = z.infer<ReturnType<typeof getRegisterSchema>>;
type ForgetPasswordFields = z.infer<ReturnType<typeof getForgetPasswordSchema>>;
type ResetPasswordFields = z.infer<ReturnType<typeof getResetPasswordSchema>>;
type UserVerificationTokenFields = z.infer<ReturnType<typeof getUserVerificationTokenSchema>>;

export type {
  ForgetPasswordFields,
  LoginFields,
  RegisterFields,
  ResetPasswordFields,
  UserVerificationTokenFields
};

