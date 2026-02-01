import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { incrementCustomerAction } from "../_actions/increment-customer.action";

export default function useIncrementCustomer() {
  // Mutation
  const { isPending, mutate } = useMutation({
    // fun
    mutationFn: async (data: IncrementCustomerRequest) => {
      await incrementCustomerAction(data);
    },

    onError: error => toast.error(error.message)
  });

  return { mutate, isPending };
}