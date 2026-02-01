import { VerifyAgentAction } from "@/lib/actions/verify-agent/verify-agent.action";
import { VerifyAgentFields } from "@/lib/schemas/verify-agent.schema";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export default function useVerifyAgent() {
  // Mutation
  const { isPending, error, data, mutate } = useMutation({
    // Function
    mutationFn: async (fields: VerifyAgentFields) => {
      const response = await VerifyAgentAction(fields);

      if (response.errors) {
        throw new Error(response.message || "Failed to verify agent");
      }

      return response;
    },

    onError: (error) => toast.error(error.message),
  });

  return { error, data, verifyAgent: mutate, isPending };
}

