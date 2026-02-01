import { DeleteAccountFields } from "@/lib/schemas/profile.schema";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { signOut } from "next-auth/react";
import { toast } from "sonner";
import { DeleteAccountAction } from "../_actions/delete-account.action";

export default function useDeleteAccount() {
  // Translation
  const t = useTranslations("DeleteAccountPage.delete-account-form");

  // Mutation
  const { isPending, mutate } = useMutation({
    // Function
    mutationFn: async (fields: DeleteAccountFields) => {
      return await DeleteAccountAction(fields);
    },

    // Handle Success
    async onSuccess(data) {
      const message = data.message;

      // Handle specific backend errors
      if (message === "Please provide valid password") {
        toast.error(t("error.invalid-password"));
      } else if (message === "UnAuthenticated" || message === "Unauthorized") {
        toast.error(t("error.delete-failed"));
      } else if (message === "Failed to delete account") {
        toast.error(t("error.delete-failed"));
      } else {
        // Success — show success message and sign out
        toast.success(t("success.account-deleted"));
        // Sign out and redirect to home
        await signOut({ callbackUrl: "/" });
      }
    },
    onError: (error) => toast.error(error.message || t("error.delete-failed")),
  });

  return { deleteAccount: mutate, isPending };
}
