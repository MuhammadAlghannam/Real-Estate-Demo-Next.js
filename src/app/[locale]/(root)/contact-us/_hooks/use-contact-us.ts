import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { ContactUsAction } from "../_actions/contact-us.action";
import { ContactUsFields } from "@/lib/schemas/contact-us.schema";

export default function useContactUs() {
  // Mutation
  const { isPending, error, mutate } = useMutation({
    // Function
    mutationFn: async (fields: ContactUsFields) => {
      return await ContactUsAction(fields);
    },

    // Handle Success
    onSuccess(data) {
      toast.success(data.message || "Your message has been sent successfully!");
    },
    onError: (error) => toast.error(error.message),
  });

  return { error, contactUs: mutate, isPending };
}

