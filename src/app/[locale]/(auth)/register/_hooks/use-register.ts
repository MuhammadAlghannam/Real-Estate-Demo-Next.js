import { RegisterFields } from "@/lib/schemas/auth.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { RegisterAction } from "../_actions/register.action";

export default function useRegister() {
  // Router
  const queryClient = useQueryClient()
  const t = useTranslations("RegisterPage.success");

  // Mutation
  const { isPending, error, mutate } = useMutation({
    // fun
    mutationFn: async (RegisterFields: RegisterFields) => {
      const response = await RegisterAction(RegisterFields);

      if (response.errors) {
        throw new Error(response.message);
      }

      return response
    },

    // Handle Success
    onSuccess() {
      // Toast
      toast.success(t("otp-sent"));

      queryClient.invalidateQueries({
        queryKey: ['register']
      })
    },
    onError: error => toast.error(error.message)
  });

  return { error, register: mutate, isPending };
}