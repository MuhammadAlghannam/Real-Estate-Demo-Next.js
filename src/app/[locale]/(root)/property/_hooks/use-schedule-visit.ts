import { ScheduleVisitFields } from "@/lib/schemas/schedule-visit.schema";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { ScheduleVisitAction } from "../_actions/schedule-visit.action";

export default function useScheduleVisit() {
  const t = useTranslations("PropertySinglePage.schedule-visit");
  
  // Mutation
  const { isPending, mutate } = useMutation({
    // Function
    mutationFn: async (fields: ScheduleVisitFields) => {
      return await ScheduleVisitAction(fields);
    },

    // Handle Success
    onSuccess(data) {
      toast.success(data.message || t("success-message"));
    },
    onError: (error) => toast.error(error.message),
  });

  return { scheduleVisit: mutate, isPending };
}

