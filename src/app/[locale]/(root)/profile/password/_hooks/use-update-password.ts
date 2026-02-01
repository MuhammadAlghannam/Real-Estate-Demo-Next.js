import { UpdatePasswordFields } from "@/lib/schemas/profile.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { UpdatePasswordAction } from "../_actions/update-password.action";

export default function useUpdatePassword() {
  // Translation
  const t = useTranslations("PasswordPage.update-password-form");
  
  // Router
  const queryClient = useQueryClient();

  // Mutation
  const { isPending, error, mutate } = useMutation({
    // fun
    mutationFn: async (data: UpdatePasswordFields) => {
      const response = await UpdatePasswordAction(data);
      return response;
    },

    // Handle Success
    onSuccess(data) {
      // Check if the message indicates an error
      const errorMessages = [
        "UnAuthenticated",
        "Current password dont mtach",
        "Current password does not match",
      ];
      const isError = errorMessages.some((errMsg) =>
        data.message?.toLowerCase().includes(errMsg.toLowerCase()),
      );

      if (isError) {
        // Show error toast (red) for error messages
        const errorMessage =
          data.message === "UnAuthenticated"
            ? t("error.update-failed")
            : data.message?.toLowerCase().includes("current password") || data.message?.toLowerCase().includes("password dont")
            ? t("error.current-password-mismatch")
            : data.message || t("error.update-failed");

        toast.error(errorMessage);
      } else {
        // Show success toast (green)
        toast.success(data.message || t("success.password-updated"));

        queryClient.invalidateQueries({
          queryKey: ["update-password"],
        });
      }
    },
    onError: (error) => {
      // Show custom message for UnAuthenticated error
      const errorMessage =
        error.message === "UnAuthenticated"
          ? t("error.update-failed")
          : error.message || t("error.update-failed");

      // Show error toast (red)
      toast.error(errorMessage);
    },
  });

  return { error, updatePassword: mutate, isPending };
}
