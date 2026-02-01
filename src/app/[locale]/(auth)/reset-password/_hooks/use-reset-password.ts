import { ResetPasswordFields } from "@/lib/schemas/auth.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { ResetPasswordAction } from "../_actions/reset-password.action";

interface ResetPasswordRequest extends ResetPasswordFields {
  email: string;
}

export default function useResetPassword() {
  // Router
  const queryClient = useQueryClient()
  const t = useTranslations("ResetPasswordPage");

  // Mutation
  const { isPending, error, mutate } = useMutation({
    // fun
    mutationFn: async (data: ResetPasswordRequest) => {
      const response = await ResetPasswordAction(data);

      if (response.message === "Invalid token") {
        throw new Error(t("errors.invalid-token"));
      }

      return response
    },

    // Handle Success
    onSuccess() {
      // Toast
      toast.success(t("success.password-reset"));

      queryClient.invalidateQueries({
        queryKey: ['reset-password']
      })
    },
    onError: error => toast.error(error.message)
  });

  return { error, resetPassword: mutate, isPending };
}
