import { CredentialsSignin } from "@auth/core/errors";

/**
 * Custom error for invalid credentials
 */
export class InvalidCredentialsError extends CredentialsSignin {
  code = "invalid_credentials" as const;
}

/**
 * Custom error for disabled account
 */
export class DisabledAccountError extends CredentialsSignin {
  code = "disabled_account" as const;
}

