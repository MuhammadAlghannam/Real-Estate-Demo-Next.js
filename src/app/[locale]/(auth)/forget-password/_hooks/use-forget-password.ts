import { ForgetPasswordFields } from "@/lib/schemas/auth.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { ForgetPasswordAction } from "../_actions/forget-password.action";

export default function useForgetPassword() {
  // Router
  const queryClient = useQueryClient()
  const t = useTranslations("ForgetPasswordPage");

  // Mutation
  const { isPending, error, mutate } = useMutation({
    // fun
    mutationFn: async (ForgetPasswordFields: ForgetPasswordFields) => {
      const response = await ForgetPasswordAction(ForgetPasswordFields);

      if (response.message === "Email does not exist") {
        throw new Error(t("errors.email-not-exist"));
      }

      return response
    },

    // Handle Success
    onSuccess() {
      // Toast
      toast.success(t("success.reset-link-sent"));

      queryClient.invalidateQueries({
        queryKey: ['forget-password']
      })
    },
    onError: error => toast.error(error.message)
  });

  return { error, forgetPassword: mutate, isPending };
}
