import { ResendRegisterOtp } from "@/lib/actions/auth/resend-register-otp.action";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function useResendRegisterOtp() {
  // Router
  const queryClient = useQueryClient()

  // Mutation
  const { isPending, mutate } = useMutation({
    // fun
    mutationFn: async (email: string) => {
      const response = await ResendRegisterOtp(email);

      if (response.errors) {
        throw new Error(response.message);
      }

      return response
    },

    // Handle Success
    onSuccess() {
      // Toast
      toast.success("Your otp resend successfully");

      queryClient.invalidateQueries({
        queryKey: ['verify-otp']
      })
    },
    onError: error => toast.error(error.message)
  });

  return { resendOtp: mutate, isPending };
}