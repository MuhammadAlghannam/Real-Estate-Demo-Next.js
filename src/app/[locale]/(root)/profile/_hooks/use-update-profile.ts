"use client";

import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { updateProfileAction } from "../_actions/update-profile.action";

export default function useUpdateProfile() {
  const router = useRouter();
  const t = useTranslations("ProfilePage.profile-form");

  return useMutation({
    mutationFn: updateProfileAction,
    onSuccess: (result) => {
      toast.success(result.message || t("success.profile-updated"));
      // Refresh the page to show updated data
      router.refresh();
    },
    onError: (error) => {
      toast.error(error.message || t("error.update-failed"));
    },
  });
}
