import { VerifyOTP } from "@/lib/actions/auth/verify-otp.action";
import { UserVerificationTokenFields } from "@/lib/schemas/auth.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function useVerifyOTP() {
  // Router
  const queryClient = useQueryClient()

  // Mutation
  const { isPending, mutate } = useMutation({
    // fun
    mutationFn: async (UserVerificationTokenFields: UserVerificationTokenFields) => {
      const response = await VerifyOTP(UserVerificationTokenFields);

      // Backend returns only { message: string } for both cases.
      // Treat as success only if the message indicates success.
      const msg = String(response?.message ?? "").toLowerCase();
      const isSuccess = msg.includes("success");

      if (!isSuccess) {
        throw new Error(response?.message || "Verification failed");
      }

      return response
    },

    // Handle Success
    onSuccess() {
      // Toast
      toast.success("Your email verified successfully");

      queryClient.invalidateQueries({
        queryKey: ['verify-otp']
      })
    },
    onError: error => toast.error(error.message)
  });

  return { verifyOTP: mutate, isPending };
}