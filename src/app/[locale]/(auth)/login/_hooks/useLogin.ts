import { LoginFields } from "@/lib/schemas/auth.schema";
import { useMutation } from "@tanstack/react-query";
import { signIn, SignInResponse } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

type SignInResponseWithCode = SignInResponse & {
  code?: string;
};

interface LoginError extends Error {
  email?: string;
}

export default function useLogin() {
  // Navigation
  const searchParams = useSearchParams();
  const t = useTranslations("LoginPage");

  // Mutation
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (loginField: LoginFields) => {
      const response = await signIn("credentials", {
        email: loginField.email,
        password: loginField.password,
        redirect: false,
        callbackUrl: decodeURIComponent(searchParams.get("callbackUrl") || "/"),
      }) as SignInResponseWithCode | undefined;

      if (response?.error) {
        const errorCode = response.code;
        const errorMessage = errorCode === "disabled_account" ? t("form.disabled-account.title") : t("errors.invalid-credentials");
        const error: LoginError = new Error(errorMessage);

        if (errorCode === "disabled_account") {
          error.email = loginField.email;
        }

        throw error;
      }

      return response;
    },
    onSuccess: (data) => {
      toast.success(t("success.login-successful"));

      setTimeout(() => {
        window.location.href = data?.url || "/";
      }, 1000);
    },
  });

  return { isPending, error, login: mutate };
}